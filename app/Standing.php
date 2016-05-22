<?php

namespace Todo;

use Illuminate\Database\Eloquent\Model;
use Cache;

class Standing extends Model
{
    protected $fillable = array('user_id', 'points', '5', '3', '1', '0');

    public static function table()
    {
        $fixtures = Cache::get('fixtures');

        if (!$fixtures) {
            return;
        }

        $users = User::all()->toArray();
        $bets = Bet::all();
        $standings = [];

        foreach ($users as $key => $user) {
            $betsAndFixturesOfUser = Fixture::addUserBetsToFixtures($bets->filter(function ($bet) use ($user) {
                return $bet['user_id'] === $user['id'];
            }), $fixtures);

            $standing = Standing::calcForTable($betsAndFixturesOfUser);
            $standing['user_id'] = $user['id'];

            $standings[] = new Standing($standing);
        }
    }

    private static function calcForTable($betsAndFixturesOfUser)
    {
        $standing = [
            'points' => 0,
            '5' => 0,
            '3' => 0,
            '1' => 0,
            '0' => 0,
        ];

        foreach ($betsAndFixturesOfUser as $key => $betAndFixture) {
            $valuation = Fixture::calcValuation($betsAndFixturesOfUser['_bet'], $betsAndFixturesOfUser);
            $standing['points'] += $valuation;
            $standing['' + $valuation] += 1;
        }

        return $standing;
    }
}
