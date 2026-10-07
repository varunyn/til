---
name: "TIL"
description: "A quiet personal developer notes site with solid neutral surfaces and sparse orange accents."
colors:
  sorbus-50: "#fff7ed"
  sorbus-200: "#fed8aa"
  sorbus-300: "#fdbc74"
  sorbus-500: "#fa8128"
  sorbus-700: "#c2440c"
  sorbus-950: "#431507"
  page-bg: "#fafafa"
  page-fg: "#202124"
  darkgrey: "#181a1e"
  whitedarktheme: "#e0e0e0"
  body-muted: "#535963"
  metadata-muted: "#606671"
  author-ink: "#343942"
  light-divider: "#dfe1e5"
  header-divider: "#e5e7eb"
  filter-surface: "#eeeeef"
  filter-hover: "#e1e2e5"
  theme-hover: "#ededee"
  nav-muted: "#555b65"
  dark-divider: "#32363d"
  dark-muted: "#a7adb8"
  dark-filter-surface: "#292d34"
  dark-filter-text: "#bcc2cd"
  dark-filter-hover: "#383e48"
  dark-nav-active: "#2d231e"
  dark-theme-hover: "#2a2e35"
  dark-index-divider: "#d4d7dd"
  white: "#ffffff"
typography:
  display:
    fontFamily: "var(--font-heading), ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(30px, 7vw, 38px)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "var(--font-heading), ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(30px, 7vw, 38px)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.03em"
  section-title:
    fontFamily: "var(--font-heading), ui-sans-serif, system-ui, sans-serif"
    fontSize: "20px"
    fontWeight: 700
    letterSpacing: "-0.02em"
  title:
    fontFamily: "var(--font-heading), ui-sans-serif, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "-0.02em"
  ui-body:
    fontFamily: "var(--font-heading), ui-sans-serif, system-ui, sans-serif"
    fontSize: "16px"
    lineHeight: 1.6
  body:
    fontFamily: "var(--font-serif)"
    fontSize: "1.0625rem"
    lineHeight: 1.5
  label:
    fontFamily: "var(--font-heading), ui-sans-serif, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 600
  topic-label:
    fontFamily: "var(--font-heading), sans-serif"
    fontSize: "12px"
    fontWeight: 600
  nav-label:
    fontFamily: "var(--font-heading), ui-sans-serif, system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 600
  wordmark:
    fontFamily: "var(--font-heading), sans-serif"
    fontSize: "34px"
    fontWeight: 800
    letterSpacing: "-0.03em"
rounded:
  control: "12px"
  pill: "999px"
spacing:
  "4": "4px"
  "5": "5px"
  "6": "6px"
  "7": "7px"
  "8": "8px"
  "10": "10px"
  "12": "12px"
  "16": "16px"
  "18": "18px"
  "20": "20px"
  "22": "22px"
  "24": "24px"
  "28": "28px"
  "32": "32px"
  "48": "48px"
components:
  theme-button:
    rounded: "{rounded.control}"
  topic-filter:
    backgroundColor: "{colors.filter-surface}"
    textColor: "{colors.body-muted}"
    rounded: "{rounded.pill}"
    typography: "{typography.label}"
    padding: "8px 16px"
  topic-filter-selected:
    backgroundColor: "{colors.page-fg}"
    textColor: "{colors.page-bg}"
    rounded: "{rounded.pill}"
    typography: "{typography.label}"
    padding: "8px 16px"
  mobile-tab:
    textColor: "{colors.nav-muted}"
    rounded: "{rounded.control}"
    typography: "{typography.nav-label}"
  mobile-tab-current:
    backgroundColor: "{colors.sorbus-50}"
    textColor: "{colors.sorbus-700}"
    rounded: "{rounded.control}"
    typography: "{typography.nav-label}"
  note-title:
    typography: "{typography.title}"
  topic-index-link:
    textColor: "{colors.page-fg}"
  wordmark:
    typography: "{typography.wordmark}"
  search-input:
    padding: "8px 0"
---

# Design System: TIL

## Overview

**Creative North Star: "The Solid Notes Index"**

The Solid Notes Index describes a quiet personal developer site: solid neutral light and dark surfaces, smaller DM Sans headings, a plain first-person introduction, and sparse Sorbus orange accents. The lowercase til. wordmark retains its orange full stop. Paper backgrounds, notebook styling, and decorative slogans are excluded by the approved direction.

