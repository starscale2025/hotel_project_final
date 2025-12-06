import React, { useState , useEffect } from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
    const [roomsBooked, setRoomsBooked] = useState([]);
    const [tablesBooked, setTablesBooked] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/dashboard/rooms")
        .then(res => res.json())
        .then(data => setRoomsBooked(data));
    }, []);
    
    useEffect(() => {
        fetch("http://localhost:3000/dashboard/tables")
        .then(res => res.json())
        .then(data => setTablesBooked(data));
    }, []);
    console.log(roomsBooked , tablesBooked)

    const today = new Date().toISOString().split("T")[0];

    const todaysRooms = roomsBooked.filter(
        (e) => e.checkInDate.split("T")[0] === today
    );

    const todaysTables = tablesBooked.filter(
        (e) => e.date.split("T")[0] === today
    );


  return (
    <div className="text-white p-10">
        <div className="text-white flex justify-between w-fit divide-x divide-gray-600 mb-5">
            <Link to="/dashboard/rooms" className="px-4">Rooms</Link>
            <Link to="/dashboard/tables" className="px-4">Tables</Link>
            <Link to="/dashboard/booking-history" className="px-4">Booking History</Link>
        </div>

        <h1 className="text-3xl text-white mb-8">
            Heyy Admin 👋
        </h1>

        <div className='bg--100 w-full h-screen flex border-t-2 border-gray-600 divide-x divide-gray-600'>
            {/* Rooms Side */}
            <div className="bg--300 w-full p-3">
                <h1 className='text-xl mb-6 text-luxury-gold'>Rooms Booked for Today</h1>
                <div className='flex flex-col gap-4'>
                    {todaysRooms.map((e) => (
                        <div key={e._id} className='w-full flex justify-between p-3 border-2 border-amber-50 rounded-md'>
                            <p>Room No</p>
                            <p>{e.firstName}</p>
                            <p>{e.phone}</p>
                            {/* <p>{e.checkInDate.split("T")[0]}</p> */}
                            <p>{e.checkInTime}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tables Side */}
            <div className=" bg--500 w-full p-3">
                <h1 className='text-xl mb-6 text-luxury-gold'>Rooms Booked for Today</h1>
                <div className='flex flex-col gap-4'>
                    {todaysTables.map((e) => (
                        <div key={e._id} className='w-full flex justify-between p-3 border-2 border-amber-50 rounded-md'>
                            <p>Room No</p>
                            <p>{e.firstName}</p>
                            <p>{e.phone}</p>
                            <p>{e.time}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default Dashboard
