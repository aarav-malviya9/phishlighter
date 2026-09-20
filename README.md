# 🛡️ PhishLighter — AI-Powered Social Engineering Detector

<div align="center">

**See the manipulation before it sees you.**

PhishLighter uses AI to detect psychological manipulation tactics in emails and messages — and visually highlights the exact phrases designed to trick you.

[Live Demo](#) · [Demo Video](#) · [Devpost](#)

</div>

---

## 🎯 The Problem

**91% of cyberattacks begin with a phishing email** (Deloitte). But traditional spam filters only catch obvious scams — they look for bad links and known malicious domains.

Modern social engineering attacks don't need bad links. They use **psychological manipulation**: artificial urgency, authority impersonation, emotional pressure, and forced secrecy to trick people into acting against their own interests.

Non-technical users — elderly individuals, busy employees, and students — are especially vulnerable because they can't recognize the psychological tactics being used against them.

## 💡 The Solution

PhishLighter analyzes emails for **psychological manipulation tactics** (not just bad links) and visually highlights the exact sentences being used to manipulate you, with plain-English explanations of *why* each phrase is dangerous.

### How It Works

1. **Paste** any email or message into PhishLighter
2. **AI analyzes** the text for 10 categories of social engineering tactics
3. **See** manipulative phrases highlighted directly in the email text with color-coded severity
4. **Hover** over any highlight to read a plain-English explanation of the psychological trick being used
5. **Learn** to recognize these patterns in future emails

### Tactics Detected

| Tactic | Example |
|--------|---------|
| 🔴 Artificial Urgency | "Act within 24 hours or your account will be deleted" |
| 🔴 Authority Impersonation | Fake CEO, IT department, or government emails |
| 🔴 Fear & Threats | "Your account has been compromised" |
| 🟠 Reward Baiting | "You've won a $500 gift card!" |
| 🟠 Forced Secrecy | "Don't discuss this with anyone on the team" |
| 🟡 Trust Exploitation | Leveraging fake familiarity or relationships |
| 🟡 Unusual Requests | Asking for passwords, wire transfers, gift cards |
| 🟡 Emotional Manipulation | Exploiting guilt, sympathy, or FOMO |
| 🔵 Identity Concealment | Vague sender info, mismatched details |
| 🔵 Technical Deception | Suspicious links, spoofed domains |

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- (Optional) A free [Groq API key](https://console.groq.com/keys) for live AI analysis
- (Optional) [Ollama](https://ollama.ai) running locally with `llama3.1`

### Setup

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/phishlighter.git
cd phishlighter

# Install dependencies
npm install

# (Optional) Set up AI — copy the env file and add your Groq API key
cp .env.example .env.local
# Edit .env.local and add your GROQ_API_KEY

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> **Note:** PhishLighter works immediately without any API key! It includes 5 pre-analyzed sample emails for demo purposes. Add a Groq API key to analyze custom emails with live AI.

## 🛠️ Technology Stack

| Technology | Purpose |
|-----------|---------|
| **Next.js 14** | React framework with App Router and API routes |
| **React 18** | Interactive UI with real-time state management |
| **Tailwind CSS 3** | Responsive, utility-first styling |
| **Groq API** (Llama 3.3 70B) | Free, fast AI inference for email analysis |
| **Ollama** (optional) | Local AI inference alternative |

### Architecture

```
User pastes email → Next.js API Route → AI Analysis (Groq/Ollama/Fallback)
                                              ↓
                  ← JSON response ← Structured tactics with exact quotes
                        ↓
              Frontend highlights matching quotes in original text
              + renders severity cards with explanations
```

## 📁 Project Structure

```
phishlighter/
├── src/
│   ├── app/
│   │   ├── api/analyze/route.js   # API endpoint
│   │   ├── globals.css            # Theme & animations
│   │   ├── layout.js              # Root layout
│   │   └── page.js                # Main page
│   ├── components/
│   │   ├── EmailAnalyzer.jsx      # Main orchestrator
│   │   ├── HighlightedText.jsx    # Text highlighting engine
│   │   ├── RiskMeter.jsx          # Animated risk score
│   │   ├── TacticCard.jsx         # Individual tactic display
│   │   ├── SampleEmails.jsx       # Demo email selector
│   │   ├── Header.jsx             # App header
│   │   └── Footer.jsx             # App footer
│   └── lib/
│       ├── analyzer.js            # AI analysis logic
│       ├── prompts.js             # LLM prompt engineering
│       └── mockData.js            # Sample data & fallbacks
```

## 🎬 Demo

PhishLighter includes 5 built-in sample emails covering the most common attack types:

1. **👔 CEO Wire Transfer** — Business Email Compromise ($47,500 wire fraud)
2. **🔒 Account Suspended** — Microsoft 365 credential phishing
3. **📦 Delivery Scam** — Fake UPS redelivery fee
4. **💰 Investment Scam** — Crypto pre-sale advance fee fraud
5. **✅ Legitimate Email** — Safe standup meeting notes (demonstrates no false positives)

## 🏆 Hackathon

Built for the **TLN Cybersecurity Challenge 2026** (Devpost).

### Impact
- Educates users about the *psychology* behind social engineering, not just the technical indicators
- Helps the 47% of adults who can't identify a phishing email (Google/University of Florida study)
- Shifts the paradigm from "don't click bad links" to "recognize when you're being psychologically manipulated"

## 📝 AI & External Tools Disclosure

This project was built with AI assistance:

- **Claude** was used to scaffold the project structure, generate the React component code, engineer the LLM analysis prompt, and create sample phishing emails for demo purposes.
- **Groq API** (Llama 3.3 70B model) provides the live AI analysis engine that identifies social engineering tactics in user-submitted emails.
- The **text highlighting algorithm**, **UI/UX design decisions**, **mock data with pre-computed analyses**, and **prompt engineering strategy** were designed and reviewed by the team.
- All code was reviewed, tested, and iterated on by the team before submission.

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.
