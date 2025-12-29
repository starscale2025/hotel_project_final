import React, { useState , useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const [roomsBooked, setRoomsBooked] = useState([]);
    const [tablesBooked, setTablesBooked] = useState([]);
    const navigate = useNavigate();

    // Fetch rooms
    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

        fetch(`${baseUrl}/dashboard/rooms`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(data => setRoomsBooked(data))
        .catch(err => console.error(err));
    }, []);

    const formatDate = (iso) => {
  if (!iso) return "-";
  return new Date(iso).toLocaleString("en-IN", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });
};
    
    // Fetch tables
    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

        fetch(`${baseUrl}/dashboard/tables`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(data => setTablesBooked(data))
        .catch(err => console.error(err));
    }, []);

    const today = new Date().toISOString().split("T")[0];

    const todaysRooms = Array.isArray(roomsBooked)
        ? roomsBooked.filter(e => e.checkInDate.split("T")[0] === today)
        : [];

    const todaysTables = Array.isArray(tablesBooked)
        ? tablesBooked.filter(e => e.date.split("T")[0] === today)
        : [];

    // Logout handler
    const handleLogout = () => {
        localStorage.removeItem("adminToken"); // Clear token
        navigate("/admin/login"); // Redirect to login
    }

    return (
        <div className="text-white p-10">
            <div className="flex justify-between items-center mb-5">
                <div className="flex divide-x divide-gray-600 w-fit">
                    <Link to="/dashboard/rooms" className="px-4">Rooms</Link>
                    <Link to="/dashboard/tables" className="px-4">Tables</Link>
                    <Link to="/dashboard/booking-history" className="px-4">Booking History</Link>
                </div>

                <button 
                    onClick={handleLogout} 
                    className="px-4 py-2 bg-red-600 rounded text-white hover:bg-red-700"
                >
                    Logout
                </button>
            </div>

            <h1 className="text-3xl text-white mb-8">
                Heyy Admin 👋
            </h1>

            <div className='bg--100 w-full h-screen flex border-t-2 border-gray-600 divide-x divide-gray-600'>
                {/* Rooms Side */}
                <div className="bg--300 w-full p-3">
                    <h1 className='text-xl mb-6 text-luxury-gold'>Rooms Booked for Today</h1>
                    <div className='flex flex-col gap-4'>
                        {todaysRooms.filter(e => e.status === "confirmed").map((e) => (
                            <div key={e._id} className='w-full flex justify-between p-3 border-2 border-amber-50 rounded-md'>
                                {/* <p>Room No</p> */}
                                {/* <p>{e._id}</p> */}
                                <p>{e.firstName}</p>
                                <p>{e.phone}</p>
                                <div>
                                    <p><strong>In: </strong>{formatDate(e.checkInDate)}</p>
                                    <p><strong>Out:</strong> {formatDate(e.checkOutDate)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tables Side */}
                <div className=" bg--500 w-full p-3">
                    <h1 className='text-xl mb-6 text-luxury-gold'>Tables Booked for Today</h1>
                    <div className='flex flex-col gap-4'>
                        {todaysTables.filter(e => e.status === "confirmed").map((e) => (
                            <div key={e._id} className='w-full flex justify-between p-3 border-2 border-amber-50 rounded-md'>
                                <p>Table No</p>
                                <p>{e.firstName}</p>
                                <p>{e.phone}</p>
                                <p>{formatDate(e.time)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
