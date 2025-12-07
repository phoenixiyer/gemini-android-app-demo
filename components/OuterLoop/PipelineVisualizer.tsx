'use client'

import { motion } from 'framer-motion'
import { Package, Smartphone, ShieldCheck, CheckCircle2, Rocket, Clock, XCircle, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PipelineVisualizerProps {
    isActive: boolean
    optimizationEnabled: boolean
    failedStep?: string | null // 'unit' | 'lint' etc.
    isHealing?: boolean
}

export default function PipelineVisualizer({ isActive, optimizationEnabled, failedStep = null, isHealing = false }: PipelineVisualizerProps) {
    const steps = [
        { id: 'lint', label: 'Static Analysis', icon: ShieldCheck, color: 'bg-yellow-500' },
        { id: 'unit', label: 'Unit Tests', icon: Package, color: 'bg-blue-500' },
        { id: 'build', label: 'Gradle Build', icon: Smartphone, color: 'bg-purple-500' },
        { id: 'deploy', label: 'Play Store', icon: Rocket, color: 'bg-green-500' },
    ]

    return (
        <div className="w-full h-full flex flex-col items-center justify-center space-y-12">

            {/* Title */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center space-y-2"
            >
                <h2 className="text-3xl font-bold text-white">CI/CD Pipeline</h2>
                <p className="text-slate-400">Automated Delivery via GitHub Actions</p>
            </motion.div>

            {/* Nodes */}
            <div className="flex items-center space-x-4">
                {steps.map((step, index) => {
                    const isFailed = failedStep === step.id
                    const isPastFailed = failedStep && steps.findIndex(s => s.id === failedStep) < index
                    // If we are healing, the failed step pulses yellow. If failed, it is red.
                    const statusColor = isFailed ? (isHealing ? 'shadow-yellow-500/50 border-yellow-500' : 'shadow-red-500/50 border-red-500') : ''

                    return (
                        <div key={step.id} className="flex items-center">
                            {/* Node */}
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0.5 }}
                                animate={isActive && !isPastFailed ? {
                                    scale: isFailed && isHealing ? [1, 1.1, 1] : 1,
                                    opacity: 1,
                                    borderColor: isFailed ? (isHealing ? '#eab308' : '#ef4444') : 'rgba(255,255,255,0.1)',
                                    boxShadow: isFailed ? (isHealing ? '0 0 20px rgba(234,179,8,0.5)' : '0 0 20px rgba(239,68,68,0.5)') : `0 0 20px ${optimizationEnabled && step.id === 'build' ? 'var(--tw-shadow-color)' : 'transparent'}`
                                } : {}}
                                transition={{ delay: index * 0.5, duration: 0.5 }}
                                className={cn(
                                    "w-24 h-24 rounded-2xl flex flex-col items-center justify-center space-y-2 border-2 border-white/10 glass-panel z-10 transition-colors duration-500",
                                    step.color === 'bg-green-500' && isActive && !failedStep && "shadow-green-500/50"
                                )}
                            >
                                {isFailed ? (
                                    isHealing ? <AlertTriangle className="w-8 h-8 text-yellow-500 animate-bounce" /> : <XCircle className="w-8 h-8 text-red-500" />
                                ) : (
                                    <step.icon className="w-8 h-8 text-white" />
                                )}

                                <span className={cn("text-[10px] uppercase font-bold tracking-wider", isFailed ? "text-red-400" : "text-slate-300")}>{step.label}</span>

                                {/* Status Dot */}
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={isActive && !isFailed && !isPastFailed ? { scale: 1 } : {}}
                                    transition={{ delay: (index * 0.5) + 0.4 }}
                                >
                                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                                </motion.div>
                            </motion.div>

                            {/* Connector Line */}
                            {index < steps.length - 1 && (
                                <div className="w-16 h-1 bg-white/10 relative overflow-hidden">
                                    <motion.div
                                        initial={{ x: '-100%' }}
                                        animate={isActive && !isFailed && !isPastFailed ? { x: '100%' } : { x: '-100%' }}
                                        transition={{
                                            repeat: Infinity,
                                            duration: 1,
                                            repeatDelay: 0.5,
                                            delay: index * 0.5
                                        }}
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"
                                    />
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
            {/* Optimization Meter */}
            <motion.div
                className="w-[600px] h-24 glass-panel rounded-xl p-4 flex items-center justify-between"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
            >
                <div className="flex items-center space-x-4">
                    <div className="bg-slate-800 p-2 rounded-lg">
                        <Clock className="w-6 h-6 text-slate-400" />
                    </div>
                    <div>
                        <h4 className="text-white font-medium">Build Duration</h4>
                        <p className="text-xs text-slate-400">Gradle Configuration Cache</p>
                    </div>
                </div>

                <div className="flex-1 mx-8 relative h-4 bg-slate-800 rounded-full overflow-hidden">
                    {/* The Bar */}
                    <motion.div
                        className={cn("absolute left-0 top-0 bottom-0 bg-blue-500 rounded-full", optimizationEnabled ? "bg-green-500" : "bg-red-500")}
                        initial={{ width: "90%" }}
                        animate={{ width: optimizationEnabled ? "25%" : "80%" }}
                        transition={{ duration: 1, type: "spring" }}
                    />
                </div>

                <div className="text-right w-24">
                    <motion.span
                        className={cn("text-2xl font-bold font-mono", optimizationEnabled ? "text-green-400" : "text-red-400")}
                    >
                        {optimizationEnabled ? "1m 32s" : "6m 15s"}
                    </motion.span>
                </div>
            </motion.div>
        </div>
    )
}
