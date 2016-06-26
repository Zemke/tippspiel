<?php

namespace Todo\Http\Controllers;

use Cache;
use Illuminate\Http\Request;
use Log;
use Todo\Fixture;
use Todo\Http\Requests;
use Todo\Standing;

class StandingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $standings = Cache::get('standings');

        if (Fixture::isValidCache($standings)) {
            Log::info('Standings from Cache');
            unset($standings['_timestamp']);
            return Standing::populateTeams($standings);
        } else {
            Log::info('Standings from DB');
            Standing::handleJob();
        }

        $builder = Standing::with('user');
        $standings = $builder->get();

        $standings['_timestamp'] = gmdate('Y-m-d H:i:s');
        Cache::forever('standings', $standings);

        unset($standings['_timestamp']);
        return Standing::populateTeams($standings);
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
