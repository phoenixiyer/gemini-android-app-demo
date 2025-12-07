'use client'

import { motion } from 'framer-motion'
import { Code2, GitMerge, Rocket, Activity, DollarSign } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LifecycleHUDProps {
    stage: number
}

// 1-3: Inner Loop (Code)
// 4-7: Outer Loop (Deploy)
// 8-9: Impact (Ops/ROI)
const PHASES = [
    { id: 'inner', label: 'Inner Loop', icon: Code2, activeStages: [1, 2, 3], color: 'text-blue-400', bg: 'bg-blue-500' },
    { id: 'outer', label: 'Outer Loop', icon: GitMerge, activeStages: [4, 5, 6, 7], color: 'text-purple-400', bg: 'bg-purple-500' },
    { id: 'deploy', label: 'Release', icon: Rocket, activeStages: [8], color: 'text-green-400', bg: 'bg-green-500' },
    { id: 'ops', label: 'Business Value', icon: DollarSign, activeStages: [9], color: 'text-yellow-400', bg: 'bg-yellow-500' },
]

export default function LifecycleHUD({ stage }: LifecycleHUDProps) {
    return (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 flex items-center space-x-1 sm:space-x-8 z-30 shadow-2xl">
            {PHASES.map((phase, idx) => {
                const isActive = phase.activeStages.includes(stage)
                const isPast = Math.min(...phase.activeStages) < stage && !isActive

                return (
                    <div key={phase.id} className="flex items-center">
                        <div className={cn("flex items-center space-x-2 transition-all duration-500", isActive ? "opacity-100 scale-105" : isPast ? "opacity-50" : "opacity-30 grayscale")}>
                            <div className={cn("w-8 h-8 rounded-full flex items-center justify-center transition-colors", isActive ? phase.bg + "/20" : "bg-slate-800")}>
                                <phase.icon className={cn("w-4 h-4", isActive || isPast ? phase.color : "text-slate-500")} />
                            </div>
                            <div className="flex flex-col">
                                <span className={cn("text-xs font-bold uppercase tracking-wider", isActive ? "text-white" : "text-slate-500")}>
                                    {phase.label}
                                </span>
                                {isActive && (
                                    <motion.div
                                        layoutId="active-pill"
                                        className={cn("h-0.5 w-full rounded-full mt-1", phase.bg)}
                                    />
                                )}
                            </div>
                        </div>
                        {idx < PHASES.length - 1 && (
                            <div className="w-8 h-[1px] bg-white/10 mx-4 hidden sm:block" />
                        )}
                    </div>
                )
            })}
        </div>
    )
}
