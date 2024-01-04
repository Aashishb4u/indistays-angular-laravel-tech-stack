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
        Schema::create('customer_reviews', function (Blueprint $table) {
            $table->id();
            $table->text('review')->nullable();
            $table->decimal('ratings', 10, 2)->nullable()->default(0); // Adjust precision and scale as needed
            $table->unsignedBigInteger('camping_id')->nullable();
            $table->foreign('camping_id')->references('id')->on('campings');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customer_reviews');
    }
};
