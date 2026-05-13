import Head from 'next/head';
import { useState } from 'react';

const C = {
  bg: '#ffffff',
  bgWarm: '#f5f3f1',
  bgCard: '#fafafa',
  border: '#e5e5e5',
  borderDark: '#d4d4d4',
  text: '#0a0a0a',
  muted: '#6b6b6b',
  mutedLight: '#a3a3a3',
  black: '#0a0a0a',
  white: '#ffffff',
  success: '#16a34a',
  warning: '#d97706',
  danger: '#dc2626',
};

const SAMPLE_PROSPECTS = [
  {
    name: 'Carlos Mendoza',
    company: 'Seguros Nacional MX',
    title: 'Operations Manager',
    location: 'Ciudad de México',
    company_size: '45',
    notes: 'Usa Excel para todo, 200 emails/día, creció 40% YoY',
  },
];

const SAMPLE_CONV = `Hola, gracias por conectar. Vi tu mensaje sobre Handle.

Actualmente usamos Excel y correo para todo. Mi equipo dedica unas 4 horas diarias solo a capturar datos de pólizas manualmente. Cometemos errores constantemente y los clientes se quejan de la lentitud.

Tenemos 50 personas, manejamos unos 300 clientes activos. Me interesa saber cómo funciona exactamente Handle y cuánto cuesta. ¿Tienes casos de éxito con brokers de nuestro tamaño?`;

