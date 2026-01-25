# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Barnes Custom Fishing - a portfolio website for a tuna fishing rod craftsman based in Manahawkin, NJ. The site showcases custom rod work with a minimalistic, image-focused design.

## Build Commands

```bash
npm run dev      # Start development server on localhost:3000
npm run build    # Build for production (static export)
npm run lint     # Run ESLint
npm test         # Run Playwright E2E tests
npm run test:ui  # Run Playwright tests with UI
```

## Architecture

- **Framework**: Next.js 16 with App Router, TypeScript
- **Styling**: Tailwind CSS v4
- **Testing**: Playwright for E2E browser testing
- **Deployment**: Vercel (static export)

### Key Files
- `app/page.tsx` - Homepage with hero, gallery, and footer
- `app/layout.tsx` - Root layout with metadata
- `components/Gallery.tsx` - Image gallery with lightbox
- `public/` - Static images (rod photos)
- `tests/homepage.spec.ts` - E2E tests

## External Links

- Instagram: https://www.instagram.com/barnescustomfishing
