import { useState, useEffect } from 'react'
import Head from 'next/head'

export default function Slides() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') current < 8 && setCurrent(current + 1)
      if (e.key === 'ArrowLeft') current > 0 && setCurrent(current - 1)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [current])

  const slides = [
    {
      type: 'title',
      title: 'HANDLE GROWTH AGENT',
      subtitle: 'A system that scales sales without you',
      meta: 'GROWTH AGENT · PHASE 1 PROPOSAL',
    },
    {
      type: 'problem',
      title: 'THE PROBLEM',
      subtitle: 'Handle has product-market fit. Sales don't scale.',
      desc: 'Strong traction, strong product — but 80% of pipeline still runs through one person.',
      works: ['Product is strong — 94% time reduction', 'Brokers are happy — Inter.mx, Genomma Lab, De Acero', 'Funded — $6.7M seed, a16z led'],
      doesnt: ['Poncho is the bottleneck — 80% of sales is him', 'No playbook — every conversation is improvised', 'Lost learning — insight disappears into Slack'],
    },
    {
      type: 'solution',
      title: 'THE SOLUTION',
      subtitle: 'An AI system that learns your playbook, then runs it without you',
      desc: 'Five components working together — from sourcing to predictions — turning every conversation into structured, replicable knowledge.',
      components: [
        { num: '01', title: 'Filter the right brokers', desc: 'Score and rank by receptiveness' },
        { num: '02', title: 'Personalize at scale', desc: 'Real research, not templates. A/B variants' },
        { num: '03', title: 'Capture every signal', desc: 'Pain, objections, budget — structured' },
        { num: '04', title: 'Identify the patterns', desc: 'Confidence scores across 30 conversations' },
        { num: '05', title: 'Predict what closes', desc: 'Deal health, stalling alerts, revenue' },
      ],
    },
    {
      type: 'flow',
      title: 'HOW IT WORKS',
      subtitle: 'Three weeks, three phases — one playbook',
      weeks: [
        { week: 'WEEK 01', title: 'Generate & score', tasks: ['Integrate sourcing', 'Score 50 brokers', 'Rank by receptiveness', 'Extract top 30'], deliverable: 'Ranked broker list' },
        { week: 'WEEK 02', title: 'Outreach & capture', tasks: ['30 personalized messages', 'A/B tested', 'Conversation Intelligence', 'Captures responses'], deliverable: '25–30 conversations' },
        { week: 'WEEK 03', title: 'Learn & predict', tasks: ['Aggregate conversations', 'Detect patterns', 'Score confidence', 'Generate playbook'], deliverable: 'Playbook v1.0' },
      ],
    },
    {
      type: 'architecture',
      title: 'ARCHITECTURE',
      subtitle: 'Five components, one system',
      components: [
        { num: '01', title: 'Lead generation & scoring', desc: 'Analyzes sources, scores by activity', output: 'Ranked list' },
        { num: '02', title: 'Outreach personalization', desc: 'Per-broker research. Two variants', output: '50 messages' },
        { num: '03', title: 'Conversation intelligence', desc: 'Parses replies, extracts signals', output: 'Insights' },
        { num: '04', title: 'Playbook learning', desc: 'Aggregates 30 conversations, detects patterns', output: 'Playbook v1.0' },
        { num: '05', title: 'Predictions & alerts', desc: 'Deal health scoring, stalling detection', output: 'Revenue forecast' },
      ],
    },
    {
      type: 'results',
      title: 'RESULTS',
      subtitle: 'A playbook with confidence scores',
      desc: 'Patterns identified across 30 real conversations — ranked, weighted, ready for the team',
      patterns: [
        { name: 'Email overload', conf: 95 },
        { name: 'Manual data entry', conf: 92 },
        { name: 'Client response time', conf: 88 },
        { name: '"Can we trust AI?" objection', conf: 88 },
        { name: 'Budget sweet-spot $3–8k/mo', conf: 90 },
      ],
      stats: ['50\nBROKERS\nSCORED', '30\nCONVERSATIONS\nANALYZED', '7–10\nPATTERNS\nIDENTIFIED', '95%\nAVG\nCONFIDENCE'],
    },
    {
      type: 'timeline',
      title: '21-DAY TIMELINE',
      subtitle: 'Aggressive but achievable',
      weeks: [
        { week: 'WEEK 01 — MAY 11', items: ['Mon–Tue: Integrate Apollo + Supabase', 'Wed–Thu: Score 50 brokers', 'Fri: Review & calibration'], deliv: 'Ranked list' },
        { week: 'WEEK 02 — MAY 18', items: ['Mon–Tue: Generate variants', 'Wed: Launch 30 messages', 'Thu–Fri: Analyze responses'], deliv: 'Conversation DB' },
        { week: 'WEEK 03 — MAY 25', items: ['Mon–Tue: Aggregate conversations', 'Wed–Thu: Generate Playbook v1.0', 'Fri: Final presentation'], deliv: 'Playbook v1.0' },
      ],
    },
    {
      type: 'investment',
      title: 'PHASE 1 INVESTMENT',
      subtitle: '$7K to de-risk sales scaling',
      investment: { total: '$7,000', duration: '3 weeks', hours: '120 hours', sync: '30 min/week', deliv: 'Playbook v1.0' },
      requirements: ['Approval for Phase 1', 'Access to data (10–15 recent conversations)', 'Weekly Monday sync (30 minutes)'],
      compare: 'vs $500K+ & 6–12 months to hire and ramp three AEs',
    },
    {
      type: 'closing',
      title: 'NEXT STEPS',
      subtitle: 'If yes — Monday we start',
      desc: 'Set up environment, integrate sourcing, calibrate scoring model. By Friday of Week 1 you have a ranked list. Three weeks later, playbook your team can run.',
      items: ['Confirm Phase 1', 'Schedule data-access sync', 'Calendar invite for Monday standup'],
      vision: 'Month 1 prove · Months 2–3 integrate · Month 4+ scale · Year 1, 500+ brokers',
    },
  ]

  const slide = slides[current]

  return (
    <>
      <Head>
        <title>Handle Growth Agent</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: -apple-system, sans-serif; background: #fff; overflow: hidden; }
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
          .slide { animation: fadeIn 0.5s ease-out; }
          .item { animation: slideUp 0.6s ease-out; }
        `}</style>
      </Head>

      <div style={styles.root}>
        {/* SLIDE CONTAINER */}
        <div style={styles.slide} className="slide">
          <div style={styles.inner}>
            {/* HEADER */}
            <div style={styles.header}>
              <span style={styles.pageNum}>{current + 1} / 9</span>
            </div>

            {/* CONTENT */}
            <div style={styles.content}>
              {slide.type === 'title' && (
                <>
                  <div style={styles.meta}>{slide.meta}</div>
                  <h1 style={styles.h1}>{slide.title}</h1>
                  <p style={styles.subtitle}>{slide.subtitle}</p>
                </>
              )}

              {slide.type === 'problem' && (
                <>
                  <h1 style={styles.h1}>{slide.title}</h1>
                  <p style={styles.h2}>{slide.subtitle}</p>
                  <p style={styles.p}>{slide.desc}</p>
                  <div style={styles.cols}>
                    <div style={styles.col} className="item">
                      <h4 style={{ ...styles.colh, color: '#1b5e20' }}>WHAT WORKS</h4>
                      {slide.works.map((w, i) => <div key={i} style={styles.bullet}>+ {w}</div>)}
                    </div>
                    <div style={styles.col} className="item">
                      <h4 style={{ ...styles.colh, color: '#d32f2f' }}>WHAT DOESN'T</h4>
                      {slide.doesnt.map((d, i) => <div key={i} style={styles.bullet}>− {d}</div>)}
                    </div>
                  </div>
                </>
              )}

              {slide.type === 'solution' && (
                <>
                  <h1 style={styles.h1}>{slide.title}</h1>
                  <p style={styles.h2}>{slide.subtitle}</p>
                  <p style={styles.p}>{slide.desc}</p>
                  <div style={styles.grid5}>
                    {slide.components.map((c, i) => (
                      <div key={i} style={styles.card} className="item" style={{...styles.card, animationDelay: `${i * 0.1}s`}}>
                        <div style={styles.num}>{c.num}</div>
                        <h4 style={styles.cardh}>{c.title}</h4>
                        <p style={styles.cardd}>{c.desc}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {slide.type === 'flow' && (
                <>
                  <h1 style={styles.h1}>{slide.title}</h1>
                  <p style={styles.h2}>{slide.subtitle}</p>
                  <div style={styles.grid3}>
                    {slide.weeks.map((w, i) => (
                      <div key={i} style={styles.card} className="item">
                        <div style={styles.wk}>{w.week}</div>
                        <h4 style={styles.cardh}>{w.title}</h4>
                        <ul style={styles.list}>
                          {w.tasks.map((t, j) => <li key={j} style={styles.li}>{t}</li>)}
                        </ul>
                        <div style={styles.deliv}><strong>Deliverable:</strong><br />{w.deliverable}</div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {slide.type === 'architecture' && (
                <>
                  <h1 style={styles.h1}>{slide.title}</h1>
                  <p style={styles.h2}>{slide.subtitle}</p>
                  <div style={styles.grid5}>
                    {slide.components.map((c, i) => (
                      <div key={i} style={styles.card} className="item">
                        <div style={styles.num}>{c.num}</div>
                        <h4 style={styles.cardh}>{c.title}</h4>
                        <p style={styles.cardd}>{c.desc}</p>
                        <div style={styles.out}><strong>Output:</strong> {c.output}</div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {slide.type === 'results' && (
                <>
                  <h1 style={styles.h1}>{slide.title}</h1>
                  <p style={styles.h2}>{slide.subtitle}</p>
                  <p style={styles.p}>{slide.desc}</p>
                  <div style={styles.patterns} className="item">
                    {slide.patterns.map((p, i) => (
                      <div key={i} style={styles.prow}>
                        <span>{p.name}</span>
                        <div style={styles.bar}>
                          <div style={{ ...styles.fill, width: `${p.conf}%` }} />
                        </div>
                        <span style={styles.conf}>{p.conf}%</span>
                      </div>
                    ))}
                  </div>
                  <div style={styles.stats}>
                    {slide.stats.map((s, i) => (
                      <div key={i} style={styles.stat} className="item">
                        {s.split('\n').map((line, j) => <div key={j}>{line}</div>)}
                      </div>
                    ))}
                  </div>
                </>
              )}

              {slide.type === 'timeline' && (
                <>
                  <h1 style={styles.h1}>{slide.title}</h1>
                  <p style={styles.h2}>{slide.subtitle}</p>
                  <div style={styles.grid3}>
                    {slide.weeks.map((w, i) => (
                      <div key={i} style={styles.card} className="item">
                        <div style={styles.wk}>{w.week}</div>
                        <ul style={styles.list}>
                          {w.items.map((item, j) => <li key={j} style={styles.li}>{item}</li>)}
                        </ul>
                        <div style={styles.deliv}><strong>Deliverable:</strong><br />{w.deliv}</div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {slide.type === 'investment' && (
                <>
                  <h1 style={styles.h1}>{slide.title}</h1>
                  <p style={styles.h2}>{slide.subtitle}</p>
                  <div style={styles.invbox} className="item">
                    {Object.entries(slide.investment).map(([k, v]) => (
                      <div key={k} style={styles.invrow}>
                        <span>{k}</span>
                        <strong>{v}</strong>
                      </div>
                    ))}
                  </div>
                  <h3 style={styles.h3}>WHAT I NEED FROM YOU</h3>
                  {slide.requirements.map((r, i) => (
                    <div key={i} style={styles.req} className="item">
                      <strong>{i + 1}.</strong> {r}
                    </div>
                  ))}
                  <p style={{...styles.p, fontSize: '13px', color: '#999', marginTop: '20px'}}>{slide.compare}</p>
                </>
              )}

              {slide.type === 'closing' && (
                <>
                  <h1 style={styles.h1}>{slide.title}</h1>
                  <p style={styles.h2}>{slide.subtitle}</p>
                  <p style={styles.p}>{slide.desc}</p>
                  <h3 style={styles.h3}>THIS WEEK</h3>
                  {slide.items.map((item, i) => (
                    <div key={i} style={styles.req} className="item">
                      · {item}
                    </div>
                  ))}
                  <h3 style={styles.h3}>LONG-TERM VISION</h3>
                  <p style={styles.p}>{slide.vision}</p>
                  <div style={styles.cta}>Ready when you are</div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* CONTROLS */}
        <div style={styles.controls}>
          <button onClick={() => current > 0 && setCurrent(current - 1)} style={styles.btn}>← Prev</button>
          <div style={styles.dots}>
            {[...Array(9)].map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} style={{...styles.dot, backgroundColor: i === current ? '#0a0a0a' : '#ddd'}} />
            ))}
          </div>
          <button onClick={() => current < 8 && setCurrent(current + 1)} style={styles.btn}>Next →</button>
        </div>
      </div>
    </>
  )
}

const styles = {
  root: { width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#fff' },
  slide: { flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'auto', padding: '60px 40px', '@media (max-width: 768px)': { padding: '40px 20px' } },
  inner: { maxWidth: 1200, width: '100%' },
  header: { marginBottom: '40px', paddingBottom: '20px', borderBottom: '1px solid #e0e0e0', textAlign: 'right' },
  pageNum: { fontSize: '12px', color: '#999', fontWeight: 500, letterSpacing: '0.08em' },
  content: { },
  meta: { fontSize: '12px', color: '#999', letterSpacing: '0.1em', marginBottom: '20px' },
  h1: { fontSize: 'clamp(36px, 8vw, 56px)', fontWeight: 700, margin: '0 0 12px 0', letterSpacing: '-0.01em' },
  h2: { fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: 400, color: '#666', margin: '0 0 24px 0' },
  h3: { fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '28px 0 16px 0' },
  p: { fontSize: 'clamp(14px, 2vw, 16px)', lineHeight: 1.6, color: '#555', marginBottom: '24px' },
  cols: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginTop: '32px' },
  col: { },
  colh: { fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', marginBottom: '12px' },
  bullet: { fontSize: 'clamp(13px, 2vw, 15px)', lineHeight: 1.7, marginBottom: '10px', color: '#444' },
  grid5: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginTop: '32px' },
  grid3: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginTop: '32px' },
  card: { padding: '20px', border: '1px solid #e0e0e0', borderRadius: '6px', backgroundColor: '#f9f9f9' },
  num: { fontSize: '20px', fontWeight: 700, color: '#0066cc', marginBottom: '8px' },
  cardh: { fontSize: '13px', fontWeight: 600, margin: '0 0 8px 0' },
  cardd: { fontSize: '12px', lineHeight: 1.5, color: '#666', margin: 0 },
  wk: { fontSize: '10px', color: '#0066cc', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '12px' },
  list: { listStyle: 'none', padding: 0, margin: '0 0 16px 0' },
  li: { fontSize: '12px', lineHeight: 1.6, color: '#444', marginBottom: '6px' },
  deliv: { fontSize: '11px', color: '#666', paddingTop: '12px', borderTop: '1px solid #e0e0e0', fontStyle: 'italic' },
  out: { fontSize: '10px', color: '#999', paddingTop: '12px', borderTop: '1px solid #e0e0e0' },
  patterns: { marginTop: '32px' },
  prow: { display: 'flex', alignItems: 'center', padding: '12px', borderBottom: '1px solid #f0f0f0', fontSize: '13px', gap: '12px' },
  bar: { flex: 1, height: '6px', backgroundColor: '#f0f0f0', borderRadius: '3px', overflow: 'hidden' },
  fill: { height: '100%', backgroundColor: '#0066cc' },
  conf: { fontSize: '12px', fontWeight: 600, color: '#0066cc', minWidth: '40px', textAlign: 'right' },
  stats: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '24px', marginTop: '40px' },
  stat: { textAlign: 'center', padding: '24px 0', borderTop: '2px solid #0066cc', fontSize: 'clamp(18px, 4vw, 32px)', fontWeight: 700, color: '#0066cc', lineHeight: 1.4 },
  invbox: { marginTop: '24px', padding: '20px', border: '1px solid #e0e0e0', borderRadius: '6px', backgroundColor: '#f9f9f9' },
  invrow: { display: 'flex', justifyContent: 'space-between', padding: '12px 0', fontSize: '13px', borderBottom: '1px solid #e0e0e0' },
  req: { fontSize: 'clamp(13px, 2vw, 15px)', lineHeight: 1.7, marginBottom: '8px', color: '#555' },
  cta: { marginTop: '48px', fontSize: 'clamp(28px, 6vw, 36px)', fontWeight: 600, color: '#0066cc', textAlign: 'center' },
  controls: { height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px', borderTop: '1px solid #e0e0e0', backgroundColor: '#fff' },
  btn: { padding: '8px 20px', border: '1px solid #0a0a0a', borderRadius: '4px', fontSize: '12px', fontWeight: 500, backgroundColor: '#fff', color: '#0a0a0a', cursor: 'pointer', transition: 'all 0.2s' },
  dots: { display: 'flex', gap: '6px' },
  dot: { width: '8px', height: '8px', borderRadius: '50%', border: 'none', cursor: 'pointer', transition: 'background-color 0.2s' },
}
