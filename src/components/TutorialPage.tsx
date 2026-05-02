import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Key, Database, Cpu, BrainCircuit, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface TutorialPageProps {
  onBack: () => void;
}

export default function TutorialPage({ onBack }: TutorialPageProps) {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-[#FBFBF9] text-[#2D2B2A] font-sans overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-[#EAE5DF] bg-[#FBFBF9]/80 backdrop-blur-xl">
        <div className="max-w-screen-xl mx-auto px-6 h-20 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-[10px] font-bold text-[#7A7571] hover:text-[#2D2B2A] transition-colors uppercase tracking-[0.2em]"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('Back')}
          </button>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-6 lg:px-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mb-16">
            <span className="text-[10px] font-bold text-[#7A7571] uppercase tracking-[0.4em] mb-6 block">{t('Guide')}</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium leading-[1.1] mb-6 tracking-tight text-[#2D2B2A]">
              {t('How to Obtain Your API Keys')}
            </h1>
            <p className="text-base text-[#7A7571] leading-relaxed font-light">
              {t('Follow these step-by-step instructions to get the necessary API keys for Binance Square and your preferred AI language models.')}
            </p>
          </div>

          <div className="space-y-16">
            
            {/* Binance Square API Key */}
            <section className="bg-white border border-[#EAE5DF] rounded-2xl p-8 md:p-12 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
              <div className="flex flex-col md:flex-row gap-6 mb-8 items-start">
                <div className="w-12 h-12 rounded-sm bg-[#FBFBF9] border border-[#EAE5DF] flex items-center justify-center shrink-0">
                  <Database className="w-6 h-6 text-[#2D2B2A]" />
                </div>
                <div>
                  <h2 className="text-2xl font-serif font-medium mb-3 text-[#2D2B2A]">{t('Binance Square API Key')}</h2>
                  <p className="text-sm text-[#7A7571] leading-relaxed font-light">
                    {t('Sato needs a Binance Square API key to post on your behalf. Since this is only a posting API key, no security verification is involved.')}
                  </p>
                </div>
              </div>
              
              <ol className="list-decimal list-outside ml-4 space-y-4 text-[#2D2B2A] text-sm font-light">
                <li className="pl-2 leading-relaxed">
                  {t('Log in to Binance and navigate to the')} <strong>{t('Binance Square Creator Center')}</strong>.
                </li>
                <li className="pl-2 leading-relaxed">{t('Look for the API or Integration settings specific to Binance Square.')}</li>
                <li className="pl-2 leading-relaxed">{t('Generate a new API Key for posting.')}</li>
                <li className="pl-2 leading-relaxed">
                  {t('Copy the')} <strong>{t('API Key')}</strong>. {t('Save it in a secure place.')}
                </li>
              </ol>
            </section>

            {/* Groq API Key */}
            <section className="bg-white border border-[#EAE5DF] rounded-2xl p-8 md:p-12 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
              <div className="flex flex-col md:flex-row gap-6 mb-8 items-start">
                <div className="w-12 h-12 rounded-sm bg-[#FBFBF9] border border-[#EAE5DF] flex items-center justify-center shrink-0">
                  <Cpu className="w-6 h-6 text-[#2D2B2A]" />
                </div>
                <div>
                  <h2 className="text-2xl font-serif font-medium mb-3 text-[#2D2B2A]">{t('Groq (Llama 3) API Key')}</h2>
                  <p className="text-sm text-[#7A7571] leading-relaxed font-light">
                    {t('For lightning-fast generation using Llama 3 models on Groq.')}
                  </p>
                </div>
              </div>
              
              <ol className="list-decimal list-outside ml-4 space-y-4 text-[#2D2B2A] text-sm font-light">
                <li className="pl-2 leading-relaxed">
                  Go to the <a href="https://console.groq.com/keys" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Groq Console</a>.
                </li>
                <li className="pl-2 leading-relaxed">Log in or create a new account.</li>
                <li className="pl-2 leading-relaxed">Navigate to the <strong>"API Keys"</strong> section in the sidebar.</li>
                <li className="pl-2 leading-relaxed">Click the <strong>"Create API Key"</strong> button.</li>
                <li className="pl-2 leading-relaxed">Name your key (e.g., "Sato App").</li>
                <li className="pl-2 leading-relaxed">Copy the generated key (it starts with <code className="bg-[#FBFBF9] border border-[#EAE5DF] px-1 py-0.5 rounded text-xs">gsk_</code>). This is only shown once!</li>
              </ol>
            </section>

            {/* OpenAI API Key */}
            <section className="bg-white border border-[#EAE5DF] rounded-2xl p-8 md:p-12 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
              <div className="flex flex-col md:flex-row gap-6 mb-8 items-start">
                <div className="w-12 h-12 rounded-sm bg-[#FBFBF9] border border-[#EAE5DF] flex items-center justify-center shrink-0">
                  <BrainCircuit className="w-6 h-6 text-[#2D2B2A]" />
                </div>
                <div>
                  <h2 className="text-2xl font-serif font-medium mb-3 text-[#2D2B2A]">{t('OpenAI API Key (GPT-5.1)')}</h2>
                  <p className="text-sm text-[#7A7571] leading-relaxed font-light">
                    {t('Required if you plan to use OpenAI models for content generation.')}
                  </p>
                </div>
              </div>
              
              <ol className="list-decimal list-outside ml-4 space-y-4 text-[#2D2B2A] text-sm font-light">
                <li className="pl-2 leading-relaxed">
                  Sign in to the <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">OpenAI Platform</a>.
                </li>
                <li className="pl-2 leading-relaxed">Ensure you have added billing details to your account, or the API might not respond.</li>
                <li className="pl-2 leading-relaxed">Click <strong>"Create new secret key"</strong>.</li>
                <li className="pl-2 leading-relaxed">Give the key a name like "Sato GPT".</li>
                <li className="pl-2 leading-relaxed">Set permissions to "All" or restrict to Chat Completions as necessary.</li>
                <li className="pl-2 leading-relaxed">Copy the key starting with <code className="bg-[#FBFBF9] border border-[#EAE5DF] px-1 py-0.5 rounded text-xs">sk-</code>.</li>
              </ol>
            </section>

            {/* Gemini API Key */}
            <section className="bg-white border border-[#EAE5DF] rounded-2xl p-8 md:p-12 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
              <div className="flex flex-col md:flex-row gap-6 mb-8 items-start">
                <div className="w-12 h-12 rounded-sm bg-[#FBFBF9] border border-[#EAE5DF] flex items-center justify-center shrink-0">
                  <Sparkles className="w-6 h-6 text-[#2D2B2A]" />
                </div>
                <div>
                  <h2 className="text-2xl font-serif font-medium mb-3 text-[#2D2B2A]">{t('Google Gemini API Key')}</h2>
                  <p className="text-sm text-[#7A7571] leading-relaxed font-light">
                    {t('Required to access Gemini 2.x and 3.x generation models.')}
                  </p>
                </div>
              </div>
              
              <ol className="list-decimal list-outside ml-4 space-y-4 text-[#2D2B2A] text-sm font-light">
                <li className="pl-2 leading-relaxed">
                  Go to <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google AI Studio</a>.
                </li>
                <li className="pl-2 leading-relaxed">Log in with your Google account.</li>
                <li className="pl-2 leading-relaxed">Click on <strong>"Get API key"</strong> on the left navigation panel.</li>
                <li className="pl-2 leading-relaxed">Click <strong>"Create API key in new project"</strong> or use an existing project.</li>
                <li className="pl-2 leading-relaxed">Copy the generated API key.</li>
              </ol>
            </section>

          </div>
        </motion.div>
      </main>
    </div>
  );
}
