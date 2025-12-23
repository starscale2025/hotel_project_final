import React from 'react';
import Navbar from '../components/Navbar';

export default function Offers() {
  const offers = [

    {
      title: 'Member Exclusive',
      desc: 'Join our loyalty program and enjoy exclusive benefits and rates.',
      validity: 'Ongoing'
    },
    {
      title: 'Advance Purchase',
      desc: 'Book 14 days in advance and save 15% on your stay.',
      validity: 'Round the Year'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* Hero */}
      <section className="relative h-[50vh] md:h-[60vh] bg-taj-dark">
        <img
          src="/sanqi.jpg"
          alt="Offers"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <p className="section-subtitle text-white/80">EXCLUSIVE DEALS</p>
            <h1 className="text-4xl md:text-6xl font-serif text-white mb-4">OFFERS</h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16 max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-wrap justify-center gap-8">
          {offers.map((offer, idx) => (
            <div key={idx} className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1rem)] border border-gray-200 p-6 md:p-8 text-center hover:border-taj-gold transition-colors duration-300 group">
              <h3 className="text-2xl font-serif text-taj-dark mb-4 group-hover:text-taj-gold transition-colors">{offer.title}</h3>
              <p className="text-taj-gray mb-6 leading-relaxed text-sm md:text-base">{offer.desc}</p>
              <p className="text-xs tracking-widest text-taj-gold mb-8 uppercase">{offer.validity}</p>
              <button className="btn-outline border-taj-dark text-taj-dark hover:bg-taj-dark hover:text-white w-full">
                VIEW DETAILS
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}