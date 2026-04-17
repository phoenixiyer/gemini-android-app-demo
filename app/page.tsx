'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import StageContainer from '@/components/StageContainer'
import LoopNavigator from '@/components/LoopNavigator'

// Loops
import DesignAnalysis from '@/components/DesignLoop/DesignAnalysis'
import PipelineStatus from '@/components/SubmitLoop/PipelineStatus'
import ShiftLeftDashboard from '@/components/SubmitLoop/ShiftLeftDashboard'
import AssetDisplay from '@/components/IdeationLoop/AssetDisplay'
import SREAgent from '@/components/OuterLoop/SREAgent'
import IdeationStage from '@/components/IdeationLoop/IdeationStage'

// Inner Loop
import VirtualIDE from '@/components/InnerLoop/VirtualIDE'
import MobileSimulator from '@/components/InnerLoop/MobileSimulator'
import ApprovalModal from '@/components/ApprovalModal'
import GhostOverlay from '@/components/InnerLoop/GhostOverlay'
import ContextMatrix from '@/components/InnerLoop/ContextMatrix'
import AgentSwarm from '@/components/InnerLoop/AgentSwarm'
import ReasoningTree from '@/components/InnerLoop/ReasoningTree'
import MultimodalInput from '@/components/InnerLoop/MultimodalInput'

// Outer Loop
import ReleaseMonitor from '@/components/OuterLoop/ReleaseMonitor'
import AISentinel from '@/components/OuterLoop/AISentinel'
import InstantRCA from '@/components/OuterLoop/InstantRCA'
import MetricsDashboard from '@/components/OuterLoop/MetricsDashboard'
import ChaosMode from '@/components/OuterLoop/ChaosMode'

import { Sparkles, Zap, Rocket, RotateCcw, BarChart3, Skull, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSoundEffects } from '@/hooks/useSoundEffects'

// --- CONSTANTS (CODE SNIPPETS) ---
const CODE_STEP_1 = `
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun TripDetailsScreen(
    state: TripState,
    onBack: () -> Unit
) {
    Scaffold(
        topBar = { TopAppBar(title = { Text("Trip Details") }) }
    ) { padding ->
        LazyColumn(
            modifier = Modifier.padding(padding).fillMaxSize(),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            items(state.trips) { trip ->
                TripCard(trip = trip)
            }
        }
    }
}
`

const CODE_BUGGY = `
// ❌ CRITICAL: Unsafe Location Access on Main Thread
class LocationManager {
    fun getCurrentLocation(): GeoPoint {
        // ERROR: Blocking I/O on UI Thread + Missing Permission Check
        val loc = systemService.getLastKnownLocation(GPS_PROVIDER)!!
        
        // Potential NullPointerException if GPS is off
        return GeoPoint(loc.latitude, loc.longitude)
    }
}
`

const CODE_FIXED = `
// ✅ FIXED: Safe, Coroutine-based Location Provider
class LocationManager @Inject constructor(
    private val context: Context
) {
    suspend fun getCurrentLocation(): Result<GeoPoint> = withContext(Dispatchers.IO) {
        if (!hasPermission(ACCESS_FINE_LOCATION)) {
            return@withContext Result.failure(PermissionException())
        }
        
        try {
            val loc = systemService.getLastKnownLocation(GPS_PROVIDER)
            loc?.let {
                Result.success(GeoPoint(it.latitude, it.longitude))
            } ?: Result.failure(LocationUnavailableException())
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
}
`

