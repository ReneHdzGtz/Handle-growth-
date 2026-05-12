import Head from 'next/head';
import { useState } from 'react';

const COLORS = {
  bg: '#0a0a0a',
  surface: '#111111',
  border: '#1e1e1e',
  accent: '#00c7b7',
  accentDim: '#00c7b720',
  text: '#e8e8e8',
  muted: '#666',
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
};

const SAMPLE_PROSPECTS = [
  { name: 'Carlos Mendoza', company: 'Seguros Nacional MX', title: 'Operations Manager', location: 'CDMX', company_size: '45', notes: 'Usa Excel para todo, 200 emails/día, creció 40% YoY' },
];

const SAMPLE_CONVERSATION = `Hola, gracias por conectar. Vi tu mensaje sobre Handle.

Actualmente en nuestra brokerage usamos Excel y correo para todo. Mi equipo dedica unas 4 horas diarias solo a capturar datos de pólizas manualmente. Cometemos errores constantemente y los clientes se quejan de la lentitud.

Tenemos 50 personas, manejamos unos 300 clientes activos. Me interesa saber cómo funciona exactamente Handle y cuánto cuesta. ¿Tienes casos de éxito con brokers de nuestro tamaño?`;

export default function Agent() {
  const [tab, setTab] = useState('score');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Score tab state
  const [prospectsText, setProspectsText] = useState(JSON.stringify(SAMPLE_PROSPECTS, null, 2));

  // Outreach tab state
  const [outreachProspect, setOutreachProspect] = useState(JSON.stringify(SAMPLE_PROSPECTS[0], null, 2));
  const [platform, setPlatform] = useState('linkedin');

  // Conversation tab state
  const [convText, setConvText] = useState(SAMPLE_CONVERSATION);
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
      const prospects = JSON.parse(prospectsText);
      callAgent('score', { prospects: Array.isArray(prospects) ? prospects : [prospects] });
    } catch {
      setError('JSON inválido en el campo de prospectos');
    }
  }

  function handleOutreach() {
    try {
      const prospect = JSON.parse(outreachProspect);
      callAgent('outreach', { prospect, platform });
    } catch {
      setError('JSON inválido en el campo de prospecto');
    }
  }

  function handleConversation() {
    if (!convText.trim()) return setError('Pega el texto de la conversación');
    callAgent('conversation', { text: convText, context: convContext });
  }

  return (
    <>
      <Head>
        <title>Handle Growth Agent — Playground</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div style={{ minHeight: '100vh', background: COLORS.bg, color: COLORS.text, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
        {/* Header */}
        <div style={{ borderBottom: `1px solid ${COLORS.border}`, padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <a href="/" style={{ color: COLORS.muted, textDecoration: 'none', fontSize: 14 }}>← Handle</a>
            <span style={{ color: COLORS.border }}>/</span>
            <span style={{ color: COLORS.accent, fontWeight: 600, fontSize: 14 }}>Growth Agent V2</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: COLORS.success }} />
            <span style={{ fontSize: 12, color: COLORS.muted }}>Claude claude-sonnet-4-6</span>
          </div>
        </div>

        <div style={{ maxWidth: 960, margin: '0 auto', padding: '40px 24px' }}>
          {/* Title */}
          <div style={{ marginBottom: 40 }}>
            <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Agent Playground</h1>
            <p style={{ color: COLORS.muted, fontSize: 15 }}>
              Prueba los 3 agentes principales en vivo. Los outputs son generados por Claude en tiempo real.
            </p>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 4, marginBottom: 32, borderBottom: `1px solid ${COLORS.border}`, paddingBottom: 0 }}>
            {[
              { id: 'score', label: '① Score de Leads' },
              { id: 'outreach', label: '② Outreach A/B' },
              { id: 'conversation', label: '③ Conversation Intel' },
            ].map(t => (
              <button
                key={t.id}
                onClick={() => { setTab(t.id); setResult(null); setError(null); }}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: '10px 20px', fontSize: 14, fontWeight: 500,
                  color: tab === t.id ? COLORS.accent : COLORS.muted,
                  borderBottom: tab === t.id ? `2px solid ${COLORS.accent}` : '2px solid transparent',
                  marginBottom: -1, transition: 'color 0.15s',
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'start' }}>
            {/* INPUT PANEL */}
            <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: 12, color: COLORS.muted, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>Input</div>

              {/* SCORE TAB */}
              {tab === 'score' && (
                <>
                  <Label>Prospectos (JSON array)</Label>
                  <Textarea value={prospectsText} onChange={e => setProspectsText(e.target.value)} rows={14} />
                  <p style={{ fontSize: 12, color: COLORS.muted, marginTop: 8 }}>
                    Campos: name, company, title, location, company_size, notes
                  </p>
                  <RunButton onClick={handleScore} loading={loading}>Scorear leads →</RunButton>
                </>
              )}

              {/* OUTREACH TAB */}
              {tab === 'outreach' && (
                <>
                  <Label>Prospecto (JSON)</Label>
                  <Textarea value={outreachProspect} onChange={e => setOutreachProspect(e.target.value)} rows={10} />
                  <Label style={{ marginTop: 16 }}>Platform</Label>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                    {['linkedin', 'email'].map(p => (
                      <button key={p} onClick={() => setPlatform(p)} style={{
                        padding: '6px 16px', borderRadius: 6, border: `1px solid ${platform === p ? COLORS.accent : COLORS.border}`,
                        background: platform === p ? COLORS.accentDim : 'transparent',
                        color: platform === p ? COLORS.accent : COLORS.muted,
                        cursor: 'pointer', fontSize: 13, fontWeight: 500,
                      }}>{p}</button>
                    ))}
                  </div>
                  <RunButton onClick={handleOutreach} loading={loading}>Generar outreach A/B →</RunButton>
                </>
              )}

              {/* CONVERSATION TAB */}
              {tab === 'conversation' && (
                <>
                  <Label>Texto de la conversación</Label>
                  <Textarea value={convText} onChange={e => setConvText(e.target.value)} rows={12} placeholder="Pega el email, transcript de call o mensaje de LinkedIn..." />
                  <Label style={{ marginTop: 16 }}>Contexto adicional (opcional)</Label>
                  <input
                    value={convContext}
                    onChange={e => setConvContext(e.target.value)}
                    placeholder="Ej: Es el segundo contacto, ya tuvo una demo..."
                    style={{
                      width: '100%', background: COLORS.bg, border: `1px solid ${COLORS.border}`,
                      borderRadius: 8, padding: '10px 12px', color: COLORS.text, fontSize: 13,
                      marginBottom: 16, boxSizing: 'border-box',
                    }}
                  />
                  <RunButton onClick={handleConversation} loading={loading}>Analizar conversación →</RunButton>
                </>
              )}
            </div>

            {/* OUTPUT PANEL */}
            <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 24, minHeight: 400 }}>
              <div style={{ fontSize: 12, color: COLORS.muted, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>Output</div>

              {!result && !error && !loading && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 320, gap: 12 }}>
                  <div style={{ fontSize: 32 }}>⚡</div>
                  <p style={{ color: COLORS.muted, fontSize: 14, textAlign: 'center' }}>
                    Completa el formulario y ejecuta el agente
                  </p>
                </div>
              )}

              {loading && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 320, gap: 16 }}>
                  <div style={{ width: 32, height: 32, border: `2px solid ${COLORS.border}`, borderTopColor: COLORS.accent, borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                  <p style={{ color: COLORS.muted, fontSize: 14 }}>Claude está procesando...</p>
                </div>
              )}

              {error && (
                <div style={{ background: '#1a0a0a', border: `1px solid ${COLORS.error}30`, borderRadius: 8, padding: 16 }}>
                  <p style={{ color: COLORS.error, fontSize: 13 }}>⚠ {error}</p>
                </div>
              )}

              {result && !loading && (
                <div style={{ overflowY: 'auto', maxHeight: 520 }}>
                  {tab === 'score' && <ScoreResult data={result} />}
                  {tab === 'outreach' && <OutreachResult data={result} />}
                  {tab === 'conversation' && <ConversationResult data={result} />}
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div style={{ marginTop: 48, textAlign: 'center', color: COLORS.muted, fontSize: 13 }}>
            <a href="/slides" style={{ color: COLORS.muted, textDecoration: 'none' }}>Ver presentación →</a>
            <span style={{ margin: '0 16px' }}>·</span>
            <a href="https://github.com/ReneHdzGtz/Handle-growth-/tree/v2" target="_blank" rel="noopener noreferrer" style={{ color: COLORS.muted, textDecoration: 'none' }}>GitHub V2 →</a>
          </div>
        </div>
      </div>

      <style jsx global>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${COLORS.bg}; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        textarea, input { outline: none; font-family: inherit; }
        textarea:focus, input:focus { border-color: ${COLORS.accent} !important; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${COLORS.border}; border-radius: 2px; }
      `}</style>
    </>
  );
}

// ---- Sub-components ----

function Label({ children, style }) {
  return <p style={{ fontSize: 12, color: '#888', marginBottom: 8, fontWeight: 500, ...style }}>{children}</p>;
}

function Textarea({ rows = 8, ...props }) {
  return (
    <textarea
      rows={rows}
      {...props}
      style={{
        width: '100%', background: '#0a0a0a', border: `1px solid #1e1e1e`,
        borderRadius: 8, padding: '10px 12px', color: '#e8e8e8',
        fontSize: 12, fontFamily: 'monospace', resize: 'vertical',
        lineHeight: 1.6, marginBottom: 8, display: 'block',
      }}
    />
  );
}

