import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import BuilderContainer from '../features/builder/components/BuilderContainer';

// Font optimization: Preload premium fonts to avoid layout shift
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({ 
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

// SEO Metadata API: Enterprise-standard SEO
export const metadata: Metadata = {
  title: 'Professional Biodata Builder | Create & Save Biodata for Marriage',
  description: 'Create beautiful, printable marriage biodata in minutes. Choose from elegant templates, save multiple profiles, and download as high-quality PDF. Privacy-first, local storage used.',
  keywords: ['biodata builder', 'marriage biodata', 'matrimonial biodata', 'pdf biodata', 'online biodata creator'],
  openGraph: {
    title: 'Professional Biodata Builder',
    description: 'Create & Save beautiful marriage biodata with ease.',
    url: 'https://biodatabuilder.com', // Replace with actual domain
    siteName: 'Biodata Builder',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Professional Biodata Builder',
    description: 'Create & Save beautiful marriage biodata with ease.',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function Home() {
  return (
    <main className={`${inter.variable} ${outfit.variable}`}>
       <BuilderContainer />
    </main>
  );
}
