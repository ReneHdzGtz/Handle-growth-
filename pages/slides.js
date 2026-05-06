import { useState, useEffect } from 'react'
import Head from 'next/head'

export default function Slides() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showNotes, setShowNotes] = useState(false)
  const [autoPlay, setAutoPlay] = useState(false)

  // Auto-advance slides
  useEffect(() => {
    if (!autoPlay) return
    const timer = setTimeout(() => {
      nextSlide()
    }, 6000)
    return () => clearTimeout(timer)
  }, [autoPlay, currentSlide])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e.key) {
        case 'ArrowRight':
        case ' ':
          e.preventDefault()
          nextSlide()
          break
        case 'ArrowLeft':
          e.preventDefault()
          prevSlide()
          break
        case 'Home':
          e.preventDefault()
          setCurrentSlide(0)
          break
        case 'End':
          e.preventDefault()
          setCurrentSlide(slides.length - 1)
          break
        case 'n':
          setShowNotes(!showNotes)
          break
        case 'a':
          setAutoPlay(!autoPlay)
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [showNotes, autoPlay])

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentSlide((prev) => prev + 1)
        setIsTransitioning(false)
      }, 300)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentSlide((prev) => prev - 1)
        setIsTransitioning(false)
      }, 300)
    }
  }

  const goToSlide = (index) => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentSlide(index)
      setIsTransitioning(false)
    }, 300)
  }

  const slides = [
    {
      title: 'Handle Growth Agent',
      subtitle: 'A System That Scales Sales Without You',
      type: 'title',
      notes: 'Context: Handle has 75 active brokers and strong PMF. Problem: sales dont scale without Poncho.',
      bgColor: '#ffffff',
    },
    {
      title: 'The Problem',
      subtitle: 'Stuck at 75 Brokers',
      type: 'content',
      points: [
        { label: '✅ Product-market fit', color: '#0a0a0a' },
        { label: '✅ $6.7M funded', color: '#0a0a0a' },
        { label: '❌ Poncho is the bottleneck', color: '#d32f2f' },
        { label: '❌ Sales dont scale', color: '#d32f2f' },
      ],
      notes: 'Handle has traction but no scalable sales process. Every insight is lost.',
      bgColor: '#ffffff',
    },
    {
      title: 'The Solution',
      subtitle: 'Growth Agent: An AI System That Learns',
      type: 'content',
      points: [
        { label: '1. Filters the right brokers', icon: '🎯' },
        { label: '2. Personalizes outreach at scale', icon: '✉️' },
        { label: '3. Captures every insight', icon: '💾' },
        { label: '4. Identifies patterns', icon: '📊' },
        { label: '5. Predicts which deals close', icon: '🔮' },
      ],
      notes: 'Systematize the playbook Poncho builds manually.',
      bgColor: '#ffffff',
    },
    {
      title: 'How It Works',
      subtitle: '5 Components in Sequence',
      type: 'components',
      components: [
        { num: '1', title: 'Lead Gen', desc: 'Scores & ranks 50 brokers' },
        { num: '2', title: 'Outreach', desc: 'Personalizes 2 variants' },
        { num: '3', title: 'Intelligence', desc: 'Captures insights' },
        { num: '4', title: 'Playbook', desc: '30 conversations analyzed' },
        { num: '5', title: 'Predictions', desc: 'Revenue forecast' },
      ],
      notes: 'Each component feeds the next. Everything is structured.',
      bgColor: '#ffffff',
    },
    {
      title: 'Results: 3 Weeks',
      subtitle: 'What Youll Get',
      type: 'results',
      timeline: [
        { week: 'Week 1', task: '50 brokers scored & ranked' },
        { week: 'Week 2', task: '30 conversations analyzed' },
        { week: 'Week 3', task: 'PLAYBOOK v1.0 generated' },
      ],
      stats: [
        { number: '95%', label: 'confidence score' },
        { number: '7-10', label: 'patterns found' },
      ],
      notes: 'Your team can execute without you.',
      bgColor: '#ffffff',
    },
    {
      title: '3-Week Timeline',
      subtitle: 'Phase 1 Execution Plan',
      type: 'timeline',
      weeks: [
        {
          title: 'Week 1',
          items: ['Lead Generation & Integration', 'API setup', '50 brokers scored'],
        },
        {
          title: 'Week 2',
          items: ['Outreach & Intelligence', '30 emails sent', 'Responses analyzed'],
        },
        {
          title: 'Week 3',
          items: ['Playbook Learning', '7-10 patterns', 'v1.0 delivered'],
        },
      ],
      notes: 'Weekly syncs every Monday to keep on track.',
      bgColor: '#ffffff',
    },
    {
      title: 'Cost & ROI',
      subtitle: 'Phase 1 Investment vs Return',
      type: 'metrics',
      metrics: [
        { label: 'Infrastructure', value: '$83/month' },
        { label: 'Professional services', value: '$7,200' },
        { label: 'Total Phase 1', value: '$7,250' },
      ],
      roi: [
        { metric: 'ROI', value: '400%', period: 'in first month' },
        { metric: 'Payback', value: '<1', period: 'month' },
      ],
      notes: 'vs hiring 3 AEs ($450k, 6-12 months, high risk).',
      bgColor: '#ffffff',
    },
    {
      title: 'The Ask',
      subtitle: 'Phase 1: 3 Weeks, $7k',
      type: 'ask',
      requirements: [
        '✓ Approval for Phase 1',
        '✓ Access to last 10-15 conversations',
        '✓ Weekly 30-min sync on Mondays',
      ],
      outcome: ['$7k investment', '3 weeks execution', 'Validated playbook'],
      notes: 'Proof of concept. Low risk. High upside.',
      bgColor: '#f3f3f3',
    },
    {
      title: 'Next Steps',
      subtitle: 'How to Proceed',
      type: 'closing',
      steps: [
        { num: '1', text: 'Say YES to Phase 1' },
        { num: '2', text: 'Schedule data access sync' },
        { num: '3', text: 'Start Monday with setup' },
      ],
      cta: 'Ready to go?',
      notes: 'This is working proof, not a job application.',
      bgColor: '#ffffff',
    },
  ]

  const slide = slides[currentSlide]

  return (
    <>
      <Head>
        <title>Handle Growth Agent - Interactive Presentation</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500&display=swap');

          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          html, body {
            width: 100%;
            height: 100%;
            overflow: hidden;
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeInScale {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.6; }
          }

          .fade-enter {
            animation: fadeInScale 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }

          .list-item {
            animation: slideInRight 0.6s ease-out backwards;
          }

          .list-item:nth-child(1) { animation-delay: 0.1s; }
          .list-item:nth-child(2) { animation-delay: 0.2s; }
          .list-item:nth-child(3) { animation-delay: 0.3s; }
          .list-item:nth-child(4) { animation-delay: 0.4s; }
          .list-item:nth-child(5) { animation-delay: 0.5s; }

          .stat-card {
            animation: fadeInUp 0.6s ease-out backwards;
          }

          .stat-card:nth-child(1) { animation-delay: 0.2s; }
          .stat-card:nth-child(2) { animation-delay: 0.4s; }
        `}</style>
      </Head>

      <div style={styles.container}>
        {/* Main slide */}
        <div
          style={{
            ...styles.mainSlide,
            backgroundColor: slide.bgColor,
            opacity: isTransitioning ? 0.7 : 1,
            transition: 'all 0.3s ease',
          }}
        >
          <div style={styles.slideContent} className="fade-enter">
            {/* Header with slide number */}
            <div style={styles.header}>
              <div style={styles.slideCounter}>
                {currentSlide + 1} / {slides.length}
              </div>
            </div>

            {/* Title */}
            <h1 style={styles.title}>{slide.title}</h1>

            {/* Subtitle */}
            <h2 style={styles.subtitle}>{slide.subtitle}</h2>

            {/* Content based on slide type */}
            {slide.type === 'content' && slide.points && (
              <ul style={styles.pointsList}>
                {slide.points.map((point, i) => (
                  <li key={i} style={{ ...styles.point, color: point.color }} className="list-item">
                    {point.icon && <span style={{ marginRight: '12px' }}>{point.icon}</span>}
                    {point.label}
                  </li>
                ))}
              </ul>
            )}

            {/* Components */}
            {slide.type === 'components' && slide.components && (
              <div style={styles.componentsGrid}>
                {slide.components.map((comp, i) => (
                  <div key={i} style={styles.componentBox} className="list-item">
                    <div style={styles.componentNum}>{comp.num}</div>
                    <div style={styles.componentTitle}>{comp.title}</div>
                    <div style={styles.componentDesc}>{comp.desc}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Results */}
            {slide.type === 'results' && (
              <>
                <div style={styles.timelineResults}>
                  {slide.timeline.map((item, i) => (
                    <div key={i} style={styles.timelineItem} className="list-item">
                      <div style={styles.timelineWeek}>{item.week}</div>
                      <div style={styles.timelineTask}>{item.task}</div>
                    </div>
                  ))}
                </div>
                <div style={styles.statsGrid}>
                  {slide.stats.map((stat, i) => (
                    <div key={i} style={styles.statItem} className="stat-card">
                      <div style={styles.statNumber}>{stat.number}</div>
                      <div style={styles.statLabel}>{stat.label}</div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Timeline weeks */}
            {slide.type === 'timeline' && (
              <div style={styles.weekGrid}>
                {slide.weeks.map((week, i) => (
                  <div key={i} style={styles.weekBox} className="list-item">
                    <div style={styles.weekTitle}>{week.title}</div>
                    <ul style={styles.weekItems}>
                      {week.items.map((item, j) => (
                        <li key={j} style={styles.weekItem}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* Metrics */}
            {slide.type === 'metrics' && (
              <>
                <div style={styles.metricsBox}>
                  {slide.metrics.map((m, i) => (
                    <div key={i} style={styles.metricRow} className="list-item">
                      <span>{m.label}</span>
                      <strong>{m.value}</strong>
                    </div>
                  ))}
                </div>
                <div style={styles.roiBox}>
                  {slide.roi.map((r, i) => (
                    <div key={i} style={styles.roiItem} className="stat-card">
                      <div style={styles.roiMetric}>{r.metric}</div>
                      <div style={styles.roiValue}>{r.value}</div>
                      <div style={styles.roiPeriod}>{r.period}</div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Ask */}
            {slide.type === 'ask' && (
              <>
                <div style={styles.askBox}>
                  {slide.requirements.map((req, i) => (
                    <div key={i} style={styles.askItem} className="list-item">
                      {req}
                    </div>
                  ))}
                </div>
                <div style={styles.outcomBox}>
                  {slide.outcome.map((item, i) => (
                    <div key={i} style={styles.outcomeItem} className="stat-card">
                      {item}
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Closing */}
            {slide.type === 'closing' && (
              <>
                <div style={styles.stepsBox}>
                  {slide.steps.map((step, i) => (
                    <div key={i} style={styles.stepItem} className="list-item">
                      <span style={styles.stepNum}>{step.num}</span>
                      <span>{step.text}</span>
                    </div>
                  ))}
                </div>
                <div style={styles.ctaBox}>{slide.cta}</div>
              </>
            )}
          </div>
        </div>

        {/* Navigation and controls */}
        <div style={styles.controls}>
          <button onClick={prevSlide} style={styles.navButton} disabled={currentSlide === 0}>
            ← Previous
          </button>

          {/* Thumbnails */}
          <div style={styles.thumbnails}>
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                style={{
                  ...styles.thumbnail,
                  backgroundColor: i === currentSlide ? '#0066cc' : i < currentSlide ? '#ccc' : '#e5e5e5',
                  opacity: i === currentSlide ? 1 : 0.6,
                }}
                title={`Slide ${i + 1}`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          {/* Progress */}
          <div style={styles.progressContainer}>
            <div style={styles.progressBar}>
              <div
                style={{
                  ...styles.progressFill,
                  width: `${((currentSlide + 1) / slides.length) * 100}%`,
                }}
              />
            </div>
          </div>

          <button onClick={nextSlide} style={styles.navButton} disabled={currentSlide === slides.length - 1}>
            Next →
          </button>

          {/* Controls info */}
          <button
            onClick={() => setAutoPlay(!autoPlay)}
            style={{ ...styles.navButton, opacity: autoPlay ? 1 : 0.5 }}
            title="Toggle autoplay"
          >
            {autoPlay ? '⏸' : '▶'} Auto
          </button>
        </div>

        {/* Speaker notes */}
        {showNotes && (
          <div style={styles.notes}>
            <strong>Speaker Notes:</strong> {slide.notes}
          </div>
        )}

        {/* Keyboard help */}
        <div style={styles.help}>
          <span>→/← or Space to navigate</span>
          <span>Home/End to jump</span>
          <span>N for notes</span>
          <span>A for autoplay</span>
        </div>
      </div>
    </>
  )
}

const styles = {
  container: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: '#000',
    fontFamily: "'Geist', system-ui, sans-serif",
    color: '#0a0a0a',
    overflow: 'hidden',
  },
  mainSlide: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '80px 60px',
    overflow: 'auto',
    position: 'relative',
  },
  slideContent: {
    maxWidth: '1000px',
    width: '100%',
    animation: 'fadeInScale 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '60px',
    paddingBottom: '20px',
    borderBottom: '1px solid #e5e5e5',
  },
  slideCounter: {
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
    lineHeight: 1.7,
    margin: '18px 0',
  },
  componentsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '16px',
    margin: '40px 0',
  },
  componentBox: {
    background: '#f3f3f3',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
  componentNum: {
    fontSize: '32px',
    fontWeight: 700,
    color: '#0066cc',
    marginBottom: '8px',
  },
  componentTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#0a0a0a',
    marginBottom: '8px',
  },
  componentDesc: {
    fontSize: '14px',
    color: '#666',
    lineHeight: 1.4,
  },
  timelineResults: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    margin: '40px 0',
  },
  timelineItem: {
    display: 'flex',
    gap: '20px',
    padding: '20px',
    background: '#f9f9f9',
    borderRadius: '8px',
    borderLeft: '4px solid #0066cc',
  },
  timelineWeek: {
    fontWeight: 700,
    color: '#0066cc',
    fontSize: '16px',
    minWidth: '80px',
  },
  timelineTask: {
    color: '#333',
    fontSize: '18px',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '30px',
    margin: '40px 0',
  },
  statItem: {
    textAlign: 'center',
    padding: '30px',
    background: '#f3f3f3',
    borderRadius: '12px',
  },
  statNumber: {
    fontSize: '48px',
    fontWeight: 700,
    color: '#0066cc',
    marginBottom: '10px',
  },
  statLabel: {
    fontSize: '18px',
    color: '#666',
  },
  weekGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
    margin: '40px 0',
  },
  weekBox: {
    background: '#f3f3f3',
    padding: '24px',
    borderRadius: '12px',
  },
  weekTitle: {
    fontSize: '20px',
    fontWeight: 700,
    color: '#0066cc',
    marginBottom: '16px',
  },
  weekItems: {
    listStyle: 'none',
    padding: 0,
  },
  weekItem: {
    fontSize: '15px',
    color: '#333',
    lineHeight: 1.7,
    marginBottom: '8px',
  },
  metricsBox: {
    background: '#f3f3f3',
    padding: '30px',
    borderRadius: '12px',
    margin: '40px 0',
  },
  metricRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px 0',
    fontSize: '18px',
    color: '#333',
    borderBottom: '1px solid #e5e5e5',
  },
  roiBox: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
    margin: '30px 0',
  },
  roiItem: {
    background: '#ffffff',
    padding: '24px',
    borderRadius: '12px',
    border: '2px solid #0066cc',
    textAlign: 'center',
  },
  roiMetric: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '8px',
  },
  roiValue: {
    fontSize: '48px',
    fontWeight: 700,
    color: '#0066cc',
    marginBottom: '4px',
  },
  roiPeriod: {
    fontSize: '14px',
    color: '#999',
  },
  askBox: {
    background: '#f3f3f3',
    padding: '30px',
    borderRadius: '12px',
    margin: '30px 0',
  },
  askItem: {
    fontSize: '20px',
    color: '#0a0a0a',
    lineHeight: 1.8,
    marginBottom: '12px',
  },
  outcomBox: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    margin: '30px 0',
  },
  outcomeItem: {
    background: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    fontSize: '16px',
    color: '#0066cc',
    fontWeight: 600,
  },
  stepsBox: {
    margin: '40px 0',
  },
  stepItem: {
    display: 'flex',
    gap: '20px',
    fontSize: '22px',
    lineHeight: 1.8,
    margin: '20px 0',
    color: '#0a0a0a',
  },
  stepNum: {
    background: '#0066cc',
    color: '#fff',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    flexShrink: 0,
  },
  ctaBox: {
    fontSize: '44px',
    fontWeight: 700,
    color: '#0066cc',
    textAlign: 'center',
    marginTop: '60px',
  },
  controls: {
    display: 'flex',
    gap: '16px',
    padding: '20px 40px',
    background: '#1a1a1a',
    borderTop: '1px solid #333',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  navButton: {
    padding: '10px 20px',
    fontSize: '14px',
    background: '#0066cc',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 500,
    transition: 'all 0.2s ease',
  },
  thumbnails: {
    display: 'flex',
    gap: '8px',
  },
  thumbnail: {
    width: '32px',
    height: '32px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: 600,
    color: '#0a0a0a',
    transition: 'all 0.2s ease',
  },
  progressContainer: {
    flex: 1,
    minWidth: '200px',
    maxWidth: '400px',
  },
  progressBar: {
    height: '4px',
    background: '#333',
    borderRadius: '2px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    background: '#0066cc',
    transition: 'width 0.3s ease',
  },
  notes: {
    padding: '16px 40px',
    background: '#2a2a2a',
    fontSize: '13px',
    color: '#ccc',
    borderTop: '1px solid #333',
    maxHeight: '100px',
    overflow: 'auto',
  },
  help: {
    display: 'flex',
    gap: '24px',
    padding: '12px 40px',
    background: '#1a1a1a',
    fontSize: '12px',
    color: '#666',
    borderTop: '1px solid #333',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
}
