// ...existing code...
import React, { useState } from 'react';
import Navbar from '../components/Navbar';

export default function DiningPage() {
  const [selectedRestaurant, setSelectedRestaurant] = useState('all');
  const [reservationData, setReservationData] = useState({
    people: '2',
    time: '7:00 PM',
    date: 'Nov 26, 2025'
  });

  const restaurants = [
    {
      id: 'aer',
      name: 'AER Rooftop Bar',
      category: 'Rooftop Bar',
      image: '/hero-rooftop.jpg',
      description: "Chandigarh's chic open-air rooftop bar offers innovative cocktails and premier wine selections, with a scenic view of the bay.",
      hours: 'Daily 5:00 PM – 1:30 AM',
      cuisine: 'Bar & Lounge',
      priceRange: '₹₹₹'
    },
    {
      id: 'sanqi',
      name: 'San:Qi',
      category: 'Asian Fusion',
      image: '/sanqi.jpg',
      description: 'From tandoor to woks, sushi bar to Thai cookery, our dramatic dining room takes you on a pan-Asian culinary tour.',
      hours: 'Daily 12:00 PM – 11:30 PM',
      cuisine: 'Pan-Asian',
      priceRange: '₹₹₹₹'
    },
    {
      id: 'opus',
      name: 'Opus Restaurant',
      category: 'Fine Dining',
      image: '/opus.jpg',
      description: 'Immerse yourself in a culinary experience that spans continents with a selection of coffees, teas, wines and cocktails.',
      hours: 'Daily 6:30 AM – 11:00 PM',
      cuisine: 'International',
      priceRange: '₹₹₹₹'
    },
    {
      id: 'poolside',
      name: 'Poolside Dining',
      category: 'Casual Dining',
      image: '/inroom.jpg',
      description: 'Enjoy light bites and refreshing beverages by the pool in a relaxed, luxurious setting.',
      hours: 'Daily 7:00 AM – 7:00 PM',
      cuisine: 'Mediterranean',
      priceRange: '₹₹₹'
    }
  ];

  const diningExperiences = [
    {
      title: 'Sunday Brunch at AER',
      time: 'Every Sunday, 12:30 PM – 5:00 PM',
      description: 'Experience Sundays anew with our spirited brunch featuring indulgent cocktails and brunch favourites.',
      image: '/hero-rooftop.jpg'
    },
    {
      title: "Chef's Table Experience",
      time: 'Available upon request',
      description: 'An intimate culinary journey with our Executive Chef, featuring exclusive tasting menus.',
      image: '/opus.jpg'
    },
    {
      title: 'Wine Pairing Dinner',
      time: 'First Friday of every month',
      description: 'Discover perfectly paired wines with a specially curated multi-course menu.',
      image: '/sanqi.jpg'
    }
  ];

  const handleReservation = (e) => {
    e.preventDefault();
    alert(`Reservation request for ${reservationData.people} people at ${reservationData.time} on ${reservationData.date}`);
  };

  const filteredRestaurants = selectedRestaurant === 'all'
    ? restaurants
    : restaurants.filter(r => r.id === selectedRestaurant);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] bg-taj-dark">
        <img
          src="/hero-rooftop.jpg"
          alt="Dining at TheHollyWood"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <p className="text-sm md:text-xxl tracking-[0.3em] mb-4 text-taj-gold">CULINARY EXCELLENCE</p>
            <h1 className="text-4xl md:text-7xl font-serif mb-6 tracking-wider text-white">DINING</h1>
            <p className="text-base md:text-lg tracking-wide max-w-2xl mx-auto font-sans font-light">
              Discover exceptional dining experiences from rooftop cocktails to authentic Asian cuisine
            </p>
          </div>
        </div>
      </section>

      {/* Quick Reservation Widget */}
      <section className="bg-gray-50 py-12 -mt-20 relative z-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-2xl p-6 md:p-8 rounded-lg">
            <h3 className="text-xl md:text-2xl font-light text-center mb-6 tracking-wide">MAKE A RESERVATION</h3>
            <div className="flex flex-col md:flex-row flex-wrap gap-4 items-end justify-center">
              <div className="flex flex-col w-full md:flex-1 min-w-[150px]">
                <label className="text-xs tracking-widest text-gray-600 mb-2">RESTAURANT</label>
                <select
                  value={selectedRestaurant}
                  onChange={(e) => setSelectedRestaurant(e.target.value)}
                  className="border border-gray-300 px-4 py-2 focus:outline-none focus:border-gray-900 w-full"
                >
                  <option value="all">All Restaurants</option>
                  <option value="aer">AER Rooftop Bar</option>
                  <option value="sanqi">San:Qi</option>
                  <option value="opus">Opus Restaurant</option>
                  <option value="poolside">Poolside Dining</option>
                </select>
              </div>
              <div className="flex flex-col w-full md:flex-1 min-w-[120px]">
                <label className="text-xs tracking-widest text-gray-600 mb-2">PEOPLE</label>
                <select
                  value={reservationData.people}
                  onChange={(e) => setReservationData({ ...reservationData, people: e.target.value })}
                  className="border border-gray-300 px-4 py-2 focus:outline-none focus:border-gray-900 w-full"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8+</option>
                </select>
              </div>
              <div className="flex flex-col w-full md:flex-1 min-w-[120px]">
                <label className="text-xs tracking-widest text-gray-600 mb-2">TIME</label>
                <select
                  value={reservationData.time}
                  onChange={(e) => setReservationData({ ...reservationData, time: e.target.value })}
                  className="border border-gray-300 px-4 py-2 focus:outline-none focus:border-gray-900 w-full"
                >
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="12:30 PM">12:30 PM</option>
                  <option value="1:00 PM">1:00 PM</option>
                  <option value="1:30 PM">1:30 PM</option>
                  <option value="7:00 PM">7:00 PM</option>
                  <option value="7:30 PM">7:30 PM</option>
                  <option value="8:00 PM">8:00 PM</option>
                  <option value="8:30 PM">8:30 PM</option>
                  <option value="9:00 PM">9:00 PM</option>
                </select>
              </div>
              <div className="flex flex-col w-full md:flex-1 min-w-[150px]">
                <label className="text-xs tracking-widest text-gray-600 mb-2">DATE</label>
                <input
                  type="text"
                  value={reservationData.date}
                  onChange={(e) => setReservationData({ ...reservationData, date: e.target.value })}
                  className="border border-gray-300 px-4 py-2 focus:outline-none focus:border-gray-900 w-full"
                />
              </div>
              <button
                onClick={handleReservation}
                className="btn-gold h-[42px] w-full md:w-auto"
              >
                FIND A TABLE
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Restaurants Grid */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="section-title text-3xl md:text-5xl">OUR RESTAURANTS</h2>
            <div className="w-24 h-1 bg-taj-gold mx-auto mb-6"></div>
            <p className="text-taj-gray max-w-2xl mx-auto font-light text-sm md:text-base">
              From contemporary Asian cuisine to rooftop cocktails, each venue offers a unique culinary journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredRestaurants.map((restaurant) => (
              <div key={restaurant.id} className="bg-white shadow-lg overflow-hidden group cursor-pointer">
                <div className="relative h-64 md:h-80 overflow-hidden">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 text-xs tracking-wider">
                    {restaurant.category}
                  </div>
                </div>
                <div className="p-6 md:p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-light mb-2">{restaurant.name}</h3>
                      <p className="text-sm text-gray-600">{restaurant.cuisine} • {restaurant.priceRange}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4 leading-relaxed text-sm md:text-base">{restaurant.description}</p>
                  <div className="flex items-center text-sm text-gray-600 mb-6">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {restaurant.hours}
                  </div>
                  <div className="flex flex-col md:flex-row gap-3">
                    <button className="flex-1 btn-gold w-full">
                      RESERVE NOW
                    </button>
                    <button className="flex-1 border border-taj-dark text-taj-dark py-3 text-sm tracking-widest hover:bg-taj-dark hover:text-white transition uppercase font-medium w-full">
                      VIEW MENU
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dining Experiences */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="section-title text-2xl md:text-4xl">SPECIAL DINING EXPERIENCES</h2>
          <div className="w-24 h-1 bg-taj-gold mx-auto mb-12"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {diningExperiences.map((experience, idx) => (
              <div key={idx} className="bg-white shadow-md overflow-hidden group">
                <div className="h-64 overflow-hidden">
                  <img
                    src={experience.image}
                    alt={experience.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs tracking-widest text-gray-600 mb-2">{experience.time}</p>
                  <h3 className="text-xl font-light mb-3">{experience.title}</h3>
                  <p className="text-gray-700 text-sm mb-4 leading-relaxed">{experience.description}</p>
                  <a href="#" className="text-sm tracking-wider text-taj-gold hover:text-taj-dark transition uppercase font-medium border-b border-taj-gold pb-1">LEARN MORE</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-taj-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="w-16 h-16 mx-auto mb-6 border border-taj-gold flex items-center justify-center rounded-full">
              <span className="text-taj-gold font-serif text-2xl">TH</span>
            </div>
            <h2 className="text-2xl font-serif tracking-[0.2em] text-taj-gold">THE HOLLYWOOD</h2>
          </div>
        </div>
      </footer>
    </div>
  );
}
// ...existing code...