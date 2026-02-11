import React from 'react';

const DatabaseCards = () => {
  const cards = [
    {
      title: "Strategy & Planning",
      description: "Increase ROI by 5%+ with strategic planning and roadmap development that aligns with your business goals",
      icon: "🎯",
      tags: ["Market Research", "User Analysis", "Competitive Analysis", "ROI Planning"],
      color: "from-blue-800/90 to-blue-900/95",
      iconBg: "bg-blue-500/20"
    },
    {
      title: "UI/UX Design",
      description: "Boosts conversions by 40% with user-centered design that transforms visitors into customers",
      icon: "🎨",
      tags: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
      color: "from-purple-800/90 to-purple-900/95",
      iconBg: "bg-purple-500/20"
    },
    {
      title: "Development",
      description: "Achieve top SEO/PageSpeed scores with modern techniques and experience optimization",
      icon: "⚡",
      tags: ["React/Next.js", "Node.js", "TypeScript", "API Development"],
      color: "from-emerald-800/90 to-emerald-900/95",
      iconBg: "bg-emerald-500/20"
    },
    {
      title: "Database Architecture",
      description: "Reduce query times by 60% with robust database design and implementation for scalable applications",
      icon: "🗄️",
      tags: ["Schema Design", "Data Modeling", "Query Optimization", "Migration Strategy"],
      color: "from-neutral-800/90 to-neutral-900/95",
      iconBg: "bg-neutral-500/20"
    },
    {
      title: "DevOps & Cloud",
      description: "Ensure 99.9% uptime with automated CI/CD pipelines and scalable cloud infrastructure",
      icon: "☁️",
      tags: ["CI/CD", "Docker", "AWS/GCP", "Monitoring"],
      color: "from-orange-800/90 to-orange-900/95",
      iconBg: "bg-orange-500/20"
    },
    {
      title: "Security",
      description: "Protect against threats with comprehensive security audits and compliance frameworks",
      icon: "🛡️",
      tags: ["Penetration Testing", "Encryption", "Compliance", "Audit Logs"],
      color: "from-red-800/90 to-red-900/95",
      iconBg: "bg-red-500/20"
    }
  ];

  return (
    <div className="min-h-screen bg-black py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900 border border-gray-800 mb-4">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"></div>
            <span className="text-sm font-medium text-gray-300">Our Expertise</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
  Full-Stack{" "}
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
    Solutions
  </span>
</h1>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Delivering measurable results through comprehensive technical expertise
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div 
              key={index}
              className={`w-full rounded-2xl bg-gradient-to-b ${card.color} p-5 shadow-[0_10px_30px_rgba(0,0,0,0.6)] text-neutral-100 border border-gray-800/50 hover:border-gray-700/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)]`}
            >
              {/* Icon */}
              <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${card.iconBg} text-lg backdrop-blur-sm`}>
                {card.icon}
              </div>

              {/* Title */}
              <h3 className="mb-2 text-lg font-semibold">
                {card.title}
              </h3>

              {/* Description */}
              <p className="mb-4 text-sm leading-relaxed text-neutral-400">
                {card.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {card.tags.map((tag, tagIndex) => (
                  <span 
                    key={tagIndex}
                    className="rounded-full bg-white/10 px-3 py-1 text-xs text-neutral-200 backdrop-blur-sm hover:bg-white/15 transition-colors duration-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Stats Indicator */}
              <div className="mt-4 pt-4 border-t border-gray-800/50">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Success Rate</span>
                  <span className="font-semibold text-gray-300">
                    {card.title.includes("Strategy") ? "95%" :
                     card.title.includes("UI/UX") ? "98%" :
                     card.title.includes("Development") ? "97%" :
                     card.title.includes("Database") ? "96%" :
                     card.title.includes("DevOps") ? "99%" : "94%"}
                  </span>
                </div>
                <div className="h-1 w-full bg-gray-800 rounded-full mt-1 overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${card.iconBg.replace('20', '60')} transition-all duration-1000 ease-out`}
                    style={{
                      width: card.title.includes("Strategy") ? "95%" :
                             card.title.includes("UI/UX") ? "98%" :
                             card.title.includes("Development") ? "97%" :
                             card.title.includes("Database") ? "96%" :
                             card.title.includes("DevOps") ? "99%" : "94%"
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <button className="group relative px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30">
            <span className="relative z-10 flex items-center gap-2">
              <span>Explore All Services</span>
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          <p className="mt-4 text-gray-500 text-sm">
            Get a personalized strategy for your project
          </p>
        </div>
      </div>
    </div>
  );
};

export default DatabaseCards;