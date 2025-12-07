'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Wifi, Battery, Signal, Plane, Hotel, Star, MapPin, Download, Check } from 'lucide-react'
import { useState } from 'react'

interface MobileSimulatorProps {
    state: 'skeleton' | 'basic' | 'premium' | 'error' | 'install'
    onInstall?: () => void
}

export default function MobileSimulator({ state, onInstall }: MobileSimulatorProps) {
    const [isInstalling, setIsInstalling] = useState(false)
    const [installComplete, setInstallComplete] = useState(false)

    const handleInstallClick = () => {
        if (onInstall) {
            setIsInstalling(true)
            onInstall()
            setTimeout(() => {
                setIsInstalling(false)
                setInstallComplete(true)
                // Optionally, reset after a short delay or transition to another state
                // setTimeout(() => setInstallComplete(false), 2000);
            }, 2000) // Simulate installation time
        }
    }

    return (
        <div className="w-[300px] h-[600px] bg-black rounded-[3rem] border-8 border-slate-800 shadow-2xl relative overflow-hidden mx-auto ring-4 ring-black/40">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-20 flex justify-center items-end pb-1">
                <div className="w-16 h-1 bg-gray-800 rounded-full" />
            </div>

            {/* Status Bar */}
            <div className="absolute top-2 left-6 right-6 flex justify-between items-center text-[10px] text-white z-10 font-medium">
                <span>9:41</span>
                <div className="flex space-x-1">
                    <Signal className="w-3 h-3" />
                    <Wifi className="w-3 h-3" />
                    <Battery className="w-3 h-3" />
                </div>
            </div>

            {/* Screen Content */}
            <div className="w-full h-full bg-slate-50 text-black overflow-hidden relative">
                <AnimatePresence mode="wait">

                    {/* STATE 1: SKELETON */}
                    {state === 'skeleton' && (
                        <motion.div
                            key="skeleton"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="p-4 pt-12 space-y-4 animate-pulse bg-white h-full"
                        >
                            <div className="w-full h-40 bg-gray-200 rounded-xl" />
                            <div className="w-3/4 h-6 bg-gray-200 rounded" />
                            <div className="space-y-2">
                                <div className="w-full h-20 bg-gray-100 rounded-lg" />
                                <div className="w-full h-20 bg-gray-100 rounded-lg" />
                                <div className="w-full h-20 bg-gray-100 rounded-lg" />
                            </div>
                        </motion.div>
                    )}

                    {/* STATE 2: BASIC */}
                    {state === 'basic' && (
                        <motion.div
                            key="basic"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col h-full bg-white pt-8"
                        >
                            <div className="w-full h-40 bg-blue-500 flex items-center justify-center text-white">
                                Placeholder Image
                            </div>
                            <div className="p-4">
                                <h1 className="text-2xl font-bold">Trip Details</h1>
                                <ul className="mt-4 space-y-4">
                                    <li className="border p-2">Flight to India</li>
                                    <li className="border p-2">Hotel Stay</li>
                                </ul>
                            </div>
                        </motion.div>
                    )}

                    {/* STATE 5: INSTALL */}
                    {state === 'install' && (
                        <motion.div
                            key="install"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-blue-500 to-purple-600 text-white p-4 text-center"
                        >
                            <Download className="w-16 h-16 mb-4" />
                            <h2 className="text-3xl font-bold mb-2">Install Trip Planner</h2>
                            <p className="text-sm text-white/80 mb-8">
                                Get the full experience with personalized recommendations and offline access.
                            </p>
                            <motion.button
                                onClick={handleInstallClick}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="mt-8 px-6 py-3 bg-white text-blue-600 rounded-full font-semibold shadow-lg flex items-center space-x-2"
                                disabled={isInstalling || installComplete}
                            >
                                <AnimatePresence mode="wait">
                                    {isInstalling && (
                                        <motion.span
                                            key="installing"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="flex items-center space-x-2"
                                        >
                                            <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <span>Installing...</span>
                                        </motion.span>
                                    )}
                                    {!isInstalling && !installComplete && (
                                        <motion.span
                                            key="install-now"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="flex items-center space-x-2"
                                        >
                                            <Download className="w-5 h-5" />
                                            <span>Install Now</span>
                                        </motion.span>
                                    )}
                                    {installComplete && (
                                        <motion.span
                                            key="installed"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="flex items-center space-x-2 text-green-600"
                                        >
                                            <Check className="w-5 h-5" />
                                            <span>Installed!</span>
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        </motion.div>
                    )}

                    {/* STATE 3: PREMIUM (GEMINI) */}
                    {state === 'premium' && (
                        <motion.div
                            key="premium"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col h-full bg-[#0F172A] text-white relative"
                        >
                            {/* Header Image */}
                            <div className="h-48 relative overflow-hidden shrink-0">
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0F172A] z-10" />
                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80')] bg-cover bg-center" />
                                <div className="absolute bottom-4 left-4 z-20">
                                    <h1 className="text-2xl font-bold">Taj Mahal</h1>
                                    <div className="flex items-center space-x-1 text-xs text-blue-300">
                                        <MapPin className="w-3 h-3" />
                                        <span>Agra, India</span>
                                    </div>
                                </div>
                            </div>

                            {/* Scrollable Content */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20 scrollbar-hide">
                                {/* Details Card */}
                                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 backdrop-blur-md">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-sm font-semibold text-slate-300">Trip Schedule</h3>
                                            <p className="text-xs text-slate-500">Dec 12 - Dec 24</p>
                                        </div>
                                        <div className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-[10px] font-bold">
                                            UPCOMING
                                        </div>
                                    </div>

                                    {/* Scrollable List Items */}
                                    {[1, 2, 3, 4, 5].map((item) => (
                                        <motion.div
                                            key={item}
                                            whileHover={{ scale: 1.02, backgroundColor: 'rgba(51, 65, 85, 0.5)' }}
                                            whileTap={{ scale: 0.98 }}
                                            className="flex items-center space-x-3 mb-3 p-2 rounded-lg transition-colors cursor-pointer"
                                        >
                                            <div className="w-10 h-10 rounded-full bg-indigo-900/50 flex items-center justify-center border border-indigo-500/30">
                                                {item % 2 === 0 ? <Hotel className="w-5 h-5 text-indigo-400" /> : <Plane className="w-5 h-5 text-blue-400" />}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-xs font-medium text-white">
                                                    {item % 2 === 0 ? "Hotel Check-in" : "Flight to New Delhi"}
                                                </h4>
                                                <p className="text-[10px] text-slate-400">10:00 AM • 2h 30m</p>
                                            </div>
                                            <Star className="w-3 h-3 text-yellow-500" />
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Additional Content for Scrolling */}
                                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                                    <h3 className="text-sm font-semibold text-slate-300 mb-2">Description</h3>
                                    <p className="text-xs text-slate-400 leading-relaxed">
                                        Experience the timeless beauty of the Taj Mahal, a UNESCO World Heritage site.
                                        Don't miss the sunrise view from Mehtab Bagh.
                                    </p>
                                </div>
                            </div>

                            {/* FAB */}
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="absolute bottom-6 right-6 h-14 w-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg shadow-purple-500/30 flex items-center justify-center text-white z-30"
                            >
                                <Plane className="w-6 h-6" />
                            </motion.button>
                        </motion.div>
                    )}

                    {/* STATE 4: ERROR (CRASH) */}
                    {state === 'error' && (
                        <motion.div
                            key="error"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col h-full bg-red-900/20 relative p-4 text-white font-mono"
                        >
                            <div className="absolute inset-0 bg-red-500/10 animate-pulse pointer-events-none" />

                            <div className="mt-20 border-l-4 border-red-500 pl-4">
                                <h2 className="text-xl font-bold text-red-500 mb-2">Runtime Exception</h2>
                                <p className="text-xs text-red-300">FATAL EXCEPTION: main</p>
                                <p className="text-xs text-red-300 mt-1">Process: com.example.trip</p>
                            </div>

                            <div className="mt-8 bg-black/50 p-4 rounded-lg border border-red-500/20 text-[10px] space-y-1 overflow-hidden font-mono text-red-100/70">
                                <p>java.lang.SecurityException</p>
                                <p className="pl-4">at android.os.Parcel.readException</p>
                                <p className="pl-4">at android.database.DatabaseUtils.read</p>
                                <p className="pl-4 text-white font-bold bg-red-500/20">at com.example.trip.LocationManager.get</p>
                                <p className="pl-4">at android.app.Activity.performCreate</p>
                                <p className="pl-4">at android.app.Instrumentation.call</p>
                            </div>

                            <div className="mt-auto mb-10 text-center">
                                <p className="text-xs text-red-400">Application has stopped</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
