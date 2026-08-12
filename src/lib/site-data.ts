// BlueBeak Capital: single source of truth for site content.
// Pricing model captured 1:1 from the original bluebeakcapital.com widget.

export const SIZES = ["5K", "10K", "25K", "50K", "100K", "150K", "200K", "250K"] as const;
export type Size = (typeof SIZES)[number];

export const PATHS = ["1 Step", "1 Step V2", "2 Step", "3 Step", "X Challenge"] as const;
export type Path = (typeof PATHS)[number];

export const PLATFORMS = ["TradeLocker", "MatchTrader"] as const;
export type Platform = (typeof PLATFORMS)[number];

export const BIRDS: Record<Size, { name: string; image: string; blurb: string }> = {
  "5K": { name: "Hummingbird", image: "/assets/birds/hummingbird.webp", blurb: "Small, fast, precise. The perfect first flight." },
  "10K": { name: "Sparrow", image: "/assets/birds/sparrow.webp", blurb: "Nimble capital for building consistency." },
  "25K": { name: "Toucan", image: "/assets/birds/toucan.webp", blurb: "A serious step up with room to maneuver." },
  "50K": { name: "Hawk", image: "/assets/birds/hawk.webp", blurb: "Sharp eyes, bigger positions, real momentum." },
  "100K": { name: "Hornbill", image: "/assets/birds/hornbill.webp", blurb: "Six figures of buying power at your command." },
  "150K": { name: "Eagle", image: "/assets/birds/eagle.webp", blurb: "Commanding altitude for proven traders." },
  "200K": { name: "Condor", image: "/assets/birds/condor.webp", blurb: "Heavyweight capital for heavyweight conviction." },
  "250K": { name: "Ostrich", image: "/assets/birds/ostrich.webp", blurb: "Our largest account. Nothing bigger on the ground." },
};

export const BASE_PRICES: Record<Size, number> = {
  "5K": 58, "10K": 79, "25K": 158, "50K": 237, "100K": 383, "150K": 632, "200K": 780, "250K": 905,
};

export const PLATFORM_MULT: Record<Platform, number> = { TradeLocker: 1, MatchTrader: 1.1 };

export const PATH_MULT: Record<Path, number> = {
  "1 Step": 1, "1 Step V2": 1.05, "2 Step": 1.1, "3 Step": 1.15, "X Challenge": 1.2,
};

export type Specs = {
  profit: string; daily: string; max: string; lev: string; reward: string; split: string;
};

export const SPECS: Record<Platform, Record<Path, Specs>> = {
  TradeLocker: {
    "1 Step": { profit: "5%", daily: "None", max: "3%", lev: "1:50", reward: "Payout on Demand", split: "Up to 100%" },
    "1 Step V2": { profit: "6%", daily: "2%", max: "4%", lev: "1:30", reward: "Weekly", split: "90%" },
    "2 Step": { profit: "7%", daily: "5%", max: "10%", lev: "1:100", reward: "Bi-Weekly", split: "80%" },
    "3 Step": { profit: "8%", daily: "4%", max: "8%", lev: "1:50", reward: "Monthly", split: "85%" },
    "X Challenge": { profit: "9%", daily: "None", max: "6%", lev: "1:200", reward: "Instant", split: "100%" },
  },
  MatchTrader: {
    "1 Step": { profit: "4%", daily: "1%", max: "4%", lev: "1:40", reward: "Instant", split: "90%" },
    "1 Step V2": { profit: "5%", daily: "3%", max: "5%", lev: "1:35", reward: "Weekly", split: "85%" },
    "2 Step": { profit: "6%", daily: "6%", max: "11%", lev: "1:80", reward: "Bi-Weekly", split: "75%" },
    "3 Step": { profit: "7%", daily: "5%", max: "9%", lev: "1:45", reward: "Monthly", split: "80%" },
    "X Challenge": { profit: "8%", daily: "None", max: "7%", lev: "1:180", reward: "Instant", split: "100%" },
  },
};

