import {
  Flex,
  Box,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
  StatArrow,
  StatHelpText,
} from "@chakra-ui/react";
import NumberBeautify from "js-number-beautifier";
import React from "react";

function DashStats({ icon, stat, title }) {
  return (
    <Box flex={1} w={"100%"}>
      <Stat
        px={{ base: 2, md: 4 }}
        py={"5"}
        shadow={"xl"}
        border={"1px solid"}
        borderColor={useColorModeValue("gray.400", "gray.500")}
        rounded={"lg"}
        w={"100%"}
      >
        <Flex justifyContent={"space-between"}>
          <Box pl={{ base: 2, md: 4 }}>
            <StatLabel fontWeight={"medium"} isTruncated>
              {title}
            </StatLabel>
            <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
              {NumberBeautify(`${stat}`)}
            </StatNumber>
            <StatHelpText>
              <StatArrow type={stat < 5000 ? "decrease" : "increase"} />
              {stat < 5000 ? "9.06%" : "23.36%"}
            </StatHelpText>
          </Box>
          <Box
            my={"auto"}
            color={useColorModeValue("gray.400", "gray.200")}
            alignContent={"center"}
          >
            {icon}
          </Box>
        </Flex>
      </Stat>
    </Box>
  );
}

export default DashStats;
