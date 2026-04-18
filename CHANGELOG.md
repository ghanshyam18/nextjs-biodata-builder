# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.


## [1.0.0] - 2026-04-18

### Added
- **Enterprise Architecture**: Transitioned to a feature-based structure (`src/features`, `src/shared`).
- **Zod Validation**: Robust schema-based form validation for all biodata fields.
- **Dynamic Template Loading**: Initial implementation of lazy-loading templates using `next/dynamic` for performance.
- **Profiles Management**: Ability to save, load, and delete multiple biodata profiles via `localforage`.
- **SEO Optimization**: Metadata API integration, `robots.ts`, and `sitemap.ts` for professional search engine presence.
- **Premium Typography**: Integration of `Inter` and `Outfit` via `next/font/google`.
- **Git Initialization**: Formal repository structure with optimized `.gitignore`.

### Fixed
- **Font Flickering**: Resolved layout shift by moving font definitions to the root layout and Mantine theme.
- **Action Reliability**: Fixed `crypto.randomUUID` dependency to support non-secure (HTTP/IP) environments.
- **Live Preview Sync**: Improved reactivity of the preview section in uncontrolled form mode.

### Changed
- **Form Management**: Refactored from monolithic state to a focused `useBiodataForm` custom hook.
- **Layout**: Standardized common UI elements into `src/shared/components/layout`.

---

[1.0.0]: https://github.com/ghanshyam18/nextjs-biodata-builder/releases/tag/v1.0.0
