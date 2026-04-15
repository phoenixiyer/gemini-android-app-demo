'use client'

import { motion } from 'framer-motion'
import { FileText, ShieldCheck, CheckCircle, Layers } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AssetDisplayProps {
    stage: 'idea' | 'brd' | 'prd'
}

export default function AssetDisplay({ stage }: AssetDisplayProps) {
    const brdContent = {
        title: "BRD: AI-Powered Trip Planner",
        sections: [
            "Target Audience: Frequent travelers and premium tier users.",
            "Business Value: Increase retention by 15% through adaptive scheduling.",
            "Core Metrics: Reduction in missed tours, user engagement per trip increase."
        ]
    }

    const prdContent = {
        title: "PRD: AI-Powered Trip Planner",
        sections: [
            "Functional Specs: Real-time flight status observer, dynamic rescheduling UX.",
            "API dependencies: aviation-edge-flights, google-genai-sdk.",
            "Security constraints: Strict end-to-end encryption on location storage."
        ]
    }

    return (
        <div className="w-full h-[500px] bg-black/60 border border-white/10 rounded-xl p-6 backdrop-blur-xl flex flex-col text-slate-300">
            <div className="flex items-center space-x-3 mb-6">
                <Layers className="w-6 h-6 text-cyan-400" />
                <h2 className="text-2xl font-bold text-white">Gemini Knowledge Workspace</h2>
            </div>

            {stage === 'idea' && (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                    <div className="p-4 rounded-full bg-white/5 mb-4 text-cyan-500 animate-pulse">
                        <FileText className="w-12 h-12" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Gathering Requirements</h3>
                    <p className="text-sm text-slate-400">Gemini analyst is listening to prompts & client briefs to formulate context.</p>
                </div>
            )}

            {(stage === 'brd' || stage === 'prd') && (
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex-1 flex flex-col justify-between"
                >
                    <div>
                        <h3 className="text-cyan-400 font-mono uppercase text-sm tracking-wider mb-2">
                            {stage === 'brd' ? "Business Blueprint" : "Technical Specification"}
                        </h3>
                        <h4 className="text-xl font-bold text-white mb-4">
                            {stage === 'brd' ? brdContent.title : prdContent.title}
                        </h4>

                        <ul className="space-y-3 text-sm">
                            {(stage === 'brd' ? brdContent.sections : prdContent.sections).map((item, i) => (
                                <li key={i} className="flex items-start space-x-2">
                                    <CheckCircle className="w-5 h-5 text-cyan-500/80 shrink-0 mt-0.5" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="border-t border-white/10 pt-4 flex items-center justify-between text-xs text-slate-500">
                        <div className="flex items-center space-x-2">
                            <ShieldCheck className="w-4 h-4 text-green-400" />
                            <span className="text-green-400/80 font-mono uppercase">Validated by Gemini-2.5-Pro</span>
                        </div>
                        <span>Last updated: Just now</span>
                    </div>
                </motion.div>
            )}
        </div>
    )
}
