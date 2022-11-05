import { Box, Flex } from "@chakra-ui/react";
import "./App.css";
import Todo from "./Todo";

function App() {
  return (
    <Flex
      justify={"center"}
      alignItems="center"
      backgroundColor="#e3e9ff"
      h="100vh"
      w="100vw"
    >
      <Todo />
    </Flex>
  );
}

export default App;
