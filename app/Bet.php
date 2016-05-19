<?php

namespace Todo;

use Illuminate\Database\Eloquent\Model;

class Bet extends Model
{
    use HasCompositePrimaryKey;

    protected $fillable = array('home_goals', 'away_goals', 'valuation', 'fixture_id', 'user_id');

    /**
     * The primary key of the table.
     *
     * @var string
     */
    protected $primaryKey = array('user_id', 'fixture_id');
}
