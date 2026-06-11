import { useState } from "react";
import { Atom, BookOpen, Microscope, Sparkles, LayoutDashboard, ChevronLeft, ChevronRight } from "lucide-react";
import { curriculumData, researchAreas } from "./data/curriculum";
import SemesterView from "./components/curriculum/SemesterView";
import ResearchView from "./components/curriculum/ResearchView";
import AIRefresh from "./components/curriculum/AIRefresh";
import OverviewPanel from "./components/curriculum/OverviewPanel";

type Tab = "overview" | "curriculum" | "research" | "ai";

const NAV_TABS = [
  { id: "overview" as Tab, label: "Overview", icon: LayoutDashboard },
  { id: "curriculum" as Tab, label: "Curriculum", icon: BookOpen },
  { id: "research" as Tab, label: "Research", icon: Microscope },
  { id: "ai" as Tab, label: "AI Refresh", icon: Sparkles },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [activeSemester, setActiveSemester] = useState(1);
  const [apiKey, setApiKey] = useState(() => {
    try { return localStorage.getItem("anthropic_key") || ""; } catch { return ""; }
  });

  const handleApiKeySet = (key: string) => {
    setApiKey(key);
    try { localStorage.setItem("anthropic_key", key); } catch {}
  };

  const totalCourses = curriculumData.reduce((sum, s) => sum + s.courses.length, 0);
  const totalCredits = curriculumData.reduce(
    (sum, s) => sum + s.courses.reduce((cs, c) => cs + c.credits, 0),
    0
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
                <Atom className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <div className="font-bold text-slate-100 leading-tight text-sm">IIT Metallurgy & Materials</div>
                <div className="text-xs text-slate-500">B.Tech. Curriculum · AI-Powered</div>
              </div>
            </div>

            <nav className="flex items-center gap-1">
              {NAV_TABS.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      activeTab === tab.id
                        ? "bg-amber-500/15 text-amber-400"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="hidden md:flex items-center gap-4 text-xs text-slate-500">
              <span>{totalCourses} courses</span>
              <span>{totalCredits} credits</span>
              <span>8 semesters</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === "overview" && <OverviewPanel />}

        {activeTab === "curriculum" && (
          <div className="flex flex-col lg:flex-row gap-5">
            <aside className="lg:w-52 flex-shrink-0">
              <div className="lg:sticky lg:top-20">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-1">
                  Semesters
                </div>
                <div className="space-y-1">
                  {curriculumData.map(sem => {
                    const credits = sem.courses.reduce((s, c) => s + c.credits, 0);
                    return (
                      <button
                        key={sem.semester}
                        onClick={() => setActiveSemester(sem.semester)}
                        className={`w-full text-left px-3 py-2.5 rounded-xl transition-all ${
                          activeSemester === sem.semester
                            ? "bg-amber-500/15 border border-amber-500/30 text-amber-300"
                            : "hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-transparent"
                        }`}
                      >
                        <div className="font-medium text-sm">Semester {sem.semester}</div>
                        <div className="text-xs opacity-60 mt-0.5">
                          Year {sem.year} · {credits} cr
                        </div>
                      </button>
                    );
                  })}
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => setActiveSemester(Math.max(1, activeSemester - 1))}
                    disabled={activeSemester === 1}
                    className="flex-1 flex items-center justify-center gap-1 px-2 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg text-xs text-slate-300 transition-colors"
                  >
                    <ChevronLeft className="w-3 h-3" /> Prev
                  </button>
                  <button
                    onClick={() => setActiveSemester(Math.min(8, activeSemester + 1))}
                    disabled={activeSemester === 8}
                    className="flex-1 flex items-center justify-center gap-1 px-2 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg text-xs text-slate-300 transition-colors"
                  >
                    Next <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </aside>

            <div className="flex-1 min-w-0">
              {curriculumData.map(sem => (
                <SemesterView
                  key={sem.semester}
                  semester={sem}
                  isActive={activeSemester === sem.semester}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === "research" && <ResearchView areas={researchAreas} />}

        {activeTab === "ai" && (
          <AIRefresh apiKey={apiKey} onApiKeySet={handleApiKeySet} />
        )}
      </main>

      <footer className="border-t border-slate-800 mt-12 py-4">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between text-xs text-slate-600">
          <span>IIT Metallurgy & Materials B.Tech. Curriculum</span>
          <span>Benchmarked: MIT · Cambridge · ETH Zurich · Stanford · IITs</span>
        </div>
      </footer>
    </div>
  );
}
