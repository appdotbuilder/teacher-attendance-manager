import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Student {
    id: number;
    student_id: string;
    name: string;
    status: string;
}

interface Props {
    students: Student[];
    selectedDate: string;
    attendanceStatuses: Record<string, string>;
    [key: string]: unknown;
}

export default function AttendanceIndex({ students, selectedDate, attendanceStatuses }: Props) {
    const [attendanceData, setAttendanceData] = useState<Record<number, string>>(
        students.reduce((acc, student) => ({
            ...acc,
            [student.id]: student.status
        }), {})
    );
    const [currentDate, setCurrentDate] = useState(selectedDate);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleDateChange = (date: string) => {
        setCurrentDate(date);
        router.get(route('attendance.index'), { date }, {
            preserveState: false,
            preserveScroll: true
        });
    };

    const handleStatusChange = (studentId: number, status: string) => {
        setAttendanceData(prev => ({
            ...prev,
            [studentId]: status
        }));
    };

    const handleSubmit = () => {
        setIsSubmitting(true);
        
        const attendances = students.map(student => ({
            student_id: student.id,
            status: attendanceData[student.id] || 'present'
        }));

        router.post(route('attendance.store'), {
            attendance_date: currentDate,
            attendances
        }, {
            preserveState: true,
            preserveScroll: true,
            onFinish: () => setIsSubmitting(false),
            onSuccess: () => {
                // Success message will be handled by flash messages
            }
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'present':
                return 'bg-green-100 text-green-800 hover:bg-green-200';
            case 'absent':
                return 'bg-red-100 text-red-800 hover:bg-red-200';
            case 'late':
                return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
            case 'excused':
                return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
            default:
                return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
        }
    };

    const getStatusStats = () => {
        const stats = students.reduce((acc, student) => {
            const status = attendanceData[student.id] || 'present';
            acc[status] = (acc[status] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
        return stats;
    };

    const stats = getStatusStats();

    return (
        <>
            <Head title="Student Attendance Management" />
            <AppShell>
                <div className="max-w-4xl mx-auto p-6 space-y-6">
                    {/* Header */}
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            📚 Student Attendance Management
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Manage attendance for your class efficiently
                        </p>
                    </div>

                    {/* Date Selection */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                📅 Select Date
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-4">
                                <Input
                                    type="date"
                                    value={currentDate}
                                    onChange={(e) => handleDateChange(e.target.value)}
                                    className="w-auto"
                                />
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    Total Students: {students.length}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Attendance Statistics */}
                    <Card>
                        <CardHeader>
                            <CardTitle>📊 Attendance Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {Object.entries(attendanceStatuses).map(([key, label]) => (
                                    <div key={key} className="text-center">
                                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(key)}`}>
                                            {label}: {stats[key] || 0}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Student List */}
                    <Card>
                        <CardHeader>
                            <CardTitle>👥 Student Attendance</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {students.length === 0 ? (
                                <div className="text-center py-8">
                                    <div className="text-gray-400 text-lg">👤</div>
                                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                                        No students found. Add some students to get started.
                                    </p>
                                    <Button
                                        onClick={() => router.visit(route('students.create'))}
                                        className="mt-4"
                                    >
                                        Add Students
                                    </Button>
                                </div>
                            ) : (
                                <div className="grid gap-4">
                                    {students.map((student) => (
                                        <div
                                            key={student.id}
                                            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                        >
                                            <div className="flex-1 mb-3 sm:mb-0">
                                                <div className="font-medium text-gray-900 dark:text-white">
                                                    {student.name}
                                                </div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                                    ID: {student.student_id}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Select
                                                    value={attendanceData[student.id]}
                                                    onValueChange={(value) => handleStatusChange(student.id, value)}
                                                >
                                                    <SelectTrigger className="w-32">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {Object.entries(attendanceStatuses).map(([key, label]) => (
                                                            <SelectItem key={key} value={key}>
                                                                {label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <Badge className={getStatusColor(attendanceData[student.id])}>
                                                    {attendanceStatuses[attendanceData[student.id]]}
                                                </Badge>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Submit Button */}
                    {students.length > 0 && (
                        <div className="flex justify-center">
                            <Button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                size="lg"
                                className="px-8"
                            >
                                {isSubmitting ? '💾 Saving...' : '💾 Save Attendance'}
                            </Button>
                        </div>
                    )}

                    {/* Quick Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>⚡ Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        const newData = students.reduce((acc, student) => ({
                                            ...acc,
                                            [student.id]: 'present'
                                        }), {});
                                        setAttendanceData(newData);
                                    }}
                                >
                                    ✅ Mark All Present
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        const newData = students.reduce((acc, student) => ({
                                            ...acc,
                                            [student.id]: 'absent'
                                        }), {});
                                        setAttendanceData(newData);
                                    }}
                                >
                                    ❌ Mark All Absent
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => router.visit(route('students.index'))}
                                >
                                    👥 Manage Students
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </AppShell>
        </>
    );
}