'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Bus, Train, Plane, Phone, ChevronRight } from 'lucide-react';

const HeroBanner = () => {
    const [activeTransport, setActiveTransport] = useState('Bus');

    const transportTypes = [
        { id: 'Bus', icon: Bus, label: 'Bus' },
        { id: 'Train', icon: Train, label: 'Train' },
        { id: 'Flight', icon: Plane, label: 'Flight' },
    ];

    return (
        <section className="relative bg-blue-900 text-white overflow-hidden">
           
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-10 w-72 h-72 bg-amber-400 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                   
                    <div className="space-y-8">
                       
                        <div className="flex gap-2 bg-white/10 backdrop-blur-sm rounded-2xl p-1.5 w-fit border border-white/10">
                            {transportTypes.map(({ id, icon: Icon, label }) => (
                                <button
                                    key={id}
                                    onClick={() => setActiveTransport(id)}
                                    className={`
                                        flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300
                                        ${activeTransport === id
                                            ? 'bg-white text-blue-900 shadow-lg'
                                            : 'text-white/80 hover:text-white hover:bg-white/10'
                                        }
                                    `}
                                >
                                    <Icon size={18} />
                                    {label}
                                </button>
                            ))}
                        </div>


                        <h1 className="text-2xl md:text-3xl lg:text-6xl font-bold leading-tight">
                            Comfortable {activeTransport} Journeys
                            <br />
                            Across Bangladesh
                        </h1>

                        <p className="text-lg text-white/80 max-w-lg">
                            Book reliable {activeTransport.toLowerCase()} tickets at the best price.
                            Travel safely and comfortably with us.
                        </p>


                        <div className="flex flex-col sm:flex-row gap-3 bg-white/10 backdrop-blur-sm rounded-2xl p-2 border border-white/10">
                            <input
                                type="text"
                                placeholder="From: Dhaka"
                                className="flex-1 bg-transparent px-4 py-3 text-white placeholder-white/60 outline-none rounded-xl"
                            />
                            <input
                                type="text"
                                placeholder="To: Bogura"
                                className="flex-1 bg-transparent px-4 py-3 text-white placeholder-white/60 outline-none rounded-xl"
                            />
                            <button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-xl transition flex items-center justify-center gap-2">
                                Search Tickets
                                <ChevronRight size={18} />
                            </button>
                        </div>

                       
                        <div className="flex items-center gap-3 text-white/80">
                            <Phone size={20} className="text-amber-400" />
                            <span>Call Center: <span className="text-white font-semibold">+88 01992 888000</span></span>
                        </div>
                    </div>


                    <div className="hidden md:flex justify-center items-center">
                        <div className="relative w-full max-w-md aspect-square">
                           
                            <div className="absolute "></div>
                           
                            <div className="relative z-10 flex items-center justify-center w-full h-full">
                                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                                    {activeTransport === 'Bus' && (
                                        <Bus size={120} className="text-white/90" />
                                    )}
                                    {activeTransport === 'Train' && (
                                        <Train size={120} className="text-white/90" />
                                    )}
                                    {activeTransport === 'Flight' && (
                                        <Plane size={120} className="text-white/90" />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroBanner;