import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";

const SuccessPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full text-center">

                <FaCheckCircle className="text-green-500 text-7xl mx-auto mb-5" />

                <h1 className="text-3xl font-bold text-gray-800">
                    Payment Successful!
                </h1>

                <p className="text-gray-600 mt-3">
                    Thank you for your purchase.
                    Your ticket has been booked successfully.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                        href="/allTickets"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
                    >
                        My Bookings
                    </Link>

                    <Link
                        href="/allTickets"
                        className="border border-gray-300 hover:bg-gray-100 px-6 py-3 rounded-lg transition"
                    >
                        Book More Tickets
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SuccessPage;