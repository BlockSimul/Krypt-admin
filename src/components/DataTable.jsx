import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Flex,
  HStack,
  Select,
  Text,
  Input,
  useColorModeValue,
  Button,
  Badge,
  // useColorModeValue,
} from "@chakra-ui/react";
import EditBalance from "./EditBalance";
import TxAction from "./TxAction";
import EditAddresses from "./EditAddreses";

function DataTable({ headerGroup, data }) {
  const [entries, setEntries] = useState(
    data?.length < 100 ? data?.length : 100
  );
  const [PrevCount, setPrevCount] = useState(0);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  //Pagination
  const [pagesQuantity, setPagesQuantity] = useState(0);
  const [curPage, setCurPage] = useState(1);
  const activeStyles = useColorModeValue("green.400", "green.500");
  const borderColor = useColorModeValue("gray.400", "gray.500");
  const handlePageChange = (page) => {
    setCurPage(page);
    setPrevCount(page * entries - entries);
    setFilteredData(
      data?.filter(
        (dat, index) =>
          index >= page * entries - entries &&
          index < entries + page * entries - entries
      )
    );
  };

  const handleNext = () => {
    setCurPage(curPage + 1);
    setPrevCount(PrevCount + entries);
    setFilteredData(
      data?.filter(
        (dat, index) =>
          index >= PrevCount + entries && index < entries + PrevCount + entries
      )
    );
  };

  const handlePrev = () => {
    setCurPage(curPage - 1);
    setPrevCount(PrevCount - entries);
    setFilteredData(
      data?.filter(
        (dat, index) =>
          index >= PrevCount - entries && index < entries + PrevCount - entries
      )
    );
  };

  useEffect(() => {
    const pagesTotal = Math.ceil(data?.length / entries);

    setPagesQuantity(pagesTotal);
  }, [data?.length, entries]);

  useEffect(() => {
    if (data !== null && data !== undefined) {
      let filt = [...data];
      filt?.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt));
      setFilteredData(filt);
    }
  }, [data]);

  //handling entries filter
  const handleEntries = (e) => {
    setEntries(parseInt(e.target.value));
    setFilteredData(data);
    if (pagesQuantity !== 1) {
      setPrevCount(
        curPage * parseInt(e.target.value) - parseInt(e.target.value)
      );
      setFilteredData(
        data?.filter(
          (dat, index) =>
            index >=
              parseInt(curPage) * parseInt(e.target.value) -
                parseInt(e.target.value) &&
            index <
              entries +
                parseInt(curPage) * parseInt(e.target.value) -
                parseInt(e.target.value)
        )
      );
      if (curPage !== 1 && parseInt(e.target.value) === data.length) {
        setCurPage(1);
        setPrevCount(0);
        setFilteredData([...data]);
      }
    }
  };

  //handling search filter
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setFilteredData(
      data?.filter((dat) => JSON.stringify(dat).includes(e.target.value))
    );
  };

  return (
    <Box fontFamily={"Euclid Circular B"} py={4}>
      <Flex
        direction={["column", "row"]}
        align={["start", "center"]}
        justify="space-between"
        gap={3}
        px={2}
        py={[2, 4]}
      >
        <HStack>
          <Text fontSize={[16, 18]}>Show</Text>
          <Select fontSize={[16, 18]} value={entries} onChange={handleEntries}>
            {Array(100)
              .fill()
              .map((arr, index) => (
                <option key={index} value={arr}>
                  {index + 1}
                </option>
              ))}
          </Select>
          <Text fontSize={[16, 18]}>entries</Text>
        </HStack>

        <HStack>
          <Text fontSize={[16, 18]}>Search:</Text>
          <Input fontSize={[16, 18]} value={search} onChange={handleSearch} />
        </HStack>
      </Flex>
      <TableContainer shadow="md" fontFamily={"Euclid Circular B"}>
        <Table
          variant="striped"
          colorScheme="teal"
          fontFamily={"Euclid Circular B"}
        >
          <Thead>
            <Tr>
              <Th isNumeric>S/N</Th>
              {headerGroup.map((header, index) => (
                <Th key={index}>{header.header}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {Array(
              entries > filteredData?.length ? filteredData?.length : entries
            )
              .fill()
              .map((filt, index) => (
                <Tr key={index}>
                  <Td isNumeric>{index + 1 + parseInt(PrevCount)}</Td>
                  {headerGroup.map((hg, inx) => (
                    <Td key={inx}>
                      {filteredData?.[index][hg.accessor] === true ? (
                        <Badge variant="solid" colorScheme="green">
                          Verified
                        </Badge>
                      ) : filteredData?.[index][hg.accessor] &&
                        hg.accessor === "createdAt" ? (
                        Intl.DateTimeFormat("en", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }).format(new Date(filteredData?.[index][hg.accessor]))
                      ) : hg.accessor === "ebl" ? (
                        <EditBalance wallet={filteredData?.[index]} />
                      ) : hg.accessor === "eas" ? (
                        <EditAddresses wallet={filteredData?.[index]} />
                      ) : hg.accessor === "status" ? (
                        <Badge
                          variant="subtle"
                          colorScheme={
                            filteredData?.[index][hg.accessor] === "pending"
                              ? "yellow"
                              : "green"
                          }
                        >
                          {filteredData?.[index][hg.accessor] === "pending"
                            ? "Pending"
                            : "Confirmed"}
                        </Badge>
                      ) : hg.accessor === "action" ? (
                        <TxAction
                          data={filteredData?.[index]}
                          status={filteredData?.[index]?.["status"]}
                        />
                      ) : hg.accessor === "user" ||
                        hg.accessor === "userFrom" ||
                        hg.accessor === "userTo" ? (
                        filteredData?.[index][hg.accessor]?.[hg.data]
                      ) : (
                        filteredData?.[index][hg.accessor]
                      )}
                    </Td>
                  ))}
                </Tr>
              ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th isNumeric>S/N</Th>
              {headerGroup.map((header, index) => (
                <Th key={index}>{header.header}</Th>
              ))}
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
      <Flex py={4} px={2} align={["start", "center"]} justify="space-between">
        <Text fontSize={[16, 18]}>
          Showing {PrevCount + 1} to{" "}
          {PrevCount > 0 ? entries + PrevCount - 1 : entries} of {data?.length}{" "}
          entries
        </Text>
        <HStack
          border={"1px solid"}
          borderColor={useColorModeValue("gray.400", "gray.500")}
          rounded={"lg"}
          px={2}
          align="center"
        >
          <Button
            fontSize={[16, 18]}
            isDisabled={curPage === 1}
            m={0}
            onClick={handlePrev}
          >
            Prev
          </Button>
          {Array(pagesQuantity || 0)
            .fill()
            .map((ar, index) => (
              <Box
                border={"1px solid"}
                borderColor={borderColor}
                px={2}
                bg={curPage === index + 1 && activeStyles}
                m={"0 !important"}
                onClick={() => handlePageChange(index + 1)}
                cursor={"pointer"}
                display={["none", "block"]}
              >
                {index + 1}
              </Box>
            ))}

          <Button
            fontSize={[16, 18]}
            m={0}
            isDisabled={curPage === pagesQuantity}
            onClick={handleNext}
          >
            Next
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
}

export default DataTable;