The interface keeps attention on the notes through compact, separated rows and compact orange topic labels and published dates. Navigation, search, theme controls, and topic filters support direct browsing on touch and keyboard; long-form article copy retains Source Serif 4. This document records the current code rather than adding new visual decisions.

**Key Characteristics:**

- Solid neutral light and dark canvases.
- Quiet sans-serif headings with sparse orange accents.
- Compact rows with orange topic links and published dates.
- Mobile bottom navigation with safe-area space.
- Serif article text and monospace code.

## Colors

Sorbus orange provides sparse brand emphasis, active navigation, and link feedback against a neutral canvas. The YAML frontmatter holds the exact implemented values; the names below explain their use.

### Primary

- **Sorbus deep orange** (`sorbus-700`): the light-theme wordmark full stop, active navigation, RSS link, link hover, and focus outlines.
- **Sorbus soft orange** (`sorbus-300`): the corresponding brand and link emphasis in dark mode.
- **Sorbus tint** (`sorbus-50`): the selected mobile tab in light mode.
- **Sorbus selection** (`sorbus-200`, `sorbus-950`): selected text background and foreground.
- **Sorbus medium** (`sorbus-500`): existing article links and search focus rings.

### Neutral

- **Light canvas and ink** (`page-bg`, `page-fg`): the solid canvas and primary text; the selected light-mode filter reverses them.
- **Dark canvas and ink** (`darkgrey`, `whitedarktheme`): the dark canvas and readable foreground; the selected dark-mode filter reverses them.
- **Supporting text** (`body-muted`, `metadata-muted`, `author-ink`, `nav-muted`): descriptions, counts, compact topic labels, selected-filter hover, and inactive navigation.
- **Dark supporting text** (`dark-muted`, `dark-filter-text`): metadata, navigation, and filter labels.
- **Dividers** (`light-divider`, `header-divider`, `dark-divider`, `dark-index-divider`): thin row boundaries and stronger index section rules.
- **Control surfaces** (`filter-surface`, `filter-hover`, `theme-hover`, and their dark equivalents): neutral hover feedback. `dark-nav-active` gives the orange selected tab a dark backing.
- **White** (`white`): the hover state of a selected dark-theme filter.

**The Solid Surface Rule.** Use the solid page surfaces for the header and mobile navigation; paper textures and notebook styling are excluded by the approved direction.

## Typography

**Display and interface font:** DM Sans, supplied through `--font-heading` by `next/font`, with the implemented sans-serif fallback stacks.

**Reading font:** Source Serif 4, supplied through `--font-body` and `--font-serif`, with Georgia and Times New Roman fallbacks.

**Code font:** iA Quattro, supplied locally through `--font-mono`, with the existing system monospace fallbacks.

The frontmatter records the actual role sizes and weights. Page headings use a restrained scale with tight spacing. Note titles use a medium weight and can wrap naturally; counts use tabular numerals. Supporting labels remain mixed case. The wordmark is lowercase with an orange full stop.

### Hierarchy

- **Display:** the plain Today I Learned homepage heading, with responsive scaling from 30px to 38px.
- **Headline:** the plain Topics heading at the same responsive scale.
- **Section title:** index section labels.
- **Title:** note links.
- **UI body:** introductory descriptions; the homepage description has a maximum measure of 52ch.
- **Body:** inherited article reading text; prose utilities may further style the reading container.
- **Label:** filters and secondary links.
- **Topic label:** neutral note metadata at weight 500.
- **Navigation label:** text below mobile navigation icons.

**The Reading Pair Rule.** Use DM Sans for the interface and headings; preserve Source Serif 4 for article reading text.

## Layout

The sticky header uses a centered inner container with a maximum width of 1200px and a minimum height of 72px. The notes index and topic browser use an 800px maximum width. The mobile notes container starts with 24px top padding and 20px side padding; at 768px it changes to 48px top padding and 24px sides. The main wrapper also adds its existing top padding.

Below 768px, the four-column navigation stays fixed at the bottom, with safe-area padding. The site wrapper reserves `calc(5rem + env(safe-area-inset-bottom))` below content. Navigation items have a minimum height of 52px; the wordmark, theme control, filters, and primary row links use a 44px minimum target. These are minimums, not fixed content heights.

