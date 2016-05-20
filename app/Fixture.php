<?php

namespace Todo;

use Log;
use Illuminate\Database\Eloquent\Model;

class Fixture extends Model
{
    public static function rest()
    {
//        $uri = 'http://api.football-data.org/v1/soccerseasons/424/fixtures';
        $uri = 'http://localhost:7070/fixtures.json';
        $reqPrefs['http']['method'] = 'GET';
        $reqPrefs['http']['header'] = 'X-Auth-Token: ' . env('FOOTBALL_DATA_ORG_KEY');
        $stream_context = stream_context_create($reqPrefs);

        $response = @file_get_contents($uri, false, $stream_context);

        if (!$response) {
            Log::critical('REST request failed', $http_response_header);
            return null;
        }

        return json_decode($response, true);
    }

    public static function isValidCache($fixtures)
    {
        if (!$fixtures) {
            return false;
        }

        $cachedTime  = strtotime($fixtures['_timestamp']);
        $now = strtotime(gmdate('Y-m-d H:i:s'));
        $differenceInSeconds = $now - $cachedTime;

        if ($differenceInSeconds > 15) {
            return false;
        }

        return true;
    }

    public static function addUserBetsToFixtures($bets, $fixtures)
    {
        $fixturesCount = count($fixtures['fixtures']);

        for ($i = 0; $i < $fixturesCount; $i++) {
            $indexOfBet = array_search(
                Fixture::extractFixtureId($fixtures['fixtures'][$i]), array_column($bets, 'fixture_id'));
            if ($indexOfBet !== false) {
                $fixtures['fixtures'][$i]['_bet'] = $bets[$indexOfBet];
            }
        }

        return $fixtures;
    }

    private static function extractFixtureId($fixture)
    {
        $splitSelfLink = explode('/', $fixture['_links']['self']['href']);
        return $splitSelfLink[count($splitSelfLink) - 1];
    }
}
