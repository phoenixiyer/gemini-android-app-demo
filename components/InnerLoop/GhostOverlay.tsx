'use client'

import { motion } from 'framer-motion'
import { Clock, Search, Coffee, FileSearch } from 'lucide-react'

interface GhostOverlayProps {
    mode: 'gen' | 'fix' | 'refine' | 'pipeline'
}

const MANUAL_STEPS = {
    gen: [
        { text: 'Manual: Reading requirements...', time: '10m', icon: FileSearch },
        { text: 'Manual: Creating boilerplate...', time: '30m', icon: Coffee },
        { text: 'Manual: Writing composables...', time: '2h', icon: FileSearch },
    ],
    fix: [
        { text: 'Manual: Reproducing crash...', time: '15m', icon: Search },
        { text: 'Manual: Googling error...', time: '20m', icon: Search },
        { text: 'Manual: Applying fix...', time: '10m', icon: Clock },
    ],
    refine: [
        { text: 'Manual: Reading Material 3 spec...', time: '45m', icon: FileSearch },
        { text: 'Manual: Downloading assets...', time: '20m', icon: Coffee },
        { text: 'Manual: Tweaking modifiers...', time: '1h', icon: Clock },
    ],
    pipeline: [
        { text: 'Legacy: Running Unit Tests...', time: '12m', icon: Clock },
        { text: 'Legacy: Compiling Debug...', time: '8m', icon: Coffee },
        { text: 'Legacy: Uploading Artifact...', time: '5m', icon: RocketLegacy },
    ]
}

function RocketLegacy(props: any) {
    return <Clock {...props} /> // Fallback icon
}

export default function GhostOverlay({ mode }: GhostOverlayProps) {
    const steps = MANUAL_STEPS[mode] || []

    return (
        <div className="absolute top-4 right-4 z-40 bg-slate-900/80 backdrop-blur-md rounded-xl border border-slate-700 p-4 w-64 shadow-2xl">
            <div className="flex items-center space-x-2 mb-3 border-b border-white/10 pb-2">
                <Clock className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">The Old Way</span>
            </div>

            <div className="space-y-3">
                {steps.map((step, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 0.5, x: 0 }}
                        transition={{ delay: i * 0.5 }}
                        className="flex items-center justify-between group"
                    >
                        <div className="flex items-center space-x-2">
                            <step.icon className="w-3 h-3 text-slate-500" />
                            <span className="text-xs text-slate-500 line-through decoration-slate-600">{step.text}</span>
                        </div>
                        <span className="text-xs font-mono text-red-900/50 group-hover:text-red-500 transition-colors">+{step.time}</span>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="mt-4 pt-2 border-t border-white/10 text-center"
            >
                <span className="text-xs text-red-400 font-bold">Total Est: ~3 Hours</span>
            </motion.div>
        </div>
    )
}