Filters form a horizontally scrollable row with an 8px gap. Notes stack title and metadata on mobile. A compact metadata line pairs an orange topic link with the published date, separated by a middle dot. At 768px, rows use `minmax(0, 1fr) auto` columns with a 28px gap, placing metadata at the right. The topic browser uses two columns on mobile and three at 768px, with 24px column gaps. Long titles and topic names wrap. Note rows use 12px top and 8px bottom padding on mobile, changing to 14px block padding at 768px. Note-title links retain a 44px minimum height; compact topic links use a 28px minimum height and a 44px minimum width.

## Elevation & Depth

The header, navigation, notes index, and topic list have no shadows. Thin separators, the topic-browser top rule, neutral control fills, and text hierarchy establish structure. The existing search dialog retains its Tailwind `shadow-xl` and dimmed backdrop as a transient overlay; it does not establish a raised-card vocabulary for browsing.

**The Flat Index Rule.** Keep note and topic lists flat, using separators and type hierarchy rather than card shadows.

## Shapes

Controls and mobile tabs use the rounded control token. Filters use the pill token. Compact note tags are plain text without marker dots or fill. Note and topic rows have square, unfilled silhouettes with thin dividing rules. The notes index uses a thin top rule; the topic-browser grid retains its stronger top rule. Icons are outline SVGs rather than text glyphs.

## Components

### Wordmark

A bold lowercase til. link with the full stop highlighted in orange. Its minimum touch height matches the controls, and keyboard focus receives the shared outlined treatment.

### Buttons

Theme controls use the rounded control shape with neutral hover feedback. The search trigger retains its bordered rounded treatment and Sorbus focus ring. Filter buttons use the pill shape; selection reverses the neutral canvas and ink. Dark mode has its own selected and hover treatments.

### Chips

Topic filters use `aria-pressed` and remain horizontally scrollable on narrow screens. Topic links in note rows use a small orange label preserving the stored tag spelling, with a 28px minimum height and no dot or fill. Hover underlines the label. Article tags are also plain orange text links with a 28px minimum height, 4px padding, and underline feedback; their existing font and dark-theme styles are preserved.

### Rows and containers

Note rows use a title link and a compact topic/date line, without per-note arrows. Dates use a short month, day, and year and are formatted in UTC at build time; semantic time elements preserve the machine-readable date. Titles change to orange on hover. Rows retain their touch height while expanding for wrapped content. Topic-browser entries pair a topic with a tabular note count across the row. Neither pattern uses a raised card.

### Inputs and search

The search input is transparent inside the search dialog header, with interface typography and an orange caret. The dialog provides the surrounding surface, outline icons, result count, close control, and scrollable results. Focus moves into the field on open and returns to the trigger on close. Search operates on supplied article titles and tags.

### Navigation

Desktop navigation uses the header row. Mobile navigation uses four icon-and-label tabs: Notes, Topics, About, and Now. Current tabs use `aria-current` and the implemented orange/tinted state. The mobile tab bar remains persistent during route transitions. Search and theme controls stay in the top header.

### Focus and motion

The shared index and navigation focus outline is 2px Sorbus deep orange with a 4px offset. Search retains its Sorbus medium focus rings. Existing route transitions use the duration tokens recorded in the sidecar and disable animation duration and delay under reduced motion.

## Do's and Don'ts

### Do:

- Do use the existing light and dark colors and their state treatments.
- Do keep the til. wordmark consistent and use orange sparingly.
- Do preserve visible focus, semantic current/pressed states, and touch targets.
- Do retain serif article text and monospace code.
- Do account for safe-area insets and bottom navigation clearance.

### Don't:

- Don't add paper textures, notebook rules, or simulated stationery.
- Don't replace compact note rows with elevated cards.
- Don't hide topics or essential navigation behind hover.
- Don't add decorative slogans, colored headline emphasis, or per-note arrows.

Source of truth: `styles/globals.css`, `app/fonts.js`, `app/home-client.js`, `app/tags/page.js`, `components/navigation.js`, `components/notes-entry.js`, `components/search.js`, `components/layout.js`, and `app/blog/[slug]/blog-post-client.js`. This record does not replace article-specific prose styles or unchanged legacy utility components.
