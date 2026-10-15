export interface Property {
  id: string;
  title: string;
  category:"All" | "Apartments" | "Villas" | "For Rent";
  priceUSD: string;
  priceAED: string;
  location: string;
  beds: number;
  baths: number;
  areaSqft: number;
  imageUrl: string;
  tag: string;
  handover?: string;
  roi?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  experience: string;
  avatar: string;
}

export interface TailoredSolution {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  thumbnail: string;
  features: string[];
}

export interface Advantage {
  id: string;
  title: string;
  description: string;
  highlight: string;
  iconName: string;
}

export interface GalleryCategory {
  title: string;
  count: string;
  imageUrl: string;
  aspect: "square" | "tall" | "wide";
}

export interface FAQItem {
  question: string;
  answer: string;
}

export const MOCK_PROPERTIES: Property[] = [
  {
    id: "prop-1",
    title: "Azure Heights Luxury Residences",
    category: "Apartments",
    priceUSD: "$2,850,000",
    priceAED: "10,465,000 AED",
    location: "Downtown Dubai • Opera District",
    beds: 3,
    baths: 4,
    areaSqft: 3450,
    imageUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop",
    tag: "Burj Khalifa Panoramic View",
    handover: "Q4 2026",
    roi: "9.2% Estimated ROI",
  },
  {
    id: "prop-2",
    title: "The Palm Royal Beachfront Villa",
    category: "Villas",
    priceUSD: "$14,500,000",
    priceAED: "53,250,000 AED",
    location: "Palm Jumeirah • Frond N",
    beds: 6,
    baths: 7,
    areaSqft: 11200,
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
    tag: "Private Beach & Infinity Pool",
    handover: "Ready to Move",
    roi: "Private Luxury Residence",
  },
  {
    id: "prop-3",
    title: "Creek Horizon Sky Penthouse",
    category: "Apartments",
    priceUSD: "$4,650,000",
    priceAED: "17,075,000 AED",
    location: "Dubai Creek Harbour",
    beds: 4,
    baths: 5,
    areaSqft: 5200,
    imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
    tag: "360° Skyline & Water Views",
    handover: "Q2 2027",
    roi: "10.4% Rental Yield",
  },
  {
    id: "prop-4",
    title: "Bulgari Marina Private Haven",
    category: "For Rent",
    priceUSD: "$38,000 / month",
    priceAED: "140,000 AED / mo",
    location: "Jumeirah Bay Island",
    beds: 3,
    baths: 4,
    areaSqft: 4100,
    imageUrl: "https://images.unsplash.com/photo-1546412414-e1885259563a?q=80&w=1200&auto=format&fit=crop",
    tag: "Yacht Slip & Private Butler",
    handover: "Available Now",
    roi: "Ultra-Prime Rental",
  },
  {
    id: "prop-5",
    title: "Dubai Hills Royal Estate",
    category: "Villas",
    priceUSD: "$9,200,000",
    priceAED: "33,790,000 AED",
    location: "Dubai Hills Estate • Golf Course",
    beds: 5,
    baths: 6,
    areaSqft: 8900,
    imageUrl: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?q=80&w=1200&auto=format&fit=crop",
    tag: "Championship Fairway Frontage",
    handover: "Ready to Move",
    roi: "8.8% Capital Appreciation",
  },
];

export const MOCK_MAP_HOTSPOTS = [
  {
    name: "Downtown Dubai",
    type: "Ultra-Luxury High-Rises",
    avgRoi: "9.2% ROI",
    startingPrice: "$1.4M",
    top: "38%",
    left: "58%",
  },
  {
    name: "Palm Jumeirah",
    type: "Signature Water Villas",
    avgRoi: "8.5% ROI",
    startingPrice: "$4.2M",
    top: "62%",
    left: "32%",
  },
  {
    name: "Dubai Marina",
    type: "Waterfront Penthouses",
    avgRoi: "9.8% ROI",
    startingPrice: "$950K",
    top: "72%",
    left: "24%",
  },
  {
    name: "Dubai Hills Estate",
    type: "Golf Course Mansions",
    avgRoi: "8.7% ROI",
    startingPrice: "$2.9M",
    top: "48%",
    left: "68%",
  },
];

export const MOCK_TEAM: TeamMember[] = [
  {
    name: "Elena Rostova",
    role: "Senior Partner & UHNW Advisor",
    experience: "14 yrs Dubai Luxury",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop",
  },
  {
    name: "Tariq Al-Mansoor",
    role: "Head of Private Client Acquisitions",
    experience: "Over $1.2B closed",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
  },
  {
    name: "Sophia Kensington",
    role: "Director of Waterfront Properties",
    experience: "Palm & Jumeirah Specialist",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
  },
  {
    name: "Alexander Vance",
    role: "Chief Investment Strategist",
    experience: "Ex-Sovereign Wealth Analyst",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
  },
];

