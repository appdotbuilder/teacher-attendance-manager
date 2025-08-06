import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Student {
    id: number;
    student_id: string;
    name: string;
    created_at: string;
    updated_at: string;
}

interface PaginatedStudents {
    data: Student[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}

interface Props {
    students: PaginatedStudents;
    [key: string]: unknown;
}

export default function StudentsIndex({ students }: Props) {
    const handleDelete = (student: Student) => {
        if (confirm(`Are you sure you want to delete ${student.name}?`)) {
            router.delete(route('students.destroy', student.id), {
                preserveScroll: true,
                onSuccess: () => {
                    // Success message will be handled by flash messages
                }
            });
        }
    };

    return (
        <>
            <Head title="Manage Students" />
            <AppShell>
                <div className="max-w-6xl mx-auto p-6 space-y-6">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                👥 Manage Students
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">
                                Add, edit, and manage your class roster
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Link href={route('home')}>
                                <Button variant="outline">
                                    📝 Take Attendance
                                </Button>
                            </Link>
                            <Link href={route('students.create')}>
                                <Button>
                                    ➕ Add Student
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Stats */}
                    <Card>
                        <CardHeader>
                            <CardTitle>📊 Class Overview</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                        {students.total}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        Total Students
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                                        {students.current_page}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        Current Page
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                                        {students.per_page}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        Per Page
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Students List */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Student List</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {students.data.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="text-6xl mb-4">👤</div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                        No students added yet
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                                        Get started by adding your first student to the class roster.
                                    </p>
                                    <Link href={route('students.create')}>
                                        <Button size="lg">
                                            ➕ Add Your First Student
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {students.data.map((student) => (
                                        <div
                                            key={student.id}
                                            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                        >
                                            <div className="flex-1 mb-3 sm:mb-0">
                                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                                    {student.name}
                                                </h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    Student ID: {student.student_id}
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                                    Added: {new Date(student.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Link href={route('students.show', student.id)}>
                                                    <Button variant="outline" size="sm">
                                                        👁️ View
                                                    </Button>
                                                </Link>
                                                <Link href={route('students.edit', student.id)}>
                                                    <Button variant="outline" size="sm">
                                                        ✏️ Edit
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDelete(student)}
                                                >
                                                    🗑️ Delete
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Pagination */}
                    {students.last_page > 1 && (
                        <div className="flex justify-center">
                            <div className="flex items-center gap-2">
                                {students.links.map((link, index) => (
                                    <div key={index}>
                                        {link.url ? (
                                            <Link
                                                href={link.url}
                                                className={`px-3 py-2 text-sm rounded-md ${
                                                    link.active
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                                                }`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ) : (
                                            <span
                                                className="px-3 py-2 text-sm text-gray-400 cursor-not-allowed"
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </AppShell>
        </>
    );
}