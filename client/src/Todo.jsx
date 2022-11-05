import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Center,
  Heading,
  ListItem,
  Text,
  Flex,
  UnorderedList,
  ListIcon,
  Input,
  Button,
} from "@chakra-ui/react";
import { DeleteIcon, MdCheckCircle } from "@chakra-ui/icons";

const Todo = () => {
  const [data, setData] = useState([]);
  const [todo, setTodo] = useState("");

  const changeHandler = (e) => {
    setTodo(e.target.value);
  };
  const addHandler = () => {
    axios
      .post(`https://buyofuelsarb.herokuapp.com/`, {
        status: false,
        title: todo,
      })
      .then(() => {
        axios.get(`https://buyofuelsarb.herokuapp.com/`).then((r) => {
          console.log(r.data);
          setData(r.data);
        });
      });
  };

  const delteHandler = (id) => {
    axios.delete(`https://buyofuelsarb.herokuapp.com/${id}`).then(() => {
      axios.get(`https://buyofuelsarb.herokuapp.com/`).then((r) => {
        console.log(r.data);
        setData(r.data);
      });
    });
  };

  const toggleHandler = (id, status) => {
    axios
      .patch(`https://buyofuelsarb.herokuapp.com/${id}`, {
        status: !status,
      })
      .then(() => {
        axios.get(`https://buyofuelsarb.herokuapp.com/`).then((r) => {
          console.log(r.data);
          setData(r.data);
        });
      });
  };

  useEffect(() => {
    axios.get(`https://buyofuelsarb.herokuapp.com/`).then((r) => {
      console.log(r.data);
      setData(r.data);
    });
  }, []);

  return (
    <Box w="40%" h="70%" m="auto">
      <Center bg={"#af7eeb"}>
        <Heading size="lg" fontSize="32px" color="white">
          WebSite Todo
        </Heading>
      </Center>
      <Center margin={"10px"}>
        <Input
          value={todo}
          placeholder="add new todo"
          onChange={changeHandler}
        />
        <Button bg="#af7eeb" color="white" border="none" onClick={addHandler}>
          add Todo
        </Button>
      </Center>
      <Center bg="white" padding="20px" w="80%" m="20px auto">
        <UnorderedList spacing={1}>
          {data?.map((el) => {
            return (
              <ListItem>
                <Flex
                  cursor="pointer"
                  onClick={() => toggleHandler(el?._id, el?.status)}
                  alignItems="center"
                  gap="10px"
                  style={{
                    "text-decoration": `${el?.status ? "line-through" : ""}`,
                  }}
                >
                  <Text> {el?.title}</Text>

                  {<DeleteIcon onClick={() => delteHandler(el?._id)} />}
                </Flex>
              </ListItem>
            );
          })}
        </UnorderedList>
      </Center>
    </Box>
  );
};

export default Todo;
