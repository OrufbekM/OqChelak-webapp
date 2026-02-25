import BottomNav from "@/components/MobileNav";
import SecondaryInput from "@/components/SecondaryInput";
import {
  Box,
  Container,
  Flex,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import React, { useMemo, useState } from "react";

const demoOrders = [
  {
    id: 2001,
    product: "Sut",
    quantity: "1 litr",
    price: 11000,
    date: "2025-07-21",
    status: "processing",
    image: "/images/milk.png",
  },
  {
    id: 2002,
    product: "Sut",
    quantity: "2 litr",
    price: 22000,
    date: "2025-07-22",
    status: "completed",
    image: "/images/milk.png",
  },
  {
    id: 2003,
    product: "Sut",
    quantity: "1 litr",
    price: 11000,
    date: "2025-07-23",
    status: "completed",
    image: "/images/milk.png",
  },
];

function OrdersSeller() {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("inProgress");

  const normalizedQuery = query.trim().toLowerCase();

  const filteredOrders = useMemo(() => {
    return demoOrders.filter((order) => {
      const localizedStatus = t(`orderStatus.${order.status}`, {
        defaultValue: order.status,
      }).toLowerCase();

      const searchableText = [
        order.product,
        order.quantity,
        order.date,
        order.status,
        localizedStatus,
        order.price,
      ]
        .join(" ")
        .toLowerCase();

      const byText = searchableText.includes(normalizedQuery);
      if (!byText) return false;

      if (filter === "delivered") {
        return order.status === "completed";
      }

      return order.status !== "completed";
    });
  }, [filter, normalizedQuery, t]);

  const emptyMessage = normalizedQuery
    ? t("settings.search.noResults")
    : t("ordersSeller.noOrders");

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
          pt="8"
          flexShrink={0}
          position={"sticky"}
          top={"0"}
          zIndex={10}
          bg={"bg.primary"}
        >
          <Text fontSize="2xl" fontWeight="bold" textAlign="center" pb="6">
            {t("ordersSeller.title")}
          </Text>
          <SecondaryInput
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Box>
        <Flex justify="center" gap="8">
          {["delivered", "inProgress"].map((typeKey) => (
            <Box
              key={typeKey}
              cursor="pointer"
              onClick={() => setFilter(typeKey)}
              position="relative"
              pb="2"
            >
              <Text
                fontWeight="medium"
                color={filter === typeKey ? "text.primary" : "text.timer"}
              >
                {t(`ordersSeller.${typeKey}`)}
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

        <Box flex="1" overflowY="auto" py={4} pb="90px">
          <VStack spacing={4}>
            {filteredOrders.length === 0 && (
              <Text color="text.timer" textAlign="center" pt={8}>
                {emptyMessage}
              </Text>
            )}
            {filteredOrders.map((order) => (
              <Box
                key={order.id}
                w="100%"
                bg="accent.blueCard"
                color="text.light"
                borderRadius="xl"
                overflow="hidden"
              >
                <Flex p={4} gap={3}>
                  <Box
                    w="88px"
                    h="88px"
                    borderRadius="lg"
                    bg="product.milk.bg"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexShrink={0}
                  >
                    <Image
                      src={order.image}
                      alt={order.product}
                      boxSize="70px"
                    />
                  </Box>
                  <Box flex="1">
                    <Text fontSize="xl" fontWeight="bold" lineHeight="1.2">
                      {order.product}
                    </Text>
                    {typeof order.price === "number" && (
                      <Text mt={1} fontSize="sm">
                        {t("customer.price")}{" "}
                        <Text
                          as="span"
                          color="accent.orange"
                          fontWeight="semibold"
                        >
                          {order.price.toLocaleString()} {t("common.currency")}
                        </Text>
                      </Text>
                    )}
                    <Text fontSize="sm">
                      {t("ordersCustomer.quantity")}{" "}
                      <Text
                        as="span"
                        color="accent.orange"
                        fontWeight="semibold"
                      >
                        {order.quantity}
                      </Text>
                    </Text>
                    <Text fontSize="sm">
                      {t("ordersCustomer.date")}{" "}
                      <Text
                        as="span"
                        color="accent.orange"
                        fontWeight="semibold"
                      >
                        {order.date}
                      </Text>
                    </Text>
                    <Text fontSize="sm">
                      {t("ordersCustomer.status")}{" "}
                      <Text
                        as="span"
                        color="accent.orange"
                        fontWeight="semibold"
                      >
                        {t(`orderStatus.${order.status}`)}
                      </Text>
                    </Text>
                  </Box>
                </Flex>
              </Box>
            ))}
          </VStack>
        </Box>
      </Container>
      <BottomNav role={"seller"} />
    </Box>
  );
}

export default OrdersSeller;
