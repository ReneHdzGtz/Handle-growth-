import { useState } from 'react'
import Head from 'next/head'

const sections = [
  { id: 'hero', label: 'Inicio' },
  { id: 'problem', label: 'El Problema' },
  { id: 'solution', label: 'La Solución' },
  { id: 'how', label: 'Cómo Funciona' },
  { id: 'results', label: 'Resultados' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'ask', label: 'El Ask' },
]

export default function Home() {
  const [activeSection, setActiveSection] = useState('hero')

  const styles = {
    container: {
      maxWidth: '680px',
      margin: '0 auto',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      backgroundColor: '#ffffff',
      color: '#000000',
    },
    nav: {
      display: 'flex',
      gap: '8px',
      padding: '1.5rem',
      borderBottom: '0.5px solid #e5e5e5',
      overflow: 'auto',
      background: '#f9f9f9',
      position: 'sticky',
      top: 0,
      zIndex: 10,
    },
    navButton: (isActive) => ({
      padding: '8px 16px',
      border: isActive ? '0.5px solid #0066cc' : '0.5px solid #e5e5e5',
      background: isActive ? '#0066cc' : '#ffffff',
      color: isActive ? '#ffffff' : '#000000',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '14px',
      whiteSpace: 'nowrap',
      transition: 'all 0.2s',
      fontWeight: isActive ? '500' : '400',
    }),
    section: {
      padding: '2rem 1.5rem',
      display: 'none',
    },
    sectionActive: {
      display: 'block',
    },
    h1: {
      fontSize: '28px',
      fontWeight: '500',
      marginBottom: '12px',
      color: '#000000',
    },
    h2: {
      fontSize: '20px',
      fontWeight: '500',
      marginBottom: '16px',
      marginTop: '2rem',
      color: '#000000',
    },
    h3: {
      fontSize: '16px',
      fontWeight: '500',
      marginTop: '1.5rem',
      marginBottom: '12px',
      color: '#000000',
    },
    p: {
      marginBottom: '12px',
      color: '#000000',
      fontSize: '15px',
      lineHeight: '1.6',
    },
    card: {
      background: '#ffffff',
      border: '0.5px solid #e5e5e5',
      borderRadius: '12px',
      padding: '1.5rem',
      marginBottom: '1rem',
    },
    highlight: {
      color: '#0066cc',
      fontWeight: '500',
    },
    metricGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '12px',
      margin: '1.5rem 0',
    },
    metricCard: {
      background: '#f9f9f9',
      padding: '1rem',
      borderRadius: '8px',
      textAlign: 'center',
    },
    metricValue: {
      fontSize: '24px',
      fontWeight: '500',
      color: '#0066cc',
      marginBottom: '4px',
    },
    metricLabel: {
      fontSize: '12px',
      color: '#666666',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    },
    component: {
      background: '#f9f9f9',
      borderLeft: '3px solid #0066cc',
      padding: '1.25rem',
      marginBottom: '1rem',
      borderRadius: '8px',
    },
    quote: {
      borderLeft: '3px solid #0066cc',
      paddingLeft: '1rem',
      margin: '1.5rem 0',
      color: '#666666',
      fontStyle: 'italic',
    },
    badge: {
      display: 'inline-block',
      background: '#e6f0ff',
      color: '#0066cc',
      padding: '4px 12px',
      borderRadius: '8px',
      fontSize: '12px',
      fontWeight: '500',
      marginBottom: '1rem',
    },
  }

  return (
    <>
      <Head>
        <title>Handle Growth Agent</title>
        <meta name="description" content="AI-Powered Sales Automation for Insurance Brokers" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div style={styles.container}>
        {/* Navigation */}
        <nav style={styles.nav}>
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              style={styles.navButton(activeSection === section.id)}
            >
              {section.label}
            </button>
          ))}
        </nav>

        {/* HERO SECTION */}
        <div style={{ ...styles.section, ...styles.sectionActive }}>
          {activeSection === 'hero' && (
            <>
              <h1 style={styles.h1}>Handle Growth Agent</h1>
              <p style={{ color: '#666666', fontSize: '16px', marginBottom: '1.5rem' }}>
                Automatiza el aprendizaje de venta. Escala sin Poncho.
              </p>

              <div style={styles.quote}>
                "Cada broker te enseña algo. Pero esos aprendizajes se pierden en Slack. ¿Y si hubiera un sistema que capturara eso?"
              </div>

              <h2 style={styles.h2}>La Idea en 30 Segundos</h2>
              <p style={styles.p}>Handle tiene product-market fit (75 brokers activos). Pero Poncho es 80% de las ventas.</p>
              <p style={styles.p}>Cada conversación enseña algo sobre pain points, objections, messaging. Pero esos learnings no se capitalizan.</p>
              <p style={styles.p}>
                <span style={styles.highlight}>El Growth Agent</span> es un sistema AI que:
              </p>
              <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
                <li>Automatiza lead scoring y outreach personalizado</li>
                <li>Captura insights de cada conversación</li>
                <li>Evoluciona el playbook en tiempo real</li>
                <li>Libera a Poncho para estrategia y deals grandes</li>
              </ul>

              <h3 style={styles.h3}>El Resultado</h3>
              <p style={styles.p}>De "Poncho vende a 75 brokers" → "El sistema vende a 500+ brokers"</p>

              <div style={styles.metricGrid}>
                <div style={styles.metricCard}>
                  <div style={styles.metricValue}>3 sem</div>
                  <div style={styles.metricLabel}>Para validar</div>
                </div>
                <div style={styles.metricCard}>
                  <div style={styles.metricValue}>$7k</div>
                  <div style={styles.metricLabel}>Costo total</div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* PROBLEM SECTION */}
        <div style={{ ...styles.section, display: activeSection === 'problem' ? 'block' : 'none' }}>
          <h1 style={styles.h1}>El Problema</h1>
          
          <h2 style={styles.h2}>Hoy: Poncho es el Bottleneck</h2>
          <p style={styles.p}>Handle está en un punto crítico:</p>
          
          <div style={styles.card}>
            <div style={{ fontSize: '16px', fontWeight: '500', marginBottom: '8px' }}>✅ Tiene</div>
            <div style={{ fontSize: '14px', color: '#666666', lineHeight: '1.6' }}>
              • Producto que funciona (75 brokers)<br/>
              • Product-market fit probado (94% reducción de tiempo)<br/>
              • Traction clara (clientes grandes)<br/>
              • Dinero (a16z backed)
            </div>
          </div>

          <div style={styles.card}>
            <div style={{ fontSize: '16px', fontWeight: '500', marginBottom: '8px' }}>❌ Le Falta</div>
            <div style={{ fontSize: '14px', color: '#666666', lineHeight: '1.6' }}>
              • Escala de venta (75 → 500+ brokers)<br/>
              • Playbook sistematizado<br/>
              • Equipo de sales<br/>
              • Capitalización de aprendizajes
            </div>
          </div>

          <h2 style={styles.h2}>Las Preguntas Sin Respuesta</h2>
          
          {['¿Cuál es el messaging que más convierte?',
            '¿Cuáles son los pain points que real importan?',
            '¿A qué brokers debería contactar primero?',
            '¿Cuál es la objeción más frecuente?'].map((q, i) => (
            <div key={i} style={styles.component}>
              <div style={{ fontWeight: '500', color: '#000000', marginBottom: '8px' }}>{q}</div>
              <div style={{ fontSize: '14px', color: '#666666' }}>
                Hoy: Poncho lo sabe por feeling después de 20+ calls
              </div>
            </div>
          ))}

          <h2 style={styles.h2}>El Costo Real</h2>
          <p style={styles.p}>Sin sistematizar:</p>
          <div style={styles.metricGrid}>
            <div style={styles.metricCard}>
              <div style={styles.metricValue}>6-12m</div>
              <div style={styles.metricLabel}>Ramp time</div>
            </div>
            <div style={styles.metricCard}>
              <div style={styles.metricValue}>$1M+</div>
              <div style={styles.metricLabel}>AE hiring cost</div>
            </div>
          </div>
        </div>

        {/* SOLUTION SECTION */}
        <div style={{ ...styles.section, display: activeSection === 'solution' ? 'block' : 'none' }}>
          <h1 style={styles.h1}>La Solución</h1>
          
          <div style={styles.badge}>AI-Powered Sales Automation</div>
          
          <h2 style={styles.h2}>Qué es el Growth Agent</h2>
          <p style={styles.p}>Un sistema AI autónomo que:</p>
          
          {[
            { title: '1. Genera Target List Inteligente', desc: 'Scores brokers por receptiveness, budget, fit. Prioriza los 50 que más importan.' },
            { title: '2. Personaliza Outreach a Escala', desc: 'No templates. Cada mensaje es contexto-aware.' },
            { title: '3. Captura Insights Automáticamente', desc: 'Lee emails, notas, updates. Extrae pain points, objections, budgets.' },
            { title: '4. Evoluciona el Playbook en Tiempo Real', desc: 'Después de 5 conversaciones, ya sabe qué funciona.' },
            { title: '5. Predice & Alerta', desc: 'Deal stalling? Cierre probable? Forecast de pipeline? Automático.' }
          ].map((item, i) => (
            <div key={i} style={styles.component}>
              <div style={{ fontWeight: '500', color: '#000000', marginBottom: '8px' }}>{item.title}</div>
              <div style={{ fontSize: '14px', color: '#666666' }}>{item.desc}</div>
            </div>
          ))}

          <h2 style={styles.h2}>Por Qué Esto Es Diferente</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', margin: '1.5rem 0' }}>
            <div style={{ background: '#f9f9f9', padding: '1.25rem', borderRadius: '8px' }}>
              <div style={{ fontWeight: '500', fontSize: '14px', marginBottom: '1rem', color: '#000000' }}>Hoy (Manual)</div>
              <div style={{ fontSize: '13px', color: '#666666' }}>
                • Poncho identifica<br/>
                • Poncho contacta<br/>
                • Poncho aprende<br/>
                • Poncho itera
              </div>
            </div>
            <div style={{ background: '#f9f9f9', padding: '1.25rem', borderRadius: '8px' }}>
              <div style={{ fontWeight: '500', fontSize: '14px', marginBottom: '1rem', color: '#000000' }}>Con Growth Agent</div>
              <div style={{ fontSize: '13px', color: '#666666' }}>
                • Sistema score & rank<br/>
                • Sistema personaliza<br/>
                • Sistema captura<br/>
                • Sistema mejora
              </div>
            </div>
          </div>
        </div>

        {/* HOW SECTION */}
        <div style={{ ...styles.section, display: activeSection === 'how' ? 'block' : 'none' }}>
          <h1 style={styles.h1}>Cómo Funciona</h1>
          
          <h2 style={styles.h2}>5 Componentes Integrados</h2>
          
          {['Lead Generation Agent', 'Outreach Personalization Agent', 'Conversation Intelligence Agent', 'Playbook Learning Agent', 'Prediction Agent'].map((agent, i) => (
            <div key={i} style={{ marginBottom: '1.5rem' }}>
              <h3 style={styles.h3}>{i + 1}️⃣ {agent}</h3>
              <div style={styles.card}>
                <div style={{ fontWeight: '500', marginBottom: '8px', fontSize: '14px' }}>Input / Process / Output</div>
                <div style={{ fontSize: '14px', color: '#666666' }}>
                  Component {i + 1} of the Growth Agent system
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* RESULTS SECTION */}
        <div style={{ ...styles.section, display: activeSection === 'results' ? 'block' : 'none' }}>
          <h1 style={styles.h1}>Resultados Esperados</h1>
          
          <h2 style={styles.h2}>Semana 1: Foundation</h2>
          <div style={styles.metricGrid}>
            <div style={styles.metricCard}>
              <div style={styles.metricValue}>50</div>
              <div style={styles.metricLabel}>Brokers scored</div>
            </div>
            <div style={styles.metricCard}>
              <div style={styles.metricValue}>Ranked</div>
              <div style={styles.metricLabel}>Con reasoning</div>
            </div>
          </div>

          <h2 style={styles.h2}>Semana 2: Testing</h2>
          <div style={styles.metricGrid}>
            <div style={styles.metricCard}>
              <div style={styles.metricValue}>30</div>
              <div style={styles.metricLabel}>Outreach</div>
            </div>
            <div style={styles.metricCard}>
              <div style={styles.metricValue}>12-15</div>
              <div style={styles.metricLabel}>Responses (40-50%)</div>
            </div>
          </div>

          <h2 style={styles.h2}>Semana 3: Playbook v1.0</h2>
          <div style={styles.card}>
            <div style={{ fontWeight: '500', marginBottom: '12px', color: '#000000' }}>Qué Obtienes</div>
            <ul style={{ fontSize: '14px', color: '#666666', marginLeft: '1.5rem' }}>
              <li>Top Pain Points ranked by frequency</li>
              <li>Common Objections + Handling proven</li>
              <li>Messaging Variants ranked by performance</li>
              <li>Channel Performance analysis</li>
            </ul>
          </div>
        </div>

        {/* TIMELINE SECTION */}
        <div style={{ ...styles.section, display: activeSection === 'timeline' ? 'block' : 'none' }}>
          <h1 style={styles.h1}>Timeline: 3 Semanas</h1>
          
          <h2 style={styles.h2}>Phase 1</h2>
          
          {[
            { week: 'Semana 1', desc: 'Data + Iteration. Integro broker data real. Polish basado en feedback.' },
            { week: 'Semana 2', desc: 'Testing. Genero outreach para 30 brokers. Capturo respuestas. Extraigo insights.' },
            { week: 'Semana 3', desc: 'Learning. Playbook v1.0 generated. Resultados + Phase 2 recommendation.' }
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: '2rem', position: 'relative', paddingLeft: '2rem' }}>
              <div style={{
                position: 'absolute',
                left: 0,
                top: '2px',
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#0066cc',
                border: '3px solid #ffffff',
                boxShadow: '0 0 0 1px #0066cc'
              }} />
              <div style={{ fontWeight: '500', color: '#000000', marginBottom: '4px' }}>
                {item.week}
              </div>
              <div style={{ fontSize: '14px', color: '#666666' }}>
                {item.desc}
              </div>
            </div>
          ))}
        </div>

        {/* ASK SECTION */}
        <div style={{ ...styles.section, display: activeSection === 'ask' ? 'block' : 'none' }}>
          <h1 style={styles.h1}>El Ask</h1>
          
          <h2 style={styles.h2}>Lo Que Estoy Pidiendo</h2>
          
          {[
            { num: 1, title: 'Aprobación de Phase 1', desc: '3 semanas de trabajo. Validar con brokers reales. Medir.' },
            { num: 2, title: 'Acceso a Data', desc: 'Últimas 10-15 conversaciones de brokers (emails, call notes, deal stages).' },
            { num: 3, title: 'Feedback Semanal', desc: '30 min call cada lunes. Revisamos progreso, iteramos.' }
          ].map((item) => (
            <div key={item.num} style={{ display: 'flex', gap: '12px', marginBottom: '1.5rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
                background: '#e6f0ff',
                color: '#0066cc',
                borderRadius: '50%',
                fontWeight: '500',
                fontSize: '14px',
                flexShrink: 0
              }}>
                {item.num}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '500', color: '#000000', marginBottom: '4px' }}>
                  {item.title}
                </div>
                <div style={{ fontSize: '14px', color: '#666666' }}>
                  {item.desc}
                </div>
              </div>
            </div>
          ))}

          <h2 style={styles.h2}>Lo Que Obtienes</h2>
          
          {[
            { title: 'Immediatamente', desc: 'Working prototype. Demo en vivo. Proof of concept.' },
            { title: 'Si Phase 1 Funciona', desc: 'Playbook validado. Escalable. Team training.' },
            { title: 'Si Phase 1 No Funciona', desc: 'Aprendes qué no funciona. Sin riesgo.' }
          ].map((item, i) => (
            <div key={i} style={styles.card}>
              <div style={{ fontWeight: '500', marginBottom: '8px', color: '#000000' }}>
                {item.title}
              </div>
              <div style={{ fontSize: '14px', color: '#666666' }}>
                {item.desc}
              </div>
            </div>
          ))}

          <h2 style={styles.h2}>Próximo Paso</h2>
          <p style={styles.p}>¿Hablamos?</p>
          <p style={{ color: '#666666', fontSize: '14px', marginBottom: '1.5rem' }}>
            30 min call esta semana. Te muestro el prototipo. Decidimos si Phase 1 hace sentido.
          </p>
          <button style={{
            background: '#0066cc',
            color: '#ffffff',
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: '500',
            fontSize: '14px'
          }}>
            Agendar Call
          </button>
          <p style={{ color: '#666666', fontSize: '13px', marginTop: '1rem' }}>
            O contacta a René directamente en X/Twitter: @ReneHdzGtz
          </p>
        </div>
      </div>
    </>
  )
}
