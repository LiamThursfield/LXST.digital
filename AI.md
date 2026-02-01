# AI Architectural Guidance for LXST.digital

## Project Overview

LXST.digital is a high-performance, SEO-friendly website template built with Nuxt 4, Tailwind CSS 4, and shadcn-vue. It aims to provide a premium feel with clean, reusable code.

## Business Context & Goals

### 1. Positioning
- **Identity**: "We" (Agency Persona). A Digital Product Agency.
- **Tone**: Professional, High-End, Trustworthy, Innovative.

### 2. Services
- **Bespoke Websites**: CMS/CRM powered sites for niche industries (Barbershops, Pubs, DJs/Artists).
- **Web Applications**: Custom web software (e.g., DJ library management).
- **Tech Stack Support**: Maintenance/Upgrades for Nuxt/Vue/Laravel projects.

### 3. Target Audience
- Small businesses seeking premium digital presence.
- Artists/DJs needing professional tools.
- Existing site owners needing technical help.

## Key Architectures

### 1. Nuxt 4 App Directory

- All source files are located in the `app/` directory.
- `app/pages/` for routing.
- `app/components/` for reusable Vue components.
- `app/assets/` for global CSS and static assets.
- `app/lib/` for utility functions.

### 2. Tailwind CSS 4 (CSS-first)

- We use the new `@theme` block in `app/assets/css/tailwind.css`.
- Avoid `tailwind.config.js` unless absolutely necessary for external plugins.
- We use the new `@theme` block in `app/assets/css/tailwind.css`.
- Avoid `tailwind.config.js` unless absolutely necessary for external plugins.
- **CRITICAL**: Use CSS variables defined in the theme for consistent styling.
    - **DO NOT** use arbitrary or default Tailwind colors like `bg-red-500` or `text-blue-600`.
    - **ALWAYS** use theme tokens (e.g., `bg-primary`, `text-muted-foreground`, `border-border`).
    - Verify colors in `app/assets/css/tailwind.css` before implementing.

### 3. shadcn-vue Integration

- Foundational components are in `app/components/ui/`.
- Use the shadcn command to proactively identify and add missing, useful components: `npx shadcn-vue@latest add <component>`.
- Wrap shadcn components in domain-specific components when logic grows complex.

### 4. SEO and Performance

- Use `useSeoMeta` in every page.
- Use `<NuxtImg>` for all images to leverage Nuxt Image's optimization.
- Ensure all interactive elements are accessible (Aria-labels, proper focus states).

### 5. Responsiveness

- Ensure all designs are fully responsive (mobile-first approach).
- Test layouts across standard breakpoints to guarantee a seamless experience on all devices.

## Reusable Patterns

### Layouts

- Use `app/layouts/default.vue` for the main page structure.
- Define Slot-based layouts for flexibility.

### Data Fetching

- Use `useAsyncData` or `useFetch` for SSR-compatible data retrieval.
- Implement proper loading states using `Skeleton` components.

### Form Handling

- Use `shadcn-vue` form components combined with `vee-validate` if complex validation is needed.

### Styling & Reusability

- Avoid repeating complex class strings.
- Use Tailwind `@theme` variables or extract reusable components/utilities for repeated styles to reduce code duplication.

## AI Interaction Standards

- **Wait for Approval**: Always produce a detailed plan for approval (allowing for adjustments) before implementing any changes. Do not proceed to EXECUTION mode until the plan is approved.
- **Ask Before Guessing**: Do not guess. If there are any ambiguities or further details needed, pause and ask questions before implementing.
- **Proactive Search**: Use `grep_search` and `find_by_name` to understand existing patterns before proposing changes.

## Best Practices

- **Hydration**: Be careful with components that depend on client-only APIs (like `window`). Wrap them in `<ClientOnly>` if needed.
- **Micro-animations**: Use Tailwind transitions or libraries like `Motion` for subtle, premium micro-interactions.
- **Clean Code**: Follow the "Single Responsibility Principle" for components. If a component is getting too large, break it down.
