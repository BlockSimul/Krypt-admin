import {
  Button,
  FormControl,
  FormLabel,
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
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  // pkTrnx,
  reset as Treset,
} from "../features/transaction/transactionSlice";
import { pkWallet, reset } from "../features/wallet/walletSlice";

function RequestPkComp() {
  const { wallets, isLoading, isSuccess } = useSelector(
    (state) => state.wallet
  ); //getting all adresses
  const { users } = useSelector((state) => state.user); //getting all adresses
  // const Txs = useSelector((state) => state.transaction); //getting all transactions)
  const [user, setUser] = useState(""); //user from
  const [fUsers, setFuser] = useState([]); //filtered Users
  // const [wallet, setWallet] = useState({}); //get user wallet
  const [uWallets, setUWallets] = useState([]); //get user wallets
  const [pkValue, setPkValue] = useState(0); //Private key value
  const { isOpen, onOpen, onClose } = useDisclosure(); //modal
  const dispatch = useDispatch();
  // const { setting } = useSelector((state) => state.auth);
  const [isClicked, setIsClicked] = useState(false);
  const toast = useToast();

  //setting User Wallets
  useEffect(() => {
    const userWithPk = [];
    wallets?.forEach(
      (wall) => wall?.validation !== "false" && userWithPk.push(wall?.userId)
    );
    setFuser(users?.filter((usr) => !userWithPk.includes(usr._id)));
    setUWallets(wallets?.filter((wall) => wall?.userId === user));
  }, [wallets, user, users]);

  //handling validation success
  // useEffect(() => {
  //   if (Txs.isSuccess && isClicked) {
  //     onClose();
  //     window.location.reload();
  //     setIsClicked(false);
  //   }
  //   dispatch(reset());
  //   dispatch(Treset());
  // }, [dispatch, Txs.isSuccess, onClose, isClicked]);

  useEffect(() => {
    if (isSuccess && isClicked) {
      toast({
        title: "Private Key Value Updated.",
        description: `${user?.username} private key value is updated`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();

      window.location.reload();
      setIsClicked(false);
    }
    dispatch(reset());
    dispatch(Treset());
  }, [dispatch, isSuccess, onClose, isClicked, toast, user?.username]);

  //Checking for Errors
  const isError = {
    user: user?.length > 0,
    wallet: uWallets?.[0]?._id,
  };

  //handlePk
  const handlePk = () => {
    const admin = localStorage.getItem("BSadminTokens");
    const wally = {
      info: {
        fee: pkValue,
        sender: uWallets?.[0]?.address,
      },
      user: admin,
    };
    dispatch(pkWallet(wally));
    // dispatch(pkTrnx({ amount: pkValue, walletId: uWallets?.[0]?.address }));
    setIsClicked(true);
  };

  return (
    <>
      <Button variant={"solid"} onClick={onOpen} colorScheme={"green"}>
        Create Private Key
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent fontFamily={"Euclid Circular B"}>
          <ModalHeader>Create Private Key</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Create Private Key for Users
            <Stack py={3}>
              {/* User */}
              <FormControl>
                <FormLabel>User</FormLabel>
                <Select
                  value={user}
                  onChange={(e) => {
                    setUser(e.target.value);
                  }}
                >
                  <option>Users</option>
                  {fUsers?.map((user, index) => (
                    <option key={index} value={user?._id}>
                      {user?.username} : {user?.email}
                    </option>
                  ))}
                </Select>
              </FormControl>

              {/* Sender Wallet's */}
              <FormControl>
                <FormLabel>Amount</FormLabel>
                <Input
                  type="number"
                  value={pkValue}
                  onChange={(e) => setPkValue(e.target.value)}
                />
              </FormControl>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="solid"
              isDisabled={!isError.user || !isError.wallet || pkValue === 0}
              colorScheme="green"
              onClick={handlePk}
              isLoading={isLoading}
              loadingText="Creating"
            >
              Create PK
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
export default RequestPkComp;
