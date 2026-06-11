import { useState } from "react";
import { Microscope, Globe, Lightbulb, FileText, ChevronDown, ChevronRight } from "lucide-react";
import type { ResearchArea } from "../../data/curriculum";

interface Props {
  areas: ResearchArea[];
}

function ResearchCard({ area }: { area: ResearchArea }) {
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<"topics" | "labs" | "problems" | "papers">("topics");

  const tabs = [
    { id: "topics" as const, label: "Sub-Topics", icon: Microscope },
    { id: "labs" as const, label: "Global Labs", icon: Globe },
    { id: "problems" as const, label: "Open Problems", icon: Lightbulb },
    { id: "papers" as const, label: "Key Papers", icon: FileText },
  ];

  return (
    <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl overflow-hidden hover:border-amber-500/30 transition-all">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-5 flex items-start gap-3"
      >
        <div className="mt-1">
          {expanded ? (
            <ChevronDown className="w-5 h-5 text-amber-400" />
          ) : (
            <ChevronRight className="w-5 h-5 text-slate-400" />
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-slate-100 group-hover:text-amber-300 transition-colors">
            {area.title}
          </h3>
          <p className="text-sm text-slate-400 mt-1">{area.description}</p>
          <div className="flex gap-4 mt-3 text-xs text-slate-500">
            <span>{area.subTopics.length} sub-topics</span>
            <span>{area.globalLabs.length} global labs</span>
            <span>{area.openProblems.length} open problems</span>
          </div>
        </div>
      </button>

      {expanded && (
        <div className="border-t border-slate-700/50">
          <div className="flex border-b border-slate-700/50 overflow-x-auto">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? "text-amber-400 border-b-2 border-amber-400 bg-amber-400/5"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="p-5">
            {activeTab === "topics" && (
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {area.subTopics.map((t, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="text-amber-400 mt-0.5 flex-shrink-0">●</span>
                    {t}
                  </li>
                ))}
              </ul>
            )}

            {activeTab === "labs" && (
              <div className="space-y-3">
                {area.globalLabs.map((lab, i) => (
                  <div key={i} className="bg-slate-700/40 border border-slate-600/40 rounded-lg p-3">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <div>
                        <span className="font-semibold text-amber-300 text-sm">{lab.institution}</span>
                        <p className="text-slate-300 text-sm">{lab.lab}</p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">Focus: {lab.focus}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "problems" && (
              <ul className="space-y-2">
                {area.openProblems.map((p, i) => (
                  <li key={i} className="flex items-start gap-3 p-3 bg-slate-700/30 rounded-lg">
                    <span className="flex-shrink-0 w-6 h-6 bg-amber-500/20 text-amber-400 rounded-full flex items-center justify-center text-xs font-bold">
                      {i + 1}
                    </span>
                    <span className="text-sm text-slate-300">{p}</span>
                  </li>
                ))}
              </ul>
            )}

            {activeTab === "papers" && (
              <ul className="space-y-2">
                {area.keyPapers.map((paper, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-300 p-2 border border-slate-700/50 rounded-lg hover:border-slate-600 transition-colors">
                    <FileText className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span className="font-mono text-xs leading-relaxed">{paper}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ResearchView({ areas }: Props) {
  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-violet-500/10 to-indigo-500/5 border border-violet-500/20 rounded-xl p-5">
        <h2 className="text-xl font-bold text-violet-300 mb-1">Active Research Frontiers</h2>
        <p className="text-slate-300 text-sm">
          Cutting-edge research areas aligned with global labs, open problems, and seminal literature.
          Each area maps to final-year electives and B.Tech. project topics.
        </p>
      </div>
      <div className="space-y-3">
        {areas.map(area => (
          <ResearchCard key={area.id} area={area} />
        ))}
      </div>
    </div>
  );
}
