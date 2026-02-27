# AI Agents Mastery Portal

A scientific, comprehensive guide to conceptualizing, designing, and building state-of-the-art autonomous AI agents. Built with Next.js and styled with Tailwind CSS v4.

## 🚀 Getting Started

First, install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Architecture

This project follows strictly modular patterns to ensure easy extensibility without requiring changes to core component files.

### Configuration Hooks
- **`src/config/sidebar.config.ts`**: The central configuration hook for the application Sidebar. All navigation links, application versioning, and titles are defined here, completely removing hardcoded static values from components.

### Core Components
- **`src/components/Sidebar.tsx`**: A responsive, glassmorphic layout sidebar that parses `sidebar.config.ts`.
- **`src/app/layout.tsx`**: The root layout, equipped with Inter typography and hydration mismatch suppression. 

### Modules
- **`src/app/page.tsx`**: Landing page overview showcasing interactive CSS cards.
- **`src/app/prerequisites/page.tsx`**: Module 1 – Details LLMs, Prompt Engineering, and RAG.
- **`src/app/building-ai-agents/page.tsx`**: Module 2 – Explains the ReAct architecture, Tool abstractions, and JSON schema parsing.

## 🎨 Theme & Typography

- **Font**: Inter (Google Fonts)
- **Primary Color**: Indigo (`#4f46e5`)
- **Secondary Color**: Rose (`#f43f5e`)
- **Backgrounds**: Slate 50 (`#f8fafc`) with UI components employing deep Slate 900 (`#0f172a`).
- **Styling Method**: Tailwind v4 with a custom `@theme` block defined in `src/app/globals.css`.

---

_Created as an educational and structural layout for autonomous agent training._
