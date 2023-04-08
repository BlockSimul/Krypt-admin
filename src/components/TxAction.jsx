import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import EditTx from "./EditTx";
import { useDispatch, useSelector } from "react-redux";
import { creditWallet } from "../features/wallet/walletSlice";
import { confirmTrnx } from "../features/transaction/transactionSlice";
import Validate from "./Validate";

function TxAction({ data, status }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const Txs = useSelector((state) => state.transaction); //getting all adresses
  const { isLoading } = useSelector((state) => state.wallet); //getting all adresses
  const [txr, setTxr] = useState();
  const isError = {
    from: txr?.walletId < 10,
    to: txr?.to?.length < 10,
    amount: txr?.amount <= 0,
    code: txr?.code === "",
  };
  const dispatch = useDispatch();

  //useEffect getting transactions
  useEffect(() => {
    if (Txs.isSuccess) {
      onClose();
    }
    Txs.isError && console.log(Txs.message);
  }, [Txs.isError, Txs.isSuccess, Txs.message, onClose]);

  //useEffect for setting TXR
  useEffect(() => {
    if (data !== null || data !== undefined) {
      setTxr(data);
    }
  }, [data]);
  //handling confirmation
  const handleConfirm = () => {
    console.log(txr);
    const txWall = {
      info: {
        sender: txr?.walletId,
        receiver: txr?.to,
        amount: txr?.amount,
        coin: txr?.code,
        fee: txr?.fee,
        type: txr?.type,
      },
      user: "",
    };
    dispatch(creditWallet(txWall));
    dispatch(confirmTrnx(txr));
  };
  if (status === "pending" && txr?.type === "requestpk") {
    return <Validate data={data} />;
  } else if (status === "pending") {
    return (
      <>
        <Menu>
          <MenuButton
            as={Button}
            colorScheme="blue"
            rightIcon={<ChevronDownIcon />}
          >
            Actions
          </MenuButton>
          <MenuList>
            <MenuItem onClick={onOpen}>Edit</MenuItem>
            <MenuItem onClick={handleConfirm}>Confirm</MenuItem>
          </MenuList>
        </Menu>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent fontFamily={"Euclid Circular B"}>
            <ModalHeader>Edit transaction</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Edit Transaction
              <EditTx tx={txr} setTx={setTxr} isError={isError} data={data} />
            </ModalBody>

            <ModalFooter>
              <Button
                variant="solid"
                isDisabled={isError.to || isError.amount || isError.from}
                colorScheme="green"
                onClick={handleConfirm}
                isLoading={isLoading || Txs.isLoading}
                loadingText="confirming"
              >
                Confirm
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }
  return (
    <Button isDisabled colorScheme="green">
      Confirmed
    </Button>
  );
}

export default TxAction;
