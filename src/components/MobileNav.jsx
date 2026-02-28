import React from "react";
import { Box, Flex, Image, Container, Text } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const BottomNav = ({ role }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const userRole = role || localStorage.getItem("role");

  const navItems = [
    {
      icon: "Package.svg",
      labelKey: "nav.orders",
      path:
        userRole === "customer"
          ? "/customer-orders"
          : userRole === "seller"
            ? "/seller-orders"
            : "/",
    },
    {
      icon: "Home.svg",
      labelKey: "nav.home",
      path:
        userRole === "customer"
          ? "/customer-home"
          : userRole === "seller"
            ? "/seller-home"
            : "/",
    },
    {
      icon: "User.svg",
      labelKey: "nav.profile",
      path: "/settings/profile",
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
      px={0}
      py={3}
      zIndex={100}
    >
      <Container maxW="container.sm" px={4} w="100%">
        <Flex
          maxW="sizes.container.sm"
          mx="auto"
          justify="space-between"
          align="center"
          px={0}
        >
          {navItems.map((item, index) => {
            const isProfilePath = location.pathname === "/settings/profile";
            const isActive =
              item.path === "/settings/profile"
                ? isProfilePath
                : item.path === "/settings"
                  ? (location.pathname === "/settings" ||
                      location.pathname.startsWith("/settings/")) &&
                    !isProfilePath
                  : location.pathname === item.path ||
                    location.pathname.startsWith(item.path + "/");

            return (
              <Flex
                key={index}
                flex={1}
                minW={0}
                direction="column"
                align="center"
                justify="center"
                gap={0.5}
                cursor="pointer"
                onClick={() => {
                  if (item.path.includes("/seller") && userRole !== "seller") {
                    navigate(userRole === "customer" ? "/customer-home" : "/");
                    return;
                  }

                  if (
                    item.path.includes("/customer") &&
                    userRole !== "customer"
                  ) {
                    navigate(userRole === "seller" ? "/seller-home" : "/");
                    return;
                  }

                  navigate(item.path);
                }}
                color={isActive ? "brand.main" : "text.timer"}
                _hover={{ color: "brand.600" }}
              >
                <Box
                  w="40px"
                  h="40px"
                  p={2}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
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

                <Text
                  fontSize="xs"
                  fontWeight={isActive ? "semibold" : "normal"}
                  noOfLines={1}
                  textAlign="center"
                  whiteSpace="nowrap"
                  w="100%"
                >
                  {t(item.labelKey)}
                </Text>
              </Flex>
            );
          })}
        </Flex>
      </Container>
    </Box>
  );
};

export default BottomNav;