const CODE_PREMIUM = `
@Composable
fun PremiumTripCard(trip: Trip) {
    // ✨ Gemini Enhancement: Glassmorphism & Parallax
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .height(280.dp)
            .clip(RoundedCornerShape(24.dp))
            .background(Brush.verticalGradient(listOf(Color.Transparent, Color.Black.copy(alpha = 0.8f))))
    ) {
        ParallaxImage(
            url = trip.imageUrl,
            speed = 1.2f, // AI-tuned scroll speed
            modifier = Modifier.matchParentSize()
        )
        
        // Glass Overlay
        Column(
            modifier = Modifier
                .align(Alignment.BottomStart)
                .background(MaterialTheme.colorScheme.surface.copy(alpha = 0.3f))
                .blur(radius = 16.dp)
                .padding(24.dp)
        ) {
            Text(trip.title, style = MaterialTheme.typography.displaySmall, color = Color.White)
            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(Icons.Default.Star, "Rating", tint = Color.Yellow)
                Text("\${trip.rating} • \${trip.reviews} reviews", color = Color.White.copy(0.8f))
            }
        }
    }
}
`

export default function Home() {
  // Loop State
  const [currentLoop, setCurrentLoop] = useState<'design' | 'inner' | 'submit' | 'outer'>('design')
  const [assetStage, setAssetStage] = useState<'idea' | 'brd' | 'prd'>('idea')

  // Inner Loop Stages: 1=Gen, 2=Crash, 3=Healed, 4=Premium
  // Outer Loop Stages: 8=Canary, 9=Metrics
  const [stage, setStage] = useState(0) // 0 used for Design Loop idle

  const [mobileState, setMobileState] = useState<'skeleton' | 'basic' | 'premium' | 'error' | 'install'>('skeleton')
  const [ideStatus, setIdeStatus] = useState<'idle' | 'analyzing' | 'fixing'>('idle')
  const [isTyping, setIsTyping] = useState(false)
  const [code, setCode] = useState(CODE_STEP_1)

  // Submit Loop State
  const [pipelineStatus, setPipelineStatus] = useState<'idle' | 'running' | 'failed' | 'success'>('idle')
  const [pipelineFailedStep, setPipelineFailedStep] = useState<string | null>(null)
  const [isHealingPipeline, setIsHealingPipeline] = useState(false)

  // Outer Loop State
  const [releaseStatus, setReleaseStatus] = useState<'idle' | 'monitor' | 'anomaly' | 'rollback' | 'rca'>('idle')
  const [canaryTraffic, setCanaryTraffic] = useState(0)
  const [chaosStats, setChaosStats] = useState<{ bugsFixed: number; timeSaved: string } | null>(null)

  // UX State
  const [showApproval, setShowApproval] = useState(false)
  const [thinkingMode, setThinkingMode] = useState<'gen' | 'fix' | 'refine' | null>(null)
  const { playSuccess, playAlarm } = useSoundEffects()

  // --- TRANSITIONS ---

  const [designComplete, setDesignComplete] = useState(false)

  // 1. DESIGN LOOP COMPLETE -> INNER LOOP
  const handleDesignComplete = () => {
    setDesignComplete(true)
  }

  // 2. GENERATE (INNER)
  const handleGenerate = () => {
    setStage(1)
    setThinkingMode('gen')
    setTimeout(() => {
      setThinkingMode(null)
      setIsTyping(true)
      setTimeout(() => {
        setMobileState('basic')
        setIsTyping(false)

        // AUTO CRASH
        setTimeout(() => {
          setMobileState('error')
          setCode(CODE_BUGGY)
          setStage(2)
        }, 3000)
      }, 2000)
    }, 2000)
  }

  // 3. AUTO-HEAL (INNER)
  const handleAutoHeal = () => {
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
          setMobileState('basic')
          setStage(3)
        }, 2000)
      }, 1500)
    }, 2500)
  }

  // 4. ENHANCE (INNER)
  const handleEnhance = () => {
    setThinkingMode('refine')
    setTimeout(() => {
      setThinkingMode(null)
      setCode(CODE_PREMIUM)
      setIsTyping(true)
      setTimeout(() => {
        setMobileState('premium')
        setIsTyping(false)
        setStage(4) // Ready for PR
      }, 2000)
    }, 2500)
  }

  // 5. SUBMIT LOOP (PR/CI)
  const handleSubmit = () => {
    setCurrentLoop('submit')
    setPipelineStatus('running')

    // Simulate Fail at PreSubmit
    setTimeout(() => {
      setPipelineFailedStep('auto-qa')
      setPipelineStatus('failed')
    }, 3000)
  }

  // 6. FIX PIPELINE
  const handleReviewFix = () => {
    setShowApproval(false) // Close modal
    setIsHealingPipeline(true)
    setTimeout(() => {
      setIsHealingPipeline(false)
      setPipelineFailedStep(null)
      setPipelineStatus('success')
      playSuccess()

      // Auto transition to Outer after success?
      // Let's force user to click "Deploy" or auto-transition
      setTimeout(() => {
        setCurrentLoop('outer')
        handleStartCanary()
      }, 2000)
    }, 2000)
  }

  // 7. OUTER LOOP (CANARY)
  const handleStartCanary = () => {
    setStage(8)
    setReleaseStatus('monitor')
    setCanaryTraffic(0)

    let t = 0
    const interval = setInterval(() => {
      t += 5
      setCanaryTraffic(prev => {
        if (prev < 20) return prev + 1
        if (prev === 20 && releaseStatus === 'monitor') {
          setReleaseStatus('anomaly')
          playAlarm()
        }
        return prev
      })

      if (t >= 25) {
        clearInterval(interval)
        setReleaseStatus(prev => prev === 'monitor' ? 'anomaly' : prev)

        setTimeout(() => {
          setReleaseStatus('rollback')
          setCanaryTraffic(0)
          setTimeout(() => {
            setReleaseStatus('rca')
          }, 3000)
        }, 2500)
      }
    }, 400)
  }

  const handleReset = () => {
    setCurrentLoop('design')
    setStage(0)
    setMobileState('skeleton')
    setCode(CODE_STEP_1)
    setPipelineStatus('idle')
    setPipelineFailedStep(null)
    setReleaseStatus('idle')
    setThinkingMode(null)
  }

  return (
    <StageContainer currentStage={stage}>
      <ApprovalModal
        isOpen={showApproval}
        onApprove={handleReviewFix}
        onReject={() => setShowApproval(false)}
      />

      {/* TOP NAVIGATOR */}
      <div className="absolute top-0 left-0 w-full z-50">
        <LoopNavigator currentLoop={currentLoop} />
      </div>

      <div className="grid grid-cols-12 gap-8 h-full pt-16">

        {/* LEFT PANEL */}
        <div className="col-span-12 lg:col-span-7 flex flex-col h-full max-h-[80vh]">

          {/* Header */}
          <div className="mb-4">
            <motion.div
              key={currentLoop + stage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-4xl font-bold text-white mb-2">
                {currentLoop === 'design' && "The Design Loop"}
                {currentLoop === 'inner' && stage === 2 ? <span className="text-red-500">System Failure</span> :
                  currentLoop === 'inner' && stage === 3 ? "Refining Code" :
                    currentLoop === 'inner' && stage === 4 ? "Ready to Ship" :
                      currentLoop === 'inner' ? "The Inner Loop" : ""}
                {currentLoop === 'submit' && "The Submit Loop"}
                {currentLoop === 'outer' && stage === 9 ? "Business Impact" :
                  currentLoop === 'outer' ? "The Outer Loop" : ""}
              </h1>
              <p className="text-slate-400">
                {currentLoop === 'design' && "Analyze requirements and plan the architecture."}
                {currentLoop === 'inner' && stage === 2 && "Runtime crash detected. Diagnosing with Gemini..."}
                {currentLoop === 'inner' && stage === 4 && "Features implemented. Requesting Code Review."}
                {currentLoop === 'submit' && "Running CI/CD pipeline and PreSubmit checks."}
                {currentLoop === 'outer' && stage === 8 && "Monitoring canary deployment in production."}
                {currentLoop === 'outer' && stage === 9 && "Quantifying the value of AI Native development."}
              </p>
            </motion.div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 relative overflow-hidden rounded-xl bg-white/5 border border-white/10 p-4">

            {/* DESIGN LOOP VIEW */}
            {currentLoop === 'design' && (
              <DesignAnalysis 
                onComplete={handleDesignComplete} 
                onStepChange={setAssetStage} 
              />
            )}

            {/* INNER LOOP VIEW */}
            {currentLoop === 'inner' && (
              <>
                {/* Thinking Overlay */}
                <AnimatePresence>
                  {thinkingMode && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-50 bg-black/80 flex items-center justify-center backdrop-blur-sm"
                    >
                      {thinkingMode === 'gen' && <ContextMatrix />}
                      {thinkingMode === 'fix' && <AgentSwarm />}
                      {thinkingMode === 'refine' && <ReasoningTree />}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Editor */}
                <VirtualIDE code={code} isTyping={isTyping} status={ideStatus} />
              </>
            )}

            {/* SUBMIT LOOP VIEW */}
            {currentLoop === 'submit' && (
              <div className="h-full flex items-center justify-center">
                <ShiftLeftDashboard onComplete={() => {
                  setTimeout(() => {
                    setCurrentLoop('outer')
                    handleStartCanary()
                  }, 1000)
                }} />
              </div>
            )}

            {/* OUTER LOOP VIEW */}
            {currentLoop === 'outer' && (
              <div className="h-full flex items-center justify-center relative">
                {stage === 9 ? (
                  <MetricsDashboard />
                ) : (
                  <SREAgent onReset={handleReset} />
                )}
              </div>
            )}
          </div>

          {/* CONTROLS */}
          <div className="h-20 shrink-0 flex items-center justify-between mt-4">
            <button onClick={handleReset} className="p-3 rounded-full hover:bg-white/10 text-slate-400">
              <RotateCcw className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-4">
              {currentLoop === 'design' && designComplete && (
                <button onClick={() => {
                  setDesignComplete(false)
                  setCurrentLoop('inner')
                  handleGenerate()
                }} className="flex items-center space-x-2 bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-3 rounded-full font-bold animate-pulse">
                  <ArrowRight className="w-5 h-5" /> <span>Proceed to Inner Loop</span>
                </button>
              )}
              {currentLoop === 'inner' && stage === 2 && (
                <button onClick={handleAutoHeal} className="flex items-center space-x-2 bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-full font-bold">
                  <Zap className="w-5 h-5" /> <span>Fix Crash</span>
                </button>
              )}
              {currentLoop === 'inner' && stage === 3 && (
                <button onClick={handleEnhance} className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-full font-bold">
                  <Sparkles className="w-5 h-5" /> <span>Make Premium</span>
                </button>
              )}
              {currentLoop === 'inner' && stage === 4 && (
                <button onClick={handleSubmit} className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-full font-bold">
                  <Rocket className="w-5 h-5" /> <span>Submit PR</span>
                </button>
              )}
              {currentLoop === 'outer' && (
                <button onClick={() => setStage(9)} className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-3 rounded-full font-bold animate-bounce">
                  <BarChart3 className="w-5 h-5" /> <span>View ROI</span>
                </button>
              )}
              {currentLoop === 'outer' && stage === 9 && (
                <button onClick={() => setStage(11)} className="flex items-center space-x-2 bg-red-900/50 hover:bg-red-900 text-red-200 px-6 py-3 rounded-full font-bold border border-red-500/50 animate-pulse">
                  <Skull className="w-5 h-5" /> <span>Activate Chaos</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL (MOBILE / LOGS) */}
        <div className="col-span-12 lg:col-span-5 flex items-center justify-center relative">
          {/* Visual Consistency: Always show Phone except when relevant not to? */}
          {/* In Design Loop: Show nothing or sketch? */}
          {/* In Submit/Outer Loop: Keep phone visible as "Preview"? */}

          <AnimatePresence mode="wait">
            <motion.div
              key={currentLoop === 'design' ? 'assets' : 'mobile'}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 50, opacity: 0 }}
            >
              {currentLoop === 'design' ? (
                <AssetDisplay stage={assetStage} />
              ) : (
                <MobileSimulator state={mobileState} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </StageContainer>
  )
}