export const PHASES_BY_PATH: Record<Path, { title: string; note: string }[]> = {
  "1 Step": [
    { title: "Evaluation", note: "Hit the profit target once, with no time limit." },
    { title: "Funded Trader", note: "Trade our capital and keep up to 100% of profits." },
  ],
  "1 Step V2": [
    { title: "Evaluation", note: "One phase with a tighter drawdown and weekly payouts after." },
    { title: "Funded Trader", note: "Weekly payouts with a 90% profit split." },
  ],
  "2 Step": [
    { title: "Phase 1: Evaluation", note: "Reach the profit target while respecting the loss limits." },
    { title: "Phase 2: Verification", note: "Prove consistency a second time on the same rules." },
    { title: "Funded Trader", note: "Bi-weekly payouts on our capital." },
  ],
  "3 Step": [
    { title: "Phase 1: Evaluation", note: "Reach the target within the risk rules." },
    { title: "Phase 2: Verification", note: "Repeat it to show consistency." },
    { title: "Phase 3: Confirmation", note: "One final phase before funding." },
    { title: "Funded Trader", note: "Monthly payouts with an 85% split." },
  ],
  "X Challenge": [
    { title: "X Challenge", note: "Highest leverage, instant rewards, one aggressive phase." },
    { title: "Funded Trader", note: "Instant payouts with a 100% split." },
  ],
};

export function priceFor(size: Size, path: Path, platform: Platform): number {
  return Math.round(BASE_PRICES[size] * PLATFORM_MULT[platform] * PATH_MULT[path]);
}

export const PAYOUT_TOASTS = [
  { name: "Zion", amount: "$27,676", when: "1 minute ago" },
  { name: "Felix", amount: "$3,566", when: "just now" },
  { name: "Roman", amount: "$15,988", when: "7 minutes ago" },
];

export const CERTIFICATES = [
  { name: "Frank", amount: "$16,720", step: "1 Step", size: "$200K", date: "01/01/2026" },
  { name: "Abdul", amount: "$8,619", step: "1 Step V2", size: "$150K", date: "11/01/2026" },
  { name: "Hernandez", amount: "$13,442", step: "1 Step", size: "$150K", date: "05/01/2026" },
  { name: "Lucinda", amount: "$1,277", step: "3 Step", size: "$10K", date: "08/01/2026" },
  { name: "Edward", amount: "$2,149", step: "2 Step", size: "$50K", date: "08/01/2026" },
  { name: "Joao", amount: "$17,331", step: "3 Step", size: "$250K", date: "13/01/2026" },
  { name: "Susie", amount: "$927", step: "2 Step", size: "$5K", date: "13/01/2026" },
];

export const TESTIMONIALS = [
  {
    title: "A game changer for traders",
    body: "I have been trading for years, and this is by far the best prop firm experience I have had. The platform is stable, the rules are fair, and the profit split is among the best in the industry.",
    name: "Marie", flag: "🇬🇧",
  },
  {
    title: "Consistency actually gets rewarded here",
    body: "As a funded trader, sticking to the risk rules really paid off. I scaled my account and now keep up to 95% of my profits. I withdrew $5,000 last month with zero issues.",
    name: "Gaspar", flag: "🇪🇸",
  },
  {
    title: "Fast funding and smooth payouts",
    body: "Everything is straightforward: no hidden rules, no unnecessary restrictions. Passed the challenge, got funded quickly, and received my payout without delays.",
    name: "Aadit", flag: "🇮🇳",
  },
  {
    title: "The best prop firm for long term traders",
    body: "What convinced me to join was the scaling program. It is hands down the best I have seen so far. The team is supportive and everything is transparent.",
    name: "Aniket", flag: "🇮🇳",
  },
];

export const BENEFITS = [
  { icon: "/assets/icons/profit-split.webp", title: "Up to 100% profit split", body: "Keep up to 100% of your profits. Maximize earnings without restrictions." },
  { icon: "/assets/icons/weekly-payouts.webp", title: "Weekly payouts", body: "Withdraw your profits weekly. Over $10,000,000 has been paid to traders." },
  { icon: "/assets/icons/no-time-limits.webp", title: "No time limits", body: "Trade at your own pace. No restrictions, no deadlines." },
  { icon: "/assets/icons/competitions.webp", title: "Monthly competitions", body: "Compete monthly, showcase your skills, and win real prizes." },
  { icon: "/assets/icons/support.webp", title: "24/7 customer support", body: "Get help whenever you need it. Friendly, responsive assistance." },
  { icon: "/assets/icons/funding.webp", title: "Up to $500K in funding", body: "Access up to $500,000 in funding. Scale your trading potential." },
];

export const STEPS = [
  { n: "01", title: "Buy a challenge", body: "Pick your account size and platform. Checkout takes under a minute." },
  { n: "02", title: "Trade", body: "Hit the profit target on our capital, at your own pace. No time limits." },
  { n: "03", title: "Get paid", body: "Withdraw your profits, guaranteed within 2 business days." },
];

