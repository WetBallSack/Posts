import React from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { 
  Feather, 
  ArrowRight, 
  Check,
  Shield,
  Zap,
  Brain,
  BarChart3,
  Bot,
  Minus,
  Globe,
  Database,
  Cpu,
  Sparkles,
  MessageSquare,
  Share2,
  BrainCircuit
} from 'lucide-react';
import HlsVideo from './HlsVideo';

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
  onLegalClick: (type: 'about' | 'privacy' | 'terms' | 'contact') => void;
}

export default function LandingPage({ onGetStarted, onLogin, onLegalClick }: LandingPageProps) {
  const { t, i18n } = useTranslation();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-zinc-100 font-sans selection:bg-emerald-500/30 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#0A0A0A]/80 backdrop-blur-xl">
        <div className="max-w-screen-xl mx-auto px-10 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center text-emerald-400">
              <Feather className="w-5 h-5" strokeWidth={2} />
            </div>
            <span className="font-serif text-xl tracking-tight font-medium text-white">Sato</span>
          </div>

          <div className="hidden lg:flex items-center gap-12">
            <a href="#features" className="text-[10px] font-bold text-zinc-400 hover:text-white transition-colors tracking-[0.2em] uppercase">{t('Why Sato?')}</a>
            <a href="#how-it-works" className="text-[10px] font-bold text-zinc-400 hover:text-white transition-colors tracking-[0.2em] uppercase">{t('How It Works')}</a>
            <a href="#pricing" className="text-[10px] font-bold text-zinc-400 hover:text-white transition-colors tracking-[0.2em] uppercase">{t('Pricing')}</a>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Globe className="w-3 h-3 text-zinc-400" />
              <select 
                value={i18n.language}
                onChange={(e) => i18n.changeLanguage(e.target.value)}
                className="bg-transparent text-[10px] text-zinc-400 font-bold focus:outline-none cursor-pointer hover:text-white transition-colors uppercase tracking-[0.15em] [&>option]:bg-[#0A0A0A]"
              >
                <option value="en">EN</option>
                <option value="zh">ZH</option>
              </select>
            </div>
            <button 
              onClick={onLogin}
              className="text-[11px] font-bold text-zinc-400 hover:text-white transition-colors uppercase tracking-widest"
            >
              {t('Login')}
            </button>
            <button 
              onClick={onGetStarted}
              className="bg-zinc-100 text-[#0A0A0A] text-[10px] font-bold px-6 py-2.5 rounded-sm hover:bg-white transition-all uppercase tracking-widest shadow-sm"
            >
              {t('Get Started')}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Liquid Wave Background */}
      <section className="relative pt-24 md:pt-32 lg:pt-40 pb-16 lg:pb-24 px-6 lg:px-10 overflow-hidden border-b border-white/5 min-h-[100dvh] lg:min-h-[90vh] flex flex-col justify-center">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
          {/* Heavy vignettes to fade the video into the background, making it natural and less dominant */}
          <div className="absolute inset-0 bg-[#0A0A0A]/60 z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0A0A0A_80%)] z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A] z-10" />
          <HlsVideo 
            src="https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8"
            autoPlay={true} 
            loop={true} 
            muted={true} 
            playsInline={true} 
            className="absolute inset-0 w-full lg:w-[120%] h-full lg:h-[120%] lg:-left-[10%] lg:-top-[10%] object-cover object-center opacity-20"
          />
        </div>
        
        <div className="max-w-screen-xl mx-auto relative z-20 w-full mt-10 md:mt-0">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em] mb-6 sm:mb-12 backdrop-blur-sm max-w-full overflow-hidden text-center sm:text-left shadow-sm">
                <Zap className="w-3 h-3 fill-emerald-500 text-emerald-500 shrink-0" />
                <span className="truncate">{t('Now with GPT-5.1, Gemini 2.5/3 Pro')}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-medium leading-[0.95] mb-6 sm:mb-10 tracking-tight sm:tracking-tighter text-zinc-100">
                {t('Dominate Binance Square While You Sleep.')}
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-xl mb-8 sm:mb-12 leading-relaxed font-light tracking-tight border-l-2 border-emerald-900/40 pl-5 sm:pl-8">
                {t('The AI-powered publishing engine for crypto KOLs. Automate your Binance Square presence with real-time market data, custom personas, and intelligent continuous scheduling.')}
              </p>
              <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4 sm:gap-6 w-full sm:w-auto">
                <button 
                  onClick={onGetStarted}
                  className="group relative px-6 sm:px-10 py-4 sm:py-6 overflow-hidden border border-zinc-500/30 text-zinc-300 hover:text-white transition-colors duration-700 bg-[#0A0A0A]/40 backdrop-blur-sm shadow-2xl w-full sm:w-auto flex justify-center"
                >
                  <div className="absolute inset-0 bg-zinc-100 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]" />
                  <div className="relative flex items-center gap-4 sm:gap-8 font-serif uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[10px] sm:text-xs font-medium group-hover:text-[#0A0A0A] transition-colors duration-700 z-10 whitespace-nowrap">
                    {t('Start Automating For Free')}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-700" />
                  </div>
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="relative hidden lg:block"
            >
              {/* Main Post Preview Card */}
              <div className="bg-zinc-900/80 backdrop-blur-xl border border-white/5 rounded-sm p-0 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] relative z-10 overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-zinc-950/50">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-zinc-700" />
                    <div className="w-2 h-2 rounded-full bg-zinc-700" />
                    <div className="w-2 h-2 rounded-full bg-zinc-700" />
                  </div>
                  <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.3em]">{t('Live Preview')}</div>
                  <div className="w-10" />
                </div>
                
                <div className="p-10">
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 rounded-sm bg-black border border-white/10 flex items-center justify-center text-emerald-400 shrink-0 shadow-md">
                      <Feather className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-bold text-white">Sato Analyst</span>
                        <span className="text-[10px] font-medium text-emerald-500">@sato_ai • 2m</span>
                      </div>
                      <p className="text-base text-zinc-300 leading-relaxed mb-6 font-light">
                        BTC/USDT testing critical resistance at $98.4k. 48h momentum suggests a breakout is imminent. Volume profile shows strong accumulation. 🚀
                      </p>
                      
                      {/* Simulated Chart */}
                      <div className="aspect-[21/9] w-full bg-zinc-950/50 rounded-sm border border-white/5 relative overflow-hidden group">
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200">
                          {/* Grid Lines */}
                          <g stroke="rgba(255,255,255,0.05)" strokeWidth="1">
                            <line x1="0" y1="50" x2="400" y2="50" />
                            <line x1="0" y1="100" x2="400" y2="100" />
                            <line x1="0" y1="150" x2="400" y2="150" />
                          </g>
                          <path 
                            d="M0,170 C20,160 40,175 60,150 C80,125 100,140 120,130 C150,115 180,100 210,110 C240,120 270,80 300,90 C330,100 360,50 400,30" 
                            fill="none" 
                            stroke="#10B981" 
                            strokeWidth="1"
                            strokeDasharray="4 4"
                            className="opacity-20"
                          />
                          <motion.path 
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2, ease: "easeOut" }}
                            d="M0,170 C20,160 40,175 60,150 C80,125 100,140 120,130 C150,115 180,100 210,110 C240,120 270,80 300,90 C330,100 360,50 400,30" 
                            fill="none" 
                            stroke="#10B981" 
                            strokeWidth="2.5"
                          />
                          {/* Graph Area Gradient */}
                          <motion.path 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 1 }}
                            d="M0,170 C20,160 40,175 60,150 C80,125 100,140 120,130 C150,115 180,100 210,110 C240,120 270,80 300,90 C330,100 360,50 400,30 L400,200 L0,200 Z" 
                            fill="url(#chart-gradient)" 
                            className="opacity-30"
                          />
                          <defs>
                            <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#10B981" stopOpacity="0.5" />
                              <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute top-3 right-3 bg-zinc-900/80 border border-white/10 rounded-sm px-2.5 py-1 text-[10px] font-bold text-emerald-400 shadow-sm backdrop-blur-md">
                          BTC +4.2%
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Bar */}
                  <div className="flex items-center justify-between pt-8 border-t border-white/5">
                    <div className="flex gap-8">
                      <div className="h-1 w-16 bg-white/10 rounded-full" />
                      <div className="h-1 w-16 bg-white/10 rounded-full" />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                      <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-[0.3em]">{t('Published')}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating "Thinking" Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20, x: -20 }}
                animate={{ opacity: 1, y: 0, x: -20 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="absolute -bottom-12 -left-12 bg-zinc-950/90 backdrop-blur-xl border border-white/10 rounded-sm p-6 shadow-2xl z-20 max-w-[260px]"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-sm bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <Brain className="w-4 h-4 text-emerald-500" />
                  </div>
                  <span className="text-[10px] font-bold text-zinc-100 uppercase tracking-widest">{t('AI Engine')}</span>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-[9px] font-bold text-zinc-500 uppercase tracking-wider">
                    <span>{t('Analyzing Signal')}</span>
                    <span className="text-emerald-500">100%</span>
                  </div>
                  <div className="h-[2px] w-full bg-white/5 relative">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                      className="h-full bg-emerald-500" 
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Wrapping Features and Philosophy together with the Green Glass Wave Background */}
      <div className="relative border-b border-white/5 overflow-hidden">
        <div className="absolute inset-x-0 bottom-0 top-1/4 z-0 pointer-events-none opacity-35 flex items-center justify-center">
          <div className="absolute inset-0 bg-[#0A0A0A]/50 z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0A0A0A_80%)] z-10" />
          <HlsVideo 
            src="https://stream.mux.com/Kec29dVyJgiPdtWaQtPuEiiGHkJIYQAVUJcNiIHUYeo.m3u8"
            autoPlay={true} 
            loop={true} 
            muted={true} 
            playsInline={true} 
            className="absolute inset-0 w-full lg:w-[120%] h-full lg:h-[120%] lg:-left-[10%] lg:-top-[10%] object-cover object-center mix-blend-screen blur-[2px]"
          />
        </div>

        {/* Philosophy Section */}
        <section className="relative z-10 py-16 lg:py-40 px-6 lg:px-10">
          <div className="max-w-screen-xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-12 xl:gap-24 items-start">
              <div className="lg:col-span-5 min-w-0">
                <span className="text-[9px] sm:text-[10px] font-bold text-emerald-500 uppercase tracking-[0.4em] sm:tracking-[0.5em] mb-6 sm:mb-8 lg:mb-12 block">{t('The Philosophy')}</span>
                <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif font-medium text-zinc-100 mb-8 sm:mb-10 lg:mb-14 leading-[1.05] sm:leading-[1] tracking-tight">
                  {t('Less effort, more impact.')}
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-zinc-400 leading-relaxed font-light mb-10 border-l-2 border-emerald-900/40 pl-5 sm:pl-6 lg:pl-10">
                  {t('We believe that your digital presence should be an extension of your intelligence, not a drain on your time.')}
                </p>
              </div>
              <div className="lg:col-span-7 min-w-0 grid md:grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-sm overflow-hidden shadow-sm backdrop-blur-md">
                <div className="bg-[#0A0A0A]/80 p-6 sm:p-8 lg:p-12 xl:p-14">
                  <h3 className="text-[9px] sm:text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-6 sm:mb-8 lg:mb-10">{t('The Old Way')}</h3>
                  <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                    {['Staring at charts all day', 'Struggling to translate', 'Content ideas depletion', 'Repetitive narrative'].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 sm:gap-4 lg:gap-5 text-zinc-600">
                        <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                        <span className="text-[13px] sm:text-sm font-light tracking-wide italic">{t(item)}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-zinc-900/60 p-6 sm:p-8 lg:p-12 xl:p-14">
                  <h3 className="text-[9px] sm:text-[10px] font-bold text-white uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-6 sm:mb-8 lg:mb-10">{t('The Sato Way')}</h3>
                  <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                    {['24/7 Continuous Presence', 'Auto EN ↔ CN Translation', 'Llama 3.3 Intelligence', 'Zero Manual Friction'].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 sm:gap-4 lg:gap-5 text-white">
                        <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
                        <span className="text-[13px] sm:text-sm font-medium tracking-wide uppercase">{t(item)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Matrix */}
        <section id="features" className="relative z-10 py-12 lg:py-24 px-6 lg:px-10">
          <div className="max-w-screen-xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5 backdrop-blur-sm shadow-[0_0_50px_rgba(16,185,129,0.05)]">
              <motion.div {...fadeIn} className="bg-[#0A0A0A]/90 p-10 lg:p-12 hover:bg-zinc-900/40 transition-colors">
                <Brain className="w-7 h-7 text-emerald-400 mb-8 lg:mb-10" />
                <h3 className="text-lg font-serif font-medium text-white mb-4 lg:mb-6">{t('12+ AI Personas')}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed font-light">
                  {t('From Crypto Degen to Macro Economist. Your feed, your personality, perfectly replicated.')}
                </p>
              </motion.div>
              <motion.div {...fadeIn} transition={{ delay: 0.1 }} className="bg-[#0A0A0A]/90 p-10 lg:p-12 hover:bg-zinc-900/40 transition-colors">
                <BarChart3 className="w-7 h-7 text-emerald-400 mb-8 lg:mb-10" />
                <h3 className="text-lg font-serif font-medium text-white mb-4 lg:mb-6">{t('Dynamic 48h Charts')}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed font-light">
                  {t('Real-time, custom candlestick charts for every signal, maximizing your algorithmic reach.')}
                </p>
              </motion.div>
              <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="bg-[#0A0A0A]/90 p-10 lg:p-12 hover:bg-zinc-900/40 transition-colors">
                <Shield className="w-7 h-7 text-emerald-400 mb-8 lg:mb-10" />
                <h3 className="text-lg font-serif font-medium text-white mb-4 lg:mb-6">{t('Vault Security')}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed font-light">
                  {t('Your keys are encrypted at the database level with Supabase Vault. Bank-grade protection.')}
                </p>
              </motion.div>
              <motion.div {...fadeIn} transition={{ delay: 0.3 }} className="bg-[#0A0A0A]/90 p-10 lg:p-12 hover:bg-zinc-900/40 transition-colors">
                <Bot className="w-7 h-7 text-emerald-400 mb-8 lg:mb-10" />
                <h3 className="text-lg font-serif font-medium text-white mb-4 lg:mb-6">{t('Anti-Bot Clause')}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed font-light">
                  {t('Intelligent memory ensures you never repeat the same coin or setup type too frequently.')}
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </div>

      {/* How It Works */}
      <section id="how-it-works" className="relative py-16 lg:py-24 px-6 lg:px-10 border-t border-white/5 overflow-hidden">
        {/* Animated Video Background - Video 4 (Green Grass & Earth) */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-30 mix-blend-lighten flex items-center justify-center">
          <div className="absolute inset-0 bg-[#0A0A0A]/50 z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0A0A0A_60%)] z-10" />
          <video 
            autoPlay={true} 
            loop={true} 
            muted={true} 
            playsInline={true} 
            className="absolute inset-0 w-full lg:w-[120%] h-full lg:h-[120%] lg:-left-[10%] lg:-top-[10%] object-cover object-center lg:object-left blur-[1px]"
          >
            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260330_145725_08886141-ed95-4a8e-8d6d-b75eaadce638.mp4" type="video/mp4" />
          </video>
        </div>

          <div className="max-w-screen-xl mx-auto relative z-10">
            <div className="mb-12 sm:mb-20 lg:mb-24">
              <span className="text-[9px] sm:text-[10px] font-bold text-emerald-500 uppercase tracking-[0.4em] sm:tracking-[0.5em] mb-6 sm:mb-8 lg:mb-10 block">{t('The Process')}</span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium text-white tracking-tight max-w-3xl leading-[1.1]">{t('Set it once. Dominate forever.')}</h2>
            </div>
            <div className="grid md:grid-cols-4 gap-12 lg:gap-8">
              {[
                { step: '01', title: 'Connect', desc: 'Link your Binance Square account via API keys securely stored in our Vault.' },
                { step: '02', title: 'Configure', desc: 'Select your AI persona, trading style, and preferred posting frequency.' },
                { step: '03', title: 'Analyze', desc: 'Sato scans the market, generating charts and insights matching your persona.' },
                { step: '04', title: 'Publish', desc: 'Content is automatically formatted and published to your Binance Square feed.' }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="relative p-6 rounded-sm bg-zinc-950/40 border border-white/5 backdrop-blur-sm"
                >
                  <div className="text-4xl font-serif text-white/10 mb-6">{item.step}</div>
                  <h3 className="text-lg font-serif font-medium text-white mb-4">{t(item.title)}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed font-light">{t(item.desc)}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      {/* AI Citability FAQ Section */}
      <section id="faq" className="relative py-16 lg:py-24 px-6 lg:px-10 border-t border-white/5 bg-[#0A0A0A]">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <span className="text-[9px] sm:text-[10px] font-bold text-emerald-500 uppercase tracking-[0.4em] sm:tracking-[0.5em] mb-6 sm:mb-8 block">{t('FAQ')}</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-white tracking-tight mb-8">What is Sato?</h2>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-light mb-12">
                Sato is an automated publishing engine designed specifically for crypto KOLs to distribute real-time market insights on Binance Square. By leveraging generative AI and live trading signals, it acts as a continuous digital twin that organically grows your crypto following without any manual daily effort.
              </p>

              <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Core Definitions</h3>
              <dl className="space-y-6">
                <div>
                  <dt className="text-base font-medium text-white mb-2">Automated Publishing Engine</dt>
                  <dd className="text-sm text-zinc-400 leading-relaxed font-light">A software system that autonomously schedules, formats, and publishes content to social platforms without requiring human intervention for each post.</dd>
                </div>
                <div>
                  <dt className="text-base font-medium text-white mb-2">Crypto KOL (Key Opinion Leader)</dt>
                  <dd className="text-sm text-zinc-400 leading-relaxed font-light">An influential figure in the cryptocurrency industry whose market analyses and opinions significantly impact audience trading behavior.</dd>
                </div>
                <div>
                  <dt className="text-base font-medium text-white mb-2">AI Persona Mapping</dt>
                  <dd className="text-sm text-zinc-400 leading-relaxed font-light">The process of configuring a language model to perfectly mimic an individual's unique tone, vocabulary, and analytical style.</dd>
                </div>
              </dl>
            </div>
            <div className="lg:mt-16 bg-zinc-950/40 border border-white/5 rounded-sm p-8 backdrop-blur-sm">
              <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-10 text-center">{t('Supported Ecosystems')}</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-70">
                <div className="flex flex-col items-center gap-4 hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                    <Database className="w-5 h-5 text-zinc-300" />
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold text-center">Binance API</span>
                </div>
                <div className="flex flex-col items-center gap-4 hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                    <Cpu className="w-5 h-5 text-zinc-300" />
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold text-center">OpenAI GPT-5.1</span>
                </div>
                <div className="flex flex-col items-center gap-4 hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                    <Sparkles className="w-5 h-5 text-zinc-300" />
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold text-center">Gemini 3 Pro</span>
                </div>
                <div className="flex flex-col items-center gap-4 hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                    <BrainCircuit className="w-5 h-5 text-zinc-300" />
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold text-center">Llama 3.3</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing - Gold Coins & Green Lighting Background */}
      <section id="pricing" className="py-16 sm:py-24 lg:py-48 px-6 lg:px-10 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-50 mix-blend-screen flex items-center justify-center">
          <div className="absolute inset-0 bg-[#0A0A0A]/40 z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-transparent to-[#0A0A0A] z-10" />
          <video 
            autoPlay={true} 
            loop={true} 
            muted={true} 
            playsInline={true} 
            className="absolute inset-0 w-full h-full object-cover origin-center scale-[2] lg:scale-110 lg:origin-right blur-[2px]"
          >
            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_094440_a3592600-bd1e-49e5-9bce-a73662061d83.mp4" type="video/mp4" />
          </video>
        </div>
        
        <div className="max-w-screen-xl mx-auto relative z-10">
          <div className="mb-12 sm:mb-20 lg:mb-32">
            <span className="text-[9px] sm:text-[10px] font-bold text-emerald-500 uppercase tracking-[0.4em] sm:tracking-[0.5em] mb-6 sm:mb-8 lg:mb-10 block">{t('Investment')}</span>
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-serif font-medium text-white tracking-tight">{t('Pricing.')}</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
            {/* Free */}
            <motion.div {...fadeIn} className="flex flex-col border border-white/10 rounded-sm p-6 sm:p-10 lg:p-14 bg-zinc-950/80 backdrop-blur-xl">
              <h3 className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400 mb-6 lg:mb-10">{t('Free')}</h3>
              <div className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium text-white mb-8 lg:mb-14">$0</div>
              <ul className="space-y-4 lg:space-y-6 mb-10 lg:mb-20 flex-1">
                <li className="text-[13px] sm:text-sm text-zinc-400 flex items-center gap-3 md:gap-4"><Check className="w-3.5 h-3.5 text-zinc-600 shrink-0" /> {t('24h minimum interval')}</li>
                <li className="text-[13px] sm:text-sm text-zinc-400 flex items-center gap-3 md:gap-4"><Check className="w-3.5 h-3.5 text-zinc-600 shrink-0" /> {t('Basic AI Personas')}</li>
              </ul>
              <button onClick={onGetStarted} className="w-full py-4 lg:py-5 rounded-sm border border-white/10 text-[10px] sm:text-[11px] text-zinc-300 font-bold hover:bg-white/5 transition-all uppercase tracking-widest">
                {t('Start Free')}
              </button>
            </motion.div>

            {/* Pro */}
            <motion.div {...fadeIn} transition={{ delay: 0.1 }} className="flex flex-col border border-zinc-100/20 rounded-sm p-6 sm:p-10 lg:p-14 bg-zinc-900 shadow-2xl relative lg:transform lg:-translate-y-4 backdrop-blur-xl">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-zinc-100 text-[#0A0A0A] text-[8px] sm:text-[9px] font-bold px-4 sm:px-5 py-2 rounded-none uppercase tracking-[0.25em] sm:tracking-[0.3em] whitespace-nowrap shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                {t('Most Popular')}
              </div>
              <h3 className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-100 mb-6 lg:mb-10">{t('Pro')}</h3>
              <div className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium text-zinc-100 mb-8 lg:mb-14">$15</div>
              <ul className="space-y-4 lg:space-y-6 mb-10 lg:mb-20 flex-1">
                <li className="text-[13px] sm:text-sm text-zinc-300 flex items-center gap-3 md:gap-4 font-normal"><Check className="w-3.5 h-3.5 text-zinc-100 shrink-0" /> {t('30m minimum interval')}</li>
                <li className="text-[13px] sm:text-sm text-zinc-300 flex items-center gap-3 md:gap-4 font-normal"><Check className="w-3.5 h-3.5 text-zinc-100 shrink-0" /> {t('GPT-5.1 & Gemini 2/3')}</li>
                <li className="text-[13px] sm:text-sm text-zinc-300 flex items-center gap-3 md:gap-4 font-normal"><Check className="w-3.5 h-3.5 text-zinc-100 shrink-0" /> {t('All Specialized Personas')}</li>
                <li className="text-[13px] sm:text-sm text-zinc-300 flex items-center gap-3 md:gap-4 font-normal"><Check className="w-3.5 h-3.5 text-zinc-100 shrink-0" /> {t('Dynamic 48h Charts')}</li>
                <li className="text-[13px] sm:text-sm text-zinc-300 flex items-center gap-3 md:gap-4 font-normal"><Check className="w-3.5 h-3.5 text-zinc-100 shrink-0" /> {t('No watermark')}</li>
              </ul>
              <button onClick={onGetStarted} className="w-full py-4 lg:py-5 rounded-sm bg-zinc-100 text-[#0A0A0A] text-[10px] sm:text-[11px] font-bold hover:bg-white transition-all uppercase tracking-widest shadow-sm">
                {t('Upgrade to Pro')}
              </button>
            </motion.div>

            {/* Whale */}
            <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="flex flex-col border border-emerald-500/30 rounded-sm p-6 sm:p-10 lg:p-14 bg-zinc-950/80 backdrop-blur-xl md:col-span-2 lg:col-span-1 shadow-[0_0_40px_rgba(16,185,129,0.05)]">
              <h3 className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em] text-emerald-400 mb-6 lg:mb-10">{t('Whale')}</h3>
              <div className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium text-white mb-8 lg:mb-14">$49</div>
              <ul className="space-y-4 lg:space-y-6 mb-10 lg:mb-20 flex-1">
                <li className="text-[13px] sm:text-sm text-zinc-200 flex items-center gap-3 md:gap-4"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> {t('5m blazing-fast intervals')}</li>
                <li className="text-[13px] sm:text-sm text-zinc-200 flex items-center gap-3 md:gap-4"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> {t('GPT-5.1 & Gemini 2/3')}</li>
                <li className="text-[13px] sm:text-sm text-zinc-200 flex items-center gap-3 md:gap-4"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> {t('Custom AI Prompts')}</li>
                <li className="text-[13px] sm:text-sm text-zinc-200 flex items-center gap-3 md:gap-4"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> {t('Priority Posting Queue')}</li>
              </ul>
              <button onClick={onGetStarted} className="w-full py-4 lg:py-5 rounded-sm bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 text-[10px] sm:text-[11px] font-bold hover:bg-emerald-500 hover:text-black transition-all uppercase tracking-widest">
                {t('Become a Whale')}
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer - Vertical Green Strips Background */}
      <footer className="py-16 lg:py-32 px-6 lg:px-10 border-t border-emerald-900/40 relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20 mix-blend-screen bg-[#0A0A0A]">
          <HlsVideo 
            src="https://stream.mux.com/tLkHO1qZoaaQOUeVWo8hEBeGQfySP02EPS02BmnNFyXys.m3u8"
            autoPlay={true} 
            loop={true} 
            muted={true} 
            playsInline={true} 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A] z-10" />
        </div>
        
        <div className="max-w-screen-xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-y-12 sm:gap-y-16 gap-x-8 lg:gap-x-12 xl:gap-x-24 mb-16 sm:mb-24 lg:mb-32">
            <div className="md:col-span-2 lg:col-span-6 min-w-0">
              <div className="flex items-center gap-3 mb-6 sm:mb-8 lg:mb-12">
                <div className="w-8 h-8 flex items-center justify-center text-emerald-400">
                  <Feather className="w-5 h-5" strokeWidth={2} />
                </div>
                <span className="font-serif text-xl tracking-tight font-medium text-white">Sato</span>
              </div>
              <p className="text-base sm:text-lg lg:text-xl text-zinc-500 leading-relaxed font-light max-w-md italic font-serif">
                {t('The market never sleeps. Neither should your content. Join the KOLs already using Sato to grow their presence automatically.')}
              </p>
            </div>
            <div className="lg:col-span-3 min-w-0">
              <h4 className="text-[9px] sm:text-[10px] font-bold text-zinc-600 uppercase tracking-[0.4em] sm:tracking-[0.5em] mb-6 sm:mb-8 lg:mb-12">{t('Product')}</h4>
              <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8 text-[10px] sm:text-[11px] font-bold text-emerald-500/70 uppercase tracking-widest">
                <a href="#features" className="hover:text-emerald-400 transition-colors">{t('Features')}</a>
                <a href="#pricing" className="hover:text-emerald-400 transition-colors">{t('Pricing')}</a>
              </div>
            </div>
            <div className="lg:col-span-3 min-w-0">
              <h4 className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.5em] mb-8 lg:mb-12">{t('Company')}</h4>
              <div className="flex flex-col gap-6 lg:gap-8 text-[11px] font-bold text-emerald-500/70 uppercase tracking-widest">
                <button onClick={() => onLegalClick('about')} className="text-left w-full hover:text-emerald-400 transition-colors uppercase">{t('About')}</button>
                <button onClick={() => onLegalClick('privacy')} className="text-left w-full hover:text-emerald-400 transition-colors uppercase">{t('Privacy')}</button>
                <button onClick={() => onLegalClick('terms')} className="text-left w-full hover:text-emerald-400 transition-colors uppercase">{t('Terms')}</button>
                <button onClick={() => onLegalClick('contact')} className="text-left w-full hover:text-emerald-400 transition-colors uppercase">{t('Contact')}</button>
              </div>
            </div>
          </div>
          <div className="pt-12 lg:pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 lg:gap-12">
            <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-[0.5em]">© 2026 SATO RESEARCH LAB</span>
            <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-[0.5em] text-center">{t('Not Financial Advice. Use at your own risk.')}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
