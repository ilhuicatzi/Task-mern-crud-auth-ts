import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import TasksPage from "./pages/tasks/TasksPage";
import NewTaskPage from "./pages/tasks/NewTaskPage";
import Dashboard from "./pages/tasks/Dashboard";
import Navbar from "./components/navbar/Navbar";
import {AuthProvider} from "@/contexts/AuthContext";
import ProtectedRoutes from "./middlewares/ProtectedRoutes";

function App() {
  return (
    <div>
      <AuthProvider>
      <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/tasks" element={<TasksPage />} />
            <Route path="/dashboard/tasks/new" element={<NewTaskPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
