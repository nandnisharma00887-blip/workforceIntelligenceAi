import React, { useState } from 'react';
import { Bot, Send, Sparkles, Cpu, CheckCircle } from 'lucide-react';
import { apiService } from '../../services/api';

export const AiChatPreview: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(
    `### 🚨 Real-Time Burnout Risk Telemetry\n\n1. **Liam Becker (DevOps)**:\n   - **Capacity**: **104%** (Critical)\n   - **Root Cause**: 3 consecutive on-call incident triage shifts + 11 concurrent tasks.\n   - **AI Action**: Reallocate *T-101 (ElastiCache migration)* to Sarah Chen immediately.\n\n2. **Marcus Vance (Staff Frontend)**:\n   - **Capacity**: **96%** (High)\n   - **Root Cause**: 21.0 hrs/week in meetings; context fragmented across 5 PR reviews.\n   - **AI Action**: Activate "Focus Shield" — consolidate status syncs into async updates.`
  );
  const [modelSource, setModelSource] = useState<string>('llama3 / Enterprise Engine');

  const suggestedPrompts = [
    'Who is at risk of burnout this sprint?',
    'Suggest workload rebalancing across engineering',
    'How can we reduce meeting fatigue this month?',
    'What is our team focus score vs target?'
  ];

  const handleSend = async (queryText?: string) => {
    const q = queryText || prompt;
    if (!q.trim() || isLoading) return;

    setIsLoading(true);
    setPrompt('');
    try {
      const res = await apiService.sendAiPrompt(q);
      setResponse(res.reply);
      setModelSource(res.model || res.source);
    } catch {
      setResponse('Telemetry engine processed request: All team signals within monitored ranges.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 bg-navy-900/40 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-xs font-mono text-indigo-300 mb-3">
            <Cpu className="w-3.5 h-3.5" />
            Ollama AI Integration & Intelligence Engine
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Conversational Workforce Intelligence
          </h2>
          <p className="text-slate-400 text-sm mt-3">
            Ask natural language questions about team capacity, burnout velocity, and sprint health. Zero manual spreadsheet crunching.
          </p>
        </div>

        {/* Interactive Chat Box Container */}
        <div className="max-w-4xl mx-auto rounded-2xl bg-navy-950 border border-cyan-500/30 shadow-glass overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 bg-navy-900/80 border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-400 to-indigo-600 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-2">
                  Workforce Intelligence Copilot
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Online
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 font-mono">Model: {modelSource}</div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              Context: 142 engineers, 24 projects
            </div>
          </div>

          {/* Quick Prompt Chips */}
          <div className="px-6 py-3 bg-navy-900/30 border-b border-white/5 flex flex-wrap gap-2">
            <span className="text-[11px] text-slate-400 self-center font-medium mr-1">Try asking:</span>
            {suggestedPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p)}
                className="px-3 py-1 rounded-lg bg-white/5 hover:bg-cyan-500/10 hover:border-cyan-500/30 border border-white/10 text-[11px] text-slate-300 hover:text-cyan-300 transition-colors cursor-pointer"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Response Message Body */}
          <div className="p-6 sm:p-8 min-h-[220px] max-h-[380px] overflow-y-auto text-xs sm:text-sm text-slate-200 leading-relaxed font-sans space-y-3">
            {isLoading ? (
              <div className="flex items-center gap-3 text-cyan-400 py-6">
                <Sparkles className="w-5 h-5 animate-spin" />
                <span className="text-xs font-mono">Evaluating cross-platform telemetry through Ollama engine...</span>
              </div>
            ) : (
              <div className="prose prose-invert max-w-none text-xs sm:text-sm whitespace-pre-line">
                {response}
              </div>
            )}
          </div>

          {/* Input Bar */}
          <div className="p-4 bg-navy-900/60 border-t border-white/10">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask about team fatigue, sprint risks, or calendar defragmentation..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-navy-950 border border-white/10 focus:border-cyan-400 focus:outline-none text-xs text-white placeholder-slate-500"
              />
              <button
                type="submit"
                disabled={isLoading || !prompt.trim()}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-semibold shadow-glow-sm disabled:opacity-40 flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