export const HOME_FAQ = [
  { q: "How does the challenge work?", a: "Purchase your preferred account size, reach the profit target while following our risk management rules, and get funded. There are no time limits, so you can trade at your own pace." },
  { q: "When do I receive my payouts?", a: "Payout cadence depends on your challenge path: on demand for 1 Step, weekly for 1 Step V2, bi-weekly for 2 Step, monthly for 3 Step, and instant for the X Challenge. Every payout is covered by our reward guarantee: paid within 2 business days or you receive an extra $500." },
  { q: "What is the profit split?", a: "You keep up to 100% of the profits you make, depending on your challenge path and platform. The exact split for each combination is always shown on the pricing card before you buy." },
  { q: "Are there any trading restrictions?", a: "No lot size limits, overnight and weekend holding allowed, EAs and trade copiers permitted. Cross account hedging, undisclosed copy trading, and exploiting platform errors are prohibited." },
  { q: "Can I scale my account?", a: "Yes. Make 12% within a 3 month period and we scale your capital. The scaling plan grows accounts up to $4,000,000." },
];

export const FAQ_CATEGORIES = [
  {
    key: "general", label: "General",
    items: [
      { q: "How do I become funded by BlueBeak?", a: "All traders are required to pass our evaluation process. Simply select your preferred account size and sign up for the evaluation. After completing it, you will be offered a funded account." },
      { q: "How many accounts can I trade?", a: "You can purchase and trade multiple evaluation accounts at the same time. Funded accounts can be merged up to a maximum of $400,000. Instant funding accounts cannot be merged. Our scaling plan allows you to grow your account to $4,000,000." },
      { q: "Can I have a free retry?", a: "Evaluations have unlimited time, so we do not offer retries. Take as long as you need to pass." },
      { q: "Do you have a scaling plan?", a: "Yes. Make 12% within a 3 month period and we increase your capital. The scaling plan grows accounts up to a maximum of $4,000,000." },
      { q: "Is there a breach for inactivity?", a: "Accounts with no trading activity for an extended period may be flagged. Place at least one trade every 30 days to keep your account active." },
    ],
  },
  {
    key: "affiliate", label: "Affiliate",
    items: [
      { q: "Why is this the best affiliate program in the industry?", a: "Our affiliate program is built to help you earn more, grow faster, and stay rewarded long term. You start with high commissions, and the more you grow, the more you earn. Nothing is capped and nothing is hidden." },
      { q: "How much can I earn as an affiliate?", a: "Commissions start at 15% and rise to 30% as you move up the tiers. Top affiliates also earn free funded accounts from $10K to $100K." },
      { q: "How do the affiliate tiers work?", a: "There are four tiers: Starter at 15%, Growth at 20%, Elite at 25%, and Legend at 30%. Each tier unlocks a bigger free funded account, better tools, and priority support." },
      { q: "How do I become an affiliate?", a: "Sign up through the affiliate page, get your unique referral link, and start sharing. Your dashboard tracks every click, sign up, and commission in real time." },
      { q: "What is the $1,000 affiliate loyalty bonus?", a: "Affiliates who stay active and keep referring over the long term qualify for a $1,000 loyalty bonus, paid on top of regular commissions." },
    ],
  },
  {
    key: "rules", label: "Trading rules",
    items: [
      { q: "Are EAs and trade copiers allowed?", a: "Yes. Expert advisors are allowed, and you are free to use EAs customized to your personal strategy. Trade copiers are also permitted, giving you the flexibility to manage multiple accounts efficiently." },
      { q: "Is there a max lot limit?", a: "No. We do not monitor or restrict lot sizes. Your strategy is your own: trade how you want, with no limitations on volume." },
      { q: "Can I hold overnight and trade over the weekend?", a: "Yes. Hold trades overnight and over the weekend with no restrictions, and take advantage of 24/7 crypto trading, including weekends." },
      { q: "Do you allow hedging, martingale, and trading without a stop loss?", a: "Hedging is allowed within the same account. Martingale strategies are permitted. Using a stop loss is not required: trade according to your own risk management style." },
      { q: "Is copy trading allowed?", a: "Copy trading is allowed from personal accounts that are legally bound to the account holder." },
    ],
  },
  {
    key: "platform", label: "Platform",
    items: [
      { q: "What platforms are available?", a: "BlueBeak offers TradeLocker and MatchTrader. Pick your platform when you configure your challenge." },
      { q: "What are your spreads and commissions?", a: "All accounts run on ECN spreads. Commissions: $5 per lot on forex and commodities, $0 on indices and crypto." },
      { q: "What leverage do you offer?", a: "Leverage depends on your challenge path and platform, from 1:30 up to 1:200. The exact leverage for your combination is shown on the pricing card." },
      { q: "Can I change platform?", a: "Platform changes are allowed for evaluation accounts with a clear trading history. Ongoing evaluations must first pass the trading objectives before switching." },
      { q: "Can I scale my account?", a: "Yes. The scaling plan grows accounts up to $4,000,000: make 12% in any 3 month period to qualify for an increase." },
    ],
  },
];

