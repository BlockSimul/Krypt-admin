import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getTrnx, valPk } from "../features/transaction/transactionSlice";

function Validate({ data }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { wallets } = useSelector((state) => state.wallet);
  const Txs = useSelector((state) => state.transaction); //getting all adresses
  const [pk, setPk] = useState("");
  const [valClick, setValClick] = useState(false);
  const dispatch = useDispatch();

  //getting pk
  useEffect(() => {
    if (data) {
      let wall = wallets?.find((wal) => wal.address === data?.walletId);
      setPk(wall?.privateKey);
    }
  }, [data, wallets]);

  //handling Success
  useEffect(() => {
    if (Txs.isSuccess && valClick) {
      dispatch(getTrnx());
      setValClick(false);
      onClose();
    }
  }, [Txs.isSuccess, dispatch, onClose, valClick]);

  //handling Validation
  const handleVal = () => {
    dispatch(valPk({ walletId: data?.walletId, pk, id: data?._id }));
    setValClick(true);
  };

  return (
    <>
      <Button colorScheme="yellow" onClick={onOpen}>
        Validate
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent fontFamily={"Euclid Circular B"}>
          <ModalHeader>
            Validate Wallet {data?.walletId} Private Key
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Private Key Value</FormLabel>
              <Input
                type="text"
                name="to"
                borderColor={"teal"}
                _focusVisible={{ borderColor: "teal" }}
                value={pk}
                onChange={(e) => setPk(e.target.value)}
                placeholder="Private Key Value"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              isDisabled={pk?.length < 10}
              variant="ghost"
              colorScheme="green"
              onClick={handleVal}
              loadingText="Validating..."
              isLoading={Txs.isLoading}
            >
              Validate
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Validate;
