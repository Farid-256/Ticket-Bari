import Image from 'next/image';
import Link from 'next/link';
import {
    FaFacebook,
    FaTwitter,
    FaInstagram,
    FaYoutube,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt
} from 'react-icons/fa';
import { GrVisa } from 'react-icons/gr';
import { SiMastercard } from 'react-icons/si';
import { TbBrandStripe, TbCoinTaka } from 'react-icons/tb';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-white/80 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-6 py-16">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">


                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Image
                                src="/assets/logo.jpg"
                                height={100}
                                width={100}
                                alt="Ticket Bari Logo"
                                className='rounded-sm'
                            />
                            <h3 className="text-2xl font-bold text-white">
                                Ticket <span className="text-amber-500">Bari</span>
                            </h3>
                        </div>
                        <p className="text-sm text-gray-400 max-w-xs">
                            Book bus, train, launch &amp; flight tickets easily. Your trusted travel partner across Bangladesh.
                        </p>

                        <div className="flex gap-3 pt-2">
                            <a href="#" className="bg-gray-800 hover:bg-amber-500 p-2 rounded-full transition-colors">
                                <FaFacebook className="text-white/80" size={18} />
                            </a>
                            <a href="#" className="bg-gray-800 hover:bg-amber-500 p-2 rounded-full transition-colors">
                                <FaTwitter className="text-white/80" size={18} />
                            </a>
                            <a href="#" className="bg-gray-800 hover:bg-amber-500 p-2 rounded-full transition-colors">
                                <FaInstagram className="text-white/80" size={18} />
                            </a>
                            <a href="#" className="bg-gray-800 hover:bg-amber-500 p-2 rounded-full transition-colors">
                                <FaYoutube className="text-white/80" size={18} />
                            </a>
                        </div>
                    </div>


                    <div>
                        <h4 className="text-white font-semibold text-lg mb-4">Quick Links</h4>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
                            </li>
                            <li>
                                <Link href="/all-tickets" className="hover:text-amber-400 transition-colors">All Tickets</Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-amber-400 transition-colors">Contact Us</Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-amber-400 transition-colors">About</Link>
                            </li>
                        </ul>
                    </div>


                    <div>
                        <h4 className="text-white font-semibold text-lg mb-4">Contact Info</h4>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-3">
                                <FaEnvelope className="text-amber-400 shrink-0 mt-0.5" size={18} />
                                <span>support@ticketbari.com</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <FaPhone className="text-amber-400 shrink-0 mt-0.5" size={18} />
                                <span>+880 800 90 90</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <FaMapMarkerAlt className="text-amber-400 shrink-0 mt-0.5" size={18} />
                                <span>Dhaka, Bangladesh</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <FaFacebook className="text-amber-400 shrink-0 mt-0.5" size={18} />
                                <a href="#" className="hover:text-amber-400 transition-colors">TicketBari</a>
                            </li>
                        </ul>
                    </div>


                    <div>
                        <h4 className="text-white font-semibold text-lg mb-4">Payment Methods</h4>
                        <div className="flex flex-wrap gap-3">
                            <div className="bg-white/10 hover:bg-white/20 rounded-lg px-4 py-2 transition-colors flex items-center gap-0.5">
                                <GrVisa />
                                <span className="text-sm font-medium">Visa</span>
                            </div>
                            <div className="bg-white/10 hover:bg-white/20 rounded-lg px-4 py-2 transition-colors flex items-center gap-0.5">
                            <SiMastercard />
                                <span className="text-sm font-medium">Mastercard</span>
                            </div>

                            <div className="bg-white/10 hover:bg-white/20 rounded-lg px-4 py-2 transition-colors flex items-center gap-0.5">
                                <TbBrandStripe />
                                <span className="text-sm font-medium"> Stripe</span>
                            </div>
                            <div className="bg-white/10 hover:bg-white/20 rounded-lg px-4 py-2 transition-colors flex items-center gap-0.5">
                            <TbCoinTaka />
                                <span className="text-sm font-medium">bKash</span>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-4">
                            Secure payments. All transactions are encrypted.
                        </p>
                    </div>
                </div>

   
                <div className="mt-16 pt-6 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-500">
                        &copy; {currentYear} TicketBari. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-gray-500">
                        <Link href="/privacy" className="hover:text-amber-400 transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="hover:text-amber-400 transition-colors">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;