export const COMPETITION = {
  title: "Trading Championship",
  window: "Sep 1 to Sep 30, 2026",
  endsAt: "2026-09-30T23:59:59Z",
  stats: [
    { value: "247", label: "Participants" },
    { value: "12%", label: "Min. return target" },
    { value: "$50,000", label: "Total prize pool" },
    { value: "Top 10", label: "Winners" },
  ],
  prizes: [
    { place: "1st", amount: "$15,000", share: "30% of prize pool" },
    { place: "2nd", amount: "$10,000", share: "20% of prize pool" },
    { place: "3rd", amount: "$7,500", share: "15% of prize pool" },
    { place: "4th to 5th", amount: "$5,000", share: "10% of prize pool" },
    { place: "6th to 10th", amount: "$2,500", share: "5% of prize pool" },
  ],
  leaderboard: [
    { rank: 1, trader: "TraderAlpha", ret: "+47.3%", pnl: "+$47,300", trades: 142, win: "73.2%" },
    { rank: 2, trader: "QuantMaster", ret: "+42.1%", pnl: "+$42,100", trades: 98, win: "71.4%" },
    { rank: 3, trader: "SwingKing", ret: "+38.7%", pnl: "+$38,700", trades: 76, win: "69.7%" },
    { rank: 4, trader: "DayTradePro", ret: "+35.2%", pnl: "+$35,200", trades: 203, win: "67.5%" },
    { rank: 5, trader: "ScalpGuru", ret: "+31.8%", pnl: "+$31,800", trades: 456, win: "65.9%" },
    { rank: 6, trader: "FlexTrader", ret: "+28.4%", pnl: "+$28,400", trades: 112, win: "64.3%" },
    { rank: 7, trader: "AlgoWizard", ret: "+26.9%", pnl: "+$26,900", trades: 189, win: "63.5%" },
    { rank: 8, trader: "TrendFollower", ret: "+24.5%", pnl: "+$24,500", trades: 87, win: "61.8%" },
  ],
  rules: [
    { q: "Eligibility requirements", a: "You must be an active funded trader with the firm, your account must be in good standing with no violations, a minimum account balance of $25,000 is required, and you must have completed at least 30 days of trading history." },
    { q: "Trading rules", a: "All standard firm trading rules apply during the competition. Risk limits, prohibited strategies, and platform rules remain in force at all times." },
    { q: "Scoring system", a: "Rankings are based on percentage return over the competition window. The leaderboard updates throughout the trading day." },
    { q: "Prize distribution", a: "Prizes are distributed within 14 days of the competition ending, after final results are verified." },
    { q: "Disqualification", a: "Violation of firm trading rules or competition rules, suspected manipulation or fraudulent activity, an account falling below the minimum equity requirement, or use of prohibited strategies leads to disqualification." },
  ],
  pastWinners: [
    { window: "Dec 1 to Dec 31, 2025", ret: "+52.7%", prize: "$15,000" },
    { window: "Nov 1 to Nov 30, 2025", ret: "+44.1%", prize: "$15,000" },
    { window: "Oct 1 to Oct 31, 2025", ret: "+39.6%", prize: "$15,000" },
  ],
  faq: [
    { q: "How do I join the competition?", a: "Click the Join competition button at the top of the page. Your existing trading account is automatically enrolled, and all trades from that point forward count toward your competition score." },
    { q: "Can I enter with multiple accounts?", a: "No. Each trader competes with one account. Entering with multiple accounts leads to disqualification." },
    { q: "Can I withdraw during the competition?", a: "Yes, normal payouts remain available. Withdrawals do not affect your percentage return score." },
    { q: "How often is the leaderboard updated?", a: "The leaderboard refreshes throughout the trading day, so your position is always close to real time." },
    { q: "What happens if there is a tie?", a: "Ties are broken by risk adjusted return: the trader with the lower maximum drawdown ranks higher." },
  ],
};

