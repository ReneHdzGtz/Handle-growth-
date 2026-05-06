import { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'

export default function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showNotes, setShowNotes] = useState(false)

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : prev))
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev))
      } else if (e.key === 'n') {
        setShowNotes(!showNotes)
      } else if (e.key === 'Home') {
        setCurrentSlide(0)
      } else if (e.key === 'End') {
        setCurrentSlide(slides.length - 1)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [showNotes])

  const slides = [
    {
      title: 'Handle Growth Agent',
      subtitle: 'A System That Scales Sales Without You',
      notes: 'Context: Handle has 75 active brokers and strong PMF. Problem: sales dont scale without Poncho.',
    },
    {
      title: 'The Problem',
      subtitle: 'Stuck at 75 Brokers',
      points: [
        '✅ Product-market fit',
        '✅ $6.7M funded',
        '❌ Poncho is the bottleneck',
        '❌ Sales dont scale',
      ],
      notes: 'Handle has traction but no scalable sales process. Every insight is lost.',
    },
    {
      title: 'The Solution',
      subtitle: 'Growth Agent: An AI System That Learns',
      points: [
        '1. Filters the right brokers',
        '2. Personalizes outreach at scale',
        '3. Captures every insight',
        '4. Identifies patterns',
        '5. Predicts which deals close',
      ],
      notes: 'Systematize the playbook Poncho builds manually, so team can execute without him.',
    },
    {
      title: 'How It Works',
      subtitle: '5 Components',
      points: [
        '1. Lead Generation – Scores 50 brokers, ranks by receptiveness',
        '2. Outreach – 2 personalized variants per broker, A/B testable',
        '3. Intelligence – Extracts pain points, objections, budget signals',
        '4. Playbook Learning – Patterns from 30 conversations with confidence scores',
        '5. Predictions – Deal health, revenue forecast, stalling alerts',
      ],
      notes: 'Each component feeds the next. No data is lost. Everything is structured.',
    },
    {
      title: 'Results: 3 Weeks',
      subtitle: 'What Youll Get',
      points: [
        'Week 1: 50 brokers scored & ranked',
        'Week 2: 30 personalized outreach, conversations analyzed',
        'Week 3: PLAYBOOK v1.0 with confidence scores',
      ],
      stats: ['95%', 'confidence on primary pain point', '7-10', 'patterns identified'],
      notes: 'Your team can execute this playbook without you. On 500 brokers.',
    },
    {
      title: '3-Week Timeline',
      subtitle: 'Week by Week Breakdown',
      points: [
        'Week 1: Lead Generation & Integration',
        'Week 2: Outreach & Conversation Intelligence',
        'Week 3: Playbook Learning & Generation',
      ],
      notes: 'Aggressive but achievable. Every element is proven. Weekly syncs to keep on track.',
    },
    {
      title: 'The Ask',
      subtitle: 'Phase 1: 3 Weeks, $7k',
      points: [
        'Approval for Phase 1',
        'Access to last 10-15 conversations',
        'Weekly 30-min sync on Mondays',
      ],
      ask: ['$7k investment', '3 weeks of your time', 'Validated playbook result'],
      notes: 'Proof of concept. Low risk. High upside if it works (and it will).',
    },
    {
      title: 'Cost & ROI',
      subtitle: 'Phase 1 Budget',
      points: [
        'Infrastructure: $83/month',
        'Professional services: $7,200',
        'Total Phase 1: ~$7,250',
      ],
      stats: ['400%', 'ROI in first month', '<1', 'month payback period'],
      notes: 'vs hiring 3 AEs ($450k, 6-12 months, high risk). This is lower risk, faster.',
    },
    {
      title: 'Next Steps',
      subtitle: 'How to Proceed',
      points: [
        'Say YES to Phase 1',
        'Schedule data access sync this week',
        'Start Monday with setup',
      ],
      cta: 'Ready to go?',
      notes: 'This is not a job application. Its working proof you understand the problem.',
    },
  ]

  const slide = slides[currentSlide]

  return (
    <>
      <Head>
        <title>Handle Growth Agent - Presentation</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div style={styles.container}>
        {/* Slide Content */}
        <div style={styles.slide}>
          <div style={styles.slideContent}>
            {/* Logo */}
            <div style={styles.header}>
              <div style={styles.slideNumber}>
                {currentSlide + 1} / {slides.length}
              </div>
            </div>

            {/* Title */}
            {slide.title && (
              <h1 style={styles.title}>{slide.title}</h1>
            )}

            {/* Subtitle */}
            {slide.subtitle && (
              <h2 style={styles.subtitle}>{slide.subtitle}</h2>
            )}

            {/* Content Points */}
            {slide.points && (
              <ul style={styles.pointsList}>
                {slide.points.map((point, i) => (
                  <li key={i} style={styles.point}>
                    {point}
                  </li>
                ))}
              </ul>
            )}

            {/* Stats Grid */}
            {slide.stats && (
              <div style={styles.statsGrid}>
                {(() => {
                  const pairs = []
                  for (let i = 0; i < slide.stats.length; i += 2) {
                    pairs.push([slide.stats[i], slide.stats[i + 1]])
                  }
                  return pairs.map((pair, i) => (
                    <div key={i} style={styles.statItem}>
                      <div style={styles.statNumber}>{pair[0]}</div>
                      <div style={styles.statLabel}>{pair[1]}</div>
                    </div>
                  ))
                })()}
              </div>
            )}

            {/* Ask Box */}
            {slide.ask && (
              <div style={styles.askBox}>
                {slide.ask.map((item, i) => (
                  <div key={i} style={styles.askItem}>✓ {item}</div>
                ))}
              </div>
            )}

            {/* CTA */}
            {slide.cta && (
              <div style={styles.cta}>{slide.cta}</div>
            )}
          </div>
        </div>

        {/* Controls */}
        <div style={styles.controls}>
          <button
            onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
            style={styles.button}
          >
            ← Previous
          </button>

          <div style={styles.progressBar}>
            <div
              style={{
                ...styles.progressFill,
                width: `${((currentSlide + 1) / slides.length) * 100}%`,
              }}
            />
          </div>

          <button
            onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
            style={styles.button}
          >
            Next →
          </button>
        </div>

        {/* Speaker Notes */}
        {showNotes && (
          <div style={styles.notes}>
            <strong>Speaker Notes:</strong> {slide.notes}
          </div>
        )}

        {/* Help */}
        <div style={styles.help}>
          <span>← → Space to navigate</span>
          <span>N to toggle notes</span>
          <span>Home/End to jump</span>
        </div>
      </div>
    </>
  )
}

