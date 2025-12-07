'use client'

import { motion } from 'framer-motion'
import { FileCode, Database, Globe, Layers, Cpu, Search, Server } from 'lucide-react'

interface ThinkingCanvasProps {
    mode: 'gen' | 'fix' | 'refine' | 'pipeline'
}

// Config for bubble content
const CONTEXTS = {
    gen: [
        { text: 'Reading PRD...', icon: FileCode, color: 'bg-blue-500' },
        { text: 'Checking Design System...', icon: Layers, color: 'bg-purple-500' },
        { text: 'Scanning existing components...', icon: Search, color: 'bg-indigo-500' },
    ],
    fix: [
        { text: 'Analyzing Logcat...', icon: FileCode, color: 'bg-red-500' },
        { text: 'Tracing NullPointer...', icon: Search, color: 'bg-orange-500' },
        { text: 'Reading DateUtils.kt...', icon: FileCode, color: 'bg-blue-500' },
        { text: 'Checking StackOverflow...', icon: Globe, color: 'bg-yellow-500' },
    ],
    refine: [
        { text: 'Analyzing Material 3 Docs...', icon: Globe, color: 'bg-teal-500' },
        { text: 'Optimizing Composable...', icon: Cpu, color: 'bg-green-500' },
        { text: 'Fetching Unsplash assets...', icon: Database, color: 'bg-pink-500' },
    ],
    pipeline: [
        { text: 'Parsing JUnit Report...', icon: FileCode, color: 'bg-red-500' },
        { text: 'Checking Gradle Build...', icon: Server, color: 'bg-blue-600' },
        { text: 'Applying Auto-Fix...', icon: Cpu, color: 'bg-green-500' },
    ]
}

export default function ThinkingCanvas({ mode }: ThinkingCanvasProps) {
    const items = CONTEXTS[mode]

    return (
        <div className="w-full h-full absolute inset-0 z-40 bg-black/80 backdrop-blur-sm flex items-center justify-center overflow-hidden">
            {/* Central Brain */}
            <div className="relative z-10">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360],
                        filter: ['brightness(1)', 'brightness(1.5)', 'brightness(1)']
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 blur-xl opacity-50 absolute inset-0"
                />
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="w-24 h-24 relative flex items-center justify-center"
                >
                    <Cpu className="w-12 h-12 text-white" />
                </motion.div>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ repeat: Infinity, duration: 1, repeatType: 'reverse' }}
                        className="text-white font-mono text-sm tracking-widest whitespace-nowrap"
                    >
                        CONNECTING CONTEXT...
                    </motion.div>
                </div>
            </div>

            {/* Floating Context Bubbles */}
            {items.map((item, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                    animate={{
                        opacity: [0, 1, 1, 0],
                        scale: [0.5, 1, 1, 0.5],
                        x: [0, (i % 2 === 0 ? 150 : -150) + (Math.random() * 50)],
                        y: [0, (i < 2 ? -100 : 100) + (Math.random() * 50)]
                    }}
                    transition={{
                        duration: 3,
                        delay: i * 0.8,
                        repeat: Infinity,
                        repeatDelay: 1
                    }}
                    className="absolute flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20"
                >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${item.color}`}>
                        <item.icon className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm font-medium text-white">{item.text}</span>
                </motion.div>
            ))}

            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                <motion.circle
                    cx="50%" cy="50%" r="100"
                    fill="none" stroke="url(#grad)" strokeWidth="1"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
                <defs>
                    <radialGradient id="grad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                        <stop offset="0%" stopColor="white" />
                        <stop offset="100%" stopColor="transparent" />
                    </radialGradient>
                </defs>
            </svg>
        </div>
    )
}
