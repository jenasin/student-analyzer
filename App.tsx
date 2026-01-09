
import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Message, AppStatus, Report, Skill } from './types';
import { navigatorService } from './services/geminiService';

const SkillBar: React.FC<{ skill: Skill; index: number }> = ({ skill, index }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setWidth(skill.value), 100 * index);
    return () => clearTimeout(timer);
  }, [skill.value, index]);

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center text-sm font-semibold tracking-tight">
        <span className="text-slate-600 uppercase text-[11px] tracking-wider">{skill.label}</span>
        <span className="text-indigo-600">{skill.value}%</span>
      </div>
      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-indigo-600 transition-all duration-1000 ease-out rounded-full shadow-[0_0_10px_rgba(79,70,229,0.3)]"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [status, setStatus] = useState<AppStatus>(AppStatus.INITIAL);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<Report | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleStart = async () => {
    setIsLoading(true);
    try {
      const welcomeText = await navigatorService.startChat();
      setMessages([{
        role: 'model',
        text: welcomeText,
        timestamp: new Date()
      }]);
      setStatus(AppStatus.CHATTING);
    } catch (error) {
      console.error(error);
      alert("Chyba spojení.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      text: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const reply = await navigatorService.sendMessage(inputText);
      setMessages(prev => [...prev, {
        role: 'model',
        text: reply,
        timestamp: new Date()
      }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, {
        role: 'model',
        text: "Omlouvám se, došlo k chybě.",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEvaluate = async () => {
    setIsLoading(true);
    setStatus(AppStatus.EVALUATING);
    try {
      const result = await navigatorService.generateReport();
      setReport(result);
      setStatus(AppStatus.FINISHED);
    } catch (error) {
      console.error(error);
      alert("Chyba při generování.");
      setStatus(AppStatus.CHATTING);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfd] text-slate-900 flex flex-col font-sans">
      {/* Header */}
      <header className="px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="2">
               <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <h1 className="font-bold text-xl text-slate-900 tracking-tight leading-none">Navigator</h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1">Academic Core v1.2</p>
          </div>
        </div>
        
        {status === AppStatus.CHATTING && (
          <button
            onClick={handleEvaluate}
            className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all hover:bg-indigo-600 shadow-lg active:scale-95 disabled:opacity-50"
            disabled={messages.length < 3 || isLoading}
          >
            Analyzovat
          </button>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-4 flex flex-col overflow-hidden">
        {status === AppStatus.INITIAL && (
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-10 animate-in fade-in duration-1000">
            <div className="max-w-2xl space-y-6">
              <h2 className="text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
                Poznejte svůj <span className="text-indigo-600 italic font-serif">akademický otisk.</span>
              </h2>
              <p className="text-slate-500 text-xl leading-relaxed academic-text max-w-xl mx-auto">
                Vstupte do řízeného dialogu navrženého k odhalení vašich kognitivních procesů a studijních mechanismů.
              </p>
            </div>
            
            <button
              onClick={handleStart}
              className="group relative bg-white text-slate-900 border-2 border-slate-900 px-12 py-5 rounded-full text-lg font-bold transition-all hover:bg-slate-900 hover:text-white flex items-center gap-4 shadow-[8px_8px_0px_rgba(0,0,0,0.1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
            >
              <span>Zahájit navigaci</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        )}

        {(status === AppStatus.CHATTING || status === AppStatus.EVALUATING) && (
          <div className="flex-1 flex flex-col bg-white rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden relative">
            {/* Chat History */}
            <div className="flex-1 overflow-y-auto p-10 space-y-8">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} message-anim`}>
                  <div className={`max-w-[80%] rounded-2xl px-6 py-5 ${
                    m.role === 'user' 
                      ? 'bg-indigo-600 text-white shadow-md' 
                      : 'bg-[#f8fafc] text-slate-800 border border-slate-100 shadow-sm'
                  }`}>
                    <div className={`prose-academic max-w-none ${m.role === 'user' ? 'text-white prose-invert prose-p:leading-snug text-base' : ''}`}>
                      <ReactMarkdown>{m.text}</ReactMarkdown>
                    </div>
                    <div className={`text-[10px] mt-3 font-bold opacity-40 uppercase tracking-widest ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
                      {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && status === AppStatus.CHATTING && (
                <div className="flex justify-start">
                  <div className="bg-[#f8fafc] rounded-2xl px-6 py-5 flex gap-1.5 items-center">
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              )}
              {status === AppStatus.EVALUATING && (
                <div className="absolute inset-0 bg-white/90 backdrop-blur-md z-10 flex flex-col items-center justify-center text-center p-8">
                  <div className="w-14 h-14 border-[3px] border-indigo-600 border-t-transparent rounded-full animate-spin mb-8"></div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">Provádím analýzu...</h3>
                  <p className="text-slate-500 academic-text">Sestavuji váš profil na základě kognitivních parametrů.</p>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="px-10 py-8 bg-white border-t border-slate-50">
              <form onSubmit={handleSend} className="relative flex items-center">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Zadejte svou odpověď..."
                  disabled={isLoading || status !== AppStatus.CHATTING}
                  className="w-full pl-8 pr-16 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:bg-white focus:border-indigo-500 transition-all text-lg academic-text placeholder:text-slate-400 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim() || isLoading}
                  className="absolute right-3 p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition-all active:scale-90 shadow-md"
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </form>
              <div className="mt-4 flex justify-center items-center gap-2">
                <div className="h-[1px] w-12 bg-slate-100"></div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
                  Anonymizovaný vědecký sběr
                </span>
                <div className="h-[1px] w-12 bg-slate-100"></div>
              </div>
            </div>
          </div>
        )}

        {status === AppStatus.FINISHED && report && (
          <div className="flex-1 space-y-12 animate-in zoom-in-95 duration-700 pb-20">
            <div className="text-center space-y-4">
              <h2 className="text-5xl font-extrabold text-slate-900 tracking-tighter">Váš Studijní Pas</h2>
              <p className="text-slate-500 text-lg academic-text">Syntéza vašich kognitivních předpokladů a silných stránek.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Left Column: Visual Profiler */}
              <div className="lg:col-span-5 space-y-8">
                <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-8 border-b border-slate-50 pb-4">
                    Kognitivní Parametry
                  </h3>
                  
                  <div className="space-y-8">
                    {report.skills.map((skill, i) => (
                      <SkillBar key={i} skill={skill} index={i} />
                    ))}
                  </div>
                  
                  <div className="mt-12 p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-start gap-5">
                     <div className="w-10 h-10 bg-indigo-600 rounded-xl flex shrink-0 items-center justify-center text-white shadow-lg">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                     </div>
                     <div>
                        <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">Syntéza profilu</p>
                        <p className="text-sm text-slate-600 leading-relaxed font-medium">Váš styl uvažování vykazuje silnou orientaci na strukturální logiku s kreativním přesahem.</p>
                     </div>
                  </div>
                </div>

                <div className="bg-slate-900 text-slate-400 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                  <h3 className="text-xs font-bold text-white/40 uppercase tracking-[0.2em] mb-6">Metodika Q2</h3>
                  <code className="block bg-black/30 p-5 rounded-2xl text-[11px] font-mono text-indigo-400 border border-white/5 break-all leading-relaxed">
                    {report.researchBlock}
                  </code>
                  <button 
                    onClick={() => window.location.reload()}
                    className="mt-10 w-full py-4 bg-white text-slate-900 font-bold rounded-2xl hover:bg-slate-100 transition-all flex items-center justify-center gap-3 active:scale-95"
                  >
                    Nová diagnostika
                  </button>
                </div>
              </div>

              {/* Right Column: Detailed Analysis */}
              <div className="lg:col-span-7 bg-white p-12 rounded-[2.5rem] shadow-xl border border-slate-100 relative h-fit">
                <div className="absolute top-8 right-8 text-indigo-100">
                   <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  </svg>
                </div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-10 border-b border-slate-50 pb-4">
                  Slovní analýza
                </h3>
                <div className="prose-academic max-w-none">
                  <ReactMarkdown>{report.studentPassport}</ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-10 px-8 opacity-40 hover:opacity-100 transition-opacity">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em] gap-6">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_8px_#22c55e]"></span>
            Diagnostic Session Active
          </div>
          <p>© 2024 University Research Hub</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-indigo-600 transition-colors">GDPR</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Methodology</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
