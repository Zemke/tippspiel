<?php

namespace Todo\Http\Controllers;

use Cache;
use Log;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

use Todo\Http\Requests;
use Todo\Http\Controllers\Controller;
use Todo\Fixture;

class FixtureController extends Controller
{
    /**
     * FixtureController constructor.
     */ 
    public function __construct()
    {
        $this->middleware('cors');
    }

    /**
     * Display a listing of the resource.
     *
     * @see https://github.com/Zemke/tippspiel/issues/1 #1
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $fixturesFromCache = Cache::get('fixtures');

        if (Fixture::isValidCache($fixturesFromCache)) {
            Log::info('Fixtures from cache');
            return $fixturesFromCache;
        }

        Log::info('Fixtures from REST');

        $fixtures = Fixture::rest();

        if (!$fixtures) {
            if (!$fixturesFromCache) {
                Log::alert('Neither REST service nor cache provide any data.');
                return new Response(array(
                    'descr' => 'Neither REST service nor cache provide any data.',
                    'trans' => 'soe.rest.err.noFixtures'),
                    500);
            }
            return $fixturesFromCache;
        }

        $fixtures['_timestamp'] = gmdate('Y-m-d H:i:s');
        Cache::forever('fixtures', $fixtures);

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
