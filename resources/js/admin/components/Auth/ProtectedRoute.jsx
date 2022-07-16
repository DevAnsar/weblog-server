import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("user.api_token");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
};
export default ProtectedRoute;
