import { Heading, Flex, Stack, Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import DashStats from "./DashStats";
import { BsPerson } from "react-icons/bs";
import { FaWallet } from "react-icons/fa";
import { BiTransfer } from "react-icons/bi";
import DashTrxChart from "./DashTrxChart";
import { useDispatch, useSelector } from "react-redux";
import SetFee from "./SetFee";
import { reset } from "../features/auth/authSlice";

function DashScreen() {
  const { users } = useSelector((state) => state.user);
  const { isSuccess } = useSelector((state) => state.auth);
  const { wallets } = useSelector((state) => state.wallet);
  const { transactions } = useSelector((state) => state.transaction);
  const dispatch = useDispatch();

  //Handling Reset of auth
  useEffect(() => {
    isSuccess && dispatch(reset());
  }, [dispatch, isSuccess]);

  return (
    <Box fontFamily={"Euclid Circular B"} w={"100%"} px={3}>
      <Flex align={"center"} justify={"space-between"}>
        <Heading as={"h3"} fontSize={[22, 24]} fontFamily={"Euclid Circular B"}>
          Dashboard
        </Heading>
        <SetFee />
      </Flex>
      <Stack w={"100%"} gap={6}>
        <Flex
          direction={["column", "row"]}
          align={["space-between", "center"]}
          justifyContent={"space-between"}
          gap={4}
          py={4}
          w={"100%"}
        >
          <DashStats
            title={"Users"}
            stat={users?.length}
            icon={<BsPerson size={"5vw"} />}
          />
          <DashStats
            title={"Wallets"}
            stat={wallets?.length}
            icon={<FaWallet size={"5vw"} />}
          />
          <DashStats
            title={"Transaction"}
            stat={transactions?.length}
            icon={<BiTransfer size={"5vw"} />}
          />
        </Flex>
        <DashTrxChart trx={transactions} />
      </Stack>
    </Box>
  );
}

export default DashScreen;
