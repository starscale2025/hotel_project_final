import React from 'react';
import Navbar from '../components/Navbar';

export default function LocationPage() {
    return (
        <div className="min-h-screen bg-black">
            <Navbar />

            {/* Hero Section */}
            <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-black/40 z-10" />
                <img
                    src="/hero-rooftop.jpg"
                    alt="Location"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="relative z-20 text-center px-4">
                    <span className="text-luxury-gold text-xs tracking-[0.3em] uppercase block mb-4">Find Us</span>
                    <h1 className="text-white text-4xl md:text-6xl font-light tracking-wide" style={{ fontFamily: 'Playfair Display, serif' }}>
                        Location
                    </h1>
                </div>
            </section>

            {/* Map Section */}
            <section className="py-16 md:py-24 px-6 bg-black text-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Text Content */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl font-light mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>Visit The Hollywood</h2>
                                <div className="w-12 h-0.5 bg-luxury-gold mb-6" />
                                <p className="text-white/60 leading-relaxed font-light">
                                    Experience the elevated atmosphere of Punjab's premier rooftop destination.
                                    Located in the heart of the city, offering breathtaking views and an escape from the ordinary.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <span className="text-luxury-gold uppercase text-xs tracking-widest mt-1">Address</span>
                                    <p className="text-white/80 font-light">
                                        The Hollywood<br />
                                        Restaurant & Rooms<br />
                                        Morinda Road, Bari Mandauli,<br />
                                        Distt Ropar Punjab 140101
                                    </p>
                                </div>
                                <div className="flex items-start gap-4">
                                    <span className="text-luxury-gold uppercase text-xs tracking-widest mt-1">Contact</span>
                                    <p className="text-white/80 font-light">
                                        +91 (22) 6982 8000<br />
                                        reservations@thehollywood.com
                                    </p>
                                </div>
                            </div>

                            <a
                                href="https://maps.app.goo.gl/RTzW7T8pCURJvmbWA?g_st=aw"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-luxury-gold text-white px-8 py-3 text-xs tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300 uppercase"
                            >
                                Get Directions
                            </a>
                        </div>

                        {/* Map Embed */}
                        <div className="h-[400px] w-full bg-white/5 border border-white/10 p-2">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.5668166666665!2d76.779417!3d30.733315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fed0be66ec96b%3A0xa5ff67f9527319fe!2sChandigarh!5e0!3m2!1sen!2sin!4v1632999999999!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%)' }}
                                allowFullScreen={true}
                                loading="lazy"
                                title="Location Map"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-black text-white py-12 md:py-24 border-t border-white/10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col items-center text-center">
                        <div className="mb-12">
                            <h2 className="text-2xl tracking-[0.3em] font-light text-white">THE HOLLYWOOD</h2>
                            <span className="block text-luxury-gold text-xs tracking-[0.4em] mt-2 uppercase">Punjab</span>
                        </div>
                        <p className="text-white/20 text-[10px] tracking-widest uppercase">
                            © 2025 The Hollywood. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
