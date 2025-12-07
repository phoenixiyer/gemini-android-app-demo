'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Terminal, AlertCircle, CheckCircle } from 'lucide-react'

interface LogConsoleProps {
    status: 'idle' | 'running' | 'error' | 'success'
}

const LOGS_START = [
    "[Info] Initializing Gradle Daemon...",
    "[Info] > Task :app:preBuild UP-TO-DATE",
    "[Info] > Task :app:preDebugBuild UP-TO-DATE",
    "[Info] > Task :app:compileDebugAidl NO-SOURCE",
    "[Info] > Task :app:compileDebugRenderscript NO-SOURCE",
    "[Info] > Task :app:generateDebugBuildConfig UP-TO-DATE",
    "[Info] > Task :app:javaPreCompileDebug UP-TO-DATE",
    "[Info] > Task :app:generateDebugResValues UP-TO-DATE",
    "[Info] > Task :app:generateDebugResources UP-TO-DATE",
    "[Info] > Task :app:mergeDebugResources UP-TO-DATE",
    "[Info] > Task :app:createDebugCompatibleScreenManifests UP-TO-DATE",
    "[Info] > Task :app:extractDeepLinksDebug UP-TO-DATE",
    "[Info] > Task :app:processDebugMainManifest UP-TO-DATE",
    "[Info] > Task :app:processDebugManifest UP-TO-DATE",
    "[Info] > Task :app:processDebugManifestForPackage UP-TO-DATE",
    "[Info] > Task :app:processDebugResources",
    "[Info] > Task :app:kaptGenerateStubsDebugKotlin",
    "[Info] > Task :app:kaptDebugKotlin",
    "[Info] > Task :app:compileDebugKotlin",
    "[Info] > Task :app:compileDebugJavaWithJavac",
    "[Info] > Task :app:bundleDebugClasses",
    "[Info] > Task :app:processDebugJavaRes NO-SOURCE",
    "[Info] > Task :app:mergeDebugJavaResource",
    "[Info] > Task :app:checkDebugDuplicateClasses",
    "[Info] > Task :app:desugarDebugFileDependencies",
    "[Info] > Task :app:mergeExtDexDebug",
    "[Info] > Task :app:mergeLibDexDebug",
    "[Info] > Task :app:dexBuilderDebug",
    "[Info] > Task :app:mergeProjectDexDebug",
    "[Info] > Task :app:mergeDebugJniLibFolders",
    "[Info] > Task :app:mergeDebugNativeLibs",
    "[Info] > Task :app:stripDebugDebugSymbols",
    "[Info] > Task :app:validateSigningDebug",
    "[Info] > Task :app:packageDebug",
    "[Info] > Task :app:assembleDebug",
    "[Info] Running Unit Tests...",
]

const LOGS_ERROR = [
    "[Error] > Task :app:testDebugUnitTest FAILED",
    "[Error] FAILURE: Build failed with an exception.",
    "[Error] * What went wrong:",
    "[Error] Execution failed for task ':app:testDebugUnitTest'.",
    "[Error] > There were failing tests. See the report at: file:///app/build/reports/tests/testDebugUnitTest/index.html",
    "[Error] ",
    "[Error] com.example.trip.DateUtilsTeat > testDateFormat FAILED",
    "[Error]     java.lang.AssertionError: expected:<Dec 12, 2024> but was:<12/12/2024>",
    "[Error]         at org.junit.Assert.fail(Assert.java:88)",
    "[Error]         at org.junit.Assert.failNotEquals(Assert.java:834)",
    "[Error]         at org.junit.Assert.assertEquals(Assert.java:118)",
    "[Error]         at org.junit.Assert.assertEquals(Assert.java:144)",
    "[Error]         at com.example.trip.DateUtilsTest.testDateFormat(DateUtilsTest.kt:15)",
    "[Error] ",
    "[Error] BUILD FAILED in 2s",
]

const LOGS_SUCCESS = [
    "[Info] Applying Fix...",
    "[Info] Re-running tests...",
    "[Info] > Task :app:testDebugUnitTest",
    "[Info] com.example.trip.DateUtilsTest > testDateFormat PASSED",
    "[Info] com.example.trip.DateUtilsTest > testDuration PASSED",
    "[Info] ",
    "[Info] BUILD SUCCESSFUL in 1s",
    "[Info] 25 actionable tasks: 2 executed, 23 up-to-date",
]

export default function LogConsole({ status }: LogConsoleProps) {
    const [lines, setLines] = useState<string[]>([])
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        let currentLogs: string[] = []
        let interval: NodeJS.Timeout

        if (status === 'running') {
            setLines([])
            let index = 0
            interval = setInterval(() => {
                if (index < LOGS_START.length) {
                    setLines(prev => [...prev, LOGS_START[index]])
                    index++
                } else {
                    clearInterval(interval)
                }
            }, 100)
        } else if (status === 'error') {
            setLines(prev => [...prev, ...LOGS_ERROR])
        } else if (status === 'success') {
            // Keep error logs for context, append success
            // Actually, usually in CI it might clear or just append. Let's append but maybe after a pause in real life. 
            // Here we'll just add them.
            setLines(prev => [...prev, ...LOGS_SUCCESS])
        }

        return () => clearInterval(interval)
    }, [status])

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [lines])

    return (
        <div className="w-full h-full bg-[#1e1e1e] rounded-xl overflow-hidden font-mono text-xs border border-white/10 flex flex-col shadow-2xl">
            {/* Terminal Header */}
            <div className="bg-[#2d2d2d] px-4 py-2 flex items-center justify-between border-b border-white/5">
                <div className="flex items-center space-x-2">
                    <Terminal className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-300">Gradle Build Output</span>
                </div>
                {status === 'running' && <span className="text-blue-400 animate-pulse">● Running...</span>}
                {status === 'error' && <span className="text-red-500 font-bold flex items-center"><AlertCircle className="w-3 h-3 mr-1" /> FAILED</span>}
                {status === 'success' && <span className="text-green-500 font-bold flex items-center"><CheckCircle className="w-3 h-3 mr-1" /> SUCCESS</span>}
            </div>

            {/* Logs Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-1 text-slate-300">
                {lines.map((line, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`${line.includes('[Error]') ? 'text-red-400' : line.includes('SUCCESSFUL') ? 'text-green-400 font-bold' : ''}`}
                    >
                        {line}
                    </motion.div>
                ))}
                {status === 'running' && (
                    <motion.div
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        className="w-2 h-4 bg-slate-500"
                    />
                )}
            </div>
        </div>
    )
}
