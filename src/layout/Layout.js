import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    Avatar,
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Button,
    Divider,
    Heading,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    useDisclosure,
} from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";
import { useCurrentUser, useIsLoggedIn } from "../config/hooks";
import React from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../redux/authSlice";

const Layout = () => {
    const { isOpen: isProfileOpen, onOpen: onProfileOpen, onClose: onProfileClose } = useDisclosure();
    const { isOpen: isLogOutOpen, onOpen: onLogOutOpen, onClose: onLogOutClose } = useDisclosure();
    const cancelRef = React.useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useIsLoggedIn();
    const currentUser = useCurrentUser();

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
                            <MenuItem onClick={onProfileOpen}>Profile</MenuItem>
                            <MenuItem onClick={onLogOutOpen}>Sign Out</MenuItem>
                        </MenuList>
                    </Menu>
                </Breadcrumb>
            </Box>

            <AlertDialog isOpen={isProfileOpen} onClose={onProfileClose} isCentered>
                <AlertDialogContent className="!max-w-[320px] !min-h-[300px]" bg={"gray.200"}>
                    <AlertDialogHeader>Profile</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <Divider orientation="horizontal" bg={"white"} height={"1.5"} />
                    <AlertDialogBody display={"flex"} justifyContent={"space-around"} alignItems={"center"}>
                        <Avatar size="md" className="my-1" />
                        <Box className="text-center">
                            <Heading size="md">{currentUser?.displayName}</Heading>
                            <Heading size="md">{currentUser?.email}</Heading>
                        </Box>
                    </AlertDialogBody>
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog isOpen={isLogOutOpen} onClose={onLogOutClose} leastDestructiveRef={cancelRef} isCentered>
                <AlertDialogContent className="!max-w-[320px] !min-h-[100px]" bg={"gray.200"}>
                <AlertDialogHeader>Are you sure ?</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>Sign out from " {currentUser?.email}"</AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onLogOutClose}>
                            Cancel
                        </Button>
                        <Button
                            colorScheme="red"
                            onClick={() => {
                                onLogOutClose();
                                dispatch(logOut());
                            }}
                            ml={3}
                        >
                            Sign Out
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <Outlet />
        </>
    );
};

export default Layout;
