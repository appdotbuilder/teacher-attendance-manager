import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface AttendanceRecord {
    id: number;
    attendance_date: string;
    status: string;
    created_at: string;
    updated_at: string;
}

interface Student {
    id: number;
    student_id: string;
    name: string;
    created_at: string;
    updated_at: string;
    attendances: AttendanceRecord[];
}

interface Props {
    student: Student;
    [key: string]: unknown;
}

export default function StudentsShow({ student }: Props) {
    const handleDelete = () => {
        if (confirm(`Are you sure you want to delete ${student.name}? This will also delete all attendance records for this student.`)) {
            router.delete(route('students.destroy', student.id), {
                onSuccess: () => {
                    router.visit(route('students.index'));
                }
            });
        }
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

    const getStatusLabel = (status: string) => {
        const labels: Record<string, string> = {
            'present': '✅ Present',
            'absent': '❌ Absent',
            'late': '⏰ Late',
            'excused': '📝 Excused'
        };
        return labels[status] || status;
    };

    const getAttendanceStats = () => {
        if (student.attendances.length === 0) return null;

        const stats = student.attendances.reduce((acc, record) => {
            acc[record.status] = (acc[record.status] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        return {
            total: student.attendances.length,
            present: stats.present || 0,
            absent: stats.absent || 0,
            late: stats.late || 0,
            excused: stats.excused || 0,
            attendanceRate: ((stats.present || 0) / student.attendances.length * 100).toFixed(1)
        };
    };

    const stats = getAttendanceStats();

    return (
        <>
            <Head title={`${student.name} - Student Details`} />
            <AppShell>
                <div className="max-w-4xl mx-auto p-6 space-y-6">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                👤 {student.name}
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">
                                Student ID: {student.student_id}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Link href={route('students.index')}>
                                <Button variant="outline">
                                    ← Back to Students
                                </Button>
                            </Link>
                            <Link href={route('students.edit', student.id)}>
                                <Button variant="outline">
                                    ✏️ Edit
                                </Button>
                            </Link>
                            <Button variant="destructive" onClick={handleDelete}>
                                🗑️ Delete
                            </Button>
                        </div>
                    </div>

                    {/* Student Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>📋 Student Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Full Name</label>
                                    <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
                                        {student.name}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Student ID</label>
                                    <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
                                        {student.student_id}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Added to Class</label>
                                    <p className="text-gray-900 dark:text-white mt-1">
                                        {new Date(student.created_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Last Updated</label>
                                    <p className="text-gray-900 dark:text-white mt-1">
                                        {new Date(student.updated_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Attendance Statistics */}
                    {stats && (
                        <Card>
                            <CardHeader>
                                <CardTitle>📊 Attendance Statistics</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                            {stats.total}
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                            Total Days
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                                            {stats.present}
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                            Present
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                                            {stats.absent}
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                            Absent
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                                            {stats.late}
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                            Late
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                            {stats.excused}
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                            Excused
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                                            {stats.attendanceRate}%
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                            Attendance Rate
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Attendance History */}
                    <Card>
                        <CardHeader>
                            <CardTitle>📅 Attendance History</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {student.attendances.length === 0 ? (
                                <div className="text-center py-8">
                                    <div className="text-4xl mb-4">📝</div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                        No attendance records yet
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                                        Start taking attendance to see records for this student.
                                    </p>
                                    <Link href={route('home')}>
                                        <Button>
                                            📝 Take Attendance
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {student.attendances
                                        .sort((a, b) => new Date(b.attendance_date).getTime() - new Date(a.attendance_date).getTime())
                                        .map((record) => (
                                        <div
                                            key={record.id}
                                            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                        >
                                            <div>
                                                <div className="font-medium text-gray-900 dark:text-white">
                                                    {new Date(record.attendance_date).toLocaleDateString('en-US', {
                                                        weekday: 'long',
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                                    Recorded on {new Date(record.created_at).toLocaleDateString()}
                                                </div>
                                            </div>
                                            <Badge className={getStatusColor(record.status)}>
                                                {getStatusLabel(record.status)}
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>⚡ Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                <Link href={route('home')}>
                                    <Button variant="outline">
                                        📝 Take Attendance
                                    </Button>
                                </Link>
                                <Link href={route('students.edit', student.id)}>
                                    <Button variant="outline">
                                        ✏️ Edit Student
                                    </Button>
                                </Link>
                                <Link href={route('students.create')}>
                                    <Button variant="outline">
                                        ➕ Add Another Student
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </AppShell>
        </>
    );
}