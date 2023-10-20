import {
  Flex,
  Box,
  Container,
  Button,
} from "@chakra-ui/react";
import { useDispatch,useSelector } from "react-redux";
import { logOut } from "../../redux/authSlice";

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector(state=> state.auth.user);

  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <Container>
      <Box>
      Home
      </Box>
      <Button onClick={handleLogOut}>Sign Out</Button>
    </Container>
  );
};

export default Home;
