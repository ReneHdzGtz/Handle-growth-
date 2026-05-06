import Head from 'next/head'

export default function Slides() {
  return (
    <>
      <Head>
        <title>Handle Growth Agent - Phase 1 Proposal</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      
      <style jsx global>{`
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
            background: #ffffff;
            color: #000000;
            line-height: 1.6;
            overflow-x: hidden;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 40px;
        }

        section {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 80px 0;
            opacity: 0;
            animation: fadeInUp 0.8s ease-out forwards;
        }

        section:nth-child(1) { animation-delay: 0.1s; }
        section:nth-child(2) { animation-delay: 0.2s; }
        section:nth-child(3) { animation-delay: 0.3s; }
        section:nth-child(4) { animation-delay: 0.4s; }
        section:nth-child(5) { animation-delay: 0.5s; }
        section:nth-child(6) { animation-delay: 0.6s; }
        section:nth-child(7) { animation-delay: 0.7s; }
        section:nth-child(8) { animation-delay: 0.8s; }
        section:nth-child(9) { animation-delay: 0.9s; }

        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideInLeft {
            from { opacity: 0; transform: translateX(-50px); }
            to { opacity: 1; transform: translateX(0); }
        }

        @keyframes slideInRight {
            from { opacity: 0; transform: translateX(50px); }
            to { opacity: 1; transform: translateX(0); }
        }

        @keyframes growUpBar {
            from { transform: scaleY(0); opacity: 0; }
            to { transform: scaleY(1); opacity: 1; }
        }

        .content { width: 100%; }

        .content h1 {
            font-size: 56px;
            font-weight: 700;
            margin-bottom: 20px;
            line-height: 1.1;
            animation: slideInLeft 0.8s ease-out 0.2s forwards;
            opacity: 0;
        }

        .content h2 {
            font-size: 48px;
            font-weight: 700;
            margin-bottom: 20px;
            line-height: 1.1;
            animation: slideInLeft 0.8s ease-out 0.2s forwards;
            opacity: 0;
        }

        .subtitle {
            font-size: 20px;
            color: #666666;
            margin-bottom: 40px;
            animation: slideInRight 0.8s ease-out 0.3s forwards;
            opacity: 0;
        }

        .tagline {
            font-size: 18px;
            color: #999999;
            letter-spacing: 1px;
            text-transform: uppercase;
            margin-bottom: 20px;
            animation: slideInLeft 0.6s ease-out 0.1s forwards;
            opacity: 0;
        }

        .hero { text-align: left; }

        .meta-info {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 40px;
            margin-top: 60px;
            animation: fadeInUp 1s ease-out 0.5s forwards;
            opacity: 0;
        }

        .meta-item label {
            font-size: 12px;
            text-transform: uppercase;
            color: #999999;
            margin-bottom: 8px;
            display: block;
            letter-spacing: 1px;
        }

        .meta-item p {
            font-size: 16px;
            font-weight: 600;
            color: #000000;
        }

        .what-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 60px;
            margin-top: 40px;
        }

        .what-box {
            animation: fadeInUp 0.8s ease-out forwards;
            opacity: 0;
        }

        .what-box:nth-child(1) { animation-delay: 0.3s; }
        .what-box:nth-child(2) { animation-delay: 0.5s; }

        .what-title {
            font-size: 14px;
            font-weight: 600;
            color: #999999;
            text-transform: uppercase;
            margin-bottom: 16px;
            letter-spacing: 1px;
        }

        .what-list { list-style: none; }

        .what-list li {
            margin-bottom: 12px;
            font-size: 16px;
            display: flex;
            align-items: flex-start;
        }

        .what-list li:before {
            content: '+ ';
            font-weight: 700;
            margin-right: 10px;
            color: #000000;
        }

        .what-box:nth-child(2) .what-list li:before { content: '− '; }

        .chart-container {
            margin-top: 40px;
            animation: slideInRight 1s ease-out 0.4s forwards;
            opacity: 0;
        }

        .chart-container svg {
            width: 100%;
            height: auto;
        }

        .bar {
            animation: growUpBar 1s ease-out forwards;
            transform-origin: bottom;
            transform: scaleY(0);
        }

        .bar:nth-child(1) { animation-delay: 0.1s; }
        .bar:nth-child(2) { animation-delay: 0.15s; }
        .bar:nth-child(3) { animation-delay: 0.2s; }
        .bar:nth-child(4) { animation-delay: 0.25s; }
        .bar:nth-child(5) { animation-delay: 0.3s; }
        .bar:nth-child(6) { animation-delay: 0.35s; }
        .bar:nth-child(7) { animation-delay: 0.4s; }
        .bar:nth-child(8) { animation-delay: 0.45s; }
        .bar:nth-child(9) { animation-delay: 0.5s; }
        .bar:nth-child(10) { animation-delay: 0.55s; }
        .bar:nth-child(11) { animation-delay: 0.6s; }
        .bar:nth-child(12) { animation-delay: 0.65s; }
        .bar:nth-child(13) { animation-delay: 0.7s; }
        .bar:nth-child(14) { animation-delay: 0.75s; }
        .bar:nth-child(15) { animation-delay: 0.8s; }
        .bar:nth-child(16) { animation-delay: 0.85s; }
        .bar:nth-child(17) { animation-delay: 0.9s; }
        .bar:nth-child(18) { animation-delay: 0.95s; }
        .bar:nth-child(19) { animation-delay: 1s; }
        .bar:nth-child(20) { animation-delay: 1.05s; }

        .components-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 20px;
            margin-top: 60px;
        }

        .component-box {
            background: #f5f5f5;
            padding: 30px 20px;
            text-align: center;
            border-radius: 4px;
            transition: all 0.3s ease;
            animation: fadeInUp 0.6s ease-out forwards;
            opacity: 0;
            cursor: pointer;
        }

        .component-box:hover {
            background: #e8e8e8;
            transform: translateY(-8px);
        }

        .component-box:nth-child(1) { animation-delay: 0.2s; }
        .component-box:nth-child(2) { animation-delay: 0.3s; }
        .component-box:nth-child(3) { animation-delay: 0.4s; }
        .component-box:nth-child(4) { animation-delay: 0.5s; }
        .component-box:nth-child(5) { animation-delay: 0.6s; }

        .component-number {
            font-size: 14px;
            font-weight: 600;
            color: #999999;
            margin-bottom: 12px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .component-title {
            font-size: 14px;
            font-weight: 700;
            color: #000000;
            margin-bottom: 12px;
        }

        .component-desc {
            font-size: 13px;
            color: #666666;
            line-height: 1.5;
        }

        .flow-boxes {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 30px;
            margin-top: 40px;
        }

        .flow-box {
            border: 1px solid #d0d0d0;
            padding: 40px;
            border-radius: 4px;
            animation: fadeInUp 0.8s ease-out forwards;
            opacity: 0;
        }

        .flow-box:nth-child(3) {
            background: #000000;
            color: #ffffff;
            border: none;
        }

        .flow-box:nth-child(1) { animation-delay: 0.2s; }
        .flow-box:nth-child(2) { animation-delay: 0.4s; }
        .flow-box:nth-child(3) { animation-delay: 0.6s; }

        .flow-label {
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            color: #999999;
            margin-bottom: 12px;
            letter-spacing: 1px;
        }

        .flow-box:nth-child(3) .flow-label { color: #888888; }

        .flow-title {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 16px;
            color: #000000;
        }

        .flow-box:nth-child(3) .flow-title { color: #ffffff; }

        .flow-desc {
            font-size: 14px;
            color: #666666;
            line-height: 1.6;
            margin-bottom: 40px;
        }

        .flow-box:nth-child(3) .flow-desc { color: #d0d0d0; }

        .flow-deliverable {
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            color: #999999;
            letter-spacing: 1px;
        }

        .flow-box:nth-child(3) .flow-deliverable { color: #888888; }

        .deliverable-text {
            font-size: 16px;
            font-weight: 600;
            color: #000000;
            margin-top: 8px;
        }

        .flow-box:nth-child(3) .deliverable-text { color: #ffffff; }

        .architecture-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 20px;
            margin-top: 40px;
        }

        .architecture-item {
            border: 1px solid #d0d0d0;
            padding: 30px;
            border-radius: 4px;
            animation: slideInLeft 0.8s ease-out forwards;
            opacity: 0;
        }

        .architecture-item:nth-child(1) { animation-delay: 0.1s; }
        .architecture-item:nth-child(2) { animation-delay: 0.2s; }
        .architecture-item:nth-child(3) { animation-delay: 0.3s; }
        .architecture-item:nth-child(4) { animation-delay: 0.4s; }
        .architecture-item:nth-child(5) { animation-delay: 0.5s; }

        .architecture-number {
            font-size: 12px;
            font-weight: 600;
            color: #999999;
            text-transform: uppercase;
            margin-bottom: 12px;
            letter-spacing: 1px;
        }

        .architecture-title {
            font-size: 16px;
            font-weight: 700;
            color: #000000;
            margin-bottom: 12px;
            line-height: 1.3;
        }

        .architecture-desc {
            font-size: 13px;
            color: #666666;
            line-height: 1.5;
            margin-bottom: 20px;
        }

        .architecture-label {
            font-size: 11px;
            font-weight: 600;
            color: #999999;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 8px;
        }

        .architecture-output {
            font-size: 13px;
            font-weight: 600;
            color: #000000;
        }

        .results-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 60px;
            margin-top: 40px;
        }

        .results-list { list-style: none; }

        .results-list li {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            animation: slideInLeft 0.6s ease-out forwards;
            opacity: 0;
        }

        .results-list li:nth-child(1) { animation-delay: 0.2s; }
        .results-list li:nth-child(2) { animation-delay: 0.3s; }
        .results-list li:nth-child(3) { animation-delay: 0.4s; }
        .results-list li:nth-child(4) { animation-delay: 0.5s; }
        .results-list li:nth-child(5) { animation-delay: 0.6s; }

        .results-number {
            font-size: 12px;
            font-weight: 600;
            color: #999999;
            margin-right: 16px;
            min-width: 20px;
        }

        .results-text {
            font-size: 16px;
            color: #000000;
        }

        .results-bar {
            height: 3px;
            background: #000000;
            margin: 0 16px;
            flex: 1;
        }

        .results-confidence {
            font-size: 14px;
            font-weight: 700;
            color: #000000;
            min-width: 40px;
            text-align: right;
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            margin-top: 40px;
        }

        .stat-box {
            text-align: center;
            padding: 20px;
            animation: fadeInUp 0.8s ease-out forwards;
            opacity: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        .stat-box:nth-child(1) { animation-delay: 0.2s; }
        .stat-box:nth-child(2) { animation-delay: 0.3s; }
        .stat-box:nth-child(3) { animation-delay: 0.4s; }
        .stat-box:nth-child(4) { animation-delay: 0.5s; }

        .stat-number {
            font-size: 48px;
            font-weight: 700;
            color: #000000;
            margin-top: 12px;
            order: 2;
        }

        .stat-label {
            font-size: 12px;
            color: #999999;
            text-transform: uppercase;
            order: 1;
            letter-spacing: 1px;
        }

        .timeline {
            display: flex;
            justify-content: space-between;
            position: relative;
            margin-top: 60px;
        }

        .timeline:before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 1px;
            background: #d0d0d0;
            z-index: 1;
        }

        .timeline-item {
            flex: 1;
            padding: 40px 20px 0;
            position: relative;
            animation: slideInLeft 0.8s ease-out forwards;
            opacity: 0;
        }

        .timeline-item:nth-child(1) { animation-delay: 0.2s; }
        .timeline-item:nth-child(2) { animation-delay: 0.4s; }
        .timeline-item:nth-child(3) { animation-delay: 0.6s; }

        .timeline-dot {
            position: absolute;
            width: 12px;
            height: 12px;
            background: #000000;
            border-radius: 50%;
            top: -6px;
            left: 0;
            z-index: 2;
        }

        .timeline-week {
            font-size: 12px;
            color: #999999;
            text-transform: uppercase;
            margin-bottom: 12px;
            font-weight: 600;
            letter-spacing: 1px;
        }

        .timeline-title {
            font-size: 20px;
            font-weight: 700;
            color: #000000;
            margin-bottom: 16px;
        }

        .timeline-tasks {
            font-size: 14px;
            color: #666666;
            line-height: 1.6;
        }

        .timeline-tasks li { margin-bottom: 8px; }

        .timeline-deliverable {
            margin-top: 20px;
            font-size: 12px;
            font-weight: 600;
            color: #999999;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .timeline-deliverable-text {
            font-size: 14px;
            color: #000000;
            font-weight: 600;
            margin-top: 4px;
        }

        .ask-content {
            width: 100%;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 60px;
            align-items: center;
        }

        .price-box {
            animation: slideInLeft 0.8s ease-out 0.2s forwards;
            opacity: 0;
        }

        .price-details {
            font-size: 14px;
            color: #666666;
        }

        .price-details strong {
            display: block;
            color: #000000;
            font-weight: 600;
            margin-top: 4px;
        }

        .ask-list {
            animation: slideInRight 0.8s ease-out 0.2s forwards;
            opacity: 0;
        }

        .ask-item {
            margin-bottom: 30px;
            animation: fadeInUp 0.6s ease-out forwards;
            opacity: 0;
        }

        .ask-item:nth-child(1) { animation-delay: 0.3s; }
        .ask-item:nth-child(2) { animation-delay: 0.4s; }
        .ask-item:nth-child(3) { animation-delay: 0.5s; }

        .ask-number {
            font-size: 12px;
            font-weight: 600;
            color: #999999;
            text-transform: uppercase;
            margin-bottom: 8px;
            letter-spacing: 1px;
        }

        .ask-title {
            font-size: 18px;
            font-weight: 700;
            color: #000000;
            margin-bottom: 8px;
        }

        .ask-desc {
            font-size: 14px;
            color: #666666;
        }

        .cta-content {
            text-align: left;
            width: 100%;
        }

        .cta-heading {
            font-size: 56px;
            font-weight: 700;
            color: #000000;
            margin-bottom: 30px;
            animation: slideInLeft 0.8s ease-out 0.2s forwards;
            opacity: 0;
        }

        .cta-text {
            font-size: 18px;
            color: #666666;
            margin-bottom: 40px;
            animation: slideInRight 0.8s ease-out 0.3s forwards;
            opacity: 0;
        }

        .next-steps {
            animation: fadeInUp 0.8s ease-out 0.4s forwards;
            opacity: 0;
        }

        .steps-title {
            font-size: 12px;
            font-weight: 600;
            color: #999999;
            text-transform: uppercase;
            margin-bottom: 12px;
            letter-spacing: 1px;
        }

        .steps-list {
            font-size: 16px;
            color: #000000;
            line-height: 1.8;
        }

        .vision-section {
            margin-top: 40px;
            animation: fadeInUp 0.8s ease-out 0.5s forwards;
            opacity: 0;
        }

        .contact-section {
            margin-top: 40px;
            animation: fadeInUp 0.8s ease-out 0.6s forwards;
            opacity: 0;
        }

        .contact-info {
            font-size: 16px;
            color: #000000;
        }

        .contact-info a {
            color: #000000;
            text-decoration: none;
            border-bottom: 1px solid #000000;
            transition: all 0.3s ease;
        }

        .contact-info a:hover {
            background: #f0f0f0;
            padding: 2px 4px;
        }

        @media (max-width: 768px) {
            .container { padding: 0 20px; }
            section { padding: 40px 0; }
            .content h1, .content h2 { font-size: 32px; }
            .meta-info, .components-grid, .architecture-grid, .stats-grid { grid-template-columns: repeat(2, 1fr); }
            .flow-boxes { grid-template-columns: 1fr; }
            .what-content { grid-template-columns: 1fr; }
            .ask-content { grid-template-columns: 1fr; }
            .timeline { flex-direction: column; }
            .timeline:before { position: absolute; left: 0; width: 1px; height: 100%; }
            .timeline-item { padding: 20px 0 20px 40px; }
            .timeline-dot { left: -6px; }
        }
      `}</style>

      <section><div className="container"><div className="content hero"><div className="tagline">Growth Agent · Phase 1 Proposal</div><h1>A system that scales<br />sales without you.</h1><p className="subtitle">An AI agent that systematizes the playbook Poncho is building manually — proven in three weeks, executable by the team.</p><div className="meta-info"><div className="meta-item"><label>Audience</label><p>Handle · Founder & team</p></div><div className="meta-item"><label>Phase</label><p>1 · Proof of concept</p></div><div className="meta-item"><label>Duration</label><p>3 weeks · 21 days</p></div><div className="meta-item"><label>Date</label><p>May 2026</p></div></div></div></div></section>

      <section><div className="container"><div className="content problem-content"><div className="tagline">Status Quo</div><h2>Handle has product-market fit.<br />Sales don't scale.</h2><p className="subtitle">Strong traction, strong product — but 80% of pipeline still runs through one person.</p><div className="what-content"><div className="what-box"><div className="what-title">What Works</div><ul className="what-list"><li>Product is strong — 94% time reduction in registration</li><li>Brokers are happy — Inter.mx, Genomma Lab, De Acero</li><li>Funded — $6.7M seed, a16z led</li></ul></div><div className="what-box"><div className="what-title">What Doesn't</div><ul className="what-list"><li>Poncho is the bottleneck — 80% of sales is him</li><li>No playbook — every conversation is improvised</li><li>Lost learning — insight disappears into Slack</li></ul></div></div><div className="chart-container"><svg viewBox="0 0 1400 300" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet"><defs><style>{`.bar { fill: #000000; } .chart-label { font-size: 12px; fill: #999999; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto; }`}</style></defs><rect className="bar" x="30" y="175" width="45" height="25" /><rect className="bar" x="85" y="158" width="45" height="42" /><rect className="bar" x="140" y="142" width="45" height="58" /><rect className="bar" x="195" y="128" width="45" height="72" /><rect className="bar" x="250" y="115" width="45" height="85" /><rect className="bar" x="305" y="102" width="45" height="98" /><rect className="bar" x="360" y="90" width="45" height="110" /><rect className="bar" x="415" y="80" width="45" height="120" /><rect className="bar" x="470" y="72" width="45" height="128" /><rect className="bar" x="525" y="65" width="45" height="135" /><rect className="bar" x="580" y="60" width="45" height="140" /><rect className="bar" x="635" y="57" width="45" height="143" /><rect className="bar" x="690" y="55" width="45" height="145" /><rect className="bar" x="745" y="54" width="45" height="146" /><rect className="bar" x="800" y="54" width="45" height="146" /><rect className="bar" x="855" y="54" width="45" height="146" /><rect className="bar" x="910" y="54" width="45" height="146" /><rect className="bar" x="965" y="54" width="45" height="146" /><rect className="bar" x="1020" y="54" width="45" height="146" /><rect className="bar" x="1075" y="54" width="45" height="146" /><line x1="20" y1="200" x2="1350" y2="200" stroke="#d0d0d0" strokeWidth="1" /><text className="chart-label" x="10" y="230">ACTIVE BROKERS OVER TIME – PLATEAU AT 75</text><text className="chart-label" x="1330" y="230" textAnchor="end">02 / 09</text></svg></div></div></div></section>

      <section><div className="container"><div className="content solution-content"><div className="tagline">Growth Agent</div><h2>An AI system that learns your playbook, then runs it without you.</h2><p className="subtitle">Five components working together — from sourcing to predictions — turning every conversation into structured, replicable knowledge.</p><div className="components-grid"><div className="component-box"><div className="component-number">01</div><div className="component-title">Filter the right brokers</div><div className="component-desc">Score and rank by receptiveness.</div></div><div className="component-box"><div className="component-number">02</div><div className="component-title">Personalize at scale</div><div className="component-desc">Real research, not templates. A/B variants per broker.</div></div><div className="component-box"><div className="component-number">03</div><div className="component-title">Capture every signal</div><div className="component-desc">Pain, objections, budget, enthusiasm — structured.</div></div><div className="component-box"><div className="component-number">04</div><div className="component-title">Identify the patterns</div><div className="component-desc">Confidence scores across 30 conversations.</div></div><div className="component-box"><div className="component-number">05</div><div className="component-title">Predict what closes</div><div className="component-desc">Deal health, stalling alerts, revenue forecast.</div></div></div></div></div></section>

      <section><div className="container"><div className="content flow-content"><div className="tagline">The Flow</div><h2>Three weeks, three phases — one playbook.</h2><p className="subtitle">Generate. Capture. Learn. Each week ends with a tangible artifact.</p><div className="flow-boxes"><div className="flow-box"><div className="flow-label">Week 01</div><div className="flow-title">Generate & score</div><div className="flow-desc">Integrate sourcing, score 50 brokers, rank by receptiveness, extract top 30 for outreach.</div><div className="flow-deliverable">Deliverable</div><div className="deliverable-text">Ranked broker list with reasoning</div></div><div className="flow-box"><div className="flow-label">Week 02</div><div className="flow-title">Outreach & capture</div><div className="flow-desc">30 personalized messages, A/B tested. Conversation Intelligence captures every response.</div><div className="flow-deliverable">Deliverable</div><div className="deliverable-text">25–30 analyzed conversations</div></div><div className="flow-box"><div className="flow-label">Week 03</div><div className="flow-title">Learn & predict</div><div className="flow-desc">Aggregate, detect patterns, score confidence, generate playbook v1.0 ready for the team.</div><div className="flow-deliverable">Deliverable</div><div className="deliverable-text">Playbook v1.0 + execution guide</div></div></div></div></div></section>

      <section><div className="container"><div className="content architecture-content"><div className="tagline">Architecture</div><h2>Five components, one system.</h2><div className="architecture-grid"><div className="architecture-item"><div className="architecture-number">01</div><div className="architecture-title">Lead generation & scoring</div><div className="architecture-desc">Analyzes sources, scores by activity and fit, estimates budget.</div><div className="architecture-label">Output</div><div className="architecture-output">Ranked list, top to bottom.</div></div><div className="architecture-item"><div className="architecture-number">02</div><div className="architecture-title">Outreach personalization</div><div className="architecture-desc">Per-broker research. Two variants. Cadence and tracking included.</div><div className="architecture-label">Output</div><div className="architecture-output">50 messages ready to send.</div></div><div className="architecture-item"><div className="architecture-number">03</div><div className="architecture-title">Conversation intelligence</div><div className="architecture-desc">Parses replies, extracts pain, objection, budget signals with confidence.</div><div className="architecture-label">Output</div><div className="architecture-output">Structured insights. Nothing lost.</div></div><div className="architecture-item"><div className="architecture-number">04</div><div className="architecture-title">Playbook learning</div><div className="architecture-desc">Aggregates 30 conversations, detects patterns with confidence scores.</div><div className="architecture-label">Output</div><div className="architecture-output">Playbook v1.0, data-driven.</div></div><div className="architecture-item"><div className="architecture-number">05</div><div className="architecture-title">Predictions & alerts</div><div className="architecture-desc">Deal health scoring, stalling detection, 90-day revenue forecast.</div><div className="architecture-label">Output</div><div className="architecture-output">Know what's coming, act early.</div></div></div></div></div></section>

      <section><div className="container"><div className="content results-content"><div className="tagline">Three Weeks · What You Get</div><h2>A playbook with confidence scores on every element.</h2><p className="subtitle">Patterns identified across 30 real conversations — ranked, weighted, ready for the team to execute.</p><div className="results-grid"><div><ul className="results-list"><li><span className="results-number">01</span><span className="results-text">Email overload</span><div className="results-bar"></div><span className="results-confidence">95%</span></li><li><span className="results-number">02</span><span className="results-text">Manual data entry</span><div className="results-bar"></div><span className="results-confidence">92%</span></li><li><span className="results-number">03</span><span className="results-text">Client response time</span><div className="results-bar"></div><span className="results-confidence">88%</span></li><li><span className="results-number">04</span><span className="results-text">"Can we trust AI?" objection</span><div className="results-bar"></div><span className="results-confidence">88%</span></li><li><span className="results-number">05</span><span className="results-text">Budget sweet-spot $3–8k/mo</span><div className="results-bar"></div><span className="results-confidence">90%</span></li></ul></div><div><div className="stats-grid" style={{gridTemplateColumns: '1fr'}}><div className="stat-box"><div className="stat-label">Brokers scored</div><div className="stat-number">50</div></div><div className="stat-box"><div className="stat-label">Conversations analyzed</div><div className="stat-number">30</div></div><div className="stat-box"><div className="stat-label">Patterns identified</div><div className="stat-number">7–10</div></div><div className="stat-box"><div className="stat-label">Avg confidence on primary pain</div><div className="stat-number">95%</div></div></div></div></div></div></div></section>

      <section><div className="container"><div className="content timeline-content"><div className="tagline">Plan · 21 Days</div><h2>Aggressive but achievable.</h2><p className="subtitle">Weekly syncs Mondays, async updates daily, deliverable every Friday.</p><div className="timeline"><div className="timeline-item"><div className="timeline-dot"></div><div className="timeline-week">Week 01 – May 11</div><div className="timeline-title">Lead generation & integration</div><ul className="timeline-tasks"><li>Mon–Tue · Integrate Apollo + Supabase, build scoring model</li><li>Wed–Thu · Score 50 brokers, rank, extract top 30</li><li>Fri · Review & calibration with you</li></ul><div className="timeline-deliverable">Deliverable</div><div className="timeline-deliverable-text">Ranked list (CSV + Dashboard)</div></div><div className="timeline-item"><div className="timeline-dot"></div><div className="timeline-week">Week 02 – May 18</div><div className="timeline-title">Outreach & conversation intelligence</div><ul className="timeline-tasks"><li>Mon–Tue · Generate two variants per broker, A/B setup</li><li>Wed · Launch 30 messages, track opens and clicks</li><li>Thu–Fri · Analyze responses, extract structured signals</li></ul><div className="timeline-deliverable">Deliverable</div><div className="timeline-deliverable-text">Conversation database</div></div><div className="timeline-item"><div className="timeline-dot"></div><div className="timeline-week">Week 03 – May 25</div><div className="timeline-title">Playbook learning</div><ul className="timeline-tasks"><li>Mon–Tue · Aggregate 30 conversations, detect patterns</li><li>Wed–Thu · Generate Playbook v1.0 with confidence scores</li><li>Fri · Final presentation, recommend Phase 2</li></ul><div className="timeline-deliverable">Deliverable</div><div className="timeline-deliverable-text">Playbook v1.0 (PDF + Guide)</div></div></div></div></div></section>

      <section><div className="container"><div className="content"><div className="tagline">Phase 1</div><h2>$7K to de-risk sales scaling.</h2><div className="ask-content"><div className="price-box"><div className="price-details">Total investment · 3 weeks · 120 hours</div><div style={{marginTop: '30px'}}><div className="price-details" style={{marginBottom: '15px'}}><strong>21</strong> Days end-to-end</div><div className="price-details" style={{marginBottom: '15px'}}><strong>120</strong> Hours focused work</div><div className="price-details" style={{marginBottom: '15px'}}><strong>30</strong> Min/week sync</div><div className="price-details"><strong>v1.0</strong> Playbook delivered</div></div></div><div className="ask-list"><div style={{marginBottom: '20px'}}><div style={{fontSize: '12px', fontWeight: 600, color: '#999999', textTransform: 'uppercase', marginBottom: '20px', letterSpacing: '1px'}}>What I need from you</div></div><div className="ask-item"><div className="ask-number">01</div><div className="ask-title">Approval for Phase 1</div><div className="ask-desc">Yes or no — three weeks, $7k, validated playbook.</div></div><div className="ask-item"><div className="ask-number">02</div><div className="ask-title">Access to data</div><div className="ask-desc">10–15 recent broker conversations to train on real signal.</div></div><div className="ask-item"><div className="ask-number">03</div><div className="ask-title">A weekly Monday sync</div><div className="ask-desc">30 minutes to review progress, give feedback, unblock.</div></div></div></div></div></div></section>

      <section><div className="container"><div className="content cta-content"><div className="tagline">From Here</div><h1 className="cta-heading">If yes — Monday we start.</h1><p className="cta-text">Set up the environment, integrate sourcing, calibrate the scoring model. By Friday of Week 1 you have a ranked list and a feedback loop. Three weeks later, a playbook your team can run.</p><div className="next-steps"><div className="steps-title">This week</div><div className="steps-list">Confirm Phase 1 · Schedule data-access sync · Calendar invite for Monday standup.</div></div><div className="vision-section"><div className="steps-title">Long-term vision</div><div className="steps-list">Month 1 prove · Months 2–3 integrate · Month 4+ scale · Year 1, 500+ brokers through a proven system.</div></div><div className="contact-section"><div className="steps-title">Contact</div><div className="contact-info"><a href="mailto:rene@handle.dev">rene@handle.dev</a> · <a href="https://twitter.com/ReneHdzGtz">@ReneHdzGtz</a> · #handle-growth</div></div></div></div></section>
    </>
  )
}
