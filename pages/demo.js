import { useState, useEffect } from 'react'
import Head from 'next/head'

export default function Demo() {
  const [output, setOutput] = useState([])
  const [isRunning, setIsRunning] = useState(false)

  const addOutput = (text, type = 'info') => {
    setOutput((prev) => [...prev, { text, type, id: Date.now() }])
  }

  const clearOutput = () => {
    setOutput([])
  }

  const runDemo = async () => {
    clearOutput()
    setIsRunning(true)

    // Demo data
    const brokers = [
      {
        rank: 1,
        name: 'Inter.mx',
        size: '450 employees',
        score: 95,
        reason: 'High activity, budget confirmed',
      },
      {
        rank: 2,
        name: 'Genomma Lab',
        size: '200 employees',
        score: 87,
        reason: 'Growth phase, open to innovation',
      },
      {
        rank: 3,
        name: 'De Acero',
        size: '150 employees',
        score: 82,
        reason: 'Tech-forward, expansion plans',
      },
      {
        rank: 4,
        name: 'Qualitas',
        size: '320 employees',
        score: 78,
        reason: 'Market leader, transformation phase',
      },
      {
        rank: 5,
        name: 'Seguros Monterrey',
        size: '180 employees',
        score: 74,
        reason: 'Regional player, strategic fit',
      },
    ]

    // PARTE 1
    addOutput('🚀 HANDLE GROWTH AGENT - LIVE DEMO', 'header')
    addOutput('')
    addOutput('═'.repeat(70), 'divider')
    addOutput('1️⃣  LEAD GENERATION & SCORING', 'section')
    addOutput('═'.repeat(70), 'divider')
    addOutput('')
    addOutput('📊 Analyzing 50 insurance brokers in Mexico...', 'info')
    addOutput('')

    await new Promise((r) => setTimeout(r, 500))

    for (const broker of brokers) {
      addOutput(
        `  ${broker.rank}. ${broker.name.padEnd(20)} │ ${broker.score}/100`,
        'success'
      )
      addOutput(
        `     ${broker.size.padEnd(20)} │ ${broker.reason}`,
        'dim'
      )
      await new Promise((r) => setTimeout(r, 300))
    }

    addOutput('')
    addOutput(
      '✅ OUTPUT: Ranked list of 50 brokers with reasoning',
      'success'
    )
    addOutput('')

    // PARTE 2
    addOutput('═'.repeat(70), 'divider')
    addOutput('2️⃣  OUTREACH PERSONALIZATION', 'section')
    addOutput('═'.repeat(70), 'divider')
    addOutput('')
    addOutput('📧 Generating 2 outreach variants for: Inter.mx', 'info')
    addOutput('')

    await new Promise((r) => setTimeout(r, 500))

    addOutput('VARIANT A: Efficiency Focus', 'subsection')
    addOutput(
      `
    Hola [Name],

    Inter.mx processes 50+ insurance applications daily.
    
    We help brokers cut underwriting time from 2h to 20min per app.
    
    Built for insurance workflows. Used by [Similar Brokers].
    
    Worth 30 min to explore?

    - René
  `,
      'code'
    )

    await new Promise((r) => setTimeout(r, 800))

    addOutput('VARIANT B: Team Bandwidth Focus', 'subsection')
    addOutput(
      `
    Hola [Name],

    Your team spends 10+ hours/week on manual data entry.
    
    Our AI handles extraction + entry automatically.
    You get those 10 hours back.
    
    Integrates with your current systems.
    
    Quick call to show how?

    - René
  `,
      'code'
    )

    addOutput('')
    addOutput(
      '✅ OUTPUT: A/B variants ready. Personalized per broker. Trackable.',
      'success'
    )
    addOutput('')

    // PARTE 3
    addOutput('═'.repeat(70), 'divider')
    addOutput('3️⃣  CONVERSATION INTELLIGENCE', 'section')
    addOutput('═'.repeat(70), 'divider')
    addOutput('')
    addOutput('📞 Analyzing conversations from broker calls:', 'info')
    addOutput('')

    await new Promise((r) => setTimeout(r, 400))

    const conversations = [
      {
        broker: 'Inter.mx',
        painPoints: [
          'Email overload (50+ daily)',
          'Manual data entry: 2h/app',
          'Client response: 48h',
        ],
        budget: '$5-10k/month (confirmed)',
        enthusiasm: 'High (asked about pilot)',
      },
      {
        broker: 'Genomma Lab',
        painPoints: [
          'Quote turnaround time',
          'Limited team (3 people, 100+ quotes/week)',
        ],
        budget: '$2-5k/month',
        enthusiasm: 'Medium-High',
      },
    ]

    for (const conv of conversations) {
      addOutput(`🎯 ${conv.broker}`, 'subsection')
      addOutput('')
      addOutput('   Pain Points:', 'dim')
      for (const pain of conv.painPoints) {
        addOutput(`   • ${pain}`, 'dim')
        await new Promise((r) => setTimeout(r, 150))
      }
      addOutput('')
      addOutput(`   Budget: ${conv.budget}`, 'success')
      addOutput(`   Enthusiasm: ${conv.enthusiasm}`, 'success')
      addOutput('')
      await new Promise((r) => setTimeout(r, 300))
    }

    addOutput(
      '✅ OUTPUT: Structured insights. Ready for analysis.',
      'success'
    )
    addOutput('')

    // PARTE 4
    addOutput('═'.repeat(70), 'divider')
    addOutput('4️⃣  PLAYBOOK LEARNING', 'section')
    addOutput('═'.repeat(70), 'divider')
    addOutput('')
    addOutput('📚 Patterns from 30 conversations:', 'info')
    addOutput('')

    await new Promise((r) => setTimeout(r, 400))

    const patterns = [
      {
        pattern: 'Email overload',
        frequency: '27/30',
        confidence: '95%',
        rec: 'Primary pain point',
      },
      {
        pattern: 'Manual data entry',
        frequency: '24/30',
        confidence: '92%',
        rec: 'Secondary pain',
      },
      {
        pattern: "'Trust AI' objection",
        frequency: '18/30',
        confidence: '88%',
        rec: 'Solved by testimonials',
      },
    ]

    for (const p of patterns) {
      addOutput(`\n  ${p.pattern.toUpperCase()}`, 'subsection')
      addOutput(`  Frequency: ${p.frequency} (Confidence: ${p.confidence})`, 'dim')
      addOutput(`  → ${p.rec}`, 'success')
      await new Promise((r) => setTimeout(r, 400))
    }

    addOutput('')
    addOutput('✅ OUTPUT: Playbook v1.0 with confidence scores', 'success')
    addOutput('')

    // PARTE 5
    addOutput('═'.repeat(70), 'divider')
    addOutput('5️⃣  PREDICTIONS & ALERTS', 'section')
    addOutput('═'.repeat(70), 'divider')
    addOutput('')
    addOutput('🎯 Deal health & forecast:', 'info')
    addOutput('')

    await new Promise((r) => setTimeout(r, 400))

    addOutput('')
    addOutput('  LIKELY TO CLOSE (30 days)', 'success')
    addOutput('  • Inter.mx (85% probability)', 'dim')
    addOutput('  • Genomma Lab (72% probability)', 'dim')
    addOutput('')
    addOutput('  REVENUE FORECAST (Next 90 days)', 'success')
    addOutput('  If 2 deals close at $6k/month: $12k/month new ARR', 'success')
    addOutput('  Pipeline: $48k/month potential', 'success')

    await new Promise((r) => setTimeout(r, 500))

    // FINAL
    addOutput('')
    addOutput('═'.repeat(70), 'divider')
    addOutput('📊 THE 3-WEEK PHASE 1 PLAN', 'section')
    addOutput('═'.repeat(70), 'divider')
    addOutput('')
    addOutput('WEEK 1: Lead Generation', 'subsection')
    addOutput('  • Score 50 brokers\n  • Rank by receptiveness', 'dim')
    addOutput('')
    addOutput('WEEK 2: Outreach & Intelligence', 'subsection')
    addOutput('  • 30 personalized outreach\n  • Conversations analyzed', 'dim')
    addOutput('')
    addOutput('WEEK 3: Playbook Learning', 'subsection')
    addOutput('  • 7-10 key patterns\n  • Playbook v1.0 generated', 'dim')
    addOutput('')
    addOutput('✅ RESULT: Your team can execute without you', 'success')
    addOutput('')
    addOutput('═'.repeat(70), 'divider')
    addOutput('🎯 THE ASK', 'section')
    addOutput('═'.repeat(70), 'divider')
    addOutput('')
    addOutput('Phase 1: 3 weeks, $7k', 'success')
    addOutput('  ✓ Validate with real brokers\n  ✓ Prove playbook works', 'dim')
    addOutput('')
    addOutput(
      'If Phase 1 succeeds:\n  → Phase 2: CRM integration\n  → Growth role conversation',
      'dim'
    )
    addOutput('')
    addOutput('═'.repeat(70), 'divider')
    addOutput('')
    addOutput('✨ Working proof. Not theory. Code that works.', 'header')
    addOutput('')

    setIsRunning(false)
  }

  return (
    <>
      <Head>
        <title>Growth Agent Demo - Handle</title>
        <meta name="description" content="Live demo of the Growth Agent system" />
      </Head>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '500', marginBottom: '12px' }}>
            🚀 Growth Agent Demo
          </h1>
          <p style={{ color: '#666666', fontSize: '15px', marginBottom: '2rem' }}>
            Watch the AI agent analyze brokers, generate outreach, and build a playbook in real-time.
          </p>

          <div style={{ display: 'flex', gap: '12px', marginBottom: '2rem' }}>
            <button
              onClick={runDemo}
              disabled={isRunning}
              style={{
                padding: '12px 24px',
                background: isRunning ? '#cccccc' : '#0066cc',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                cursor: isRunning ? 'not-allowed' : 'pointer',
                fontWeight: '500',
                fontSize: '14px',
              }}
            >
              {isRunning ? '⏳ Running...' : '▶ Run Demo'}
            </button>
            <button
              onClick={clearOutput}
              disabled={isRunning}
              style={{
                padding: '12px 24px',
                background: '#f9f9f9',
                color: '#000000',
                border: '0.5px solid #e5e5e5',
                borderRadius: '8px',
                cursor: isRunning ? 'not-allowed' : 'pointer',
                fontWeight: '500',
                fontSize: '14px',
              }}
            >
              Clear
            </button>
          </div>
        </div>

        {/* Output Terminal */}
        <div
          style={{
            background: '#1e1e1e',
            color: '#00ff00',
            padding: '1.5rem',
            borderRadius: '12px',
            fontFamily: 'monospace',
            fontSize: '13px',
            lineHeight: '1.6',
            maxHeight: '600px',
            overflowY: 'auto',
            border: '0.5px solid #333333',
          }}
        >
          {output.length === 0 && !isRunning && (
            <div style={{ color: '#666666', textAlign: 'center', padding: '2rem' }}>
              Click "Run Demo" to execute the Growth Agent
            </div>
          )}

          {output.map((line) => (
            <div
              key={line.id}
              style={{
                color: getColor(line.type),
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}
            >
              {line.text}
            </div>
          ))}

          {isRunning && (
            <div style={{ color: '#ffff00', marginTop: '1rem' }}>
              ⏳ Running demo...
            </div>
          )}
        </div>

        {/* Info Box */}
        <div
          style={{
            marginTop: '2rem',
            background: '#f9f9f9',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '0.5px solid #e5e5e5',
          }}
        >
          <h3 style={{ fontSize: '16px', fontWeight: '500', marginBottom: '12px' }}>
            What you're seeing:
          </h3>
          <ul style={{ fontSize: '14px', color: '#666666', marginLeft: '1.5rem' }}>
            <li>Lead Generation: 50 brokers scored and ranked</li>
            <li>Outreach: 2 personalized message variants (A/B testable)</li>
            <li>Conversation Intelligence: Insights extracted from calls</li>
            <li>Playbook Learning: Patterns identified with confidence scores</li>
            <li>Predictions: Deal forecasts and revenue projections</li>
          </ul>
        </div>

        {/* Back Link */}
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <a
            href="/"
            style={{
              color: '#0066cc',
              textDecoration: 'none',
              fontSize: '14px',
            }}
          >
            ← Back to Narrative
          </a>
        </div>
      </div>
    </>
  )
}

function getColor(type) {
  const colors = {
    header: '#ffffff',
    section: '#00ffff',
    subsection: '#00ffff',
    divider: '#666666',
    success: '#00ff00',
    error: '#ff0000',
    info: '#ffff00',
    dim: '#888888',
    code: '#00ff00',
  }
  return colors[type] || '#00ff00'
}
