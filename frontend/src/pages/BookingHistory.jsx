import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BookingHistory = () => {
  const [roomsBooked, setRoomsBooked] = useState([]);
  const [tablesBooked, setTablesBooked] = useState([]);

  const token = localStorage.getItem("adminToken"); // get token

  const formatDate = (iso) => {
    if (!iso) return "-";
    return new Date(iso).toLocaleString("en-IN", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  useEffect(() => {
    const baseUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
    fetch(`${baseUrl}/dashboard/rooms`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setRoomsBooked(data))
      .catch((err) => console.error(err));
  }, [token]);

  useEffect(() => {
    const baseUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
    fetch(`${baseUrl}/dashboard/tables`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setTablesBooked(data))
      .catch((err) => console.error(err));
  }, [token]);

  return (
    <div className="text-white p-10">
      <Link to="/dashboard">← Back</Link>
      <h1 className="text-3xl mb-6 text-white">Heyy "Admin" 👋</h1>
      <div className="bg--100 w-full h-screen flex border-t-2 border-gray-600 divide-x divide-gray-600">
        {/* Rooms Side */}
        <div className="bg--300 w-full p-3">
          <h1 className="text-xl mb-6 text-luxury-gold">Rooms Booked</h1>
          <div className="flex flex-col gap-4">
            {roomsBooked.map((e) => (
              <div
                key={e._id}
                className={`w-full flex justify-between p-3 border-2 rounded-md items-center ${
                  e.status === "rejected"
                    ? "bg-red-500/20 border-red-500"
                    : e.status === "confirmed"
                    ? "bg-green-500/20 border-green-500"
                    : "bg-transparent border-amber-50"
                }`}
              >
                <p>Room No</p>
                <p>{e.firstName}</p>
                <p>{e.phone}</p>
                <div>
                  <p>
                    <strong>In:</strong> {formatDate(e.checkInDate)}
                  </p>
                  <p>
                    <strong>Out:</strong> {formatDate(e.checkOutDate)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tables Side */}
        <div className=" bg--500 w-full p-3">
          <h1 className="text-xl mb-6 text-luxury-gold">Tables Booked</h1>
          <div className="flex flex-col gap-4">
            {tablesBooked.map((e) => (
              <div
                key={e._id}
                className={`w-full flex justify-between p-3 border-2 rounded-md ${
                  e.status === "rejected"
                    ? "bg-red-500/20 border-red-500"
                    : e.status === "confirmed"
                    ? "bg-green-500/20 border-green-500"
                    : "bg-transparent border-amber-50"
                }`}
              >
                <p>Table No</p>
                <p>{e.firstName}</p>
                <p>{e.phone}</p>
                <p>{formatDate(e.date)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingHistory;
