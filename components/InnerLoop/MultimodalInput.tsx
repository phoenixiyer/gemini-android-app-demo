'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Image as ImageIcon, FileCode, ScanLine, Sparkles, UploadCloud } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MultimodalInputProps {
    onScanComplete: () => void
}

export default function MultimodalInput({ onScanComplete }: MultimodalInputProps) {
    const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
    const [isScanning, setIsScanning] = useState(false)

    const templates = [
        { id: 'figma', label: 'Figma Design', icon: <div className="w-8 h-8 rounded-lg bg-pink-500/20 text-pink-500 flex items-center justify-center border border-pink-500/50">F</div>, color: 'border-pink-500/50 hover:bg-pink-500/10' },
        { id: 'whiteboard', label: 'Whiteboard Sketch', icon: <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-500 flex items-center justify-center border border-blue-500/50"><ImageIcon className="w-4 h-4" /></div>, color: 'border-blue-500/50 hover:bg-blue-500/10' },
        { id: 'napkin', label: 'Napkin Drawing', icon: <div className="w-8 h-8 rounded-lg bg-yellow-500/20 text-yellow-500 flex items-center justify-center border border-yellow-500/50"><FileCode className="w-4 h-4" /></div>, color: 'border-yellow-500/50 hover:bg-yellow-500/10' },
    ]

    const handleSelect = (id: string) => {
        setSelectedTemplate(id)
        setIsScanning(true)

        // Simulate Scan Duration then Trigger Callback
        setTimeout(() => {
            onScanComplete()
        }, 2000)
    }

    return (
        <div className="w-full max-w-2xl mx-auto p-6 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl flex flex-col items-center space-y-6 relative overflow-hidden shadow-2xl">

            {/* Header */}
            <div className="text-center space-y-2 relative z-10">
                <div className="flex items-center justify-center space-x-2">
                    <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
                    <h2 className="text-2xl font-bold text-white tracking-tight">Gemini Vision Input</h2>
                </div>
                <p className="text-slate-400 text-sm">Drag & Drop visual assets to generate code instantly.</p>
            </div>

            {/* Drop Zone / Template Grid */}
            <div className="grid grid-cols-3 gap-4 w-full relative z-10">
                {templates.map((template) => (
                    <button
                        key={template.id}
                        onClick={() => handleSelect(template.id)}
                        disabled={isScanning}
                        className={cn(
                            "relative group flex flex-col items-center p-6 rounded-xl border transition-all duration-300",
                            template.color,
                            selectedTemplate === template.id ? "ring-2 ring-white scale-105 bg-white/5" : "bg-black/20 opacity-70 hover:opacity-100 hover:scale-105"
                        )}
                    >
                        <div className="mb-3">{template.icon}</div>
                        <span className="text-xs font-bold text-slate-300 group-hover:text-white transition-colors">{template.label}</span>

                        {/* Selected Indicator */}
                        {selectedTemplate === template.id && (
                            <motion.div
                                layoutId="selected-ring"
                                className="absolute inset-0 border-2 border-white rounded-xl"
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Upload Area Visual */}
            <div className="w-full h-24 border-2 border-dashed border-slate-700 rounded-xl flex items-center justify-center space-x-2 text-slate-500 hover:text-slate-300 hover:border-slate-500 transition-colors cursor-pointer relative z-10">
                <UploadCloud className="w-5 h-5" />
                <span className="text-sm font-mono">Or drop files here...</span>
            </div>

            {/* Scanning Effect Overlay */}
            <AnimatePresence>
                {isScanning && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-20 pointer-events-none bg-black/60 flex flex-col items-center justify-center"
                    >
                        {/* The Scanner Beam */}
                        <div className="absolute inset-0">
                            <motion.div
                                initial={{ top: '0%' }}
                                animate={{ top: '100%' }}
                                transition={{ duration: 1.5, ease: "linear" }}
                                className="absolute left-0 right-0 h-1 bg-green-500 shadow-[0_0_50px_rgba(34,197,94,1)]"
                            />
                        </div>

                        {/* Text */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-black/90 px-6 py-3 rounded-full border border-green-500/50 flex items-center space-x-3 shadow-2xl"
                        >
                            <ScanLine className="w-5 h-5 text-green-400 animate-spin" />
                            <span className="text-green-400 font-mono font-bold tracking-widest uppercase text-sm">
                                Analyzing Pixels...
                            </span>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    )
}
