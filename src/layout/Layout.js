import { Outlet, useNavigate } from "react-router-dom";
import { useIsLoggedIn } from "../config/hooks";

const Layout = () => {
    const isLoggedIn = useIsLoggedIn();
    const navigate = useNavigate();
  
    if (isLoggedIn === null) {
        return <h1>Loading...</h1>;
    } else if (isLoggedIn === false) {
        navigate("/sign-in");
    }

    return <Outlet />;
};

export default Layout;
