<?php

namespace Database\Seeders;

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class AmenitiesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * Use Command - php artisan db:seed --class=AmenitiesSeeder
     */
    public function run(): void
    {
        $now = Carbon::now();
        $amenities = [
            ['id' => 1, 'name' => 'Wi-Fi', 'icon' => 'fa-wifi', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 2, 'name' => 'Air conditioner', 'icon' => 'fa-snowflake', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 3, 'name' => 'TV', 'icon' => 'fa-tv', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 4, 'name' => 'Fan', 'icon' => 'fa-fan', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 5, 'name' => 'Daily housekeeping', 'icon' => 'fa-broom', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 6, 'name' => 'Pillow', 'icon' => 'fa-bed', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 7, 'name' => 'Single bed', 'icon' => 'fa-bed', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 8, 'name' => 'Double bed', 'icon' => 'fa-bed', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 9, 'name' => 'Blanket', 'icon' => 'fa-bed', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 10, 'name' => 'Coffee maker', 'icon' => 'fa-coffee', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 11, 'name' => 'Linen', 'icon' => 'fa-bed', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 12, 'name' => 'Electric kettle', 'icon' => 'fa-bolt', 'created_at' => $now, 'updated_at' => $now],
        ];

        DB::table('amenities')->insert($amenities);
    }
}
