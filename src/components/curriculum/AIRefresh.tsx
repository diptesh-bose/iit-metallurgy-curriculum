import { useState } from "react";
import { Sparkles, RefreshCw, AlertCircle, CheckCircle2, X, Key } from "lucide-react";
import MarkdownContent from "./MarkdownContent";

type RefreshMode = "topic" | "research" | "industry" | "custom";

const REFRESH_PROMPTS: Record<RefreshMode, { label: string; description: string; prompt: string }> = {
  topic: {
    label: "Latest in a Topic",
    description: "Get the most recent developments in a specific materials science topic",
    prompt:
      "You are a leading materials science professor. Summarize the most recent (2023–2025) advances in [TOPIC] for an IIT B.Tech. Metallurgy student. Structure your response in Markdown with sections: ## What's New, ## Key Discoveries, ## Impact on Curriculum, ## Emerging Research Questions. Be precise, cite approximate dates/years, and keep it under 600 words.",
  },
  research: {
    label: "New Research Area",
    description: "Explore an emerging research area not yet in the curriculum",
    prompt:
      "You are a materials science research advisor. Describe the emerging research area of [TOPIC] for inclusion in an IIT Metallurgy B.Tech. curriculum. Use Markdown with: ## Overview, ## Core Concepts, ## Why It Matters, ## Global Leaders (labs/institutions), ## Recommended Prerequisites, ## Open Problems. Keep it under 700 words.",
  },
  industry: {
    label: "Industry Trends",
    description: "Connect curriculum topics to current industry needs",
    prompt:
      "You are a senior metallurgist with industry experience. For an IIT Metallurgy B.Tech. graduate entering the field of [TOPIC], describe current industry needs, skills gap, and how the curriculum should evolve. Use Markdown: ## Industry Landscape, ## Skills in Demand, ## Curriculum Gaps, ## Recommended Additions. Under 600 words.",
  },
  custom: {
    label: "Custom Query",
    description: "Ask anything about the metallurgy curriculum or materials science",
    prompt: "[TOPIC]",
  },
};

interface Props {
  apiKey: string;
  onApiKeySet: (key: string) => void;
}

export default function AIRefresh({ apiKey, onApiKeySet }: Props) {
  const [mode, setMode] = useState<RefreshMode>("topic");
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showKeyInput, setShowKeyInput] = useState(!apiKey);
  const [tempKey, setTempKey] = useState("");

  const handleRefresh = async () => {
    if (!apiKey || !userInput.trim()) return;
    setLoading(true);
    setResult(null);
    setError(null);

    const config = REFRESH_PROMPTS[mode];
    const prompt = mode === "custom"
      ? userInput
      : config.prompt.replace("[TOPIC]", userInput);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "content-type": "application/json",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1024,
          messages: [{ role: "user", content: prompt }],
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error?.message || `HTTP ${response.status}`);
      }

      const data = await response.json();
      setResult(data.content[0].text);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/5 border border-emerald-500/20 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-5 h-5 text-emerald-400" />
          <h2 className="text-xl font-bold text-emerald-300">AI Content Refresh</h2>
        </div>
        <p className="text-slate-300 text-sm">
          Powered by Claude. Query the latest research, emerging topics, and industry trends to keep the curriculum current.
        </p>
      </div>

      {/* API Key Section */}
      <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-medium text-slate-300">Anthropic API Key</span>
          </div>
          {apiKey && !showKeyInput && (
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <span className="text-xs text-green-400">Connected</span>
              <button
                onClick={() => setShowKeyInput(true)}
                className="text-xs text-slate-400 hover:text-slate-200 underline ml-2"
              >
                Change
              </button>
            </div>
          )}
        </div>

        {showKeyInput ? (
          <div className="flex gap-2">
            <input
              type="password"
              value={tempKey}
              onChange={e => setTempKey(e.target.value)}
              placeholder="sk-ant-..."
              className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
            <button
              onClick={() => {
                onApiKeySet(tempKey);
                setShowKeyInput(false);
                setTempKey("");
              }}
              disabled={!tempKey.trim()}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white text-sm rounded-lg transition-colors"
            >
              Save
            </button>
          </div>
        ) : !apiKey ? (
          <p className="text-xs text-amber-400">Enter your Anthropic API key above to enable AI refresh.</p>
        ) : null}
      </div>

      {/* Mode Selection */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {(Object.entries(REFRESH_PROMPTS) as [RefreshMode, typeof REFRESH_PROMPTS[RefreshMode]][]).map(([key, cfg]) => (
          <button
            key={key}
            onClick={() => setMode(key)}
            className={`p-3 rounded-xl border text-left transition-all ${
              mode === key
                ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-300"
                : "bg-slate-800/40 border-slate-700/50 text-slate-400 hover:border-slate-600 hover:text-slate-200"
            }`}
          >
            <div className="font-medium text-sm mb-0.5">{cfg.label}</div>
            <div className="text-xs opacity-70 leading-tight">{cfg.description}</div>
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-3">
        <input
          type="text"
          value={userInput}
          onChange={e => setUserInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && !loading && handleRefresh()}
          placeholder={
            mode === "custom"
              ? "Ask anything about metallurgy, materials science, or the curriculum..."
              : "Enter topic (e.g. 'high entropy alloys', 'solid-state batteries', 'hydrogen metallurgy')"
          }
          className="flex-1 bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-sm"
        />
        <button
          onClick={handleRefresh}
          disabled={loading || !apiKey || !userInput.trim()}
          className="flex items-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors text-sm"
        >
          {loading ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
          {loading ? "Generating..." : "Refresh"}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/30 rounded-xl p-4">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-red-300">Error</p>
            <p className="text-sm text-red-400 mt-0.5">{error}</p>
          </div>
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="bg-slate-800/60 border border-emerald-500/20 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700/50">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-medium text-emerald-300">AI Response</span>
              <span className="text-xs text-slate-500">— claude-sonnet-4-6</span>
            </div>
            <button onClick={() => setResult(null)} className="text-slate-500 hover:text-slate-300">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="p-5">
            <MarkdownContent content={result} />
          </div>
        </div>
      )}
    </div>
  );
}
