<div align="center">

<img alt="5efe7a4c-4118-4963-b560-8f59bf0d2200" src="https://github.com/user-attachments/assets/3885ac77-70b7-4baf-b749-83fe3bb486de" alt="Glixor logo" width="120"/>

# Glixor

A neo-brutalist, glitch-driven UI component library and design system — built with React, TypeScript, and Storybook.

<img alt="a1a40ab8-3435-441d-9ce6-0dbbee0f35e1" src="https://github.com/user-attachments/assets/b649440d-3345-4952-8265-2594eec3dcb4" alt="Glixor preview" width="100%" />


[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Storybook](https://img.shields.io/badge/Storybook-10-FF4785?logo=storybook&logoColor=white)](https://storybook.js.org)
[![License](https://img.shields.io/badge/license-Apache_2.0-blue.svg)](./LICENSE)

Built by **Dhia Kassab** — developer, 🇹🇳 Tunisian vibes
[LinkedIn](https://linkedin.com/in/meddhiaka) · [mohameddhiakb@gmail.com](mailto:mohameddhiakb@gmail.com)

</div>

---

## Overview

Glixor is a component library built around a distinctive "cyber HUD" aesthetic — hard geometric cuts, chromatic-aberration glitch effects, and a shared dual-theme (light/dark) token system. Every component draws from the same foundations: semantic color tokens, animation keyframes, and a reusable `.cyber-fx` glitch engine that any interactive component can opt into.

## Tech stack

| Layer | Tool |
| :--- | :--- |
| UI | React 19 + TypeScript |
| Build | Vite |
| Styling | Tailwind CSS |
| Documentation | Storybook |
| Testing | Vitest + Playwright |

## Foundations

- Semantic color tokens (primary, secondary, alert, warning, success) with full light/dark support
- Shared `.cyber-fx` glitch engine — animated borders, floating pips, chromatic aberration — reused across every interactive component
- Typography scale, geometric corner chamfers, and surface-pattern utilities
- Documented in Storybook under `Foundations/*`

## Components

| Component | Highlights | Status | Preview |
| :--- | :--- | :---: | :---: |
| Button | Variants, sizes, chamfer cuts, loading/disabled states, icons | ✅ | 🎥 _coming soon_ |
| Badge | Status pills, outline, solid, and micro-tag styles | ✅ | 🎥 _coming soon_ |
| Input | Style variants, sizing, validation, search adornment, segmented groups | ✅ | 🎥 _coming soon_ |
| Card | Surface hierarchy, media/title/footer sub-components | ✅ | 🎥 _coming soon_ |
| Modal | Glitch-intro sequence, focus trap, alert tone | ✅ | 🎥 _coming soon_ |
| Pagination | Numbered pager, stepper, jump-to-page, load-more | ✅ | 🎥 _coming soon_ |
| Skeletons | Loading placeholders | 🚧 | — |
| Sliders | Media carousels and range tuning | 🚧 | — |
| Form controls | Textarea, dropdown, checkbox, switch | 🚧 | — |

## Roadmap

- 📖 A standalone documentation site (separate from Storybook) is planned for the future
- 📦 Glixor will be published as an npm package once the component set stabilizes

## Getting started

```bash
npm install
npm run storybook
```

Storybook runs at `http://localhost:6006`.

## Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Start the Vite dev server |
| `npm run storybook` | Start Storybook |
| `npm run build` | Type-check and build for production |
| `npm run build-storybook` | Build a static Storybook |

## License

Apache 2.0 — see [LICENSE](./LICENSE).
