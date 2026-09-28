import planPricing from './pricing.json';

// ════════════════════════════════════════════════════════════
// SIGMA ERP — CENTRAL BRAND CONFIGURATION
// Edit this file to update branding, contact info, pricing,
// testimonials, and product content across the entire site.
// ════════════════════════════════════════════════════════════

export const brand = {
  name: 'Sigma ERP',
  tagline: 'Complete Business Management Software',
  description:
    'A complete business management solution for modern Indian businesses.',
  logoUrl: '/image.png',
};

export const appRelease = {
  version: 'v1.0.0',
  downloadUrl: '/SigmaERP-Setup-v1.0.0.exe',
};

export const contact = {
  email: 'hello@sigmaerp.in',
  phone: '+91 00000 00000',
  // Include country code, no +, for wa.me link
  whatsappNumber: '910000000000',
};

export const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Product', href: '#product' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Resources', href: '#faq' },
];

export const trustItems = [
  { label: 'GST Ready', icon: 'Receipt' },
  { label: 'Real-Time Inventory', icon: 'Boxes' },
  { label: 'Fast Billing', icon: 'Zap' },
  { label: 'Powerful Reports', icon: 'BarChart3' },
  { label: 'Secure & Reliable', icon: 'ShieldCheck' },
] as const;

export const productModules = [
  { name: 'Sales', icon: 'TrendingUp', desc: 'Track every sale and outstanding payment' },
  { name: 'Billing', icon: 'Receipt', desc: 'Create professional GST invoices in seconds' },
  { name: 'Inventory', icon: 'Boxes', desc: 'Real-time stock levels and batch tracking' },
  { name: 'Purchases', icon: 'ShoppingCart', desc: 'Manage suppliers and purchase orders' },
  { name: 'Customers', icon: 'Users', desc: 'Complete customer relationship management' },
  { name: 'Suppliers', icon: 'Truck', desc: 'Supplier records and purchase history' },
  { name: 'Reports', icon: 'BarChart3', desc: 'Business intelligence and analytics' },
  { name: 'GST', icon: 'FileText', desc: 'CGST, SGST, IGST calculations made simple' },
  { name: 'Users & Permissions', icon: 'ShieldCheck', desc: 'Role-based access for your team' },
] as const;

export type Feature = {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  benefits: string[];
  icon: string;
  mockup: 'billing' | 'inventory' | 'purchase' | 'sales' | 'gst' | 'reports';
  reverse?: boolean;
};

export const features: Feature[] = [
  {
    id: 'billing',
    category: 'Billing',
    title: 'Smart Billing',
    subtitle: 'Create professional invoices in seconds.',
    description:
      'Generate GST-compliant invoices with automatic tax calculations, customer details, discounts, and printable formats — all in a few clicks.',
    benefits: [
      'GST auto-calculation on every invoice',
      'Customer & product selection from your database',
      'Flexible discounts and tax summaries',
      'Print or download professional invoices',
    ],
    icon: 'Receipt',
    mockup: 'billing',
  },
  {
    id: 'inventory',
    category: 'Inventory',
    title: 'Powerful Inventory',
    subtitle: 'Know exactly what you have.',
    description:
      'Track stock levels across products, batches, and locations. Get instant alerts when stock runs low and maintain accurate stock valuation at all times.',
    benefits: [
      'Real-time stock level tracking',
      'Batch and expiry date management',
      'Low stock alerts and reordering',
      'Box / Strip / PCS unit handling',
    ],
    icon: 'Boxes',
    mockup: 'inventory',
    reverse: true,
  },
  {
    id: 'purchase',
    category: 'Purchases',
    title: 'Purchase Management',
    subtitle: 'Stay on top of every purchase.',
    description:
      'Record purchase invoices, manage supplier relationships, and automatically update inventory. Analyze purchasing patterns to make smarter buying decisions.',
    benefits: [
      'Purchase invoice recording',
      'Supplier information management',
      'Automatic stock updates on purchase',
      'Purchase analytics and history',
    ],
    icon: 'ShoppingCart',
    mockup: 'purchase',
  },
  {
    id: 'sales',
    category: 'Sales',
    title: 'Sales Management',
    subtitle: 'Turn every sale into useful business data.',
    description:
      'Manage sales invoices, track customer history, monitor outstanding amounts, and gain insights through detailed sales analytics dashboards.',
    benefits: [
      'Sales invoice creation and tracking',
      'Customer management with history',
      'Outstanding amount monitoring',
      'Sales analytics and reporting',
    ],
    icon: 'TrendingUp',
    mockup: 'sales',
    reverse: true,
  },
  {
    id: 'gst',
    category: 'Tax',
    title: 'GST & Tax',
    subtitle: 'Make GST-ready business operations simple.',
    description:
      'Handle CGST, SGST, and IGST calculations automatically. Generate GST-ready invoices and tax summaries that keep your business compliant.',
    benefits: [
      'Automatic CGST, SGST, IGST calculations',
      'GST-ready invoice generation',
      'Tax summary reports',
      'Compliant with Indian tax regulations',
    ],
    icon: 'FileText',
    mockup: 'gst',
  },
  {
    id: 'reports',
    category: 'Analytics',
    title: 'Reports & Analytics',
    subtitle: 'Turn business data into better decisions.',
    description:
      'Access comprehensive reports across sales, purchases, inventory, and profitability. Beautiful charts and real-time dashboards keep you informed.',
    benefits: [
      'Sales, purchase & inventory reports',
      'Profit overview and margins',
      'Outstanding payment tracking',
      'Business performance dashboards',
    ],
    icon: 'BarChart3',
    mockup: 'reports',
    reverse: true,
  },
];

