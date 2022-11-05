import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Center,
  Heading,
  UnorderedList,
  ListItem,
  Text,
  Flex,
  Button,
} from "@chakra-ui/react";
import { MdOutlineDeleteOutline } from "react-icons/md";
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
    <Box w="50vw" h="70vh" m="60px auto" border="1px solid">
      <Center bg={"#af7eeb"}>
        <Heading size="lg" fontSize="32px" color="white">
          WebSite Todo
        </Heading>
      </Center>
      <input value={todo} placeholder="add new todo" onChange={changeHandler} />
      <button onClick={addHandler}>add Todo</button>
      <Box>
        <UnorderedList>
          {data?.map((el) => {
            return (
              <ListItem
                cursor="pointer"
                onClick={() => toggleHandler(el?._id, el?.status)}
              >
                <Flex
                  gap="10px"
                  style={{
                    "text-decoration": `${el?.status ? "line-through" : ""}`,
                  }}
                >
                  <Text> {el?.title}</Text>

                  <Button
                    onClick={() => delteHandler(el?._id)}
                    colorScheme="teal"
                    size="lg"
                  >
                    {<MdOutlineDeleteOutline />}
                  </Button>
                </Flex>
              </ListItem>
            );
          })}
        </UnorderedList>
      </Box>
    </Box>
  );
};

export default Todo;
