import React, { useState } from 'react';
import { BookOpen, Clock, Tag, ArrowRight, X, Sparkles, User } from 'lucide-react';

export const BlogPage: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const articles = [
    {
      id: 'art-1',
      title: 'The Mathematics of Silent Burnout: Modeling PR Latency & On-Call Fatigue',
      category: 'Engineering Research',
      date: 'October 14, 2026',
      readTime: '6 min read',
      author: 'Dr. Sarah Chen',
      authorRole: 'Principal Systems Architect',
      excerpt:
        'Why senior engineers rarely voice exhaustion before submitting resignations, and how algorithmic telemetry in PR turnaround cycles provides a 30-day early warning.',
      content: `### Executive Summary\n\nTraditional engineering organizations rely on quarterly engagement surveys or informal 1:1 check-ins to monitor developer sentiment. However, our empirical analysis of over 40,000 developer-months reveals a critical flaw: 76% of high-performing senior engineers report that their deepest burnout occurred while giving positive or neutral feedback in surveys.\n\n### The Three Early Telemetry Indicators\n\n1. **PR Review Latency Inversion**: When a previously responsive engineer’s average turnaround time shifts from 3.2 hours to over 14 hours, it correlates with severe context-switching.\n2. **Off-Hours Commit Fragmentation**: A sudden transition to late-night commits (10:00 PM – 2:00 AM) indicates that daytime calendar blocks have been completely hijacked by meetings.\n3. **Consecutive On-Call Overhang**: Experiencing three or more P1/P2 incidents during an on-call rotation degrades cognitive performance for an average of 9 business days thereafter.\n\n### Practical Remediation\n\nBy establishing automated telemetry that flags these vectors early, managers can rebalance sprint tickets before delivery dates are compromised.`
    },
    {
      id: 'art-2',
      title: 'Why Spyware Trackers Kill 10x Developer Velocity: An Empirical Study',
      category: 'Culture & Privacy',
      date: 'October 08, 2026',
      readTime: '8 min read',
      author: 'Alexandra Wright',
      authorRole: 'CEO & Co-Founder',
      excerpt:
        'A comprehensive study on the destructive psychological effects of webcam surveillance and keystroke logging on high-trust engineering culture.',
      content: `### The Mirage of "Time Tracked"\n\nIn the wake of remote and hybrid work models, some companies turned to invasive screen-capture tools and keystroke logging. The data is now definitive: companies utilizing keystroke monitoring experience 4.8x higher voluntary attrition among top-quartile developers.\n\n### The Psychological Cost\n\nSoftware engineering is not assembly line labor; it is creative, high-dimensional problem solving. Forcing engineers to constantly demonstrate "active mouse movement" incentivizes trivial tasks and discourages deep reflection, architectural whiteboard thinking, and careful refactoring.\n\n### The Ethical Alternative\n\nWorkforce AI operates on an uncompromising zero-surveillance guarantee: only passive aggregate operational metadata is analyzed. When privacy is guaranteed, psychological safety flourishes.`
    },
    {
      id: 'art-3',
      title: 'Running Local Ollama AI on Port 11434 for Air-Gapped Telemetry',
      category: 'AI Architecture',
      date: 'September 28, 2026',
      readTime: '5 min read',
      author: 'David Okafor',
      authorRole: 'Senior Data Scientist',
      excerpt:
        'How to deploy enterprise workforce intelligence with Llama 3 on private VPCs without sending telemetry to public cloud LLMs.',
      content: `### Why Air-Gapped AI Matters\n\nIn heavily regulated domains—such as fintech, banking, defense, and healthcare—sending internal organizational telemetry and sprint velocity data to third-party public LLM endpoints is a compliance violation.\n\n### Leveraging Ollama in Production\n\nWith our native Ollama integration, teams can spin up lightweight 8B or 70B parameter models (such as Llama 3, Mistral, or Qwen 2.5) directly on an internal machine or GPU cluster.\n\nWorkforce AI automatically routes prompts and telemetry context to \`http://127.0.0.1:11434\`, providing sub-second reasoning while keeping 100% of the data within the organization's firewall.`
    },
    {
      id: 'art-4',
      title: 'The Cost of Broken Focus: How 30-Minute Syncs Shatter Deep Work',
      category: 'Productivity Science',
      date: 'September 15, 2026',
      readTime: '7 min read',
      author: 'Priya Patel',
      authorRole: 'VP of Product Operations',
      excerpt:
        'Analyzing how scattered 30-minute meetings destroy engineer focus, and how automated calendar defragmentation recovers 8+ hours a week.',
      content: `### The Context-Switching Tax\n\nCognitive neuroscience demonstrates that recovering from a task interruption takes an average of 23 minutes. When an engineer's calendar has two 30-minute meetings separated by a 45-minute gap, that entire 2-hour window is effectively lost to productive code generation.\n\n### Focus Shield Clustering\n\nWorkforce AI introduces automated meeting clustering, grouping disparate 1:1s and project check-ins into consolidated afternoon windows, preserving mornings exclusively for unbroken deep work.`
    }
  ];

  const categories = ['All', 'Engineering Research', 'Culture & Privacy', 'AI Architecture', 'Productivity Science'];

  const filteredArticles = activeCategory === 'All'
    ? articles
    : articles.filter(a => a.category === activeCategory);

  return (
    <div className="py-16 md:py-24 bg-navy-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest font-mono">
            Research & Thought Leadership
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mt-3">
            The Workforce AI Journal
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-4">
            Empirical research, mathematical models, and engineering perspectives on productivity, cognitive fatigue, and ethical AI.
          </p>

          {/* Category Tabs */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-glow-sm'
                    : 'bg-navy-900/60 text-slate-400 hover:text-white border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredArticles.map((art) => (
            <div
              key={art.id}
              onClick={() => setSelectedArticle(art)}
              className="p-8 rounded-3xl bg-navy-900/50 border border-white/10 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-mono text-[10px]">
                    {art.category}
                  </span>
                  <span className="flex items-center gap-1 font-mono text-[11px]">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    {art.readTime}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors leading-tight mb-3">
                  {art.title}
                </h3>

                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                  {art.excerpt}
                </p>
              </div>

              <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-white">{art.author}</div>
                  <div className="text-[10px] text-slate-500">{art.authorRole}</div>
                </div>

                <span className="text-xs font-semibold text-cyan-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Reader Modal */}
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md">
            <div className="w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl bg-navy-900 border border-cyan-500/40 shadow-2xl p-6 sm:p-10 relative">
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-6 right-6 p-2 rounded-xl bg-navy-950 border border-white/10 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono mb-2">
                <span>{selectedArticle.category}</span>
                <span>•</span>
                <span>{selectedArticle.readTime}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 leading-tight">
                {selectedArticle.title}
              </h2>

              <div className="flex items-center gap-3 pb-6 border-b border-white/10 mb-6 text-xs text-slate-400">
                <span className="font-semibold text-white">{selectedArticle.author}</span>
                <span>({selectedArticle.authorRole})</span>
                <span>•</span>
                <span>{selectedArticle.date}</span>
              </div>

              <div className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line space-y-4">
                {selectedArticle.content}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors"
                >
                  Close Article
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
