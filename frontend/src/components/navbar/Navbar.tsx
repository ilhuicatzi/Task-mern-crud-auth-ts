import { Link } from "react-router-dom";
import { DarkButton } from "./DarkButton";
import { useAuth } from "@/hooks/UseAuth";

function Navbar() {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated);
  return (
    <nav className="flex justify-between items-center px-10 py-3">
      <Link to={
        isAuthenticated ? "/dashboard" : "/"
      }>
        <h2 className="text-3xl font-semibold hover:text-blue-800 px-2 hover:border-blue-800 border-b-2 border-transparent">
          Tasks
        </h2>
      </Link>
      <div className="flex items-center gap-3">
        {isAuthenticated ? (
          <ul className="flex items-center gap-3">
            <li className=" px-3 py-1 rounded-lg hover:bg-muted">
              <Link to="/dashboard/tasks">Tasks</Link>
            </li>
            <li className=" px-3 py-1 rounded-lg hover:bg-muted">
              <Link to="/dashboard/tasks/new">New Task</Link>
            </li>
            <li className=" px-3 py-1 rounded-lg hover:bg-muted">
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>
        ) : (
          <ul className="flex items-center gap-3">
            <li className=" px-3 py-1 rounded-lg hover:bg-muted">
              <Link to="/login">Login</Link>
            </li>
            <li className=" px-3 py-1 rounded-lg hover:bg-muted">
              <Link to="/register">Register</Link>
            </li>
          </ul>
        )}
        <DarkButton />
      </div>
    </nav>
  );
}

export default Navbar;
