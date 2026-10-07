# Changelog

## [Unreleased]

### Added

- Search articles by title or tag, including queries with multiple words, directly from the mobile header.

### Changed

- Use native React transitions for article-title morphs, directional article navigation, and section fades, with reduced-motion support.
- Send only the article summaries needed by homepage and tag listings to reduce page data.
- Update all direct packages to their latest stable releases and apply compatible dependency security fixes.
- Upgrade to Next.js 16.4 for its build and production bundle improvements while preserving static export.

### Fixed

- Keep search keyboard focus inside the dialog as results change, support Escape and a visible Close button, and prevent background scrolling.
- Restore globe rotation, keep its speed consistent across refresh rates, and pause rendering when offscreen, in a hidden tab, or when reduced motion is requested.
