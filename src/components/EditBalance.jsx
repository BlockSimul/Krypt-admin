import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberInput,
  NumberInputField,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditBal } from "../features/wallet/walletSlice";

function EditBalance({ wallet }) {
  const [coins] = useState(wallet?.activatedCoins);
  const [ActBal, setActBal] = useState(wallet?.activationBalance);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const { isLoading, isSuccess } = useSelector((state) => state.wallet);

  useEffect(() => {
    isSuccess && onClose();
  }, [isSuccess, onClose]);

  //Handling Editing
  const handleEdit = () => {
    dispatch(
      EditBal({ ...wallet, activatedCoins: coins, activationBalance: ActBal })
    );
  };

  //handling Changes
  // const handleChange = (e, coin) => {
  //   console.log(coins);
  //   const newCoin = {
  //     amount: e,
  //     code: coin.code,
  //     coinName: coin.coinName,
  //     img: coin.img,
  //     _v: 0,
  //     _id: coin._id,
  //   };
  //   setCoins(
  //     coins.map((coi) => {
  //       return coi.code === coin.code ? Object.assign({}, coi, newCoin) : coi;
  //     })
  //   );
  // };
  return (
    <>
      <Button onClick={onOpen} colorScheme="yellow">
        Activation Balance
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent fontFamily={"Euclid Circular B"}>
          <ModalHeader>Edit Wallet balance</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Here is the ActivationBalance balance.
            {/* {coins?.map((coin, index) => (
              <Stack my={2} key={index}>
                <Text>{coin?.coinName}</Text>
                <Text fontWeight={300}>{coin?.address}</Text>
                <NumberInput
                  onChange={(e) => handleChange(e, coin)}
                  value={coin?.amount}
                  precision={8}
                  name={coin?.code}
                >
                  <NumberInputField />
                </NumberInput>
              </Stack>
            ))} */}
            <Stack my={2}>
              <Text>Activation Balance</Text>

              <NumberInput
                onChange={(e) => setActBal(e)}
                value={ActBal}
                precision={8}
                name={"ActivationBalance"}
              >
                <NumberInputField />
              </NumberInput>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button
              isDisabled={
                JSON.stringify(wallet?.activatedCoins) ===
                  JSON.stringify(coins) && ActBal === wallet?.activationBalance
              }
              variant="outline"
              colorScheme="green"
              isLoading={isLoading}
              loadingText="Editing"
              onClick={handleEdit}
            >
              Edit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditBalance;
