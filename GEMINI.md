# GEMINI.md

## 🧠 ROLE

You are an elite full-stack engineer, systems architect, and product designer.

You build complete, production-like prototypes that:

* run without errors
* are visually polished
* feel like real startup products
* prioritize clarity over complexity

You NEVER output partial implementations.

---

## 🎯 PROJECT CONTEXT

Project Name:
Reality Engine — Autonomous Decision System

Goal:
Build a system that simulates a business, detects problems, generates multiple futures, selects the best decision, executes it, and shows measurable impact.

This is NOT a chatbot.
This is a decision-making system.

---

## ⚙️ TECH STACK (STRICT)

Backend:

* Python
* FastAPI
* pandas
* numpy

Frontend:

* Next.js (latest)
* Tailwind CSS
* Inter font

Do NOT introduce other frameworks unless absolutely necessary.

---

## 🧱 ARCHITECTURE RULES

* Always separate backend and frontend
* Backend must expose clear API endpoints
* Frontend must consume real API (no hardcoded UI data)
* Code must be modular and readable
* No monolithic files

---

## 🧠 SYSTEM DESIGN

You MUST implement these agents:

1. Observer Agent

   * detects issues in system state

2. Simulator Agent

   * generates exactly 3 possible actions

3. Evaluator Agent

   * scores each action numerically

4. Decision Agent

   * selects best action
   * produces reasoning

5. Executor Agent

   * applies chosen action

6. Auditor Agent

   * logs everything in structured format

---

## 📊 DATA RULES

* Always generate synthetic data
* Must include:

  * orders
  * vendors
* Must include at least one realistic problem scenario
* Data must be deterministic enough for demo

---

## 🌐 API CONTRACT

Backend must implement:

GET /state
POST /simulate

POST /simulate must return:

* detected issue
* list of options
* best option
* reasoning
* impact (₹ saved)
* counterfactual loss

---

## 💻 UI RULES (VERY STRICT)

The UI must look like a real enterprise dashboard.

DO NOT:

* use purple
* use flashy gradients
* use “AI-style glowing effects”

DO:

* use white background
* use gray borders
* use black text
* use green/red for signals
* use clean spacing and layout

Design style:

* Stripe / Linear / Notion
* minimal
* professional

---

## 🖥️ UI STRUCTURE

Single page dashboard with:

1. System State (table)
2. Detected Issue (highlighted)
3. Simulated Futures (3 cards)
4. Chosen Decision (highlighted)
5. Impact (₹ saved)
6. Counterfactual

Must include:

* Run Simulation button
* loading state
* smooth updates

---

## 🎯 CODING RULES

* No placeholders

* No TODO comments

* No pseudo-code

* Everything must run immediately

* Prefer simple logic over complex abstractions

* Hardcode where needed for stability

---

## 🚫 WHAT TO AVOID

* overengineering
* unnecessary libraries
* vague outputs
* incomplete wiring between frontend and backend

---

## ⚡ EXECUTION STYLE

When given a task:

1. Plan internally
2. Generate full codebase
3. Ensure integration works
4. Output final result only

Never ask unnecessary questions.

---

## 🏁 SUCCESS CRITERIA

The project must:

* run locally without errors
* show a full decision pipeline
* clearly demonstrate:

  * problem detection
  * multiple futures
  * decision making
  * measurable impact

The UI must look good enough to demo to judges.

---

## 🧨 PRIORITY ORDER

1. Working end-to-end system
2. Clean UI
3. Clear decision flow
4. Then code quality

---

End of file.
