import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { login } from "../../store/slices/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = ({ toggleIsSignUp }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const loginHandler = async () => {
    if (!inputs.email || !inputs.password) {
      toast({
        title: "Empty fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    try {
      const response = await axios.post("/api/auth/user/login", inputs, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast({
        title: "Login Successful",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("user", JSON.stringify(response.data));
      dispatch(login({ data: response.data }));
      setLoading(false);
      navigate("/");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response?.data?.message || "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <VStack
      spacing={"12px"}
      p={"8"}
      rounded={"xl"}
      maxWidth={"400px"}
      width={"90vw"}
      boxShadow={"1px 1px 5px 3px lightGray"}
    >
      <FormControl id="email" isRequired="true">
        <FormLabel m={0}>Email</FormLabel>
        <Input
          bgColor={"#F9F7F7"}
          placeholder="Enter email"
          onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
          type="email"
          value={inputs.email}
        />
      </FormControl>
      <FormControl id="password" isRequired="true">
        <FormLabel m={0}>Password</FormLabel>
        <Input
          bgColor={"#F9F7F7"}
          placeholder="Enter password"
          value={inputs.password}
          onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
        />
      </FormControl>
      <Button
        isLoading={loading}
        marginTop={"15px"}
        width={"full"}
        onClick={() => loginHandler()}
      >
        Sign In
      </Button>
      <Box display={"flex"}>
        <Text fontSize={"11px"}>Don't an account?&nbsp;</Text>
        <Text
          fontSize={"11px"}
          fontWeight={"800"}
          cursor={"pointer"}
          onClick={() => toggleIsSignUp()}
        >
          Sign up here
        </Text>
      </Box>
    </VStack>
  );
};

export default Login;
