import React, { useEffect, useState } from "react";
import { Box, Flex, Heading } from "@chakra-ui/react";
import DataTable from "../components/DataTable";
import { useDispatch, useSelector } from "react-redux";
import CreateTransaction from "../components/createTransaction";
import { getTrnx, reset } from "../features/transaction/transactionSlice";

function Transactions() {
  const { transactions, isSuccess } = useSelector((state) => state.transaction);
  const dispatch = useDispatch();
  const [trnx, setTrnx] = useState(null);

  useEffect(() => {
    let tx = transactions?.filter((trx) => trx?.type !== "requestpk");
    setTrnx(tx);
  }, [transactions]);

  const headerGroup = [
    { header: "TxId", accessor: "_id" },
    { header: "User", accessor: "userFrom", data: "username" },
    { header: "User's Email", accessor: "userFrom", data: "email" },
    // { header: "From", accessor: "walletId" },
    // { header: "to", accessor: "to" },
    { header: "Token", accessor: "code" },
    { header: "Type", accessor: "type" },
    { header: "Amount", accessor: "amount" },
    { header: "Status", accessor: "status" },
    { header: "Date Created", accessor: "createdAt" },
    { header: "Action", accessor: "action" },
  ];
  // console.log(transactions);

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
          Transactions
        </Heading>
        <CreateTransaction />
      </Flex>
      <DataTable headerGroup={headerGroup} data={trnx} />
    </Box>
  );
}

export default Transactions;
