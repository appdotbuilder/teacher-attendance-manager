import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Student Attendance Management">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6 text-gray-900 lg:justify-center lg:p-8 dark:from-gray-900 dark:to-gray-800 dark:text-white">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-lg border border-blue-200 px-5 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50 dark:border-blue-600 dark:text-blue-300 dark:hover:bg-blue-900/20"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-lg px-5 py-2 text-sm font-medium text-gray-700 hover:bg-white/50 dark:text-gray-300 dark:hover:bg-white/10"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-lg border border-blue-200 px-5 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50 dark:border-blue-600 dark:text-blue-300 dark:hover:bg-blue-900/20"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
                
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow">
                    <main className="flex w-full max-w-5xl flex-col lg:flex-row lg:gap-12 items-center">
                        {/* Main Content */}
                        <div className="flex-1 text-center lg:text-left space-y-8">
                            <div className="space-y-4">
                                <div className="text-6xl lg:text-7xl">📚</div>
                                <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">
                                    Student Attendance Management
                                </h1>
                                <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0">
                                    Efficiently track and manage student attendance for your classroom
                                </p>
                            </div>

                            {/* Feature Highlights */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto lg:mx-0">
                                <div className="flex items-start space-x-3">
                                    <div className="text-2xl">📅</div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white">Date Selection</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            Easily select any date to record or view attendance
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="text-2xl">👥</div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white">Student Management</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            Add and manage your class roster with student IDs
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="text-2xl">✅</div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white">Status Tracking</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            Mark students as Present, Absent, Late, or Excused
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="text-2xl">📊</div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white">Quick Overview</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            View attendance statistics at a glance
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Call to Action */}
                            <div className="space-y-4">
                                {auth.user ? (
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                        <Link
                                            href={route('home')}
                                            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                                        >
                                            📝 Take Attendance
                                        </Link>
                                        <Link
                                            href={route('students.index')}
                                            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-blue-600 bg-white border-2 border-blue-200 rounded-lg hover:bg-blue-50 transform hover:scale-105 transition-all duration-200 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-600 dark:hover:bg-blue-900/20"
                                        >
                                            👥 Manage Students
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                        <Link
                                            href={route('register')}
                                            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                                        >
                                            🚀 Get Started
                                        </Link>
                                        <Link
                                            href={route('login')}
                                            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-blue-600 bg-white border-2 border-blue-200 rounded-lg hover:bg-blue-50 transform hover:scale-105 transition-all duration-200 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-600 dark:hover:bg-blue-900/20"
                                        >
                                            🔑 Sign In
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Visual Preview */}
                        <div className="flex-1 mt-12 lg:mt-0 max-w-md">
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold text-gray-900 dark:text-white">Today's Attendance</h3>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        {new Date().toLocaleDateString()}
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    {[
                                        { name: 'Alice Johnson', id: 'STU001', status: 'present' },
                                        { name: 'Bob Smith', id: 'STU002', status: 'absent' },
                                        { name: 'Charlie Brown', id: 'STU003', status: 'late' },
                                        { name: 'Diana Prince', id: 'STU004', status: 'present' },
                                    ].map((student, index) => (
                                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                            <div>
                                                <div className="font-medium text-gray-900 dark:text-white text-sm">
                                                    {student.name}
                                                </div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                                    {student.id}
                                                </div>
                                            </div>
                                            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                student.status === 'present' ? 'bg-green-100 text-green-800' :
                                                student.status === 'absent' ? 'bg-red-100 text-red-800' :
                                                student.status === 'late' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-blue-100 text-blue-800'
                                            }`}>
                                                {student.status === 'present' ? '✅ Present' :
                                                 student.status === 'absent' ? '❌ Absent' :
                                                 student.status === 'late' ? '⏰ Late' :
                                                 '📝 Excused'}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-green-600 dark:text-green-400">✅ Present: 2</span>
                                    <span className="text-red-600 dark:text-red-400">❌ Absent: 1</span>
                                    <span className="text-yellow-600 dark:text-yellow-400">⏰ Late: 1</span>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>

                {/* Footer */}
                <footer className="mt-12 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Built for teachers who care about efficient classroom management
                    </p>
                </footer>
            </div>
        </>
    );
}