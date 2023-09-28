<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Drop the foreign key constraint first
        Schema::table('custom_bookings', function (Blueprint $table) {
            $table->dropForeign(['camping_id']);
        });

        // Then drop the 'camping_id' column
        Schema::table('custom_bookings', function (Blueprint $table) {
            $table->dropColumn('camping_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('custom_bookings', function (Blueprint $table) {
            //
        });
    }
};
