import {
  Stack,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect } from "react";

function EditTx({ tx, setTx, isError, data }) {
  const handleChange = (e) => {
    setTx({ ...tx, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    setTx(data);
    console.log(data);
  }, [data, setTx]);
  return (
    <Stack py={3}>
      <FormControl isInvalid={isError.from}>
        <FormLabel>Address From</FormLabel>
        <Input
          type="text"
          name="from"
          borderColor={"teal"}
          _focusVisible={{ borderColor: "teal" }}
          value={tx.walletId}
          isReadOnly
        />
        <FormHelperText>Wallet Address of Sender ReadOnly.</FormHelperText>
      </FormControl>

      <FormControl isInvalid={isError.to}>
        <FormLabel>Address To</FormLabel>
        <Input
          type="text"
          name="to"
          borderColor={"teal"}
          _focusVisible={{ borderColor: "teal" }}
          value={tx.to}
          onChange={handleChange}
        />
        {!isError.to ? (
          <FormHelperText>Wallet Address of receipient.</FormHelperText>
        ) : (
          <FormErrorMessage>Address Being Credited</FormErrorMessage>
        )}
      </FormControl>

      <FormControl isInvalid={isError.code}>
        <FormLabel>Coin</FormLabel>
        <HStack
          gap={3}
          my={2}
          p={2}
          border={"1px"}
          borderRadius={6}
          borderColor={"teal"}
        >
          <Stack align={"start"}>
            <Text marginTop={"0 !important"} fontSize={16}>
              {tx?.code}
            </Text>
            <Text
              marginTop={"0 !important"}
              color={useColorModeValue("gray.500", "gray.300")}
              fontSize={14}
              fontWeight={300}
            >
              Amount: {tx?.amount || 0} {tx?.code}
            </Text>
          </Stack>
        </HStack>
        {isError.code && (
          <FormErrorMessage>Insufficient Funds</FormErrorMessage>
        )}
      </FormControl>
    </Stack>
  );
}

export default EditTx;
