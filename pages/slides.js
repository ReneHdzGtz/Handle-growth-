import React, { useState, useEffect } from 'react'
import Head from 'next/head'

const SLIDES = [
  {
    id: 1,
    title: 'HANDLE GROWTH AGENT',
    subtitle: 'A system that scales sales without you',
    type: 'title',
    meta: 'GROWTH AGENT · PHASE 1 PROPOSAL',
  },
  {
    id: 2,
    title: 'THE PROBLEM',
    subtitle: 'Handle has product-market fit. Sales don't scale.',
    type: 'problem',
    content: {
      description: 'Strong traction, strong product — but 80% of pipeline still runs through one person.',
      what_works: [
        'Product is strong — 94% time reduction in registration',
        'Brokers are happy — Inter.mx, Genomma Lab, De Acero',
        'Funded — $6.7M seed, a16z led',
      ],
      what_doesnt: [
        'Poncho is the bottleneck — 80% of sales is him',
        'No playbook — every conversation is improvised',
        'Lost learning — insight disappears into Slack',
      ],
    },
  },
  {
    id: 3,
    title: 'THE SOLUTION',
    subtitle: 'An AI system that learns your playbook, then runs it without you',
    type: 'solution',
    content: {
      description: 'Five components working together — from sourcing to predictions — turning every conversation into structured, replicable knowledge.',
      components: [
        { num: '01', title: 'Filter the right brokers', desc: 'Score and rank by receptiveness' },
        { num: '02', title: 'Personalize at scale', desc: 'Real research, not templates. A/B variants per broker' },
        { num: '03', title: 'Capture every signal', desc: 'Pain, objections, budget, enthusiasm — structured' },
        { num: '04', title: 'Identify the patterns', desc: 'Confidence scores across 30 conversations' },
        { num: '05', title: 'Predict what closes', desc: 'Deal health, stalling alerts, revenue forecast' },
      ],
    },
  },
  {
    id: 4,
    title: 'HOW IT WORKS',
    subtitle: 'Three weeks, three phases — one playbook',
    type: 'flow',
    content: {
      weeks: [
        {
          week: 'WEEK 01',
          title: 'Generate & score',
          tasks: [
            'Integrate sourcing',
            'Score 50 brokers',
            'Rank by receptiveness',
            'Extract top 30',
          ],
          deliverable: 'Ranked broker list with reasoning',
        },
        {
          week: 'WEEK 02',
          title: 'Outreach & capture',
          tasks: [
            '30 personalized messages',
            'A/B tested variants',
            'Conversation Intelligence',
            'Captures every response',
          ],
          deliverable: '25–30 analyzed conversations',
        },
        {
          week: 'WEEK 03',
          title: 'Learn & predict',
          tasks: [
            'Aggregate conversations',
            'Detect patterns',
            'Score confidence',
            'Generate playbook v1.0',
          ],
          deliverable: 'Playbook v1.0 + execution guide',
        },
      ],
    },
  },
  {
    id: 5,
    title: 'ARCHITECTURE',
    subtitle: 'Five components, one system',
    type: 'architecture',
    content: {
      components: [
        {
          num: '01',
          title: 'Lead generation & scoring',
          desc: 'Analyzes sources, scores by activity and fit, estimates budget',
          output: 'Ranked list, top to bottom',
        },
        {
          num: '02',
          title: 'Outreach personalization',
          desc: 'Per-broker research. Two variants. Cadence and tracking included',
          output: '50 messages ready to send',
        },
        {
          num: '03',
          title: 'Conversation intelligence',
          desc: 'Parses replies, extracts pain, objection, budget signals with confidence',
          output: 'Structured insights. Nothing lost',
        },
        {
          num: '04',
          title: 'Playbook learning',
          desc: 'Aggregates 30 conversations, detects patterns with confidence scores',
          output: 'Playbook v1.0, data-driven',
        },
        {
          num: '05',
          title: 'Predictions & alerts',
          desc: 'Deal health scoring, stalling detection, 90-day revenue forecast',
          output: 'Know what\'s coming, act early',
        },
      ],
    },
  },
  {
    id: 6,
    title: 'RESULTS',
    subtitle: 'A playbook with confidence scores on every element',
    type: 'results',
    content: {
      description: 'Patterns identified across 30 real conversations — ranked, weighted, ready for the team to execute',
      patterns: [
        { num: '01', name: 'Email overload', confidence: 95 },
        { num: '02', name: 'Manual data entry', confidence: 92 },
        { num: '03', name: 'Client response time', confidence: 88 },
        { num: '04', name: '"Can we trust AI?" objection', confidence: 88 },
        { num: '05', name: 'Budget sweet-spot $3–8k/mo', confidence: 90 },
      ],
      stats: [
        { number: '50', label: 'BROKERS SCORED' },
        { number: '30', label: 'CONVERSATIONS ANALYZED' },
        { number: '7–10', label: 'PATTERNS IDENTIFIED' },
        { number: '95%', label: 'AVG CONFIDENCE' },
      ],
    },
  },
  {
    id: 7,
    title: '21-DAY TIMELINE',
    subtitle: 'Aggressive but achievable',
    type: 'timeline',
    content: {
      weeks: [
        {
          week: 'WEEK 01 — MAY 11',
          items: [
            'Mon–Tue: Integrate Apollo + Supabase, build scoring model',
            'Wed–Thu: Score 50 brokers, rank, extract top 30',
            'Fri: Review & calibration with you',
          ],
          deliverable: 'Ranked list (CSV + Dashboard)',
        },
        {
          week: 'WEEK 02 — MAY 18',
          items: [
            'Mon–Tue: Generate two variants per broker, A/B setup',
            'Wed: Launch 30 messages, track opens and clicks',
            'Thu–Fri: Analyze responses, extract structured signals',
          ],
          deliverable: 'Conversation Database',
        },
        {
          week: 'WEEK 03 — MAY 25',
          items: [
            'Mon–Tue: Aggregate 30 conversations, detect patterns',
            'Wed–Thu: Generate Playbook v1.0 with confidence scores',
            'Fri: Final presentation, recommend Phase 2',
          ],
          deliverable: 'Playbook v1.0 (PDF + Guide)',
        },
      ],
    },
  },
  {
    id: 8,
    title: 'PHASE 1 INVESTMENT',
    subtitle: '$7K to de-risk sales scaling',
    type: 'investment',
    content: {
      investment: {
        total: '$7,000',
        duration: '3 weeks',
        hours: '120 hours',
        sync: '30 min/week',
        deliverable: 'Playbook v1.0',
      },
      requirements: [
        'Approval for Phase 1',
        'Access to data (10–15 recent conversations)',
        'Weekly Monday sync (30 minutes)',
      ],
      compare: 'vs $500K+ & 6–12 months to hire and ramp three AEs',
    },
  },
  {
    id: 9,
    title: 'NEXT STEPS',
    subtitle: 'If yes — Monday we start',
    type: 'closing',
    content: {
      description: 'Set up the environment, integrate sourcing, calibrate the scoring model. By Friday of Week 1 you have a ranked list and a feedback loop. Three weeks later, a playbook your team can run.',
      this_week: [
        'Confirm Phase 1',
        'Schedule data-access sync',
        'Calendar invite for Monday standup',
      ],
      vision: 'Month 1 prove · Months 2–3 integrate · Month 4+ scale · Year 1, 500+ brokers through a proven system',
    },
  },
]

