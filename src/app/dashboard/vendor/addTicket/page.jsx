'use client';

import { useSession } from "@/lib/auth-client";
import { useState, useRef } from "react";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";
import { FaCloudUploadAlt, FaPlus, FaSpinner } from "react-icons/fa";
import { creatTicket } from "@/lib/actions/tickets";

const AddTicket = () => {
    const { data: session } = useSession();
    const user = session?.user;
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const fileInputRef = useRef(null);

    // Perks list
    const perkOptions = ['AC', 'WiFi', 'TV', 'Charging Port', 'Breakfast'];
    const [selectedPerks, setSelectedPerks] = useState([]);

    const handlePerkToggle = (perk) => {
        setSelectedPerks(prev =>
            prev.includes(perk) ? prev.filter(p => p !== perk) : [...prev, perk]);
    };

    // Image upload to imgbb
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast.error('Image size must be less than 5MB');
            return;
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
            toast.error('Please select an image file');
            return;
        }

        setUploading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await fetch(
                `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
                { method: 'POST', body: formData }
            );
            const data = await res.json();

            if (data.success) {
                const url = data.data.url;
                setImageUrl(url);
                setImagePreview(url);
                toast.success('Image uploaded successfully!');
            } else {
                toast.error('Image upload failed. Please try again.');
            }
        } catch (error) {
            toast.error('Error uploading image. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const ticketData = Object.fromEntries(formData.entries());

        // Validate
        if (!imageUrl) {
            toast.error('Please upload an image');
            return;
        }

        // Prepare data
        const dataToSubmit = {
            ticketTitle: ticketData.ticketTitle,
            fromLocation: ticketData.fromLocation,
            toLocation: ticketData.toLocation,
            transportType: ticketData.transportType,
            price: parseFloat(ticketData.price),
            ticketQuantity: parseInt(ticketData.ticketQuantity),
            departureDate: ticketData.departureDate,
            perks: selectedPerks,
            image: imageUrl,
            vendorId: user?.id,
            vendorName: user?.name,
            vendorEmail: user?.email,
            status: 'pending',
        };

        setLoading(true);
        try {
            const res = await creatTicket(dataToSubmit);
            if (res.insertedId) {
                toast.success('Ticket added successfully!');
                e.target.reset();
                setImagePreview(null);
                setImageUrl('');
                setSelectedPerks([]);
                redirect('/dashboard/tickets')
            } else {
                toast.error('Failed to add ticket. Please try again.');
            }
        } catch (error) {
            toast.error('Data Added Sucessfully');
        } finally {
            setLoading(false);
        }
    };

    // If not vendor, redirect
    if (!user || user.role !== 'vendor') {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-red-500 text-lg">Access Denied. Vendor only.</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Add New Ticket</h1>
                <p className="text-sm text-gray-500">Fill out the details to add a new ticket</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Ticket Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Ticket Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="ticketTitle"
                            required
                            placeholder="e.g. Dhaka to Chittagong Bus"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        />
                    </div>

                    {/* From & To */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                From (Location) <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="fromLocation"
                                required
                                placeholder="e.g. Dhaka"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                To (Location) <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="toLocation"
                                required
                                placeholder="e.g. Chittagong"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            />
                        </div>
                    </div>

                    {/* Transport Type & Price */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Transport Type <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="transportType"
                                required
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
                            >
                                <option value="">Select Transport</option>
                                <option value="Bus">Bus</option>
                                <option value="Train">Train</option>
                                <option value="Launch">Launch</option>
                                <option value="Plane">Plane</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Price (per unit) <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                name="price"
                                required
                                min="0"
                                step="0.01"
                                placeholder="e.g. 500"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            />
                        </div>
                    </div>

                    {/* Ticket Quantity & Departure */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Ticket Quantity <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                name="ticketQuantity"
                                required
                                min="1"
                                placeholder="e.g. 10"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Departure Date & Time <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="datetime-local"
                                name="departureDate"
                                required
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            />
                        </div>
                    </div>

                    {/* Perks (Checkboxes) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Perks (Select all that apply)
                        </label>
                        <div className="flex flex-wrap gap-3">
                            {perkOptions.map((perk) => (
                                <label
                                    key={perk}
                                    className="flex items-center gap-2 cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedPerks.includes(perk)}
                                        onChange={() => handlePerkToggle(perk)}
                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-700">{perk}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Ticket Image <span className="text-red-500">*</span>
                        </label>
                        <div
                            className={`border-2 border-dashed rounded-lg p-6 text-center transition cursor-pointer
                                ${imagePreview ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-blue-500'}`}
                            onClick={() => fileInputRef.current?.click()}>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageUpload}
                                accept="image/*"
                                className="hidden"
                            />

                            {uploading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <FaSpinner className="animate-spin text-blue-600" size={24} />
                                    <span className="text-gray-600">Uploading...</span>
                                </div>
                            ) : imagePreview ? (
                                <div className="relative">
                                    <Image
                                        src={imagePreview}
                                        alt="Preview"
                                        width={200}
                                        height={150}
                                        className="mx-auto rounded-lg object-cover max-h-48"
                                        unoptimized
                                    />
                                    <p className="text-sm text-green-600 mt-2">✅ Image uploaded! Click to change</p>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-2">
                                    <FaCloudUploadAlt size={48} className="text-gray-400" />
                                    <p className="text-gray-600">Click or drag to upload image</p>
                                    <p className="text-xs text-gray-400">PNG, JPG, GIF up to 5MB</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Vendor Info (Readonly) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 rounded-xl p-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-500">
                                Vendor Name
                            </label>
                            <p className="text-gray-800 font-medium">{user?.name || 'N/A'}</p>
                            <input type="hidden" name="vendorName" value={user?.name || ''} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-500">
                                Vendor Email
                            </label>
                            <p className="text-gray-800 font-medium">{user?.email || 'N/A'}</p>
                            <input type="hidden" name="vendorEmail" value={user?.email || ''} />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading || uploading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <FaSpinner className="animate-spin" size={20} />
                                Adding Ticket...
                            </>
                        ) : (
                            <>
                                <FaPlus size={18} />
                                Add Ticket
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddTicket;