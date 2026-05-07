# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start Vite dev server
npm run build    # Production build
npm run lint     # ESLint check
npm run preview  # Preview production build locally
```

No test suite exists in this project.

## Architecture

**Stack**: React 18 + TypeScript, Vite 6, Tailwind CSS v4, Framer Motion (`motion/react`), Radix UI + shadcn/ui primitives.

**Entry**: `index.html` → `src/main.tsx` → `src/app/App.tsx` (WeddingApp wrapped in AppProvider)

**Page layout** (top-to-bottom): HeroSection → EventDetails → PhotoGallery → RSVPSection → WishesSlider → LocationSection → WeddingFooter. SettingsPanel floats fixed bottom-right.

### Global Context (`src/app/contexts/AppContext.tsx`)

The entire app's theming and i18n lives here. Two hooks:
- `useTheme()` → returns `{ palette, setPalette }` where `palette` is one of 5 `ColorPalette` objects (Botanical Green, Sky & Sunshine, Pastel Spring, Blush Garden, Savvy Red)
- `useLang()` → returns `{ t, language, setLanguage }` where `t` is a full EN/VI translation object

The context wires each `palette` property to a matching CSS variable in a `useEffect`. **Never hardcode colors** — always use `palette.someToken` in inline styles or `var(--color-someToken)` in CSS.

### Theming & Styling

Tailwind v4 (via `@tailwindcss/vite` plugin). The `@theme` directive in `src/styles/theme.css` maps palette CSS variables to Tailwind color utilities.

17 color tokens per palette: `bg`, `bg1`, `bg2`, `light`, `medium`, `accent`, `primary`, `primaryDim`, `text`, `textMuted`, `textLight`, `textOnDark`, `border`, `cardBg`, `footerBg`, `countdownBg`, `heroGradient`, `shadowAccent`, `shadowPrimary`, `navScrollBg`.

Path alias: `@/` resolves to `src/`.

### Typography

- Headings: `"Mussica Swash"` (custom TTF in `public/fonts/`) with Playfair Display fallback
- Body: `"Montserrat"` (Google Fonts, loaded in `src/styles/fonts.css`)
- Use `clamp()` for responsive font sizes, not fixed `text-*` classes for headings.

### Animations

Use `motion` from `motion/react` (not `framer-motion`). Entrance animations use `initial/animate/transition` with staggered `delay` values. Scroll-triggered reveals use `whileInView` + `viewport={{ once: true }}`. Keep durations around 0.8–1.2s.

### i18n

All user-facing strings come from `t.<key>` (from `useLang()`). Both EN and VI must be updated together in `AppContext.tsx` when adding new text. The `language` value is `"en"` or `"vi"`.

### Guidelines

Comprehensive style guide at `guidelines/Guidelines.md` — read it before adding new components. Key rules:
- Functional components only, explicit prop interfaces
- Local state for UI, context only for global concerns (theme/lang)
- `react-hook-form` for forms
- `lucide-react` for icons (prefer over MUI icons where possible)
