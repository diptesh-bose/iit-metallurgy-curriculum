import { useState } from "react";
import { ChevronDown, ChevronRight, BookOpen, FlaskConical, Wrench, Star, ExternalLink } from "lucide-react";
import type { Semester, Course } from "../../data/curriculum";

interface Props {
  semester: Semester;
  isActive: boolean;
}

const typeConfig = {
  core: { label: "Core", color: "bg-blue-500/20 text-blue-300 border-blue-500/30", icon: BookOpen },
  elective: { label: "Elective", color: "bg-purple-500/20 text-purple-300 border-purple-500/30", icon: Star },
  lab: { label: "Lab", color: "bg-green-500/20 text-green-300 border-green-500/30", icon: FlaskConical },
  project: { label: "Project", color: "bg-amber-500/20 text-amber-300 border-amber-500/30", icon: Wrench },
};

function CourseCard({ course }: { course: Course }) {
  const [expanded, setExpanded] = useState(false);
  const cfg = typeConfig[course.type];
  const Icon = cfg.icon;

  return (
    <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl overflow-hidden hover:border-slate-600 transition-colors">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-4 flex items-start gap-3"
      >
        <div className="mt-0.5">
          {expanded ? (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronRight className="w-4 h-4 text-slate-400" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-xs font-mono text-slate-500">{course.code}</span>
            <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border ${cfg.color}`}>
              <Icon className="w-3 h-3" />
              {cfg.label}
            </span>
            <span className="text-xs text-slate-500">{course.credits} credits</span>
          </div>
          <h3 className="font-semibold text-slate-100">{course.title}</h3>
          <p className="text-sm text-slate-400 mt-1 line-clamp-2">{course.description}</p>
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-4 border-t border-slate-700/50 pt-3 space-y-4">
          <div>
            <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">Topics Covered</h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-1">
              {course.topics.map((topic, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                  <span className="text-amber-400 mt-0.5 flex-shrink-0">›</span>
                  {topic}
                </li>
              ))}
            </ul>
          </div>

          {course.references.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">Global References</h4>
              <div className="flex flex-wrap gap-2">
                {course.references.map((ref, i) => (
                  <div key={i} className="flex items-center gap-1.5 bg-slate-700/50 border border-slate-600/50 rounded-lg px-3 py-1.5">
                    <ExternalLink className="w-3 h-3 text-slate-400 flex-shrink-0" />
                    <div>
                      <span className="text-xs font-medium text-slate-200">{ref.institution}</span>
                      {(ref.course || ref.resource) && (
                        <span className="text-xs text-slate-400 ml-1">— {ref.course || ref.resource}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function SemesterView({ semester, isActive }: Props) {
  const totalCredits = semester.courses.reduce((sum, c) => sum + c.credits, 0);
  const coreCourses = semester.courses.filter(c => c.type === "core" || c.type === "lab" || c.type === "project");
  const electiveCourses = semester.courses.filter(c => c.type === "elective");

  if (!isActive) return null;

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/5 border border-amber-500/20 rounded-xl p-4">
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-xl font-bold text-amber-300">
              Semester {semester.semester} — Year {semester.year}
            </h2>
            <p className="text-slate-300 mt-1 font-medium">{semester.theme}</p>
          </div>
          <div className="flex gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-400">{semester.courses.length}</div>
              <div className="text-slate-400">Courses</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-400">{totalCredits}</div>
              <div className="text-slate-400">Credits</div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {coreCourses.map(course => (
          <CourseCard key={course.code} course={course} />
        ))}
        {electiveCourses.map(course => (
          <CourseCard key={course.code} course={course} />
        ))}
      </div>
    </div>
  );
}
