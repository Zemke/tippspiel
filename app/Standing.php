<?php

namespace Todo;

use Cache;
use Illuminate\Database\Eloquent\Model;

class Standing extends Model
{
    protected $fillable = array('user_id', 'points', 'p5', 'p3', 'p1', 'p0', 'missed');

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

    public static function handleJob()
    {
        $users = User::all()->toArray();
        $standings = [];

        foreach ($users as $user) {
            $standing = Standing::calcForUser($user['id']);
            $standings[] = $standing->attributesToArray();
        }

        Standing::truncate();
        Standing::insert($standings);
    }

    public static function calcForUser($userId)
    {
        $fixtures = Cache::get('fixtures');

        if (!$fixtures) {
            return;
        }

        $fixtures['fixtures'] = array_filter($fixtures['fixtures'], function ($fixture) {
            return !Fixture::isFuture($fixture);
        });

        $bets = Bet::all();
        $standings = [];

        $userBets = $bets->filter(function ($bet) use ($userId) {
            return $bet['user_id'] === $userId;
        })->toArray();

        $betsAndFixturesOfUser = Fixture::addUserBetsToFixtures(array_values($userBets), $fixtures);
        $missed = 0;

        $betsAndFixturesOfUserFiltered = array_filter($betsAndFixturesOfUser['fixtures'], function ($val, $key) use (&$missed) {
            $hasBet = array_key_exists('_bet', $val);

            if (!$hasBet && Fixture::isOver($val)) {
                $missed++;
            }

            return $hasBet;
        }, ARRAY_FILTER_USE_BOTH);

        $standing = Standing::calcForTable($betsAndFixturesOfUserFiltered);

        $standing['user_id'] = $userId;
        $standing['missed'] = $missed;
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
