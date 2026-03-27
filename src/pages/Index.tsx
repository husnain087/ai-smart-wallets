import { useNavigate } from "react-router-dom";
import { Wallet, Shield, Zap, Globe, ArrowRight, CreditCard, Wifi } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[hsl(160,30%,8%)] text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center">
            <Wallet size={18} className="text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight">SmartWallet AI</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-white/70">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#security" className="hover:text-white transition-colors">Security</a>
          <a href="#rates" className="hover:text-white transition-colors">Rates</a>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/login")}
            className="text-sm text-white/80 hover:text-white transition-colors px-4 py-2"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate("/login?mode=signup")}
            className="text-sm gradient-primary text-white px-5 py-2.5 rounded-xl font-semibold hover:opacity-90 transition-opacity"
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 md:px-12 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-400 font-semibold mb-6">
            SmartWallet AI Banking
          </p>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.05] mb-6">
            Wealth{" "}
            <span className="italic bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent">
              Unlocked.
            </span>
          </h1>
          <p className="text-white/60 text-lg md:text-xl leading-relaxed mb-8 max-w-lg">
            Experience the pinnacle of financial technology. Crafted for those who value speed, security, and intelligence in every transaction.
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/login?mode=signup")}
              className="gradient-primary text-white px-8 py-3.5 rounded-xl font-semibold text-sm flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              Get Started <ArrowRight size={16} />
            </button>
            <button
              onClick={() => navigate("/login")}
              className="border border-white/20 text-white/80 px-8 py-3.5 rounded-xl font-semibold text-sm hover:bg-white/5 transition-colors"
            >
              Portal Login
            </button>
          </div>
        </div>

        {/* Card Preview */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative">
            <div className="w-[340px] h-[210px] rounded-2xl p-6 flex flex-col justify-between shadow-2xl"
              style={{ background: "linear-gradient(135deg, hsl(160,25%,18%), hsl(160,20%,12%))" }}
            >
              <div className="flex items-start justify-between">
                <span className="text-xs font-semibold tracking-widest text-white/60 uppercase">SmartWallet</span>
                <div className="w-10 h-7 rounded bg-amber-500/90" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-5 rounded bg-white/15 border border-white/20" />
                <Wifi size={14} className="text-white/40 rotate-90" />
              </div>
              <div>
                <p className="text-sm font-mono tracking-[0.25em] text-white/80 mb-3">
                  •••• •••• •••• 1717
                </p>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[10px] text-white/40 uppercase">Card Holder</p>
                    <p className="text-xs font-semibold text-white/80">SMARTWALLET USER</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-white/40 uppercase">Expires</p>
                    <p className="text-xs font-semibold text-white/80">12/28</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl border border-white/10 -z-10" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 md:px-12 py-16 max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">Why SmartWallet AI?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Shield, title: "Bank-Grade Security", desc: "256-bit encryption with biometric authentication and real-time fraud detection." },
            { icon: Zap, title: "Instant Transfers", desc: "Send and receive money in seconds with zero hidden fees on domestic transfers." },
            { icon: Globe, title: "AI-Powered Insights", desc: "Get personalized financial insights and spending analytics powered by AI." },
          ].map((f, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.08] transition-colors">
              <div className="w-11 h-11 rounded-xl gradient-primary flex items-center justify-center mb-4">
                <f.icon size={20} className="text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 md:px-12 py-8 text-center text-white/40 text-sm">
        © 2026 SmartWallet AI. All rights reserved.
      </footer>
    </div>
  );
};

export default Index;
