import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../../redux/store";

export const ProtectedRoutes: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { userID, username, isLoading } = useSelector((state: RootState) => state.auth);

  // Mientras cargamos info de Firebase
  if (isLoading) {
    return <div>Cargando...</div>;
  }

  // Si no hay usuario o es anónimo
  if (!userID || !username) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
