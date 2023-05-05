import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Restricted = ({ children }) => {
    const { loaded, userId } = useSelector((store) => store.userState);

    if (!loaded) {
        return null;
    }

    if (!userId) {
        return <Navigate to="/" />;
    } else {
        return children;
    }
};

export default Restricted;
