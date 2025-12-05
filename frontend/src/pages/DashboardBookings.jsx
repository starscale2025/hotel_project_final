import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const Dashboard = ({ type }) => {
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {

    const url = type === "rooms"
      ? "http://localhost:3000/dashboard/rooms"
      : "http://localhost:3000/dashboard/tables";

    fetch(url)
      .then(res => res.json())
      .then(data => setBookings(data));

  }, [type]); // <--- Run again when type changes

  const updateStatus = async (id, status) => {
    await fetch(`http://localhost:3000/booking/update-status/${id}?type=${type === "rooms" ? "room" : "table"}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });


    setBookings(prev =>
      prev.map(b => b._id === id ? { ...b, status } : b)
    );
  };

  return (
    <div className="p-10 text-white">
      <Link to="/dashboard">← Back</Link>
      <h1 className="text-3xl mb-6 text-white">
        Heyy {user ? user.displayName : 'Admin'} 👋
      </h1>

      <div className="grid grid-cols-4 gap-4">
        {bookings.slice().reverse().map(b => (
          <div key={b._id} className="border p-4 rounded mb-4">
            <h2 className="font-bold text-white text-2xl mb-4">
              {b.firstName} {b.lastName}
            </h2>
            <p>{b.email}</p>
            <p>Status: <b>{b.status}</b></p>

            <select
              className="bg-gray-800 p-2 rounded mt-2"
              value={b.status}
              onChange={(e) => updateStatus(b._id, e.target.value)}
            >
              <option value="hold">Hold</option>
              <option value="confirmed">Confirm</option>
              <option value="rejected">Reject</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
