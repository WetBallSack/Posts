import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { supabase } from './lib/supabase';
import LandingPage from './components/LandingPage';
import LegalPages from './components/LegalPages';
import TutorialPage from './components/TutorialPage';
import { 
  SlidersHorizontal, 
  Layout, 
  History, 
  ShieldCheck, 
  Feather, 
  Timer, 
  Play,
  Pause,
  Save,
  Check,
  AlertTriangle,
  LogOut,
  Send,
  Sparkles,
  User,
  Trash2,
  CreditCard,
  Zap,
  Crown,
  Globe,
  X,
  Lock,
  Info,
  AlertCircle,
  ArrowRight
} from 'lucide-react';

type Tab = 'dashboard' | 'settings' | 'logs' | 'account' | 'subscription';

export default function App() {
  const { t, i18n } = useTranslation();
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [legalView, setLegalView] = useState<'about' | 'privacy' | 'terms' | 'contact' | null>(null);

  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [isActive, setIsActive] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isTestingPost, setIsTestingPost] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [isUpdatingEmail, setIsUpdatingEmail] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);

  // Modal State
  const [modal, setModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    onConfirm?: () => void;
    confirmText?: string;
  }>({
    isOpen: false,
    title: '',
    message: '',
    type: 'info'
  });

  const showAlert = (title: string, message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') => {
    setModal({ isOpen: true, title, message, type });
  };

  const showConfirm = (title: string, message: string, onConfirm: () => void, confirmText?: string) => {
    setModal({ isOpen: true, title, message, type: 'warning', onConfirm, confirmText });
  };
  
  const [config, setConfig] = useState({
    apiKey: '',
    groqApiKey: '',
    geminiApiKey: '',
    openaiApiKey: '',
    aiProvider: 'groq',
    persona: 'degen',
    interval: 1440,
    subscriptionTier: 'free',
    customPrompt: ''
  });
  const [hasSavedKey, setHasSavedKey] = useState(false);
  const [hasSavedGroqKey, setHasSavedGroqKey] = useState(false);
  const [hasSavedGeminiKey, setHasSavedGeminiKey] = useState(false);
  const [hasSavedOpenAIKey, setHasSavedOpenAIKey] = useState(false);
  
  const [logs, setLogs] = useState<any[]>([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [logsLimit, setLogsLimit] = useState(20);
  const [nextPostDate, setNextPostDate] = useState<Date | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<string>('--:--');
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!isActive || !nextPostDate) {
      setTimeRemaining('--:--');
      return;
    }

    const updateTimer = () => {
      const now = new Date().getTime();
      const target = nextPostDate.getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeRemaining('Processing...');
      } else {
        const h = Math.floor(diff / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeRemaining(h > 0 ? `${h}h ${m}m ${s}s` : `${m}m ${s}s`);
      }
    };

    updateTimer();
    const intervalId = setInterval(updateTimer, 1000);
    return () => clearInterval(intervalId);
  }, [isActive, nextPostDate]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchData();
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchData();
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchLogsOnly = async (limit: number) => {
    const { data: signalsLog, count, error: logsError } = await supabase
      .from('signals_log')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .limit(limit);
      
    if (logsError) {
      console.error("Error fetching logs:", logsError);
    } else if (signalsLog) {
      setLogs(signalsLog);
      if (count !== null) setTotalPosts(count);
    }
  };

  useEffect(() => {
    if (session) {
      fetchLogsOnly(logsLimit);
    }
  }, [logsLimit]);

  const fetchData = async () => {
    try {
      const { data: userConfig } = await supabase
        .from('user_configs')
        .select('*')
        .maybeSingle();
        
      if (userConfig) {
        setConfig(prev => ({
          ...prev,
          persona: userConfig.persona_style,
          interval: userConfig.post_interval_minutes,
          subscriptionTier: userConfig.subscription_tier || 'free',
          customPrompt: userConfig.custom_prompt || '',
          aiProvider: userConfig.ai_provider || 'groq',
          apiKey: '', // Clear input so it shows placeholder instead of actual key
          groqApiKey: '',
          geminiApiKey: '',
          openaiApiKey: ''
        }));
        setHasSavedKey(!!userConfig.binance_api_key_id);
        setHasSavedGroqKey(!!userConfig.groq_api_key_id);
        setHasSavedGeminiKey(!!userConfig.gemini_api_key_id);
        setHasSavedOpenAIKey(!!userConfig.openai_api_key_id);
        setIsActive(userConfig.is_active);
        if (userConfig.next_post_time) {
          setNextPostDate(new Date(userConfig.next_post_time));
        } else {
          setNextPostDate(null);
        }
      }

      await fetchLogsOnly(logsLimit);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthLoading(true);
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) {
        const { data, error: signUpError } = await supabase.auth.signUp({ email, password });
        if (signUpError) {
          showAlert(t('Error'), t('Login/Signup failed: ') + signUpError.message, 'error');
        } else if (data?.session === null) {
          showAlert(t('Success'), t('Registration successful! Please check your email to confirm your account.'), 'success');
        }
      }
    } catch (err: any) {
      showAlert(t('Error'), t('An unexpected error occurred: ') + err.message, 'error');
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      showAlert(t('Warning'), t('Please enter your email address first.'), 'warning');
      return;
    }
    setIsResettingPassword(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin,
      });
      if (error) throw error;
      showAlert(t('Success'), t('Password reset email sent! Please check your inbox.'), 'success');
    } catch (err: any) {
      showAlert(t('Error'), t('Error sending reset email: ') + err.message, 'error');
    } finally {
      setIsResettingPassword(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword) return;
    setIsUpdatingPassword(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      showAlert(t('Success'), t('Password updated successfully.'), 'success');
      setNewPassword('');
    } catch (err: any) {
      showAlert(t('Error'), t('Error updating password: ') + err.message, 'error');
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const handleSave = async () => {
    // Client-side validation
    let minInterval = 1440;
    if (config.subscriptionTier === 'whale') minInterval = 5;
    else if (config.subscriptionTier === 'pro') minInterval = 30;

    if (config.interval < minInterval) {
      showAlert(t('Warning'), t(`Your current tier requires a minimum interval of ${minInterval} minutes.`), 'warning');
      return;
    }

    const freePersonas = ['professional', 'degen', 'analytical', 'news'];
    if (config.subscriptionTier === 'free' && !freePersonas.includes(config.persona)) {
      showAlert(t('Access Denied'), t('This persona is only available on Pro or Whale tiers.'), 'warning');
      return;
    }

    if (config.subscriptionTier !== 'whale' && config.persona === 'custom') {
      showAlert(t('Access Denied'), t('Custom persona is only available on the Whale tier.'), 'warning');
      return;
    }

    if (config.subscriptionTier === 'free' && config.aiProvider !== 'groq') {
      showAlert(t('Access Denied'), t('Gemini and GPT-5.1 models are only available on Pro or Whale tiers.'), 'warning');
      return;
    }

    setIsSaving(true);
    const { error } = await supabase.rpc('update_user_config', {
      p_binance_api_key: config.apiKey || null,
      p_groq_api_key: config.groqApiKey || null,
      p_gemini_api_key: config.geminiApiKey || null,
      p_openai_api_key: config.openaiApiKey || null,
      p_ai_provider: config.aiProvider,
      p_persona: config.persona,
      p_interval: config.interval,
      p_custom_prompt: config.customPrompt || null
    });

    if (!error) {
      showAlert(t('Success'), t('Configuration saved securely.'), 'success');
      
      // If the interval was reduced, we should update the local nextPostDate
      // to reflect the change immediately in the UI.
      if (config.interval < (logs[0]?.interval || 1440)) {
        const newNextTime = new Date(Date.now() + config.interval * 60000);
        setNextPostDate(newNextTime);
      }
      
      fetchData();
    } else {
      showAlert(t('Error'), t('Error saving configuration: ') + error.message, 'error');
    }
    setIsSaving(false);
  };

  const toggleEngine = async () => {
    const newState = !isActive;
    setIsActive(newState);
    
    const updates: any = { is_active: newState };
    
    // If unpausing and the scheduled time has already passed, reset the timer
    // so it doesn't get stuck on "Processing..." or fire a stale post.
    if (newState && nextPostDate && nextPostDate.getTime() < Date.now()) {
      const newNextTime = new Date(Date.now() + config.interval * 60000);
      updates.next_post_time = newNextTime.toISOString();
      setNextPostDate(newNextTime);
    }
    
    await supabase.from('user_configs').update(updates).eq('user_id', session.user.id);
  };

  const handleTestPost = async () => {
    if (!hasSavedKey && !config.apiKey) {
      showAlert(t('Warning'), t('Please save your Binance API Key first.'), 'warning');
      return;
    }
    
    if (config.aiProvider === 'groq' && !hasSavedGroqKey && !config.groqApiKey) {
      showAlert(t('Warning'), t('Please save your Groq API Key first.'), 'warning');
      return;
    }

    if (config.aiProvider.startsWith('gemini') && !hasSavedGeminiKey && !config.geminiApiKey) {
      showAlert(t('Warning'), t('Please save your Gemini API Key first.'), 'warning');
      return;
    }

    if (config.aiProvider === 'gpt-5.1' && !hasSavedOpenAIKey && !config.openaiApiKey) {
      showAlert(t('Warning'), t('Please save your GPT-5.1 API Key first.'), 'warning');
      return;
    }

    setIsTestingPost(true);
    try {
      const { data, error } = await supabase.functions.invoke('auto-poster', {
        body: { user_id: session.user.id, is_test: true }
      });
      
      // Supabase invoke returns the error in 'error' if it's a network/invocation failure
      if (error) throw error;
      
      // If the edge function returns a JSON with an 'error' property, it's in 'data'
      if (data && data.error) {
        throw new Error(data.error);
      }
      
      showAlert(t('Success'), t('Test post triggered! It may take a few seconds to generate and publish. Check your Activity Logs shortly.'), 'success');
      setTimeout(fetchData, 3000); // Refresh logs after a short delay
    } catch (err: any) {
      // Try to extract a more meaningful message if it's a generic Edge Function error
      let errorMessage = err.message;
      if (err.context && typeof err.context.json === 'function') {
        try {
          const errorBody = await err.context.json();
          if (errorBody && errorBody.error) {
            errorMessage = errorBody.error;
          }
        } catch (e) {
          if (err.context.status) {
            errorMessage += ` (Status: ${err.context.status})`;
          }
        }
      } else if (err.context && err.context.status) {
         errorMessage += ` (Status: ${err.context.status})`;
      }
      showAlert(t('Error'), t('Error triggering test post: ') + errorMessage, 'error');
    } finally {
      setIsTestingPost(false);
    }
  };

  const handleRefreshLogs = async () => {
    setIsRefreshing(true);
    await fetchData();
    setTimeout(() => setIsRefreshing(false), 500); // Small delay so the user sees the spinner
  };

  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail) return;
    setIsUpdatingEmail(true);
    try {
      const { error } = await supabase.auth.updateUser({ email: newEmail });
      if (error) throw error;
      showAlert(t('Success'), t('Confirmation emails have been sent to both your old and new addresses. Please verify to complete the change.'), 'success');
      setNewEmail('');
    } catch (err: any) {
      showAlert(t('Error'), t('Error updating email: ') + err.message, 'error');
    } finally {
      setIsUpdatingEmail(false);
    }
  };

  const handleDeleteAccount = async () => {
    showConfirm(
      t('Delete Account'),
      t('Are you absolutely sure you want to delete your account? This action cannot be undone and all your data will be permanently lost.'),
      async () => {
        setIsDeletingAccount(true);
        try {
          const { error } = await supabase.rpc('delete_user');
          if (error) {
            throw new Error(error.message + '\n\nPlease ensure you have run the delete_user SQL script in your Supabase SQL Editor.');
          }
          await supabase.auth.signOut();
          window.location.reload();
        } catch (err: any) {
          showAlert(t('Error'), t('Error deleting account: ') + err.message, 'error');
          setIsDeletingAccount(false);
        }
      },
      t('Delete Account')
    );
  };

  const handleUpgrade = (plan: string) => {
    const email = session?.user?.email;
    if (!email) {
      showAlert(t('Warning'), t('Please sign in to upgrade.'), 'warning');
      return;
    }
    
    let paylink = '';
    if (plan === 'Pro') {
      paylink = 'https://moonpay.hel.io/x/PosterProTier';
    } else if (plan === 'Whale') {
      paylink = 'https://moonpay.hel.io/x/PosterWhaleTier';
    }
    
    if (paylink) {
      // Pass the email as a query parameter to pre-fill the Helio checkout
      const url = `${paylink}?customerEmail=${encodeURIComponent(email)}&email=${encodeURIComponent(email)}`;
      window.open(url, '_blank');
    }
  };

  const renderModal = () => {
    const icons = {
      success: <Check className="w-6 h-6 text-green-500" />,
      error: <X className="w-6 h-6 text-red-500" />,
      info: <Info className="w-6 h-6 text-blue-500" />,
      warning: <AlertCircle className="w-6 h-6 text-amber-500" />
    };

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="p-6 flex items-start gap-4">
            <div className={`p-2 rounded-full ${
              modal.type === 'success' ? 'bg-green-50' : 
              modal.type === 'error' ? 'bg-red-50' : 
              modal.type === 'warning' ? 'bg-amber-50' : 'bg-blue-50'
            }`}>
              {icons[modal.type as keyof typeof icons]}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-serif text-[#2D2B2A] mb-1">{modal.title}</h3>
              <p className="text-sm text-[#7A7571] leading-relaxed">{modal.message}</p>
            </div>
          </div>
          <div className="p-4 bg-[#FBFBF9] border-t border-[#EAE5DF] flex justify-end gap-3">
            {modal.onConfirm && (
              <button 
                onClick={() => setModal(prev => ({ ...prev, isOpen: false }))}
                className="px-4 py-2 text-[#7A7571] text-sm font-medium rounded-lg hover:bg-[#EAE5DF] transition-colors"
              >
                {t('Cancel')}
              </button>
            )}
            <button 
              onClick={() => {
                if (modal.onConfirm) modal.onConfirm();
                setModal(prev => ({ ...prev, isOpen: false }));
              }}
              className={`px-6 py-2 text-white text-sm font-medium rounded-lg transition-colors ${
                modal.type === 'error' || modal.onConfirm ? 'bg-red-500 hover:bg-red-600' : 'bg-[#2D2B2A] hover:bg-[#1A1918]'
              }`}
            >
              {modal.onConfirm ? (modal.confirmText || t('Confirm')) : t('Close')}
            </button>
          </div>
        </motion.div>
      </div>
    );
  };

  if (showTutorial) {
    return <TutorialPage onBack={() => setShowTutorial(false)} />;
  }

  if (!session) {
    if (legalView) {
      return <LegalPages type={legalView} onBack={() => setLegalView(null)} />;
    }

    if (!showLogin) {
      return (
        <LandingPage 
          onGetStarted={() => setShowLogin(true)} 
          onLogin={() => setShowLogin(true)} 
          onLegalClick={(type) => setLegalView(type)}
          onTutorialClick={() => setShowTutorial(true)}
        />
      );
    }

    return (
      <div className="min-h-screen bg-[#FBFBF9] flex items-center justify-center p-4 font-sans text-[#2D2B2A]">
        <div className="w-full max-w-md bg-white border border-[#EAE5DF] shadow-[0_2px_10px_rgba(0,0,0,0.02)] rounded-2xl p-10 relative">
          <button 
            onClick={() => setShowLogin(false)}
            className="absolute top-6 left-6 text-[#7A7571] hover:text-[#2D2B2A] transition-colors"
          >
            <ArrowRight className="w-5 h-5 rotate-180" />
          </button>
          <div className="flex flex-col items-center justify-center gap-4 mb-10">
            <div className="w-12 h-12 bg-[#2D2B2A] rounded-full flex items-center justify-center text-white">
              <Feather className="w-6 h-6" strokeWidth={1.25} />
            </div>
            <h1 className="font-serif text-3xl text-[#2D2B2A]">{t('AutoPost')}</h1>
            <p className="text-[#7A7571] text-sm text-center">{t('Sign in or create an account to manage your automated publishing.')}</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#7A7571] mb-1.5">{t('Email')}</label>
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-[#FBFBF9] border border-[#EAE5DF] rounded-lg px-4 py-3 text-[#2D2B2A] focus:outline-none focus:border-[#2D2B2A] focus:ring-1 focus:ring-[#2D2B2A] transition-all"
                required
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-[#7A7571]">{t('Password')}</label>
                <button 
                  type="button"
                  onClick={handleResetPassword}
                  disabled={isResettingPassword}
                  className="text-xs font-medium text-[#2D2B2A] hover:underline disabled:opacity-50"
                >
                  {isResettingPassword ? t('Sending...') : t('Forgot Password?')}
                </button>
              </div>
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-[#FBFBF9] border border-[#EAE5DF] rounded-lg px-4 py-3 text-[#2D2B2A] focus:outline-none focus:border-[#2D2B2A] focus:ring-1 focus:ring-[#2D2B2A] transition-all"
                required
              />
            </div>
            <button 
              type="submit" 
              disabled={isAuthLoading}
              className="w-full bg-[#2D2B2A] hover:bg-[#1A1918] text-white font-medium py-3.5 rounded-lg mt-6 transition-colors disabled:opacity-50"
            >
              {isAuthLoading ? t('Authenticating...') : t('Continue')}
            </button>
          </form>
          {modal.isOpen && renderModal()}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBFBF9] text-[#2D2B2A] flex font-sans selection:bg-[#EAE5DF]">
      {/* Sidebar */}
      <aside className="w-64 border-r border-[#EAE5DF] bg-[#F4F3F0] flex flex-col">
        <div className="p-8 border-b border-[#EAE5DF]">
          <div className="flex items-center gap-3 text-[#2D2B2A]">
            <Feather className="w-6 h-6" strokeWidth={1.25} />
            <span className="font-serif text-2xl tracking-tight">{t('AutoPost')}</span>
          </div>
          <p className="text-xs text-[#7A7571] mt-2 font-medium tracking-wide uppercase">{t('Binance Square')}</p>
        </div>

        <nav className="flex-1 p-6 space-y-1.5">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'dashboard' ? 'bg-white shadow-sm text-[#2D2B2A]' : 'text-[#7A7571] hover:text-[#2D2B2A] hover:bg-[#EBEAE6]'}`}
          >
            <Layout className="w-5 h-5" strokeWidth={1.5} />
            <span className="font-medium text-sm">{t('Dashboard')}</span>
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'settings' ? 'bg-white shadow-sm text-[#2D2B2A]' : 'text-[#7A7571] hover:text-[#2D2B2A] hover:bg-[#EBEAE6]'}`}
          >
            <SlidersHorizontal className="w-5 h-5" strokeWidth={1.5} />
            <span className="font-medium text-sm">{t('Configuration')}</span>
          </button>
          <button 
            onClick={() => setActiveTab('logs')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'logs' ? 'bg-white shadow-sm text-[#2D2B2A]' : 'text-[#7A7571] hover:text-[#2D2B2A] hover:bg-[#EBEAE6]'}`}
          >
            <History className="w-5 h-5" strokeWidth={1.5} />
            <span className="font-medium text-sm">{t('Activity Logs')}</span>
          </button>
          <button 
            onClick={() => setActiveTab('account')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'account' ? 'bg-white shadow-sm text-[#2D2B2A]' : 'text-[#7A7571] hover:text-[#2D2B2A] hover:bg-[#EBEAE6]'}`}
          >
            <User className="w-5 h-5" strokeWidth={1.5} />
            <span className="font-medium text-sm">{t('Account')}</span>
          </button>
          <button 
            onClick={() => setActiveTab('subscription')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'subscription' ? 'bg-white shadow-sm text-[#2D2B2A]' : 'text-[#7A7571] hover:text-[#2D2B2A] hover:bg-[#EBEAE6]'}`}
          >
            <CreditCard className="w-5 h-5" strokeWidth={1.5} />
            <span className="font-medium text-sm">{t('Subscription')}</span>
          </button>
        </nav>

        <div className="p-6 border-t border-[#EAE5DF] space-y-4">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3 text-[#7A7571]">
              <Globe className="w-4 h-4" strokeWidth={1.5} />
              <span className="text-sm font-medium">{t('Language')}</span>
            </div>
            <select 
              value={i18n.language}
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              className="bg-transparent text-sm text-[#2D2B2A] font-medium focus:outline-none cursor-pointer"
            >
              <option value="en">English</option>
              <option value="zh">中文</option>
            </select>
          </div>
          <div className="flex items-center justify-between px-2 pt-4 border-t border-[#EAE5DF]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#EAE5DF] flex items-center justify-center text-[#2D2B2A] font-serif text-sm">
                {session.user.email?.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-[#7A7571] truncate w-28">{session.user.email}</span>
              </div>
            </div>
            <button onClick={() => supabase.auth.signOut()} className="text-[#7A7571] hover:text-[#2D2B2A] transition-colors">
              <LogOut className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-12">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motion.div 
                key="dashboard"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="space-y-10"
              >
                <header className="flex items-end justify-between border-b border-[#EAE5DF] pb-8">
                <div>
                  <h1 className="font-serif text-4xl text-[#2D2B2A] mb-2">{t('Dashboard')}</h1>
                  <p className="text-[#7A7571]">
                    {t('Overview of your automated publishing engine.')} <span className="mx-2">•</span> {t('Local Time:')} {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={handleTestPost}
                    disabled={isTestingPost}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all bg-white/60 backdrop-blur-md border border-white/40 shadow-[0_4px_12px_rgba(0,0,0,0.05)] text-[#2D2B2A] hover:bg-white/80 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" strokeWidth={1.5} />
                    {isTestingPost ? t('Triggering...') : t('Test Post')}
                  </button>
                  <button 
                    onClick={toggleEngine}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all backdrop-blur-md border shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] ${isActive ? 'bg-[#2D2B2A]/90 border-[#2D2B2A]/20 text-white hover:bg-[#2D2B2A]' : 'bg-white/60 border-white/40 text-[#7A7571] hover:bg-white/80 hover:text-[#2D2B2A]'}`}
                  >
                    {isActive ? <Pause className="w-4 h-4" strokeWidth={1.5} /> : <Play className="w-4 h-4" strokeWidth={1.5} />}
                    {isActive ? t('Engine Active') : t('Engine Paused')}
                  </button>
                </div>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white border border-[#EAE5DF] rounded-2xl p-8 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                  <div className="flex items-center gap-3 text-[#7A7571] mb-6">
                    <Timer className="w-5 h-5" strokeWidth={1.5} />
                    <h3 className="font-medium text-sm">{t('Next Scheduled Post')}</h3>
                  </div>
                  <div className="font-serif text-4xl text-[#2D2B2A]">{isActive ? (timeRemaining === 'Processing...' ? t('Processing...') : timeRemaining) : '--:--'}</div>
                  <p className="text-sm text-[#7A7571] mt-3">
                    {isActive && nextPostDate ? `${t('Target:')} ${nextPostDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : t('Based on {{interval}}m interval', { interval: config.interval })}
                  </p>
                </div>
                
                <div className="bg-white border border-[#EAE5DF] rounded-2xl p-8 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                  <div className="flex items-center gap-3 text-[#7A7571] mb-6">
                    <History className="w-5 h-5" strokeWidth={1.5} />
                    <h3 className="font-medium text-sm">{t('Total Posts')}</h3>
                  </div>
                  <div className="font-serif text-4xl text-[#2D2B2A]">{totalPosts}</div>
                  <p className="text-sm text-[#7A7571] mt-3 flex items-center gap-1.5">
                    <Check className="w-4 h-4" strokeWidth={1.5} /> {t('Lifetime count')}
                  </p>
                </div>

                <div className="bg-white border border-[#EAE5DF] rounded-2xl p-8 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                  <div className="flex items-center gap-3 text-[#7A7571] mb-6">
                    <Sparkles className="w-5 h-5" strokeWidth={1.5} />
                    <h3 className="font-medium text-sm">{t('Current Persona')}</h3>
                  </div>
                  <div className="font-serif text-2xl text-[#2D2B2A] capitalize leading-tight">{t(config.persona.replace('_', ' '))}</div>
                  <p className="text-sm text-[#7A7571] mt-3">{t('Active writing style')}</p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div 
              key="settings"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="space-y-10"
            >
              <header className="border-b border-[#EAE5DF] pb-8">
                <h1 className="font-serif text-4xl text-[#2D2B2A] mb-2">{t('Configuration')}</h1>
                <p className="text-[#7A7571]">{t('Manage your API keys and AI persona settings.')}</p>
              </header>

              <div className="bg-white border border-[#EAE5DF] rounded-2xl overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                <div className="p-8 border-b border-[#EAE5DF] bg-[#FBFBF9] flex items-start justify-between flex-wrap gap-4">
                  <div>
                    <h2 className="font-serif text-2xl text-[#2D2B2A] flex items-center gap-3">
                      <ShieldCheck className="w-5 h-5 text-[#7A7571]" strokeWidth={1.5} />
                      {t('API Keys')}
                    </h2>
                    <p className="text-sm text-[#7A7571] mt-2 leading-relaxed">{t('Your keys are encrypted and stored securely in Supabase Vault. Enter a new key to overwrite the existing one.')}</p>
                  </div>
                  <button 
                    onClick={() => setShowTutorial(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#2D2B2A] text-white rounded-lg text-sm font-medium hover:bg-[#1A1918] transition-colors"
                  >
                    <Info className="w-4 h-4" />
                    {t('How to get keys')}
                  </button>
                </div>
                <div className="p-8 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-[#7A7571] mb-2">{t('AI Model Provider')}</label>
                    <select 
                      value={config.aiProvider}
                      onChange={e => setConfig({...config, aiProvider: e.target.value})}
                      className="w-full bg-[#FBFBF9] border border-[#EAE5DF] rounded-lg px-4 py-3.5 text-[#2D2B2A] focus:outline-none focus:border-[#2D2B2A] focus:ring-1 focus:ring-[#2D2B2A] transition-all appearance-none"
                    >
                      <option value="groq">Groq (Llama 3)</option>
                      <option value="gemini-2.0-pro" disabled={config.subscriptionTier === 'free'}>Gemini 2.0 Pro (Pro/Whale)</option>
                      <option value="gemini-2.5-pro" disabled={config.subscriptionTier === 'free'}>Gemini 2.5 Pro (Pro/Whale)</option>
                      <option value="gemini-3.0-pro" disabled={config.subscriptionTier === 'free'}>Gemini 3.0 Pro (Pro/Whale)</option>
                      <option value="gpt-5.1" disabled={config.subscriptionTier === 'free'}>GPT-5.1 (Pro/Whale)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#7A7571] mb-2">{t('Binance Square API Key')}</label>
                    <input 
                      type="password" 
                      placeholder={hasSavedKey ? `•••••••••••••••• (${t('Key securely stored')})` : t('Enter new Binance API Key')}
                      value={config.apiKey}
                      onChange={e => setConfig({...config, apiKey: e.target.value})}
                      className="w-full bg-[#FBFBF9] border border-[#EAE5DF] rounded-lg px-4 py-3.5 text-[#2D2B2A] focus:outline-none focus:border-[#2D2B2A] focus:ring-1 focus:ring-[#2D2B2A] transition-all"
                    />
                  </div>
                  {config.aiProvider === 'groq' && (
                    <div>
                      <label className="block text-sm font-medium text-[#7A7571] mb-2">{t('Groq API Key')}</label>
                      <input 
                        type="password" 
                        placeholder={hasSavedGroqKey ? `•••••••••••••••• (${t('Key securely stored')})` : t('Enter new Groq API Key (gsk_...)')}
                        value={config.groqApiKey}
                        onChange={e => setConfig({...config, groqApiKey: e.target.value})}
                        className="w-full bg-[#FBFBF9] border border-[#EAE5DF] rounded-lg px-4 py-3.5 text-[#2D2B2A] focus:outline-none focus:border-[#2D2B2A] focus:ring-1 focus:ring-[#2D2B2A] transition-all"
                      />
                    </div>
                  )}
                  {config.aiProvider.startsWith('gemini') && (
                    <div>
                      <label className="block text-sm font-medium text-[#7A7571] mb-2">{t('Gemini API Key')}</label>
                      <input 
                        type="password" 
                        placeholder={hasSavedGeminiKey ? `•••••••••••••••• (${t('Key securely stored')})` : t('Enter new Gemini API Key')}
                        value={config.geminiApiKey}
                        onChange={e => setConfig({...config, geminiApiKey: e.target.value})}
                        className="w-full bg-[#FBFBF9] border border-[#EAE5DF] rounded-lg px-4 py-3.5 text-[#2D2B2A] focus:outline-none focus:border-[#2D2B2A] focus:ring-1 focus:ring-[#2D2B2A] transition-all"
                      />
                    </div>
                  )}
                  {config.aiProvider === 'gpt-5.1' && (
                    <div>
                      <label className="block text-sm font-medium text-[#7A7571] mb-2">{t('GPT-5.1 API Key')}</label>
                      <input 
                        type="password" 
                        placeholder={hasSavedOpenAIKey ? `•••••••••••••••• (${t('Key securely stored')})` : t('Enter new OpenAI API Key (sk-...)')}
                        value={config.openaiApiKey}
                        onChange={e => setConfig({...config, openaiApiKey: e.target.value})}
                        className="w-full bg-[#FBFBF9] border border-[#EAE5DF] rounded-lg px-4 py-3.5 text-[#2D2B2A] focus:outline-none focus:border-[#2D2B2A] focus:ring-1 focus:ring-[#2D2B2A] transition-all"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white border border-[#EAE5DF] rounded-2xl overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                <div className="p-8 border-b border-[#EAE5DF] bg-[#FBFBF9]">
                  <h2 className="font-serif text-2xl text-[#2D2B2A] flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-[#7A7571]" strokeWidth={1.5} />
                    {t('AI Persona & Timing')}
                  </h2>
                </div>
                <div className="p-8 space-y-8">
                  <div>
                    <label className="block text-sm font-medium text-[#7A7571] mb-2">{t('Persona Style')}</label>
                    <select 
                      value={config.persona}
                      onChange={e => setConfig({...config, persona: e.target.value})}
                      className="w-full bg-[#FBFBF9] border border-[#EAE5DF] rounded-lg px-4 py-3.5 text-[#2D2B2A] focus:outline-none focus:border-[#2D2B2A] focus:ring-1 focus:ring-[#2D2B2A] transition-all appearance-none"
                    >
                      <optgroup label={t('Core Personas')}>
                        <option value="professional">{t('Professional Analyst')}</option>
                        <option value="degen">{t('Crypto Degen')}</option>
                        <option value="analytical">{t('Data & Charts Focused')}</option>
                        <option value="news">{t('News Broadcaster')}</option>
                      </optgroup>
                      <optgroup label={t('Premium Features')} disabled={config.subscriptionTier === 'free'}>
                        <option value="auto_cycle">{t('Auto-Cycle Personas')}</option>
                      </optgroup>
                      <optgroup label={t('Specialized Traders')} disabled={config.subscriptionTier === 'free'}>
                        <option value="whale_tracker">{t('Whale & Smart Money Tracker')}</option>
                        <option value="sniper">{t('Low-TF Scalper / Sniper')}</option>
                        <option value="trend_surfer">{t('Momentum & Trend Surfer')}</option>
                        <option value="contrarian">{t('Contrarian (Fades the Crowd)')}</option>
                      </optgroup>
                      <optgroup label={t('Market Views')} disabled={config.subscriptionTier === 'free'}>
                        <option value="macro_economist">{t('Macro Economist (Fed/TradFi)')}</option>
                        <option value="yield_farmer">{t('DeFi Yield Farmer')}</option>
                        <option value="doom_scroller">{t('Perma-Bear / Skeptic')}</option>
                        <option value="moonboy">{t('Perma-Bull / Hype Beast')}</option>
                      </optgroup>
                      <optgroup label={t('Alternative')} disabled={config.subscriptionTier === 'free'}>
                        <option value="philosopher">{t('Crypto Philosopher / Maxi')}</option>
                        <option value="ai_bot">{t('Algorithmic Trading Bot')}</option>
                      </optgroup>
                      <optgroup label={t('Whale Exclusive')} disabled={config.subscriptionTier !== 'whale'}>
                        <option value="custom">{t('Custom AI Prompt')}</option>
                      </optgroup>
                    </select>
                    {config.subscriptionTier === 'free' && (
                      <p className="text-xs text-[#7A7571] mt-2">{t('Upgrade to Pro to unlock Specialized Personas.')}</p>
                    )}
                  </div>
                  
                  {config.persona === 'custom' && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="overflow-hidden"
                    >
                      <label className="block text-sm font-medium text-[#7A7571] mb-2">{t('Custom AI Prompt Instructions')}</label>
                      <textarea 
                        value={config.customPrompt}
                        onChange={e => setConfig({...config, customPrompt: e.target.value})}
                        placeholder={t('Enter your custom system prompt for the AI...')}
                        className="w-full bg-[#FBFBF9] border border-[#EAE5DF] rounded-lg px-4 py-3.5 text-[#2D2B2A] focus:outline-none focus:border-[#2D2B2A] focus:ring-1 focus:ring-[#2D2B2A] transition-all min-h-[120px] resize-y"
                      />
                    </motion.div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-[#7A7571] mb-2">
                      {t('Post Interval (Minutes)')} 
                      <span className="text-xs ml-2 opacity-70">
                        ({t('Min')}: {config.subscriptionTier === 'whale' ? 5 : config.subscriptionTier === 'pro' ? 30 : 1440})
                      </span>
                    </label>
                    <input 
                      type="number" 
                      min={config.subscriptionTier === 'whale' ? 5 : config.subscriptionTier === 'pro' ? 30 : 1440}
                      value={config.interval}
                      onChange={e => setConfig({...config, interval: parseInt(e.target.value)})}
                      className="w-full bg-[#FBFBF9] border border-[#EAE5DF] rounded-lg px-4 py-3.5 text-[#2D2B2A] focus:outline-none focus:border-[#2D2B2A] focus:ring-1 focus:ring-[#2D2B2A] transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button 
                  onClick={handleSave}
                  disabled={isSaving || (!config.apiKey && !hasSavedKey)}
                  className="bg-[#2D2B2A] hover:bg-[#1A1918] text-white font-medium px-8 py-3.5 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                  <Save className="w-4 h-4" strokeWidth={1.5} />
                  {isSaving ? t('Saving...') : t('Save Configuration')}
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === 'logs' && (
            <motion.div 
              key="logs"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="space-y-10"
            >
              <header className="flex items-end justify-between border-b border-[#EAE5DF] pb-8">
                <div>
                  <h1 className="font-serif text-4xl text-[#2D2B2A] mb-2">{t('Activity Logs')}</h1>
                  <p className="text-[#7A7571]">{t('Recent posts generated and published by the engine.')}</p>
                </div>
                <button 
                  onClick={handleRefreshLogs}
                  disabled={isRefreshing}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all bg-white border border-[#EAE5DF] text-[#2D2B2A] hover:border-[#2D2B2A] shadow-sm disabled:opacity-50"
                >
                  <History className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} strokeWidth={1.5} />
                  {isRefreshing ? t('Refreshing...') : t('Refresh Logs')}
                </button>
              </header>

              <div className="bg-white border border-[#EAE5DF] rounded-2xl overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                <div className="max-h-[600px] overflow-y-auto">
                  <table className="w-full text-left text-sm relative">
                    <thead className="bg-[#FBFBF9] border-b border-[#EAE5DF] text-[#7A7571] sticky top-0 z-10">
                      <tr>
                        <th className="px-8 py-5 font-medium">{t('Time')}</th>
                        <th className="px-8 py-5 font-medium">{t('Type')}</th>
                        <th className="px-8 py-5 font-medium">{t('Status')}</th>
                        <th className="px-8 py-5 font-medium">{t('Content Preview')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EAE5DF]">
                      {logs.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="px-8 py-12 text-center text-[#7A7571]">
                            {t('No logs found yet. Start the engine to generate posts.')}
                          </td>
                        </tr>
                      ) : logs.map((log, i) => (
                        <tr key={i} className="hover:bg-[#FBFBF9] transition-colors">
                          <td className="px-8 py-5 text-[#7A7571]">
                            {new Date(log.created_at).toLocaleString()}
                          </td>
                          <td className="px-8 py-5">
                            <span className="inline-flex items-center justify-center bg-[#F4F3F0] border border-[#EAE5DF] text-[#2D2B2A] px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">
                              {log.language} {log.post_type}
                            </span>
                          </td>
                          <td className="px-8 py-5">
                            {log.status === 'success' ? (
                              <span className="flex items-center gap-2 text-[#4A5D4E]">
                                <Check className="w-4 h-4" strokeWidth={1.5} /> {t('Success')}
                              </span>
                            ) : (
                              <span className="flex items-center gap-2 text-[#A35D52]" title={log.error_message}>
                                <AlertTriangle className="w-4 h-4" strokeWidth={1.5} /> {t('Failed')}
                              </span>
                            )}
                          </td>
                          <td className="px-8 py-5 text-[#2D2B2A] truncate max-w-xs">
                            {log.content.substring(0, 50)}...
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {logs.length < totalPosts && (
                  <div className="p-4 border-t border-[#EAE5DF] bg-[#FBFBF9] flex justify-center">
                    <button 
                      onClick={() => setLogsLimit(prev => prev + 20)}
                      className="text-sm font-medium text-[#2D2B2A] hover:text-[#7A7571] transition-colors px-4 py-2"
                    >
                      {t('Load More')}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'account' && (
            <motion.div 
              key="account"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="space-y-10"
            >
              <header className="border-b border-[#EAE5DF] pb-8">
                <h1 className="font-serif text-4xl text-[#2D2B2A] mb-2">{t('Account Settings')}</h1>
                <p className="text-[#7A7571]">{t('Manage your email address and account deletion.')}</p>
              </header>

              <div className="bg-white border border-[#EAE5DF] rounded-2xl overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                <div className="p-8 border-b border-[#EAE5DF] bg-[#FBFBF9]">
                  <h2 className="font-serif text-2xl text-[#2D2B2A] flex items-center gap-3">
                    <User className="w-5 h-5 text-[#7A7571]" strokeWidth={1.5} />
                    {t('Change Email')}
                  </h2>
                  <p className="text-sm text-[#7A7571] mt-2 leading-relaxed">{t('Update the email address associated with your account. You will need to verify both your old and new email addresses.')}</p>
                </div>
                <div className="p-8">
                  <form onSubmit={handleUpdateEmail} className="flex gap-4">
                    <input 
                      type="email" 
                      placeholder={t('Enter new email address')}
                      value={newEmail}
                      onChange={e => setNewEmail(e.target.value)}
                      required
                      className="flex-1 bg-[#FBFBF9] border border-[#EAE5DF] rounded-lg px-4 py-3.5 text-[#2D2B2A] focus:outline-none focus:border-[#2D2B2A] focus:ring-1 focus:ring-[#2D2B2A] transition-all"
                    />
                    <button 
                      type="submit"
                      disabled={isUpdatingEmail || !newEmail}
                      className="bg-[#2D2B2A] hover:bg-[#1A1918] text-white font-medium px-6 py-3.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm whitespace-nowrap"
                    >
                      {isUpdatingEmail ? t('Updating...') : t('Update Email')}
                    </button>
                  </form>
                </div>
              </div>

              <div className="bg-white border border-[#EAE5DF] rounded-2xl overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                <div className="p-8 border-b border-[#EAE5DF] bg-[#FBFBF9]">
                  <h2 className="font-serif text-2xl text-[#2D2B2A] flex items-center gap-3">
                    <Lock className="w-5 h-5 text-[#7A7571]" strokeWidth={1.5} />
                    {t('Change Password')}
                  </h2>
                  <p className="text-sm text-[#7A7571] mt-2 leading-relaxed">{t('Update your account password.')}</p>
                </div>
                <div className="p-8">
                  <form onSubmit={handleChangePassword} className="flex gap-4">
                    <input 
                      type="password" 
                      placeholder={t('New Password')}
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      required
                      minLength={6}
                      className="flex-1 bg-[#FBFBF9] border border-[#EAE5DF] rounded-lg px-4 py-3.5 text-[#2D2B2A] focus:outline-none focus:border-[#2D2B2A] focus:ring-1 focus:ring-[#2D2B2A] transition-all"
                    />
                    <button 
                      type="submit"
                      disabled={isUpdatingPassword || !newPassword}
                      className="bg-[#2D2B2A] hover:bg-[#1A1918] text-white font-medium px-6 py-3.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm whitespace-nowrap"
                    >
                      {isUpdatingPassword ? t('Updating...') : t('Update Password')}
                    </button>
                  </form>
                </div>
              </div>

              <div className="bg-white border border-[#F6E1DF] rounded-2xl overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                <div className="p-8 border-b border-[#F6E1DF] bg-[#FDF5F4]">
                  <h2 className="font-serif text-2xl text-[#A35D52] flex items-center gap-3">
                    <Trash2 className="w-5 h-5 text-[#A35D52]" strokeWidth={1.5} />
                    {t('Danger Zone')}
                  </h2>
                  <p className="text-sm text-[#A35D52]/80 mt-2 leading-relaxed">{t('Permanently delete your account and all associated data. This action cannot be undone.')}</p>
                </div>
                <div className="p-8">
                  <button 
                    onClick={handleDeleteAccount}
                    disabled={isDeletingAccount}
                    className="bg-white border border-[#A35D52] text-[#A35D52] hover:bg-[#A35D52] hover:text-white font-medium px-6 py-3.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                  >
                    {isDeletingAccount ? t('Deleting...') : t('Delete Account')}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'subscription' && (
            <motion.div 
              key="subscription"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="space-y-10"
            >
              <header className="border-b border-[#EAE5DF] pb-8">
                <h1 className="font-serif text-4xl text-[#2D2B2A] mb-2">{t('Subscription & Billing')}</h1>
                <p className="text-[#7A7571]">{t('Manage your plan and upgrade your posting limits.')}</p>
              </header>

              <div className="bg-white border border-[#EAE5DF] rounded-2xl p-8 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-medium text-[#7A7571] mb-1">{t('Current Plan')}</h2>
                  <div className="font-serif text-3xl text-[#2D2B2A] capitalize flex items-center gap-3">
                    {config.subscriptionTier === 'whale' ? <Crown className="w-6 h-6 text-[#D4AF37]" /> : 
                     config.subscriptionTier === 'pro' ? <Zap className="w-6 h-6 text-[#2D2B2A]" /> : 
                     <Feather className="w-6 h-6 text-[#7A7571]" strokeWidth={1.25} />}
                    {t(config.subscriptionTier.charAt(0).toUpperCase() + config.subscriptionTier.slice(1))} {t('Tier')}
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1.5 bg-[#F4F3F0] text-[#2D2B2A] px-3 py-1.5 rounded-md text-xs font-medium uppercase tracking-wider">
                    <Check className="w-3.5 h-3.5" /> {t('Active')}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Free Tier */}
                <div className={`bg-white border rounded-2xl p-8 flex flex-col ${config.subscriptionTier === 'free' ? 'border-[#2D2B2A] shadow-[0_4px_20px_rgba(0,0,0,0.06)]' : 'border-[#EAE5DF] shadow-[0_2px_10px_rgba(0,0,0,0.02)]'}`}>
                  <div className="mb-6">
                    <h3 className="font-serif text-2xl text-[#2D2B2A] mb-2">{t('Free')}</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-medium text-[#2D2B2A]">$0</span>
                      <span className="text-[#7A7571]">/{t('mo')}</span>
                    </div>
                  </div>
                  <ul className="space-y-4 mb-8 flex-1">
                    <li className="flex items-start gap-3 text-sm text-[#7A7571]">
                      <Check className="w-4 h-4 text-[#2D2B2A] shrink-0 mt-0.5" />
                      <span>{t('24h minimum post interval')}</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-[#7A7571]">
                      <Check className="w-4 h-4 text-[#2D2B2A] shrink-0 mt-0.5" />
                      <span>{t('Basic AI Personas')}</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-[#7A7571]">
                      <Check className="w-4 h-4 text-[#2D2B2A] shrink-0 mt-0.5" />
                      <span>{t('Standard Support')}</span>
                    </li>
                  </ul>
                  <button 
                    disabled={config.subscriptionTier === 'free'}
                    className="w-full py-3 rounded-lg font-medium text-sm transition-all bg-[#F4F3F0] text-[#7A7571] disabled:opacity-50"
                  >
                    {config.subscriptionTier === 'free' ? t('Current Plan (Button)') : t('Downgrade')}
                  </button>
                </div>

                {/* Pro Tier */}
                <div className={`bg-white border rounded-2xl p-8 flex flex-col relative ${config.subscriptionTier === 'pro' ? 'border-[#2D2B2A] shadow-[0_4px_20px_rgba(0,0,0,0.06)]' : 'border-[#EAE5DF] shadow-[0_2px_10px_rgba(0,0,0,0.02)]'}`}>
                  {config.subscriptionTier !== 'pro' && (
                    <div className="absolute -top-3 inset-x-0 flex justify-center">
                      <span className="bg-[#2D2B2A] text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                        <Zap className="w-3 h-3" /> {t('Most Popular')}
                      </span>
                    </div>
                  )}
                  <div className="mb-6">
                    <h3 className="font-serif text-2xl text-[#2D2B2A] mb-2">{t('Pro')}</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-medium text-[#2D2B2A]">$15</span>
                      <span className="text-[#7A7571]">/{t('mo')}</span>
                    </div>
                  </div>
                  <ul className="space-y-4 mb-8 flex-1">
                    <li className="flex items-start gap-3 text-sm text-[#7A7571]">
                      <Check className="w-4 h-4 text-[#2D2B2A] shrink-0 mt-0.5" />
                      <span className="font-medium text-[#2D2B2A]">{t('30m minimum post interval')}</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-[#7A7571]">
                      <Check className="w-4 h-4 text-[#2D2B2A] shrink-0 mt-0.5" />
                      <span>{t('GPT-5.1 & Gemini 2/3 Selectable')}</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-[#7A7571]">
                      <Check className="w-4 h-4 text-[#2D2B2A] shrink-0 mt-0.5" />
                      <span>{t('All Specialized Personas')}</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-[#7A7571]">
                      <Check className="w-4 h-4 text-[#2D2B2A] shrink-0 mt-0.5" />
                      <span>{t('Priority Queue')}</span>
                    </li>
                  </ul>
                  <button 
                    onClick={() => handleUpgrade('Pro')}
                    disabled={config.subscriptionTier === 'pro'}
                    className={`w-full py-3 rounded-lg font-medium text-sm transition-all ${config.subscriptionTier === 'pro' ? 'bg-[#F4F3F0] text-[#7A7571] disabled:opacity-50' : 'bg-[#2D2B2A] hover:bg-[#1A1918] text-white shadow-sm'}`}
                  >
                    {config.subscriptionTier === 'pro' ? t('Current Plan (Button)') : t('Upgrade to Pro')}
                  </button>
                </div>

                {/* Whale Tier */}
                <div className={`bg-white border rounded-2xl p-8 flex flex-col ${config.subscriptionTier === 'whale' ? 'border-[#D4AF37] shadow-[0_4px_20px_rgba(212,175,55,0.15)]' : 'border-[#EAE5DF] shadow-[0_2px_10px_rgba(0,0,0,0.02)]'}`}>
                  <div className="mb-6">
                    <h3 className="font-serif text-2xl text-[#2D2B2A] mb-2 flex items-center gap-2">
                      {t('Whale')} <Crown className="w-5 h-5 text-[#D4AF37]" />
                    </h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-medium text-[#2D2B2A]">$49</span>
                      <span className="text-[#7A7571]">/{t('mo')}</span>
                    </div>
                  </div>
                  <ul className="space-y-4 mb-8 flex-1">
                    <li className="flex items-start gap-3 text-sm text-[#7A7571]">
                      <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span className="font-medium text-[#2D2B2A]">{t('5m minimum post interval')}</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-[#7A7571]">
                      <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span>{t('GPT-5.1 & Gemini 2/3 Selectable')}</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-[#7A7571]">
                      <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span>{t('Custom AI Personas')}</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-[#7A7571]">
                      <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span>{t('Dedicated IP & Support')}</span>
                    </li>
                  </ul>
                  <button 
                    onClick={() => handleUpgrade('Whale')}
                    disabled={config.subscriptionTier === 'whale'}
                    className={`w-full py-3 rounded-lg font-medium text-sm transition-all ${config.subscriptionTier === 'whale' ? 'bg-[#F4F3F0] text-[#7A7571] disabled:opacity-50' : 'bg-white border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white shadow-sm'}`}
                  >
                    {config.subscriptionTier === 'whale' ? t('Current Plan (Button)') : t('Upgrade to Whale')}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
          </AnimatePresence>
        </div>
      </main>
      {modal.isOpen && renderModal()}
    </div>
  );
}
