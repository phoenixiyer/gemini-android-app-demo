'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, Terminal, Hammer, CheckCircle, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ShiftLeftDashboardProps {
    onComplete?: () => void
}

export default function ShiftLeftDashboard({ onComplete }: ShiftLeftDashboardProps) {
    const [tests, setTests] = useState<string[]>(Array(16).fill('pending'))
    const [diffState, setDiffState] = useState<'idle' | 'fail' | 'mend'>('idle')
    const [coverage, setCoverage] = useState(58)

    useEffect(() => {
        // Simulate parallel test runs
        const intervals = [
            setTimeout(() => setTests(p => { const n = [...p]; n[0] = 'pass'; n[1] = 'pass'; return n }), 500),
            setTimeout(() => setTests(p => { const n = [...p]; n[2] = 'pass'; n[3] = 'pass'; return n }), 1000),
            setTimeout(() => {
                setTests(p => { const n = [...p]; n[4] = 'fail'; return n })
                setDiffState('fail')
            }, 1500),
            setTimeout(() => {
                setDiffState('mend')
                setCoverage(98)
                setTests(p => { const n = [...p]; n[4] = 'pass'; return n })
            }, 3500),
            setTimeout(() => {
                setTests(p => p.map(() => 'pass'))
                if (onComplete) onComplete()
            }, 5000)
        ]
        return () => intervals.forEach(clearTimeout)
    }, [])

    return (
        <div className="w-full max-w-4xl bg-black/80 border border-white/10 rounded-2xl backdrop-blur-xl p-6 flex flex-col space-y-6 shadow-2xl text-slate-200">
            
            {/* Header */}
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <div className="flex items-center space-x-3">
                    <ShieldCheck className="w-7 h-7 text-cyan-400" />
                    <div>
                        <h2 className="text-lg font-bold text-white">Gemini Shift-Left Test Runner</h2>
                        <p className="text-xs text-slate-500 uppercase font-mono">Continuous compliance & testing suite</p>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="text-right">
                        <div className="text-cyan-400 font-mono text-xl">{coverage}%</div>
                        <div className="text-[10px] text-slate-500 uppercase">Test coverage</div>
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-12 gap-6">
                
                {/* Left panel: Parallel executions */}
                <div className="col-span-5 bg-white/5 border border-white/5 p-4 rounded-xl">
                    <h3 className="text-xs uppercase font-mono text-slate-400 mb-3 tracking-wider">Parallel Test Execution Matrix</h3>
                    <div className="grid grid-cols-4 gap-2">
                        {tests.map((status, i) => (
                            <div 
                                key={i}
                                className={cn(
                                    "h-10 rounded-md flex items-center justify-center font-mono text-xs border transition-all duration-300",
                                    status === 'pending' && "bg-white/5 border-white/10 text-slate-600 animate-pulse",
                                    status === 'pass' && "bg-green-500/20 border-green-500/50 text-green-400 shadow-[0_0_8px_rgba(34,197,94,0.2)]",
                                    status === 'fail' && "bg-red-500/20 border-red-500/50 text-red-400 animate-shake"
                                )}
                            >
                                UI-{i + 10}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Panel: AI Auto-Remediation Diff */}
                <div className="col-span-7 bg-black border border-white/5 rounded-xl p-4 flex flex-col justify-between">
                    <div>
                        <h3 className="text-xs uppercase font-mono text-cyan-400 mb-2 flex items-center gap-2">
                            <Terminal className="w-4 h-4" /> AI Trace Analysis
                        </h3>
                        <div className="bg-white/5 border border-white/10 rounded-lg p-3 font-mono text-xs text-slate-400 space-y-1">
                            {diffState === 'idle' && <p className="text-slate-600">Evaluating integrations...</p>}
                            {diffState !== 'idle' && (
                                <>
                                    <p className="text-slate-500">{`// testPlannerService.kt:45`}</p>
                                    <p className="text-red-400">{`- assert(tripCount == 0)`}</p>
                                    {diffState === 'mend' && (
                                        <>
                                            <p className="text-green-400">{`+ assert(suggestedReschedules.isNotEmpty())`}</p>
                                            <p className="text-cyan-400 mt-2">{`✨ Gemini auto-mended assertion failures.`}</p>
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-xs">
                            <Hammer className="w-4 h-4 text-yellow-400" />
                            <span className="text-slate-400">Status: {diffState === 'mend' ? "Auto healed by AI" : "Testing constraints..."}</span>
                        </div>
                        <span className="text-slate-600 text-[10px] uppercase">Shift-left autonomous compliance</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
