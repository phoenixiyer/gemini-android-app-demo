import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { CheckCircle2, Circle, ChevronRight } from 'lucide-react'

interface LoopNavigatorProps {
    currentLoop: 'design' | 'inner' | 'submit' | 'outer'
}

export default function LoopNavigator({ currentLoop }: LoopNavigatorProps) {
    const loops = [
        { id: 'design', label: 'Design Loop', steps: ['Idea', 'BRD', 'PRD'] },
        { id: 'inner', label: 'Inner Loop', steps: ['Code', 'Test', 'Fix'] },
        { id: 'submit', label: 'Submit Loop', steps: ['Lint', 'PreSubmit', 'Review'] },
        { id: 'outer', label: 'Outer Loop', steps: ['Staging', 'Canary', 'Prod'] },
    ]

    const getLoopIndex = (id: string) => loops.findIndex(l => l.id === id)
    const currentIndex = getLoopIndex(currentLoop)

    return (
        <div className="w-full flex items-center justify-center py-6 relative z-50">
            <div className="bg-black/40 backdrop-blur-md rounded-full border border-white/10 p-2 flex items-center space-x-2 shadow-2xl">
                {loops.map((loop, index) => {
                    const isActive = index === currentIndex
                    const isPassed = index < currentIndex

                    return (
                        <div key={loop.id} className="flex items-center">
                            <motion.div
                                className={cn(
                                    "flex items-center space-x-3 px-4 py-2 rounded-full transition-all duration-500",
                                    isActive ? "bg-white/10 border border-white/20" : "opacity-50"
                                )}
                            >
                                <div className={cn(
                                    "w-3 h-3 rounded-full",
                                    isActive ? "bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.8)] animate-pulse" :
                                        isPassed ? "bg-green-500" : "bg-slate-700"
                                )} />
                                <div className="flex flex-col">
                                    <span className={cn(
                                        "text-sm font-bold tracking-tight",
                                        isActive ? "text-white" : "text-slate-400"
                                    )}>
                                        {loop.label}
                                    </span>
                                    {isActive && (
                                        <motion.span
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            className="text-[10px] text-blue-300 font-mono uppercase"
                                        >
                                            {loop.steps.join(' → ')}
                                        </motion.span>
                                    )}
                                </div>
                            </motion.div>

                            {index < loops.length - 1 && (
                                <ChevronRight className="w-4 h-4 text-slate-700 mx-1" />
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
