import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import DataTable from "../components/DataTable";
import { useSelector } from "react-redux";

function Users() {
  const { users } = useSelector((state) => state.user);
  const headerGroup = [
    { header: "Username", accessor: "username" },
    { header: "Email", accessor: "email" },
    { header: "UserId", accessor: "_id" },
    { header: "Status", accessor: "isVerified" },
    { header: "Date Joined", accessor: "createdAt" },
  ];
  return (
    <Box fontFamily={"Euclid Circular B"}>
      <Heading as={"h3"} fontSize={[22, 24]} fontFamily={"Euclid Circular B"}>
        Users
      </Heading>
      <DataTable headerGroup={headerGroup} data={users} />
    </Box>
  );
}

export default Users;
