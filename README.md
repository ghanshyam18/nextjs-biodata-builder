# 💍 Biodata Builder - Premium Matrimonial Profiles

A secure, high-performance, and SEO-optimized web application to create beautiful matrimonial biodata instantly. Built with a mobile-first philosophy to ensure the best experience for all users.

![Product Banner](https://biodatabuilder.example.com/social-preview.jpg)

## 🌟 Key Features

- **🚀 Industry-Leading SEO**: Built with Next.js App Router and Static Site Generation (SSG) for instant discoverability and perfect meta-tags for Google and AI shared previews.
- **✨ Premium Templates**: 6 professionally designed templates (Traditional, Modern, Minimalist, Floral, Elegant, Classic) to suit every preference.
- **📱 Mobile-First UX**: Native app-like experience with thumb-friendly navigation, "Enter-to-Next" form logic, and 100% responsive layouts.
- **🔒 Privacy First**: Your data never leaves your device. All profiles are stored locally in your browser using **IndexedDB** — zero server dependency.
- **🖼️ High-Quality Export**: Generate and download professional PDFs instantly with cross-browser print consistency.
- **📁 Multi-Profile Support**: Save multiple profiles and switch between them effortlessly.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router & Static Export)
- **UI Library**: [Mantine UI](https://mantine.dev/) (Fully themed & Responsive)
- **Storage**: [localforage](https://localforage.github.io/localForage/) (Asynchronous IndexedDB wrapper for large data/images)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Forms**: [@mantine/form](https://mantine.dev/form/use-form/) with strict validation and XSS security.

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/biodata-builder.git
   cd biodata-builder
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📦 Deployment

This project is configured for **Static Export**, making it incredibly fast and compatible with any static hosting provider.

To generate the production-ready files:

```bash
npm run build
```

The optimized files will be generated in the `out/` directory. Simply upload this directory to your hosting provider (Vercel, Netlify, GitHub Pages, etc.).

## 🛡️ Security & Validation

- **XSS Prevention**: Strict regex-based input filtering to prevent script injection.
- **Data Limits**: Field-level character constraints to prevent database bloating and ensure UI layout stability.
- **No Tracking**: No external analytics or tracking scripts used — 100% user privacy.

## 📄 License

This project is licensed under the MIT License - feel free to use and adapt it for your own needs.

---
*Built with ❤️ for a seamless matrimonial experience.*
