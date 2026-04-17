import { useProblems } from "../hooks/useProblems";
import { Link } from "react-router-dom";
import { CheckCircle2, Activity, Clock, AlertTriangle, Target } from "lucide-react";

function StatCard({ title, value, subtext, icon: Icon, colorClass, borderColorClass }) {
  return (
    <div className={`bg-dash-surface rounded-xl p-6 border ${borderColorClass} flex flex-col justify-between`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm font-medium text-dash-text-muted">{title}</h3>
        <Icon size={18} className={colorClass} />
      </div>
      <div>
        <div className={`text-4xl font-bold mb-1 ${colorClass}`}>{value}</div>
        <div className="text-xs text-dash-text-muted">{subtext}</div>
      </div>
      {title === "Solve Rate" && (
        <div className="mt-4 h-1.5 w-full bg-dash-border rounded-full overflow-hidden">
          <div className="h-full bg-dash-accent transition-all duration-500" style={{ width: value }}></div>
        </div>
      )}
    </div>
  );
}

function DashboardPage() {
  const { problems } = useProblems();

  const totalTracked = problems.length;
  const totalSolved = problems.filter((p) => p.status === "Solved").length;
  const solveRate = totalTracked > 0 ? Math.round((totalSolved / totalTracked) * 100) : 0;
  const needsRevision = problems.filter((p) => p.status === "Revision" || p.mistake).length;
  const mistakesMade = problems.filter((p) => p.mistake).length;

  const easySolved = problems.filter((p) => p.difficulty === "Easy" && p.status === "Solved").length;
  const mediumSolved = problems.filter((p) => p.difficulty === "Medium" && p.status === "Solved").length;
  const hardSolved = problems.filter((p) => p.difficulty === "Hard" && p.status === "Solved").length;

  const totalEasy = problems.filter((p) => p.difficulty === "Easy").length;
  const totalMedium = problems.filter((p) => p.difficulty === "Medium").length;
  const totalHard = problems.filter((p) => p.difficulty === "Hard").length;

  const easyPercent = totalEasy > 0 ? (easySolved / totalEasy) * 100 : 0;
  const mediumPercent = totalMedium > 0 ? (mediumSolved / totalMedium) * 100 : 0;
  const hardPercent = totalHard > 0 ? (hardSolved / totalHard) * 100 : 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-dash-text mb-2 tracking-tight">Welcome back</h1>
        <p className="text-dash-text-muted">Here's your DSA progress at a glance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Solved"
          value={totalSolved}
          subtext={`Out of ${totalTracked} tracked`}
          icon={CheckCircle2}
          colorClass="text-dash-accent"
          borderColorClass="border-dash-accent/20"
        />
        <StatCard
          title="Solve Rate"
          value={`${solveRate}%`}
          subtext=" "
          icon={Activity}
          colorClass="text-white"
          borderColorClass="border-dash-border"
        />
        <StatCard
          title="Needs Revision"
          value={needsRevision}
          subtext="Problems to revisit"
          icon={Clock}
          colorClass="text-dash-danger"
          borderColorClass="border-dash-danger/20"
        />
        <StatCard
          title="Mistakes Made"
          value={mistakesMade}
          subtext="Learn and improve"
          icon={AlertTriangle}
          colorClass="text-dash-success"
          borderColorClass="border-dash-success/20"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-dash-surface rounded-xl p-6 border border-dash-border">
          <h2 className="text-lg font-semibold text-dash-text mb-1">Difficulty Distribution</h2>
          <p className="text-sm text-dash-text-muted mb-8">Problems solved categorized by difficulty level</p>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-dash-success font-medium">Easy</span>
                <span className="text-dash-text-muted">{easySolved} solved</span>
              </div>
              <div className="w-full bg-dash-border h-2 rounded-full overflow-hidden">
                <div className="bg-dash-success h-full transition-all duration-500" style={{ width: `${easyPercent}%` }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-dash-warning font-medium">Medium</span>
                <span className="text-dash-text-muted">{mediumSolved} solved</span>
              </div>
              <div className="w-full bg-dash-border h-2 rounded-full overflow-hidden">
                <div className="bg-dash-warning h-full transition-all duration-500" style={{ width: `${mediumPercent}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-dash-danger font-medium">Hard</span>
                <span className="text-dash-text-muted">{hardSolved} solved</span>
              </div>
              <div className="w-full bg-dash-border h-2 rounded-full overflow-hidden">
                <div className="bg-dash-danger h-full transition-all duration-500" style={{ width: `${hardPercent}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-dash-surface rounded-xl p-8 border border-dash-border flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-dash-surface-hover rounded-full flex items-center justify-center mb-4">
            <Target className="text-dash-accent" size={32} />
          </div>
          <h2 className="text-xl font-bold text-dash-text mb-2">Keep the momentum going</h2>
          <p className="text-sm text-dash-text-muted mb-8 leading-relaxed">
            The best way to master DSA is consistency. Track your next problem now.
          </p>
          <Link
            to="/add-problem"
            className="w-full bg-dash-accent hover:bg-dash-accent-hover text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            Track New Problem
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