export const industries = [
  {
    name: 'Medical & Pharma',
    icon: 'Pill',
    desc: 'Batch tracking, expiry management, and pharma-specific compliance.',
  },
  {
    name: 'Wholesale',
    icon: 'Building2',
    desc: 'Bulk billing, price tiers, and large-volume inventory control.',
  },
  {
    name: 'Retail',
    icon: 'Store',
    desc: 'Fast counter billing, POS-ready workflows, and customer tracking.',
  },
  {
    name: 'Distribution',
    icon: 'Truck',
    desc: 'Route-wise sales, supplier coordination, and stock transfers.',
  },
  {
    name: 'General Trading',
    icon: 'Briefcase',
    desc: 'Flexible product categories and multi-party transaction handling.',
  },
  {
    name: 'Small & Medium Business',
    icon: 'Rocket',
    desc: 'Easy to adopt, affordable to run, and ready to scale with you.',
  },
] as const;

export const benefits = [
  {
    title: 'Simple',
    desc: 'Easy to understand and operate. Your team gets productive from day one.',
    icon: 'Sparkles',
  },
  {
    title: 'Fast',
    desc: 'Designed for quick everyday workflows that keep your business moving.',
    icon: 'Zap',
  },
  {
    title: 'Powerful',
    desc: 'Deep business management capabilities that handle complex operations.',
    icon: 'Layers',
  },
  {
    title: 'Connected',
    desc: 'Sales, purchase, inventory and reports work together in one system.',
    icon: 'Network',
  },
  {
    title: 'Scalable',
    desc: 'Grow your business without outgrowing your software.',
    icon: 'TrendingUp',
  },
  {
    title: 'Business-Focused',
    desc: 'Designed around practical business operations, not abstract theory.',
    icon: 'Target',
  },
] as const;

export const beforeAfter = {
  before: [
    'Manual calculations prone to errors',
    'Scattered records across files and books',
    'Stock confusion and stock-out surprises',
    'Slow billing during peak hours',
    'Difficult and time-consuming reporting',
  ],
  after: [
    'Automated calculations, zero errors',
    'Centralized data in one secure system',
    'Real-time stock with low-stock alerts',
    'Fast billing that keeps queues moving',
    'Instant reports with beautiful dashboards',
  ],
};

export type PricingPlan = {
  name: string;
  tagline: string;
  monthly: number;
  yearly: number;
  popular?: boolean;
  features: string[];
  cta: string;
};

