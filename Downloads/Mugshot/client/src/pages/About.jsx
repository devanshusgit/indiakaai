import { ShaderAnimation } from '../components/ShaderAnimation'

export default function About() {
  return (
    <div>
      {/* Hero with Shader Background */}
      <div className="relative h-64 md:h-80 flex items-center justify-center overflow-hidden">
        <ShaderAnimation />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white">We Are Mugshot Studios</h1>
        </div>
      </div>

      <div className="section-padding max-w-7xl mx-auto">

        {/* Studio Overview */}
        <div className="mb-16">
          <p className="text-gray-400 text-lg leading-relaxed mb-6">
            Mugshot Studios is a Mumbai-based animation and content production studio incorporated in August 2024. In less
            than two years we have built active international partnerships across four continents, developed a proprietary
            AI production system that is unlike anything else in the animation industry, and created original IP now being
            presented at the world's most prestigious animation market.
          </p>
          <p className="text-gray-400 text-lg leading-relaxed">
            We are not a traditional service studio. We are not a generic AI tool provider. We are a creative technology
            studio — where human storytelling and intelligent production systems work together to produce content that is
            faster, cheaper, and more faithful to each client's creative vision than anything a traditional pipeline can
            offer.
          </p>
        </div>

        {/* Leadership */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
          <div>
            <h3 className="text-2xl font-bold mb-3">Vivek Shukla</h3>
            <p className="text-gray-500 font-semibold mb-3">Founder & Director</p>
            <p className="text-gray-400">
              Filmmaker, writer, and animation creator with a vision to make broadcast-quality animation accessible to
              producers worldwide through technology. Vivek leads Mugshot Studios' creative direction, international
              partnerships, and the ongoing development of the Vartool production system.
            </p>
          </div>

          {/* Jeet's Card */}
          <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800">
            {/* Image placeholder */}
            <div className="w-full h-64 bg-gray-800 flex items-center justify-center">
              <div className="text-center text-gray-600">
                <div className="text-5xl mb-2">📷</div>
                <p className="text-sm">Jeet's Photo</p>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-1">Jeet</h3>
              <p className="text-gray-500 font-semibold mb-4">Creative Director / Writer</p>
              <p className="text-gray-400 text-sm leading-relaxed mb-3">
                Jeet comes from a theatre background and has been actively working in the creative industry since 2009.
                Over the years, he has worked as a screenwriter for leading platforms and channels including Sony TV,
                Disney+ Hotstar, Zee TV, and Sun TV.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                He has also served as Creative Head for multiple content production houses, leading projects from concept
                to execution. Along with television and digital content, he brings strong experience in animation writing
                as well. Creating, developing, and executing engaging content across formats is his core strength.
              </p>
            </div>
          </div>
        </div>

        {/* Rest of Team */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-6">Team</h3>
          <div className="space-y-4 text-gray-400">
            <div>
              <p className="font-semibold text-white">Samrat Dixit — Production Head</p>
              <p className="text-sm">
                4+ years across animation, live action, and brand films. Heads AI-assisted animation and live action
                production.
              </p>
            </div>
            <div>
              <p className="font-semibold text-white">Manav Mishra — CTO</p>
              <p className="text-sm">
                Leads technology vision, building AI-driven creative tools and scalable production platforms.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-12 border-t border-gray-800">
          <p className="text-gray-500">📍 Unit 112, IJMIMA Complex, Off Link Road, Malad West, Mumbai 400064, India</p>
        </div>
      </div>
    </div>
  )
}
