// ============================================================
// PhishLighter — Sample Emails & Pre-Computed Mock Analyses
// These ensure the demo ALWAYS works, even without an API key.
// ============================================================

export const sampleEmails = [
  {
    id: 'ceo-fraud',
    name: 'CEO Wire Transfer',
    category: 'Business Email Compromise',
    icon: '👔',
    content: `Subject: Urgent - Confidential Acquisition Wire Transfer

Hi Sarah,

I need you to handle something urgently and confidentially. We're finalizing an acquisition that hasn't been publicly announced yet. I need you to process a wire transfer of $47,500 to the following account before end of business today.

Account: First National Bank
Routing: 021000021
Account #: 1234567890
Reference: Project Atlas

Please don't discuss this with anyone else on the team until the deal is formally announced on Monday. I'm in back-to-back board meetings and can only be reached via this email.

Thanks for handling this quickly.

James Morrison
CEO, Meridian Technologies`,
  },
  {
    id: 'account-phishing',
    name: 'Account Suspended',
    category: 'Credential Phishing',
    icon: '🔒',
    content: `Subject: ⚠️ Action Required: Your Account Has Been Compromised

Dear Valued Customer,

We have detected unusual sign-in activity on your Microsoft 365 account from an unrecognized device in Moscow, Russia. For your protection, we have temporarily limited your account access.

If you do not verify your identity within 24 hours, your account will be permanently suspended and all associated data, including emails, OneDrive files, and Teams messages, will be permanently deleted.

Click here to verify your identity now: https://microsoft365-secure-verify.com/auth

If you did not attempt to sign in from this location, your account may already be compromised. Immediate action is required.

Microsoft Account Security Team
Microsoft Corporation
One Microsoft Way, Redmond, WA 98052`,
  },
  {
    id: 'package-scam',
    name: 'Delivery Scam',
    category: 'Package Delivery Scam',
    icon: '📦',
    content: `Subject: UPS Delivery Failed - Action Required

Hello,

We attempted to deliver your package (Tracking #: 1Z999AA10123456784) today but were unable to complete the delivery due to an incomplete address.

Your package is being held at our local facility and will be returned to the sender within 3 business days if we don't hear from you.

To reschedule your delivery, please confirm your address and pay the redelivery fee of $2.99:

https://ups-redelivery-schedule.com/confirm

If you believe this is an error, please contact our support team.

UPS Customer Service
United Parcel Service`,
  },
  {
    id: 'crypto-scam',
    name: 'Investment Scam',
    category: 'Advance Fee / Crypto Scam',
    icon: '💰',
    content: `Subject: Re: So nice catching up!

Hey! It was so great reconnecting at Mike's party last weekend. I've been thinking about what you said about wanting to invest more.

So I actually have this incredible opportunity I wanted to share with you privately. My uncle works at a crypto exchange in Singapore and they're doing a private pre-sale of a new token that's going to be listed on Binance next month. The minimum buy-in is $500 but people who got in early on their last token saw 40x returns in two weeks.

I already put in $2,000 and it's already up 15%! I can send you the link to the private portal if you want. But you'd need to get in by Friday because the pre-sale closes.

Don't mention this to anyone else though - the pre-sale is invite-only and my uncle could get in trouble if too many people find out.

Let me know! 😊
Jessica`,
  },
  {
    id: 'legitimate',
    name: 'Legitimate Email',
    category: 'Safe / Legitimate',
    icon: '✅',
    content: `Subject: Team standup notes - September 19

Hi team,

Here are the notes from today's standup:

- Backend API migration is on track for the October 1st deadline
- QA found 3 bugs in the new dashboard, tickets created in Jira (BUG-234, BUG-235, BUG-236)
- Design review for the settings page is scheduled for Thursday at 2pm
- Reminder: office closed Monday for the holiday

Action items:
- @David: Update the API documentation by Wednesday
- @Lisa: Review the QA tickets and estimate fixes
- @Everyone: Please submit your Q3 self-reviews by end of next week

Let me know if I missed anything.

Best,
Alex Chen
Engineering Manager`,
  },
];

