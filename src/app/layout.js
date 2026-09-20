import './globals.css';

export const metadata = {
  title: 'PhishLighter — AI Social Engineering Detector',
  description:
    'Detect psychological manipulation tactics in emails and messages. PhishLighter uses AI to highlight the exact phrases designed to trick you — urgency, fear, authority impersonation, and more.',
  keywords: [
    'phishing detection',
    'social engineering',
    'cybersecurity',
    'email security',
    'AI security tool',
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col relative">
        {children}
      </body>
    </html>
  );
}
