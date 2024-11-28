export interface Job {
  id: string;
  clientId: string;
  title: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract';
  salary: {
    min: number;
    max: number;
    commission: string;
  };
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  posted: string;
  status: 'active' | 'paused' | 'closed';
  applicants: number;
  views: number;
}

export const mockJobs: Record<string, Job> = {
  'salesforce-ae': {
    id: 'salesforce-ae',
    clientId: 'salesforce',
    title: 'Enterprise Account Executive',
    location: 'San Francisco, CA (Hybrid)',
    type: 'full-time',
    salary: {
      min: 150000,
      max: 200000,
      commission: 'Uncapped OTE $400,000+'
    },
    description: "Join Salesforce's Enterprise Sales team and work with Fortune 500 companies to transform their businesses using our industry-leading CRM platform.",
    requirements: [
      '8+ years of enterprise software sales experience',
      'Track record of consistently exceeding $2M+ annual quotas',
      'Experience selling to C-level executives',
      'Strong understanding of enterprise software, CRM, and digital transformation',
      'Excellent presentation and negotiation skills'
    ],
    responsibilities: [
      'Drive new business opportunities within assigned enterprise accounts',
      'Develop and execute strategic account plans',
      'Lead complex sales cycles from start to finish',
      'Collaborate with solution engineers and professional services teams',
      'Forecast sales activities and revenue achievement'
    ],
    benefits: [
      'Competitive base salary + uncapped commission',
      'Comprehensive health, dental, and vision insurance',
      '401(k) matching',
      'Stock purchase plan',
      'Unlimited PTO',
      'Professional development budget'
    ],
    posted: '2 days ago',
    status: 'active',
    applicants: 45,
    views: 1250
  },
  'salesforce-sdr': {
    id: 'salesforce-sdr',
    clientId: 'salesforce',
    title: 'Senior Sales Development Representative',
    location: 'San Francisco, CA (Hybrid)',
    type: 'full-time',
    salary: {
      min: 75000,
      max: 85000,
      commission: 'OTE $120,000-140,000'
    },
    description: 'Drive the next generation of enterprise sales opportunities at Salesforce.',
    requirements: [
      '2+ years of SDR experience in B2B software',
      'Proven track record of exceeding quota',
      'Strong communication and interpersonal skills',
      'Experience with Salesforce CRM'
    ],
    responsibilities: [
      'Generate and qualify new sales opportunities',
      'Conduct discovery calls with potential customers',
      'Work closely with Account Executives',
      'Maintain accurate records in Salesforce'
    ],
    benefits: [
      'Competitive base salary + commission',
      'Full benefits package',
      '401(k) matching',
      'Stock purchase plan',
      'Career development opportunities'
    ],
    posted: '1 week ago',
    status: 'active',
    applicants: 89,
    views: 2100
  },
  'stripe-ae': {
    id: 'stripe-ae',
    clientId: 'stripe',
    title: 'Account Executive, Enterprise Payments',
    location: 'Remote (US)',
    type: 'full-time',
    salary: {
      min: 130000,
      max: 180000,
      commission: 'OTE $260,000-360,000'
    },
    description: "Help build the future of internet commerce at Stripe.",
    requirements: [
      '6+ years of enterprise software/payments sales',
      'Experience selling technical products',
      'Strong understanding of payments ecosystem',
      'History of exceeding quota'
    ],
    responsibilities: [
      "Sell Stripe's payments platform to enterprise companies",
      'Navigate complex technical sales cycles',
      'Work with technical teams and solution architects',
      'Build relationships with key stakeholders'
    ],
    benefits: [
      'Remote-first culture',
      'Competitive compensation',
      'Generous equity package',
      'Unlimited vacation policy',
      'Learning & development stipend'
    ],
    posted: '3 days ago',
    status: 'active',
    applicants: 67,
    views: 1800
  },
  'hubspot-ae': {
    id: 'hubspot-ae',
    clientId: 'hubspot',
    title: 'Senior Account Executive',
    location: 'Boston, MA (Hybrid)',
    type: 'full-time',
    salary: {
      min: 120000,
      max: 160000,
      commission: 'OTE $240,000-320,000'
    },
    description: "Join HubSpot's high-performing sales team and help companies grow better.",
    requirements: [
      '5+ years of SaaS sales experience',
      'Experience with inbound marketing and sales',
      'Strong track record of exceeding quota',
      'Excellent presentation skills'
    ],
    responsibilities: [
      'Manage full sales cycle for mid-market accounts',
      'Develop account strategies',
      'Collaborate with marketing and customer success',
      'Provide product demonstrations'
    ],
    benefits: [
      'Competitive compensation',
      'Unlimited vacation',
      'Remote work flexibility',
      'Health and wellness benefits',
      'Parental leave'
    ],
    posted: '1 week ago',
    status: 'active',
    applicants: 34,
    views: 890
  }
};