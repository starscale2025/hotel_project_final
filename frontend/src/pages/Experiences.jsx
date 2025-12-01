import React from 'react';
import Navbar from '../components/Navbar';

export default function Experiences() {
  const experiences = [
    {
      title: 'Heritage Walk',
      desc: 'Explore the historic charm of the city with our guided heritage walks.',
      image: '/hero-rooftop.jpg'
    },
    {
      title: 'Spa Rejuvenation',
      desc: 'Indulge in ancient Indian wellness therapies at our award-winning spa.',
      image: '/inroom.jpg'
    },
    {
      title: 'Culinary Masterclass',
      desc: 'Learn the secrets of royal Indian cuisine from our master chefs.',
      image: '/sanqi.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* Hero */}
      <section className="relative h-[50vh] md:h-[60vh] bg-taj-dark">
        <img
          src="/hero-rooftop.jpg"
          alt="Experiences"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <p className="section-subtitle text-white/80">UNFORGETTABLE MOMENTS</p>
            <h1 className="text-4xl md:text-6xl font-serif text-white mb-4">EXPERIENCES</h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16 max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="section-title text-3xl md:text-5xl">CURATED FOR YOU</h2>
          <div className="w-24 h-1 bg-taj-gold mx-auto mb-6"></div>
          <p className="text-taj-gray max-w-2xl mx-auto text-sm md:text-base">
            Immerse yourself in unique experiences designed to create lasting memories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {experiences.map((exp, idx) => (
            <div key={idx} className="bg-gray-50 pb-8 group hover:shadow-xl transition-shadow duration-300">
              <div className="h-64 overflow-hidden mb-6">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="px-6 md:px-8 text-center">
                <h3 className="text-xl font-serif text-taj-dark mb-3">{exp.title}</h3>
                <p className="text-taj-gray text-sm leading-relaxed mb-6">{exp.desc}</p>
                <a href="#" className="text-taj-gold text-sm tracking-widest uppercase font-medium border-b border-taj-gold pb-1 hover:text-taj-dark hover:border-taj-dark transition-colors">
                  Discover More
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}