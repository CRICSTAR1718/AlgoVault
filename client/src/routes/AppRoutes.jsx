import { Navigate, Route, Routes } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import AddProblemPage from "../pages/AddProblemPage";
import ProblemsPage from "../pages/ProblemsPage";
import RevisionPage from "../pages/RevisionPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/add-problem" element={<AddProblemPage />} />
      <Route path="/problems" element={<ProblemsPage />} />
      <Route path="/revision" element={<RevisionPage />} />
    </Routes>
  );
}

export default AppRoutes;
