# Gemini AIOps & Autonomous SRE Demo

Welcome to the Gemini AIOps & Autonomous SRE Demo! This repository showcases an interactive, React-based web application simulation highlighting the integration of AI-driven tools in various software development and operational lifecycle phases. 

The demo illustrates how Gemini (Google's AI model) can transform the developer experience through its intelligence in design, coding (Inner loop), CI/CD (Submit loop), and production operations (Outer loop).

## Features

- **Interactive UI Lifecycle Simulation**: Walk through distinct "loops" of the software development lifecycle:
   - **The Design Loop**: Emulates requirement analysis and architectural planning.
   - **The Inner Loop**: Interactive virtual IDE with simulated code generation, crash detection, context-aware auto-healing, and code refinement/enhancement (e.g., adding "Premium" visual flair).
   - **The Submit Loop**: Shows CI/CD pipeline automation, automated PR reviews, and AI-assisted pipeline healing.
   - **The Outer Loop (SRE Agent)**: Simulates dynamic production monitoring, anomaly detection, autonomous rollback, and RCA (Root Cause Analysis) generation using the Gemini Autonomous SRE Agent. Includes a Chaos Mode for stress testing.

## Tech Stack

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
   If you plan to use actual Gemini API integrations natively (though the current UI relies largely on simulated visual orchestrations), create a `.env.local` file at the root:
   ```env
   GOOGLE_API_KEY=your_gemini_api_key_here
   ```
   *(Note: The `.gitignore` is configured to ignore `.env*` files, keeping your secrets secure.)*

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the outcome.

## Project Structure

- `app/`: Next.js App Router entry points (primarily the unified interactive `page.tsx`).
- `components/`: React UI components categorized by lifecycle phases:
  - `DesignLoop/`: Planning and Design simulation components.
  - `InnerLoop/`: Virtual IDE, Code simulations, AI healing UI.
  - `SubmitLoop/`: Pipeline execution and Shift-Left dashboard UI.
  - `OuterLoop/`: The Gemini SRE Agent dashboard, Metrics, and Chaos mode.
- `hooks/`: Custom React hooks (like sound utilities).
- `lib/`: Utility functions (e.g., specific tailwind class mergers).

## Contributing

We welcome contributions to make this demo even more robust! Be sure adhering to the standard Next.js conventions and keeping UI components functional and self-contained. 
Since this intends to be a demonstration tool, feel free to open Pull Requests for new visual phases, better AI prompts, or expanding the SRE feature set!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
