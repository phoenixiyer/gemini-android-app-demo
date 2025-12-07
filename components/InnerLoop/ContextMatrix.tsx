'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FileCode, Database, Layout, Shield } from 'lucide-react'

// Dummy file paths for the "Codebase Scan" effect
const FILES = [
    '/app/auth/UserSession.kt',
    '/app/data/TripRepository.kt',
    '/app/ui/theme/Color.kt',
    '/app/ui/components/TripCard.kt',
    '/gradle/libs.versions.toml',
    '/app/manifest.xml',
    '/res/drawable/ic_launcher.xml',
    '/app/domain/usecase/GetTrip.kt',
    '/app/di/AppModule.kt',
    '/app/api/GeminiService.kt',
    '/app/utils/DateFormatter.kt',
    '/test/unit/TripViewModelTest.kt',
    '/docs/architecture/PRD.md',
    '/app/ui/screens/HomeScreen.kt',
    '/app/model/TripData.kt'
]

export default function ContextMatrix() {
    const [scannedFiles, setScannedFiles] = useState<string[]>([])

    // Rapidly add files to the list
    useEffect(() => {
        let i = 0
        const interval = setInterval(() => {
            setScannedFiles(prev => [FILES[i % FILES.length], ...prev].slice(0, 10))
            i++
        }, 150) // Speed of scan

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="absolute inset-0 bg-black/90 z-50 flex flex-col items-center justify-center overflow-hidden font-mono">
            {/* Central Hub */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_100%)] z-10" />

            <div className="z-20 flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center animate-pulse border border-green-500/50 shadow-[0_0_50px_rgba(34,197,94,0.3)]">
                    <Database className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-green-400 tracking-widest uppercase">
                    1M Context Scan
                </h3>
            </div>

            {/* Waterfall Code Rain */}
            <div className="absolute inset-0 opacity-30 pointer-events-none">
                {scannedFiles.map((file, idx) => (
                    <motion.div
                        key={`${file}-${idx}`}
                        initial={{ opacity: 0, y: -20, x: (Math.random() - 0.5) * 600 }}
                        animate={{ opacity: [0, 1, 0], y: 100 }}
                        transition={{ duration: 0.8 }}
                        className="absolute top-1/2 left-1/2 text-xs text-green-500/70 whitespace-nowrap"
                    >
                        <div className="flex items-center space-x-2">
                            <FileCode className="w-3 h-3" />
                            <span>Reading {file}...</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Grid overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
        </div>
    )
}
