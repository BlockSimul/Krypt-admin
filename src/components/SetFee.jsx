import React, { useEffect, useState } from "react";
import { SettingsIcon } from "@chakra-ui/icons";
import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
  Text,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { configure } from "../features/auth/authSlice";

function SetFee() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setting, isLoading, isSuccess } = useSelector((state) => state.auth);
  const [set, setSet] = useState({});
  const dispatch = useDispatch();

  //setting Set
  useEffect(() => {
    setting && setSet(setting);
  }, [setting]);

  //handlingFees success
  useEffect(() => {
    isSuccess && onClose();
  }, [isSuccess, onClose]);

  //handling Change
  const handleChange = (e, name) => {
    setSet({ ...set, [name]: e });
  };

  //handling setting of change
  const handleFees = () => {
    dispatch(configure(set));
  };
  return (
    <>
      <Button onClick={onOpen} colorScheme={"yellow"}>
        <SettingsIcon mr={2} />
        Set Fees
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent fontFamily={"Euclid Circular B"}>
          <ModalHeader>Set Fee</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Set both Gas fee and Private key fees
            <Stack my={2}>
              <Text>Gas Fee (BTC)</Text>
              <NumberInput
                onChange={(e) => handleChange(e, "gasfee")}
                value={set?.gasfee}
                precision={8}
                name={"gasfee"}
              >
                <NumberInputField />
              </NumberInput>
            </Stack>
            <Stack my={2}>
              <Text>PrivateKey Fees (BTC)</Text>
              <NumberInput
                onChange={(e) => handleChange(e, "privateKey")}
                value={set?.privateKey}
                precision={8}
                name={"privateKey"}
              >
                <NumberInputField />
              </NumberInput>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button
              isDisabled={JSON.stringify(setting) === JSON.stringify(set)}
              variant="outline"
              colorScheme="yellow"
              isLoading={isLoading}
              loadingText="Setting Fees"
              onClick={handleFees}
            >
              Set Fee
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SetFee;
