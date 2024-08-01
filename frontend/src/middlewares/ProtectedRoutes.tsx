import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/UseAuth";
import { Progress } from "@/components/ui/progress"
import { useState, useEffect } from "react";



function ProtectedRoutes() {
  const [progress, setProgress] = useState(20)
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => setProgress(95), 500)
    return () => clearTimeout(timer)
  }, [])
  
  if (isLoading) return (
    <div className="flex justify-center items-center mt-40">
      <Progress value={progress} className="w-[60%]" />
    </div>
  )

  if (!isAuthenticated) return <Navigate to="/login" />;

  return <Outlet />;
}

export default ProtectedRoutes;
