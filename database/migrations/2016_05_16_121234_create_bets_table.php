<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBetsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bets', function(Blueprint $table)
        {
            $table->integer('home_goals');
            $table->integer('away_goals');
            $table->integer('fixture_id');
            $table->string('valuation');
            $table->integer('user_id');
            $table->timestamps();
            $table->primary(['fixture_id', 'user_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('bets');
    }
}
