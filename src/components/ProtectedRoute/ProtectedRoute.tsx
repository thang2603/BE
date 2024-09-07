import { Navigate } from "react-router-dom";

interface DataTypeProps {
  children: any;
  isAuth: boolean;
}
const ProtectedRoute = ({ children, isAuth }: DataTypeProps) => {
  if (isAuth) {
    return children;
  }
  return <Navigate to={"/login"} replace />;
};

export default ProtectedRoute;
