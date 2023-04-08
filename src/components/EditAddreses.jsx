import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditBal } from "../features/wallet/walletSlice";

function EditAddresses({ wallet }) {
  const [coins, setCoins] = useState(wallet?.activatedCoins);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const { isLoading, isSuccess } = useSelector((state) => state.wallet);

  useEffect(() => {
    isSuccess && onClose();
  }, [isSuccess, onClose]);

  //Handling Editing
  const handleEdit = () => {
    dispatch(EditBal({ ...wallet, activatedCoins: coins }));
  };

  //handling Changes
  const handleChange = (e, coin) => {
    const newCoin = {
      amount: coin.amount,
      code: coin.code,
      coinName: coin.coinName,
      img: coin.img,
      _v: 0,
      _id: coin._id,
      address: e.target.value,
    };
    setCoins(
      coins.map((coi) => {
        return coi.code === coin.code ? Object.assign({}, coi, newCoin) : coi;
      })
    );
  };
  return (
    <>
      <Button onClick={onOpen} colorScheme={"orange"}>
        Edit Addresses
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent fontFamily={"Euclid Circular B"}>
          <ModalHeader>Edit {wallet?.address} Address</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Here is the coins with their balance.
            {coins?.map((coin, index) => (
              <Stack my={2} key={index}>
                <Text>{coin?.coinName}</Text>
                <Input
                  value={coin?.address}
                  onChange={(e) => handleChange(e, coin)}
                />
              </Stack>
            ))}
          </ModalBody>

          <ModalFooter>
            <Button
              isDisabled={
                JSON.stringify(wallet?.activatedCoins) === JSON.stringify(coins)
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
export default EditAddresses;
