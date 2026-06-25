'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
    const pathName = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);


    const user = null; 

    const handleLogout = () => {
  
        console.log("Logout clicked");
        setShowDropdown(false);
        setMobileMenuOpen(false);
    };

    return (
        <nav className="bg-amber-50 border-b sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-5 py-5">
                <div className="flex justify-between items-center">

                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <Image className="rounded-full" src="/assets/navlogo.png" height={100} width={100} alt="logo"
                        />
                        <h3 className="text-3xl font-bold text-blue-800">
                            Ticket <span className="text-amber-600">Bari</span>
                        </h3>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-5">
                        <Link
                            href="/"
                            className={`text-lg ${pathName === '/' ? 'text-blue-800 border-b-2 border-blue-800' : 'text-gray-500 hover:text-blue-800'}`}
                        >
                            Home
                        </Link>

                        <Link
                            href="/all-tickets"
                            className={`text-lg ${pathName === '/all-tickets' ? 'text-blue-800 border-b-2 border-blue-800' : 'text-gray-500 hover:text-blue-800'}`}
                        >
                            All Tickets
                        </Link>

                        <Link
                            href="/dashboard"
                            className={`text-lg ${pathName.startsWith('/dashboard') ? 'text-blue-800 border-b-2 border-blue-800' : 'text-gray-500 hover:text-blue-800'}`}
                        >
                            Dashboard
                        </Link>

                        <Link
                            href="/"
                            className={`text-lg ${pathName.startsWith('/about') ? 'text-blue-800 border-b-2 border-blue-800' : 'text-gray-500 hover:text-blue-800'}`}
                        >
                            About
                        </Link>

                        <Link
                            href="/"
                            className={`text-lg ${pathName.startsWith('/help&support') ? 'text-blue-800 border-b-2 border-blue-800' : 'text-gray-500 hover:text-blue-800'}`}
                        >
                            Help & Support
                        </Link>
                    </div>

                    {/* Right Side: Login/User */}
                    <div className="flex items-center gap-4">
                        {user ? (
                            
                            <div className="relative">
                                <div
                                    className="cursor-pointer flex items-center gap-2"
                                    onClick={() => setShowDropdown(!showDropdown)}
                                >
                                    <div className="w-10 h-10 rounded-full bg-blue-800 text-white flex items-center justify-center font-bold text-lg">
                                        {user.name?.[0] || 'U'}
                                    </div>
                                </div>

                                {showDropdown && (
                                    <div className="absolute right-0 mt-3 w-52 bg-white rounded-2xl shadow-xl border py-2 z-50">
                                        <div className="px-6 py-2 text-sm text-gray-600 border-b">
                                            <p className="font-semibold">{user.name}</p>
                                            <p className="text-xs">{user.email}</p>
                                        </div>
                                        <Link
                                            href="/dashboard/profile"
                                            className="block px-6 py-3 hover:bg-gray-100 transition"
                                            onClick={() => setShowDropdown(false)}
                                        >
                                            My Profile
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-6 py-3 hover:bg-gray-100 text-red-600 font-medium transition"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                           
                            <div className="hidden md:flex gap-3">
                                <Link href="/login">
                                    <button className="bg-blue-800 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded-sm transition cursor-pointer">
                                        Login
                                    </button>
                                </Link>
                                <Link href="/register">
                                    <button className="bg-blue-800 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded-sm transition cursor-pointer">
                                        Get Started
                                    </button>
                                </Link>
                            </div>
                        )}

                        {/* Mobile Hamburger */}
                        <button
                            className="md:hidden"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden mt-6 py-6 border-t border-gray-200">
                        <div className="flex flex-col gap-6 text-lg">
                            <Link
                                href="/"
                                onClick={() => setMobileMenuOpen(false)}
                                className="hover:text-blue-800 transition"
                            >
                                Home
                            </Link>
                            <Link
                                href="/all-tickets"
                                onClick={() => setMobileMenuOpen(false)}
                                className="hover:text-blue-800 transition"
                            >
                                All Tickets
                            </Link>
                            <Link
                                href="/dashboard"
                                onClick={() => setMobileMenuOpen(false)}
                                className="hover:text-blue-800 transition"
                            >
                                Dashboard
                            </Link>

                            
                            {!user && (
                                <div className="flex flex-col gap-3 pt-4 border-t">
                                    <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                                        <button className="w-full bg-blue-800 text-white py-2 rounded-sm">
                                            Login
                                        </button>
                                    </Link>
                                    <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                                        <button className="w-full bg-blue-800 text-white py-2 rounded-sm">
                                            Get Started
                                        </button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;