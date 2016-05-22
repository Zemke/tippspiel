<?php namespace Todo\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Foundation\Inspiring;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;
use Todo\Standing;

class Table extends Command {

	/**
	 * The console command name.
	 *
	 * @var string
	 */
	protected $name = 'table';

	/**
	 * The console command description.
	 *
	 * @var string
	 */
	protected $description = 'Calculate table based on cached fixtures';

	/**
	 * Execute the console command.
	 *
	 * @return mixed
	 */
	public function handle()
	{
        Standing::table();
	}

}
