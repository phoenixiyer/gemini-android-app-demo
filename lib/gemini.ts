import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize Gemini
// NOTE: Use a server-side route for production, but for this demo running locally, client-side is acceptable if env is set.
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '')

// Fallback Data for Offline/Demo Safety
const FALLBACK_REASONING = [
    "Use Jetpack Compose LazyColumn (Best Performance)",
    "Implement RecyclerView with DiffUtil (Legacy Support)",
    "Custom Canvas Drawing (Max Control, High Effort)"
]

const FALLBACK_RCA = "Detected infinite loop in BackgroundSyncWorker.kt causing 15% battery drain spike."

// Helper for timeout
const withTimeout = <T>(promise: Promise<T>, ms: number, fallback: T): Promise<T> => {
    return Promise.race([
        promise,
        new Promise<T>((resolve) => setTimeout(() => resolve(fallback), ms))
    ])
}

export async function generateArchitecturalReasoning(topic: string): Promise<string[]> {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })
        const prompt = `
        You are a Senior Android Architect AI.
        Generate 3 distinct architectural options for the following technical decision: "${topic}".
        Format the output as a simple JSON array of strings, e.g. ["Option A: ...", "Option B: ...", "Option C: ..."].
        Keep each string concise (under 10 words).
        Do not output Markdown. Just the raw JSON array.
        `

        const apiCall = async () => {
            const result = await model.generateContent(prompt)
            const response = await result.response
            const text = response.text()
            const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim()
            return JSON.parse(cleanText)
        }

        // Return API result OR Fallback if > 3 seconds (to keep demo snappy)
        return await withTimeout(apiCall(), 3000, FALLBACK_REASONING)

    } catch (e) {
        console.error("Gemini Scan Failed (Using Fallback):", e)
        return FALLBACK_REASONING
    }
}

export async function generateCrashReport(errorShort: string): Promise<string> {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })
        const prompt = `
        You are a Site Reliability Engineer AI.
        Generate a concise Root Cause Analysis (RCA) for the following error in 1 sentence: "${errorShort}".
        Use technical jargon (e.g. memory leak, race condition, deadlock).
        Do not use Markdown.
        `

        const apiCall = async () => {
            const result = await model.generateContent(prompt)
            const response = await result.response
            return response.text()
        }

        return await withTimeout(apiCall(), 3000, FALLBACK_RCA)

    } catch (e) {
        return FALLBACK_RCA
    }
}
