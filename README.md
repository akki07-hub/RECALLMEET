# RecallMeet — Meeting Intelligence Powered by Hindsight

> **Tagline:** Your meetings shouldn't forget what you decided.

RecallMeet is an AI-powered meeting intelligence platform designed for sales and consulting teams. While conventional meeting tools focus only on single-meeting transcripts and short-term summaries, RecallMeet uses **Hindsight Cloud** as its persistent long-term memory engine to store, recall, and reason across multiple meetings per client over time.

---

## 🌟 Key Features

1. **Persistent Client Memory (Hindsight Cloud)**
   - Every meeting's decisions, requirements, commitments, deadlines, and preferences are automatically extracted and retained into a dedicated Hindsight memory bank for that client.

2. **Real End-to-End Processing Pipeline**
   - **Audio Upload / Recording / Demo Mode** &rarr; **OpenAI Whisper** (transcription) &rarr; **GPT-4o** (structured analysis) &rarr; **Hindsight `retain()`** (persistent memory).

3. **Ask RecallMeet (Hindsight `reflect()`)**
   - Ask complex cross-meeting questions like *"What is the budget for Acme Fitness?"* or *"What are our pending commitments?"*
   - Powered by Hindsight's agentic reasoning over stored client memories.
   - Includes a **Before vs. After Memory Comparison** mode to demonstrate why persistent memory is essential.

4. **Prepare Me (Meeting Brief Generation)**
   - Walk into your next client meeting fully prepared.
   - Generates a comprehensive brief covering past decisions, outstanding issues, requirements, context, and suggested questions.

5. **Memory Explorer (Hindsight `recall()`)**
   - Browse raw memories accumulated over time for any client.

---

## 🏗 Technology Stack

- **Framework:** Next.js 14 (App Router) + TypeScript
- **Memory Engine:** Hindsight Cloud via official `@vectorize-io/hindsight-client`
- **AI / LLM:** OpenAI API (GPT-4o for analysis, Whisper for transcription)
- **Database:** SQLite via `better-sqlite3` (for local metadata storage)
- **Styling:** Tailwind CSS + Lucide Icons

---

## ⚙️ Hindsight Integration

All Hindsight operations are executed **server-side** in Next.js API routes using the official `@vectorize-io/hindsight-client` SDK.

- **Base URL:** `https://api.hindsight.vectorize.io`
- **Memory Banks:** Automatically isolated per client (`clientToBank(clientName)`)
- **Core SDK Methods Used:**
  - `client.retain(bankId, content)` — Stores key insights, decisions, and context.
  - `client.recall(bankId, query)` — Retrieves raw relevant memory snippets.
  - `client.reflect(bankId, query)` — Synthesizes answers and generates briefs across all past meetings.

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18+
- An OpenAI API Key
- A Hindsight API Key (from [Hindsight Cloud](https://ui.hindsight.vectorize.io/signup))

### 2. Environment Setup
Create a `.env.local` file in the root directory:

```env
OPENAI_API_KEY=your_openai_api_key
HINDSIGHT_BASE_URL=https://api.hindsight.vectorize.io
HINDSIGHT_API_KEY=your_hindsight_api_key
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🎭 Running the 60-Second Demo

1. Open the dashboard.
2. Click **Load Acme Fitness Demo** (or go to **New Meeting** &rarr; select **Demo Mode**).
3. Process the 3 pre-loaded Acme Fitness meetings.
4. Go to **Memory** &rarr; select **Acme Fitness** to see accumulated memories stored in Hindsight Cloud.
5. Go to **Ask RecallMeet** &rarr; select **Acme Fitness** &rarr; ask *"What did the client care about most?"*
   - Toggle **Show before/after memory comparison** to highlight the value of Hindsight memory.
6. Go to **Prepare Me** &rarr; select **Acme Fitness** &rarr; click **Prepare Me** to generate a complete meeting preparation brief.

---

## 📜 License
MIT