// Pre-computed analysis results for each sample email
// These are used as fallbacks when no API key is configured
export const mockAnalyses = {
  'ceo-fraud': {
    riskScore: 92,
    riskLevel: 'CRITICAL',
    summary:
      'This email exhibits classic Business Email Compromise (BEC) patterns: an authority figure requesting an urgent, secret wire transfer — the #1 most costly form of cybercrime according to the FBI.',
    tactics: [
      {
        id: 'urgency-1',
        tactic: 'Artificial Urgency',
        quote: 'before end of business today',
        explanation:
          'This creates intense time pressure to prevent you from following normal verification procedures. Legitimate financial requests always allow time for proper approval chains.',
        severity: 'critical',
      },
      {
        id: 'authority-1',
        tactic: 'Authority Impersonation',
        quote: 'James Morrison\nCEO, Meridian Technologies',
        explanation:
          'Impersonating the CEO exploits organizational hierarchy — employees feel they cannot question or delay a direct request from the highest authority.',
        severity: 'critical',
      },
      {
        id: 'secrecy-1',
        tactic: 'Forced Secrecy',
        quote: "Please don't discuss this with anyone else on the team until the deal is formally announced on Monday",
        explanation:
          'Demanding secrecy prevents you from verifying the request with colleagues who would immediately recognize it as fraudulent. Legitimate business never requires hiding financial transactions from your team.',
        severity: 'high',
      },
      {
        id: 'unusual-1',
        tactic: 'Unusual Requests',
        quote: 'process a wire transfer of $47,500 to the following account',
        explanation:
          'Requesting a large wire transfer via email — bypassing standard financial approval processes — is a hallmark of business email compromise fraud.',
        severity: 'critical',
      },
      {
        id: 'concealment-1',
        tactic: 'Identity Concealment',
        quote: "I'm in back-to-back board meetings and can only be reached via this email",
        explanation:
          'This excuse prevents you from calling to verify the request by phone. Real executives can always be reached through their assistant or an alternative channel for a $47,500 decision.',
        severity: 'high',
      },
      {
        id: 'urgency-2',
        tactic: 'Artificial Urgency',
        quote: 'handle something urgently and confidentially',
        explanation:
          'Doubling down on urgency and secrecy in the opening line sets the psychological frame before you can think critically about the request.',
        severity: 'high',
      },
    ],
    isLegitimate: false,
  },

  'account-phishing': {
    riskScore: 88,
    riskLevel: 'CRITICAL',
    summary:
      'This is a classic credential phishing email that impersonates Microsoft to steal your login credentials. It uses fear of data loss and a fake verification link to trick you into entering your password on a spoofed website.',
    tactics: [
      {
        id: 'fear-1',
        tactic: 'Fear & Threats',
        quote:
          'your account will be permanently suspended and all associated data, including emails, OneDrive files, and Teams messages, will be permanently deleted',
        explanation:
          'Threatening total data loss creates panic that overrides rational thinking. Real companies never permanently delete your data over a 24-hour window without extensive prior notice.',
        severity: 'critical',
      },
      {
        id: 'urgency-1',
        tactic: 'Artificial Urgency',
        quote: 'If you do not verify your identity within 24 hours',
        explanation:
          'A 24-hour deadline creates artificial time pressure. Microsoft would never give you only one day before deleting all your data — they send multiple notices over weeks.',
        severity: 'critical',
      },
      {
        id: 'tech-1',
        tactic: 'Technical Deception',
        quote: 'https://microsoft365-secure-verify.com/auth',
        explanation:
          'This URL looks official but is NOT a Microsoft domain. The real Microsoft domain is microsoft.com — this is a look-alike domain designed to steal your password when you "verify" your identity.',
        severity: 'critical',
      },
      {
        id: 'authority-1',
        tactic: 'Authority Impersonation',
        quote: 'Microsoft Account Security Team\nMicrosoft Corporation',
        explanation:
          'Impersonating Microsoft\'s security team lends false credibility. The professional-looking signature with a real address is designed to make you trust the message without questioning it.',
        severity: 'high',
      },
      {
        id: 'fear-2',
        tactic: 'Fear & Threats',
        quote: 'unusual sign-in activity on your Microsoft 365 account from an unrecognized device in Moscow, Russia',
        explanation:
          'Mentioning a specific foreign location (Russia) triggers fear of being hacked by a foreign adversary, increasing urgency to "secure" your account immediately.',
        severity: 'high',
      },
      {
        id: 'urgency-2',
        tactic: 'Artificial Urgency',
        quote: 'Immediate action is required',
        explanation:
          'This closing reinforcement of urgency is a final push to get you to click the malicious link before taking time to think or verify.',
        severity: 'medium',
      },
    ],
    isLegitimate: false,
  },

  'package-scam': {
    riskScore: 65,
    riskLevel: 'HIGH',
    summary:
      'This is a package delivery scam that impersonates UPS to steal your personal information and credit card details through a fake redelivery fee. Real delivery companies never charge fees via random email links.',
    tactics: [
      {
        id: 'tech-1',
        tactic: 'Technical Deception',
        quote: 'https://ups-redelivery-schedule.com/confirm',
        explanation:
          'This is NOT a real UPS domain. The legitimate UPS website is ups.com — this look-alike domain will steal your address and payment information.',
        severity: 'critical',
      },
      {
        id: 'urgency-1',
        tactic: 'Artificial Urgency',
        quote: 'will be returned to the sender within 3 business days',
        explanation:
          'A short return deadline creates pressure to act quickly without verifying the email. In reality, UPS holds packages for much longer and sends multiple notices.',
        severity: 'medium',
      },
      {
        id: 'unusual-1',
        tactic: 'Unusual Requests',
        quote: 'confirm your address and pay the redelivery fee of $2.99',
        explanation:
          'The small fee amount is intentional — $2.99 seems too trivial to be a scam, making you less suspicious about entering your credit card details. UPS does not charge redelivery fees via email.',
        severity: 'high',
      },
      {
        id: 'authority-1',
        tactic: 'Authority Impersonation',
        quote: 'UPS Customer Service\nUnited Parcel Service',
        explanation:
          'Impersonating a trusted delivery brand makes the email feel routine and expected, especially if you frequently order packages online.',
        severity: 'medium',
      },
    ],
    isLegitimate: false,
  },

  'crypto-scam': {
    riskScore: 85,
    riskLevel: 'CRITICAL',
    summary:
      'This is an investment/crypto scam using fake familiarity and manufactured urgency. The "incredible opportunity" with guaranteed returns, secrecy requirements, and a tight deadline are textbook signs of advance-fee fraud.',
    tactics: [
      {
        id: 'reward-1',
        tactic: 'Reward Baiting',
        quote: 'people who got in early on their last token saw 40x returns in two weeks',
        explanation:
          'Promising extraordinary returns (40x in two weeks) is the core bait. No legitimate investment can guarantee these returns — this is a classic Ponzi/pump-and-dump tactic.',
        severity: 'critical',
      },
      {
        id: 'trust-1',
        tactic: 'Trust Exploitation',
        quote: "It was so great reconnecting at Mike's party last weekend",
        explanation:
          'Referencing a shared social event creates a false sense of existing trust and friendship, making you less likely to question the "opportunity" they are pitching.',
        severity: 'high',
      },
      {
        id: 'secrecy-1',
        tactic: 'Forced Secrecy',
        quote: "Don't mention this to anyone else though - the pre-sale is invite-only and my uncle could get in trouble if too many people find out",
        explanation:
          'Demanding secrecy prevents you from getting advice from others who would recognize the scam. The "uncle could get in trouble" adds emotional guilt to enforce silence.',
        severity: 'high',
      },
      {
        id: 'urgency-1',
        tactic: 'Artificial Urgency',
        quote: "you'd need to get in by Friday because the pre-sale closes",
        explanation:
          'A closing deadline prevents you from doing research that would reveal the scam. Legitimate investments never require snap decisions.',
        severity: 'high',
      },
      {
        id: 'emotional-1',
        tactic: 'Emotional Manipulation',
        quote: "I already put in $2,000 and it's already up 15%!",
        explanation:
          'Claiming personal investment with visible gains creates FOMO (fear of missing out) and social proof — "if she\'s making money, I should too." This is fabricated to lower your defenses.',
        severity: 'high',
      },
      {
        id: 'reward-2',
        tactic: 'Reward Baiting',
        quote: 'I wanted to share with you privately',
        explanation:
          'Framing this as an exclusive, personal favor makes you feel special and selected, increasing your emotional investment in the "opportunity" before you even evaluate it.',
        severity: 'medium',
      },
    ],
    isLegitimate: false,
  },

  legitimate: {
    riskScore: 5,
    riskLevel: 'LOW',
    summary:
      'This appears to be a legitimate internal team email. It contains routine standup meeting notes, references real project work, and makes no unusual requests. No social engineering tactics detected.',
    tactics: [],
    isLegitimate: true,
    legitimateReasons: [
      'Contains routine, verifiable meeting notes with specific Jira ticket numbers',
      'Action items are standard work tasks (documentation, code review) with reasonable deadlines',
      'No links to external sites, no requests for sensitive information',
      'Sender identifies as a known team member with a specific role',
      'Tone is professional and consistent with normal workplace communication',
      'No urgency, threats, secrecy demands, or emotional manipulation',
    ],
  },
};

