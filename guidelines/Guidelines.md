**Wedding Web Bot – Source-Aligned Guidelines**

These guidelines describe how new code should be written to stay consistent with the existing code in `src/`.

## General guidelines

- **Language & framework**
  - Use **TypeScript** with **React** function components.
  - Prefer **hooks** (`useState`, `useEffect`, custom hooks like `useTheme`, `useLang`) over class components.
  - Keep JSX **presentational** where possible and push shared logic into hooks, context, or utilities.

- **Project structure**
  - Place page-level layout and composition in `app/App.tsx` and small, focused components under `app/components`.
  - Put reusable primitives and design-system pieces in `app/components/ui`.
  - Keep context, translations, and theme-related logic in `app/contexts` alongside their types.
  - Keep style entrypoints in `styles` and import them from `main.tsx` or `App.tsx` (as done in `index.css` and `fonts.css`).

- **Styling**
  - Use **Tailwind-like utility classes** (as seen in `HeroSection`, `NavBar`, and `ui` components) for layout and spacing.
  - Use **CSS variables** driven by the theme context for colors (e.g. `--color-bg`, `--color-primary`) instead of hard-coding color literals in new code.
  - For typography, follow existing choices:
    - Headings: `"Mussica Swash", "Playfair Display", serif`
    - Body and UI text: `"Montserrat", sans-serif`
  - Prefer **flex** and responsive layout utilities over fixed/absolute positioning. Use absolute positioning only for decorative elements (e.g. botanical SVGs).

- **State & logic**
  - Keep **local UI state** (open/closed, hover, scroll, form field values) in the component that owns the UI.
  - Use **contexts** for global concerns (theme palette, language, cross-section data).
  - Avoid complex state machines or heavy libraries unless truly needed.

- **Code style**
  - Use **named function components** (`export function ComponentName() { ... }`) or small inner helper components where appropriate.
  - Use **explicit interfaces and types** for props and structured data (e.g. `interface HeroSectionProps`, `interface Wish`).
  - Prefer **early returns** and short helper functions instead of deeply nested `if`/`else`.
  - Keep imports ordered: React/third-party, internal context/hooks, then local components/utilities.

## Design system & theming

- **Color palettes**
  - Extend or reuse the `ColorPalette` model defined in `AppContext.tsx` and add new palettes to the `palettes` array.
  - When adding fields, update `ColorPalette`, all palette objects, and any CSS variable wiring in one change.

- **Theming behavior**
  - Use the `useTheme` hook to access `palette` and derive inline styles for color-sensitive elements.
  - When adding new components that depend on theme colors, prefer **reading from `palette`** over introducing raw hex values.
  - If you need new color tokens, add them to `ColorPalette` and propagate them to CSS variables in `AppProvider`.

- **Typography & spacing**
  - Follow existing font stacks:
    - `"Mussica Swash", "Playfair Display", serif` for names, headings, and quote-style text.
    - `"Montserrat", sans-serif` for navigation, labels, and body copy.
  - Use `clamp(...)` for responsive font sizes on prominent text as done in `HeroSection`.
  - Use generous, consistent spacing and letter-spacing values for navigation and section labels, matching current sections.

- **Animations & motion**
  - Use `motion` components from `motion/react` for subtle entrance transitions and highlights.
  - Reuse timing and easing similar to existing components (e.g. duration around `1`, small delays chained for staged reveals).
  - Keep motion subtle, performance-friendly, and accessible (avoid excessive continuous animations beyond simple loops like the scroll indicator).

## Components

- **HeroSection**
  - Continue using a full-viewport, centered layout with layered backgrounds and decorative SVG elements.
  - Text should remain localized via `useLang().t.hero.*` and colors picked from `palette`.
  - Avoid adding business logic here; the section should be focused on presentation and scroll behavior.

- **NavBar**
  - Maintain the pattern of:
    - A fixed, scroll-reactive top nav bar.
    - A desktop layout with spaced links and CTA.
    - A mobile overlay menu controlled by internal state.
  - Use smooth scrolling and prevent default navigation when scrolling to sections with IDs.
  - Keep navigation labels and URLs driven by translations and constants, not inline strings.

- **UI primitives (`app/components/ui`)**
  - Follow the patterns in `button.tsx`:
    - Define variants with `class-variance-authority` (`cva`).
    - Use a `cn` utility to merge classes.
    - Support `asChild` when appropriate via `Slot` from `@radix-ui/react-slot`.
  - Keep each primitive **small and focused**, handling:
    - Its own variants.
    - Accessibility attributes.
    - Basic layout concerns (sizing, alignment).
  - Do not embed page-level logic or heavy state inside UI primitives.

## Contexts, translations, and data

- **App context**
  - Add new global concerns (e.g. additional theme options, locale toggles) to `AppContext.tsx` using:
    - Typed interfaces for context values.
    - `createContext` defaults that are safe no-ops for setters.
  - Whenever you add new context fields, expose them through custom hooks (`useTheme`, `useLang`) instead of importing contexts directly in components.

- **Translations**
  - For any new UI text, extend the `Translations` type and both `en` and `vi` objects in `AppContext.tsx`.
  - Avoid inline literal strings in components when they should be localizable; prefer `t.*` lookups.
  - For interpolation or pluralization, use typed helper functions (as done with `guestLabel` and `successTitle`).

## Accessibility & UX

- **Keyboard & focus**
  - Ensure interactive elements are proper HTML elements (`button`, `a`, form controls) with appropriate attributes.
  - Reuse accessible UI primitives for dialogs, menus, and overlays where possible.

- **ARIA and semantics**
  - Use semantic HTML for sections (`section`, `nav`, `footer`) and important content.
  - Add ARIA attributes only when necessary; prefer native semantics first.

- **Responsive behavior**
  - New sections and components must work gracefully from small mobile screens up to large desktops.
  - Use responsive utility classes (`md:*`, `lg:*`) instead of writing separate layouts in multiple components.

## Example: Button component guidelines

The `Button` component in `app/components/ui/button.tsx` is the primary action primitive and should be used whenever a clickable action is needed.

### Usage

- Use `Button` for actions such as submitting forms, confirming choices, or navigating with a clear call to action.
- Prefer concise, verb-first labels (e.g. “RSVP Now”, “Send Wishes”).
- When an action is destructive or high-risk, use the `destructive` variant to visually distinguish it.

### Variants

- **Primary Button**
  - **Purpose**: The main action for a view or section.
  - **Visual style**: `variant="default"` with primary brand color from the current theme.
  - **Usage**: Only one primary action per major section to guide user focus.

- **Secondary Button**
  - **Purpose**: Supporting actions that are important but not primary.
  - **Visual style**: `variant="outline"` or `variant="secondary"` depending on emphasis needed.
  - **Usage**: Can appear alongside a primary button for alternative flows.

- **Ghost / Link Button**
  - **Purpose**: Low-emphasis, inline, or text-like actions.
  - **Visual style**: `variant="ghost"` or `variant="link"` with minimal background.
  - **Usage**: Use when the action is optional or secondary to surrounding content.

- **Icon Button**
  - **Purpose**: Compact actions represented primarily by an icon.
  - **Visual style**: `size="icon"` with clear affordance and accessible label (`aria-label`).
  - **Usage**: Use sparingly for navigation toggles or small controls (e.g. mobile menu toggle).

