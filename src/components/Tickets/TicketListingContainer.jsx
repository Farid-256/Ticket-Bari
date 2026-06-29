"use client";

import React, { useState, useMemo } from "react";
import TicketsCard from "@/components/Tickets/TicketsCard";
import TicketFilters from "@/components/Tickets/TicketFilters";

export default function TicketListingContainer({ initialTickets }) {
    const [fromLocation, setFromLocation] = useState("");
    const [toLocation, setToLocation] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [sortBy, setSortBy] = useState("");

    // ফিল্টার + সর্ট লজিক
    const filteredTickets = useMemo(() => {
        let result = initialTickets;

        // From Location filter
        if (fromLocation.trim()) {
            const query = fromLocation.toLowerCase().trim();
            result = result.filter((ticket) =>
                ticket.fromLocation?.toLowerCase().includes(query)
            );
        }

        // To Location filter
        if (toLocation.trim()) {
            const query = toLocation.toLowerCase().trim();
            result = result.filter((ticket) =>
                ticket.toLocation?.toLowerCase().includes(query)
            );
        }

        // Transport Type filter
        if (selectedType) {
            result = result.filter((ticket) => ticket.transportType === selectedType);
        }

        // Sort by price
        if (sortBy === "price_asc") {
            result = [...result].sort((a, b) => a.price - b.price);
        } else if (sortBy === "price_desc") {
            result = [...result].sort((a, b) => b.price - a.price);
        }

        return result;
    }, [fromLocation, toLocation, selectedType, sortBy, initialTickets]);

    return (
        <>
            <TicketFilters
                fromLocation={fromLocation}
                setFromLocation={setFromLocation}
                toLocation={toLocation}
                setToLocation={setToLocation}
                selectedType={selectedType}
                setSelectedType={setSelectedType}
                sortBy={sortBy}
                setSortBy={setSortBy}
            />

            <div className="max-w-7xl mx-auto mb-4 text-sm text-gray-500">
                Showing {filteredTickets.length} ticket{filteredTickets.length !== 1 && "s"}
            </div>

            {filteredTickets.length > 0 ? (
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                    {filteredTickets.map((ticket) => (
                        <TicketsCard key={ticket._id} ticket={ticket} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 border border-dashed border-gray-300 rounded-3xl max-w-7xl mx-auto">
                    <p className="text-gray-500 text-lg">No tickets match your filters.</p>
                </div>
            )}
        </>
    );
}