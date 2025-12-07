'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, PenTool, Bug, BrainCircuit, Terminal } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AgentSwarmProps {
    status?: 'active' | 'synced'
}

// Simulated A2A (Agent-to-Agent) Protocol Logs
const AGENT_LOGS = [
    { source: 'SYS', msg: 'Initializing Swarm Protocol v2.4...' },
    { source: 'ARCH', msg: 'Requesting schema validation for UserSession.kt' },
    { source: 'SEC', msg: 'Scanning dependency tree for vulnerabilities...' },
    { source: 'QA', msg: 'Generating test cases for edge cases...' },
    { source: 'SEC', msg: '✅ Auth token security verified (OIDC-compliant).' },
    { source: 'ARCH', msg: '✅ Architecture pattern confirmed: Clean Arch.' },
    { source: 'QA', msg: '⚠️ Potentially flaky test detected in TripViewModel.' },
    { source: 'SYS', msg: 'Consensus reached. Merging contexts.' }
]

export default function AgentSwarm({ status = 'active' }: AgentSwarmProps) {
    const [logs, setLogs] = useState<typeof AGENT_LOGS>([])

    useEffect(() => {
        let i = 0
        const interval = setInterval(() => {
            if (i < AGENT_LOGS.length) {
                setLogs(prev => [...prev, AGENT_LOGS[i]].slice(-4)) // Keep last 4
                i++
            }
        }, 800)
        return () => clearInterval(interval)
    }, [])

    const agents = [
        { id: 'arch', label: 'Architect', icon: PenTool, color: 'text-purple-400', bg: 'bg-purple-500/20', borderColor: 'border-purple-500/50', delay: 0 },
        { id: 'sec', label: 'Security', icon: Shield, color: 'text-blue-400', bg: 'bg-blue-500/20', borderColor: 'border-blue-500/50', delay: 0.2 },
        { id: 'qa', label: 'QA Agent', icon: Bug, color: 'text-red-400', bg: 'bg-red-500/20', borderColor: 'border-red-500/50', delay: 0.4 },
    ]

    return (
        <div className="absolute inset-0 bg-black/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center font-mono">
            {/* Central Brain (Synthesis) */}
            <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute z-10"
            >
                <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center border border-white/10 blur-xl absolute inset-0" />
                <BrainCircuit className="w-12 h-12 text-white/50" />
            </motion.div>

            {/* Orbiting Agents */}
            <div className="relative w-64 h-64">
                {agents.map((agent, i) => {
                    // Calculate circular position
                    // 3 agents: 0, 120, 240 degrees
                    const angle = (i * 360) / agents.length

                    return (
                        <motion.div
                            key={agent.id}
                            className="absolute top-1/2 left-1/2"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                            style={{
                                originX: 0,
                                originY: 0
                            }}
                        >
                            <motion.div
                                // Counter-rotate to keep icon upright
                                animate={{ rotate: -360 }}
                                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                                style={{
                                    transform: `translate(${Math.cos(angle * Math.PI / 180) * 80}px, ${Math.sin(angle * Math.PI / 180) * 80}px)`
                                }}
                                className={cn(
                                    "w-16 h-16 rounded-full flex flex-col items-center justify-center border backdrop-blur-md shadow-lg z-20",
                                    agent.bg, agent.borderColor
                                )}
                            >
                                <agent.icon className={cn("w-5 h-5 mb-1", agent.color)} />
                                <span className={cn("text-[8px] uppercase font-bold tracking-wider", agent.color)}>
                                    {agent.label}
                                </span>
                            </motion.div>
                        </motion.div>
                    )
                })}

                {/* Connecting Lines (Simulated Neural Net) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <svg className="w-full h-full opacity-30">
                        {/* We can animate these lines later for more specific "connection" effects */}
                        <circle cx="50%" cy="50%" r="80" stroke="white" strokeWidth="1" fill="none" strokeDasharray="4 4" className="animate-[spin_20s_linear_infinite]" />
                    </svg>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-8 text-white font-bold tracking-widest text-sm"
            >
                MULTI-AGENT ORCHESTRATION
            </motion.div>

            {/* A2A Protocol Terminal */}
            <div className="absolute bottom-8 w-full max-w-lg px-6">
                <div className="bg-black/80 border border-green-500/30 rounded-lg p-3 font-mono text-[10px] text-green-400 overflow-hidden h-24 shadow-2xl">
                    <div className="flex items-center space-x-2 border-b border-green-500/20 pb-1 mb-2">
                        <Terminal className="w-3 h-3" />
                        <span className="uppercase tracking-widest text-[8px] opacity-70">A2A Protocol Stream</span>
                    </div>
                    <div className="flex flex-col space-y-1">
                        <AnimatePresence>
                            {logs.map((log, i) => (
                                <motion.div
                                    key={`${log.source}-${i}`}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex items-center space-x-2"
                                >
                                    <span className={cn("font-bold",
                                        log.source === 'SEC' ? 'text-blue-400' :
                                            log.source === 'QA' ? 'text-red-400' :
                                                log.source === 'ARCH' ? 'text-purple-400' : 'text-slate-400'
                                    )}>
                                        [{log.source}]
                                    </span>
                                    <span className="opacity-80 truncate">{log.msg}</span>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    )
}
