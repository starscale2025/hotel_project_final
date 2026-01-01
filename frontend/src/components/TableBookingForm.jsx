import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TableBookingForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        partySize: '2',
        seatingPreference: 'Indoor',
        occasion: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Note: Adjust endpoint if needed for table bookings
            const token = localStorage.getItem("adminToken"); // or sessionStorage if you use googleToken

const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/table-booking`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // <- send JWT
    },
    body: JSON.stringify({ ...formData, type: 'table' }),
});


            const data = await response.json();

            if (response.ok) {
                console.log("Table Booking saved:", data);
                navigate("/confirmation", { state: formData });
            } else {
                alert(data.message || "Something went wrong.");
            }

        } catch (error) {
            console.error("POST Error:", error);
            alert("Server unreachable. Try again later.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* Section 1: Personal Details */}
            <div className="space-y-6">
                <h3 className="text-luxury-gold text-xs tracking-[0.2em] uppercase font-medium mb-6 border-b border-white/10 pb-2">
                    Guest Information
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="group">
                        <label className="block text-luxury-ivory/50 text-xs uppercase tracking-wider mb-2 group-focus-within:text-luxury-gold transition-colors">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full bg-transparent border-b border-white/20 py-2 text-luxury-ivory focus:outline-none focus:border-luxury-gold transition-colors"
                            placeholder="John"
                            required
                        />
                    </div>
                    <div className="group">
                        <label className="block text-luxury-ivory/50 text-xs uppercase tracking-wider mb-2 group-focus-within:text-luxury-gold transition-colors">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full bg-transparent border-b border-white/20 py-2 text-luxury-ivory focus:outline-none focus:border-luxury-gold transition-colors"
                            placeholder="Doe"
                            required
                        />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="group">
                        <label className="block text-luxury-ivory/50 text-xs uppercase tracking-wider mb-2 group-focus-within:text-luxury-gold transition-colors">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-transparent border-b border-white/20 py-2 text-luxury-ivory focus:outline-none focus:border-luxury-gold transition-colors"
                            placeholder="john@example.com"
                            required
                        />
                    </div>
                    <div className="group">
                        <label className="block text-luxury-ivory/50 text-xs uppercase tracking-wider mb-2 group-focus-within:text-luxury-gold transition-colors">Contact Number</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full bg-transparent border-b border-white/20 py-2 text-luxury-ivory focus:outline-none focus:border-luxury-gold transition-colors"
                            placeholder="+91 XXXXXXXXXX"
                            required
                        />
                    </div>
                </div>
            </div>

            {/* Section 2: Reservation Details */}
            <div className="space-y-6 pt-4">
                <h3 className="text-luxury-gold text-xs tracking-[0.2em] uppercase font-medium mb-6 border-b border-white/10 pb-2">
                    Reservation Details
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="group">
                        <label className="block text-luxury-ivory/50 text-xs uppercase tracking-wider mb-2 group-focus-within:text-luxury-gold transition-colors">Date</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full bg-transparent border-b border-white/20 py-2 text-luxury-ivory focus:outline-none focus:border-luxury-gold transition-colors [color-scheme:dark]"
                            required
                        />
                    </div>
                    <div className="group">
                        <label className="block text-luxury-ivory/50 text-xs uppercase tracking-wider mb-2 group-focus-within:text-luxury-gold transition-colors">Time</label>
                        <input
                            type="time"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            className="w-full bg-transparent border-b border-white/20 py-2 text-luxury-ivory focus:outline-none focus:border-luxury-gold transition-colors [color-scheme:dark]"
                            required
                        />
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="group">
                        <label className="block text-luxury-ivory/50 text-xs uppercase tracking-wider mb-2 group-focus-within:text-luxury-gold transition-colors">Party Size</label>
                        <select
                            name="partySize"
                            value={formData.partySize}
                            onChange={handleChange}
                            className="w-full bg-transparent border-b border-white/20 py-2 text-luxury-ivory focus:outline-none focus:border-luxury-gold transition-colors [&>option]:bg-[#0A0A0C]"
                        >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                            ))}
                        </select>
                    </div>
                    <div className="group">
                        <label className="block text-luxury-ivory/50 text-xs uppercase tracking-wider mb-2 group-focus-within:text-luxury-gold transition-colors">Seating Preference</label>
                        <select
                            name="seatingPreference"
                            value={formData.seatingPreference}
                            onChange={handleChange}
                            className="w-full bg-transparent border-b border-white/20 py-2 text-luxury-ivory focus:outline-none focus:border-luxury-gold transition-colors [&>option]:bg-[#0A0A0C]"
                        >
                            <option value="Indoor">Indoor</option>
                            <option value="Outdoor Terrace">Outdoor Terrace</option>
                            <option value="Window View">Window View</option>
                            <option value="Private Dining Room">Private Dining Room</option>
                        </select>
                    </div>
                    <div className="group">
                        <label className="block text-luxury-ivory/50 text-xs uppercase tracking-wider mb-2 group-focus-within:text-luxury-gold transition-colors">Occasion</label>
                        <select
                            name="occasion"
                            value={formData.occasion}
                            onChange={handleChange}
                            className="w-full bg-transparent border-b border-white/20 py-2 text-luxury-ivory focus:outline-none focus:border-luxury-gold transition-colors [&>option]:bg-[#0A0A0C]"
                        >
                            <option value="">Select Occasion</option>
                            <option value="Birthday">Birthday</option>
                            <option value="Anniversary">Anniversary</option>
                            <option value="Business Dinner">Business Dinner</option>
                            <option value="Romantic Dinner">Romantic Dinner</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <div className="pt-8 flex flex-col items-end gap-2">
                <button
                    type="submit"
                    disabled={!sessionStorage.getItem('googleToken')}
                    className={`px-10 py-4 rounded-lg transition-all duration-300 text-xs tracking-[0.2em] uppercase font-medium ${sessionStorage.getItem('googleToken')
                        ? 'bg-luxury-gold hover:bg-luxury-gold-light text-white hover:shadow-[0_0_30px_rgba(200,169,98,0.4)] transform hover:-translate-y-1'
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        }`}
                >
                    Confirm Reservation
                </button>
                {!sessionStorage.getItem('googleToken') && (
                    <p className="text-red-500 text-xs tracking-wider uppercase font-medium">
                        sign in first
                    </p>
                )}
            </div>
        </form>
    );
}
