import {
  ArrowRight,
  Search,
  TrendingUp,
  BarChart3,
} from "lucide-react";

function Home() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-black px-6 pt-24"
    >
      <div className="absolute left-10 top-32 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl"></div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        
        {/* Left */}
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-sm text-orange-400">
            <Search size={16} />
            Smart SEO Solutions
          </div>

          <h1 className="text-5xl font-bold leading-tight sm:text-6xl">
            Grow Your Business With{" "}
            <span className="text-orange-500">Powerful SEO</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-gray-400">
            We help businesses improve their Google rankings, increase
            organic traffic, and reach more customers with effective SEO
            strategies.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#contact"
              className="flex items-center gap-2 rounded-lg bg-orange-500 px-6 py-3 font-semibold hover:bg-orange-600"
            >
              Get Started
              <ArrowRight size={18} />
            </a>

            <a
              href="#services"
              className="rounded-lg border border-white/20 px-6 py-3 font-semibold hover:border-orange-500 hover:text-orange-500"
            >
              Our Services
            </a>
          </div>
        </div>

        {/* Right */}
        <div className="relative">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
            
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Organic Traffic</p>
                <h3 className="text-3xl font-bold">+127%</h3>
              </div>

              <TrendingUp className="text-orange-500" size={40} />
            </div>

            <div className="flex h-48 items-end gap-3">
              {[30, 45, 40, 60, 55, 75, 90, 100].map(
                (height, index) => (
                  <div
                    key={index}
                    className="flex-1 rounded-t-lg bg-orange-500/70"
                    style={{ height: `${height}%` }}
                  ></div>
                )
              )}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-white/5 p-4">
                <Search className="mb-2 text-orange-500" size={22} />
                <p className="text-sm text-gray-400">Keywords</p>
                <p className="text-xl font-bold">2.4K+</p>
              </div>

              <div className="rounded-xl bg-white/5 p-4">
                <BarChart3 className="mb-2 text-orange-500" size={22} />
                <p className="text-sm text-gray-400">Growth</p>
                <p className="text-xl font-bold">85%</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Home;