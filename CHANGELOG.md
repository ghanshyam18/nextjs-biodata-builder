# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## 1.3.0 (2026-04-18)


### Features

* automate changelog generation and simplify select component UX ([20bc6f6](https://github.com/ghanshyam18/nextjs-biodata-builder/commit/20bc6f634316d1639a1b86470a6857e3baf9235b))
* implement dedicated print container with A4 dimensions for high-fidelity PDF exports ([f09e6a4](https://github.com/ghanshyam18/nextjs-biodata-builder/commit/f09e6a4f54f3c5cb4e6f97aecae220213f2b069d))


### Bug Fixes

* ensure preview visibility by providing explicit minimum height ([ae84236](https://github.com/ghanshyam18/nextjs-biodata-builder/commit/ae84236ae8749482309eb0f0e5fe4a29feb2ca60))
* optimize global font integration and align Mantine theme for production ([c8cc8e1](https://github.com/ghanshyam18/nextjs-biodata-builder/commit/c8cc8e1fd3a3fe831a2367e4bfbf1491b99f99c2))
* resolve theme inconsistency and mobile preview overlap ([87a660c](https://github.com/ghanshyam18/nextjs-biodata-builder/commit/87a660c66c7e7de7f69f3b59a4be16f863ccc778))

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
