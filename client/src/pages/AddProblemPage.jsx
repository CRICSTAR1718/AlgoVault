import { useState } from "react";
import { useProblems } from "../hooks/useProblems";
import { CheckCircle } from "lucide-react";

function AddProblemPage() {
  const { addProblem } = useProblems();
  const [showToast, setShowToast] = useState(false);
  
  const [formData, setFormData] = useState({
    problemName: "",
    platform: "LeetCode",
    link: "",
    topic: "",
    pattern: "",
    difficulty: "Medium",
    status: "Solved",
    attempts: 1,
    dateSolved: new Date().toISOString().split('T')[0],
    mistake: false,
    keyIdea: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProblem(formData);
    
    // Show toast
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
    
    // Reset form
    setFormData({
      problemName: "",
      platform: "LeetCode",
      link: "",
      topic: "",
      pattern: "",
      difficulty: "Medium",
      status: "Solved",
      attempts: 1,
      dateSolved: new Date().toISOString().split('T')[0],
      mistake: false,
      keyIdea: ""
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500 relative">
      
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-8 right-8 bg-dash-surface border border-dash-border shadow-lg rounded-lg p-4 flex items-center gap-3 text-dash-text z-50 animate-in slide-in-from-top-4 fade-in">
          <CheckCircle className="text-dash-success" size={20} />
          <div>
            <p className="font-medium text-sm">Problem tracked successfully!</p>
          </div>
        </div>
      )}

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-dash-text mb-2 tracking-tight">Track a Problem</h1>
        <p className="text-dash-text-muted">Log your DSA practice to build your revision database.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-dash-surface rounded-xl p-8 border border-dash-border space-y-6">
        
        {/* Row 1 */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-dash-text-muted mb-1.5">Problem Name</label>
            <input 
              required
              name="problemName"
              value={formData.problemName}
              onChange={handleChange}
              type="text" 
              placeholder="e.g. Two Sum, LRU Cache..." 
              className="w-full bg-dash-bg border border-dash-border rounded-lg px-4 py-2.5 text-dash-text focus:outline-none focus:border-dash-accent focus:ring-1 focus:ring-dash-accent transition-all"
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-dash-text-muted mb-1.5">Platform</label>
            <select 
              name="platform"
              value={formData.platform}
              onChange={handleChange}
              className="w-full bg-dash-bg border border-dash-border rounded-lg px-4 py-2.5 text-dash-text focus:outline-none focus:border-dash-accent focus:ring-1 focus:ring-dash-accent transition-all appearance-none"
            >
              <option value="LeetCode">LeetCode</option>
              <option value="Codeforces">Codeforces</option>
              <option value="HackerRank">HackerRank</option>
              <option value="GeeksForGeeks">GeeksForGeeks</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-dash-text-muted mb-1.5">URL (Optional)</label>
            <input 
              name="link"
              value={formData.link}
              onChange={handleChange}
              type="url" 
              placeholder="https://..." 
              className="w-full bg-dash-bg border border-dash-border rounded-lg px-4 py-2.5 text-dash-text focus:outline-none focus:border-dash-accent focus:ring-1 focus:ring-dash-accent transition-all"
            />
          </div>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-dash-text-muted mb-1.5">Topic</label>
            <input 
              required
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              type="text" 
              placeholder="e.g. Array, Graph, DP..." 
              className="w-full bg-dash-bg border border-dash-border rounded-lg px-4 py-2.5 text-dash-text focus:outline-none focus:border-dash-accent focus:ring-1 focus:ring-dash-accent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-dash-text-muted mb-1.5">Pattern</label>
            <input 
              name="pattern"
              value={formData.pattern}
              onChange={handleChange}
              type="text" 
              placeholder="e.g. Sliding Window, BFS..." 
              className="w-full bg-dash-bg border border-dash-border rounded-lg px-4 py-2.5 text-dash-text focus:outline-none focus:border-dash-accent focus:ring-1 focus:ring-dash-accent transition-all"
            />
          </div>
        </div>

        {/* Row 4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-dash-text-muted mb-1.5">Difficulty</label>
            <select 
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="w-full bg-dash-bg border border-dash-border rounded-lg px-4 py-2.5 text-dash-text focus:outline-none focus:border-dash-accent focus:ring-1 focus:ring-dash-accent transition-all appearance-none"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-dash-text-muted mb-1.5">Status</label>
            <select 
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full bg-dash-bg border border-dash-border rounded-lg px-4 py-2.5 text-dash-text focus:outline-none focus:border-dash-accent focus:ring-1 focus:ring-dash-accent transition-all appearance-none"
            >
              <option value="Solved">Solved</option>
              <option value="Not Solved">Not Solved</option>
              <option value="Revision">Revision</option>
            </select>
          </div>
        </div>

        {/* Row 5 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-dash-text-muted mb-1.5">Attempts</label>
            <input 
              name="attempts"
              value={formData.attempts}
              onChange={handleChange}
              type="number" 
              min="1"
              className="w-full bg-dash-bg border border-dash-border rounded-lg px-4 py-2.5 text-dash-text focus:outline-none focus:border-dash-accent focus:ring-1 focus:ring-dash-accent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-dash-text-muted mb-1.5">Date Solved</label>
            <input 
              name="dateSolved"
              value={formData.dateSolved}
              onChange={handleChange}
              type="date" 
              className="w-full bg-dash-bg border border-dash-border rounded-lg px-4 py-2.5 text-dash-text focus:outline-none focus:border-dash-accent focus:ring-1 focus:ring-dash-accent transition-all"
            />
          </div>
        </div>

        {/* Mistake Checkbox */}
        <div className="pt-2">
          <label className="flex items-start gap-3 p-4 border border-dash-border rounded-lg cursor-pointer hover:bg-dash-surface-hover/30 transition-colors bg-dash-bg/50">
            <div className="pt-0.5">
              <input 
                name="mistake"
                checked={formData.mistake}
                onChange={handleChange}
                type="checkbox" 
                className="w-4 h-4 rounded border-dash-border text-dash-accent focus:ring-dash-accent bg-dash-bg"
              />
            </div>
            <div>
              <div className="font-medium text-dash-text text-sm">I made a notable mistake</div>
              <div className="text-xs text-dash-text-muted mt-0.5">Mark this if you want to highlight this problem for revision later.</div>
            </div>
          </label>
        </div>

        {/* Textarea */}
        <div className="pt-2">
          <label className="block text-sm font-medium text-dash-text-muted mb-1.5">Key Idea / Learning</label>
          <textarea 
            name="keyIdea"
            value={formData.keyIdea}
            onChange={handleChange}
            rows="4"
            placeholder="What was the trick to solving this? What did you learn?"
            className="w-full bg-dash-bg border border-dash-border rounded-lg px-4 py-3 text-dash-text focus:outline-none focus:border-dash-accent focus:ring-1 focus:ring-dash-accent transition-all resize-none"
          ></textarea>
        </div>

        <div className="pt-4 flex justify-end">
          <button 
            type="submit"
            className="bg-dash-accent hover:bg-dash-accent-hover text-white font-medium py-2.5 px-6 rounded-lg transition-colors focus:ring-2 focus:ring-dash-accent focus:ring-offset-2 focus:ring-offset-dash-surface"
          >
            Track Problem
          </button>
        </div>

      </form>
    </div>
  );
}

export default AddProblemPage;
