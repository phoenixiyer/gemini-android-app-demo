'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, Code, Cpu } from 'lucide-react'

interface VirtualIDEProps {
    code: string
    isTyping: boolean
    status?: 'idle' | 'analyzing' | 'fixing'
    onComplete?: () => void
}

export default function VirtualIDE({ code, isTyping, status = 'idle', onComplete }: VirtualIDEProps) {
    const [displayedCode, setDisplayedCode] = useState('')

    useEffect(() => {
        if (!isTyping) {
            setDisplayedCode(code)
            return
        }

        let index = 0
        // Reset when code changes
        setDisplayedCode('')

        const interval = setInterval(() => {
            setDisplayedCode((prev) => {
                if (index >= code.length) {
                    clearInterval(interval)
                    if (onComplete) onComplete()
                    return prev
                }
                const char = code[index]
                index++
                return prev + char
            })
        }, 10) // Type speed

        return () => clearInterval(interval)
    }, [code, isTyping, onComplete])

    return (
        <div className="w-full h-full glass-panel rounded-xl overflow-hidden flex flex-col font-mono text-sm border-l-4 border-l-blue-500 relative">

            {/* Analyzing Overlay (Scanning Effect) */}
            <AnimatePresence>
                {status === 'analyzing' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-20 pointer-events-none bg-blue-500/5"
                    >
                        <motion.div
                            animate={{ top: ['0%', '100%'] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                            className="absolute left-0 right-0 h-1 bg-blue-400 shadow-[0_0_20px_rgba(59,130,246,1)]"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* IDE Toolbar */}
            <div className="bg-black/50 p-3 flex items-center justify-between border-b border-white/10 relative z-30">
                <div className="flex items-center space-x-2">
                    <Code className="w-4 h-4 text-blue-400" />
                    <span className="text-xs text-slate-300">TripDetailsScreen.kt</span>
                </div>
                <div className="flex items-center space-x-2">
                    {/* Status Indicators */}
                    {status === 'analyzing' && (
                        <span className="text-xs text-yellow-400 animate-pulse flex items-center">
                            <Cpu className="w-3 h-3 mr-1" /> Analyzing Logs...
                        </span>
                    )}
                    {status === 'fixing' && (
                        <span className="text-xs text-green-400 flex items-center">
                            <Code className="w-3 h-3 mr-1" /> Applying Fix...
                        </span>
                    )}
                    {isTyping && status === 'idle' && (
                        <div className="flex items-center text-xs text-purple-400">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                className="mr-1"
                            >
                                <Cpu className="w-3 h-3" />
                            </motion.div>
                            Gemini Generating...
                        </div>
                    )}
                    {!isTyping && status === 'idle' && (
                        <span className="text-xs text-slate-500">Ready</span>
                    )}
                </div>
            </div>

            {/* Editor Area */}
            <div className="flex-1 p-4 overflow-auto bg-[#1e1e1e] text-gray-300 relative">
                <pre className="whitespace-pre-wrap">
                    <code>
                        {displayedCode}
                        <motion.span
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ repeat: Infinity, duration: 0.8 }}
                            className="inline-block w-2 h-4 bg-blue-500 ml-1"
                        />
                    </code>
                </pre>

                {/* Gemini Badge Watermark */}
                <div className="absolute bottom-4 right-4 opacity-20 pointer-events-none">
                    <Terminal className="w-16 h-16 text-white" />
                </div>
            </div>
        </div>
    )
}
