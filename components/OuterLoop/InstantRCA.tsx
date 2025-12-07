'use client'

import { motion } from 'framer-motion'
import { FileText, Bug, CheckCircle2 } from 'lucide-react'

export default function InstantRCA() {
    return (
        <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="w-full max-w-2xl bg-white text-zinc-900 rounded-xl shadow-2xl overflow-hidden font-mono text-sm"
        >
            {/* Header */}
            <div className="bg-zinc-100 p-4 border-b border-zinc-200 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <span className="font-bold uppercase tracking-wider">Automated RCA Report</span>
                </div>
                <div className="text-xs text-zinc-500">Generated in 40ms</div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
                <div className="flex space-x-4">
                    <div className="w-24 font-bold text-zinc-500 uppercase text-xs">Incident ID</div>
                    <div>INC-2024-884</div>
                </div>
                <div className="flex space-x-4">
                    <div className="w-24 font-bold text-zinc-500 uppercase text-xs">Trigger</div>
                    <div className="text-red-600 font-bold">Battery Drain Spike (&gt;15%)</div>
                </div>

                <div className="p-4 bg-zinc-50 rounded-lg border border-zinc-200">
                    <div className="font-bold text-zinc-700 mb-2 flex items-center">
                        <Bug className="w-4 h-4 mr-2" />
                        Root Cause Analysis
                    </div>
                    <p className="text-zinc-600 leading-relaxed">
                        Infinite loop detected in <code className="bg-zinc-200 px-1 rounded">BackgroundSyncWorker.kt</code>.
                        The <code className="bg-zinc-200 px-1 rounded">while(true)</code> loop in <code className="bg-zinc-200 px-1 rounded">syncData()</code>
                        lacks a termination condition when network is unstable.
                    </p>
                </div>

                <div className="flex space-x-4 items-center">
                    <div className="w-24 font-bold text-zinc-500 uppercase text-xs">Action Taken</div>
                    <div className="flex items-center text-green-600 font-bold">
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Rollback to v1.9 successful. Users protected.
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
