# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.3.0] - 2026-04-21

### Added
- **Native PDF Generation**: Migrated the "Traditional" template to `@react-pdf/renderer` for vector-quality, selectable-text exports.
- **Global Error Boundary**: Integrated a top-level error handling system to prevent total application crashes and improve resilience.
- **Form Reset Flow**: Added a dedicated form reset functionality with a safety confirmation modal.

### Improved
- **Mobile Performance**: Optimized main-thread responsiveness via on-demand synchronization logic.
- **Action Bars**: Refactored action bars into a modular, responsive component for better mobile accessibility.
- **Form Validation**: Enhanced `biodataSchema` and `useBiodataForm` hooks for stricter data integrity and character limits.

## [1.2.0] - 2026-04-18

### Added
- **Changelog Autopilot**: Integrated `standard-version`, `commitlint`, and `husky` for automated versioning and professional commit tracking.
- **Enterprise Linting**: Transitioned to ESLint 9 Flat Config with Next.js and TypeScript optimizations.

### Fixed
- **Input Performance**: Eliminated UI lag by implementing component memoization and debounced form state syncing.
- **Mobile UX Refinement**: Removed unnecessary `searchable` search bars from mobile selectors to prevent keyboard popup interference.
- **Time Entry**: Refactored Time of Birth to allow direct numeric input for faster data entry.
- **Print Screen View**: Strengthened A4 print consistency across different browser scaling factors.

## [1.0.0] - 2026-04-18

### Added
- **Core Architecture**: Transitioned to a feature-based structure for scalability.
- **Data Persistence**: Integrated `localforage` for multi-profile management via IndexedDB.
- **Mantine UI Integration**: Established a premium design system with 6 professional templates.
- **SEO & Performance**: Optimized meta-tags, professional typography (`Inter`/`Outfit`), and static export capabilities.

---
[1.2.0]: https://github.com/ghanshyam18/nextjs-biodata-builder/compare/v1.0.0...v1.2.0
[1.0.0]: https://github.com/ghanshyam18/nextjs-biodata-builder/releases/tag/v1.0.0
