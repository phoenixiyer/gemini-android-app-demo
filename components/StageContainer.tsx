'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface StageContainerProps {
    children: React.ReactNode
    currentStage: number
}

export default function StageContainer({ children, currentStage }: StageContainerProps) {
    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center p-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0f1e] to-black">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

            <div className="absolute top-8 left-8 flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-4 font-mono text-sm text-slate-500">Demo Environment v1.0</span>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="z-10 w-full max-w-7xl h-[80vh]"
            >
                {children}
            </motion.div>

            {/* Stage Indicator */}
            <div className="absolute bottom-8 flex space-x-4 z-20">
                {[1, 2, 3].map((stage) => (
                    <div
                        key={stage}
                        className={cn(
                            "w-12 h-1 rounded-full transition-all duration-300",
                            currentStage >= stage ? "bg-white shadow-[0_0_10px_white]" : "bg-white/20"
                        )}
                    />
                ))}
            </div>
        </div>
    )
}
