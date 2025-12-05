export default function AboutPage() {
  return (
    <div className="min-h-screen bg-primary flex flex-col items-center px-6 py-20 text-secondary">
      {/* Heading */}
      <div className="max-w-3xl text-center animate-fadeIn">
        <h1 className="text-4xl md:text-6xl font-extrabold text-accent animate-float">
          About Us
        </h1>
        <p className="mt-4 text-secondary/80 text-lg md:text-xl font-light">
          We create digital experiences with quality, trust & innovation.
        </p>
      </div>

      {/* Story */}
      <div className="max-w-4xl mt-12 space-y-6 text-center animate-slideUp">
        <p className="text-secondary/90 leading-relaxed text-[18px]">
          Our purpose is to build something meaningful — software that feels
          smooth, reliable and enjoyable to use. Every detail matters.
        </p>
        <p className="text-secondary/90 leading-relaxed text-[18px]">
          We focus on performance, modern UI, and continuous product evolution,
          ensuring users always experience technology at its best.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-20 w-full max-w-5xl">
        {/* Vision */}
        <div
          className="p-8 rounded-2xl bg-secondary/5 border border-secondary/20
                         hover:border-gold hover:shadow-xl hover:-translate-y-2
                         transition-all duration-300 animate-card"
        >
          <h3 className="text-2xl font-bold text-accent mb-3">🌟 Vision</h3>
          <p className="text-secondary/70 text-[16px]">
            Building smarter, elegant & future-forward digital experiences.
          </p>
        </div>

        {/* Mission */}
        <div
          className="p-8 rounded-2xl bg-secondary/5 border border-secondary/20
                         hover:border-gold hover:shadow-xl hover:-translate-y-2
                         transition-all duration-300 animate-card delay-200"
        >
          <h3 className="text-2xl font-bold text-accent mb-3">🚀 Mission</h3>
          <p className="text-secondary/70 text-[16px]">
            Delivering secure, fast & seamless technology for everyone.
          </p>
        </div>

        {/* Values */}
        <div
          className="p-8 rounded-2xl bg-secondary/5 border border-secondary/20
                         hover:border-gold hover:shadow-xl hover:-translate-y-2
                         transition-all duration-300 animate-card delay-400"
        >
          <h3 className="text-2xl font-bold text-accent mb-3">💎 Values</h3>
          <p className="text-secondary/70 text-[16px]">
            Honesty, quality, transparency & user-first innovation.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-24 text-center animate-fadeInSlow">
        <p className="text-secondary/60 text-sm tracking-wider">
          © {new Date().getFullYear()} Designed with excellence ✦ All Rights
          Reserved
        </p>
      </div>
    </div>
  );
}