function RunButton({ onClick, loading, children }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      style={{
        width: '100%', padding: '12px', borderRadius: 8,
        background: loading ? '#1e1e1e' : COLORS.accent,
        border: 'none', color: loading ? '#555' : '#000',
        fontWeight: 700, fontSize: 14, cursor: loading ? 'not-allowed' : 'pointer',
        marginTop: 8, transition: 'background 0.15s',
      }}
    >
      {loading ? 'Procesando...' : children}
    </button>
  );
}

function ScoreCard({ lead }) {
  const score = lead.receptiveness_score;
  const color = score >= 0.8 ? COLORS.success : score >= 0.6 ? COLORS.warning : COLORS.error;
  return (
    <div style={{ background: COLORS.bg, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 16, marginBottom: 12, animation: 'fadeIn 0.3s ease' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div>
          <p style={{ fontWeight: 700, fontSize: 15 }}>{lead.name}</p>
          <p style={{ color: COLORS.muted, fontSize: 13 }}>{lead.title} · {lead.company}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 22, fontWeight: 800, color }}>{(score * 100).toFixed(0)}</div>
          <div style={{ fontSize: 11, color: COLORS.muted }}>/ 100</div>
        </div>
      </div>
      <div style={{ background: '#1a1a1a', borderRadius: 4, height: 4, marginBottom: 12 }}>
        <div style={{ height: 4, borderRadius: 4, background: color, width: `${score * 100}%`, transition: 'width 0.6s ease' }} />
      </div>
      <p style={{ fontSize: 12, color: '#aaa', marginBottom: 8, lineHeight: 1.6 }}>
        <span style={{ color: COLORS.muted }}>Por qué califica: </span>{lead.why_qualified}
      </p>
      <div style={{ background: `${COLORS.accent}10`, border: `1px solid ${COLORS.accent}20`, borderRadius: 6, padding: '8px 10px' }}>
        <p style={{ fontSize: 12, color: COLORS.accent }}>→ {lead.next_action}</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
        <span style={{ fontSize: 11, color: COLORS.muted }}>Budget est.: {lead.estimated_budget}</span>
        <span style={{ fontSize: 11, color: COLORS.muted }}>Prioridad #{lead.priority}</span>
      </div>
    </div>
  );
}

