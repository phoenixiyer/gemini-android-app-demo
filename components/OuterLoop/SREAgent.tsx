'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, BarChart2, AlertTriangle, RotateCcw, FileCheck } from 'lucide-react'

interface SREAgentProps {
    onReset?: () => void
}

export default function SREAgent({ onReset }: SREAgentProps) {
    const [phase, setPhase] = useState<'monitor' | 'anomaly' | 'rollback' | 'post-mortem'>('monitor')
    const [traffic, setTraffic] = useState(10)
    const [logs, setLogs] = useState<string[]>([
        "> [gemini-cli SRE] Canary deployment at 10% throughput",
        "> Monitoring latency & error instances..."
    ])

    useEffect(() => {
        const timeouts = [
            setTimeout(() => {
                setPhase('anomaly')
                setTraffic(35)
                setLogs(p => [...p, 
                    "> ⚠ ALERT: Latency anomaly detected in TripPlannerService", 
                    "> Invoking Gemini RCA analyzer..."
                ])
            }, 2000),
            setTimeout(() => {
                setPhase('rollback')
                setTraffic(0)
                setLogs(p => [...p, 
                    "> RCA: Deadlock on Aviation API timeout references",
                    "> Initiating autonomous canary rollback to v1.2.4"
                ])
            }, 4500),
            setTimeout(() => {
                setPhase('post-mortem')
                setLogs(p => [...p, 
                    "> Incident contained. Generating SRE Post-Mortem...",
                    "> [Post-Mortem] Target: location timeouts constraints."
                ])
            }, 7500)
        ]
        return () => timeouts.forEach(clearTimeout)
    }, [])

    return (
        <div className="w-full max-w-4xl bg-black/80 backdrop-blur-xl p-6 rounded-2xl border border-white/10 flex flex-col space-y-6 shadow-lg text-slate-200">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <div className="flex items-center space-x-3">
                    <ShieldCheck className="w-7 h-7 text-red-500" />
                    <div>
                        <h2 className="text-lg font-bold text-white">Gemini Autonomous SRE Agent</h2>
                        <p className="text-xs text-slate-500 uppercase font-mono">Self-healing Production Sentinel</p>
                    </div>
                </div>
                <div className="text-right">
                    <span className="font-mono text-sm px-2 py-1 rounded bg-white/5 text-red-400 border border-red-500/20">
                        Status: {phase.toUpperCase()}
                    </span>
                </div>
            </div>

            {/* Dashboard panels */}
            <div className="grid grid-cols-12 gap-6">

                {/* Metric graph */}
                <div className="col-span-5 bg-white/5 border border-white/5 p-4 rounded-xl flex flex-col justify-between">
                    <div>
                        <h3 className="text-xs uppercase font-mono text-slate-400 mb-2 select-none">Traffic simulator</h3>
                        <div className="flex items-end space-x-3 h-28 pb-2 border-b border-white/10">
                            <div className="flex-1 bg-cyan-500/20 h-12 rounded" />
                            <div className="flex-1 bg-cyan-500/40 h-16 rounded" />
                            <div 
                                className={`flex-1 rounded transition-all duration-500 ${
                                    phase === 'anomaly' ? 'bg-red-500 h-24' : 'bg-cyan-500 h-20'
                                }`} 
                            />
                            <div 
                                className={`flex-1 rounded transition-all duration-500 ${
                                    phase === 'rollback' || phase === 'post-mortem' ? 'bg-slate-700 h-0' : 'bg-cyan-500/50 h-10'
                                }`} 
                            />
                        </div>
                        <div className="flex justify-between text-xs text-slate-400 mt-2 font-mono">
                            <span>Canary: {traffic}%</span>
                            <span>Health: {phase === 'monitor' ? "100%" : phase === 'anomaly' ? "58%" : "Remediated"}</span>
                        </div>
                    </div>
                    <div className="mt-2 font-mono text-[10px] text-slate-500 uppercase">Dynamic telemetry controls</div>
                </div>

                {/* RCA & Logs Console */}
                <div className="col-span-7 bg-black border border-white/5 rounded-xl p-4 flex flex-col justify-between">
                    <div>
                        <h3 className="text-xs uppercase font-mono text-red-400 mb-2 flex items-center gap-2">
                            <BarChart2 className="w-4 h-4" /> gemini-cli autonomous mender
                        </h3>
                        <div className="bg-white/5 border border-white/10 rounded-lg p-3 font-mono text-xs text-red-400/80 space-y-2 h-32 overflow-hidden">
                            {logs.map((log, i) => (
                                <div key={i} className="text-[11px]">{log}</div>
                            ))}
                        </div>
                    </div>
                    {phase === 'post-mortem' && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-4 flex items-center space-x-2 bg-green-900/20 border border-green-500/30 p-2 rounded text-xs text-green-400"
                        >
                            <FileCheck className="w-4 h-4" />
                            <span>Post-mortem generated independently!</span>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Action Reset Trigger */}
            {phase === 'post-mortem' && onReset && (
                <div className="w-full flex justify-center">
                    <button 
                        onClick={onReset}
                        className="px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs rounded-full font-mono flex gap-2 items-center"
                    >
                        <RotateCcw className="w-4 h-4" /> <span>Restart ADLC Lifecycle workflows</span>
                    </button>
                </div>
            )}
        </div>
    )
}
