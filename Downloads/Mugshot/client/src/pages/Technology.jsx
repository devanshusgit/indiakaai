import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'

const steps = [
  {
    num: '01',
    title: 'Custom Training',
    desc: 'We train Vartool exclusively on your existing content — your characters, your style, your visual language become the foundation.',
  },
  {
    num: '02',
    title: 'Shot Division',
    desc: 'Your script is broken into individual shots with detailed staging notes — character blocking, expressions, backgrounds, and action.',
  },
  {
    num: '03',
    title: 'Shotbot Prompt Generation',
    desc: "Vartool's built-in engine reads each shot and automatically generates precise production prompts for every frame.",
  },
  {
    num: '04',
    title: 'Frame Generation',
    desc: 'Shotbot generates frame images for each shot — positioned and staged exactly as specified.',
  },
  {
    num: '05',
    title: 'Self-Evaluation Loop',
    desc: "Vartool evaluates its own output. If a frame doesn't meet quality standards, it automatically regenerates.",
  },
  {
    num: '06',
    title: 'Video & Render',
    desc: 'Completed shots move through editing and final render pipeline — sound design, compositing, colour grade.',
  },
]

const comparisonRows = [
  { feature: 'Delivery Speed', traditional: '6–9 months', publicAI: 'Fast but inconsistent', mugshot: '4 days per episode', good: true },
  { feature: 'Cost', traditional: 'Very high', publicAI: 'Low but generic', mugshot: 'Fraction of traditional', good: true },
  { feature: 'IP Security', traditional: 'Secure', publicAI: 'NOT secure', mugshot: '100% private', good: true },
  { feature: 'Visual Consistency', traditional: 'High', publicAI: 'Low — generic output', mugshot: 'Exact match to your IP', good: true },
]

export default function Technology() {
  return (
    <div>
      {/* ── Hero ── */}
      <section className="section-padding border-b border-border">
        <div className="max-w-7xl mx-auto">
          <p className="section-label mb-4">Proprietary Technology</p>
          <h1 className="page-title mb-4">Vartool</h1>
          <p className="text-xl font-medium mb-6" style={{ color: 'var(--primary)' }}>
            The Production System That Learns Your IP
          </p>
          <p className="body-text max-w-2xl text-base">
            Vartool is Mugshot Studios' proprietary end-to-end AI production system. It is not a public AI tool. It is not licensed software. It is a closed, private, custom-trained pipeline built specifically around each client's content — and it changes what is possible in animation production.
          </p>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="section-padding border-b border-border" style={{ backgroundColor: 'var(--card)' }}>
        <div className="max-w-7xl mx-auto">
          <p className="section-label mb-4">How It Works</p>
          <h2 className="section-title mb-8">From script to screen. In days, not months.</h2>
          <Accordion type="single" collapsible className="border-t border-border">
            {steps.map((step, i) => (
              <AccordionItem key={i} value={`step-${i}`}>
                <AccordionTrigger>
                  <span className="flex items-baseline gap-4">
                    <span className="text-sm font-semibold" style={{ color: 'var(--primary)' }}>{step.num}</span>
                    <span className="text-base md:text-lg">{step.title}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="body-text text-sm md:pl-10">{step.desc}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── Security ── */}
      <section className="section-padding border-b border-border">
        <div className="max-w-7xl mx-auto max-w-2xl">
          <p className="section-label mb-4">IP Security</p>
          <h2 className="section-title mb-5">Your data. Your IP. Nobody else's.</h2>
          <p className="body-text mb-8">
            When you work with Mugshot Studios, your content stays private. Always. Your episodes, character designs, scripts, and production assets are processed exclusively within our closed Vartool system. They never touch a public AI model.
          </p>
          <blockquote className="border-l-2 pl-6" style={{ borderColor: 'var(--primary)' }}>
            <p className="text-lg font-medium italic">"Your characters. Your style. Your data. Our AI. Nobody else's."</p>
          </blockquote>
        </div>
      </section>

      {/* ── Comparison ── */}
      <section className="section-padding" style={{ backgroundColor: 'var(--card)' }}>
        <div className="max-w-7xl mx-auto">
          <p className="section-label mb-4">Comparison</p>
          <h2 className="section-title mb-10">Vartool vs the alternatives</h2>
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border" style={{ backgroundColor: 'var(--muted)' }}>
                    <th className="text-left px-6 py-4 font-semibold text-foreground">Feature</th>
                    <th className="text-left px-6 py-4 font-semibold text-muted-foreground">Traditional Studio</th>
                    <th className="text-left px-6 py-4 font-semibold text-muted-foreground">Public AI Tools</th>
                    <th className="text-left px-6 py-4 font-semibold" style={{ color: 'var(--primary)' }}>Mugshot + Vartool</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={i} className="border-b border-border last:border-0">
                      <td className="px-6 py-4 font-medium text-foreground">{row.feature}</td>
                      <td className="px-6 py-4 text-muted-foreground">{row.traditional}</td>
                      <td className="px-6 py-4 text-muted-foreground">{row.publicAI}</td>
                      <td className="px-6 py-4 font-medium" style={{ color: 'var(--primary)' }}>
                        {row.mugshot}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
