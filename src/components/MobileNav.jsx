import React from "react";
import { Box, Flex, Icon, Container } from "@chakra-ui/react";
import { Home, Package, Settings } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const BottomNav = ({ role }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      icon: Package,
      path: role === "customer" ? "/customer-orders" : "/seller-orders",
    },
    {
      icon: Home,
      path: role === "customer" ? "/customer-home" : "/seller-home",
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
                onClick={() => navigate(item.path)}
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
