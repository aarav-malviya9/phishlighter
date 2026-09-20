'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EmailAnalyzer from '@/components/EmailAnalyzer';

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1 relative z-10">
        <EmailAnalyzer />
      </main>
      <Footer />
    </>
  );
}
