import { Navigate } from "react-router";
import { jwtDecode } from "jwt-decode";
import { ReactNode } from "react";



// Define JWT payload structure
interface JwtPayload {
  exp: number; // Expiration time in seconds
  iat?: number; // Issued at (optional)
  [key: string]: any; // Allow extra fields
}

// Props for ProtectedRoute
interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const currentTime = Date.now() / 1000; // in seconds

    if (decoded.exp < currentTime) {
      localStorage.removeItem("token");
      return <Navigate to="/signin" replace />;
    }
  } catch (error) {
    localStorage.removeItem("token");
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
}
