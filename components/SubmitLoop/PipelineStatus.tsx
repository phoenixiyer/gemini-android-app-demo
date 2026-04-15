'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, XCircle, AlertCircle, Loader2, GitPullRequest, ShieldCheck, Terminal } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PipelineStatusProps {
    status: 'idle' | 'running' | 'failed' | 'success'
    failedStep: string | null
    onApprove: () => void
    isHealing: boolean
}

export default function PipelineStatus({ status, failedStep, onApprove, isHealing }: PipelineStatusProps) {
    const steps = [
        { id: 'lint', label: 'Lint & Format checks', icon: <Terminal className="w-4 h-4" /> },
        { id: 'auto-qa', label: 'AI-Generated QA Suite', icon: <ShieldCheck className="w-4 h-4" /> },
        { id: 'unit', label: 'Integration & Unit tests', icon: <GitPullRequest className="w-4 h-4" /> },
    ]

    return (
        <div className="w-full max-w-md mx-auto bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
                <span className="font-mono text-sm font-bold text-slate-300">SUBMIT LOOP // CI Pipeline</span>
                {status === 'running' && <Loader2 className="w-4 h-4 animate-spin text-blue-400" />}
            </div>

            <div className="p-6 space-y-6">
                {steps.map((step, index) => {
                    // Logic to determine state of each step
                    let stepStatus: 'pending' | 'running' | 'success' | 'failed' = 'pending'

                    if (status === 'idle') stepStatus = 'pending'
                    else if (status === 'success') stepStatus = 'success'
                    else if (status === 'failed') {
                        if (failedStep === step.id) stepStatus = 'failed'
                        else if (steps.findIndex(s => s.id === failedStep) > index) stepStatus = 'success'
                        else stepStatus = 'pending'
                    } else if (status === 'running') {
                        // Simple simulation logic: if running, assume earlier steps done
                        stepStatus = 'success'
                        // But we want to simulate progression? 
                        // For this props-driven component, we'll let parent control, 
                        // but for "running" usually implies generally active.
                        // Let's rely on failedStep to denote where we stopped.
                        if (!failedStep) stepStatus = 'running' // All running?
                    }

                    // Override for specific demo state:
                    // If failedStep is set, everything before it is success.
                    if (failedStep) {
                        const failedIndex = steps.findIndex(s => s.id === failedStep)
                        if (index < failedIndex) stepStatus = 'success'
                        if (index === failedIndex) stepStatus = 'failed'
                        if (index > failedIndex) stepStatus = 'pending'
                    } else if (status === 'success') {
                        stepStatus = 'success'
                    } else if (status === 'running') {
                        // If running and no fail, assume all green for now or animating
                        stepStatus = 'success'
                    }

                    return (
                        <div key={step.id} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center border transition-all",
                                    stepStatus === 'success' ? "bg-green-500/20 border-green-500 text-green-500" :
                                        stepStatus === 'failed' ? "bg-red-500/20 border-red-500 text-red-500" :
                                            "bg-white/5 border-white/10 text-slate-500"
                                )}>
                                    {stepStatus === 'success' ? <CheckCircle2 className="w-4 h-4" /> :
                                        stepStatus === 'failed' ? <XCircle className="w-4 h-4" /> :
                                            step.icon}
                                </div>
                                <span className={cn(
                                    "text-sm font-medium",
                                    stepStatus === 'success' ? "text-green-400" :
                                        stepStatus === 'failed' ? "text-red-400" :
                                            "text-slate-400"
                                )}>{step.label}</span>
                            </div>

                            {/* Failure Action: Review Button */}
                            {stepStatus === 'failed' && (
                                <motion.div
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                >
                                    {isHealing ? (
                                        <span className="text-xs text-blue-400 animate-pulse flex items-center gap-1">
                                            <Loader2 className="w-3 h-3 animate-spin" /> Mending
                                        </span>
                                    ) : (
                                        <button
                                            onClick={onApprove}
                                            className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white text-xs rounded-full font-bold shadow-lg shadow-blue-900/50"
                                        >
                                            Review Fix
                                        </button>
                                    )}
                                </motion.div>
                            )}
                        </div>
                    )
                })}
            </div>

            {/* Terminal Output Area for "Realness" */}
            <div className="bg-black p-4 font-mono text-[10px] text-slate-500 h-24 overflow-hidden border-t border-white/10">
                <div className="opacity-50">
                    {status === 'running' && "> Running tests...\n> :app:lintChecks\n> Gemini-2.5-Pro generating dynamic contract tests..."}
                    {failedStep === 'auto-qa' && "> Task :app:auto-qa FAILED\n> java.lang.AssertionError: Edge case context retrieval failure"}
                    {status === 'success' && "> BUILD SUCCESSFUL in 1.2s\n> AI generated 34 safety assertions passed."}
                </div>
            </div>
        </div>
    )
}
