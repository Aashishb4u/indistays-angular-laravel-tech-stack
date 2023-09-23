<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'My Admin',
            'email' => 'admin@indistays.com',
            'user_role_id' => 1,
            'email_verified_at' => now(),
            'password' => bcrypt('admin_Password'), // Password for the first user
            'remember_token' => Str::random(10),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('users')->insert([
            'name' => 'My Customer',
            'email' => 'customer@indistays.com',
            'user_role_id' => 2,
            'email_verified_at' => now(),
            'password' => bcrypt('customer_Password'), // Password for the second user
            'remember_token' => Str::random(10),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // You can add more users here if needed
    }
}
