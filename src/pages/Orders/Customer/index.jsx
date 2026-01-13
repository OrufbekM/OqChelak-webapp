import BottomNav from "@/components/MobileNav";
import SecondaryInput from "@/components/SecondaryInput";
import { Box, Container, Flex, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";

function OrdersCustomer() {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("orders");

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Container
        maxW="container.sm"
        px={4}
        w="100%"
        display="flex"
        flexDirection="column"
        height="100vh"
      >
        <Box
          pt="6"
          flexShrink={0}
          position={"sticky"}
          top={"0"}
          zIndex={10}
          bg={"bg.primary"}
        >
          <Text fontSize="2xl" fontWeight="bold" textAlign="center" pb="10">
            {t("ordersCustomer.title")}
          </Text>
          <SecondaryInput
            placeholder={t("ordersCustomer.search")}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Flex justify="center" gap="8">
            {["orders", "history"].map((typeKey) => (
              <Box
                key={typeKey}
                cursor="pointer"
                onClick={() => setFilter(typeKey)}
                position="relative"
                pb="2"
              >
                <Text
                  fontWeight="medium"
                  color={filter === typeKey ? "text.light" : "text.timer"}
                >
                  {typeKey === "orders" ? t("customer.orders") : t("customer.history")}
                </Text>

                {filter === typeKey && (
                  <Box
                    position="absolute"
                    bottom="0"
                    left="0"
                    right="0"
                    h="3px"
                    bg="brand.main"
                    borderRadius="full"
                  />
                )}
              </Box>
            ))}
          </Flex>
        </Box>
      </Container>
      <BottomNav role={"customer"} />
    </Box>
  );
}

export default OrdersCustomer;
