'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Users, Activity, Bug, ArrowRight } from 'lucide-react'

export default function MetricsDashboard() {
    return (
        <div className="w-full h-full bg-[#0F172A] p-6 text-white grid grid-cols-2 gap-6 overflow-hidden relative">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

            {/* Header */}
            <div className="col-span-2 flex justify-between items-center mb-4 z-10">
                <div>
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Live Ops Dashboard</h2>
                    <p className="text-slate-400 text-sm">Real-time production metrics</p>
                </div>
                <div className="flex items-center space-x-2">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="text-green-400 text-sm font-bold">LIVE</span>
                </div>
            </div>

            {/* Card 1: Crash Rate */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 relative overflow-hidden"
            >
                <div className="flex items-center justify-between mb-4">
                    <div className="bg-red-500/20 p-2 rounded-lg">
                        <Bug className="w-6 h-6 text-red-500" />
                    </div>
                    <span className="text-xs text-slate-400">Last 24h</span>
                </div>
                <h3 className="text-slate-400 text-sm font-medium">Crash Free Users</h3>
                <div className="flex items-baseline space-x-2">
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-4xl font-bold text-white"
                    >
                        99.99%
                    </motion.span>
                    <span className="text-green-500 text-sm font-bold flex items-center">
                        <TrendingUp className="w-3 h-3 mr-1" /> +12%
                    </span>
                </div>
                {/* Chart Line */}
                <div className="absolute bottom-0 left-0 right-0 h-16 opacity-30">
                    <svg viewBox="0 0 100 20" className="w-full h-full fill-none stroke-green-500 stroke-2">
                        <motion.path
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                            d="M0 20 C 20 20, 30 15, 40 15 S 60 5, 80 5 L 100 2"
                        />
                    </svg>
                </div>
            </motion.div>

            {/* Card 2: Active Users */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700"
            >
                <div className="flex items-center justify-between mb-4">
                    <div className="bg-blue-500/20 p-2 rounded-lg">
                        <Users className="w-6 h-6 text-blue-500" />
                    </div>
                    <span className="text-xs text-slate-400">Live</span>
                </div>
                <h3 className="text-slate-400 text-sm font-medium">Active Users</h3>
                <div className="flex items-baseline space-x-2">
                    <motion.span
                        className="text-4xl font-bold text-white"
                    >
                        <CountUp end={12845} duration={3} />
                    </motion.span>
                </div>
                <div className="mt-4 flex space-x-1 h-2">
                    <motion.div initial={{ width: 0 }} animate={{ width: '60%' }} transition={{ duration: 1, delay: 0.6 }} className="h-full bg-blue-500 rounded-full" />
                    <motion.div initial={{ width: 0 }} animate={{ width: '25%' }} transition={{ duration: 1, delay: 0.8 }} className="h-full bg-purple-500 rounded-full" />
                    <motion.div initial={{ width: 0 }} animate={{ width: '15%' }} transition={{ duration: 1, delay: 1 }} className="h-full bg-green-500 rounded-full" />
                </div>
                <p className="text-[10px] text-slate-500 mt-2 text-right">India • USA • Europe</p>
            </motion.div>

            {/* Card 3: Build Velocity */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 flex flex-col justify-between"
            >
                <div className="flex items-center space-x-2 mb-2">
                    <Activity className="w-5 h-5 text-purple-500" />
                    <h3 className="text-white font-bold">Velocity Impact</h3>
                </div>
                <div>
                    <p className="text-xs text-slate-500 uppercase">Wait Time / Build</p>
                    <div className="flex items-baseline space-x-2 mt-1">
                        <p className="text-2xl font-bold text-slate-400 line-through decoration-red-500">12m</p>
                        <ArrowRight className="w-4 h-4 text-slate-600" />
                        <p className="text-3xl font-bold text-green-400">1m 45s</p>
                    </div>
                </div>
            </motion.div>

            {/* Card 4: ROI / Savings */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-gradient-to-br from-indigo-900/50 to-blue-900/50 rounded-2xl p-6 border border-indigo-500/30 flex flex-col justify-between"
            >
                <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-yellow-400" />
                    <h3 className="text-white font-bold">Projected ROI</h3>
                </div>
                <div>
                    <p className="text-xs text-indigo-200 uppercase">Annual Dev Savings</p>
                    <p className="text-3xl font-bold text-white mt-1">$1.2M+</p>
                    <p className="text-[10px] text-indigo-300 mt-1">Based on 50 devs * 2h/week saved</p>
                </div>
            </motion.div>
        </div>
    )
}

function CountUp({ end, duration }: { end: number, duration: number }) {
    return (
        <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            {end.toLocaleString()}
        </motion.span>
    )
}