export const AFFILIATE_TIERS = [
  { tier: "Tier 1", name: "Starter", pct: "15%", account: "$10K", perks: ["15% commission on all affiliate sales", "One free $10K account", "Track referrals, commissions, and payouts in real time", "Mailing access to promote offers"] },
  { tier: "Tier 2", name: "Growth", pct: "20%", account: "$25K", perks: ["20% commission", "One free $25K account", "Full access to the affiliate dashboard", "Mailing access to promote offers"] },
  { tier: "Tier 3", name: "Elite", pct: "25%", account: "$50K", perks: ["25% commission", "One free $50K account", "Access to professional tools", "24/7 affiliate support"], featured: true },
  { tier: "Tier 4", name: "Legend", pct: "30%", account: "$100K", perks: ["30% commission", "One free $100K account", "Staking program", "Proven strategy performance", "24/7 affiliate support"] },
];

export const AFFILIATE_FEATURES = [
  { title: "High demand trading programs", body: "Our funding challenges are designed for serious traders, generating strong interest, high engagement, and consistent conversions for affiliates." },
  { title: "Accurate and secure tracking", body: "Every click, sign up, and purchase is tracked accurately using secure, industry standard affiliate technology, so your commissions are always protected." },
  { title: "Fast and reliable payouts", body: "Affiliates receive timely payouts through trusted payment methods, with transparent schedules and no hidden delays." },
  { title: "Global trader audience", body: "Promote to traders worldwide. Our firm serves a global audience, so you earn commissions across regions and markets." },
  { title: "Real time affiliate dashboard", body: "Monitor clicks, conversions, funded accounts, and earnings in real time through an intuitive, transparent dashboard." },
  { title: "Proven marketing assets", body: "Access professionally designed banners, referral links, and promotional materials optimized for the prop trading audience." },
];

export const AFFILIATE_TESTIMONIALS = [
  { title: "Great conversion rate", body: "The funding challenges convert extremely well. BlueBeak makes it easy to promote with clear messaging and strong demand from traders.", name: "Marie" },
  { title: "Affiliate friendly platform", body: "The dashboard is simple, transparent, and updated in real time. Everything I need to manage my affiliate earnings is in one place.", name: "Gaspar" },
  { title: "Professional support team", body: "Any time I have had a question, the affiliate support team responded quickly and professionally. It feels like a long term partnership.", name: "Aadit" },
  { title: "Reliable tracking and on time payouts", body: "I have promoted several prop firms, but BlueBeak stands out for accurate tracking and consistent payouts. I always know where my referrals and commissions stand.", name: "Aniket" },
];

export const TRADING_RULES = [
  { q: "Position sizing and risk management", a: "Maximum daily loss and total drawdown limits depend on your challenge path and are shown on the pricing card. Position size is unrestricted but must follow the risk rules. Loss limits are calculated at end of day, 5 PM EST." },
  { q: "Trading instruments and times", a: "All instruments available on the trading platform are allowed: forex, indices, commodities, and cryptocurrencies. Trading hours are 24/5 for forex and market hours for other assets. Crypto trades 24/7, including weekends." },
  { q: "Prohibited trading strategies", a: "Hedging between multiple accounts is strictly prohibited. Copy trading or signal services must be disclosed. Tick scalping and HFT strategies are under review. Exploiting platform errors or delays results in termination." },
  { q: "Expert advisors and automation", a: "EAs and bots are allowed on all challenge tiers, and all automated strategies must comply with the risk rules. Martingale and grid strategies are not allowed. You remain responsible for your EA's trading decisions." },
  { q: "Disqualification", a: "Violation of firm trading rules, suspected manipulation or fraudulent activity, an account falling below the minimum equity requirement, failure to maintain the account in good standing, or use of prohibited strategies leads to disqualification." },
];

export const SUPPORT_EMAIL = "support@bluebeak.com";
export const DASHBOARD_URL = "https://app.bluebeakcapital.com";
// Checkout lives inside this site; checkout.bluebeakcapital.com can be
// pointed at this same Vercel project (redirect to /checkout) later.
export const CHECKOUT_URL = "/checkout";
