'use client';

import { useState } from 'react';
import { Bus, Train, Plane, Phone, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const HeroBanner = () => {
    const [activeTransport, setActiveTransport] = useState('Bus');

    const transportTypes = [
        { id: 'Bus', icon: Bus, label: 'Bus' },
        { id: 'Train', icon: Train, label: 'Train' },
        { id: 'Flight', icon: Plane, label: 'Flight' },
    ];


    const iconVariants = {
        hidden: { scale: 0.8, opacity: 0, rotate: -10 },
        visible: {
            scale: 1,
            opacity: 1,
            rotate: 0,
            transition: { duration: 0.5, ease: 'easeOut' }
        },
        exit: {
            scale: 0.8,
            opacity: 0,
            rotate: 10,
            transition: { duration: 0.3 }
        }
    };


    const textVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: 'easeOut' }
        }
    };


    const buttonVariants = {
        hover: {
            scale: 1.05,
            backgroundColor: '#f59e0b',
            transition: { duration: 0.2 }
        },
        tap: { scale: 0.95 }
    };

    return (
        <section className="relative bg-blue-900 text-white overflow-hidden">

            <div className="absolute inset-0 opacity-10">
                <motion.div
                    className="absolute top-20 left-10 w-72 h-72 bg-amber-400 rounded-full blur-3xl"
                    animate={{
                        x: [0, 30, 0],
                        y: [0, -20, 0]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }}
                />
                <motion.div
                    className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl"
                    animate={{
                        x: [0, -30, 0],
                        y: [0, 20, 0]
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }}
                />
            </div>

            <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24">
                <div className="grid md:grid-cols-2 gap-12 items-center">
   
                    <motion.div
                        className="space-y-8"
                        initial="hidden"
                        animate="visible"
                        variants={textVariants}
                    >

                        <motion.div
                            className="flex gap-2 bg-white/10 backdrop-blur-sm rounded-2xl p-1.5 w-fit border border-white/10"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                        >
                            {transportTypes.map(({ id, icon: Icon, label }) => (
                                <motion.button
                                    key={id}
                                    onClick={() => setActiveTransport(id)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
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
                                </motion.button>
                            ))}
                        </motion.div>

                        <AnimatePresence mode="wait">
                            <motion.h1
                                key={activeTransport}
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 20, opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="text-2xl md:text-3xl lg:text-6xl font-bold leading-tight"
                            >
                                Comfortable {activeTransport} Journeys
                                <br />
                                Across Bangladesh
                            </motion.h1>
                        </AnimatePresence>

                        <motion.p
                            className="text-lg text-white/80 max-w-lg"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        >
                            Book reliable {activeTransport.toLowerCase()} tickets at the best price.
                            Travel safely and comfortably with us.
                        </motion.p>


                        <motion.div
                            className="flex flex-col sm:flex-row gap-3 bg-white/10 backdrop-blur-sm rounded-2xl p-2 border border-white/10"
                            whileHover={{ boxShadow: '0 0 30px rgba(255,255,255,0.1)' }}
                            transition={{ duration: 0.3 }}
                        >
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
                            <motion.button
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                                className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-xl transition flex items-center justify-center gap-2"
                            >
                                Search Tickets
                                <ChevronRight size={18} />
                            </motion.button>
                        </motion.div>


                        <motion.div
                            className="flex items-center gap-3 text-white/80"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            <Phone size={20} className="text-amber-400" />
                            <span>Call Center: <span className="text-white font-semibold">+88 01992 888000</span></span>
                        </motion.div>
                    </motion.div>


                    <motion.div
                        className="hidden md:flex justify-center items-center"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                    >
                        <div className="relative w-full max-w-md aspect-square">
    
                            <div className="absolute rounded-full blur-2xl" />
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTransport}
                                    className="relative z-10 flex items-center justify-center w-full h-full"
                                    variants={iconVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                >
                                    <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                                        {activeTransport === 'Bus' && <Bus size={120} className="text-white/90" />}
                                        {activeTransport === 'Train' && <Train size={120} className="text-white/90" />}
                                        {activeTransport === 'Flight' && <Plane size={120} className="text-white/90" />}
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default HeroBanner