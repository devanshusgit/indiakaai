export default function Technology() {
  return (
    <div>
      {/* Hero */}
      <section className="section-padding max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold mb-4">Vartool</h1>
        <p className="text-xl text-gray-300 mb-8">The Production System That Learns Your IP</p>
        <p className="text-gray-400 text-lg leading-relaxed max-w-3xl">
          Vartool is Mugshot Studios' proprietary end-to-end AI production system. It is not a public AI tool. It is not
          licensed software. It is a closed, private, custom-trained pipeline built specifically around each client's
          content and it changes what is possible in animation production.
        </p>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12">From Script to Screen. In Days, Not Months.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                num: '1',
                title: 'Custom Training',
                desc: 'We train Vartool exclusively on your existing content. Your characters, your style, your visual language become the foundation.',
              },
              {
                num: '2',
                title: 'Shot Division',
                desc: 'Your script is broken into individual shots with detailed staging notes — character blocking, expressions, backgrounds, and action.',
              },
              {
                num: '3',
                title: 'Shotbot Prompt Generation',
                desc: 'Vartool\'s built-in engine reads each shot and automatically generates precise production prompts for every frame.',
              },
              {
                num: '4',
                title: 'Frame Generation',
                desc: 'Shotbot generates frame images for each shot — positioned and staged exactly as specified.',
              },
              {
                num: '5',
                title: 'Self-Evaluation Loop',
                desc: 'Vartool evaluates its own output. If a frame doesn\'t meet quality standards, it automatically regenerates.',
              },
              {
                num: '6',
                title: 'Video & Render',
                desc: 'Completed shots move through editing and final render pipeline — sound design, compositing, colour grade.',
              },
            ].map((step, idx) => (
              <div key={idx} className="bg-black border border-gray-800 p-6 rounded-lg">
                <div className="text-3xl font-bold text-gray-500 mb-3">Step {step.num}</div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="section-padding max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-6">Your Data. Your IP. Nobody Else's.</h2>
        <p className="text-gray-400 text-lg leading-relaxed max-w-3xl mb-6">
          When you work with Mugshot Studios, your content stays private. Always. Your episodes, character designs,
          scripts, and production assets are processed exclusively within our closed Vartool system. They never touch a
          public AI model.
        </p>
        <p className="text-xl italic text-gray-300">"Your characters. Your style. Your data. Our AI. Nobody else's."</p>
      </section>

      {/* Comparison */}
      <section className="section-padding bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12">Vartool vs The Alternatives</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-gray-700">
                <tr>
                  <th className="pb-4 font-semibold">Feature</th>
                  <th className="pb-4 font-semibold">Traditional Studio</th>
                  <th className="pb-4 font-semibold">Public AI Tools</th>
                  <th className="pb-4 font-semibold">Mugshot + Vartool</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                <tr>
                  <td className="py-4">Delivery Speed</td>
                  <td className="py-4 text-gray-400">6–9 months</td>
                  <td className="py-4 text-gray-400">Fast but inconsistent</td>
                  <td className="py-4 text-green-400">4 days per episode ✓</td>
                </tr>
                <tr>
                  <td className="py-4">Cost</td>
                  <td className="py-4 text-gray-400">Very high</td>
                  <td className="py-4 text-gray-400">Low but generic</td>
                  <td className="py-4 text-green-400">Fraction of traditional ✓</td>
                </tr>
                <tr>
                  <td className="py-4">IP Security</td>
                  <td className="py-4 text-gray-400">Secure</td>
                  <td className="py-4 text-red-400">NOT secure</td>
                  <td className="py-4 text-green-400">100% private ✓</td>
                </tr>
                <tr>
                  <td className="py-4">Visual Consistency</td>
                  <td className="py-4 text-gray-400">High</td>
                  <td className="py-4 text-gray-400">Low — generic output</td>
                  <td className="py-4 text-green-400">Exact match to your IP ✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  )
}
