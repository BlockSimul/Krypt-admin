import React, { useEffect, useState } from "react";
import { Box, Flex, Heading } from "@chakra-ui/react";
import DataTable from "../components/DataTable";
import { useDispatch, useSelector } from "react-redux";
import { getTrnx, reset } from "../features/transaction/transactionSlice";
import RequestPkComp from "../components/RequestPkComp";

function RequestPk() {
  const { transactions, isSuccess } = useSelector((state) => state.transaction);
  const dispatch = useDispatch();
  const [requestPk, setRequestPk] = useState(null);

  const headerGroup = [
    { header: "TxId", accessor: "_id" },
    { header: "User", accessor: "userFrom", data: "username" },
    // { header: "From", accessor: "walletId" },
    // { header: "to", accessor: "to" },
    { header: "Token", accessor: "code" },
    { header: "Type", accessor: "type" },
    { header: "Amount", accessor: "amount" },
    { header: "Status", accessor: "status" },
    { header: "Date Created", accessor: "createdAt" },
    { header: "Action", accessor: "action" },
  ];

  //get RequestPk
  useEffect(() => {
    if (transactions) {
      let tx = transactions?.filter((trnx) => trnx?.type === "requestpk");
      setRequestPk(tx);
      console.log(tx);
    }
  }, [transactions]);

  //Clean up
  useEffect(() => {
    dispatch(reset());
  }, [dispatch, isSuccess]);

  //Get Transactions
  useEffect(() => {
    dispatch(getTrnx());
  }, [dispatch]);
  return (
    <Box fontFamily={"Euclid Circular B"}>
      <Flex align={"center"} justify={"space-between"}>
        <Heading as={"h3"} fontSize={[22, 24]} fontFamily={"Euclid Circular B"}>
          Request Of Private Key
        </Heading>

        <RequestPkComp />
      </Flex>
      <DataTable headerGroup={headerGroup} data={requestPk} />
    </Box>
  );
}

export default RequestPk;
