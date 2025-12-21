import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RoomBookingForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        checkIn: '',
        checkInTime: '14:00',
        checkOut: '',
        checkOutTime: '11:00',
        guests: '2',
        roomType: 'Deluxe Suite',
    });

    const [duration, setDuration] = useState(0);

    // Calculate duration when dates change
    useEffect(() => {
        if (formData.checkIn && formData.checkOut) {
            const start = new Date(`${formData.checkIn}T${formData.checkInTime}`);
            const end = new Date(`${formData.checkOut}T${formData.checkOutTime}`);

            const diffTime = end - start;

            if (diffTime <= 0) {
                setDuration(0);
            } else {
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                setDuration(diffDays);
            }
        }
    }, [formData.checkIn, formData.checkOut, formData.checkInTime, formData.checkOutTime]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare payload with nights
        const payload = {
            ...formData,
            nights: duration
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/bookings`, {
                method: "POST",
                // credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Booking saved:", data);
                navigate("/confirmation", { state: payload });
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
                        <label className="block text-luxury-ivory/50 text-xs uppercase tracking-wider mb-2 group-focus-within:text-luxury-gold transition-colors">Phone Number</label>
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

            {/* Section 2: Stay Details */}
            <div className="space-y-6 pt-4">
                <h3 className="text-luxury-gold text-xs tracking-[0.2em] uppercase font-medium mb-6 border-b border-white/10 pb-2">
                    Stay Details
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="group">
                        <label className="block text-luxury-ivory/50 text-xs uppercase tracking-wider mb-2 group-focus-within:text-luxury-gold transition-colors">Check-in Date</label>
                        <input
                            type="date"
                            name="checkIn"
                            value={formData.checkIn}
                            onChange={handleChange}
                            className="w-full bg-transparent border-b border-white/20 py-2 text-luxury-ivory focus:outline-none focus:border-luxury-gold transition-colors [color-scheme:dark]"
                            required
                        />
                    </div>
                    <div className="group">
                        <label className="block text-luxury-ivory/50 text-xs uppercase tracking-wider mb-2 group-focus-within:text-luxury-gold transition-colors">Check-in Time</label>
                        <input
                            type="time"
                            name="checkInTime"
                            value={formData.checkInTime}
                            onChange={handleChange}
                            className="w-full bg-transparent border-b border-white/20 py-2 text-luxury-ivory focus:outline-none focus:border-luxury-gold transition-colors [color-scheme:dark]"
                            required
                        />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="group">
                        <label className="block text-luxury-ivory/50 text-xs uppercase tracking-wider mb-2 group-focus-within:text-luxury-gold transition-colors">Check-out Date</label>
                        <input
                            type="date"
                            name="checkOut"
                            value={formData.checkOut}
                            onChange={handleChange}
                            className="w-full bg-transparent border-b border-white/20 py-2 text-luxury-ivory focus:outline-none focus:border-luxury-gold transition-colors [color-scheme:dark]"
                            required
                        />
                    </div>
                    <div className="group">
                        <label className="block text-luxury-ivory/50 text-xs uppercase tracking-wider mb-2 group-focus-within:text-luxury-gold transition-colors">Check-out Time</label>
                        <input
                            type="time"
                            name="checkOutTime"
                            value={formData.checkOutTime}
                            onChange={handleChange}
                            className="w-full bg-transparent border-b border-white/20 py-2 text-luxury-ivory focus:outline-none focus:border-luxury-gold transition-colors [color-scheme:dark]"
                            required
                        />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="group">
                        <label className="block text-luxury-ivory/50 text-xs uppercase tracking-wider mb-2 group-focus-within:text-luxury-gold transition-colors">Guests</label>
                        <select
                            name="guests"
                            value={formData.guests}
                            onChange={handleChange}
                            className="w-full bg-transparent border-b border-white/20 py-2 text-luxury-ivory focus:outline-none focus:border-luxury-gold transition-colors [&>option]:bg-[#0A0A0C]"
                        >
                            {[1, 2, 3, 4, 5, 6].map(num => (
                                <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                            ))}
                        </select>
                    </div>
                    <div className="group">
                        <label className="block text-luxury-ivory/50 text-xs uppercase tracking-wider mb-2 group-focus-within:text-luxury-gold transition-colors">Room Type</label>
                        <select
                            name="roomType"
                            value={formData.roomType}
                            onChange={handleChange}
                            className="w-full bg-transparent border-b border-white/20 py-2 text-luxury-ivory focus:outline-none focus:border-luxury-gold transition-colors [&>option]:bg-[#0A0A0C]"
                        >
                            <option value="Deluxe Suite">Deluxe Suite</option>
                            <option value="Ocean View Room">Ocean View Room</option>
                            <option value="Presidential Suite">Presidential Suite</option>
                            <option value="Penthouse">Penthouse</option>
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
