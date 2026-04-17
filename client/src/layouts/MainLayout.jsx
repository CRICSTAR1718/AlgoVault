import Sidebar from "../components/layout/Sidebar";

function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-dash-bg text-dash-text flex transition-colors duration-300">
      <Sidebar />
      <main className="ml-64 flex-1 p-8 overflow-y-auto min-h-screen">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

export default MainLayout;
