import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import InputError from '@/components/input-error';

interface Student {
    id: number;
    student_id: string;
    name: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    student: Student;
    errors: Record<string, string>;
    [key: string]: unknown;
}

export default function StudentsEdit({ student, errors }: Props) {
    const [data, setData] = useState({
        student_id: student.student_id,
        name: student.name,
    });
    const [processing, setProcessing] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);

        router.patch(route('students.update', student.id), data, {
            preserveScroll: true,
            onFinish: () => setProcessing(false),
            onSuccess: () => {
                // Will redirect to show page on success
            },
        });
    };

    return (
        <>
            <Head title={`Edit ${student.name}`} />
            <AppShell>
                <div className="max-w-2xl mx-auto p-6 space-y-6">
                    {/* Header */}
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            ✏️ Edit Student
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Update student information
                        </p>
                    </div>

                    {/* Form */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Student Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Student ID */}
                                <div className="space-y-2">
                                    <label htmlFor="student_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Student ID
                                    </label>
                                    <Input
                                        id="student_id"
                                        type="text"
                                        value={data.student_id}
                                        onChange={(e) => setData({ ...data, student_id: e.target.value })}
                                        placeholder="e.g., STU001"
                                        className="w-full"
                                        required
                                    />
                                    <InputError message={errors.student_id} />
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Enter a unique identifier for the student (e.g., STU001, 12345)
                                    </p>
                                </div>

                                {/* Student Name */}
                                <div className="space-y-2">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Full Name
                                    </label>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData({ ...data, name: e.target.value })}
                                        placeholder="e.g., John Doe"
                                        className="w-full"
                                        required
                                    />
                                    <InputError message={errors.name} />
                                </div>

                                {/* Form Actions */}
                                <div className="flex flex-col sm:flex-row gap-3 pt-6">
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="flex-1 sm:flex-none"
                                    >
                                        {processing ? '💾 Saving...' : '💾 Update Student'}
                                    </Button>
                                    <Link href={route('students.show', student.id)}>
                                        <Button variant="outline" className="w-full sm:w-auto">
                                            ❌ Cancel
                                        </Button>
                                    </Link>
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Student Details */}
                    <Card>
                        <CardHeader>
                            <CardTitle>📋 Current Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div>
                                    <label className="font-medium text-gray-600 dark:text-gray-400">Added to Class</label>
                                    <p className="text-gray-900 dark:text-white mt-1">
                                        {new Date(student.created_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                                <div>
                                    <label className="font-medium text-gray-600 dark:text-gray-400">Last Updated</label>
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

                    {/* Important Notice */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-amber-600 dark:text-amber-400">⚠️ Important Notice</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Changing the student ID or name will update all existing attendance records for this student. 
                                Make sure the information is accurate before saving.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </AppShell>
        </>
    );
}