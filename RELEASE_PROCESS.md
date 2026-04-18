# Release and Deployment Process

This document outlines the standard operating procedures for making changes and deploying the Biodata Builder application. Following these steps ensures high stability and "fund seva" reliability.

## 🟢 1. Local Development
Always create a new branch for your changes. Never work directly on `main`.

```bash
git checkout -b feat/your-feature-name
```

## 🔵 2. Commit Standards
We use **Conventional Commits**. This allows us to track changes clearly in the Git history.
- `feat:` A new feature for the user.
- `fix:` A bug fix.
- `docs:` Documentation only changes.
- `chore:` Changes that do not affect the source code (e.g., config changes).

## 🟡 3. Pull Requests & Previews
1. Push your branch to GitHub.
2. Open a **Pull Request (PR)** on GitHub.
3. **Verify via Vercel Preview**: Vercel will automatically post a unique URL to your PR.
   - Open that URL.
   - Test "Save", "Load", and "Print PDF".
   - Confirm fonts and layout are correct.

## 🔴 4. Merging to Production (Main)
Only merge the PR into `main` after:
1. The code builds successfully on Vercel.
2. You have manually verified the changes on the Preview URL.

## 🚀 5. Versioning & Changelog
When you are ready to "Release" a set of changes:
1. Update the `version` in `package.json`.
2. Update the `CHANGELOG.md` with the new version and its changes.
3. Commit these as `chore: release vX.X.X`.
4. Tag the commit: `git tag vX.X.X` and `git push --tags`.

---
*By following this process, we ensure that every user gets a stable, high-performance experience every time they visit the site.*
