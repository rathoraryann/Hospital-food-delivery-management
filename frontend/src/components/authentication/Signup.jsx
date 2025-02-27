import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../store/slices/userSlice";

const Signup = ({ toggleIsSignUp }) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const signUpHandler = async (e) => {
    setLoading(true);
    if (
      !inputs.name ||
      !inputs.email ||
      !inputs.password ||
      !inputs.confirmPassword ||
      !inputs.role
    ) {
      toast({
        title: "Empty fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    if (inputs.password != inputs.confirmPassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post("/api/auth/user", inputs, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status == 300) {
        toast({
          title: "Email exists",
          description: "email exists, create account using another email",
          status: "warning",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        setLoading(false);
        return;
      }
      toast({
        title: "Account created",
        description: "account created succesfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
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
        duration: 5000,
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
      width={"90vw"}
      maxWidth={"400px"}
      boxShadow={"1px 1px 5px 3px lightGray"}
    >
      <FormControl id="name" isRequired="true">
        <FormLabel m={0}>Name</FormLabel>
        <Input
          placeholder="Enter your name"
          value={inputs.name}
          onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
          bgColor={"#F9F7F7"}
        />
      </FormControl>
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
        <InputGroup>
          <Input
            bgColor={"#F9F7F7"}
            placeholder="Enter password"
            value={inputs.password}
            type={show1 ? "text" : "password"}
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={() => setShow1(!show1)}
              color={"gray.500"}
            >
              {show1 ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="confirmPassword" isRequired="true" marginTop={1} p={1}>
        <FormLabel m={0}>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            value={inputs.confirmPassword}
            type={show2 ? "text" : "password"}
            placeholder="Enter confirm password"
            bgColor={"#F9F7F7"}
            onChange={(e) =>
              setInputs({ ...inputs, confirmPassword: e.target.value })
            }
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={() => setShow2(!show2)}
              color={"gray.500"}
            >
              {show2 ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl isRequired="true">
        <FormLabel m={0}>Select Role</FormLabel>
        <Select
          placeholder="Select Role"
          value={inputs.role}
          onChange={(e) => setInputs({ ...inputs, role: e.target.value })}
          bgColor={"#F9F7F7"}
          _hover={{
            borderColor: "blue.400",
            boxShadow: "md",
          }}
          _focus={{
            borderColor: "blue.500",
            boxShadow: "outline",
          }}
        >
          <option value={"Admin"}>Admin</option>
          <option value={"Pantry Staff"}>Pantry Staff</option>
          <option value={"Delivery Staff"}>Delivery Staff</option>
        </Select>
      </FormControl>
      <Button
        isLoading={loading}
        marginTop={"15px"}
        width={"full"}
        onClick={() => signUpHandler()}
      >
        Sign Up
      </Button>
      <Box display={"flex"}>
        <Text fontSize={"11px"}>Already have an account?&nbsp;</Text>
        <Text
          fontSize={"11px"}
          fontWeight={"800"}
          cursor={"pointer"}
          onClick={() => toggleIsSignUp()}
        >
          Sign in here
        </Text>
      </Box>
    </VStack>
  );
};

export default Signup;
