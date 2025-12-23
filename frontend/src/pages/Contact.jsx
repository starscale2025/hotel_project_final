import React from 'react';
import Navbar from '../components/Navbar';

export default function Contact() {
    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />

            <div className="pt-32 pb-20 px-6 max-w-5xl mx-auto flex flex-col justify-center min-h-screen">
                {/* Header */}
                <div className="text-center mb-20">
                    <span className="block text-white/60 italic font-serif text-lg mb-4">Punjab</span>
                    <h1 className="text-4xl md:text-6xl font-light tracking-widest uppercase" style={{ fontFamily: 'Playfair Display, serif' }}>
                        Contact Us
                    </h1>
                </div>

                {/* Contact Details */}
                <div className="space-y-0">
                    {/* Address */}
                    <div className="border-t border-white/20 py-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <h2 className="text-xs tracking-[0.2em] uppercase font-medium text-white/80">Address</h2>
                        <p className="text-right text-sm md:text-base text-white/60 font-light leading-relaxed uppercase tracking-widest">
                            Morinda Road, Bari Mandauli,<br />
                            Distt Ropar Punjab 140101
                        </p>
                    </div>

                    {/* Reservations */}
                    <div className="border-t border-white/20 py-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <h2 className="text-xs tracking-[0.2em] uppercase font-medium text-white/80">Reservations</h2>
                        <a href="tel:+912269828000" className="text-right text-sm md:text-base text-white/60 font-light tracking-widest hover:text-luxury-gold transition-colors">
                            +91 (22) 6982 8000
                        </a>
                    </div>

                    {/* Front Desk */}
                    <div className="border-t border-white/20 py-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <h2 className="text-xs tracking-[0.2em] uppercase font-medium text-white/80">Front Desk</h2>
                        <a href="tel:+912269828000" className="text-right text-sm md:text-base text-white/60 font-light tracking-widest hover:text-luxury-gold transition-colors">
                            +91 (22) 6982 8000
                        </a>
                    </div>

                    {/* Guest Fax */}
                    <div className="border-t border-b border-white/20 py-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <h2 className="text-xs tracking-[0.2em] uppercase font-medium text-white/80">Guest Fax</h2>
                        <span className="text-right text-sm md:text-base text-white/60 font-light tracking-widest">
                            +91 (22) 6982 8000
                        </span>
                    </div>
                </div>

                {/* Social Icons */}
                <div className="mt-20 flex justify-center gap-8">
                    <a href="#" className="text-white/40 hover:text-white transition-colors">
                        <span className="sr-only">Twitter</span>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                    </a>
                    <a href="#" className="text-white/40 hover:text-white transition-colors">
                        <span className="sr-only">Facebook</span>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                        </svg>
                    </a>
                    <a href="#" className="text-white/40 hover:text-white transition-colors">
                        <span className="sr-only">Instagram</span>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465C9.673 2.013 10.03 2 12.48 2h.16zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
}