export const MOCK_STATS = [
  {
    targetNumber: 80,
    suffix: "+",
    label: "Successful Transactions Monthly",
    description: "Consistent off-market private acquisitions for high-net-worth individuals and family offices.",
  },
  {
    targetNumber: 97,
    suffix: "%",
    label: "Customer Satisfaction Rate",
    description: "End-to-end bespoke advisory, Golden Visa processing, and turn-key concierge onboarding.",
  },
  {
    targetNumber: 496,
    suffix: "",
    label: "Exquisite Properties Ready for Your Selection",
    description: "Curated portfolio across Downtown, Palm Jumeirah, Dubai Hills, and beachfront communities.",
  },
];

export const MOCK_SOLUTIONS: TailoredSolution[] = [
  {
    id: "sol-1",
    number: "01",
    title: "Market Analysis 01",
    subtitle: "Prime Capital Growth Projections",
    description: "In-depth quarterly macroeconomic modeling, supply-demand forecasting across tier-1 developers, and target yield optimization before public off-plan launches.",
    thumbnail: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=400&auto=format&fit=crop",
    features: ["Bespoke 5-Year Capital Appreciation Models", "Tier-1 Master Developer Allocation Priority", "Direct Escrow & Construction Progress Audits"],
  },
  {
    id: "sol-2",
    number: "02",
    title: "Market Analysis 02",
    subtitle: "Off-Plan vs. Secondary Yield Profiling",
    description: "Comparative matrix analyzing short-term holiday home rental returns (11-14% gross) versus stable long-term corporate tenancies in prime commercial corridors.",
    thumbnail: "https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=400&auto=format&fit=crop",
    features: ["Dynamic Short-term Airbnb vs Long-term Model", "Gross vs Net Cash Flow Realization", "Tax-exempt Repatriation Planning"],
  },
  {
    id: "sol-3",
    number: "03",
    title: "Investment Portfolio Structuring",
    subtitle: "Family Office & SPV Cross-Border Entity",
    description: "Structuring real estate holdings through DIFC or ADGM Foundation holding vehicles, providing multi-generational asset shielding and governance.",
    thumbnail: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=400&auto=format&fit=crop",
    features: ["DIFC / ADGM SPV Entity Setup", "Succession Planning & Asset Protection", "Multi-property Syndicate Purchasing"],
  },
  {
    id: "sol-4",
    number: "04",
    title: "Legal & Golden Visa Guidance",
    subtitle: "10-Year UAE Residency Pathway",
    description: "Full white-glove legal liaison for investors and their families qualifying for the 10-year UAE Golden Visa via property investments starting from AED 2,000,000.",
    thumbnail: "https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=400&auto=format&fit=crop",
    features: ["Complete VIP Golden Visa Processing (7-10 Days)", "Family & Domestic Staff Sponsorship", "Emirates ID & Medical VIP Lane Service"],
  },
  {
    id: "sol-5",
    number: "05",
    title: "Property Management & Concierge",
    subtitle: "Turnkey Maintenance & High-Yield Lettings",
    description: "Hands-off wealth management including luxury interior staging, high-profile vetted tenant screening, monthly yield distributions, and preventive facility maintenance.",
    thumbnail: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=400&auto=format&fit=crop",
    features: ["Bespoke Interior Staging & Photography", "24/7 Dedicated Concierge & Keyholding", "Automated Monthly Direct Bank Distributions"],
  },
];

export const MOCK_ADVANTAGES: Advantage[] = [
  {
    id: "adv-1",
    title: "Diversity",
    description: "A cosmopolitan epicenter uniting over 200 nationalities with world-class international schools, cultural landmarks, and unmatched global connectivity.",
    highlight: "200+ Nationalities",
    iconName: "Globe2",
  },
  {
    id: "adv-2",
    title: "Safety",
    description: "Consistently ranked among the top 3 safest cities on earth, offering uncompromised personal security, low crime, and peace of mind for families.",
    highlight: "Top 3 Safest Worldwide",
    iconName: "ShieldCheck",
  },
  {
    id: "adv-3",
    title: "Stable Currency",
    description: "The UAE Dirham (AED) has been strictly pegged to the US Dollar (3.6725 AED/USD) since 1997, completely insulating your wealth from foreign exchange volatility.",
    highlight: "Strict USD Peg Since 1997",
    iconName: "Coins",
  },
  {
    id: "adv-4",
    title: "Resident Visa Opportunities",
    description: "Effortlessly secure a renewable 10-Year UAE Golden Visa through real estate investments of AED 2M+ ($545K+), extending full residency privileges to your family.",
    highlight: "10-Year Golden Visa",
    iconName: "FileCheck2",
  },
  {
    id: "adv-5",
    title: "Profit Tax Exemption",
    description: "Take advantage of Dubai's sovereign fiscal incentives: 0% personal income tax, 0% capital gains tax, and 0% property tax on residential rental yields.",
    highlight: "0% Personal & Capital Gains Tax",
    iconName: "PercentSquare",
  },
  {
    id: "adv-6",
    title: "Low Mortgage Rates",
    description: "Attractive international banking credit facilities for non-resident investors, with competitive financing starting from 4.2% and up to 50-75% Loan-to-Value.",
    highlight: "Financing from 4.2%",
    iconName: "TrendingUp",
  },
  {
    id: "adv-7",
    title: "Remote Property Acquisition",
    description: "100% digital transactions supported by Dubai Land Department Smart Registry, remote power of attorney, and approved cryptocurrency settlement.",
    highlight: "100% Digital Execution",
    iconName: "Laptop",
  },
];

