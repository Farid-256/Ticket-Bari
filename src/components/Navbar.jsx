'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

const Navbar = () => {
    const pathName = usePathname();
    const router = useRouter();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const { data: session, isPending, refetch } = useSession();

    const user = session?.user;

    // Logout handler
    const handleLogout = async () => {
        try {
            await authClient.signOut();
            toast.success("Logged out successfully!");
            await refetch();
            router.push("/");
            setShowDropdown(false);
            setMobileMenuOpen(false);
        } catch (error) {
            toast.error("Logout failed. Please try again.");
        }
    };

    // Loading state
    if (isPending) {
        return (
            <nav className="bg-amber-50 border-b sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-5 py-5 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Image className="rounded-full" src="/assets/navlogo.png" height={100} width={100} alt="logo" />
                        <h3 className="text-3xl font-bold text-blue-800">
                            Ticket <span className="text-amber-600">Bari</span>
                        </h3>
                    </div>
                    <div className="w-8 h-8 border-4 border-blue-800 border-t-transparent rounded-full animate-spin"></div>
                </div>
            </nav>
        );
    }

    return (
        <nav className="bg-amber-50 border-b sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-5 py-5">
                <div className="flex justify-between items-center">

                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <Image className="rounded-full" src="/assets/navlogo.png" height={100} width={100} alt="logo" />
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
                            href="/dashboard/vendor"
                            className={`text-lg ${pathName.startsWith('/dashboard') ? 'text-blue-800 border-b-2 border-blue-800' : 'text-gray-500 hover:text-blue-800'}`}
                        >
                            Dashboard
                        </Link>
                        <Link
                            href="/about"
                            className={`text-lg ${pathName === '/about' ? 'text-blue-800 border-b-2 border-blue-800' : 'text-gray-500 hover:text-blue-800'}`}
                        >
                            About
                        </Link>
                        <Link
                            href="/help"
                            className={`text-lg ${pathName === '/help' ? 'text-blue-800 border-b-2 border-blue-800' : 'text-gray-500 hover:text-blue-800'}`}
                        >
                            Help & Support
                        </Link>
                    </div>

                    {/* Right Side: Login/User */}
                    <div className="flex items-center gap-4">
                        {user ? (
                            // Logged in: Show avatar + dropdown
                            <div className="relative">
                                <div
                                    className="cursor-pointer flex items-center gap-2"
                                    onClick={() => setShowDropdown(!showDropdown)}
                                >
                                    {/* Avatar with image */}
                                    <div className="w-10 h-10 rounded-full overflow-hidden bg-blue-100 flex items-center justify-center border-2 border-blue-800">
                                        {user.image ? (
                                            <Image
                                                src={user.image}
                                                alt={user.name || 'User'}
                                                width={40}
                                                height={40}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-lg font-bold text-blue-800">
                                                {user.name?.[0] || 'U'}
                                            </span>
                                        )}
                                    </div>
                                    {/* User name */}
                                    <span className="hidden md:block text-blue-800 font-semibold">
                                        {user.name}
                                    </span>
                                </div>

                                {showDropdown && (
                                    <div className="absolute right-0 mt-3 w-52 bg-white rounded-2xl shadow-xl border py-2 z-50">
                                        <div className="px-6 py-2 text-sm text-gray-600 border-b">
                                            <p className="font-semibold">{user.name}</p>
                                            <p className="text-xs">{user.email}</p>
                                        </div>
                                        <Link
                                            href="/dashboard/vendor"
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
                            // Not logged in: Show Login & Register buttons
                            <div className="hidden md:flex gap-3">
                                <Link href="/auth/login">
                                    <button className="bg-blue-800 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded-sm transition cursor-pointer">
                                        Login
                                    </button>
                                </Link>
                                <Link href="/auth/register">
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
                            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-800 transition">
                                Home
                            </Link>
                            <Link href="/all-tickets" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-800 transition">
                                All Tickets
                            </Link>
                            <Link href="/dashboard/vendor" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-800 transition">
                                Dashboard
                            </Link>
                            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-800 transition">
                                About
                            </Link>
                            <Link href="/help" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-800 transition">
                                Help & Support
                            </Link>

                            {/* Mobile: User info or Login/Register */}
                            {user ? (
                                <>
                                    <div className="pt-4 border-t flex items-center gap-3">
                                        {/* Avatar kecil di mobile */}
                                        <div className="w-10 h-10 rounded-full overflow-hidden bg-blue-100 flex items-center justify-center">
                                            {user.image ? (
                                                <Image
                                                    src={user.image}
                                                    alt={user.name || 'User'}
                                                    width={40}
                                                    height={40}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <span className="text-lg font-bold text-blue-800">
                                                    {user.name?.[0] || 'U'}
                                                </span>
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-semibold">{user.name}</p>
                                            <p className="text-sm text-gray-500">{user.email}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-sm transition"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <div className="flex flex-col gap-3 pt-4 border-t">
                                    <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                                        <button className="w-full bg-blue-800 text-white py-2 rounded-sm">
                                            Login
                                        </button>
                                    </Link>
                                    <Link href="/auth/register" onClick={() => setMobileMenuOpen(false)}>
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