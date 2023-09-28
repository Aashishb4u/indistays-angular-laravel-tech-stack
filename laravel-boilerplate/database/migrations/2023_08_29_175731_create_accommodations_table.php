<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAccommodationsTable extends Migration
{
    public function up()
    {
        Schema::create('accommodations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->decimal('price', 10, 2)->nullable()->default(0); // Adjust precision and scale as needed
            $table->text('description')->nullable();
            $table->unsignedBigInteger('camping_id')->nullable();
            $table->decimal('beds_available', 10, 2)->nullable()->default(0); // Adjust precision and scale as needed
            $table->decimal('discount_price', 10, 2)->nullable()->default(0); // Adjust precision and scale as needed
            $table->string('profile_image_url')->nullable();
            $table->timestamps();
            $table->foreign('camping_id')->references('id')->on('campings');
        });
    }

    public function down()
    {
        Schema::dropIfExists('accommodations');
    }
}
