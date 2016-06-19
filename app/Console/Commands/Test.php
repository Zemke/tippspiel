<?php namespace Todo\Console\Commands;

use Carbon\Carbon;
use Log;

use Todo\Http\Controllers\FixtureController;
use Todo\User;
use Todo\Standing;

use Illuminate\Console\Command;
use Illuminate\Foundation\Inspiring;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;

class Test extends Command {

	/**
	 * The console command name.
	 *
	 * @var string
	 */
	protected $name = 'test';

	/**
	 * The console command description.
	 *
	 * @var string
	 */
	protected $description = 'Do anythin, test command, maybe just for debugging';

	/**
	 * Execute the console command.
	 *
	 * @return mixed
	 */
	public function handle()
	{
        Log::info('Running test task.');
        FixtureController::allUsers(149861);
    }
}
