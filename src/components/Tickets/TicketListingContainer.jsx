'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import TicketsCard from './TicketsCard';
import TicketFilters from './TicketFilters';

export default function TicketListingContainer({
    initialTickets,
    total,
    totalPages,
    currentPage,
    filters: initialFilters = {},
}) {
    const router = useRouter();
    const pathname = usePathname();

    const [search, setSearch] = useState(initialFilters.search || '');
    const [transportType, setTransportType] = useState(initialFilters.transportType || '');
    const [sort, setSort] = useState(initialFilters.sort || '');
    const [page, setPage] = useState(currentPage);

    // Build URL with current filters
    const updateUrl = (newPage = page) => {
        const params = new URLSearchParams();
        if (search) params.set('search', search);
        if (transportType) params.set('transportType', transportType);
        if (sort) params.set('sort', sort);
        if (newPage > 1) params.set('page', newPage);
        router.push(`${pathname}?${params.toString()}`);
    };

    // Trigger URL update when filters change
    useEffect(() => {
        updateUrl(1); // reset to page 1 on filter change
    }, [search, transportType, sort]);

    // Separate effect for page changes
    useEffect(() => {
        if (page !== currentPage) {
            updateUrl(page);
        }
    }, [page]);

    // Sync page with currentPage from server if URL changes externally
    useEffect(() => {
        if (currentPage !== page) {
            setPage(currentPage);
        }
    }, [currentPage]);

    const goToPage = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    // Handle filter changes from child
    const handleFilterChange = (field, value) => {
        if (field === 'search') setSearch(value);
        else if (field === 'transportType') setTransportType(value);
        else if (field === 'sort') setSort(value);
    };

    return (
        <>
            <TicketFilters
                fromLocation={search} // We repurpose fromLocation as search
                setFromLocation={(val) => handleFilterChange('search', val)}
                toLocation={''} // We don't have separate toLocation; search is combined
                setToLocation={() => { }} // unused
                selectedType={transportType}
                setSelectedType={(val) => handleFilterChange('transportType', val)}
                sortBy={sort}
                setSortBy={(val) => handleFilterChange('sort', val)}
            />

            <div className="max-w-7xl mx-auto mb-4 text-sm text-gray-500">
                Showing {initialTickets.length} of {total} tickets
            </div>

            {initialTickets.length === 0 ? (
                <div className="max-w-7xl mx-auto bg-white rounded-xl border border-gray-200 p-12 text-center">
                    <p className="text-gray-500 text-lg">No tickets found.</p>
                </div>
            ) : (
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {initialTickets.map((ticket) => (
                        <TicketsCard key={ticket._id} ticket={ticket} />
                    ))}
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="max-w-7xl mx-auto flex justify-center items-center gap-4 mt-8">
                    <button
                        onClick={() => goToPage(page - 1)}
                        disabled={page <= 1}
                        className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition"
                    >
                        Previous
                    </button>
                    <span className="text-sm text-gray-600">
                        Page {page} of {totalPages}
                    </span>
                    <button
                        onClick={() => goToPage(page + 1)}
                        disabled={page >= totalPages}
                        className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition"
                    >
                        Next
                    </button>
                </div>
            )}
        </>
    );
}