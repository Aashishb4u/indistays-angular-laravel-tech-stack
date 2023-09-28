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
        Schema::table('custom_pricings', function (Blueprint $table) {
            $table->decimal('discount_price');
            $table->unsignedBigInteger('accommodation_id'); // Foreign key
            $table->foreign('accommodation_id')->references('id')->on('accommodations');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('custom_pricings', function (Blueprint $table) {
            $table->dropColumn('discount_price');
            $table->dropForeign(['accommodation_id']);
            $table->dropColumn('accommodation_id');
        });
    }
};
