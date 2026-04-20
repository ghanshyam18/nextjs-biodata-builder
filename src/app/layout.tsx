import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import './globals.css';

import { ColorSchemeScript, createTheme, mantineHtmlProps, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Metadata } from 'next';

import ErrorBoundary from '../shared/components/ErrorBoundary';
import { inter, outfit } from '../shared/fonts';

const theme = createTheme({
  primaryColor: 'blue',
  defaultRadius: 'md',
  fontFamily: `${inter.style.fontFamily}, sans-serif`,
  headings: {
    fontFamily: `${outfit.style.fontFamily}, sans-serif`,
  },
  components: {
    Button: {
      defaultProps: { fw: 600 },
    },
    TextInput: {
      defaultProps: { radius: 'md', enterKeyHint: 'next' },
    },
    Select: {
      defaultProps: { radius: 'md', enterKeyHint: 'next' },
    },
    Textarea: {
      defaultProps: { radius: 'md' },
    },
  },
});

export const metadata: Metadata = {
  metadataBase: new URL('https://biodatabuilder.example.com'),
  title: 'Free Online Biodata Builder | Create Matrimonial & Marriage Biodata',
  description:
    'Generate beautiful marriage biodata in 2 minutes for free. Premium Matrimonial and Hindu biodata format maker. Download as high-quality PDF instantly.',
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
  keywords:
    'biodata maker, matrimonial biodata, free marriage biodata, online biodata builder, hindu biodata format, create biodata for marriage, biodata pdf download, secure biodata tool, marriage profile generator',
  authors: [{ name: 'Biodata Builder Inc.' }],
  openGraph: {
    type: 'website',
    url: 'https://biodatabuilder.example.com/',
    title: 'Free Online Biodata Builder | Create Matrimonial Biodata Instantly',
    description:
      'Create premium matrimonial biodata online for free in minutes. Choose from elegant templates, customize your details, and download as a high-quality PDF.',
    images: [{ url: '/logo.svg', width: 512, height: 512, alt: 'Biodata Builder Logo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online Biodata Builder | Create Matrimonial Biodata Instantly',
    description:
      'Create premium matrimonial biodata online for free in minutes. Choose from elegant templates, customize your details, and download as a high-quality PDF.',
    images: ['/logo.svg'],
  },
  alternates: {
    canonical: 'https://biodatabuilder.example.com/',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`} {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript defaultColorScheme="light" forceColorScheme="light" />
        {/* Hydration fix for browser extensions like ColorZilla (cz-shortcut-listen mismatch) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function cleanup() {
                  if (document.body && document.body.hasAttribute('cz-shortcut-listen')) {
                    document.body.removeAttribute('cz-shortcut-listen');
                  }
                }
                cleanup();
                if (typeof MutationObserver !== 'undefined') {
                  const obs = new MutationObserver(cleanup);
                  obs.observe(document.documentElement, { attributes: true, subtree: true });
                }
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <MantineProvider theme={theme} defaultColorScheme="light" forceColorScheme="light">
          <Notifications position="top-right" zIndex={2000} />
          <ErrorBoundary>{children}</ErrorBoundary>
        </MantineProvider>
      </body>
    </html>
  );
}
