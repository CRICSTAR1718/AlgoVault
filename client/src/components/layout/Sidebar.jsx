import { NavLink } from "react-router-dom";
import { LayoutDashboard, PlusCircle, List, Repeat, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/add-problem", label: "Add Problem", icon: PlusCircle },
  { to: "/problems", label: "Problems List", icon: List },
  { to: "/revision", label: "Revision", icon: Repeat },
];

function Sidebar() {
  const [isLightMode, setIsLightMode] = useState(() => {
    return localStorage.getItem("theme") === "light";
  });

  useEffect(() => {
    if (isLightMode) {
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    }
  }, [isLightMode]);

  const toggleTheme = () => setIsLightMode(!isLightMode);

  return (
    <aside className="w-64 h-screen bg-dash-surface border-r border-dash-border flex flex-col fixed left-0 top-0 transition-colors duration-300">
      <div className="p-6">
        <div className="mb-8">
          <div className="flex items-center gap-3 text-dash-text font-bold text-xl mb-2">
            <div className="w-8 h-8 rounded bg-dash-accent flex items-center justify-center shrink-0">
              <LayoutDashboard size={18} className="text-white" />
            </div>
            <span>AlgoVault</span>
          </div>
          <p className="text-[10px] font-bold tracking-widest uppercase text-dash-text-muted/70 pl-11">
            Track. Learn. Improve. Repeat.
          </p>
        </div>
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${
                    isActive
                      ? "bg-dash-surface-hover text-dash-text"
                      : "text-dash-text-muted hover:text-dash-text hover:bg-dash-surface-hover/50"
                  }`
                }
              >
                <Icon size={18} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </div>
      <div className="mt-auto p-6 border-t border-dash-border">
        <button 
          onClick={toggleTheme}
          className="flex items-center gap-3 text-dash-text-muted hover:text-dash-text transition-colors w-full px-4 py-2 rounded-lg hover:bg-dash-surface-hover/50 text-sm font-medium"
        >
          {isLightMode ? <Moon size={18} /> : <Sun size={18} />}
          {isLightMode ? "Dark Mode" : "Light Mode"}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
