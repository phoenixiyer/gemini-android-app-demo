# Google Developer Productivity Tools: End-to-End Agentic AI Demo

Welcome to the End-to-End Agentic AI Transformation Demo! This repository showcases an interactive, React-based web application simulation that highlights the integration of **Google's Developer Productivity Tool Stack** across all software development and operational lifecycle phases.

This demo illustrates how Google's AI-driven tools comprehensive transform the developer experience through intelligence in design, coding, CI/CD, and production operations via an agentic approach.

## Featured Tool Stack

This simulation maps specific Google AI capabilities to distinct "loops" of the software development lifecycle:

- **The Design Loop** (`Gemini CLI`): Emulates requirement analysis, documentation synthesis, and architectural planning.
- **The Inner Loop** (`Gemini Code Assist`): Features an interactive virtual IDE demonstrating code generation, real-time crash detection, context-aware auto-healing, and intelligent code refinement (e.g., adding "Premium" visual flair).
- **The Submit Loop** (`Gemini Code Assist Agent in GitHub` & `Gemini CLI`): Simulates CI/CD pipeline automation, automated Pull Request reviews, and AI-assisted pipeline healing before code reaches production.
- **The Outer Loop** (`Gemini CLI - Autonomous SRE Agent`): Simulates dynamic production monitoring, anomaly detection, autonomous canary rollbacks, and Root Cause Analysis (RCA) generation. Includes a Chaos Mode for stress testing.

## Demo Tech Stack

The interactive visual simulation itself is built using:
- [Next.js](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide React](https://lucide.dev/) (Icons)
- [Google Generative AI SDK](https://github.com/google/generative-ai-js)

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/phoenixiyer/gemini-android-app-demo.git
   cd gemini-android-app-demo
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Setup Environment Variables:
   Create a `.env.local` file at the root to enable actual Gemini API integrations natively:
   ```env
   GOOGLE_API_KEY=your_gemini_api_key_here
   ```
   *(Note: The `.gitignore` is properly configured to ignore `.env*` files, keeping your secrets secure locally.)*

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to experience the demo.

## Project Structure

- `app/`: Next.js App Router entry points (primarily the unified interactive `page.tsx`).
- `components/`: React UI components categorized by lifecycle phases:
  - `DesignLoop/`: Planning and Design simulation components.
  - `InnerLoop/`: Virtual IDE, Code simulations, AI healing UI.
  - `SubmitLoop/`: Pipeline execution and Shift-Left dashboard UI.
  - `OuterLoop/`: The Gemini SRE Agent dashboard, Metrics, and Chaos mode.
- `hooks/`: Custom React hooks.
- `lib/`: Utility functions.

## Contributing

We welcome contributions to make this demo even more robust! We adhere to standard Next.js conventions. Feel free to open Pull Requests for new visual phases, improved simulation flows, or expanding the Autonomous SRE feature set!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
