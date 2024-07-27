import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../Context/AuthContext";

export function Protected({ children }) {
    const { user } = useContext(Context);

    let nestedChildType = 'this page';
    if (children.props && children.props.children) {
        nestedChildType = children.props.children.type?.name || 'this nested page';
    }

    if (!user) {
        window.alert(`Please login to access ${nestedChildType}`);
        return <Navigate to="/home" replace />;
    } else {
        return children;
    }
}