const styles = {
  container: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: '#ffffff',
    color: '#0a0a0a',
    fontFamily: "'Geist', system-ui, sans-serif",
  },
  slide: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '80px',
    overflow: 'auto',
    background: 'linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%)',
  },
  slideContent: {
    maxWidth: '1000px',
    width: '100%',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '60px',
    paddingBottom: '20px',
    borderBottom: '1px solid #e5e5e5',
  },
  slideNumber: {
    fontSize: '14px',
    color: '#888',
    fontFamily: "'Geist Mono', monospace",
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  title: {
    fontSize: '64px',
    fontWeight: 700,
    margin: '0 0 20px 0',
    color: '#0a0a0a',
    lineHeight: 1.1,
  },
  subtitle: {
    fontSize: '40px',
    fontWeight: 400,
    margin: '0 0 40px 0',
    color: '#555',
    lineHeight: 1.3,
  },
  pointsList: {
    listStyle: 'none',
    padding: 0,
    margin: '40px 0',
  },
  point: {
    fontSize: '24px',
    lineHeight: 1.6,
    margin: '18px 0',
    color: '#333',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '40px',
    margin: '40px 0',
  },
  statItem: {
    textAlign: 'center',
  },
  statNumber: {
    fontSize: '56px',
    fontWeight: 700,
    color: '#0a0a0a',
    marginBottom: '10px',
  },
  statLabel: {
    fontSize: '18px',
    color: '#666',
  },
  askBox: {
    background: '#f3f3f3',
    padding: '30px',
    borderRadius: '12px',
    margin: '40px 0',
  },
  askItem: {
    fontSize: '22px',
    lineHeight: 1.8,
    color: '#0a0a0a',
  },
  cta: {
    fontSize: '44px',
    fontWeight: 600,
    color: '#0066cc',
    marginTop: '40px',
    textAlign: 'center',
  },
  controls: {
    display: 'flex',
    gap: '20px',
    padding: '20px 40px',
    background: '#f9f9f9',
    borderTop: '1px solid #e5e5e5',
    alignItems: 'center',
  },
  button: {
    padding: '10px 20px',
    fontSize: '14px',
    background: '#0066cc',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 500,
  },
  progressBar: {
    flex: 1,
    height: '4px',
    background: '#e5e5e5',
    borderRadius: '2px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    background: '#0066cc',
    transition: 'width 0.3s ease',
  },
  notes: {
    padding: '20px 40px',
    background: '#f3f3f3',
    fontSize: '14px',
    color: '#555',
    borderTop: '1px solid #e5e5e5',
    maxHeight: '120px',
    overflow: 'auto',
  },
  help: {
    display: 'flex',
    gap: '30px',
    padding: '15px 40px',
    background: '#fafafa',
    fontSize: '13px',
    color: '#888',
    borderTop: '1px solid #e5e5e5',
    justifyContent: 'center',
  },
}
