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
            $table->decimal('price', 10, 2); // Adjust precision and scale as needed
            $table->text('description');
            $table->unsignedBigInteger('camping_id');
            $table->json('amenity_ids'); // Storing array of amenity IDs

            $table->timestamps();
            $table->foreign('camping_id')->references('id')->on('campings');
        });
    }

    public function down()
    {
        Schema::dropIfExists('accommodations');
    }
}
