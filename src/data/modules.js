import { Target, Zap, Package, Users, CreditCard } from 'lucide-react';

/**
 * 5-Part Playbook Curriculum Data
 * "Make Your First $100 Online"
 */
export const MODULES_DATA = [
  {
    number: '01',
    code: 'MOD-01',
    title: 'Clarity & Fundamentals',
    tagline: 'Find the one skill worth selling first',
    icon: Target,
    timeToComplete: '45 mins',
    actionItem: 'Identify your single highest-probability monetization skill using the 3-question filter.',
    topics: [
      'The math of the first $100: why reaching one buyer is easier than getting 1,000 views',
      'The 3-question skill audit: separating hobbies from commercial problems',
      'Filtering out high-friction models (no complicated funnels, no ad spend needed)',
      'Action Item: Pick your single focus track and commit to zero second-guessing'
    ],
  },
  {
    number: '02',
    code: 'MOD-02',
    title: 'The Service Bridge',
    tagline: 'Turn that skill into paid work within days',
    icon: Zap,
    timeToComplete: '60 mins',
    actionItem: 'Draft your minimum viable offer using the one-paragraph service agreement template.',
    topics: [
      'Why services bridge the gap to your first $100 faster than digital products',
      'Packaging your skill as an outcome, not an hourly rate',
      'Pricing your starter offer at $50–$100 to eliminate buyer hesitation',
      'The exact one-page scope agreement that prevents scope creep'
    ],
  },
  {
    number: '03',
    code: 'MOD-03',
    title: 'Simple Digital Products',
    tagline: 'Package what you know so it sells passively',
    icon: Package,
    timeToComplete: '90 mins',
    actionItem: 'Outline your first digital asset (checklist, template, or guide) in under 2 hours.',
    topics: [
      'The 3 types of digital products that actually sell to beginners',
      'How to structure a tactical PDF or Notion template without writing a 200-page book',
      'Pricing digital assets for instant impulse buys (₹199 to ₹499)',
      'Setting up automated digital fulfillment so you sleep while orders process'
    ],
  },
  {
    number: '04',
    code: 'MOD-04',
    title: 'Client Acquisition',
    tagline: 'Find buyers on LinkedIn, X, and their communities',
    icon: Users,
    timeToComplete: '75 mins',
    actionItem: 'Send 5 personalized outreach messages using the tested non-salesy conversation script.',
    topics: [
      'Where motivated buyers spend time: LinkedIn, X/Twitter, and niche communities',
      'The 4-sentence direct outreach script that gets a 35%+ response rate',
      'How to start conversations without sounding like a desperate pitch bot',
      'Handling objections and turning "maybe later" into an immediate invoice'
    ],
  },
  {
    number: '05',
    code: 'MOD-05',
    title: 'Payment & Delivery',
    tagline: 'Get paid without complicated infrastructure',
    icon: CreditCard,
    timeToComplete: '30 mins',
    actionItem: 'Set up your payment link and verify live payout routing directly to your bank account.',
    topics: [
      'Setting up zero-monthly-cost payment links (Razorpay, Stripe, UPI)',
      'Creating professional invoices and payment receipts in 2 minutes',
      'Delivering your work or digital download securely and confirming receipt',
      'Replicating the system: taking your first $100 and scaling to your first $1,000'
    ],
  },
];
