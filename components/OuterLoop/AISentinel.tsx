'use client'

import { motion } from 'framer-motion'
import { ShieldAlert, RotateCcw, Lock } from 'lucide-react'

interface AISentinelProps {
    status: 'scanning' | 'detected' | 'rollback'
}

export default function AISentinel({ status }: AISentinelProps) {
    return (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-50">
            {/* Scanning Radar */}
            {status === 'scanning' && (
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    className="w-[500px] h-[500px] rounded-full border border-blue-500/10 bg-[radial-gradient(circle,_rgba(59,130,246,0.1)_0%,_transparent_70%)] relative"
                >
                    <div className="absolute top-0 left-1/2 w-px h-1/2 bg-gradient-to-b from-transparent to-blue-500/50 origin-bottom transform -translate-x-1/2" />
                </motion.div>
            )}

            {/* Anomaly Detected Alert */}
            {status === 'detected' && (
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-red-600/90 backdrop-blur-md p-8 rounded-2xl flex flex-col items-center shadow-[0_0_50px_rgba(220,38,38,0.5)] border border-red-400/50"
                >
                    <ShieldAlert className="w-16 h-16 text-white mb-4 animate-pulse" />
                    <h2 className="text-3xl font-bold text-white mb-2">ANOMALY DETECTED</h2>
                    <p className="text-white/80 font-mono text-center">
                        Metric: Battery Drain (+15%)<br />
                        Threshold: 5%<br />
                        Action: INITIATING LOCKDOWN
                    </p>
                </motion.div>
            )}

            {/* Rollback Action */}
            {status === 'rollback' && (
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-orange-500/90 backdrop-blur-md p-6 rounded-2xl flex flex-col items-center shadow-2xl border border-orange-400/50"
                >
                    <div className="flex items-center space-x-3 mb-2">
                        <RotateCcw className="w-8 h-8 text-white animate-spin" style={{ animationDirection: 'reverse', animationDuration: '3s' }} />
                        <h2 className="text-2xl font-bold text-white">AUTO-ROLLBACK</h2>
                    </div>
                    <div className="w-64 h-2 bg-black/20 rounded-full overflow-hidden mt-4">
                        <motion.div
                            className="h-full bg-white"
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 1.5 }}
                        />
                    </div>
                    <p className="text-white/80 font-mono text-xs mt-2">Reverting to v1.9 (Last Known Good)...</p>
                </motion.div>
            )}
        </div>
    )
}
