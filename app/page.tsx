'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import StageContainer from '@/components/StageContainer'
import VirtualIDE from '@/components/InnerLoop/VirtualIDE'
import MobileSimulator from '@/components/InnerLoop/MobileSimulator'
import PipelineVisualizer from '@/components/OuterLoop/PipelineVisualizer'
import LogConsole from '@/components/OuterLoop/LogConsole'
import ApprovalModal from '@/components/ApprovalModal'
import GhostOverlay from '@/components/InnerLoop/GhostOverlay'
import ThinkingCanvas from '@/components/InnerLoop/ThinkingCanvas'

// ... existing imports

// ... existing imports
import MetricsDashboard from '@/components/OuterLoop/MetricsDashboard'
import { Sparkles, Zap, ArrowRight, Play, Rocket, CheckCircle2, XCircle, RotateCcw, BarChart3 } from 'lucide-react'
import { cn } from '@/lib/utils'

const CODE_STEP_1 = `
@Composable
fun TripDetailsScreen() {
    Column(modifier = Modifier.fillMaxSize()) {
        // AI Generated Content
        Text(text = "Trip Details", style = MaterialTheme.typography.h1)
        LazyColumn {
           items(trips) { trip ->
               TripItem(trip)
           }
        }
    }
}
`

const CODE_BUGGY = `
// ❌ Runtime Exception: Missing Check
fun getLocation() {
    val location = locationManager.getLastKnownLocation()
    // CRASH: NullPointerException if location is null
    updateMap(location.latitude, location.longitude)
}
`

const CODE_FIXED = `
// ✅ Auto-Healed by Gemini
fun getLocation() {
    val location = locationManager.getLastKnownLocation()
    location?.let {
        updateMap(it.latitude, it.longitude)
    } ?: run {
        showDefaultLocation()
    }
}
`

const CODE_PREMIUM = `
@Composable
fun TripDetailsScreen() {
    // ✨ Gemini Enhancement
    Box {
       ParallaxHeader(image = trip.image)
       Column(
           modifier = Modifier
               .background(Brush.verticalGradient(colors))
               .padding(16.dp)
       ) {
           TripCard(trip, style = PremiumStyle)
       }
    }
}
`

