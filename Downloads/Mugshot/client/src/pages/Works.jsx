export default function Works() {
  const works = [
    {
      title: 'WONDER WORLD',
      type: 'Original IP',
      desc: 'A living magical amusement park island. Three children. One unforgettable villain. 52 x 11 minutes.',
    },
    {
      title: 'THE FIXERS',
      type: 'Original IP',
      desc: '26 x 11 minutes | 3D Animation | Ages 4–7. Currently in production.',
    },
    {
      title: 'OPAL PRODUCTION CONTRACT',
      type: 'Client Work',
      desc: 'Contracted animation production for Opal Production SRL, Romania. Delivering broadcast-quality episodes using Vartool.',
    },
    {
      title: 'CSIR-AMPRI DOCUMENTARIES',
      type: 'Documentary',
      desc: "Science communication series for India's premier materials research institute.",
    },
    {
      title: 'THE FOURTH WALL',
      type: 'Original IP',
      desc: 'A surreal thriller about characters trapped inside an AI-generated world. In development.',
    },
    {
      title: 'INS ANJDIP FILM',
      type: 'Documentary',
      desc: '6-minute commissioning documentary film for the Indian Navy.',
    },
  ]

  return (
    <div className="section-padding max-w-7xl mx-auto">
      <h1 className="text-5xl font-bold mb-4">Our Work</h1>
      <p className="text-xl text-gray-300 mb-12">From original IP to contracted productions — here's what we build.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {works.map((work, idx) => (
          <div key={idx} className="bg-gray-900 p-6 rounded-lg card-hover border border-gray-800">
            <div className="text-sm text-gray-500 mb-2">{work.type}</div>
            <h3 className="text-xl font-bold mb-3">{work.title}</h3>
            <p className="text-gray-400">{work.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
