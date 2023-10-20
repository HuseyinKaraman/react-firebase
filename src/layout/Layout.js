import {
    Avatar,
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
} from "@chakra-ui/react";
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

    return (
        <>
            <Box bg="blue.400" w="100%" p={1} color="white">
                <Breadcrumb separator="" className="mx-5">
                    <BreadcrumbItem className="mr-auto text-2xl">
                        <BreadcrumbLink href="#">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                        <Menu>
                            <MenuButton>
                                <Avatar size="md" className="my-1" />
                            </MenuButton>
                            <MenuList color={"black"}>
                                <MenuItem>Proflie</MenuItem>
                                <MenuItem>Sign Out</MenuItem>
                            </MenuList>
                        </Menu>
                </Breadcrumb>
            </Box>
            <Outlet />
        </>
    );
};

export default Layout;