export default function Agent() {
  const [tab, setTab] = useState('score');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const [prospectsText, setProspectsText] = useState(JSON.stringify(SAMPLE_PROSPECTS, null, 2));
  const [outreachProspect, setOutreachProspect] = useState(JSON.stringify(SAMPLE_PROSPECTS[0], null, 2));
  const [platform, setPlatform] = useState('linkedin');
  const [convText, setConvText] = useState(SAMPLE_CONV);
  const [convContext, setConvContext] = useState('');

  async function callAgent(endpoint, body) {
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const r = await fetch(`/api/agent/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || 'Error del servidor');
      setResult(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  function handleScore() {
    try {
      const p = JSON.parse(prospectsText);
      callAgent('score', { prospects: Array.isArray(p) ? p : [p] });
    } catch {
      setError('JSON inválido');
    }
  }

  function handleOutreach() {
    try {
      const p = JSON.parse(outreachProspect);
      callAgent('outreach', { prospect: p, platform });
    } catch {
      setError('JSON inválido');
    }
  }

  function handleConversation() {
    if (!convText.trim()) return setError('Pega el texto de la conversación');
    callAgent('conversation', { text: convText, context: convContext });
  }

  const TABS = [
    { id: 'score', label: 'Score de Leads' },
    { id: 'outreach', label: 'Outreach A/B' },
    { id: 'conversation', label: 'Conversation Intel' },
  ];

  return (
    <>
      <Head>
        <title>Growth Agent — Handle</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
      </Head>

      <div style={{ minHeight: '100vh', background: C.bg, color: C.text, fontFamily: 'Inter, system-ui, sans-serif', fontSize: 15 }}>

        {/* Nav */}
        <nav style={{ borderBottom: `1px solid ${C.border}`, padding: '0 32px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: C.bg }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <a href="https://usehandle.ai" style={{ fontWeight: 600, fontSize: 16, color: C.text, textDecoration: 'none', letterSpacing: '-0.02em' }}>Handle</a>
            <span style={{ color: C.border }}>|</span>
            <span style={{ fontSize: 14, color: C.muted }}>Growth Agent</span>
          </div>
          <a href="/slides" style={{ fontSize: 13, color: C.muted, textDecoration: 'none' }}>Ver propuesta →</a>
        </nav>

        {/* Hero */}
        <div style={{ background: C.bgWarm, borderBottom: `1px solid ${C.border}`, padding: '48px 32px' }}>
          <div style={{ maxWidth: 880, margin: '0 auto' }}>
            <p style={{ fontSize: 12, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 500, marginBottom: 12 }}>Growth Agent V2 · Playground</p>
            <h1 style={{ fontSize: 36, fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: 12, color: C.text }}>
              Prueba los agentes<br />en tiempo real
            </h1>
            <p style={{ color: C.muted, fontSize: 16, maxWidth: 480, lineHeight: 1.6 }}>
              Scorea brokers, genera outreach personalizado y extrae insights de conversaciones — powered by Claude.
            </p>
          </div>
        </div>

        {/* Main */}
        <div style={{ maxWidth: 880, margin: '0 auto', padding: '40px 32px' }}>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 32 }}>
            {TABS.map((t, i) => (
              <button
                key={t.id}
                onClick={() => { setTab(t.id); setResult(null); setError(null); }}
                style={{
                  padding: '8px 18px',
                  borderRadius: 999,
                  border: `1px solid ${tab === t.id ? C.black : C.border}`,
                  background: tab === t.id ? C.black : C.bg,
                  color: tab === t.id ? C.white : C.muted,
                  fontSize: 13, fontWeight: 500, cursor: 'pointer',
                  fontFamily: 'inherit', transition: 'all 0.12s',
                }}
              >
                <span style={{ marginRight: 6, opacity: 0.5 }}>0{i + 1}</span>{t.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, alignItems: 'start' }}>

            {/* INPUT */}
            <div style={{ border: `1px solid ${C.border}`, borderRadius: 16, padding: 24, background: C.bg }}>
              <p style={{ fontSize: 11, color: C.mutedLight, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 500, marginBottom: 20 }}>Input</p>

              {tab === 'score' && (
                <>
                  <FieldLabel>Prospectos (JSON)</FieldLabel>
                  <MonoArea value={prospectsText} onChange={e => setProspectsText(e.target.value)} rows={14} />
                  <FieldNote>Campos: name, company, title, location, company_size, notes</FieldNote>
                  <PillButton onClick={handleScore} loading={loading}>Scorear leads</PillButton>
                </>
              )}

              {tab === 'outreach' && (
                <>
                  <FieldLabel>Prospecto (JSON)</FieldLabel>
                  <MonoArea value={outreachProspect} onChange={e => setOutreachProspect(e.target.value)} rows={10} />
                  <FieldLabel style={{ marginTop: 16 }}>Canal</FieldLabel>
                  <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
                    {['linkedin', 'email'].map(p => (
                      <button key={p} onClick={() => setPlatform(p)} style={{
                        padding: '6px 16px', borderRadius: 999,
                        border: `1px solid ${platform === p ? C.black : C.border}`,
                        background: platform === p ? C.black : C.bg,
                        color: platform === p ? C.white : C.muted,
                        fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
                      }}>{p}</button>
                    ))}
                  </div>
                  <PillButton onClick={handleOutreach} loading={loading}>Generar outreach A/B</PillButton>
                </>
              )}

              {tab === 'conversation' && (
                <>
                  <FieldLabel>Conversación (email, call, LinkedIn)</FieldLabel>
                  <MonoArea value={convText} onChange={e => setConvText(e.target.value)} rows={12} placeholder="Pega el texto aquí..." mono={false} />
                  <FieldLabel style={{ marginTop: 16 }}>Contexto adicional</FieldLabel>
                  <input
                    value={convContext}
                    onChange={e => setConvContext(e.target.value)}
                    placeholder="Ej: segundo contacto, ya tuvo demo..."
                    style={{
                      width: '100%', border: `1px solid ${C.border}`, borderRadius: 8,
                      padding: '10px 12px', fontSize: 14, color: C.text,
                      fontFamily: 'inherit', marginBottom: 20, outline: 'none', boxSizing: 'border-box',
                    }}
                  />
                  <PillButton onClick={handleConversation} loading={loading}>Analizar conversación</PillButton>
                </>
              )}
            </div>

            {/* OUTPUT */}
            <div style={{ border: `1px solid ${C.border}`, borderRadius: 16, padding: 24, background: C.bg, minHeight: 420 }}>
              <p style={{ fontSize: 11, color: C.mutedLight, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 500, marginBottom: 20 }}>Output</p>

              {!result && !error && !loading && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 340, gap: 12, color: C.mutedLight }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: C.bgWarm, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>⚡</div>
                  <p style={{ fontSize: 14, textAlign: 'center', maxWidth: 200, lineHeight: 1.5 }}>Completa el formulario y ejecuta el agente</p>
                </div>
              )}

              {loading && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 340, gap: 16 }}>
                  <div style={{ width: 24, height: 24, border: `2px solid ${C.border}`, borderTopColor: C.text, borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                  <p style={{ fontSize: 14, color: C.muted }}>Claude está procesando...</p>
                </div>
              )}

              {error && (
                <div style={{ background: '#fef2f2', border: `1px solid #fecaca`, borderRadius: 10, padding: 14 }}>
                  <p style={{ fontSize: 13, color: C.danger }}>⚠ {error}</p>
                </div>
              )}

              {result && !loading && (
                <div style={{ overflowY: 'auto', maxHeight: 580 }}>
                  {tab === 'score' && <ScoreResult data={result} />}
                  {tab === 'outreach' && <OutreachResult data={result} />}
                  {tab === 'conversation' && <ConvResult data={result} />}
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div style={{ marginTop: 56, paddingTop: 24, borderTop: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ fontSize: 13, color: C.mutedLight }}>Handle Growth Agent V2 · Powered by Claude claude-sonnet-4-6</p>
            <div style={{ display: 'flex', gap: 20 }}>
              <a href="/slides" style={{ fontSize: 13, color: C.muted, textDecoration: 'none' }}>Propuesta</a>
              <a href="https://github.com/ReneHdzGtz/Handle-growth-/tree/v2" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: C.muted, textDecoration: 'none' }}>GitHub</a>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        textarea, input { outline: none; }
        textarea:focus, input:focus { border-color: ${C.black} !important; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 2px; }
      `}</style>
    </>
  );
}

// ── Primitives ─────────────────────────────────────────────

function FieldLabel({ children, style }) {
  return <p style={{ fontSize: 12, color: C.muted, fontWeight: 500, marginBottom: 6, ...style }}>{children}</p>;
}

function FieldNote({ children }) {
  return <p style={{ fontSize: 12, color: C.mutedLight, marginBottom: 16, lineHeight: 1.5 }}>{children}</p>;
}

function MonoArea({ mono = true, rows = 8, ...props }) {
  return (
    <textarea
      rows={rows}
      {...props}
      style={{
        width: '100%', border: `1px solid ${C.border}`, borderRadius: 10,
        padding: '10px 12px', color: C.text, background: C.bgCard,
        fontSize: mono ? 12 : 14,
        fontFamily: mono ? "'SF Mono', 'Fira Code', monospace" : 'inherit',
        resize: 'vertical', lineHeight: 1.6, marginBottom: 6, display: 'block',
        transition: 'border-color 0.12s',
      }}
    />
  );
}

function PillButton({ onClick, loading, children }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      style={{
        width: '100%', padding: '11px 24px', borderRadius: 999,
        background: loading ? C.bgWarm : C.black,
        border: `1px solid ${loading ? C.border : C.black}`,
        color: loading ? C.muted : C.white,
        fontWeight: 500, fontSize: 14, cursor: loading ? 'not-allowed' : 'pointer',
        fontFamily: 'inherit', transition: 'all 0.12s', letterSpacing: '-0.01em',
      }}
    >
      {loading ? 'Procesando...' : children}
    </button>
  );
}

function Divider() {
  return <div style={{ height: 1, background: C.border, margin: '16px 0' }} />;
}

function Tag({ children, type = 'default' }) {
  const map = {
    high: { bg: '#fef2f2', color: C.danger, border: '#fecaca' },
    medium: { bg: '#fffbeb', color: C.warning, border: '#fde68a' },
    low: { bg: '#f0fdf4', color: C.success, border: '#bbf7d0' },
    default: { bg: C.bgWarm, color: C.muted, border: C.border },
    green: { bg: '#f0fdf4', color: C.success, border: '#bbf7d0' },
    red: { bg: '#fef2f2', color: C.danger, border: '#fecaca' },
  };
  const t = map[type] || map.default;
  return (
    <span style={{
      background: t.bg, color: t.color, border: `1px solid ${t.border}`,
      fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 999,
      textTransform: 'uppercase', letterSpacing: '0.05em',
    }}>{children}</span>
  );
}

function SectionTitle({ children }) {
  return <p style={{ fontSize: 11, color: C.mutedLight, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>{children}</p>;
}

// ── Score Result ────────────────────────────────────────────

function ScoreResult({ data }) {
  const leads = data.leads || [];
  return (
    <>
      <p style={{ fontSize: 13, color: C.muted, marginBottom: 16 }}>{leads.length} lead{leads.length !== 1 ? 's' : ''} procesado{leads.length !== 1 ? 's' : ''}</p>
      {leads.map((l, i) => <LeadCard key={i} lead={l} />)}
    </>
  );
}

function LeadCard({ lead }) {
  const score = lead.receptiveness_score;
  const pct = Math.round(score * 100);
  const barColor = score >= 0.8 ? C.success : score >= 0.6 ? C.warning : C.danger;

  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, padding: 16, marginBottom: 12, animation: 'fadeUp 0.25s ease', background: C.bg }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
        <div>
          <p style={{ fontWeight: 600, fontSize: 15, color: C.text, letterSpacing: '-0.02em' }}>{lead.name}</p>
          <p style={{ color: C.muted, fontSize: 13 }}>{lead.title} · {lead.company}</p>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <span style={{ fontSize: 26, fontWeight: 600, color: barColor, letterSpacing: '-0.03em' }}>{pct}</span>
          <span style={{ fontSize: 13, color: C.mutedLight }}>/100</span>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ background: C.bgWarm, borderRadius: 99, height: 4, marginBottom: 14 }}>
        <div style={{ height: 4, borderRadius: 99, background: barColor, width: `${pct}%`, transition: 'width 0.5s ease' }} />
      </div>

      <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.65, marginBottom: 12 }}>
        <span style={{ color: C.text, fontWeight: 500 }}>Por qué califica:</span> {lead.why_qualified}
      </p>

      <div style={{ background: C.bgWarm, borderRadius: 8, padding: '10px 12px' }}>
        <p style={{ fontSize: 13, color: C.text }}>→ {lead.next_action}</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
        <span style={{ fontSize: 12, color: C.mutedLight }}>Budget: {lead.estimated_budget}</span>
        <span style={{ fontSize: 12, color: C.mutedLight }}>Prioridad #{lead.priority}</span>
      </div>
    </div>
  );
}

// ── Outreach Result ─────────────────────────────────────────

function OutreachResult({ data }) {
  return (
    <>
      {data.variantA && <MessageCard data={data.variantA} variant="A" accent="#7c3aed" accentBg="#f5f3ff" />}
      {data.variantB && <MessageCard data={data.variantB} variant="B" accent="#0891b2" accentBg="#f0f9ff" />}
    </>
  );
}

function MessageCard({ data, variant, accent, accentBg }) {
  const [copied, setCopied] = useState(false);
  const full = [data.opening, data.body, data.cta].filter(Boolean).join('\n\n');

  function copy() {
    navigator.clipboard.writeText(full);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, padding: 16, marginBottom: 12, animation: 'fadeUp 0.25s ease' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ background: accentBg, color: accent, fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 999, letterSpacing: '0.05em' }}>
            VARIANTE {variant}
          </span>
          <span style={{ fontSize: 12, color: C.mutedLight }}>{data.platform || platform}</span>
        </div>
        <button onClick={copy} style={{
          border: `1px solid ${C.border}`, borderRadius: 999, padding: '4px 12px',
          fontSize: 12, color: C.muted, background: C.bg, cursor: 'pointer', fontFamily: 'inherit',
        }}>
          {copied ? '✓ Copiado' : 'Copiar'}
        </button>
      </div>

      {data.opening && (
        <div style={{ marginBottom: 12 }}>
          <FieldLabel>Opening</FieldLabel>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: C.text }}>{data.opening}</p>
        </div>
      )}
      {data.body && (
        <div style={{ marginBottom: 12 }}>
          <FieldLabel>Cuerpo</FieldLabel>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: C.text }}>{data.body}</p>
        </div>
      )}
      {data.cta && (
        <div style={{ background: C.bgWarm, borderRadius: 8, padding: '10px 12px', marginBottom: 12 }}>
          <p style={{ fontSize: 14, color: C.text, fontWeight: 500 }}>CTA: {data.cta}</p>
        </div>
      )}
      {data.cadence && (
        <>
          <Divider />
          <SectionTitle>Cadencia</SectionTitle>
          {Object.entries(data.cadence).map(([day, action]) => (
            <div key={day} style={{ display: 'flex', gap: 12, marginBottom: 6 }}>
              <span style={{ fontSize: 12, color: C.mutedLight, minWidth: 48 }}>{day.replace('_', ' ')}</span>
              <span style={{ fontSize: 12, color: C.muted }}>{action}</span>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

// ── Conversation Result ─────────────────────────────────────

function ConvResult({ data }) {
  return (
    <div style={{ animation: 'fadeUp 0.25s ease' }}>
      {/* Header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Tag type={data.qualified ? 'green' : 'red'}>{data.qualified ? '✓ Califica' : '✗ No califica'}</Tag>
        <span style={{ fontSize: 13, color: C.muted }}>
          Entusiasmo: <strong style={{ color: C.text }}>{Math.round(data.enthusiasm * 100)}%</strong>
        </span>
      </div>

      {/* Summary */}
      {data.summary && (
        <div style={{ background: C.bgWarm, borderRadius: 10, padding: 14, marginBottom: 20 }}>
          <p style={{ fontSize: 14, color: C.text, lineHeight: 1.7 }}>{data.summary}</p>
        </div>
      )}

      {/* Pain Points */}
      {data.pain_points?.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <SectionTitle>Pain Points</SectionTitle>
          {data.pain_points.map((p, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 0', borderBottom: `1px solid ${C.border}` }}>
              <span style={{ fontSize: 14, color: C.text }}>{p.pain}</span>
              <Tag type={p.emotional_intensity}>{p.emotional_intensity}</Tag>
            </div>
          ))}
        </div>
      )}

      {/* Objections */}
      {data.objections?.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <SectionTitle>Objeciones</SectionTitle>
          {data.objections.map((o, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 14, color: C.text, fontWeight: 500 }}>{o.objection}</span>
                <Tag type={o.severity}>{o.severity}</Tag>
              </div>
              <p style={{ fontSize: 13, color: C.muted }}>→ {o.suggested_handling}</p>
            </div>
          ))}
        </div>
      )}

      {/* Buyer Signals */}
      {data.buyer_signals && (
        <div style={{ marginBottom: 20 }}>
          <SectionTitle>Buyer Signals</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {[['Etapa', data.buyer_signals.stage], ['Autoridad', data.buyer_signals.authority], ['Timeline', data.buyer_signals.timeline], ['Budget', data.buyer_signals.budget]]
              .filter(([, v]) => v)
              .map(([label, value]) => (
                <div key={label} style={{ background: C.bgWarm, borderRadius: 8, padding: '10px 12px' }}>
                  <p style={{ fontSize: 11, color: C.mutedLight, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>{label}</p>
                  <p style={{ fontSize: 13, color: C.text }}>{value}</p>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Next Step */}
      {data.next_step && (
        <div style={{ border: `1px solid ${C.borderDark}`, borderRadius: 10, padding: 14, background: C.bg }}>
          <p style={{ fontSize: 11, color: C.text, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Próximo paso</p>
          <p style={{ fontSize: 14, color: C.text, fontWeight: 500, marginBottom: 4 }}>{data.next_step.action}</p>
          {data.next_step.timing && <p style={{ fontSize: 13, color: C.muted, marginBottom: 4 }}>Timing: {data.next_step.timing}</p>}
          {data.next_step.suggested_messaging && <p style={{ fontSize: 13, color: C.muted, fontStyle: 'italic' }}>"{data.next_step.suggested_messaging}"</p>}
        </div>
      )}
    </div>
  );
}