export const pricingPlans: PricingPlan[] = [
  {
    name: 'Starter',
    tagline: 'For small businesses getting started.',
    monthly: planPricing.Starter.monthly,
    yearly: planPricing.Starter.yearly,
    features: [
      'Up to 2 users',
      'Billing & invoicing',
      'Inventory management',
      'Basic reports',
      'GST billing',
      'Email support',
    ],
    cta: 'Start Free Trial',
  },
  {
    name: 'Professional',
    tagline: 'For growing businesses that need more.',
    monthly: planPricing.Professional.monthly,
    yearly: planPricing.Professional.yearly,
    popular: true,
    features: [
      'Up to 10 users',
      'Everything in Starter',
      'Advanced reports & analytics',
      'Batch & expiry tracking',
      'Purchase management',
      'Priority support',
    ],
    cta: 'Start Free Trial',
  },
  {
    name: 'Enterprise',
    tagline: 'For larger operations with advanced needs.',
    monthly: planPricing.Enterprise.monthly,
    yearly: planPricing.Enterprise.yearly,
    features: [
      'Unlimited users',
      'Everything in Professional',
      'Custom permissions & roles',
      'Dedicated account manager',
      'Data export & API access',
      '24/7 phone support',
    ],
    cta: 'Contact Sales',
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  business: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      'Sigma ERP replaced three different tools we were juggling. Billing, inventory, and reports are finally in one place. Our daily operations are noticeably faster.',
    name: 'Placeholder Name',
    role: 'Proprietor',
    business: 'Placeholder Business',
  },
  {
    quote:
      'The GST billing is accurate and the inventory alerts mean we never run out of critical stock. It is exactly what our wholesale business needed.',
    name: 'Placeholder Name',
    role: 'Director',
    business: 'Placeholder Business',
  },
  {
    quote:
      'We adopted Sigma ERP for our pharmacy and the batch tracking with expiry management has been a game changer. Simple to use, powerful underneath.',
    name: 'Placeholder Name',
    role: 'Owner',
    business: 'Placeholder Business',
  },
];

export const faqs = [
  {
    q: 'What is Sigma ERP?',
    a: 'Sigma ERP is a complete business management software that connects billing, inventory, sales, purchases, GST, customers, suppliers, and reports into one unified platform designed for Indian businesses.',
  },
  {
    q: 'Who can use Sigma ERP?',
    a: 'Sigma ERP is built for small, medium, and growing businesses across industries including retail, wholesale, distribution, medical & pharma, general trading, and more.',
  },
  {
    q: 'Is Sigma ERP suitable for wholesalers?',
    a: 'Yes. Sigma ERP supports bulk billing, price tiers, large-volume inventory, supplier coordination, and multi-party transactions that wholesalers need every day.',
  },
  {
    q: 'Does Sigma ERP support GST billing?',
    a: 'Absolutely. Sigma ERP automatically calculates CGST, SGST, and IGST, generates GST-ready invoices, and produces tax summaries to keep your business compliant.',
  },
  {
    q: 'Can I manage inventory?',
    a: 'Yes. Sigma ERP provides real-time stock tracking, batch and expiry management, low-stock alerts, stock valuation, and flexible unit handling including Box, Strip, and PCS.',
  },
  {
    q: 'Can I manage batches and expiry?',
    a: 'Yes. Batch tracking with expiry date management is a core feature, making Sigma ERP especially well-suited for medical, pharmaceutical, and food-related businesses.',
  },
  {
    q: 'Can multiple users use Sigma ERP?',
    a: 'Yes. Sigma ERP supports multiple users with role-based permissions, so you can control who has access to billing, inventory, reports, and administrative functions.',
  },
  {
    q: 'Can I track sales and purchases?',
    a: 'Yes. Sigma ERP tracks every sales and purchase transaction, maintains customer and supplier histories, monitors outstanding amounts, and provides detailed analytics.',
  },
  {
    q: 'Is there a free trial?',
    a: 'Yes. You can start a free trial of Sigma ERP with no credit card required. Explore all the features and see how it fits your business before committing.',
  },
  {
    q: 'How can I book a demo?',
    a: 'You can book a personalized demo by filling out the demo request form on this page, or reach out directly on WhatsApp. Our team will get back to you to schedule a walkthrough.',
  },
];

export const footerLinks = {
  Product: ['Features', 'Product', 'Pricing', 'Updates'],
  Solutions: ['Medical & Pharma', 'Wholesale', 'Retail', 'Distribution'],
  Company: ['About', 'Contact', 'Careers'],
  Legal: ['Privacy Policy', 'Terms & Conditions'],
};
