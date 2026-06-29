import Image from "next/image";
import Link from "next/link";

const TicketsCard = ({ ticket }) => {
    if (!ticket) return null;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition w-full">
            {ticket.image ? (
                <div className="relative w-full h-70 bg-gray-100">
                    <Image
                        src={ticket.image}
                        alt={ticket.ticketTitle}
                        fill
                        className="object-cover"
                        unoptimized
                    />
                </div>
            ) : (
                <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
                    No Image
                </div>
            )}

    
            <div className="p-3 flex flex-col flex-1 space-y-1.5">
                <h3 className="text-base font-semibold text-gray-800 line-clamp-1">
                    {ticket.ticketTitle}
                </h3>
                <p className="text-sm text-gray-500">
                    {ticket.fromLocation} → {ticket.toLocation}
                </p>
                <p className="text-xs text-gray-600">
                    Transport: {ticket.transportType}
                </p>
                <p className="text-sm font-medium text-blue-600">
                    ৳{ticket.price} / unit
                </p>
                <div className="flex justify-between text-xs text-gray-600">
                    <span>Qty: {ticket.ticketQuantity}</span>
                    <span>Depart: {new Date(ticket.departureDate).toLocaleString()}</span>
                </div>


                {ticket.perks && ticket.perks.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-0.5">
                        {ticket.perks.slice(0, 3).map((perk) => (
                            <span key={perk} className="bg-gray-100 text-gray-600 text-[10px] px-2 py-0.5 rounded-full">
                                {perk}
                            </span>
                        ))}
                        {ticket.perks.length > 3 && (
                            <span className="text-[10px] text-gray-400">+{ticket.perks.length - 3}</span>
                        )}
                    </div>
                )}

                <div className="mt-1.5 pt-1.5 border-t border-gray-100">
                    <Link
                        href={`/allTickets/${ticket._id}`}
                        className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-1.5 px-3 rounded-lg transition"
                    >
                        See details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TicketsCard;