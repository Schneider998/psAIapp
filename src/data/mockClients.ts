export interface Client {
  id: string;
  name: string;
  logo: string;
  industry: string;
  size: string;
  location: string;
  description: string;
  website: string;
  founded: string;
  jobs: string[]; // References to job IDs
}

export const mockClients: Record<string, Client> = {
  'salesforce': {
    id: 'salesforce',
    name: 'Salesforce',
    logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=200&fit=crop&q=80',
    industry: 'Enterprise Software',
    size: '10,000+ employees',
    location: 'San Francisco, CA',
    description: 'Salesforce is the world\'s #1 customer relationship management (CRM) platform.',
    website: 'https://salesforce.com',
    founded: '1999',
    jobs: ['salesforce-ae', 'salesforce-sdr', 'salesforce-manager']
  },
  'stripe': {
    id: 'stripe',
    name: 'Stripe',
    logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200&h=200&fit=crop&q=80',
    industry: 'Financial Technology',
    size: '5,000+ employees',
    location: 'San Francisco, CA',
    description: 'Stripe is a technology company that builds economic infrastructure for the internet.',
    website: 'https://stripe.com',
    founded: '2010',
    jobs: ['stripe-ae', 'stripe-sdr']
  },
  'hubspot': {
    id: 'hubspot',
    name: 'HubSpot',
    logo: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=200&h=200&fit=crop&q=80',
    industry: 'Marketing Software',
    size: '5,000+ employees',
    location: 'Cambridge, MA',
    description: 'HubSpot helps millions of organizations grow better.',
    website: 'https://hubspot.com',
    founded: '2006',
    jobs: ['hubspot-ae', 'hubspot-manager']
  }
};