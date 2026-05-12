import axios from 'axios';
import { logger } from '../utils/logger';
import { RawProspect } from '../agents/leadGenAgent';

const API_KEY = process.env.APOLLO_API_KEY;
const BASE_URL = 'https://api.apollo.io/v1';

export interface ApolloSearchParams {
  titles?: string[];
  industries?: string[];
  locations?: string[];
  company_size_min?: number;
  company_size_max?: number;
  limit?: number;
}

export async function searchBrokers(params: ApolloSearchParams): Promise<RawProspect[]> {
  if (!API_KEY) {
    logger.warn('Apollo API key no configurada — usando datos de demo');
    return getDemoProspects();
  }

  const payload = {
    api_key: API_KEY,
    q_organization_industry_tag_ids: [],
    person_titles: params.titles || ['Operations Manager', 'CEO', 'Director', 'Gerente'],
    organization_locations: params.locations || ['Mexico City', 'Monterrey', 'Guadalajara'],
    organization_num_employees_ranges: [`${params.company_size_min || 10},${params.company_size_max || 200}`],
    per_page: params.limit || 50,
    page: 1,
  };

  const response = await axios.post(`${BASE_URL}/mixed_people/search`, payload);
  const people = response.data.people || [];

  return people.map((p: Record<string, unknown>) => {
    const org = p.organization as Record<string, unknown> | undefined;
    return {
      name: `${p.first_name} ${p.last_name}`,
      company: (org?.name as string) || 'Desconocida',
      title: (p.title as string) || '',
      location: ((p.city as string) || '') + ', ' + ((p.country as string) || ''),
      linkedin_url: (p.linkedin_url as string) || undefined,
      company_size: (org?.estimated_num_employees as string)?.toString(),
      notes: `Fuente: Apollo.io`,
    };
  });
}

function getDemoProspects(): RawProspect[] {
  return [
    {
      name: 'Carlos Mendoza',
      company: 'Seguros Nacionales MX',
      title: 'Operations Manager',
      location: 'Ciudad de México, México',
      company_size: '45',
      notes: 'Empresa en crecimiento, 40% YoY según LinkedIn',
    },
    {
      name: 'Ana García',
      company: 'Inter Seguros Monterrey',
      title: 'Directora de Operaciones',
      location: 'Monterrey, México',
      company_size: '80',
      notes: 'Múltiples posts sobre digitalización en LinkedIn',
    },
    {
      name: 'Roberto Silva',
      company: 'Brokers Alianza',
      title: 'CEO',
      location: 'Guadalajara, México',
      company_size: '25',
      notes: 'Sigue cuentas de automatización y AI en Twitter',
    },
  ];
}
