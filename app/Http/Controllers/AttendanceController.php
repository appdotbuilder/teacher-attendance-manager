<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAttendanceRequest;
use App\Models\Attendance;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AttendanceController extends Controller
{
    /**
     * Display the attendance management page.
     */
    public function index(Request $request)
    {
        $selectedDate = $request->get('date', now()->format('Y-m-d'));
        
        // Get all students
        $students = Student::orderBy('name')->get();
        
        // Get existing attendance records for the selected date
        $existingAttendance = Attendance::forDate($selectedDate)
            ->with('student')
            ->get()
            ->keyBy('student_id');
        
        // Build student data with attendance status
        $studentsWithAttendance = $students->map(function ($student) use ($existingAttendance) {
            $attendance = $existingAttendance->get($student->id);
            
            return [
                'id' => $student->id,
                'student_id' => $student->student_id,
                'name' => $student->name,
                'status' => $attendance ? $attendance->status : 'present',
            ];
        });
        
        return Inertia::render('attendance/index', [
            'students' => $studentsWithAttendance,
            'selectedDate' => $selectedDate,
            'attendanceStatuses' => Attendance::STATUSES,
        ]);
    }

    /**
     * Store attendance records for multiple students.
     */
    public function store(StoreAttendanceRequest $request)
    {
        $validated = $request->validated();
        $attendanceDate = $validated['attendance_date'];
        $attendanceData = $validated['attendances'];

        // Process each student's attendance
        foreach ($attendanceData as $attendance) {
            Attendance::updateOrCreate(
                [
                    'student_id' => $attendance['student_id'],
                    'attendance_date' => $attendanceDate,
                ],
                [
                    'status' => $attendance['status'],
                ]
            );
        }

        return redirect()->route('attendance.index', ['date' => $attendanceDate])
            ->with('success', 'Attendance records have been saved successfully.');
    }
}