'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GitBranch, CheckCircle2, XCircle, BrainCircuit, Search } from 'lucide-react'
import { cn } from '@/lib/utils'

// Tree Data: Root -> Options -> Conclusion
const TREE_DATA = {
    id: 'root',
    label: 'Architectural Decisions',
    status: 'completed',
    children: [
        {
            id: 'mwvm',
            label: 'Pattern: MVVM',
            status: 'analysing',
            notes: 'Pros: Separation of Concerns. Cons: Boilerplate.',
            score: 0.85
        },
        {
            id: 'clean',
            label: 'Pattern: Clean Arch',
            status: 'selected',
            notes: 'Selected: Best for scalability & clarity.',
            score: 0.98
        },
        {
            id: 'god',
            label: 'Pattern: God Activity',
            status: 'rejected',
            notes: 'Rejected: High technical debt risk.',
            score: 0.12
        }
    ]
}

export default function ReasoningTree() {
    const [visibleNodes, setVisibleNodes] = useState<string[]>(['root'])
    const [selectedNode, setSelectedNode] = useState<string | null>(null)

    // Staggered reveal of nodes
    useEffect(() => {
        const timers = [
            setTimeout(() => setVisibleNodes(prev => [...prev, 'mwvm']), 500),
            setTimeout(() => setVisibleNodes(prev => [...prev, 'clean']), 1000),
            setTimeout(() => setVisibleNodes(prev => [...prev, 'god']), 1500),
        ]
        return () => timers.forEach(clearTimeout)
    }, [])

    return (
        <div className="absolute inset-0 bg-black/95 backdrop-blur-md z-50 flex flex-col items-center justify-center font-mono p-8">
            <div className="absolute top-4 left-4 flex items-center space-x-2 text-blue-400 opacity-70">
                <BrainCircuit className="w-5 h-5" />
                <span className="text-xs tracking-widest uppercase">Tree of Thought (ToT) Explorer</span>
            </div>

            {/* Tree Structure */}
            <div className="relative w-full max-w-3xl h-[60%] flex flex-col items-center">

                {/* Root Node */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mb-12 relative z-10"
                >
                    <div className="bg-white/10 border border-white/20 px-6 py-3 rounded-full text-white font-bold shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                        {TREE_DATA.label}
                    </div>
                    {/* Vertical Line Down */}
                    <div className="absolute top-full left-1/2 w-px h-12 bg-white/20 -translate-x-1/2" />
                </motion.div>

                {/* Branch Nodes */}
                <div className="flex justify-between w-full relative">
                    {/* Horizontal connector line */}
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '80%' }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="absolute top-0 left-[10%] h-px bg-white/20"
                    />

                    {TREE_DATA.children.map((node) => (
                        <AnimatePresence key={node.id}>
                            {visibleNodes.includes(node.id) && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex flex-col items-center relative w-1/3"
                                >
                                    {/* Connector from horizontal line */}
                                    <div className="h-8 w-px bg-white/20 mb-2" />

                                    <button
                                        onClick={() => setSelectedNode(node.id)}
                                        className={cn(
                                            "relative group px-4 py-3 rounded-xl border transition-all duration-300 w-4/5 flex flex-col items-center space-y-2 hover:scale-105",
                                            node.status === 'selected' ? "bg-green-500/20 border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.3)]" :
                                                node.status === 'rejected' ? "bg-red-500/10 border-red-500/30 opacity-60" :
                                                    "bg-blue-500/10 border-blue-500/30"
                                        )}
                                    >
                                        <div className="flex items-center space-x-2">
                                            {node.status === 'selected' ? <CheckCircle2 className="w-4 h-4 text-green-400" /> :
                                                node.status === 'rejected' ? <XCircle className="w-4 h-4 text-red-400" /> :
                                                    <GitBranch className="w-4 h-4 text-blue-400" />}
                                            <span className={cn("text-xs font-bold",
                                                node.status === 'selected' ? "text-green-300" :
                                                    node.status === 'rejected' ? "text-red-300" : "text-blue-300"
                                            )}>
                                                {node.label}
                                            </span>
                                        </div>

                                        {/* Score bar */}
                                        <div className="w-full h-1 bg-black/50 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${node.score * 100}%` }}
                                                className={cn("h-full",
                                                    node.status === 'selected' ? "bg-green-500" :
                                                        node.status === 'rejected' ? "bg-red-500" : "bg-blue-500"
                                                )}
                                            />
                                        </div>
                                        <span className="text-[10px] text-white/50">{Math.round(node.score * 100)}% Confidence</span>
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    ))}
                </div>
            </div>

            {/* Analysis Panel (Bottom) */}
            <div className="h-[30%] w-full max-w-2xl mt-8">
                <AnimatePresence mode="wait">
                    {selectedNode && (
                        <motion.div
                            key={selectedNode}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 shadow-2xl"
                        >
                            <div className="flex items-center space-x-3 mb-2">
                                <Search className="w-4 h-4 text-purple-400" />
                                <h4 className="text-sm font-bold text-white uppercase tracking-wider">Reasoning Trace</h4>
                            </div>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                {TREE_DATA.children.find(n => n.id === selectedNode)?.notes}
                            </p>
                        </motion.div>
                    )}
                    {!selectedNode && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center justify-center h-full text-zinc-600 text-sm animate-pulse"
                        >
                            Select a node to inspect reasoning...
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
