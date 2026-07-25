'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { Edit2 } from 'lucide-react';
import { updateTicket } from '@/lib/actions/tickets';

const EditTicketButton = ({ ticket, isRejected }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const perkOptions = ['AC', 'WiFi', 'TV', 'Charging Port', 'Breakfast'];

    const [formData, setFormData] = useState({
        ticketTitle: ticket.ticketTitle || '',
        fromLocation: ticket.fromLocation || '',
        toLocation: ticket.toLocation || '',
        transportType: ticket.transportType || '',
        price: ticket.price || '',
        ticketQuantity: ticket.ticketQuantity || '',
        departureDate: ticket.departureDate
            ? new Date(ticket.departureDate).toISOString().slice(0, 16)
            : '',
        perks: ticket.perks || [],
        image: ticket.image || '',
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData((prev) => ({
                ...prev,
                perks: checked
                    ? [...prev.perks, name]
                    : prev.perks.filter((p) => p !== name),
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await updateTicket(ticket._id, {
                ...formData,
                vendorId: ticket.vendorId,
                status: ticket.status,
            });
            if (result.success) {
                toast.success('Ticket updated successfully!');
                setIsOpen(false);
                router.refresh();
            } else {
                toast.error(result.message || 'Update failed');
            }
        } catch (error) {
            toast.error(error.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const inputClass =
        'w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800';

    return (
        <>
            {/* Edit Button */}
            <button
                onClick={() => setIsOpen(true)}
                disabled={isRejected}
                className={`p-2 rounded-lg transition ${isRejected
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                title="Edit Ticket"
            >
                <Edit2 className="w-4 h-4" />
            </button>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
                        {/* Header */}
                        <div className="flex items-center justify-between border-b px-6 py-4">
                            <h2 className="text-xl font-bold text-gray-800">
                                Update Ticket
                            </h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-2xl text-gray-400 hover:text-gray-600"
                            >
                                X
                            </button>
                        </div>

                        {/* Body */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            {/* Ticket Title */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Ticket Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="ticketTitle"
                                    value={formData.ticketTitle}
                                    onChange={handleChange}
                                    required
                                    className={inputClass}
                                />
                            </div>

                            {/* Image URL */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Image URL
                                </label>
                                <input
                                    type="text"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    className={inputClass}
                                    placeholder="https://..."
                                />
                            </div>

                            {/* From & To */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        From <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="fromLocation"
                                        value={formData.fromLocation}
                                        onChange={handleChange}
                                        required
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        To <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="toLocation"
                                        value={formData.toLocation}
                                        onChange={handleChange}
                                        required
                                        className={inputClass}
                                    />
                                </div>
                            </div>

                            {/* Transport Type & Price */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Transport Type <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="transportType"
                                        value={formData.transportType}
                                        onChange={handleChange}
                                        required
                                        className={inputClass}
                                    >
                                        <option value="">Select</option>
                                        <option value="Bus">Bus</option>
                                        <option value="Train">Train</option>
                                        <option value="Launch">Launch</option>
                                        <option value="Plane">Plane</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Price <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        required
                                        min="0"
                                        step="0.01"
                                        className={inputClass}
                                    />
                                </div>
                            </div>

                            {/* Quantity & Departure */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Quantity <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="ticketQuantity"
                                        value={formData.ticketQuantity}
                                        onChange={handleChange}
                                        required
                                        min="1"
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Departure <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="datetime-local"
                                        name="departureDate"
                                        value={formData.departureDate}
                                        onChange={handleChange}
                                        required
                                        className={inputClass}
                                    />
                                </div>
                            </div>

                            {/* Perks */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Perks
                                </label>
                                <div className="flex flex-wrap gap-4">
                                    {perkOptions.map((perk) => (
                                        <label key={perk} className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                name={perk}
                                                checked={formData.perks.includes(perk)}
                                                onChange={handleChange}
                                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                            />
                                            <span className="text-sm text-gray-700">{perk}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition disabled:opacity-50"
                            >
                                {loading ? 'Updating...' : 'Update Ticket'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default EditTicketButton;