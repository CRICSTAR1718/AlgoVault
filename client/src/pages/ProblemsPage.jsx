import { useState } from "react";
import { useProblems } from "../hooks/useProblems";
import { Search, Filter, ExternalLink, Trash2, Edit3, AlertTriangle } from "lucide-react";

function ProblemsPage() {
  const { problems, deleteProblem } = useProblems();
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredProblems = problems.filter((p) => {
    const matchesSearch = p.problemName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.pattern.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = difficultyFilter === "All" || p.difficulty === difficultyFilter;
    const matchesStatus = statusFilter === "All" || p.status === statusFilter;
    
    return matchesSearch && matchesDifficulty && matchesStatus;
  });

  const getDifficultyColor = (diff) => {
    switch(diff) {
      case "Easy": return "text-dash-success bg-dash-success/10 border-dash-success/20";
      case "Medium": return "text-dash-warning bg-dash-warning/10 border-dash-warning/20";
      case "Hard": return "text-dash-danger bg-dash-danger/10 border-dash-danger/20";
      default: return "text-dash-text bg-dash-surface border-dash-border";
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-dash-text mb-2 tracking-tight">Problem Log</h1>
          <p className="text-dash-text-muted">Every problem you've tackled, stored in one place.</p>
        </div>
        <div className="bg-dash-surface px-4 py-2 rounded-lg border border-dash-border text-sm font-medium">
          <span className="text-dash-text">{problems.length}</span> <span className="text-dash-text-muted">problems</span>
        </div>
      </div>

      <div className="bg-dash-surface border border-dash-border rounded-xl p-4 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-dash-text-muted" size={18} />
          <input 
            type="text"
            placeholder="Search by name, topic, or pattern..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-dash-bg border border-dash-border rounded-lg pl-10 pr-4 py-2 text-dash-text focus:outline-none focus:border-dash-accent transition-all text-sm"
          />
        </div>
        
        <div className="flex gap-4">
          <select 
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="bg-dash-bg border border-dash-border rounded-lg px-4 py-2 text-dash-text focus:outline-none focus:border-dash-accent transition-all text-sm appearance-none min-w-[140px]"
          >
            <option value="All">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-dash-bg border border-dash-border rounded-lg px-4 py-2 text-dash-text focus:outline-none focus:border-dash-accent transition-all text-sm appearance-none min-w-[140px]"
          >
            <option value="All">All Statuses</option>
            <option value="Solved">Solved</option>
            <option value="Not Solved">Not Solved</option>
            <option value="Revision">Revision</option>
          </select>
        </div>
      </div>

      {filteredProblems.length === 0 ? (
        <div className="border border-dash-border border-dashed rounded-xl p-12 flex flex-col items-center justify-center text-center bg-dash-surface/50">
          <div className="w-16 h-16 bg-dash-surface rounded-full flex items-center justify-center mb-4 border border-dash-border">
            <Filter className="text-dash-text-muted" size={24} />
          </div>
          <h3 className="text-xl font-bold text-dash-text mb-2">No problems found</h3>
          <p className="text-dash-text-muted max-w-md">
            You haven't tracked any problems matching your filters. Try adjusting them or start by adding a new problem!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProblems.map((problem) => (
            <div key={problem._id || problem.id} className="bg-dash-surface border border-dash-border rounded-xl p-6 hover:border-dash-accent/50 transition-colors group relative flex flex-col">
              
              {problem.mistake && (
                <div className="absolute -top-3 -right-3 bg-dash-bg border border-dash-danger rounded-full p-1.5 text-dash-danger shadow-sm" title="Mistake made">
                  <AlertTriangle size={14} />
                </div>
              )}

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
                {problem.pattern && (
                  <span className="text-xs px-2.5 py-1 rounded-full bg-dash-surface-hover text-dash-text-muted font-medium border border-dash-border">
                    {problem.pattern}
                  </span>
                )}
              </div>

              {problem.keyIdea && (
                <div className="bg-dash-bg rounded-lg p-3 text-sm text-dash-text-muted italic mb-4 line-clamp-2 border border-dash-border/50 flex-1">
                  "{problem.keyIdea}"
                </div>
              )}
              
              {!problem.keyIdea && <div className="flex-1"></div>}

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-dash-border">
                <div className="text-xs text-dash-text-muted flex gap-3">
                  <span>{problem.status}</span>
                  <span className="text-dash-border">•</span>
                  <span>{problem.attempts} attempts</span>
                </div>
                
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                  <button onClick={() => deleteProblem(problem._id || problem.id)} className="text-dash-text-muted hover:text-dash-danger transition-colors p-1">
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

export default ProblemsPage;
