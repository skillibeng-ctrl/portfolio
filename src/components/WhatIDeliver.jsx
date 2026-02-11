import { GlobeAltIcon, ChatBubbleLeftRightIcon, CloudIcon } from '@heroicons/react/24/outline';

export default function WhatIDeliver() {
  return (
    <section className="bg-gray-950 py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          What I Deliver
        </h2>

        <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-12">
          Results-focused solutions tailored to your specific business goals
        </p>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 - Web Development */}
          <div
            className="
              bg-white/10 backdrop-blur-xl border border-white/15 
              rounded-2xl shadow-2xl p-8 text-left transition-all 
              hover:shadow-[0_8px_32px_rgba(255,255,255,0.08)] 
              hover:-translate-y-1
            "
          >
            <div className="flex items-center justify-center w-14 h-14 bg-white/10 rounded-xl mb-6 border border-white/20">
              <GlobeAltIcon className="w-8 h-8 text-cyan-400" />
            </div>

            <h3 className="text-2xl font-semibold text-white mb-4">
              Web Development
            </h3>

            <p className="text-gray-300 mb-6">
              SEO-ready websites that load in under 2 seconds and drive up to 40% more leads
            </p>

            <ul className="space-y-3 text-gray-300 text-sm">
              <li>→ 98/100 PageSpeed score</li>
              <li>→ Mobile-first responsive design</li>
              <li>→ Conversion-optimized layouts</li>
            </ul>

            <a
              href="#"
              className="mt-8 inline-block text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
            >
              Learn More →
            </a>
          </div>

          {/* Card 2 - UI/UX Design */}
          <div
            className="
              bg-white/10 backdrop-blur-xl border border-white/15 
              rounded-2xl shadow-2xl p-8 text-left transition-all 
              hover:shadow-[0_8px_32px_rgba(255,255,255,0.08)] 
              hover:-translate-y-1
            "
          >
            <div className="flex items-center justify-center w-14 h-14 bg-white/10 rounded-xl mb-6 border border-white/20">
              <ChatBubbleLeftRightIcon className="w-8 h-8 text-purple-400" />
            </div>

            <h3 className="text-2xl font-semibold text-white mb-4">
              UI/UX Design
            </h3>

            <p className="text-gray-300 mb-6">
              User-centered designs that increase engagement by 35% and reduce bounce rates by 40%
            </p>

            <ul className="space-y-3 text-gray-300 text-sm">
              <li>→ Data-driven design decisions</li>
              <li>→ Intuitive user journeys</li>
              <li>→ A/B tested interfaces</li>
            </ul>

            <a
              href="#"
              className="mt-8 inline-block text-purple-400 hover:text-purple-300 font-medium transition-colors"
            >
              Learn More →
            </a>
          </div>

          {/* Card 3 - SaaS Development */}
          <div
            className="
              bg-white/10 backdrop-blur-xl border border-white/15 
              rounded-2xl shadow-2xl p-8 text-left transition-all 
              hover:shadow-[0_8px_32px_rgba(255,255,255,0.08)] 
              hover:-translate-y-1
            "
          >
            <div className="flex items-center justify-center w-14 h-14 bg-white/10 rounded-xl mb-6 border border-white/20">
              <CloudIcon className="w-8 h-8 text-emerald-400" />
            </div>

            <h3 className="text-2xl font-semibold text-white mb-4">
              SaaS Development
            </h3>

            <p className="text-gray-300 mb-6">
              End-to-end SaaS solutions with scalable architecture and 99.9% uptime guarantee
            </p>

            <ul className="space-y-3 text-gray-300 text-sm">
              <li>→ Scalable architecture</li>
              <li>→ 99.9% Uptime guarantee</li>
              <li>→ Secure data handling</li>
            </ul>

            <a
              href="#"
              className="mt-8 inline-block text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              Learn More →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}