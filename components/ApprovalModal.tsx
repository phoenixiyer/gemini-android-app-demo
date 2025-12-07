'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, AlertTriangle, ArrowRight } from 'lucide-react'

interface ApprovalModalProps {
    isOpen: boolean
    onApprove: () => void
    onReject: () => void
}

export default function ApprovalModal({ isOpen, onApprove, onReject }: ApprovalModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={onReject}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="bg-[#1e1e1e] w-full max-w-lg rounded-2xl border border-white/10 shadow-2xl overflow-hidden relative z-10"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex items-center space-x-3">
                            <div className="bg-white/20 p-2 rounded-lg">
                                <AlertTriangle className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-white font-bold text-lg">AI Fix Proposal</h2>
                                <p className="text-blue-100 text-xs">Gemini found a solution for the test failure.</p>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs text-slate-400 uppercase font-bold tracking-wider">
                                    <span>DateUtils.kt</span>
                                    <span>Diff Report</span>
                                </div>
                                <div className="bg-black/50 rounded-lg p-4 font-mono text-sm space-y-1 border border-white/5">
                                    <div className="flex space-x-2 opacity-50">
                                        <span className="text-slate-600">14</span>
                                        <span className="text-slate-400">{'    val formatter = DateTimeFormatter.ofPattern('}</span>
                                    </div>
                                    <div className="flex space-x-2 bg-red-500/10 -mx-4 px-4 border-l-2 border-red-500">
                                        <span className="text-slate-600">15</span>
                                        <span className="text-red-400 line-through">{'        "MM/dd/yyyy"'}</span>
                                    </div>
                                    <div className="flex space-x-2 bg-green-500/10 -mx-4 px-4 border-l-2 border-green-500">
                                        <span className="text-slate-600">15</span>
                                        <span className="text-green-400">{'        "MMM dd, yyyy"'}</span>
                                    </div>
                                    <div className="flex space-x-2 opacity-50">
                                        <span className="text-slate-600">16</span>
                                        <span className="text-slate-400">{'    )'}</span>
                                    </div>
                                </div>
                            </div>

                            <p className="text-slate-400 text-sm">
                                The test expected <span className="text-green-400 font-mono">Dec 12, 2024</span> but got <span className="text-red-400 font-mono">12/12/2024</span>.
                                Updating the format pattern resolves this.
                            </p>
                        </div>

                        {/* Footer */}
                        <div className="bg-[#151515] p-4 flex justify-end space-x-3 border-t border-white/5">
                            <button
                                onClick={onReject}
                                className="px-4 py-2 rounded-lg text-slate-400 hover:text-white text-sm font-medium transition-colors"
                            >
                                Dismiss
                            </button>
                            <button
                                onClick={onApprove}
                                className="px-6 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm font-bold shadow-lg shadow-green-900/20 flex items-center space-x-2 transition-all hover:scale-105"
                            >
                                <Check className="w-4 h-4" />
                                <span>Approve Fix</span>
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
