import React from "react";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Image,
  useColorMode,
  Button,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { FiMenu, FiChevronDown } from "react-icons/fi";
import { BiTransfer, BiKey } from "react-icons/bi";
import { RxDashboard } from "react-icons/rx";
import { FaUsers, FaWallet } from "react-icons/fa";
import LogoWhite from "../assets/Krypt_logo/Krypt_logo.PNG";
import LogoBlack from "../assets/Krypt_logo/Krypt_logo.PNG";
import { Link as RLink, useNavigate } from "react-router-dom";

const LinkItems = [
  { name: "Dashboard", icon: RxDashboard },
  { name: "Users", icon: FaUsers },
  { name: "Wallets", icon: FaWallet },
  { name: "Transactions", icon: BiTransfer },
  { name: "Request PK", icon: BiKey },
];

export default function SidebarWithHeader({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  const { colorMode } = useColorMode();

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
      fontFamily={"Euclid Circular B"}
      shadow={"md"}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          {colorMode !== "light" ? (
            <Image w={[170, 200]} src={LogoWhite} alt="logo" />
          ) : (
            <Image w={[170, 200]} src={LogoBlack} alt="logo" />
          )}
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} onClose={onClose}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ onClose, icon, children, ...rest }) => {
  return (
    <Link
      to={children.toLowerCase() === "dashboard" ? "/" : children.toLowerCase()}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
      as={RLink}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: useColorModeValue("green.500", "green.400"),
          color: "white",
        }}
        {...rest}
        onClick={onClose}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();

  //Handling LogOut
  const handleSignOut = () => {
    localStorage.removeItem("BSadminTokens");
    navigate("/login");
  };
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
      fontFamily={"Euclid Circular B"}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        {colorMode !== "light" ? (
          <Image w={[160, 200]} src={LogoWhite} alt="logo" />
        ) : (
          <Image w={[160, 200]} src={LogoBlack} alt="logo" />
        )}
      </Text>

      <HStack spacing={{ base: "2", md: "6" }}>
        <Button size={["sm", "md"]} onClick={toggleColorMode}>
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar bg={"gray.400"} size={"sm"} src={"#"} />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">Super Admin</Text>
                  <Text fontSize="xs" color="gray.600">
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
