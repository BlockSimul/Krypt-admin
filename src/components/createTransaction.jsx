import { AddIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newTransaction } from "../features/transaction/transactionSlice";
import { txWallet } from "../features/wallet/walletSlice";

function CreateTransaction() {
  const { wallets, isLoading } = useSelector((state) => state.wallet); //getting all adresses
  const { users } = useSelector((state) => state.user); //getting all adresses
  const Txs = useSelector((state) => state.transaction); //getting all adresses
  const [address, setAddress] = useState(""); //wallet addres from
  const [user, setUser] = useState(""); //user from
  const [wallet, setWallet] = useState({}); //get user wallet
  const [uWallets, setUWallets] = useState([]); //get user wallets
  const [token, setToken] = useState({}); //Coin Involved
  const { isOpen, onOpen, onClose } = useDisclosure(); //modal
  const [tx, setTx] = useState({
    to: "",
    type: "debit",
    amount: 0,
    code: "",
    fee: 0.02,
  }); //to transaction
  const dispatch = useDispatch();

  //setting tokens
  useEffect(() => {
    setToken(wallet?.activatedCoins?.find((act) => act.code === tx.code));
  }, [tx.code, wallet?.activatedCoins]);

  //setting User Wallets
  useEffect(() => {
    setUWallets(wallets?.filter((wall) => wall?.userId === user));
  }, [wallets, user]);

  //setting address
  useEffect(() => {
    setAddress(token?.address);
  }, [token?.address]);

  //Checking for success
  useEffect(() => {
    if (Txs.isSuccess) {
      setTx({
        to: "",
        type: "debit",
        amount: 0,
        code: "BTC",
        fee: 0.02,
      });
      setAddress("");
      setToken({});
      onClose();
    }
  }, [Txs.isSuccess, onClose]);

  //Checking for Errors
  const isError = {
    from: address < 10,
    to: tx.to.length < 10,
    amount: tx.amount <= 0,
    code: tx.code === "",
    fund: tx.amount > token?.amount && tx.type === "debit",
    fee: tx.fee < 0,
  };

  //handleChanges
  const handleChange = (e) => {
    setTx({ ...tx, [e.target.name]: e.target.value });
  };

  //handleClick
  const handleClick = () => {
    const txWall = {
      info: {
        sender: tx.type === "credit" ? tx.to : address,
        receiver: tx.type === "debit" ? tx.to : address,
        amount: tx?.amount,
        coin: tx?.code,
        fee: tx?.fee,
        type: tx?.type,
        WID: wallet?.address,
      },
      user: "",
    };
    dispatch(txWallet(txWall));
    console.log(wallet.address);
    dispatch(
      newTransaction({
        ...tx,
        from: tx.type === "credit" ? tx.to : address,
        to: tx.type === "debit" ? tx.to : address,
        WID: wallet.address,
      })
    );
    console.log(wallet.address);
  };
  return (
    <>
      <Button onClick={onOpen} fontSize={[14, 18]} colorScheme="green">
        <AddIcon display={["none", "block"]} mr={2} />
        Create Transaction
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent fontFamily={"Euclid Circular B"}>
          <ModalHeader>Create Transaction</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Create a new transaction.
            <Stack py={3}>
              <FormControl>
                <FormLabel>Transaction Type</FormLabel>
                <Select value={tx?.type} name="type" onChange={handleChange}>
                  <option value={"debit"}>Send</option>
                  <option value={"credit"}>Receive</option>
                </Select>
              </FormControl>

              {/* Sender */}
              <FormControl>
                <FormLabel>User</FormLabel>
                <Select
                  value={user}
                  onChange={(e) => {
                    setUser(e.target.value);
                  }}
                >
                  <option>Users</option>
                  {users?.map((user, index) => (
                    <option key={index} value={user?._id}>
                      {user?.username} : {user?.email}
                    </option>
                  ))}
                </Select>
              </FormControl>

              {/* Sender Wallet's */}
              <FormControl>
                <FormLabel>User's Wallets</FormLabel>
                <Select
                  value={wallet?._id}
                  onChange={(e) => {
                    setWallet(
                      uWallets?.find((wall) => wall?._id === e.target.value)
                    );
                  }}
                >
                  <option>User's Wallet</option>
                  {uWallets?.map((wall, index) => (
                    <option key={index} value={wall?._id}>
                      Wallet {index + 1}
                    </option>
                  ))}
                </Select>
              </FormControl>

              {/* Selecting Token */}
              <FormControl isInvalid={isError.code}>
                <FormLabel>Coin</FormLabel>
                <Select
                  name="code"
                  value={tx.code}
                  onChange={handleChange}
                  borderColor={"teal"}
                >
                  <option value="coin">Coin</option>
                  {wallet?.activatedCoins?.map((coin, index) => (
                    <option key={index} value={coin.code}>
                      {coin.coinName}
                    </option>
                  ))}
                </Select>
                <HStack gap={3} my={2} p={2} border={"1px"} borderRadius={6}>
                  <Avatar size={"sm"} src={token?.img} />
                  <Stack align={"start"}>
                    <Text marginTop={"0 !important"} fontSize={16}>
                      {token?.code}
                    </Text>
                    <Text
                      marginTop={"0 !important"}
                      color={useColorModeValue("gray.500", "gray.300")}
                      fontSize={14}
                      fontWeight={300}
                    >
                      Balance: {token?.amount || 0} {token?.code}
                    </Text>
                  </Stack>
                </HStack>
                {isError.code && (
                  <FormErrorMessage>Insufficient Funds</FormErrorMessage>
                )}
              </FormControl>

              {/* Receiving Address */}
              <FormControl isInvalid={isError.to}>
                <FormLabel>Address</FormLabel>
                <Input
                  type="text"
                  name="to"
                  borderColor={"teal"}
                  _focusVisible={{ borderColor: "teal" }}
                  value={tx.to}
                  onChange={handleChange}
                  placeholder={`${token?.code} Address`}
                />
                {!isError.to ? (
                  <FormHelperText>
                    Enter the Wallet Address of receipient.
                  </FormHelperText>
                ) : (
                  <FormErrorMessage>Address Being Credited</FormErrorMessage>
                )}
              </FormControl>

              {/* Amount */}
              <FormControl isInvalid={isError.amount || isError.fund}>
                <FormLabel>Amount</FormLabel>
                <Stack direction={"column"}>
                  <Flex
                    align={"center"}
                    borderRadius={6}
                    border={"1px"}
                    borderColor={
                      isError.amount || isError.fund ? "red" : "teal"
                    }
                    pr={3}
                  >
                    <Input
                      type="number"
                      min={0}
                      name="amount"
                      value={tx.amount}
                      onChange={handleChange}
                      _focusVisible={{ border: "none" }}
                      _focusWithin={{ border: "none" }}
                      border={"none"}
                      maxW={["100%"]}
                      flex={1}
                    />{" "}
                    <Text fontWeight={"bold"}>{tx.code}</Text>
                  </Flex>
                </Stack>

                {!isError.amount ? (
                  isError.fund ? (
                    <FormErrorMessage>Insufficient funds</FormErrorMessage>
                  ) : (
                    <FormHelperText>Amount is required</FormHelperText>
                  )
                ) : (
                  <FormErrorMessage>
                    Amount must be greater than zero
                  </FormErrorMessage>
                )}
              </FormControl>

              {/* Gas Fee */}
              <FormControl isInvalid={isError.fee}>
                <FormLabel>Gas Fee</FormLabel>
                <Stack direction={"column"}>
                  <Flex
                    align={"center"}
                    borderRadius={6}
                    border={"1px"}
                    borderColor={isError.fee ? "red" : "teal"}
                    pr={3}
                  >
                    <Input
                      type="number"
                      min={0}
                      name="fee"
                      value={tx.fee}
                      onChange={handleChange}
                      _focusVisible={{ border: "none" }}
                      _focusWithin={{ border: "none" }}
                      border={"none"}
                      maxW={["100%"]}
                      flex={1}
                    />{" "}
                    <Text fontWeight={"bold"}>{tx.code}</Text>
                  </Flex>
                </Stack>

                {!isError.fee ? (
                  <FormHelperText>Gas fee is required</FormHelperText>
                ) : (
                  <FormErrorMessage>
                    Gas fee cannot be lesser than zero
                  </FormErrorMessage>
                )}
              </FormControl>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="solid"
              isDisabled={
                isError.fund ||
                isError.to ||
                isError.amount ||
                isError.from ||
                isError.fee
              }
              colorScheme="green"
              onClick={handleClick}
              isLoading={isLoading}
              loadingText="Creating"
            >
              Create Tx
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateTransaction;
