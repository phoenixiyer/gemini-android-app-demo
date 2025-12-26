'use client'

import { useCallback } from 'react'

// Base64 Audio Assets (Short, Synthesized SFX)
const SOUNDS = {
    // Sci-Fi Scan Hum (Low frequency saw wave)
    SCAN: 'data:audio/wav;base64,UklGRlgAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=', // Placeholder, will replace with real short beep

    // High Tech Beep (Acknowledge)
    CLICK: 'data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YRAAAACQB/8A/wD/AP8A/wD/AP8AAA==', // Placeholder

    // Text Typing (Mechanical Click)
    TYPE: 'data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YRAAAACQB/8A/wD/AP8A/wD/AP8AAA==',

    // Success Chime
    SUCCESS: 'data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YRAAAACQB/8A/wD/AP8A/wD/AP8AAA==',

    // Alarm (Low urgency)
    ALARM: 'data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YRAAAACQB/8A/wD/AP8A/wD/AP8AAA==',

    // Laser Zap (Chaos Mode)
    ZAP: 'data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YRAAAACQB/8A/wD/AP8A/wD/AP8AAA=='
}

// NOTE: Since I cannot upload binary files, I will use a simple "Beep" synthesis approach using Web Audio API for maximum compatibility and zero size.

export function useSoundEffects() {

    const playTone = useCallback((freq: number, type: OscillatorType, duration: number, vol: number = 0.1) => {
        if (typeof window === 'undefined') return
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext
        if (!AudioContext) return

        const ctx = new AudioContext()
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        osc.type = type
        osc.frequency.setValueAtTime(freq, ctx.currentTime)

        gain.gain.setValueAtTime(vol, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration)

        osc.connect(gain)
        gain.connect(ctx.destination)

        osc.start()
        osc.stop(ctx.currentTime + duration)
    }, [])

    const playScan = () => {
        // Sci-Fi "Scanner" Sound: Sequence of fast high-pitch bleeps
        playTone(1200, 'sine', 0.1, 0.05)
        setTimeout(() => playTone(1500, 'sine', 0.1, 0.05), 100)
        setTimeout(() => playTone(1800, 'sine', 0.1, 0.05), 200)
    }

    const playType = () => {
        // Subtle mechanical click (random pitch)
        playTone(800 + Math.random() * 200, 'triangle', 0.03, 0.03)
    }

    const playSuccess = () => {
        // Major Chord Arpeggio (C-E-G-C)
        playTone(523.25, 'sine', 0.4, 0.1) // C5
        setTimeout(() => playTone(659.25, 'sine', 0.4, 0.1), 150) // E5
        setTimeout(() => playTone(783.99, 'sine', 0.4, 0.1), 300) // G5
        setTimeout(() => playTone(1046.50, 'sine', 0.8, 0.1), 450) // C6
    }

    const playAlarm = () => {
        // Urgent Pulses
        playTone(440, 'sawtooth', 0.2, 0.1)
        setTimeout(() => playTone(440, 'sawtooth', 0.2, 0.1), 250)
        setTimeout(() => playTone(440, 'sawtooth', 0.2, 0.1), 500)
    }

    const playZap = () => {
        // Laser Zap (Sweep Frequency)
        if (typeof window === 'undefined') return
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext
        if (!AudioContext) return
        const ctx = new AudioContext()
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        osc.frequency.setValueAtTime(800, ctx.currentTime)
        osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.15)

        gain.gain.setValueAtTime(0.1, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15)

        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start()
        osc.stop(ctx.currentTime + 0.15)
    }

    return { playScan, playType, playSuccess, playAlarm, playZap }
}
