import React from "react";
import { Box, Flex, Image, Container } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";

const BottomNav = ({ role }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const userRole = role || localStorage.getItem("role");

  const navItems = [
    {
      icon: "Package.svg",
      path:
        userRole === "customer"
          ? "/customer-orders"
          : userRole === "seller"
          ? "/seller-orders"
          : "/login",
    },
    {
      icon: "Home.svg",
      path:
        userRole === "customer"
          ? "/customer-home"
          : userRole === "seller"
          ? "/seller-home"
          : "/login",
    },
    {
      icon: "Settings.svg",
      path: "/settings",
    },
  ];

  return (
    <Box
      position="fixed"
      bottom="0"
      left="0"
      right="0"
      bg="bg.secondary"
      borderTop="1px solid"
      borderColor="accent.blueBorder"
      px={4}
      py={3}
      zIndex={100}
    >
      <Container maxW="container.sm" px={4} w="100%">
        <Flex
          maxW="sizes.container.sm"
          mx="auto"
          justify="space-between"
          align="center"
          px={4}
        >
          {navItems.map((item, index) => {
            const isActive =
              location.pathname === item.path ||
              location.pathname.startsWith(item.path + "/");

            return (
              <Flex
                key={index}
                direction="column"
                align="center"
                gap={3}
                cursor="pointer"
                onClick={() => {
                  if (item.path.includes("/seller") && userRole !== "seller") {
                    navigate(userRole === "customer" ? "/customer-home" : "/");
                    return;
                  }

                  if (item.path.includes("/customer") && userRole !== "customer") {
                    navigate(userRole === "seller" ? "/seller-home" : "/");
                    return;
                  }

                  navigate(item.path);
                }}
                color={isActive ? "brand.main" : "text.timer"}
                _hover={{ color: "brand.600" }}
              >
                <Box w="40px" h="40px" p={2} display="flex" alignItems="center" justifyContent="center">
                  <Image
                    src={`/images/${item.icon}`}
                    alt={`${item.icon} icon`}
                    objectFit="contain"
                    maxW="24px"
                    maxH="24px"
                    filter={isActive ? "none" : "grayscale(1) opacity(0.6)"}
                    transition="filter 150ms, transform 150ms"
                    _hover={{ transform: "scale(1.05)" }}
                  />
                </Box>

                {isActive && (
                  <Box w="5px" h="5px" bg="accent.orange" borderRadius="full" />
                )}
              </Flex>
            );
          })}
        </Flex>
      </Container>
    </Box>
  );
};

export default BottomNav;
