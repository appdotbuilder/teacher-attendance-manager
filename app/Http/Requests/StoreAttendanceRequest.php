<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAttendanceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'attendance_date' => 'required|date',
            'attendances' => 'required|array',
            'attendances.*.student_id' => 'required|exists:students,id',
            'attendances.*.status' => 'required|in:present,absent,late,excused',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'attendance_date.required' => 'Attendance date is required.',
            'attendance_date.date' => 'Please provide a valid date.',
            'attendances.required' => 'Attendance data is required.',
            'attendances.array' => 'Attendance data must be an array.',
            'attendances.*.student_id.required' => 'Student ID is required.',
            'attendances.*.student_id.exists' => 'Selected student does not exist.',
            'attendances.*.status.required' => 'Attendance status is required.',
            'attendances.*.status.in' => 'Invalid attendance status.',
        ];
    }
}