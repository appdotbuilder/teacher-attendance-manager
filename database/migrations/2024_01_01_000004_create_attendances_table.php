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
        Schema::create('attendances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained()->onDelete('cascade');
            $table->date('attendance_date')->comment('Date of attendance');
            $table->enum('status', ['present', 'absent', 'late', 'excused'])->default('present')->comment('Attendance status');
            $table->timestamps();
            
            // Unique constraint to prevent duplicate attendance records for same student/date
            $table->unique(['student_id', 'attendance_date']);
            
            // Indexes for performance
            $table->index('attendance_date');
            $table->index('status');
            $table->index(['attendance_date', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attendances');
    }
};