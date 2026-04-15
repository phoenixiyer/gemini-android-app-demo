'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lightbulb, FileText, FileSpreadsheet, Zap, ArrowRight, FileCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

interface IdeationStageProps {
    onComplete: () => void
}

export default function IdeationStage({ onComplete }: IdeationStageProps) {
    const [step, setStep] = useState<'idea' | 'brd' | 'prd' | 'done'>('idea')
    const [logs, setLogs] = useState<string[]>([
        "> Initializing AI SDLC session...",
        "> Waiting for customer brief..."
    ])

    const processIdeation = () => {
        setStep('brd')
        setLogs(prev => [...prev, "> Analyzing customer brief...", "> Gemini CLI invoking analyst capability...", "> BRD Draft generated!"])

        setTimeout(() => {
            setStep('prd')
            setLogs(prev => [...prev, "> Gemini Code Assist translating BRD to PRD...", "> Synthesizing technical constraints...", "> PRD & assets finalized!"])

            setTimeout(() => {
                setStep('done')
                onComplete()
            }, 3000)
        }, 3000)
    }

    return (
        <div className="w-full max-w-3xl mx-auto p-8 relative">
            {/* Connection Lines Background */}
            <svg className="absolute top-1/2 left-0 w-full h-20 -translate-y-1/2 pointer-events-none opacity-20">
                <path d="M 100 40 L 300 40 L 500 40" stroke="white" strokeWidth="2" strokeDasharray="5,5" fill="none" />
            </svg>

            <div className="grid grid-cols-3 gap-8 relative z-10">
                {/* IDEA */}
                <StepCard
                    isActive={step === 'idea'}
                    isCompleted={step !== 'idea'}
                    icon={<Lightbulb className="w-6 h-6" />}
                    title="Mock Idea"
                    desc="Raw Requirements"
                    color="text-amber-400"
                    borderColor="border-amber-400/50"
                    onClick={processIdeation}
                />

                {/* BRD */}
                <StepCard
                    isActive={step === 'brd'}
                    isCompleted={step === 'prd' || step === 'done'}
                    icon={<FileText className="w-6 h-6" />}
                    title="BRD"
                    desc="Business Context"
                    color="text-cyan-400"
                    borderColor="border-cyan-400/50"
                />

                {/* PRD */}
                <StepCard
                    isActive={step === 'prd'}
                    isCompleted={step === 'done'}
                    icon={<FileSpreadsheet className="w-6 h-6" />}
                    title="PRD"
                    desc="Technical Assets"
                    color="text-fuchsia-400"
                    borderColor="border-fuchsia-400/50"
                />
            </div>

            {/* Interactive Logs Overlay */}
            <AnimatePresence>
                {logs.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-12 p-6 bg-black/80 border border-white/10 rounded-xl font-mono text-sm text-cyan-400 overflow-hidden relative shadow-2xl backdrop-blur-md"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-shimmer" />
                        <div className="space-y-2">
                            {logs.map((log, index) => (
                                <p key={index}>{log}</p>
                            ))}
                            {step !== 'done' && step !== 'idea' && (
                                <p className="text-slate-500 animate-pulse tracking-wider">Generating specifications in real-time...</p>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Action Notice */}
            {step === 'idea' && (
                <div className="w-full flex justify-center mt-8">
                    <button
                        onClick={processIdeation}
                        className="flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-cyan-500 hover:from-amber-400 hover:to-cyan-400 text-white px-6 py-3 rounded-full font-bold transition-all transform hover:scale-105 shadow-lg"
                    >
                        <span>Gemini CLI: Construct BRD/PRD</span>
                        <Zap className="w-5 h-5" />
                    </button>
                </div>
            )}
        </div>
    )
}

function StepCard({ isActive, isCompleted, icon, title, desc, color, borderColor, onClick }: any) {
    return (
        <motion.div
            layout
            onClick={isActive && onClick ? onClick : undefined}
            className={cn(
                "flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all duration-500 bg-black/40 backdrop-blur-xl cursor-pointer",
                isActive ? `${borderColor} scale-110 shadow-[0_0_30px_rgba(34,211,238,0.2)]` : "border-white/5 opacity-50 grayscale",
                isCompleted && "border-green-500/50 opacity-100 grayscale-0"
            )}
        >
            <div className={cn("p-4 rounded-full bg-white/5 mb-4", color)}>
                {isCompleted ? <Zap className="w-6 h-6 text-green-400" /> : icon}
            </div>
            <h3 className={cn("text-xl font-bold mb-1 text-white")}>{title}</h3>
            <p className="text-xs text-slate-400 uppercase tracking-widest">{desc}</p>
        </motion.div>
    )
}
