'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bug, ShieldCheck, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'

// Realistic Bug Labels
const BUG_TYPES = [
    { type: 'NPE', file: 'UserSession.kt', severity: 'HIGH' },
    { type: 'SQLi', file: 'LoginRepo.kt', severity: 'CRITICAL' },
    { type: 'OOM', file: 'ImageCache.kt', severity: 'MEDIUM' },
    { type: 'Race', file: 'SyncWorker.kt', severity: 'HIGH' },
    { type: 'SSRF', file: 'ApiClient.kt', severity: 'CRITICAL' },
    { type: 'XSS', file: 'WebView.kt', severity: 'MEDIUM' },
    { type: 'Leak', file: 'BitmapPool.kt', severity: 'HIGH' },
]

interface BugEntity {
    id: number
    x: number
    y: number
    label: string
    severity: string
    fixed?: boolean
}

interface ChaosProps {
    onComplete: (stats: { bugsFixed: number; timeSaved: string }) => void
}

export default function ChaosMode({ onComplete }: ChaosProps) {
    const [bugs, setBugs] = useState<BugEntity[]>([])
    const [score, setScore] = useState(0)
    const [fixes, setFixes] = useState<{ id: number; x: number; y: number; label: string }[]>([])
    const [timeLeft, setTimeLeft] = useState(15)
    const containerRef = useRef<HTMLDivElement>(null)

    // Countdown Timer
    useEffect(() => {
        if (timeLeft <= 0) {
            onComplete({ bugsFixed: score, timeSaved: `$${(score * 5000).toLocaleString()}` })
            return
        }
        const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000)
        return () => clearTimeout(timer)
    }, [timeLeft, score, onComplete])

    // Spawn Bugs with Labels
    useEffect(() => {
        if (timeLeft <= 0) return
        const interval = setInterval(() => {
            if (bugs.length < 6 && containerRef.current) {
                const { width, height } = containerRef.current.getBoundingClientRect()
                const bugInfo = BUG_TYPES[Math.floor(Math.random() * BUG_TYPES.length)]
                const newBug: BugEntity = {
                    id: Date.now() + Math.random(),
                    x: Math.random() * (width - 120) + 20,
                    y: Math.random() * (height - 100) + 50,
                    label: `${bugInfo.type}: ${bugInfo.file}`,
                    severity: bugInfo.severity
                }
                setBugs(prev => [...prev, newBug])
            }
        }, 700)
        return () => clearInterval(interval)
    }, [bugs, timeLeft])

    // Agent Hunt Logic
    useEffect(() => {
        if (bugs.length === 0 || timeLeft <= 0) return

        const huntInterval = setInterval(() => {
            setBugs(currentBugs => {
                if (currentBugs.length === 0) return []
                const target = currentBugs[0]

                // Show "Fixed!" feedback
                setFixes(prev => [...prev, { id: target.id, x: target.x, y: target.y, label: target.label }])
                setTimeout(() => {
                    setFixes(prev => prev.filter(f => f.id !== target.id))
                }, 800)

                setScore(s => s + 1)
                return currentBugs.slice(1)
            })
        }, 900)

        return () => clearInterval(huntInterval)
    }, [bugs, timeLeft])

    return (
        <div ref={containerRef} className="relative w-full h-full bg-gradient-to-br from-red-950/80 to-slate-900 rounded-xl overflow-hidden border-2 border-red-500/50 shadow-[0_0_40px_rgba(239,68,68,0.3)]">
            {/* Header / Score */}
            <div className="absolute top-4 left-0 right-0 flex justify-center z-20">
                <div className="bg-black/70 backdrop-blur-lg border border-red-500 text-red-400 px-6 py-3 rounded-full font-mono font-bold flex items-center space-x-4 shadow-lg">
                    <AlertTriangle className="w-5 h-5 animate-pulse" />
                    <span>CHAOS ACTIVE</span>
                    <div className="h-5 w-px bg-red-500/50" />
                    <span className="text-white">FIXED: <span className="text-green-400">{score}</span></span>
                    <div className="h-5 w-px bg-red-500/50" />
                    <span className="text-slate-400">TIME: <span className="text-yellow-400">{timeLeft}s</span></span>
                </div>
            </div>

            {/* Bugs */}
            <AnimatePresence>
                {bugs.map(bug => (
                    <motion.div
                        key={bug.id}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0, rotate: 90 }}
                        style={{ left: bug.x, top: bug.y }}
                        className="absolute flex flex-col items-center"
                    >
                        <div className={cn(
                            "px-2 py-0.5 rounded text-[10px] font-mono font-bold mb-1",
                            bug.severity === 'CRITICAL' ? 'bg-red-600 text-white' :
                                bug.severity === 'HIGH' ? 'bg-orange-500 text-white' :
                                    'bg-yellow-500 text-black'
                        )}>
                            {bug.label}
                        </div>
                        <Bug className="w-8 h-8 text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)] animate-bounce" />
                    </motion.div>
                ))}
            </AnimatePresence>

            {/* Fixed! Feedback */}
            <AnimatePresence>
                {fixes.map(fix => (
                    <motion.div
                        key={fix.id}
                        initial={{ opacity: 1, y: 0 }}
                        animate={{ opacity: 0, y: -30 }}
                        exit={{ opacity: 0 }}
                        style={{ left: fix.x, top: fix.y }}
                        className="absolute text-green-400 font-bold text-sm font-mono"
                    >
                        ✓ PATCHED
                    </motion.div>
                ))}
            </AnimatePresence>

            {/* The Agent Swarm (Center Defense) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative">
                    <div className="absolute inset-0 w-24 h-24 bg-blue-500/30 blur-2xl rounded-full animate-pulse" />
                    <ShieldCheck className="w-20 h-20 text-blue-400 relative z-10" />
                </div>
            </div>

            {/* SVG Zap Lines (Visual only, not functional targeting) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                {bugs.slice(0, 1).map(bug => (
                    <motion.line
                        key={`zap-${bug.id}`}
                        initial={{ pathLength: 0, opacity: 0.8 }}
                        animate={{ pathLength: 1, opacity: 0.2 }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        x1="50%"
                        y1="50%"
                        x2={bug.x + 40}
                        y2={bug.y + 30}
                        stroke="#60a5fa"
                        strokeWidth="2"
                        strokeDasharray="5 5"
                    />
                ))}
            </svg>
        </div>
    )
}