function ScoreResult({ data }) {
  const leads = data.leads || [];
  return (
    <>
      <p style={{ fontSize: 12, color: COLORS.muted, marginBottom: 16 }}>{leads.length} lead{leads.length !== 1 ? 's' : ''} scoreado{leads.length !== 1 ? 's' : ''}</p>
      {leads.map((l, i) => <ScoreCard key={i} lead={l} />)}
    </>
  );
}

function MessageCard({ variant, data }) {
  const [copied, setCopied] = useState(false);
  const full = [data.opening, data.body, data.cta].filter(Boolean).join('\n\n');
  function copy() {
    navigator.clipboard.writeText(full);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
  return (
    <div style={{ background: COLORS.bg, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 16, marginBottom: 12, animation: 'fadeIn 0.3s ease' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ background: variant === 'A' ? '#7c3aed20' : '#0ea5e920', color: variant === 'A' ? '#a78bfa' : '#38bdf8', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 4 }}>
            VARIANTE {variant}
          </span>
          <span style={{ fontSize: 11, color: COLORS.muted }}>{data.platform}</span>
        </div>
        <button onClick={copy} style={{ background: 'none', border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: '4px 10px', color: COLORS.muted, fontSize: 11, cursor: 'pointer' }}>
          {copied ? '✓ Copiado' : 'Copiar'}
        </button>
      </div>
      {data.opening && <div style={{ marginBottom: 10 }}><Label>Opening</Label><p style={{ fontSize: 13, lineHeight: 1.7, color: '#ddd' }}>{data.opening}</p></div>}
      {data.body && <div style={{ marginBottom: 10 }}><Label>Cuerpo</Label><p style={{ fontSize: 13, lineHeight: 1.7, color: '#ddd' }}>{data.body}</p></div>}
      {data.cta && <div style={{ background: `${COLORS.accent}10`, border: `1px solid ${COLORS.accent}20`, borderRadius: 6, padding: '8px 10px' }}><p style={{ fontSize: 13, color: COLORS.accent }}>CTA: {data.cta}</p></div>}
      {data.cadence && (
        <div style={{ marginTop: 12, borderTop: `1px solid ${COLORS.border}`, paddingTop: 12 }}>
          <Label>Cadencia</Label>
          {Object.entries(data.cadence).map(([day, action]) => (
            <p key={day} style={{ fontSize: 12, color: COLORS.muted, marginBottom: 4 }}>
              <span style={{ color: '#666', minWidth: 50, display: 'inline-block' }}>{day.replace('_', ' ')}:</span> {action}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

function OutreachResult({ data }) {
  return (
    <>
      {data.variantA && <MessageCard variant="A" data={data.variantA} />}
      {data.variantB && <MessageCard variant="B" data={data.variantB} />}
    </>
  );
}

function Badge({ children, type = 'neutral' }) {
  const colors = {
    high: { bg: '#1a0a0a', color: COLORS.error, border: `${COLORS.error}30` },
    medium: { bg: '#1a1000', color: COLORS.warning, border: `${COLORS.warning}30` },
    low: { bg: '#0a1a0a', color: COLORS.success, border: `${COLORS.success}30` },
    neutral: { bg: '#111', color: COLORS.muted, border: COLORS.border },
  };
  const c = colors[type] || colors.neutral;
  return (
    <span style={{ background: c.bg, color: c.color, border: `1px solid ${c.border}`, fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 4, textTransform: 'uppercase' }}>
      {children}
    </span>
  );
}

function ConversationResult({ data }) {
  return (
    <div style={{ animation: 'fadeIn 0.3s ease' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Badge type={data.qualified ? 'low' : 'high'}>{data.qualified ? '✓ Califica' : '✗ No califica'}</Badge>
        <span style={{ fontSize: 13, color: COLORS.muted }}>Entusiasmo: <span style={{ color: COLORS.text, fontWeight: 600 }}>{(data.enthusiasm * 100).toFixed(0)}%</span></span>
      </div>

      {data.summary && (
        <div style={{ background: COLORS.bg, borderRadius: 8, padding: 12, marginBottom: 16, border: `1px solid ${COLORS.border}` }}>
          <p style={{ fontSize: 13, color: '#ccc', lineHeight: 1.7 }}>{data.summary}</p>
        </div>
      )}

      {data.pain_points?.length > 0 && (
        <Section title="Pain Points">
          {data.pain_points.map((p, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: `1px solid ${COLORS.border}` }}>
              <p style={{ fontSize: 13, color: '#ddd' }}>{p.pain}</p>
              <Badge type={p.emotional_intensity}>{p.emotional_intensity}</Badge>
            </div>
          ))}
        </Section>
      )}

      {data.objections?.length > 0 && (
        <Section title="Objeciones">
          {data.objections.map((o, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <p style={{ fontSize: 13, color: '#ddd', fontWeight: 500 }}>{o.objection}</p>
                <Badge type={o.severity}>{o.severity}</Badge>
              </div>
              <p style={{ fontSize: 12, color: COLORS.muted }}>→ {o.suggested_handling}</p>
            </div>
          ))}
        </Section>
      )}

      {data.buyer_signals && (
        <Section title="Buyer Signals">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {[
              ['Etapa', data.buyer_signals.stage],
              ['Autoridad', data.buyer_signals.authority],
              ['Timeline', data.buyer_signals.timeline],
              ['Budget', data.buyer_signals.budget],
            ].map(([label, value]) => value && (
              <div key={label} style={{ background: COLORS.bg, borderRadius: 6, padding: '8px 10px', border: `1px solid ${COLORS.border}` }}>
                <p style={{ fontSize: 10, color: COLORS.muted, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 2 }}>{label}</p>
                <p style={{ fontSize: 12, color: '#ddd' }}>{value}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {data.next_step && (
        <div style={{ background: `${COLORS.accent}10`, border: `1px solid ${COLORS.accent}20`, borderRadius: 8, padding: 12, marginTop: 16 }}>
          <p style={{ fontSize: 11, color: COLORS.accent, fontWeight: 700, marginBottom: 4 }}>PRÓXIMO PASO</p>
          <p style={{ fontSize: 13, color: '#ddd', marginBottom: 4 }}>{data.next_step.action}</p>
          <p style={{ fontSize: 12, color: COLORS.muted }}>Timing: {data.next_step.timing}</p>
          {data.next_step.suggested_messaging && (
            <p style={{ fontSize: 12, color: COLORS.muted, marginTop: 4 }}>Mensaje: "{data.next_step.suggested_messaging}"</p>
          )}
        </div>
      )}
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <p style={{ fontSize: 11, color: COLORS.muted, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8, fontWeight: 600 }}>{title}</p>
      {children}
    </div>
  );
}
