<?php

namespace Todo\Http\Controllers;

use Log;

use Illuminate\Http\Request;

use Illuminate\Http\Response;
use Todo\Http\Requests;
use Todo\Http\Controllers\Controller;
use Todo\Bet;
use Tymon\JWTAuth\Facades\JWTAuth;

class BetController extends Controller
{
    private $request;

    /**
     * BetController constructor.
     */
    public function __construct(Request $request)
    {
        $this->request = $request;
//        $this->middleware('cors');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        $all = $this->request->all();
        $all['user_id'] = JWTAuth::parseToken()->toUser()->id;

        return Bet::updateOrCreate(
            array('user_id' => $all['user_id'], 'fixture_id' => $all['fixture_id']),
            $all
        );
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
