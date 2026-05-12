import 'dotenv/config';
import { scoreLeads } from './src/agents/leadGenAgent';

async function main() {
  console.log('🚀 Probando Lead Gen Agent...\n');

  const leads = await scoreLeads([
    {
      name: 'Carlos Mendoza',
      company: 'Seguros Nacional MX',
      title: 'Operations Manager',
      location: 'Ciudad de México',
      company_size: '45',
      notes: 'Usa Excel para todo, 200 emails al día, empresa creció 40% YoY',
    },
    {
      name: 'Ana Reyes',
      company: 'Inter Brokers Monterrey',
      title: 'Directora de Operaciones',
      location: 'Monterrey',
      company_size: '80',
      notes: 'Activa en LinkedIn, sigue cuentas de automatización',
    },
  ]);

  console.log(JSON.stringify(leads, null, 2));
  console.log(`\n✅ ${leads.length} leads scoreados. El agente funciona.`);
}

main().catch(console.error);
