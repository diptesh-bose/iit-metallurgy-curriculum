import { GraduationCap, Globe, Atom, Cpu, Award, BookMarked } from "lucide-react";

const globalInstitutions = [
  { name: "MIT", country: "USA", rank: "#1", highlight: "Materials Science & Engineering" },
  { name: "Stanford University", country: "USA", rank: "#2", highlight: "Computational Materials" },
  { name: "University of Cambridge", country: "UK", rank: "#3", highlight: "Metallurgy & DoITPoMS" },
  { name: "ETH Zurich", country: "Switzerland", rank: "#4", highlight: "Functional Materials" },
  { name: "Caltech", country: "USA", rank: "#5", highlight: "Materials & Applied Physics" },
  { name: "Imperial College London", country: "UK", rank: "#6", highlight: "Structural & Energy Materials" },
  { name: "NUS Singapore", country: "Singapore", rank: "#8", highlight: "Advanced Manufacturing" },
  { name: "KAIST", country: "South Korea", rank: "#9", highlight: "Steel & Battery Materials" },
  { name: "POSTECH", country: "South Korea", rank: "#10", highlight: "Steel Metallurgy" },
  { name: "Tohoku University", country: "Japan", rank: "#11", highlight: "Superalloys & Magnets" },
  { name: "RWTH Aachen", country: "Germany", rank: "#12", highlight: "Process Metallurgy" },
  { name: "Delft University", country: "Netherlands", rank: "#13", highlight: "Aerospace Materials" },
  { name: "IISc Bangalore", country: "India", rank: "#1 India", highlight: "Characterization & Alloys" },
  { name: "IIT Bombay", country: "India", rank: "#2 India", highlight: "Nanomaterials & Processing" },
  { name: "IIT Madras", country: "India", rank: "#3 India", highlight: "Biomaterials & Welding" },
  { name: "IIT Kanpur", country: "India", rank: "#4 India", highlight: "Phase Transformations" },
  { name: "IIT Kharagpur", country: "India", rank: "#5 India", highlight: "Extractive Metallurgy" },
];

const programHighlights = [
  { icon: GraduationCap, title: "8 Semesters", description: "Structured 4-year B.Tech. program" },
  { icon: BookMarked, title: "40+ Courses", description: "Core, electives, labs & research project" },
  { icon: Atom, title: "Structure → Property", description: "From quantum to engineering scale" },
  { icon: Globe, title: "17 Global Institutions", description: "Curriculum benchmarked against world-class programs" },
  { icon: Cpu, title: "AI-Powered Updates", description: "Claude-driven content refresh for latest research" },
  { icon: Award, title: "Research Integration", description: "6 cutting-edge research frontiers with open problems" },
];

export default function OverviewPanel() {
  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="bg-gradient-to-br from-amber-500/15 via-orange-500/5 to-slate-900 border border-amber-500/20 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 bg-amber-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
            <Atom className="w-8 h-8 text-amber-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white leading-tight">
              B.Tech. Metallurgy & Materials Engineering
            </h1>
            <p className="text-amber-300 font-medium mt-0.5">Indian Institutes of Technology (IITs)</p>
            <p className="text-slate-300 text-sm mt-2 max-w-2xl">
              A world-class 4-year undergraduate program benchmarked against MIT, Cambridge, ETH Zurich, and top Asian institutions.
              Covering the full materials science spectrum: from quantum-mechanical foundations and crystal structure,
              through thermodynamics and kinetics, to advanced alloy design, computational methods, and sustainable processing.
            </p>
          </div>
        </div>
      </div>

      {/* Highlights */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {programHighlights.map((h, i) => {
          const Icon = h.icon;
          return (
            <div key={i} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 flex items-start gap-3">
              <div className="w-9 h-9 bg-amber-500/15 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <div className="font-semibold text-slate-200 text-sm">{h.title}</div>
                <div className="text-xs text-slate-400 mt-0.5">{h.description}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Curriculum Map */}
      <div>
        <h2 className="text-lg font-bold text-slate-200 mb-3">Semester Roadmap</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { sem: "1–2", year: "Year 1", theme: "Science & Maths Foundations", color: "border-blue-500/30 bg-blue-500/5" },
            { sem: "3–4", year: "Year 2", theme: "Crystallography, Thermodynamics & Kinetics", color: "border-green-500/30 bg-green-500/5" },
            { sem: "5–6", year: "Year 3", theme: "Processing, Alloys & Applications", color: "border-orange-500/30 bg-orange-500/5" },
            { sem: "7–8", year: "Year 4", theme: "Computation, Specialization & Research", color: "border-violet-500/30 bg-violet-500/5" },
          ].map((y, i) => (
            <div key={i} className={`border rounded-xl p-4 ${y.color}`}>
              <div className="text-xs text-slate-400 mb-1">{y.year} — Sem {y.sem}</div>
              <div className="text-sm font-semibold text-slate-200">{y.theme}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Global Institutions */}
      <div>
        <h2 className="text-lg font-bold text-slate-200 mb-3 flex items-center gap-2">
          <Globe className="w-5 h-5 text-amber-400" />
          Global Benchmark Institutions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {globalInstitutions.map((inst, i) => (
            <div key={i} className="flex items-center justify-between bg-slate-800/40 border border-slate-700/40 rounded-lg px-3 py-2.5">
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500 w-16 flex-shrink-0">{inst.rank}</span>
                <div>
                  <span className="text-sm font-medium text-slate-200">{inst.name}</span>
                  <span className="text-xs text-slate-500 ml-2">{inst.country}</span>
                </div>
              </div>
              <span className="text-xs text-amber-400/70 text-right ml-2 hidden md:block">{inst.highlight}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
