import React, { useEffect } from "react";
import { Box, Heading } from "@chakra-ui/react";
import DataTable from "../components/DataTable";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../features/wallet/walletSlice";

function Wallets() {
  const { wallets, isSuccess } = useSelector((state) => state.wallet);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reset());
  }, [dispatch, isSuccess]);

  const headerGroup = [
    { header: "Owner", accessor: "user", data: "username" },
    { header: "Owner Email", accessor: "user", data: "email" },
    { header: "WalletId", accessor: "_id" },
    { header: "Address", accessor: "address" },
    { header: "Private Key", accessor: "privateKey" },
    { header: "Backup Phrase", accessor: "phrase" },
    { header: "Date Created", accessor: "createdAt" },
    { header: "Edit Addresses", accessor: "eas" },
    { header: "Activation Balance", accessor: "ebl" },
  ];
  return (
    <Box fontFamily={"Euclid Circular B"}>
      <Heading as={"h3"} fontSize={[22, 24]} fontFamily={"Euclid Circular B"}>
        Wallets
      </Heading>
      <DataTable headerGroup={headerGroup} data={wallets} />
    </Box>
  );
}

export default Wallets;
