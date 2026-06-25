<!-- Copilot/agent guidance for this workspace -->
# Copilot Instructions

Purpose
- Help contributors and AI agents work productively with this React + Vite + Tailwind codebase.

How to use
- Ask concise tasks (goal, file(s), desired change). Prefer small PR-sized requests.
- Link to relevant files when asking (examples below).

Quick commands
- Start dev server: `npm run dev`
- Build: `npm run build`
- Preview production build: `npm run preview`
- Lint: `npm run lint`

Key files & locations
- App entry: [src/main.jsx](src/main.jsx)
- Routes: [src/routes.jsx](src/routes.jsx)
- Pages: [src/pages](src/pages)
- Components: [src/component](src/component)
- API helpers: [src/features/api.js](src/features/api.js)
- Store/hooks: [src/stores](src/stores)

Conventions
- Use React + functional components and hooks; keep components small and focused.
- CSS: Tailwind classes in `index.css` and component-level classes.
- State: prefer the existing `zustand` stores in `src/stores` for global state.

What to include in a task for the agent
- Goal: short description of desired behaviour or bug fix.
- Files: one or more file links to change.
- Acceptance: how to verify (manual steps or expected UI/text).

Link, don't embed
- If documentation or large samples are needed, link to external docs or add a short `docs/` file.

When to escalate to maintainers
- Schema/API changes, auth/secret handling, or deploy config updates.

Example prompts for Copilot Chat
- "Refactor `src/pages/Login.jsx` to validate email format before submit and show inline error." 
- "Add unit tests for `src/lib/utils.js` functions — suggest test cases and file skeleton." 

Next steps (optional)
- Create targeted `AGENTS.md` for admin-panel tasks and tests area.

Contact
- PRs and major design questions: open an issue or assign a maintainer.
