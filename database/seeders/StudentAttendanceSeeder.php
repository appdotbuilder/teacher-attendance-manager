<?php

namespace Database\Seeders;

use App\Models\Attendance;
use App\Models\Student;
use Illuminate\Database\Seeder;

class StudentAttendanceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create sample students
        $students = [
            ['student_id' => 'STU001', 'name' => 'Alice Johnson'],
            ['student_id' => 'STU002', 'name' => 'Bob Smith'],
            ['student_id' => 'STU003', 'name' => 'Charlie Brown'],
            ['student_id' => 'STU004', 'name' => 'Diana Prince'],
            ['student_id' => 'STU005', 'name' => 'Emma Watson'],
            ['student_id' => 'STU006', 'name' => 'Frank Miller'],
            ['student_id' => 'STU007', 'name' => 'Grace Lee'],
            ['student_id' => 'STU008', 'name' => 'Henry Ford'],
            ['student_id' => 'STU009', 'name' => 'Iris Chen'],
            ['student_id' => 'STU010', 'name' => 'Jack Wilson'],
        ];

        foreach ($students as $studentData) {
            Student::create($studentData);
        }

        // Create some sample attendance records for the past few days
        $createdStudents = Student::all();
        $dates = [
            now()->subDays(4)->format('Y-m-d'),
            now()->subDays(3)->format('Y-m-d'),
            now()->subDays(2)->format('Y-m-d'),
            now()->subDays(1)->format('Y-m-d'),
        ];

        foreach ($dates as $date) {
            foreach ($createdStudents as $student) {
                $status = collect(['present', 'present', 'present', 'absent', 'late', 'excused'])
                    ->random(); // Weighted towards 'present'
                
                Attendance::create([
                    'student_id' => $student->id,
                    'attendance_date' => $date,
                    'status' => $status,
                ]);
            }
        }
    }
}