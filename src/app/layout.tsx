import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Colegio Sugamuxi - Plataforma Química',
  description:
    'Plataforma digital de química del Colegio Sugamuxi. Laboratorio virtual, base de datos química y recursos educativos.',
  keywords: [
    'Colegio Sugamuxi',
    'química',
    'plataforma educativa',
    'laboratorio virtual',
    'educación',
  ],
  authors: [{ name: 'Colegio Sugamuxi' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#22c55e',
  openGraph: {
    title: 'Colegio Sugamuxi - Plataforma Química',
    description: 'Plataforma digital de química del Colegio Sugamuxi',
    type: 'website',
    locale: 'es_CO',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='es' className='sugamuxi-theme'>
      <head>
        <meta name='color-scheme' content='light' />
        <link rel='icon' href='/Logo.png' type='image/png' />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased sugamuxi-theme`}
      >
        <AuthProvider>
          <div className='min-h-screen bg-background text-foreground'>
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