export default function Home() {
  // Stages:
  // 1: Gen, 2: Heal, 3: Refine, 4: Deploy, 5: Fail (Logs), 6: Approvable, 7: Healed, 8: Installed/ShowOff, 9: Metrics
  const [stage, setStage] = useState(1)
  const [mobileState, setMobileState] = useState<'skeleton' | 'basic' | 'premium' | 'error' | 'install'>('skeleton')
  const [ideStatus, setIdeStatus] = useState<'idle' | 'analyzing' | 'fixing'>('idle')
  const [isTyping, setIsTyping] = useState(false)
  const [code, setCode] = useState(CODE_STEP_1)

  // Pipeline / DevOps States
  const [pipelineActive, setPipelineActive] = useState(false)
  const [pipelineFailedStep, setPipelineFailedStep] = useState<string | null>(null)
  const [pipelineHealing, setPipelineHealing] = useState(false)
  const [optimized, setOptimized] = useState(false)
  const [logStatus, setLogStatus] = useState<'idle' | 'running' | 'error' | 'success'>('idle')

  // Modals & Overlays
  const [showApproval, setShowApproval] = useState(false)
  const [thinkingMode, setThinkingMode] = useState<'gen' | 'fix' | 'refine' | 'pipeline' | null>(null)

  // 1. Generate & Crash
  const handleGenerate = () => {
    // 1.5 Thinking Phase
    setThinkingMode('gen')
    setTimeout(() => {
      setThinkingMode(null)
      setIsTyping(true)
      setTimeout(() => {
        setMobileState('basic')
        setIsTyping(false)

        // DRAMA: Crash after 1 second
        setTimeout(() => {
          setMobileState('error')
          setCode(CODE_BUGGY)
          setStage(2)
        }, 1500)
      }, 2000)
    }, 3000) // 3s Thinking
  }

  // 2. Auto-Heal (Inner Loop)
  const handleAutoHeal = () => {
    // 2.5 Thinking Phase
    setThinkingMode('fix')
    setTimeout(() => {
      setThinkingMode(null)

      setIdeStatus('analyzing')
      setTimeout(() => {
        setIdeStatus('fixing')
        setIsTyping(true)
        setCode(CODE_FIXED)

        setTimeout(() => {
          setIdeStatus('idle')
          setIsTyping(false)
          setMobileState('basic') // Fixed!
          setStage(3)
        }, 2000)
      }, 1500)
    }, 3000) // 3s Thinking
  }

  // 3. Make Premium
  const handleEnhance = () => {
    // 3.5 Thinking Phase
    setThinkingMode('refine')
    setTimeout(() => {
      setThinkingMode(null)

      setCode(CODE_PREMIUM)
      setIsTyping(true)
      setTimeout(() => {
        setMobileState('premium')
        setIsTyping(false)
        setStage(4) // Ready to deploy
      }, 2000)
    }, 3000) // 3s Thinking
  }

  // 4. Deploy & Fail
  const handleDeploy = () => {
    setStage(5) // Outer Loop View
    setPipelineActive(true)
    setLogStatus('running')

    // DRAMA: Fail at Step 2 (Unit Tests)
    setTimeout(() => {
      setPipelineFailedStep('unit')
      setLogStatus('error')
      // Prompt for Human Approval
      setTimeout(() => {
        setShowApproval(true)
        setStage(6)
      }, 1500)
    }, 2500)
  }

  // 5. Human Approves Fix
  const handleApproveFix = () => {
    setShowApproval(false)

    // 5.5 Thinking Phase (DevOps)
    // Actually, let's skip visual thinking here to keep pace, or add a small one
    setPipelineHealing(true)

    setTimeout(() => {
      setPipelineHealing(false)
      setPipelineFailedStep(null) // Green again
      setLogStatus('success')

      // Finish the rest
      setTimeout(() => {
        setOptimized(true)
        setStage(7) // Done
      }, 2000)
    }, 1500)
  }

  // 6. Go to App Store
  const handleFinish = () => {
    setStage(8)
    setMobileState('install')
  }

  // 7. Install & Reset Flow
  const handleInstall = () => {
    // After install animation (handled in component), switch to full premium view
    setTimeout(() => {
      setMobileState('premium')
    }, 2500)
  }

  // 8. View Metrics
  const handleViewMetrics = () => {
    setStage(9)
  }

  const handleReset = () => {
    setStage(1)
    setMobileState('skeleton')
    setCode(CODE_STEP_1)
    setPipelineActive(false)
    setPipelineFailedStep(null)
    setOptimized(false)
    setLogStatus('idle')
    setThinkingMode(null)
  }

  return (
    <StageContainer currentStage={stage}>

      <ApprovalModal
        isOpen={showApproval}
        onApprove={handleApproveFix}
        onReject={() => setShowApproval(false)}
      />

      <div className="grid grid-cols-12 gap-8 h-full">

        {/* LEFT PANEL: CONTEXT / IDE */}
        <div className="col-span-12 lg:col-span-7 flex flex-col space-y-4">

          {/* Header Text */}
          <div className="mb-4">
            <motion.div
              key={stage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-4xl font-bold text-white mb-2">
                {stage === 9 ? "Business Impact" :
                  stage === 1 ? "The Inner Loop" :
                    stage === 2 ? <span className="text-red-500">System Failure</span> :
                      stage === 3 ? "Refining UI" :
                        stage === 8 ? "Experience It" :
                          "The Outer Loop"}
              </h1>
              <p className="text-slate-400">
                {stage === 1 && "Rapidly scaffold prototyping with Gemini Code Assist."}
                {stage === 2 && "Runtime exception detected. Analyzing stack trace..."}
                {stage === 3 && "Iterate on design and UX instantly."}
                {stage === 4 && "Ready for production release."}
                {stage === 5 && "Pipeline stalled. Inspecting logs..."}
                {stage === 6 && "AI Proposal: Human review required."}
                {stage === 7 && "Deployment successful. Architecture optimized."}
                {stage === 8 && "Download and test the final build."}
                {stage === 9 && "Quantifying the value of AI Native development."}
              </p>
            </motion.div>
          </div>

          {/* Content Area */}
          <div className="flex-1 min-h-[400px] relative">
            {/* Thinking Overlay & Ghost Contrast */}
            <AnimatePresence>
              {thinkingMode && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-50 rounded-xl overflow-hidden"
                  >
                    <ThinkingCanvas mode={thinkingMode} />
                  </motion.div>

                  {/* Contrast: The Old Way */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="absolute top-4 right-4 z-[60]"
                  >
                    <GhostOverlay mode={thinkingMode} />
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            {stage === 9 ? (
              <MetricsDashboard />
            ) : stage < 5 ? (
              <VirtualIDE
                code={code}
                isTyping={isTyping}
                status={ideStatus}
              />
            ) : (
              <div className="h-full flex flex-col space-y-4">
                <PipelineVisualizer
                  isActive={pipelineActive}
                  optimizationEnabled={optimized}
                  failedStep={pipelineFailedStep}
                  isHealing={pipelineHealing}
                />
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="h-20 flex items-center space-x-4">
            {stage === 1 && mobileState !== 'error' && (
              <button
                onClick={handleGenerate}
                disabled={thinkingMode !== null}
                className={cn("flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(37,99,235,0.5)]", thinkingMode && "opacity-50 cursor-wait")}
              >
                {thinkingMode ? <Sparkles className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                <span>{thinkingMode ? "Thinking..." : "Generate UI"}</span>
              </button>
            )}

            {stage === 2 && (
              <button
                onClick={handleAutoHeal}
                disabled={thinkingMode !== null}
                className={cn("flex items-center space-x-2 bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(220,38,38,0.5)]", thinkingMode && "opacity-50 cursor-wait animate-none")}
              >
                {thinkingMode ? <Zap className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
                <span>{thinkingMode ? "Analyzing..." : "Auto-Fix Crash"}</span>
              </button>
            )}

            {stage === 3 && (
              <button
                onClick={handleEnhance}
                disabled={thinkingMode !== null}
                className={cn("flex items-center space-x-2 bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(147,51,234,0.5)]", thinkingMode && "opacity-50 cursor-wait")}
              >
                {thinkingMode ? <Zap className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
                <span>{thinkingMode ? "Enhancing..." : "Make it Premium"}</span>
              </button>
            )}

            {stage === 4 && (
              <button
                onClick={handleDeploy}
                className="flex items-center space-x-2 bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(22,163,74,0.5)]"
              >
                <Rocket className="w-5 h-5" />
                <span>Deploy to Production</span>
              </button>
            )}

            {stage === 7 && (
              <button
                onClick={handleFinish}
                className="flex items-center space-x-2 bg-white text-black hover:bg-slate-200 px-6 py-3 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              >
                <Rocket className="w-5 h-5" />
                <span>Go to App Store</span>
              </button>
            )}

            {stage === 8 && mobileState === 'premium' && (
              <button
                onClick={handleViewMetrics}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-3 rounded-full font-bold transition-all shadow-lg animate-bounce"
              >
                <BarChart3 className="w-5 h-5" />
                <span>View Analytics</span>
              </button>
            )}

            {stage === 9 && (
              <button
                onClick={handleReset}
                className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-full font-bold transition-all"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Restart Demo</span>
              </button>
            )}
          </div>
        </div>

        {/* RIGHT PANEL: VISUALIZATION */}
        <div className="col-span-12 lg:col-span-5 flex items-center justify-center relative">

          {/* Background Glow */}
          <div className={cn(
            "absolute inset-0 blur-[100px] rounded-full pointer-events-none transition-colors duration-1000",
            stage === 2 ? "bg-red-600/20" : "bg-blue-500/20"
          )} />

          <AnimatePresence mode="wait">
            {/* SHOW PHONE: Stages 1, 2, 3, 4, 7 (Success), 8 (Install) */}
            {(stage < 5 || (stage >= 7 && stage !== 9)) && (
              <motion.div
                key="mobile"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <MobileSimulator state={mobileState} onInstall={handleInstall} />
              </motion.div>
            )}

            {/* SHOW LOGS: Stages 5, 6 (Fail/Approval) */}
            {(stage === 5 || stage === 6) && (
              <motion.div
                key="logs-right"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full h-[500px]"
              >
                <LogConsole status={logStatus} />
              </motion.div>
            )}

            {/* SHOW METRICS HIGHLIGHTS (Mini) or just nothing on right if Metrics is on left?
                    Wait, I put MetricsDashboard on the LEFT panel (replacing IDE).
                    So what goes on RIGHT panel in Stage 9?
                    Maybe a giant Trophy or just keep the Phone?
                    Let's keep the Phone on the right to show the "Result" while metrics show the "Data".
                */}
            {stage === 9 && (
              <motion.div
                key="mobile-final"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <MobileSimulator state='premium' />
              </motion.div>
            )}

          </AnimatePresence>

        </div>

      </div>
    </StageContainer>
  )
}
