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
            ['id' => 1, 'name' => 'Wi-Fi', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 2, 'name' => 'Air conditioner', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 3, 'name' => 'TV', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 4, 'name' => 'Fan', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 5, 'name' => 'Daily housekeeping', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 6, 'name' => 'Pillow', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 7, 'name' => 'Single bed', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 8, 'name' => 'Double bed', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 9, 'name' => 'Blanket', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 10, 'name' => 'Coffee maker', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 11, 'name' => 'Linen', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 12, 'name' => 'Electric kettle', 'created_at' => $now, 'updated_at' => $now],
        ];

        DB::table('amenities')->insert($amenities);
    }
}
