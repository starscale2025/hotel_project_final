import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ParallaxHero from '../components/ParallaxHero';
import BookingWidget from '../components/BookingWidget';
import { gsap } from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

export default function Overview() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Smooth scroll handler for navigation links
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      const smoother = ScrollSmoother.get();
      if (smoother) {
        smoother.scrollTo(target, true, "top top");
      } else {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
      // Show back-to-top button immediately after scrolling to section
      setTimeout(() => {
        setShowBackToTop(window.scrollY > 500);
      }, 500);
    }
  };

  // Scroll to top handler
  const scrollToTop = () => {
    const smoother = ScrollSmoother.get();
    if (smoother) {
      smoother.scrollTo(0, true);
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    // Show/hide back to top button
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);

    // Initialize GSAP Smooth Scroll with snap-like behavior
    const smoother = ScrollSmoother.create({
      smooth: 1.5,
      effects: true,
      smoothTouch: 0.1,
      normalizeScroll: true,
      ignoreMobileResize: true,
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      smoother?.kill();
    };
  }, []);



  return (
    <>
      {/* Navigation - Fixed outside smooth scroll wrapper */}
      <Navbar />

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="min-h-screen bg-black">

            {/* Parallax Hero Section with Booking Widget */}
            <ParallaxHero
              backgroundImage="/hero-rooftop.jpg"
              title="Explore The Hollywood"
              subtitle="Where skyline whispers meet curated cocktails. Chandigarh's elevated escape."
            >
              <BookingWidget />
            </ParallaxHero>



            {/* Minimal Description */}
            <section className="bg-black py-16 md:py-32 px-6">
              <div className="max-w-4xl mx-auto text-center">
                <p className="text-white text-3xl md:text-4xl font-light leading-relaxed tracking-wide" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Chandigarh's chic open-air rooftop bar offers innovative cocktails and premier wine selections, with a scenic view of the bay.
                </p>
                <div className="w-px h-24 bg-luxury-gold mx-auto my-12 opacity-50"></div>
                <p className="text-white/60 text-lg font-light tracking-wider uppercase">
                  Elevated Evenings
                </p>
              </div>
            </section>

            {/* Minimal Hours Section */}
            <section id="hours" className="bg-black pb-16 md:pb-32 px-6">
              <div className="max-w-2xl mx-auto">
                <div className="text-center mb-16">
                  <span className="text-luxury-gold text-xs tracking-[0.3em] uppercase">Timings</span>
                  <h2 className="text-white text-4xl mt-4 font-light" style={{ fontFamily: 'Playfair Display, serif' }}>Opening Hours</h2>
                </div>

                <div className="space-y-12">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <span className="text-white text-lg tracking-widest uppercase">Daily</span>
                    <span className="text-white/60 font-light">5:00 PM – 1:30 AM</span>
                  </div>

                  <div className="flex flex-col items-center text-center space-y-2">
                    <span className="text-white text-lg tracking-widest uppercase">Sunday Brunch</span>
                    <span className="text-white/60 font-light">12:30 PM – 5:00 PM</span>
                  </div>

                  <div className="pt-12 border-t border-white/10 text-center">
                    <p className="text-white/40 text-sm tracking-widest leading-loose max-w-lg mx-auto">
                      AER IS OPEN TO GUESTS AGES 21 AND ABOVE. DRESS CODE IN EFFECT. GENTLEMEN ARE ASKED TO WEAR CLOSED-TOE SHOES AND LONG PANTS.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Minimal Menus Grid */}
            <section id="menus" className="bg-black pb-16 md:pb-32 px-6">
              <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-px bg-white/10 border border-white/10">
                  <a href="#yacht" className="group relative bg-black p-16 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors duration-500">
                    <span className="text-luxury-gold text-xs tracking-[0.3em] mb-4 uppercase">Menu 01</span>
                    <h3 className="text-white text-3xl font-light mb-6 group-hover:text-luxury-gold transition-colors duration-300" style={{ fontFamily: 'Playfair Display, serif' }}>Yacht Club</h3>
                    <span className="text-white/40 text-xs tracking-widest group-hover:text-white transition-colors duration-300">VIEW MENU</span>
                  </a>

                  <a href="#gimlet" className="group relative bg-black p-16 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors duration-500">
                    <span className="text-luxury-gold text-xs tracking-[0.3em] mb-4 uppercase">Menu 02</span>
                    <h3 className="text-white text-3xl font-light mb-6 group-hover:text-luxury-gold transition-colors duration-300" style={{ fontFamily: 'Playfair Display, serif' }}>Gimlet Garden</h3>
                    <span className="text-white/40 text-xs tracking-widest group-hover:text-white transition-colors duration-300">VIEW MENU</span>
                  </a>
                </div>
              </div>
            </section>

            {/* Minimal Events Section */}
            <section id="events" className="bg-black pb-16 md:pb-32 px-6">
              <div className="max-w-4xl mx-auto text-center">
                <span className="text-luxury-gold text-xs tracking-[0.3em] uppercase">Happenings</span>
                <h2 className="text-white text-4xl mt-4 mb-12 font-light" style={{ fontFamily: 'Playfair Display, serif' }}>Sunday Brunch</h2>

                <div className="bg-white/5 p-12 md:p-16 border border-white/10 backdrop-blur-sm">
                  <p className="text-white/80 text-lg leading-relaxed font-light mb-8 max-w-2xl mx-auto">
                    Experience Sundays anew with our spirited brunch featuring indulgent cocktails and brunch favourites, complemented by DJ tunes and unrivalled rooftop views of the Arabian Sea.
                  </p>
                  <Link to="/booking" className="inline-block text-white text-xs tracking-[0.2em] border-b border-luxury-gold pb-1 hover:text-luxury-gold transition-colors duration-300 uppercase">
                    Reserve Your Table
                  </Link>
                </div>
              </div>
            </section>

            {/* Minimal Reservation CTA */}
            <section className="bg-black pb-16 md:pb-32 px-6">
              <div className="max-w-xl mx-auto text-center border-y border-white/10 py-16">
                <p className="text-white text-2xl font-light mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>Make a Reservation</p>
                <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                  <a href="tel:912269828000" className="text-white/60 hover:text-white transition-colors duration-300 tracking-wider">91 (22) 6982 8000</a>
                  <Link to="/booking" className="bg-white text-black px-8 py-3 text-xs tracking-[0.2em] hover:bg-luxury-gold hover:text-white transition-all duration-300 uppercase">
                    Book Now
                  </Link>
                </div>
              </div>
            </section>

            {/* Minimal Dining Options */}
            <section className="bg-black pb-16 md:pb-32 px-6">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                  <span className="text-luxury-gold text-xs tracking-[0.3em] uppercase">More Dining</span>
                  <h2 className="text-white text-3xl mt-4 font-light" style={{ fontFamily: 'Playfair Display, serif' }}>Culinary Experiences</h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
                  {[
                    {
                      img: '/sanqi.jpg',
                      title: 'San:Qi',
                      desc: 'Pan-Asian culinary tour.'
                    },
                    {
                      img: '/takeaway.jpg',
                      title: 'Takeaway',
                      desc: 'House-made sweet delights.'
                    },
                    {
                      img: '/inroom.jpg',
                      title: 'In-Room Dining',
                      desc: 'Dine in private comfort.'
                    },
                    {
                      img: '/opus.jpg',
                      title: 'Opus',
                      desc: 'Coffee, tea, and wines.'
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="group relative bg-black aspect-[3/4] overflow-hidden">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-700"
                      />
                      <div className="absolute inset-0 flex flex-col justify-end p-8">
                        <h4 className="text-white text-xl font-light mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>{item.title}</h4>
                        <p className="text-white/60 text-sm font-light mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">{item.desc}</p>
                        <span className="text-luxury-gold text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">Explore</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Minimal Footer */}
            <footer className="bg-black text-white py-12 md:py-24 border-t border-white/10">
              <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col items-center text-center">
                  {/* Minimal Logo */}
                  <div className="mb-12">
                    <h2 className="text-2xl tracking-[0.3em] font-light text-white">THE HOLLYWOOD</h2>
                    <span className="block text-luxury-gold text-xs tracking-[0.4em] mt-2 uppercase">Chandigarh</span>
                  </div>

                  {/* Minimal Navigation */}
                  <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-16">
                    <a href="#about" className="text-xs tracking-[0.2em] text-white/60 hover:text-white transition-colors duration-300 uppercase">About</a>
                    <a href="#dining" className="text-xs tracking-[0.2em] text-white/60 hover:text-white transition-colors duration-300 uppercase">Dining</a>
                    <a href="#events" className="text-xs tracking-[0.2em] text-white/60 hover:text-white transition-colors duration-300 uppercase">Events</a>
                    <a href="#contact" className="text-xs tracking-[0.2em] text-white/60 hover:text-white transition-colors duration-300 uppercase">Contact</a>
                  </div>

                  {/* Social Icons */}
                  <div className="flex space-x-8 mb-12">
                    <a href="#" className="text-white/40 hover:text-luxury-gold transition-colors duration-300">
                      <span className="sr-only">Instagram</span>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465C9.673 2.013 10.03 2 12.48 2h.16zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" className="text-white/40 hover:text-luxury-gold transition-colors duration-300">
                      <span className="sr-only">Facebook</span>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>

                  <p className="text-white/20 text-[10px] tracking-widest uppercase">
                    © 2025 The Hollywood. All rights reserved.
                  </p>
                </div>
              </div>
            </footer>

            {/* Back to Top Button */}
            {showBackToTop && (
              <button
                onClick={scrollToTop}
                className="fixed bottom-8 right-8 z-[90] bg-luxury-gold hover:bg-luxury-gold-light text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110"
                style={{
                  boxShadow: '0 8px 32px rgba(200, 169, 98, 0.4)'
                }}
                aria-label="Back to top"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 15l-6-6-6 6" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}