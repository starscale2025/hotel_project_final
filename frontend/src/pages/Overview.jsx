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
              subtitle="Where skyline whispers meet curated cocktails. Punjab's elevated escape."
            >
              <BookingWidget />
            </ParallaxHero>






            {/* 1. Our Spaces */}
            <section className="bg-black py-20 px-6">
              <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    { title: "Rooftop Restaurant", desc: "Open-air dining with curated cocktails and crafted flavors.", cta: "View Dining", link: "/dining" },
                    { title: "Boutique Rooms", desc: "Modern comfort blended with warm hospitality.", cta: "Explore Accommodations", link: "/accommodations" },
                    { title: "Events & Celebrations", desc: "Private gatherings, date nights, and special moments.", cta: "See Experiences", link: "/experiences" }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white/5 border border-white/10 p-10 flex flex-col items-center text-center hover:border-luxury-gold/50 transition-colors duration-500 group">
                      <h3 className="text-white text-2xl font-light mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>{item.title}</h3>
                      <p className="text-white/60 font-light mb-8 leading-relaxed">{item.desc}</p>
                      <Link to={item.link} className="mt-auto text-luxury-gold text-xs tracking-[0.2em] uppercase border-b border-transparent group-hover:border-luxury-gold pb-1 transition-all duration-300">
                        {item.cta}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 2. Signature Dining Experience */}
            <section className="relative py-32 px-6 bg-black overflow-hidden">
              <div className="absolute inset-0 opacity-40">
                <img src="/sanqi.jpg" alt="Signature Dining" className="w-full h-full object-cover" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              <div className="relative z-10 max-w-4xl mx-auto text-center">
                <h2 className="text-white text-4xl md:text-6xl font-light mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                  An Elevated Culinary Experience.
                </h2>
                <p className="text-white/80 text-lg md:text-xl font-light mb-10 tracking-wide">
                  Crafted cocktails. Curated dishes. Golden-hour ambience on a rooftop above Punjab.
                </p>
                <Link to="/dining" className="inline-block bg-luxury-gold text-black px-10 py-4 text-xs tracking-[0.2em] uppercase hover:bg-white transition-colors duration-300">
                  View Menu
                </Link>
              </div>
            </section>

            {/* 3. Gallery Preview */}
            <section className="bg-black py-20 px-6">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
                  {[
                    "/hero-rooftop.jpg",
                    "/opus.jpg",
                    "/sanqi.jpg",
                    "/inroom.jpg",
                    "/takeaway.jpg",
                    "/hero-rooftop.jpg"
                  ].map((img, i) => (
                    <div key={i} className="aspect-square bg-white/5 overflow-hidden relative group">
                      <img src={img} alt="Gallery" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500 transform scale-100 group-hover:scale-110 duration-700" />
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <Link to="/gallery" className="text-white text-xs tracking-[0.2em] uppercase border border-white/20 px-8 py-3 hover:bg-white hover:text-black transition-all duration-300">
                    View Full Gallery
                  </Link>
                </div>
              </div>
            </section>

            {/* 4. Guest Reviews */}
            <section className="bg-black py-20 px-6 border-t border-white/5">
              <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-3 gap-12">
                  {[
                    { text: "Best rooftop ambiance in Punjab.", author: "Tarun S." },
                    { text: "Perfect for date nights.", author: "Aditi M." },
                    { text: "Rooms felt premium and cozy.", author: "Rohan K." }
                  ].map((review, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-luxury-gold text-2xl mb-6">★★★★★</div>
                      <p className="text-white text-xl font-light italic mb-6 leading-relaxed" style={{ fontFamily: 'Playfair Display, serif' }}>
                        "{review.text}"
                      </p>
                      <span className="text-white/40 text-xs tracking-[0.2em] uppercase">{review.author}</span>
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
                    <span className="block text-luxury-gold text-xs tracking-[0.4em] mt-2 uppercase">Punjab</span>
                    <p className="text-white/40 text-xs mt-4 font-light">
                      Morinda Road, Bari Mandauli, Distt Ropar Punjab 140101
                    </p>
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