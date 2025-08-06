import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import InputError from '@/components/input-error';

interface Props {
    errors: Record<string, string>;
    [key: string]: unknown;
}

export default function StudentsCreate({ errors }: Props) {
    const [data, setData] = useState({
        student_id: '',
        name: '',
    });
    const [processing, setProcessing] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);

        router.post(route('students.store'), data, {
            preserveScroll: true,
            onFinish: () => setProcessing(false),
            onSuccess: () => {
                // Will redirect to show page on success
            },
        });
    };

    return (
        <>
            <Head title="Add New Student" />
            <AppShell>
                <div className="max-w-2xl mx-auto p-6 space-y-6">
                    {/* Header */}
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            ➕ Add New Student
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Add a new student to your class roster
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
                                        {processing ? '💾 Saving...' : '💾 Add Student'}
                                    </Button>
                                    <Link href={route('students.index')}>
                                        <Button variant="outline" className="w-full sm:w-auto">
                                            ❌ Cancel
                                        </Button>
                                    </Link>
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Quick Tips */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">💡 Quick Tips</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-500">•</span>
                                    Student IDs must be unique across your entire class
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-500">•</span>
                                    Use consistent ID formats (e.g., STU001, STU002) for easy organization
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-500">•</span>
                                    Full names help identify students quickly during attendance
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-500">•</span>
                                    You can add multiple students and then take attendance for all of them
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </AppShell>
        </>
    );
}