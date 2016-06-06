<?php

namespace Todo\Http\Controllers;

use ErrorException;
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

        try {
            return Bet::updateOrCreate(
                array('user_id' => $all['user_id'], 'fixture_id' => $all['fixture_id']),
                $all
            );
        } catch (ErrorException $e) {
            $bet = Bet::where('user_id', $all['user_id'])->where('fixture_id', $all['fixture_id'])->first();
            if (!$bet) {
                $gameMsg = $all['home_goals'] . '-' . $all['away_goals'] . ' for fixture ' . $all['fixture_id'] . ' by user ' . $all['user_id'];
                Log::alert('The bet ' . $gameMsg . ' was not able to be saved because "' . $e->getMessage() . '"');
                return response()->json([
                    'descr' => $e->getMessage(),
                    'trans' => 'soe.betting.serverError'

                ], Response::HTTP_INTERNAL_SERVER_ERROR);
            }
            return $bet;
        }
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
