import { Link } from "react-router-dom";
import { DarkButton } from "./DarkButton";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/UseAuth";

function Navbar() {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated);
  return (
    <nav className="flex justify-between items-center sm:px-10 2xl:px-20 px-2 py-3">
      <Link to={isAuthenticated ? "/dashboard" : "/"}>
        <h2 className="text-2xl sm:text-3xl font-semibold hover:text-blue-800 px-2 hover:border-blue-800 border-b-2 border-transparent">
          Tasks
        </h2>
      </Link>
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex">
        {isAuthenticated ? (
          <ul className="flex items-center gap-3">
            <li className=" px-3 py-1 rounded-lg hover:bg-muted">
              <Link to="/dashboard/tasks">Tasks</Link>
            </li>
            <li className=" px-3 py-1 rounded-lg hover:bg-muted">
              <Link to="/dashboard/tasks/new">New Task</Link>
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
        </div>
        <div className="flex sm:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="p-1.5">
              <Menu />
            </Button>
          </DropdownMenuTrigger>

          {isAuthenticated ? (
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link to="/dashboard/tasks">Tasks</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/dashboard/tasks/new">New Task</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          ) : (
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link to="/login">Login</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/register">Register</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          )}
        </DropdownMenu>
        </div>
        <DarkButton />
      </div>
    </nav>
  );
}

export default Navbar;
