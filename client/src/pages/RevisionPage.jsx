import { useProblems } from "../hooks/useProblems";
import { ExternalLink, Trash2, CheckCircle, AlertTriangle, Play } from "lucide-react";
import { Link } from "react-router-dom";

function RevisionPage() {
  const { problems, deleteProblem, updateProblem } = useProblems();

  const revisionProblems = problems
    .filter((p) => p.mistake || p.status === "Revision")
    .sort((a, b) => new Date(b.dateSolved) - new Date(a.dateSolved));

  const getDifficultyColor = (diff) => {
    switch(diff) {
      case "Easy": return "text-dash-success bg-dash-success/10 border-dash-success/20";
      case "Medium": return "text-dash-warning bg-dash-warning/10 border-dash-warning/20";
      case "Hard": return "text-dash-danger bg-dash-danger/10 border-dash-danger/20";
      default: return "text-dash-text bg-dash-surface border-dash-border";
    }
  };

  const markAsMastered = (id) => {
    updateProblem(id, { mistake: false, status: "Solved" });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold text-dash-text tracking-tight">Revision Queue</h1>
          <span className="bg-dash-surface border border-dash-border text-dash-accent text-xs font-bold px-2.5 py-1 rounded-full">
            {revisionProblems.length} items
          </span>
        </div>
        <p className="text-dash-text-muted max-w-2xl">
          Focus on problems where you made mistakes or marked for later review. Spaced repetition is key to pattern recognition.
        </p>
      </div>

      {revisionProblems.length === 0 ? (
        <div className="border border-dash-border border-dashed rounded-xl p-16 flex flex-col items-center justify-center text-center bg-dash-surface/50">
          <div className="w-16 h-16 bg-dash-surface rounded-full flex items-center justify-center mb-6 border border-dash-border">
            <CheckCircle className="text-dash-accent" size={28} />
          </div>
          <h3 className="text-2xl font-bold text-dash-text mb-2">You're all caught up!</h3>
          <p className="text-dash-text-muted max-w-md mb-8">
            Your revision queue is empty. Great job!
          </p>
          <Link
            to="/add-problem"
            className="bg-dash-surface border border-dash-border hover:bg-dash-surface-hover text-dash-text font-medium py-2.5 px-6 rounded-lg transition-colors"
          >
            Track New Problem
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {revisionProblems.map((problem) => (
            <div key={problem._id || problem.id} className="bg-dash-surface border border-dash-danger/30 rounded-xl p-6 hover:border-dash-danger transition-colors group relative flex flex-col shadow-[0_0_15px_rgba(239,68,68,0.05)]">
              
              <div className="absolute -top-3 -right-3 bg-dash-bg border border-dash-danger rounded-full p-1.5 text-dash-danger shadow-sm">
                <AlertTriangle size={14} />
              </div>

              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-dash-text mb-1 truncate pr-4" title={problem.problemName}>
                    {problem.problemName}
                  </h3>
                  <div className="text-xs font-medium text-dash-text-muted bg-dash-bg inline-block px-2 py-1 rounded border border-dash-border">
                    {problem.platform}
                  </div>
                </div>
                
                {problem.link && (
                  <a href={problem.link} target="_blank" rel="noreferrer" className="text-dash-text-muted hover:text-dash-accent transition-colors p-1">
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
              
              <div className="flex gap-2 mb-4 flex-wrap">
                <span className={`text-xs px-2.5 py-1 rounded-full border ${getDifficultyColor(problem.difficulty)} font-medium`}>
                  {problem.difficulty}
                </span>
                {problem.topic && (
                  <span className="text-xs px-2.5 py-1 rounded-full bg-dash-surface-hover text-dash-text-muted font-medium border border-dash-border">
                    {problem.topic}
                  </span>
                )}
              </div>

              {problem.keyIdea && (
                <div className="bg-dash-danger/10 border border-dash-danger/20 rounded-lg p-3 text-sm text-dash-text-muted italic mb-4 line-clamp-3 flex-1">
                  <span className="font-semibold text-dash-danger not-italic block mb-1 text-xs">Note to self:</span>
                  {problem.keyIdea}
                </div>
              )}
              
              {!problem.keyIdea && <div className="flex-1"></div>}

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-dash-border">
                <div className="text-xs text-dash-text-muted flex items-center gap-2">
                  <Play size={12} className="text-dash-warning" />
                  <span>{problem.attempts} past attempts</span>
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => markAsMastered(problem._id || problem.id)} 
                    className="text-xs font-medium bg-dash-success/10 hover:bg-dash-success/20 text-dash-success border border-dash-success/20 px-3 py-1.5 rounded transition-colors"
                  >
                    Mastered
                  </button>
                  <button onClick={() => deleteProblem(problem._id || problem.id)} className="text-dash-text-muted hover:text-dash-danger transition-colors p-1.5">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RevisionPage;
