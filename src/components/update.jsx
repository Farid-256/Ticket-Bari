"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { updateTicket } from '@/lib/actions/tickets';
import { FaPen } from 'react-icons/fa';

export function Update({ ticket, userId }) {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        ticketTitle: ticket.ticketTitle || '',
        fromLocation: ticket.fromLocation || '',
        toLocation: ticket.toLocation || '',
        transportType: ticket.transportType || '',
        price: ticket.price || '',
        ticketQuantity: ticket.ticketQuantity || '',
        departureDate: ticket.departureDate
            ? new Date(ticket.departureDate).toISOString().slice(0, 16)
            : "",
        image: ticket.image || '',
        perks: ticket.perks || [],
    });

    const router = useRouter();
    const perkOptions = ['AC', 'WiFi', 'TV', 'Charging Port', 'Breakfast'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePerkToggle = (perk) => {
        setFormData(prev => ({
            ...prev,
            perks: prev.perks.includes(perk)
                ? prev.perks.filter(p => p !== perk)
                : [...prev.perks, perk]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await updateTicket(ticket._id, { ...formData, vendorId: userId });
            if (res.success) {
                toast.success("Ticket updated successfully!");
                setIsOpen(false);
                router.refresh();
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const inputClass = "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                disabled={ticket.status === "rejected"}
                className={`flex-1 text-sm font-medium px-3 py-2 rounded-lg ${ticket.status === "rejected"
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
            >
                <FaPen className="inline mr-2" />
                Update
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
                    <div className="relative w-full max-w-2xl rounded-xl bg-white shadow-2xl">
                        {/* Header */}
                        <div className="flex items-center justify-between border-b p-5">
                            <h2 className="text-xl font-bold">Update Ticket</h2>
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="text-2xl text-gray-500 hover:text-red-500"
                            >
                                ×
                            </button>
                        </div>

                        {/* Body */}
                        <div className="max-h-[80vh] overflow-y-auto p-6">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Ticket Title */}
                                <div>
                                    <label className="block mb-1 font-medium">Ticket Title</label>
                                    <input
                                        name="ticketTitle"
                                        value={formData.ticketTitle}
                                        onChange={handleChange}
                                        className={inputClass}
                                    />
                                </div>

                                {/* From & To */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block mb-1 font-medium">From</label>
                                        <input
                                            name="fromLocation"
                                            value={formData.fromLocation}
                                            onChange={handleChange}
                                            className={inputClass}
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-1 font-medium">To</label>
                                        <input
                                            name="toLocation"
                                            value={formData.toLocation}
                                            onChange={handleChange}
                                            className={inputClass}
                                        />
                                    </div>
                                </div>

                                {/* Transport Type & Price */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block mb-1 font-medium">Transport Type</label>
                                        <input
                                            name="transportType"
                                            value={formData.transportType}
                                            onChange={handleChange}
                                            className={inputClass}
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-1 font-medium">Price (per unit)</label>
                                        <input
                                            name="price"
                                            type="number"
                                            value={formData.price}
                                            onChange={handleChange}
                                            className={inputClass}
                                        />
                                    </div>
                                </div>

                                {/* Quantity & Departure Date */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block mb-1 font-medium">Ticket Quantity</label>
                                        <input
                                            name="ticketQuantity"
                                            type="number"
                                            value={formData.ticketQuantity}
                                            onChange={handleChange}
                                            className={inputClass}
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-1 font-medium">Departure Date</label>
                                        <input
                                            name="departureDate"
                                            type="datetime-local"
                                            value={formData.departureDate}
                                            onChange={handleChange}
                                            className={inputClass}
                                        />
                                    </div>
                                </div>

                                {/* Image URL */}
                                <div>
                                    <label className="block mb-1 font-medium">Image URL</label>
                                    <input
                                        name="image"
                                        value={formData.image}
                                        onChange={handleChange}
                                        className={inputClass}
                                        placeholder="https://..."
                                    />
                                </div>

                                {/* Perks */}
                                <div>
                                    <label className="block mb-2 font-medium">Perks</label>
                                    <div className="flex flex-wrap gap-3">
                                        {perkOptions.map((perk) => (
                                            <label key={perk} className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.perks.includes(perk)}
                                                    onChange={() => handlePerkToggle(perk)}
                                                />
                                                {perk}
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {loading ? "Updating..." : "Update Ticket"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}