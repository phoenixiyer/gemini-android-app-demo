'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, BrainCircuit, PenTool, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DesignAnalysisProps {
    onComplete: () => void
    onStepChange?: (step: 'idea' | 'brd' | 'prd') => void
}

export default function DesignAnalysis({ onComplete, onStepChange }: DesignAnalysisProps) {
    const [step, setStep] = useState<'idea' | 'brd' | 'prd' | 'done'>('idea')

    const startAnalysis = () => {
        setStep('brd')
        if (onStepChange) onStepChange('brd')

        setTimeout(() => {
            setStep('prd')
            if (onStepChange) onStepChange('prd')

            setTimeout(() => {
                setStep('done')
                onComplete()
            }, 3000)
        }, 3000)
    }

    return (
        <div className="w-full max-w-3xl mx-auto p-8 relative">
            <svg className="absolute top-1/2 left-0 w-full h-20 -translate-y-1/2 pointer-events-none opacity-20">
                <path d="M 100 40 L 300 40 L 500 40" stroke="white" strokeWidth="2" strokeDasharray="5,5" fill="none" />
            </svg>

            <div className="grid grid-cols-3 gap-8 relative z-10">
                {/* IDEA */}
                <StepCard
                    isActive={step === 'idea'}
                    isCompleted={step !== 'idea'}
                    icon={<Search className="w-6 h-6" />}
                    title="Idea"
                    desc="Raw Feature Request"
                    color="text-yellow-400"
                    borderColor="border-yellow-400/50"
                    onClick={startAnalysis}
                />

                {/* BRD */}
                <StepCard
                    isActive={step === 'brd'}
                    isCompleted={step === 'prd' || step === 'done'}
                    icon={<BrainCircuit className="w-6 h-6" />}
                    title="BRD"
                    desc="Gemini Analyst"
                    color="text-blue-400"
                    borderColor="border-blue-400/50"
                />

                {/* PRD */}
                <StepCard
                    isActive={step === 'prd'}
                    isCompleted={step === 'done'}
                    icon={<PenTool className="w-6 h-6" />}
                    title="PRD"
                    desc="Gemini Product Spec"
                    color="text-purple-400"
                    borderColor="border-purple-400/50"
                />
            </div>

            <AnimatePresence>
                {step !== 'idea' && step !== 'done' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-12 p-4 bg-black/50 border border-white/10 rounded-xl font-mono text-sm text-cyan-400 overflow-hidden"
                    >
                        <div className="space-y-2">
                            <p>{">"} Constructing requirements in AI SDLC loop...</p>
                            {step === 'prd' && <p>{">"} Translating metrics into technical schemas...</p>}
                            <p className="animate-pulse">{">"} {step === 'brd' ? "Creating BRD references..." : "Preparing architecture plans..."}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {step === 'idea' && (
                <div className="w-full flex justify-center mt-8">
                    <button
                        onClick={startAnalysis}
                        className="flex items-center space-x-2 bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-3 rounded-full font-bold"
                    >
                        <span>Analyze with Gemini Analyst</span>
                        <Zap className="w-4 h-4" />
                    </button>
                </div>
            )}
        </div>
    )
}

function StepCard({ isActive, isCompleted, icon, title, desc, color, borderColor, onClick }: any) {
    return (
        <motion.div
            onClick={isActive && onClick ? onClick : undefined}
            className={cn(
                "flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all duration-500 bg-black/40 backdrop-blur-xl",
                isActive ? `${borderColor} scale-110 shadow-[0_0_30px_rgba(0,255,255,0.1)] cursor-pointer` : "border-white/5 opacity-50 grayscale",
                isCompleted && "border-green-500/50 opacity-100 grayscale-0"
            )}
        >
            <div className={cn("p-4 rounded-full bg-white/5 mb-4", color)}>
                {isCompleted ? <Zap className="w-6 h-6 text-green-400" /> : icon}
            </div>
            <h3 className="text-xl font-bold mb-1 text-white">{title}</h3>
            <p className="text-xs text-slate-400 uppercase tracking-widest">{desc}</p>
        </motion.div>
    )
}
