'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface StageContainerProps {
    children: React.ReactNode
    currentStage: number
}

import LifecycleHUD from '@/components/LifecycleHUD'

export default function StageContainer({ children, currentStage }: StageContainerProps) {
    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center p-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0f1e] to-black">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

            {/* Lifecycle HUD (Flow State) */}
            <LifecycleHUD stage={currentStage} />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="z-10 w-full max-w-7xl h-[80vh]"
            >
                {children}
            </motion.div>
        </div>
    )
}