export const MOCK_GALLERY_CATEGORIES: GalleryCategory[] = [
  {
    title: "Penthouse Suites",
    count: "42 Units",
    imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop",
    aspect: "tall",
  },
  {
    title: "Apartments",
    count: "128 Units",
    imageUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop",
    aspect: "square",
  },
  {
    title: "Beachfront Properties",
    count: "35 Units",
    imageUrl: "https://images.unsplash.com/photo-1546412414-e1885259563a?q=80&w=800&auto=format&fit=crop",
    aspect: "wide",
  },
  {
    title: "Luxury Villas",
    count: "64 Units",
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
    aspect: "tall",
  },
  {
    title: "Townhouses",
    count: "53 Units",
    imageUrl: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?q=80&w=800&auto=format&fit=crop",
    aspect: "square",
  },
  {
    title: "Waterfront Homes",
    count: "29 Units",
    imageUrl: "https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=800&auto=format&fit=crop",
    aspect: "wide",
  },
  {
    title: "Holiday Homes",
    count: "48 Units",
    imageUrl: "https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=800&auto=format&fit=crop",
    aspect: "square",
  },
  {
    title: "Golf Course Residences",
    count: "22 Units",
    imageUrl: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?q=80&w=800&auto=format&fit=crop",
    aspect: "tall",
  },
  {
    title: "Commercial Spaces",
    count: "19 Units",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
    aspect: "square",
  },
  {
    title: "Investment",
    count: "56 Units",
    imageUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop",
    aspect: "wide",
  },
  {
    title: "Eco-friendly Properties",
    count: "16 Units",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
    aspect: "square",
  },
  {
    title: "Desert Retreats",
    count: "11 Units",
    imageUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=800&auto=format&fit=crop",
    aspect: "tall",
  },
];

export const MOCK_PARTNERS = [
  { name: "EMAAR", desc: "Master Developer of Downtown Dubai & Dubai Marina" },
  { name: "DAMAC", desc: "Luxury Fashion Branded Living & Cavalli Towers" },
  { name: "NAKHEEL", desc: "Creator of Palm Jumeirah & Waterfront Islands" },
  { name: "SOBHA", desc: "Artisanal Craftsmanship & Hartland Estates" },
  { name: "MERAAS", desc: "Iconic Urban Destinations & Bluewaters Residences" },
];

export const MOCK_FAQS: FAQItem[] = [
  {
    question: "Can foreign nationals own 100% freehold property in Dubai?",
    answer: "Yes, absolutely. Under Dubai Law No. 7 of 2006, foreign buyers and non-residents enjoy 100% freehold ownership rights in designated prime zones including Downtown Dubai, Palm Jumeirah, Dubai Marina, Dubai Creek Harbour, and Dubai Hills Estate, with full rights to sell, lease, or gift the property.",
  },
  {
    question: "What are the requirements for securing the 10-Year UAE Golden Visa?",
    answer: "Investors purchasing residential property valued at AED 2,000,000 ($545,000) or higher qualify for the prestigious 10-Year renewable UAE Golden Visa. This applies to both completed and off-plan properties through approved developers, with no requirement to continuously reside in Dubai to maintain the visa.",
  },
  {
    question: "How are investor funds protected during off-plan development?",
    answer: "Every off-plan project in Dubai is strictly governed by the Real Estate Regulatory Agency (RERA). All investor payments are paid directly into a government-regulated Escrow Account managed by an authorized bank, and funds are only disbursed to the developer upon verified construction milestones.",
  },
  {
    question: "What expected rental yields can I anticipate across prime districts?",
    answer: "Dubai offers some of the highest net rental yields in the world compared to London or New York. Long-term residential leasing yields typically average between 7% to 9% net, while managed short-term luxury holiday homes in prime tourist hotspots (Palm Jumeirah & Downtown) regularly yield 10% to 14% gross.",
  },
  {
    question: "Can I acquire a Dubai property completely remotely without traveling?",
    answer: "Yes. Al Monte facilitates 100% remote property acquisition. Through the Dubai Land Department (DLD) digital smart registry, e-signatures, verified Power of Attorney, and secure bank wire transfers or regulated digital assets, you can conclude the entire transaction from anywhere in the world.",
  },
];
