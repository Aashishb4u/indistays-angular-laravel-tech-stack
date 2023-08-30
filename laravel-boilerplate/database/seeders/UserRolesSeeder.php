<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class UserRolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * Use Command - php artisan db:seed --class=UserRolesSeeder
     */
    public function run(): void
    {
        $now = Carbon::now();

        $userRoles = [
            ['id' => 1, 'role_name' => 'admin', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 2, 'role_name' => 'customer', 'created_at' => $now, 'updated_at' => $now]
        ];

        DB::table('user_roles')->insert($userRoles);
    }
}
