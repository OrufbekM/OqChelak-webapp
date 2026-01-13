import React from "react";
import { Box, Flex, Icon, Container } from "@chakra-ui/react";
import { Home, Package, Settings } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const BottomNav = ({ role }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Prefer explicit prop, otherwise fall back to persisted role from registration/login
  const userRole = role || localStorage.getItem("role");

  const navItems = [
    {
      icon: Package,
      path:
        userRole === "customer"
          ? "/customer-orders"
          : userRole === "seller"
          ? "/seller-orders"
          : "/login",
    },
    {
      icon: Home,
      path:
        userRole === "customer"
          ? "/customer-home"
          : userRole === "seller"
          ? "/seller-home"
          : "/login",
    },
    {
      icon: Settings,
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
            const isActive = location.pathname === item.path;

            return (
              <Flex
                key={index}
                direction="column"
                align="center"
                gap={3}
                cursor="pointer"
                onClick={() => {
                  // Protect cross-role navigation: if an item points to seller/customer pages
                  // but current user role doesn't match, redirect to the correct home or login
                  if (item.path.includes("/seller") && userRole !== "seller") {
                    navigate(userRole === "customer" ? "/customer-home" : "/login");
                    return;
                  }

                  if (item.path.includes("/customer") && userRole !== "customer") {
                    navigate(userRole === "seller" ? "/seller-home" : "/login");
                    return;
                  }

                  navigate(item.path);
                }}
                color={isActive ? "brand.main" : "text.timer"}
                _hover={{ color: "brand.600" }}
              >
                <Icon
                  as={item.icon}
                  boxSize={8}
                  color={"accent.blueLightAlt"}
                />

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
