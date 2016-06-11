<?php

namespace Todo\Http\Controllers;

use Cache;
use Log;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

use Todo\Http\Requests;
use Todo\Http\Controllers\Controller;
use Todo\Fixture;
use Todo\Bet;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class FixtureController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @see https://github.com/Zemke/tippspiel/issues/1 #1
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $fixturesFromCache = Cache::get('fixtures');

        if (Fixture::isValidCache($fixturesFromCache)) {
            Log::info('Fixtures from cache');
            return $fixturesFromCache;
        }

        Log::info('Fixtures from REST');

        $fixtures = Fixture::rest();
        try {
            $userId = isset($request->userId) ? $request->userId : JWTAuth::parseToken()->toUser()->id;
            $userBets = Bet::where('user_id', $userId)->get()->toArray();
        } catch (JWTException $e) {
            $userBets = [];
        }

        if (!$fixtures) {
            if (!$fixturesFromCache) {
                Log::alert('Neither REST service nor cache provide any data.');
                return new Response(array(
                    'descr' => 'Neither REST service nor cache provide any data.',
                    'trans' => 'soe.rest.err.noFixtures'),
                    500);
            }
            return Fixture::addUserBetsToFixtures($userBets, $fixturesFromCache);
        }

        $fixtures['_timestamp'] = gmdate('Y-m-d H:i:s');
        Cache::forever('fixtures', $fixtures);

        $fixtures = Fixture::addUserBetsToFixtures($userBets, $fixtures);

        return $fixtures;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