export default function Slides() {
  const [current, setCurrent] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const slide = SLIDES[current]

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        if (current < SLIDES.length - 1) {
          setIsAnimating(true)
          setTimeout(() => {
            setCurrent(current + 1)
            setIsAnimating(false)
          }, 300)
        }
      } else if (e.key === 'ArrowLeft') {
        if (current > 0) {
          setIsAnimating(true)
          setTimeout(() => {
            setCurrent(current - 1)
            setIsAnimating(false)
          }, 300)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [current])

  return (
    <>
      <Head>
        <title>Handle Growth Agent</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { overflow: hidden; }
          button:disabled { opacity: 0.4; cursor: not-allowed; }
        `}</style>
      </Head>

      <div style={styles.root}>
        <div style={{ ...styles.slideContainer, opacity: isAnimating ? 0.5 : 1 }}>
          <div style={styles.slideInner}>
            <div style={styles.header}>
              <span style={styles.pageNum}>{current + 1} / {SLIDES.length}</span>
            </div>

            <div style={styles.content}>
              {slide.type === 'title' && (
                <>
                  <div style={styles.titleMeta}>{slide.meta}</div>
                  <h1 style={styles.largeTitle}>{slide.title}</h1>
                  <p style={styles.largeSubtitle}>{slide.subtitle}</p>
                </>
              )}

              {slide.type === 'problem' && (
                <>
                  <h1 style={styles.title}>{slide.title}</h1>
                  <p style={styles.subtitle}>{slide.subtitle}</p>
                  <p style={styles.description}>{slide.content.description}</p>
                  <div style={styles.twoColumn}>
                    <div style={styles.column}>
                      <h4 style={{ ...styles.columnTitle, color: '#1b5e20' }}>WHAT WORKS</h4>
                      {slide.content.what_works.map((item, i) => (
                        <div key={i} style={styles.bulletPoint}>
                          <span style={{ color: '#1b5e20', marginRight: '8px', fontWeight: 'bold' }}>+</span>
                          {item}
                        </div>
                      ))}
                    </div>
                    <div style={styles.column}>
                      <h4 style={{ ...styles.columnTitle, color: '#d32f2f' }}>WHAT DOESN'T</h4>
                      {slide.content.what_doesnt.map((item, i) => (
                        <div key={i} style={styles.bulletPoint}>
                          <span style={{ color: '#d32f2f', marginRight: '8px', fontWeight: 'bold' }}>−</span>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {slide.type === 'solution' && (
                <>
                  <h1 style={styles.title}>{slide.title}</h1>
                  <p style={styles.subtitle}>{slide.subtitle}</p>
                  <p style={styles.description}>{slide.content.description}</p>
                  <div style={styles.componentGrid}>
                    {slide.content.components.map((comp) => (
                      <div key={comp.num} style={styles.component}>
                        <div style={styles.componentNum}>{comp.num}</div>
                        <h4 style={styles.componentTitle}>{comp.title}</h4>
                        <p style={styles.componentDesc}>{comp.desc}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {slide.type === 'flow' && (
                <>
                  <h1 style={styles.title}>{slide.title}</h1>
                  <p style={styles.subtitle}>{slide.subtitle}</p>
                  <div style={styles.weekGrid}>
                    {slide.content.weeks.map((w) => (
                      <div key={w.week} style={styles.weekBox}>
                        <div style={styles.weekLabel}>{w.week}</div>
                        <h3 style={styles.weekTitle}>{w.title}</h3>
                        <ul style={styles.taskList}>
                          {w.tasks.map((task, i) => (
                            <li key={i} style={styles.task}>{task}</li>
                          ))}
                        </ul>
                        <div style={styles.deliverable}><strong>Deliverable:</strong><br />{w.deliverable}</div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {slide.type === 'architecture' && (
                <>
                  <h1 style={styles.title}>{slide.title}</h1>
                  <p style={styles.subtitle}>{slide.subtitle}</p>
                  <div style={styles.archGrid}>
                    {slide.content.components.map((comp) => (
                      <div key={comp.num} style={styles.archCard}>
                        <div style={styles.archNum}>{comp.num}</div>
                        <h4 style={styles.archTitle}>{comp.title}</h4>
                        <p style={styles.archDesc}>{comp.desc}</p>
                        <div style={styles.archOutput}><strong>Output:</strong> {comp.output}</div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {slide.type === 'results' && (
                <>
                  <h1 style={styles.title}>{slide.title}</h1>
                  <p style={styles.subtitle}>{slide.subtitle}</p>
                  <p style={styles.description}>{slide.content.description}</p>
                  <div style={styles.patternsBox}>
                    {slide.content.patterns.map((pattern) => (
                      <div key={pattern.num} style={styles.patternRow}>
                        <span style={styles.patternNum}>{pattern.num}</span>
                        <span style={{ flex: 1 }}>{pattern.name}</span>
                        <div style={styles.confidenceBar}>
                          <div style={{ ...styles.confidenceFill, width: `${pattern.confidence}%` }} />
                        </div>
                        <span style={styles.confidenceText}>{pattern.confidence}%</span>
                      </div>
                    ))}
                  </div>
                  <div style={styles.statsGrid}>
                    {slide.content.stats.map((stat) => (
                      <div key={stat.label} style={styles.statCard}>
                        <div style={styles.statNumber}>{stat.number}</div>
                        <div style={styles.statLabel}>{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {slide.type === 'timeline' && (
                <>
                  <h1 style={styles.title}>{slide.title}</h1>
                  <p style={styles.subtitle}>{slide.subtitle}</p>
                  <div style={styles.timelineGrid}>
                    {slide.content.weeks.map((w) => (
                      <div key={w.week} style={styles.timelineBox}>
                        <div style={styles.timelineWeek}>{w.week}</div>
                        <ul style={styles.timelineList}>
                          {w.items.map((item, i) => (
                            <li key={i} style={styles.timelineItem}>{item}</li>
                          ))}
                        </ul>
                        <div style={styles.timelineDeliverable}><strong>Deliverable:</strong><br />{w.deliverable}</div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {slide.type === 'investment' && (
                <>
                  <h1 style={styles.title}>{slide.title}</h1>
                  <p style={styles.subtitle}>{slide.subtitle}</p>
                  <div style={styles.investmentBox}>
                    {Object.entries(slide.content.investment).map(([key, value]) => (
                      <div key={key} style={styles.investmentRow}>
                        <span style={{ textTransform: 'capitalize' }}>{key.replace('_', ' ')}</span>
                        <strong style={styles.investmentValue}>{value}</strong>
                      </div>
                    ))}
                  </div>
                  <h3 style={styles.requirementTitle}>WHAT I NEED FROM YOU</h3>
                  {slide.content.requirements.map((req, i) => (
                    <div key={i} style={styles.requirement}>
                      <span style={styles.reqNum}>{i + 1}</span>
                      <span>{req}</span>
                    </div>
                  ))}
                  <p style={styles.compare}>{slide.content.compare}</p>
                </>
              )}

              {slide.type === 'closing' && (
                <>
                  <h1 style={styles.title}>{slide.title}</h1>
                  <p style={styles.subtitle}>{slide.subtitle}</p>
                  <p style={styles.description}>{slide.content.description}</p>
                  <h3 style={styles.requirementTitle}>THIS WEEK</h3>
                  {slide.content.this_week.map((item, i) => (
                    <div key={i} style={styles.closingItem}>· {item}</div>
                  ))}
                  <h3 style={styles.requirementTitle}>LONG-TERM VISION</h3>
                  <p style={styles.description}>{slide.content.vision}</p>
                  <div style={styles.cta}>Ready when you are</div>
                </>
              )}
            </div>
          </div>
        </div>

        <div style={styles.controls}>
          <button onClick={() => current > 0 && setCurrent(current - 1)} style={styles.btn} disabled={current === 0}>
            ← Prev
          </button>
          <div style={styles.dots}>
            {SLIDES.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} style={{ ...styles.dot, backgroundColor: i === current ? '#0a0a0a' : '#ddd' }} />
            ))}
          </div>
          <button onClick={() => current < SLIDES.length - 1 && setCurrent(current + 1)} style={styles.btn} disabled={current === SLIDES.length - 1}>
            Next →
          </button>
        </div>
      </div>
    </>
  )
}

const styles = {
  root: { width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#fff', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', color: '#0a0a0a' },
  slideContainer: { flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', transition: 'opacity 0.3s ease', padding: '80px 100px', maxHeight: 'calc(100vh - 80px)' },
  slideInner: { width: '100%', maxWidth: '1200px', display: 'flex', flexDirection: 'column', overflow: 'auto', maxHeight: '100%' },
  header: { display: 'flex', justifyContent: 'flex-end', marginBottom: '60px', paddingBottom: '20px', borderBottom: '1px solid #e0e0e0' },
  pageNum: { fontSize: '12px', color: '#999', fontWeight: '500', letterSpacing: '0.08em', textTransform: 'uppercase' },
  content: { flex: 1 },
  titleMeta: { fontSize: '12px', color: '#999', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '24px' },
  largeTitle: { fontSize: '64px', fontWeight: '700', lineHeight: '1.2', margin: '0 0 12px 0', letterSpacing: '-0.02em' },
  largeSubtitle: { fontSize: '36px', fontWeight: '400', lineHeight: '1.3', color: '#666', margin: 0 },
  title: { fontSize: '48px', fontWeight: '700', margin: '0 0 12px 0', letterSpacing: '-0.01em' },
  subtitle: { fontSize: '32px', fontWeight: '400', color: '#666', margin: '0 0 32px 0' },
  description: { fontSize: '16px', lineHeight: '1.6', color: '#555', marginBottom: '32px' },
  twoColumn: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', marginTop: '40px' },
  column: { flex: 1 },
  columnTitle: { fontSize: '12px', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '16px', margin: 0 },
  bulletPoint: { display: 'flex', fontSize: '15px', lineHeight: '1.8', marginBottom: '12px', gap: '8px', alignItems: 'flex-start' },
  componentGrid: { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', marginTop: '40px' },
  component: { padding: '20px', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#fafafa' },
  componentNum: { fontSize: '24px', fontWeight: '700', color: '#0066cc', marginBottom: '8px' },
  componentTitle: { fontSize: '14px', fontWeight: '600', margin: '0 0 8px 0' },
  componentDesc: { fontSize: '13px', lineHeight: '1.5', color: '#666', margin: 0 },
  weekGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginTop: '40px' },
  weekBox: { padding: '24px', border: '1px solid #e0e0e0', borderRadius: '8px' },
  weekLabel: { fontSize: '11px', color: '#0066cc', fontWeight: '600', letterSpacing: '0.08em', marginBottom: '8px' },
  weekTitle: { fontSize: '18px', fontWeight: '600', margin: '0 0 16px 0' },
  taskList: { listStyle: 'none', padding: 0, margin: '0 0 20px 0' },
  task: { fontSize: '14px', lineHeight: '1.6', marginBottom: '8px', color: '#444' },
  deliverable: { fontSize: '13px', color: '#666', paddingTop: '16px', borderTop: '1px solid #e0e0e0', fontStyle: 'italic' },
  archGrid: { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', marginTop: '40px' },
  archCard: { padding: '20px', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#fafafa' },
  archNum: { fontSize: '20px', fontWeight: '700', color: '#0066cc', marginBottom: '8px' },
  archTitle: { fontSize: '13px', fontWeight: '600', margin: '0 0 8px 0' },
  archDesc: { fontSize: '12px', lineHeight: '1.5', color: '#666', margin: '0 0 12px 0' },
  archOutput: { fontSize: '11px', color: '#999', paddingTop: '12px', borderTop: '1px solid #e0e0e0', fontStyle: 'italic' },
  patternsBox: { marginTop: '40px' },
  patternRow: { display: 'flex', alignItems: 'center', padding: '16px', borderBottom: '1px solid #f0f0f0', gap: '16px', fontSize: '14px' },
  patternNum: { fontSize: '12px', color: '#999', fontWeight: '600', minWidth: '28px' },
  confidenceBar: { width: '120px', height: '6px', backgroundColor: '#f0f0f0', borderRadius: '3px', overflow: 'hidden' },
  confidenceFill: { height: '100%', backgroundColor: '#0066cc' },
  confidenceText: { fontSize: '13px', fontWeight: '600', color: '#0066cc', minWidth: '45px', textAlign: 'right' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginTop: '48px' },
  statCard: { textAlign: 'center', padding: '32px 0', borderTop: '2px solid #0066cc' },
  statNumber: { fontSize: '42px', fontWeight: '700', color: '#0066cc', margin: '0 0 8px 0' },
  statLabel: { fontSize: '11px', color: '#999', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase' },
  timelineGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginTop: '40px' },
  timelineBox: { padding: '24px', border: '1px solid #e0e0e0', borderRadius: '8px' },
  timelineWeek: { fontSize: '12px', color: '#0066cc', fontWeight: '700', letterSpacing: '0.08em', marginBottom: '16px' },
  timelineList: { listStyle: 'none', padding: 0, margin: '0 0 16px 0' },
  timelineItem: { fontSize: '13px', lineHeight: '1.6', color: '#444', marginBottom: '8px' },
  timelineDeliverable: { fontSize: '12px', color: '#666', paddingTop: '16px', borderTop: '1px solid #e0e0e0', fontStyle: 'italic' },
  investmentBox: { marginTop: '40px', padding: '24px', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#fafafa' },
  investmentRow: { display: 'flex', justifyContent: 'space-between', paddingBottom: '16px', marginBottom: '16px', borderBottom: '1px solid #e0e0e0', fontSize: '14px' },
  investmentValue: { fontSize: '16px', color: '#0066cc' },
  requirementTitle: { fontSize: '12px', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', margin: '32px 0 16px 0', color: '#0a0a0a' },
  requirement: { display: 'flex', gap: '16px', fontSize: '15px', lineHeight: '1.6', marginBottom: '12px' },
  reqNum: { fontWeight: '700', color: '#0066cc', minWidth: '20px' },
  compare: { marginTop: '24px', fontSize: '14px', color: '#999', fontStyle: 'italic' },
  closingItem: { fontSize: '15px', lineHeight: '1.8', marginBottom: '8px', color: '#555' },
  cta: { marginTop: '48px', fontSize: '36px', fontWeight: '600', color: '#0066cc', textAlign: 'center' },
  controls: { height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '32px', borderTop: '1px solid #e0e0e0', backgroundColor: '#fff' },
  btn: { padding: '8px 24px', border: '1px solid #0a0a0a', borderRadius: '4px', fontSize: '13px', fontWeight: '500', backgroundColor: '#fff', color: '#0a0a0a', cursor: 'pointer', transition: 'all 0.2s ease' },
  dots: { display: 'flex', gap: '8px' },
  dot: { width: '8px', height: '8px', borderRadius: '50%', border: 'none', cursor: 'pointer', transition: 'background-color 0.2s ease' },
}