/**
 * Hash a string to produce a simple numeric hash.
 * Used to find the closest mock analysis for custom text.
 */
function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

/**
 * For custom (non-sample) emails when in demo mode, return a generic analysis
 * based on keyword heuristics.
 */
export function generateFallbackAnalysis(text) {
  const lower = text.toLowerCase();
  const tactics = [];
  let riskScore = 10;

  const urgencyWords = ['urgent', 'immediately', 'asap', 'right away', 'act now', 'within 24 hours', 'expires', 'deadline', 'hurry', 'time-sensitive'];
  const threatWords = ['suspend', 'terminated', 'delete', 'legal action', 'lawsuit', 'arrest', 'blocked', 'compromised', 'hacked', 'unauthorized'];
  const rewardWords = ['winner', 'congratulations', 'prize', 'free', 'reward', 'refund', 'cashback', 'bonus', 'gift card', 'won'];
  const secrecyWords = ["don't tell", "don't share", 'keep this between', 'confidential', "don't discuss", 'private', 'secret'];
  const requestWords = ['password', 'ssn', 'social security', 'credit card', 'wire transfer', 'bank account', 'routing number', 'verify your', 'confirm your identity'];
  const linkPattern = /https?:\/\/[^\s]+/g;

  urgencyWords.forEach((word) => {
    const idx = lower.indexOf(word);
    if (idx !== -1) {
      riskScore += 15;
      const start = Math.max(0, idx - 10);
      const end = Math.min(text.length, idx + word.length + 30);
      tactics.push({
        id: `urgency-${tactics.length}`,
        tactic: 'Artificial Urgency',
        quote: text.slice(start, end).trim(),
        explanation: `The phrase "${word}" creates artificial time pressure to prevent careful evaluation of this message.`,
        severity: riskScore > 60 ? 'high' : 'medium',
      });
    }
  });

  threatWords.forEach((word) => {
    const idx = lower.indexOf(word);
    if (idx !== -1) {
      riskScore += 15;
      const start = Math.max(0, idx - 10);
      const end = Math.min(text.length, idx + word.length + 30);
      tactics.push({
        id: `threat-${tactics.length}`,
        tactic: 'Fear & Threats',
        quote: text.slice(start, end).trim(),
        explanation: `Threatening language like "${word}" is used to create panic and override rational thinking.`,
        severity: 'high',
      });
    }
  });

  rewardWords.forEach((word) => {
    const idx = lower.indexOf(word);
    if (idx !== -1) {
      riskScore += 12;
      const start = Math.max(0, idx - 10);
      const end = Math.min(text.length, idx + word.length + 30);
      tactics.push({
        id: `reward-${tactics.length}`,
        tactic: 'Reward Baiting',
        quote: text.slice(start, end).trim(),
        explanation: `Promising "${word}" exploits greed and excitement to lower your defenses.`,
        severity: 'medium',
      });
    }
  });

  secrecyWords.forEach((word) => {
    const idx = lower.indexOf(word);
    if (idx !== -1) {
      riskScore += 18;
      const start = Math.max(0, idx - 10);
      const end = Math.min(text.length, idx + word.length + 30);
      tactics.push({
        id: `secrecy-${tactics.length}`,
        tactic: 'Forced Secrecy',
        quote: text.slice(start, end).trim(),
        explanation: `Demanding secrecy prevents you from verifying the message with trusted people who would recognize the manipulation.`,
        severity: 'high',
      });
    }
  });

  requestWords.forEach((word) => {
    const idx = lower.indexOf(word);
    if (idx !== -1) {
      riskScore += 20;
      const start = Math.max(0, idx - 10);
      const end = Math.min(text.length, idx + word.length + 30);
      tactics.push({
        id: `request-${tactics.length}`,
        tactic: 'Unusual Requests',
        quote: text.slice(start, end).trim(),
        explanation: `Requesting "${word}" via email is a major red flag. Legitimate organizations never ask for sensitive information this way.`,
        severity: 'critical',
      });
    }
  });

  const links = text.match(linkPattern);
  if (links) {
    links.forEach((link) => {
      // Check for suspicious domains
      const isSuspicious = !link.includes('google.com') && !link.includes('microsoft.com') && !link.includes('github.com');
      if (isSuspicious) {
        riskScore += 10;
        tactics.push({
          id: `link-${tactics.length}`,
          tactic: 'Technical Deception',
          quote: link,
          explanation: `This link may lead to a phishing site designed to steal your credentials. Always verify URLs by checking the actual domain name before clicking.`,
          severity: 'medium',
        });
      }
    });
  }

  riskScore = Math.min(riskScore, 95);

  const riskLevel = riskScore >= 81 ? 'CRITICAL' : riskScore >= 51 ? 'HIGH' : riskScore >= 21 ? 'MEDIUM' : 'LOW';
  const isLegitimate = riskScore <= 20;

  return {
    riskScore,
    riskLevel,
    summary: isLegitimate
      ? 'This message appears to be legitimate. No significant social engineering tactics were detected.'
      : `This message contains ${tactics.length} potential social engineering tactic(s) that could be used to manipulate the reader.`,
    tactics,
    isLegitimate,
    legitimateReasons: isLegitimate
      ? ['No urgency, threats, or unusual requests detected', 'No suspicious links found']
      : undefined,
  };
}
