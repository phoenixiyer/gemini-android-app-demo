'use client'

import { motion } from 'framer-motion'
import { Activity, Users, Battery, Smartphone } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ReleaseMonitorProps {
    trafficV2: number // 0 to 100
    isAnomaly: boolean
}

export default function ReleaseMonitor({ trafficV2, isAnomaly }: ReleaseMonitorProps) {
    return (
        <div className="w-full max-w-4xl bg-black/80 backdrop-blur-md rounded-2xl border border-white/10 p-6 flex flex-col space-y-6">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                        <Users className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">Canary Release Monitor</h3>
                        <p className="text-xs text-slate-400 font-mono">v2.0.0 (Staged Rollout)</p>
                    </div>
                </div>
                <div className="font-mono text-2xl font-bold text-white">
                    {trafficV2}% <span className="text-xs text-slate-500 font-normal">TRAFFIC</span>
                </div>
            </div>

            {/* Traffic Visualizer (Bar) */}
            <div className="w-full h-8 bg-slate-800 rounded-full overflow-hidden relative flex">
                <motion.div
                    className="h-full bg-slate-600 flex items-center justify-center"
                    animate={{ width: `${100 - trafficV2}%` }}
                >
                    <span className="text-[10px] font-bold text-white/50">v1.9 (Legacy)</span>
                </motion.div>
                <motion.div
                    className={cn("h-full flex items-center justify-center transition-colors duration-300",
                        isAnomaly ? "bg-red-500" : "bg-blue-500"
                    )}
                    animate={{ width: `${trafficV2}%` }}
                >
                    <span className="text-[10px] font-bold text-white/90">v2.0 (Canary)</span>
                </motion.div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-3 gap-4">
                {/* Latency */}
                <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-slate-400 uppercase tracking-wider">Latency (P99)</span>
                        <Activity className="w-4 h-4 text-slate-500" />
                    </div>
                    <div className="text-2xl font-bold text-white">45ms</div>
                    <div className="text-xs text-green-400 flex items-center">
                        <span className="mr-1">↓</span> 12% vs v1.9
                    </div>
                </div>

                {/* Crash Rate */}
                <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-slate-400 uppercase tracking-wider">Crash Free</span>
                        <Smartphone className="w-4 h-4 text-slate-500" />
                    </div>
                    <div className="text-2xl font-bold text-white">99.9%</div>
                    <div className="text-xs text-green-400">Stable</div>
                </div>

                {/* Battery (The Trap) */}
                <motion.div
                    className={cn("bg-slate-900/50 p-4 rounded-xl border transition-colors duration-500",
                        isAnomaly ? "border-red-500 bg-red-500/10" : "border-white/5"
                    )}
                >
                    <div className="flex items-center justify-between mb-2">
                        <span className={cn("text-xs uppercase tracking-wider", isAnomaly ? "text-red-400" : "text-slate-400")}>Battery Impact</span>
                        <Battery className={cn("w-4 h-4", isAnomaly ? "text-red-500" : "text-slate-500")} />
                    </div>
                    <div className={cn("text-2xl font-bold transition-colors", isAnomaly ? "text-red-500" : "text-white")}>
                        {isAnomaly ? "+15.4%" : "+0.2%"}
                    </div>
                    <div className={cn("text-xs", isAnomaly ? "text-red-400 font-bold" : "text-green-400")}>
                        {isAnomaly ? "CRITICAL SPIKE DETECTED" : "Normal"}
                    </div>
                </motion.div>
            </div>

            {/* Real-time Graph Simulation (Simple SVG) */}
            <div className="h-32 w-full bg-slate-900/30 rounded-lg relative overflow-hidden flex items-end">
                {/* Background grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:20px_20px]" />

                {/* Normal Line (v1) */}
                <svg className="absolute inset-0 w-full h-full opacity-30">
                    <path d="M0,80 Q20,78 40,82 T80,80 T120,81 T160,79 T200,80 T240,82 T280,80 T320,81 L400,80" fill="none" stroke="white" strokeWidth="2" />
                </svg>

                {/* Anomaly Line (v2) - Only appears if traffic > 0 */}
                {trafficV2 > 0 && (
                    <svg className="absolute inset-0 w-full h-full">
                        {/* Draw path that spikes at the end if anomaly */}
                        <motion.path
                            d={isAnomaly
                                ? "M0,80 Q50,80 100,75 T200,70 T300,20" // Spyke up to 20y (high drain)
                                : "M0,80 Q50,80 100,79 T200,81 T400,80"
                            }
                            fill="none"
                            stroke={isAnomaly ? "#ef4444" : "#3b82f6"}
                            strokeWidth="3"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2 }}
                        />
                    </svg>
                )}
            </div>

        </div>
    )
}
