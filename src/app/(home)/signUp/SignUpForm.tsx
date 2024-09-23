'use client';
import { useState } from 'react';

const SignUpForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        const res = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();

        if (res.ok) {
            setSuccessMessage('Registration was successful!');
            setError('');
        } else {
            setError(data.message || 'An error occurred!');
            setSuccessMessage('');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Already registered? 
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"> Sign in</a>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
                    <form onSubmit={handleSubmit} className="mb-0 space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <div className="mt-1">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-transparent rounded-md shadow-sm bg-white text-gray-900 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-transparent rounded-md shadow-sm bg-white text-gray-900 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-transparent rounded-md shadow-sm bg-white text-gray-900 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none"
                                />
                            </div>
                        </div>

                        <div className="flex items-center">
                            <input id="terms-and-privacy" name="terms-and-privacy" type="checkbox" className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" required />
                            <label htmlFor="terms-and-privacy" className="ml-2 block text-sm text-gray-900">
                                I agree to the 
                                <a href="#" className="text-indigo-600 hover:text-indigo-500"> Terms</a> and 
                                <a href="#" className="text-indigo-600 hover:text-indigo-500"> Privacy Policy</a>.
                            </label>
                        </div>

                        <div>
                            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Sign up
                            </button>
                        </div>

                        {error && <p className="text-red-500 mt-2 font-weight: 700">{error}</p>}
                        {successMessage && <p className="text-green-500 mt-2 font-weight: 700">{successMessage}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUpForm;
