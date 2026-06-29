"use client";

import { FaSearch } from "react-icons/fa";

export default function TicketFilters({
    fromLocation,
    setFromLocation,
    toLocation,
    setToLocation,
    selectedType,
    setSelectedType,
    sortBy,
    setSortBy,
}) {
    const transportTypes = ["All", "Bus", "Train", "Launch", "Plane"];

    return (
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 max-w-7xl mx-auto mb-8">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">

                {/* From Location */}
                <div>
                    <label className="text-sm font-medium text-gray-600 block mb-1">From</label>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Dhaka"
                            value={fromLocation}
                            onChange={(e) => setFromLocation(e.target.value)}
                            className="w-full px-4 py-2.5 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        />
                        <FaSearch className="absolute left-3 top-3.5 text-gray-400" size={14} />
                    </div>
                </div>

                {/* To Location */}
                <div>
                    <label className="text-sm font-medium text-gray-600 block mb-1">To</label>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Chittagong"
                            value={toLocation}
                            onChange={(e) => setToLocation(e.target.value)}
                            className="w-full px-4 py-2.5 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        />
                        <FaSearch className="absolute left-3 top-3.5 text-gray-400" size={14} />
                    </div>
                </div>

                {/* Transport Type Filter */}
                <div>
                    <label className="text-sm font-medium text-gray-600 block mb-1">Transport Type</label>
                    <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    >
                        {transportTypes.map((type) => (
                            <option key={type} value={type === "All" ? "" : type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Sort by Price */}
                <div>
                    <label className="text-sm font-medium text-gray-600 block mb-1">Sort by</label>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    >
                        <option value="">Default</option>
                        <option value="price_asc">Price: Low → High</option>
                        <option value="price_desc">Price: High → Low</option>
                    </select>
                </div>

                {/* Clear Filters Button (Optional) */}
                <div>
                    <button
                        onClick={() => {
                            setFromLocation("");
                            setToLocation("");
                            setSelectedType("");
                            setSortBy("");
                        }}
                        className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2.5 px-4 rounded-xl transition"
                    >
                        Clear Filters
                    </button>
                </div>
            </div>
        </div>
    );
}