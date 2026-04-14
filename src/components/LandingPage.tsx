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
  ChevronRight
} from 'lucide-react';

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
    <div className="min-h-screen bg-[#FBFBF9] text-[#1A1918] font-sans selection:bg-[#EAE5DF] overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-[#EAE5DF] bg-[#FBFBF9]/90 backdrop-blur-md">
        <div className="max-w-screen-xl mx-auto px-10 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#1A1918] rounded-sm flex items-center justify-center text-white">
              <Feather className="w-4 h-4" strokeWidth={1.25} />
            </div>
            <span className="font-serif text-xl tracking-tight font-medium">Sato</span>
          </div>

          <div className="hidden lg:flex items-center gap-12">
            <a href="#features" className="text-[10px] font-bold text-[#7A7571] hover:text-[#1A1918] transition-colors tracking-[0.2em] uppercase">{t('Why Sato?')}</a>
            <a href="#how-it-works" className="text-[10px] font-bold text-[#7A7571] hover:text-[#1A1918] transition-colors tracking-[0.2em] uppercase">{t('How It Works')}</a>
            <a href="#pricing" className="text-[10px] font-bold text-[#7A7571] hover:text-[#1A1918] transition-colors tracking-[0.2em] uppercase">{t('Pricing')}</a>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Globe className="w-3 h-3 text-[#7A7571]" />
              <select 
                value={i18n.language}
                onChange={(e) => i18n.changeLanguage(e.target.value)}
                className="bg-transparent text-[10px] text-[#7A7571] font-bold focus:outline-none cursor-pointer hover:text-[#1A1918] transition-colors uppercase tracking-[0.15em]"
              >
                <option value="en">EN</option>
                <option value="zh">ZH</option>
              </select>
            </div>
            <button 
              onClick={onLogin}
              className="text-[11px] font-bold text-[#7A7571] hover:text-[#1A1918] transition-colors uppercase tracking-widest"
            >
              {t('Login')}
            </button>
            <button 
              onClick={onGetStarted}
              className="bg-[#1A1918] text-white text-[11px] font-bold px-6 py-2.5 rounded-sm hover:bg-black transition-all uppercase tracking-widest shadow-[2px_2px_0px_rgba(0,0,0,0.1)]"
            >
              {t('Get Started')}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 lg:pt-56 pb-24 lg:pb-40 px-6 lg:px-10 overflow-hidden">
        {/* Subtle Grid Pattern - Paper feel */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#1A1918 0.5px, transparent 0.5px), linear-gradient(90deg, #1A1918 0.5px, transparent 0.5px)', backgroundSize: '32px 32px' }} />
        
        <div className="max-w-screen-xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#F3BA2F]/5 border border-[#F3BA2F]/20 text-[#1A1918] text-[9px] font-bold uppercase tracking-[0.25em] mb-12">
                <Zap className="w-3 h-3 fill-[#F3BA2F] text-[#F3BA2F]" />
                {t('Now with Llama 3.3 Intelligence')}
              </div>
              <h1 className="text-7xl md:text-8xl font-serif font-medium leading-[0.9] mb-12 tracking-tighter text-[#1A1918]">
                {t('Dominate Binance Square While You Sleep.')}
              </h1>
              <p className="text-xl md:text-2xl text-[#7A7571] max-w-xl mb-16 leading-relaxed font-light tracking-tight border-l border-[#EAE5DF] pl-8">
                {t('The most advanced, human-like automated publishing engine built specifically for crypto KOLs. Real-time signals, dynamic charts, and global macro analysis.')}
              </p>
              <div className="flex flex-col sm:flex-row items-center lg:items-start gap-10">
                <button 
                  onClick={onGetStarted}
                  className="bg-[#1A1918] text-white font-bold px-10 py-5 rounded-sm text-lg hover:bg-black transition-all flex items-center gap-4 group shadow-[4px_4px_0px_rgba(0,0,0,0.05)]"
                >
                  {t('Start Automating for Free')}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="flex items-center gap-6 py-5">
                  <div className="flex -space-x-3">
                    {[
                      "https://picsum.photos/seed/kol1/100/100",
                      "https://picsum.photos/seed/kol2/100/100",
                      "https://picsum.photos/seed/kol3/100/100",
                      "https://picsum.photos/seed/kol4/100/100"
                    ].map((src, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + (i * 0.1) }}
                        className="w-11 h-11 rounded-sm border-2 border-[#FBFBF9] bg-white shadow-sm overflow-hidden"
                      >
                        <img 
                          src={src} 
                          alt={`KOL ${i + 1}`} 
                          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                          referrerPolicy="no-referrer"
                        />
                      </motion.div>
                    ))}
                    <div className="w-11 h-11 rounded-sm border-2 border-[#FBFBF9] bg-[#1A1918] flex items-center justify-center text-[10px] font-bold text-white shadow-sm z-10">
                      +500
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-[#1A1918] tracking-[0.2em] uppercase mb-0.5">
                      {t('Trusted by the Elite')}
                    </span>
                    <span className="text-[9px] font-medium text-[#7A7571] uppercase tracking-[0.1em]">
                      {t('Top Binance Square Creators')}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="relative hidden lg:block"
            >
              {/* Main Post Preview Card - Paper Sheet Style */}
              <div className="bg-white border border-[#EAE5DF] rounded-sm p-0 shadow-[1px_1px_0px_rgba(0,0,0,0.02),10px_10px_40px_-10px_rgba(0,0,0,0.05)] relative z-10 overflow-hidden">
                {/* Window Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-[#EAE5DF] bg-[#FBFBF9]">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 border border-[#EAE5DF] rounded-none" />
                    <div className="w-2 h-2 border border-[#EAE5DF] rounded-none" />
                    <div className="w-2 h-2 border border-[#EAE5DF] rounded-none" />
                  </div>
                  <div className="text-[9px] font-bold text-[#7A7571] uppercase tracking-[0.3em]">{t('Live Preview')}</div>
                  <div className="w-10" />
                </div>
                
                <div className="p-10">
                  {/* Post Content Simulation */}
                  <div className="flex items-start gap-6 mb-10">
                    <div className="w-12 h-12 rounded-sm bg-[#1A1918] flex items-center justify-center text-white shrink-0 shadow-md">
                      <Feather className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-bold text-[#1A1918]">Sato Analyst</span>
                        <span className="text-[10px] font-medium text-[#7A7571]">@sato_ai • 2m</span>
                      </div>
                      <p className="text-base text-[#1A1918] leading-relaxed mb-6 font-light">
                        BTC/USDT testing critical resistance at $98.4k. 48h momentum suggests a breakout is imminent. Volume profile shows strong accumulation. 🚀
                      </p>
                      
                      {/* Simulated Chart */}
                      <div className="aspect-[16/9] w-full bg-[#FBFBF9] rounded-sm border border-[#EAE5DF] relative overflow-hidden group">
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200">
                          <path 
                            d="M0,150 L40,140 L80,160 L120,130 L160,145 L200,110 L240,120 L280,80 L320,90 L360,50 L400,60" 
                            fill="none" 
                            stroke="#1A1918" 
                            strokeWidth="1"
                            strokeDasharray="4 4"
                            className="opacity-10"
                          />
                          <motion.path 
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                            d="M0,150 L40,140 L80,160 L120,130 L160,145 L200,110 L240,120 L280,80 L320,90 L360,50 L400,60" 
                            fill="none" 
                            stroke="#1A1918" 
                            strokeWidth="2"
                          />
                        </svg>
                        <div className="absolute top-4 right-4 bg-white border border-[#EAE5DF] rounded-sm px-2 py-1 text-[9px] font-bold text-[#1A1918] shadow-sm">
                          BTC +4.2%
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Bar */}
                  <div className="flex items-center justify-between pt-8 border-t border-[#EAE5DF]">
                    <div className="flex gap-8">
                      <div className="h-1 w-16 bg-[#EAE5DF] rounded-none" />
                      <div className="h-1 w-16 bg-[#EAE5DF] rounded-none" />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      <span className="text-[9px] font-bold text-[#7A7571] uppercase tracking-[0.3em]">{t('Published')}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating "Thinking" Card - Paper Note Style */}
              <motion.div 
                initial={{ opacity: 0, y: 20, x: -20 }}
                animate={{ opacity: 1, y: 0, x: -20 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="absolute -bottom-16 -left-16 bg-[#FBFBF9] border border-[#EAE5DF] rounded-sm p-8 shadow-[15px_15px_60px_-15px_rgba(0,0,0,0.1)] z-20 max-w-[280px]"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-sm bg-[#1A1918] flex items-center justify-center">
                    <Brain className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-[10px] font-bold text-[#1A1918] uppercase tracking-widest">{t('AI Engine')}</span>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-[9px] font-bold text-[#7A7571] uppercase tracking-wider">
                    <span>{t('Analyzing Signal')}</span>
                    <span className="text-[#1A1918]">100%</span>
                  </div>
                  <div className="h-[1px] w-full bg-[#EAE5DF] relative">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                      className="h-full bg-[#1A1918]" 
                    />
                  </div>
                  <p className="text-[11px] text-[#7A7571] leading-relaxed italic font-serif">
                    "Generating unique technical perspective for BTC/USDT..."
                  </p>
                </div>
              </motion.div>

              {/* Decorative Background Glow */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#F3BA2F]/5 rounded-full blur-[100px]" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy Section - Editorial Layout */}
      <section className="py-24 lg:py-56 px-6 lg:px-10 border-t border-[#EAE5DF]">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 xl:gap-24 items-start">
            <div className="lg:col-span-5 min-w-0">
              <span className="text-[10px] font-bold text-[#7A7571] uppercase tracking-[0.5em] mb-8 lg:mb-12 block">{t('The Philosophy')}</span>
              <h2 className="text-5xl md:text-7xl font-serif font-medium text-[#1A1918] mb-10 lg:mb-14 leading-[1] tracking-tight">
                {t('Less effort, more impact.')}
              </h2>
              <p className="text-lg lg:text-xl text-[#7A7571] leading-relaxed font-light mb-10 lg:mb-14 border-l-2 border-[#1A1918] pl-6 lg:pl-10">
                {t('We believe that your digital presence should be an extension of your intelligence, not a drain on your time. Sato was built to bridge the gap between market speed and human capacity.')}
              </p>
            </div>
            <div className="lg:col-span-7 min-w-0 grid md:grid-cols-2 gap-px bg-[#EAE5DF] border border-[#EAE5DF] rounded-sm overflow-hidden shadow-sm">
              <div className="bg-white p-8 lg:p-12 xl:p-14">
                <h3 className="text-[10px] font-bold text-[#7A7571] uppercase tracking-[0.4em] mb-8 lg:mb-10">{t('The Old Way')}</h3>
                <div className="space-y-6 lg:space-y-8">
                  {['Staring at charts all day', 'Struggling to translate', 'Content ideas depletion', 'Repetitive narrative'].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 lg:gap-5 text-[#7A7571]/40">
                      <Minus className="w-4 h-4 shrink-0" />
                      <span className="text-sm font-light tracking-wide italic">{t(item)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white p-8 lg:p-12 xl:p-14">
                <h3 className="text-[10px] font-bold text-[#1A1918] uppercase tracking-[0.4em] mb-8 lg:mb-10">{t('The Sato Way')}</h3>
                <div className="space-y-6 lg:space-y-8">
                  {['24/7 Continuous Presence', 'Auto EN ↔ CN Translation', 'Llama 3.3 Intelligence', 'Zero Manual Friction'].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 lg:gap-5 text-[#1A1918]">
                      <Check className="w-4 h-4 text-[#F3BA2F] shrink-0" />
                      <span className="text-sm font-medium tracking-wide uppercase">{t(item)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Matrix - Grid Style */}
      <section id="features" className="py-24 lg:py-56 px-6 lg:px-10 border-t border-[#EAE5DF] bg-[#F4F3F0]/20">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#EAE5DF] border border-[#EAE5DF]">
            <motion.div {...fadeIn} className="bg-[#FBFBF9] p-10 lg:p-16">
              <Brain className="w-7 h-7 text-[#1A1918] mb-8 lg:mb-12" />
              <h3 className="text-xl font-serif font-medium text-[#1A1918] mb-4 lg:mb-6">{t('12+ AI Personas')}</h3>
              <p className="text-sm text-[#7A7571] leading-relaxed font-light">
                {t('From Crypto Degen to Macro Economist. Your feed, your personality, perfectly replicated.')}
              </p>
            </motion.div>
            <motion.div {...fadeIn} transition={{ delay: 0.1 }} className="bg-[#FBFBF9] p-10 lg:p-16">
              <BarChart3 className="w-7 h-7 text-[#1A1918] mb-8 lg:mb-12" />
              <h3 className="text-xl font-serif font-medium text-[#1A1918] mb-4 lg:mb-6">{t('Dynamic 48h Charts')}</h3>
              <p className="text-sm text-[#7A7571] leading-relaxed font-light">
                {t('Real-time, custom candlestick charts for every signal, maximizing your algorithmic reach.')}
              </p>
            </motion.div>
            <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="bg-[#FBFBF9] p-10 lg:p-16">
              <Shield className="w-7 h-7 text-[#1A1918] mb-8 lg:mb-12" />
              <h3 className="text-xl font-serif font-medium text-[#1A1918] mb-4 lg:mb-6">{t('Vault Security')}</h3>
              <p className="text-sm text-[#7A7571] leading-relaxed font-light">
                {t('Your keys are encrypted at the database level with Supabase Vault. Bank-grade protection.')}
              </p>
            </motion.div>
            <motion.div {...fadeIn} transition={{ delay: 0.3 }} className="bg-[#FBFBF9] p-10 lg:p-16">
              <Bot className="w-7 h-7 text-[#1A1918] mb-8 lg:mb-12" />
              <h3 className="text-xl font-serif font-medium text-[#1A1918] mb-4 lg:mb-6">{t('Anti-Bot Clause')}</h3>
              <p className="text-sm text-[#7A7571] leading-relaxed font-light">
                {t('Intelligent memory ensures you never repeat the same coin or setup type too frequently.')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 lg:py-56 px-6 lg:px-10 border-t border-[#EAE5DF] bg-white">
        <div className="max-w-screen-xl mx-auto">
          <div className="mb-20 lg:mb-32">
            <span className="text-[10px] font-bold text-[#7A7571] uppercase tracking-[0.5em] mb-8 lg:mb-10 block">{t('The Process')}</span>
            <h2 className="text-5xl lg:text-7xl font-serif font-medium text-[#1A1918] tracking-tight max-w-3xl">{t('Set it once. Dominate forever.')}</h2>
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
                className="relative"
              >
                <div className="text-6xl font-serif text-[#EAE5DF] mb-6">{item.step}</div>
                <h3 className="text-xl font-serif font-medium text-[#1A1918] mb-4">{t(item.title)}</h3>
                <p className="text-sm text-[#7A7571] leading-relaxed font-light">{t(item.desc)}</p>
                {i < 3 && (
                  <div className="hidden md:block absolute top-8 right-0 w-full h-[1px] bg-[#EAE5DF] -z-10 translate-x-1/2" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing - Stationery Style */}
      <section id="pricing" className="py-24 lg:py-56 px-6 lg:px-10 border-t border-[#EAE5DF]">
        <div className="max-w-screen-xl mx-auto">
          <div className="mb-20 lg:mb-32 text-center">
            <span className="text-[10px] font-bold text-[#7A7571] uppercase tracking-[0.5em] mb-8 lg:mb-10 block">{t('Investment')}</span>
            <h2 className="text-5xl lg:text-7xl font-serif font-medium text-[#1A1918] tracking-tight">{t('Simple, transparent pricing.')}</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16">
            {/* Free */}
            <motion.div {...fadeIn} className="flex flex-col border border-[#EAE5DF] rounded-sm p-10 lg:p-14 bg-white shadow-sm">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#7A7571] mb-8 lg:mb-10">{t('Free')}</h3>
              <div className="text-5xl lg:text-6xl font-serif font-medium text-[#1A1918] mb-10 lg:mb-14">$0</div>
              <ul className="space-y-4 lg:space-y-6 mb-12 lg:mb-20 flex-1">
                <li className="text-sm text-[#7A7571] flex items-center gap-4"><Check className="w-3.5 h-3.5" /> {t('120m minimum interval')}</li>
                <li className="text-sm text-[#7A7571] flex items-center gap-4"><Check className="w-3.5 h-3.5" /> {t('Basic AI Personas')}</li>
              </ul>
              <button onClick={onGetStarted} className="w-full py-4 lg:py-5 rounded-sm border border-[#1A1918] text-[11px] font-bold hover:bg-[#1A1918] hover:text-white transition-all uppercase tracking-widest">
                {t('Start Free')}
              </button>
            </motion.div>

            {/* Pro */}
            <motion.div {...fadeIn} transition={{ delay: 0.1 }} className="flex flex-col border-2 border-[#1A1918] rounded-sm p-10 lg:p-14 bg-white shadow-[20px_20px_80px_-20px_rgba(0,0,0,0.1)] relative lg:transform lg:-translate-y-8">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#1A1918] text-white text-[9px] font-bold px-5 py-2 rounded-none uppercase tracking-[0.3em] whitespace-nowrap">
                {t('Most Popular')}
              </div>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#1A1918] mb-8 lg:mb-10">{t('Pro')}</h3>
              <div className="text-5xl lg:text-6xl font-serif font-medium text-[#1A1918] mb-10 lg:mb-14">$15</div>
              <ul className="space-y-4 lg:space-y-6 mb-12 lg:mb-20 flex-1">
                <li className="text-sm text-[#1A1918] flex items-center gap-4 font-bold"><Check className="w-3.5 h-3.5 text-[#F3BA2F]" /> {t('30m minimum interval')}</li>
                <li className="text-sm text-[#1A1918] flex items-center gap-4 font-bold"><Check className="w-3.5 h-3.5 text-[#F3BA2F]" /> {t('All Specialized Personas')}</li>
                <li className="text-sm text-[#1A1918] flex items-center gap-4 font-bold"><Check className="w-3.5 h-3.5 text-[#F3BA2F]" /> {t('Dynamic 48h Charts')}</li>
                <li className="text-sm text-[#1A1918] flex items-center gap-4 font-bold"><Check className="w-3.5 h-3.5 text-[#F3BA2F]" /> {t('No watermark')}</li>
                <li className="text-sm text-[#1A1918] flex items-center gap-4 font-bold"><Check className="w-3.5 h-3.5 text-[#F3BA2F]" /> {t('Auto-cycle personas')}</li>
              </ul>
              <button onClick={onGetStarted} className="w-full py-4 lg:py-5 rounded-sm bg-[#1A1918] text-white text-[11px] font-bold hover:bg-black transition-all uppercase tracking-widest shadow-lg">
                {t('Upgrade to Pro')}
              </button>
            </motion.div>

            {/* Whale */}
            <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="flex flex-col border border-[#EAE5DF] rounded-sm p-10 lg:p-14 bg-white shadow-sm md:col-span-2 lg:col-span-1">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#7A7571] mb-8 lg:mb-10">{t('Whale')}</h3>
              <div className="text-5xl lg:text-6xl font-serif font-medium text-[#1A1918] mb-10 lg:mb-14">$49</div>
              <ul className="space-y-4 lg:space-y-6 mb-12 lg:mb-20 flex-1">
                <li className="text-sm text-[#7A7571] flex items-center gap-4"><Check className="w-3.5 h-3.5" /> {t('5m blazing-fast intervals')}</li>
                <li className="text-sm text-[#7A7571] flex items-center gap-4"><Check className="w-3.5 h-3.5" /> {t('Custom AI Prompts')}</li>
                <li className="text-sm text-[#7A7571] flex items-center gap-4"><Check className="w-3.5 h-3.5" /> {t('Priority Posting Queue')}</li>
                <li className="text-sm text-[#7A7571] flex items-center gap-4"><Check className="w-3.5 h-3.5" /> {t('No watermark')}</li>
                <li className="text-sm text-[#7A7571] flex items-center gap-4"><Check className="w-3.5 h-3.5" /> {t('Auto-cycle personas')}</li>
              </ul>
              <button onClick={onGetStarted} className="w-full py-4 lg:py-5 rounded-sm border border-[#1A1918] text-[11px] font-bold hover:bg-[#1A1918] hover:text-white transition-all uppercase tracking-widest">
                {t('Become a Whale')}
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 lg:py-48 px-6 lg:px-10 border-t border-[#EAE5DF]">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-y-16 gap-x-8 lg:gap-x-12 xl:gap-x-24 mb-24 lg:mb-40">
            <div className="md:col-span-2 lg:col-span-6 min-w-0">
              <div className="flex items-center gap-3 mb-8 lg:mb-12">
                <div className="w-8 h-8 bg-[#1A1918] rounded-sm flex items-center justify-center text-white">
                  <Feather className="w-4 h-4" strokeWidth={3} />
                </div>
                <span className="font-serif text-xl tracking-tight font-medium">Sato</span>
              </div>
              <p className="text-lg lg:text-xl text-[#7A7571] leading-relaxed font-light max-w-md italic font-serif">
                {t('The market never sleeps. Neither should your content. Join the KOLs already using Sato to grow their presence automatically.')}
              </p>
            </div>
            <div className="lg:col-span-3 min-w-0">
              <h4 className="text-[10px] font-bold text-[#1A1918]/20 uppercase tracking-[0.5em] mb-8 lg:mb-12">{t('Product')}</h4>
              <div className="flex flex-col gap-6 lg:gap-8 text-[11px] font-bold text-[#7A7571] uppercase tracking-widest">
                <a href="#features" className="hover:text-[#1A1918] transition-colors">{t('Features')}</a>
                <a href="#pricing" className="hover:text-[#1A1918] transition-colors">{t('Pricing')}</a>
              </div>
            </div>
            <div className="lg:col-span-3 min-w-0">
              <h4 className="text-[10px] font-bold text-[#1A1918]/20 uppercase tracking-[0.5em] mb-8 lg:mb-12">{t('Company')}</h4>
              <div className="flex flex-col gap-6 lg:gap-8 text-[11px] font-bold text-[#7A7571] uppercase tracking-widest">
                <button onClick={() => onLegalClick('about')} className="text-left w-full hover:text-[#1A1918] transition-colors uppercase">{t('About')}</button>
                <button onClick={() => onLegalClick('privacy')} className="text-left w-full hover:text-[#1A1918] transition-colors uppercase">{t('Privacy')}</button>
                <button onClick={() => onLegalClick('terms')} className="text-left w-full hover:text-[#1A1918] transition-colors uppercase">{t('Terms')}</button>
                <button onClick={() => onLegalClick('contact')} className="text-left w-full hover:text-[#1A1918] transition-colors uppercase">{t('Contact')}</button>
              </div>
            </div>
          </div>
          <div className="pt-12 lg:pt-16 border-t border-[#EAE5DF] flex flex-col md:flex-row justify-between items-center gap-8 lg:gap-12">
            <span className="text-[9px] font-bold text-[#7A7571]/40 uppercase tracking-[0.5em]">© 2026 SATO RESEARCH LAB</span>
            <span className="text-[9px] font-bold text-[#7A7571]/40 uppercase tracking-[0.5em] text-center">{t('Not Financial Advice. Use at your own risk.')}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
