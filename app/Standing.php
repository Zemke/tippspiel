<?php

namespace Todo;

use Cache;
use Illuminate\Database\Eloquent\Model;

class Standing extends Model
{
    protected $fillable = array('user_id', 'points', 'p5', 'p3', 'p1', 'p0');

    protected $primaryKey = 'user_id';

    const STARTING_STANDINGS = [
        'points' => 0,
        'p5' => 0,
        'p3' => 0,
        'p1' => 0,
        'p0' => 0,
    ];

    public function user()
    {
        return $this->belongsTo('Todo\User');
    }

    public static function calcForUser($userId)
    {
        $fixtures = Cache::get('fixtures');

        if (!$fixtures) {
            return;
        }

        $bets = Bet::all();
        $standings = [];

        $userBets = $bets->filter(function ($bet) use ($userId) {
            return $bet['user_id'] === $userId;
        })->toArray();

        $betsAndFixturesOfUser = Fixture::addUserBetsToFixtures(array_values($userBets), $fixtures);

        $betsAndFixturesOfUserFiltered = array_filter($betsAndFixturesOfUser['fixtures'], function ($val, $key) {
            return array_key_exists('_bet', $val);
        }, ARRAY_FILTER_USE_BOTH);

        $standing = Standing::calcForTable($betsAndFixturesOfUserFiltered);

        $standing['user_id'] = $userId;
        return new Standing($standing);
    }

    private static function calcForTable($betsAndFixturesOfUser)
    {
        $standing = self::STARTING_STANDINGS;

        foreach ($betsAndFixturesOfUser as $key => $betAndFixture) {
            $valuation = Fixture::calcValuation($betAndFixture['_bet'], $betAndFixture);
            $standing['points'] += $valuation;
            $standing['p' . $valuation] += 1;
        }

        return $standing;
    }
}
