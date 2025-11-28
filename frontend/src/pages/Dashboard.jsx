import { useEffect, useState } from 'react';

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/dashboard")
      .then(res => res.json())
      .then(data => setBookings(data));
  }, []);

  const updateStatus = async (id, status) => {
    await fetch(`http://localhost:3000/booking/update-status/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });

    // Update UI without reload
    setBookings(prev =>
      prev.map(b => b._id === id ? { ...b, status } : b)
    );
  };

  return (
    <div className="p-10 text-white">
      <h1 className="text-3xl mb-6 text-white">Hi Abhi👋</h1>

      {bookings.map(b => (
        <div key={b._id} className="border p-4 rounded mb-4">
          <h2 className="font-bold text-white text-2xl mb-4">{b.firstName} {b.lastName}</h2>
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
  );
};

export default Dashboard;
