<?php

namespace Todo;

use Illuminate\Database\Eloquent\Model;

class Fixture extends Model
{
    public static function rest()
    {
        $uri = 'http://api.football-data.org/v1/soccerseasons/424/fixtures';
        $reqPrefs['http']['method'] = 'GET';
        $reqPrefs['http']['header'] = 'X-Auth-Token: ' . env('FOOTBALL_DATA_ORG_KEY');
        $stream_context = stream_context_create($reqPrefs);
        $response = file_get_contents($uri, false, $stream_context);
        return $response;
    }
}
