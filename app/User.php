<?php namespace Todo;

use Illuminate\Auth\Authenticatable;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class User extends Model implements AuthenticatableContract, CanResetPasswordContract
{

    use Authenticatable, CanResetPassword;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['first_name', 'last_name', 'email', 'password', 'champ_bet'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['password', 'remember_token'];

    public function standing()
    {
        return $this->hasOne('Todo\Standing');
    }

    /**
     * Authenticate a user by username and password.
     *
     * @param string $email The email address
     * @param string $password Plain text password
     * @return bool|user The user if the password matches the user's stored password, false otherwise.
     */
    public function authenticate($email, $password)
    {
        $user = User::where('email', $email)->first();

        if (!$user) {
            return false;
        }

        if (!Hash::check($password, $user->password)) {
            return false;
        }
        return $user;
    }

    public static function getTeamObjByTeamId($teamId)
    {
        $teamsFile = Storage::get('teams.json');

        if (!$teamsFile) {
            return null;
        }

        $teams = json_decode($teamsFile, true);

        foreach ($teams as $index => $team) {
            if ($team['id'] === (int)$teamId) {
                return $team;
            }
        }

        return null;
    }
}
