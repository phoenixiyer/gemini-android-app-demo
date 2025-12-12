import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize Gemini
// NOTE: Use a server-side route for production, but for this demo running locally, client-side is acceptable if env is set.
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '')

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

        const result = await model.generateContent(prompt)
        const response = await result.response
        const text = response.text()

        // Basic parsing cleanup
        const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim()
        return JSON.parse(cleanText)
    } catch (e) {
        console.error("Gemini Scan Failed:", e)
        // Fallback if API fails or key is missing
        return [
            "Use Jetpack Compose LazyColumn",
            "Implement RecyclerView Adapter",
            "Custom Canvas Drawing"
        ]
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
        const result = await model.generateContent(prompt)
        const response = await result.response
        return response.text()
    } catch (e) {
        return "Automatic RCA generation failed. Manual inspection required."
    }
}
