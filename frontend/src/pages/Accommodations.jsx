import React, { useState } from 'react';
import Navbar from '../components/Navbar';

export default function Accommodations() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const rooms = [
    {
      id: 1,
      name: 'Luxury Room',
      price: '₹ 1,800 + GST',
      image: '/inroom.jpg',
      desc: 'Expansive suites with panoramic city views and bespoke amenities.'
    },
    {
      id: 2,
      name: 'Normal Room',
      price: '₹ 1,500 + GST',
      image: '/sanqi.jpg', // Placeholder
      desc: 'Contemporary elegance meets comfort in our spacious deluxe rooms.'
    }
  ];

  const facilities = [
    "Room Food service",
    "Parking",
    "AC & Air ventilated rooms"
  ];

  const instructions = [
    "Booking 24 hours before coming",
    "Cancellation charges apply",
    "Drugs not allowed",
    "Any damage to room & furniture shall be charged"
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* Hero */}
      <section className="relative h-[50vh] md:h-[60vh] bg-taj-dark">
        <img
          src="/inroom.jpg"
          alt="Accommodations"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <p className="section-subtitle text-white/80">STAY WITH US</p>
            <h1 className="text-4xl md:text-6xl font-serif text-white mb-4">ACCOMMODATIONS</h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16 max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="section-title text-3xl md:text-5xl">LUXURY ROOMS & SUITES</h2>
          <div className="w-24 h-1 bg-taj-gold mx-auto mb-6"></div>
          <p className="text-taj-gray max-w-2xl mx-auto text-sm md:text-base">
            Experience the epitome of comfort and style in our thoughtfully designed rooms and suites.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {rooms.map((room) => (
            <div key={room.id} className="group cursor-pointer">
              <div className="relative overflow-hidden h-64 md:h-80 mb-6">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500"></div>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-serif text-taj-dark mb-2">{room.name}</h3>
                <p className="text-taj-gold font-medium tracking-wider mb-3">{room.price} / NIGHT</p>
                <p className="text-taj-gray text-sm mb-6 px-4">{room.desc}</p>
                <button className="btn-outline border-taj-dark text-taj-dark hover:bg-taj-dark hover:text-white w-full md:w-auto">
                  VIEW DETAILS
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Facilities & Instructions */}
        <div className="grid md:grid-cols-2 gap-12 bg-gray-50 p-8 md:p-12 rounded-lg">
          <div>
            <h3 className="text-2xl font-serif text-taj-dark mb-6">Facilities</h3>
            <ul className="space-y-4">
              {facilities.map((facility, idx) => (
                <li key={idx} className="flex items-center text-taj-gray">
                  <span className="w-2 h-2 bg-taj-gold rounded-full mr-4"></span>
                  {facility}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-serif text-taj-dark mb-6">Instructions Before Booking</h3>
            <ul className="space-y-4">
              {instructions.map((instruction, idx) => (
                <li key={idx} className="flex items-start text-taj-gray">
                  <span className="text-taj-gold mr-4 mt-1">⚠</span>
                  {instruction}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}