# Nexora AI — AI Productivity Assistant

A modern, premium AI-powered productivity workspace that helps automate everyday workplace tasks. Built with a futuristic sci-fi aesthetic, Nexora AI combines a clean dashboard with four intelligent generators to help you write emails, summarize meetings, plan tasks, and research topics faster.

## Project Overview

Nexora AI is a full-stack React web application designed as a personal AI productivity assistant. It features a dark-themed, glassmorphism UI with neon accent lighting, a responsive sidebar navigation layout, and a central dashboard that surfaces usage stats, quick actions, recent activity, and productivity tips. All AI generation is powered by the Lovable AI Gateway.

This project was originally built with [Lovable](https://lovable.dev) and continues to evolve as a modern SaaS-style productivity platform.

## Features

### Dashboard
- **Welcome back greeting** — personalized hero section with a productivity overview
- **Stats cards** — usage insights, current streaks, and total generations
- **Quick Actions** — one-click shortcuts to each AI tool
- **Recent Activity** — live log of your latest AI generations
- **AI Productivity Tip** — rotating daily productivity suggestions
- **Responsible AI Card** — reminder to verify AI-generated content
- **Upcoming Tasks** — mock task list for planning context

### AI Tools

1. **Smart Email Generator**
   - Inputs: Recipient, Email Purpose, Tone (Formal, Friendly, Persuasive)
   - Output: A professional, ready-to-send email

2. **Meeting Notes Summarizer**
   - Input: Paste raw meeting notes
   - Output: Summary, Key Decisions, Action Items, and Deadlines

3. **AI Task Planner**
   - Input: Today's tasks
   - Output: Prioritized schedule, suggested working times, and productivity tips

4. **AI Research Assistant**
   - Input: Research topic
   - Output: Summary, key insights, and recommendations

### Shared Tool UX
Each tool page includes:
- Clean input forms
- Gradient generate button
- Loading animation with shimmer/pulse effects
- Output card for results
- Copy to clipboard
- Clear inputs
- Export output as Markdown

### Additional Pages
- **Responsible AI** — dedicated guidelines page
- **Settings** — user preferences and dark mode toggle

## Tools Used

- **Framework:** [React 19](https://react.dev) + [TanStack Start](https://tanstack.com/start)
- **Routing:** [TanStack Router](https://tanstack.com/router)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com) + [Radix UI](https://www.radix-ui.com) primitives
- **Icons:** [Lucide React](https://lucide.dev)
- **State Management:** [TanStack Query](https://tanstack.com/query)
- **Forms:** [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev)
- **AI Backend:** [Lovable AI Gateway](https://docs.lovable.dev/features/ai-gateway) — `google/gemini-3.6-flash`
- **Build Tool:** [Vite](https://vitejs.dev)
- **Language:** [TypeScript](https://www.typescriptlang.org)
- **Notifications:** [Sonner](https://sonner.emilkowal.ski)
- **Date Handling:** [date-fns](https://date-fns.org)

## Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org) (LTS recommended)
- npm, yarn, pnpm, or bun

### Local Development

1. **Clone the repository**

   ```sh
   git clone <this-repository-url>
   cd <repository-name>
   ```

2. **Install dependencies**

   ```sh
   npm install
   ```

   Or using bun:

   ```sh
   bun install
   ```

3. **Start the development server**

   ```sh
   npm run dev
   ```

   The app will be available at `http://localhost:8080`.

4. **Build for production**

   ```sh
   npm run build
   ```

5. **Preview the production build**

   ```sh
   npm run preview
   ```

### Project Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start the Vite development server |
| `npm run build` | Build the app for production |
| `npm run build:dev` | Build in development mode |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run format` | Format all files with Prettier |

## Author

Created by **Sinovuyo Joji** — Student Name

Powered by Lovable AI Gateway.

## Responsible AI Notice

AI-generated responses may contain errors. Always verify important information before using it professionally, and avoid entering confidential business information.

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/741c897a-88df-40e9-8c41-83f521403893).

- **Ship faster:** describe what you want to build and Lovable handles the code.
- **Stay in sync:** every change made in Lovable is committed straight to this repository.
- **Full ownership:** this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.
