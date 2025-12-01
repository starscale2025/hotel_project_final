import React, { useState } from 'react';
import Navbar from '../components/Navbar';

export default function Accommodations() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const rooms = [
    {
      id: 1,
      name: 'Luxury Suite',
      price: '₹ 45,000',
      image: '/inroom.jpg',
      desc: 'Expansive suites with panoramic city views and bespoke amenities.'
    },
    {
      id: 2,
      name: 'Deluxe Room',
      price: '₹ 25,000',
      image: '/sanqi.jpg', // Placeholder
      desc: 'Contemporary elegance meets comfort in our spacious deluxe rooms.'
    },
    {
      id: 3,
      name: 'Presidential Suite',
      price: '₹ 1,50,000',
      image: '/hero-rooftop.jpg', // Placeholder
      desc: 'The ultimate in luxury, offering unparalleled privacy and service.'
    }
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      </section>
    </div>
  );
}