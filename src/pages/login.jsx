import React, { useEffect, useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../features/auth/authSlice";
import { Link as Rlink } from "react-router-dom";

function Login() {
  const [admin, setAdmin] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const { isLoading, isSuccess } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  //handling success
  useEffect(() => {
    isSuccess && navigate("/");
  }, [isSuccess, navigate]);

  //handleChange
  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };
  //handle signin
  const handleSignup = () => {
    dispatch(auth(admin));
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
      fontFamily={"Euclid Circular B"}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to gain access to dashboard Or{" "}
            <Link as={Rlink} to={"/signup"} color={"green.400"}>
              Sign up
            </Link>{" "}
            ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name="email"
                value={admin.email}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={admin.password}
                onChange={handleChange}
              />
            </FormControl>
            <Stack spacing={10}>
              <Button
                bg={"green.400"}
                color={"white"}
                _hover={{
                  bg: "green.500",
                }}
                loadingText="Signing In"
                isLoading={isLoading}
                onClick={handleSignup}
                isDisabled={
                  admin.password === "" ||
                  !admin.email.match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                  )
                }
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default Login;
