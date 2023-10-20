import { Outlet, useNavigate } from "react-router-dom";
import { useIsLoggedIn } from "../config/hooks";
import { Alert, Box, Flex, Heading } from "@chakra-ui/react";
import { LockIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {errorReset} from '../redux/authSlice'

const AuthLayout = () => {
    const isLoggedIn = useIsLoggedIn();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { error, isLoading } = useSelector((state) => state.auth);
    const location = window.location.pathname.slice(1);

    useEffect(() => {
            dispatch(errorReset())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location])
    

    if (isLoggedIn === null) {
        return <h1>Loading...</h1>;
    } else if (isLoggedIn === true) {
        navigate("/");
    }



    return (
        <Flex alignItems="center" width="full" justifyContent="center">
            <Box p="10">
                <Box textAlign="center">
                    <Box pt="10" w="400px">
                        <LockIcon w={10} h={10} color="red.500" />
                        <Heading className="my-2">
                            {(location.charAt(0).toUpperCase() + location.slice(1)).replace("-", " ")}
                        </Heading>
                        {error && <Alert status="error">{error}</Alert>}
                    </Box>
                </Box>
                <Box my="5" textAlign="left" w="400px">
                    <Outlet context={isLoading} />
                </Box>
            </Box>
        </Flex>
    );
};

export default AuthLayout;
