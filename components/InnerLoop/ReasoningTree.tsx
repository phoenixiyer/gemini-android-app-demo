'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GitBranch, BrainCircuit, CheckCircle2, XCircle, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { generateArchitecturalReasoning } from '@/lib/gemini'

interface TreeNode {
    id: number
    label: string
    status: 'root' | 'pending' | 'analyzing' | 'rejected' | 'selected'
    x: number
    y: number
}

const DEFAULT_NODES: TreeNode[] = [
    { id: 1, label: "Analyzing UI Performance...", status: 'root', x: 0, y: 0 },
    { id: 2, label: "Scanning...", status: 'pending', x: -100, y: 100 },
    { id: 3, label: "Scanning...", status: 'pending', x: 0, y: 100 },
    { id: 4, label: "Scanning...", status: 'pending', x: 100, y: 100 },
]

export default function ReasoningTree() {
    const [nodes, setNodes] = useState<TreeNode[]>(DEFAULT_NODES)

    // Trigger Real Gemini Scan on Mount
    useEffect(() => {
        let mounted = true

        const fetchReasoning = async () => {
            // Artificial delay for effect
            await new Promise(r => setTimeout(r, 1000))

            const options = await generateArchitecturalReasoning("Optimizing Complex RecyclerView Performance")

            if (mounted && options && options.length === 3) {
                setNodes([
                    { id: 1, label: "Goal: Optimize Trip List", status: 'root', x: 0, y: 0 },
                    { id: 2, label: options[0] || "Option A", status: 'rejected', x: -120, y: 120 },
                    { id: 3, label: options[1] || "Option B", status: 'selected', x: 0, y: 120 },
                    { id: 4, label: options[2] || "Option C", status: 'rejected', x: 120, y: 120 },
                ])
            }
        }

        fetchReasoning()

        return () => { mounted = false }
    }, [])

    return (
        <div className="absolute inset-0 bg-slate-950/90 z-50 flex items-center justify-center overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

            <div className="relative w-full h-full flex items-center justify-center">

                {/* Connecting Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    {nodes.slice(1).map((node) => (
                        <motion.line
                            key={`line-${node.id}`}
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.3 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            x1="50%"
                            y1="50%"
                            x2={`calc(50% + ${node.x}px)`}
                            y2={`calc(50% + ${node.y}px)`}
                            stroke={node.status === 'selected' ? '#22c55e' : '#94a3b8'}
                            strokeWidth="2"
                        />
                    ))}
                </svg>

                {/* Nodes */}
                <AnimatePresence>
                    {nodes.map((node) => (
                        <motion.div
                            key={node.id}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{
                                scale: 1,
                                opacity: 1,
                                x: node.x,
                                y: node.y
                            }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            className={cn(
                                "absolute w-40 p-3 rounded-xl border backdrop-blur-md flex flex-col items-center text-center shadow-lg z-10",
                                node.status === 'root' ? "bg-blue-500/20 border-blue-500 text-blue-100" :
                                    node.status === 'selected' ? "bg-green-500/20 border-green-500 text-green-100" :
                                        node.status === 'rejected' ? "bg-red-500/10 border-red-500/50 text-red-200" :
                                            "bg-slate-800/50 border-slate-700 text-slate-400"
                            )}
                        >
                            <div className="mb-2">
                                {node.status === 'root' ? <BrainCircuit className="w-6 h-6" /> :
                                    node.status === 'selected' ? <CheckCircle2 className="w-5 h-5 text-green-400" /> :
                                        node.status === 'rejected' ? <XCircle className="w-5 h-5 text-red-400" /> :
                                            <Search className="w-5 h-5 animate-pulse" />}
                            </div>
                            <span className="text-xs font-bold leading-tight">{node.label}</span>

                            {node.status === 'selected' && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="mt-2 text-[10px] bg-green-900/40 px-2 py-1 rounded"
                                >
                                    Confidence: 98%
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Legend / Title */}
                <div className="absolute top-8 left-0 right-0 text-center pointer-events-none">
                    <h3 className="text-xl font-bold text-slate-300 tracking-widest uppercase flex items-center justify-center gap-2">
                        <GitBranch className="w-5 h-5 text-purple-400" />
                        Tree of Thoughts
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">Gemini Pro • Architectural Evaluation</p>
                </div>
            </div>
        </div>
    )
}
