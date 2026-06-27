'use client';

import { authClient } from '@/lib/auth-client';
import { Button, Input, Label, Form, FieldError, TextField } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-toastify';

const Register = () => {
    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const newUser = Object.fromEntries(formData.entries());

        if (newUser.password !== newUser.confirmPassword) {
            toast.error("Password & Confirm Password must match!");
            return;
        }

        const { data, error } = await authClient.signUp.email({
            name: newUser.name,
            email: newUser.email,
            password: newUser.password,
            image: newUser.image || null,
            role: newUser.role || 'user',
        });

        if (data) {
            toast.success('Account created successfully!');
            window.location.href = '/';
        } else if (error) {
            toast.error(error.message || "Registration failed");
        }
    };

    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="grid md:grid-cols-2">

                    {/* Left Side Illustration */}
                    <div className="hidden md:flex items-center justify-center bg-amber-50 p-8">
                        <div className="relative w-full max-w-xs aspect-square">
                            <Image
                                src="/assets/undraw_online-profile_v9c1.svg"
                                alt="Register Illustration"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </div>

                    {/* Right Side Form */}
                    <div className="p-8 md:p-10">
                        <div className="text-center mb-6">
                            <h3 className="text-2xl font-bold text-gray-800">Create Account</h3>
                            <p className="text-sm text-gray-500">Join TicketBari & start booking tickets</p>
                        </div>

                        <Form onSubmit={onSubmit} className="space-y-4">

                            <TextField isRequired name="name">
                                <Label className="text-gray-700">Full Name</Label>
                                <Input placeholder="Enter your name" className="w-full" />
                                <FieldError />
                            </TextField>

                            <TextField isRequired name="email" type="email">
                                <Label className="text-gray-700">Email</Label>
                                <Input placeholder="john@example.com" className="w-full" />
                                <FieldError />
                            </TextField>

                            {/* New Image URL Field */}
                            <TextField name="image">
                                <Label className="text-gray-700">Profile Picture URL (Optional)</Label>
                                <Input
                                    type="url"
                                    placeholder="https://example.com/your-photo.jpg"
                                    className="w-full"
                                />
                                <FieldError />
                                <p className="text-xs text-gray-500 mt-1">Paste image link (imgbb or any direct link)</p>
                            </TextField>

                            <TextField name="role" defaultValue="user">
                                <Label className="text-gray-700">Role</Label>
                                <select name="role" className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="user">User</option>
                                    <option value="vendor">Vendor</option>
                                </select>
                                <p className="text-xs text-gray-400 mt-1">Select your role</p>
                            </TextField>

                            <TextField isRequired minLength={6} name="password" type="password">
                                <Label className="text-gray-700">Password</Label>
                                <Input placeholder="Password" className="w-full" />
                                <p className="text-xs text-gray-400 mt-1">Minimum 6 characters</p>
                                <FieldError />
                            </TextField>

                            <TextField isRequired name="confirmPassword" type="password">
                                <Label className="text-gray-700">Confirm Password</Label>
                                <Input placeholder="Password" className="w-full" />
                                <FieldError />
                            </TextField>

                            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl">
                                Sign Up
                            </Button>

                            <p className="text-center text-sm text-gray-600 mt-2">
                                Already have an account?{' '}
                                <Link href="/auth/login" className="text-blue-600 hover:underline font-medium">
                                    Login here
                                </Link>
                            </p>
                        </Form>

                        {/* Google Sign In */}
                        <div className="flex items-center gap-4 my-6">
                            <hr className="flex-1 border-gray-200" />
                            <span className="text-xs text-gray-400">OR</span>
                            <hr className="flex-1 border-gray-200" />
                        </div>

                        <button
                            onClick={async () => {
                                await authClient.signIn.social({
                                    provider: 'google',
                                    callbackURL: '/',
                                });
                            }}
                            className="w-full flex items-center justify-center gap-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 rounded-xl transition"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 48 48">
                                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                            </svg>
                            Continue with Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;