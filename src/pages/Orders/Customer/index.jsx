import BottomNav from "@/components/MobileNav";
import SecondaryInput from "@/components/SecondaryInput";
import {
  Box,
  Button,
  Container,
  Flex,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import OrderStatusBadge from "@/components/OrderStatusBadge";
import { loadCustomerOrders, saveCustomerOrders } from "@/utils/customerOrders";

const demoOrders = [
  {
    id: 1001,
    product: "Milk",
    quantity: "1 litr",
    date: "17-avgust, 2026",
    status: "pending",
    image: "/images/milk.png",
    isReceivedConfirmed: false,
  },
  {
    id: 1002,
    product: "Milk",
    quantity: "2 litr",
    date: "18-avgust, 2026",
    status: "processing",
    image: "/images/milk.png",
    isReceivedConfirmed: false,
  },
  {
    id: 1003,
    product: "Milk",
    quantity: "1 litr",
    date: "19-avgust, 2026",
    status: "completed",
    image: "/images/milk.png",
    isReceivedConfirmed: false,
  },
];

function OrdersCustomer() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [orders, setOrders] = useState(() => {
    const saved = loadCustomerOrders();
    if (saved.length > 0) {
      return saved.map((order) => ({
        ...order,
        isReceivedConfirmed: Boolean(order.isReceivedConfirmed),
      }));
    }
    return demoOrders;
  });
  const [filter, setFilter] = useState(
    searchParams.get("tab") === "orders" ? "orders" : "history"
  );

  const tabs = ["orders", "history"];

  useEffect(() => {
    saveCustomerOrders(orders);
  }, [orders]);

  const filteredOrders = orders.filter((order) => {
    const byText = order.product.toLowerCase().includes(query.toLowerCase());
    if (!byText) return false;

    if (filter === "history") {
      return (
        order.status === "pending" ||
        order.status === "processing" ||
        (order.status === "completed" && !order.isReceivedConfirmed)
      );
    }

    return order.status === "completed" && order.isReceivedConfirmed;
  });

  const handleAccept = (id) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, isReceivedConfirmed: true } : order
      )
    );
    setFilter("orders");
  };

  const handleReject = (id) => {
    setOrders((prev) =>
      prev.filter((order) => order.id !== id)
    );
  };

  const getCardTitle = (order) => {
    if (order.status === "completed" && !order.isReceivedConfirmed) {
      return t("ordersCustomer.confirmQuestion");
    }
    if (order.status === "completed" && order.isReceivedConfirmed) {
      return t("ordersCustomer.thankYouPurchase");
    }
    return t("ordersCustomer.waitingSeller");
  };

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
            {tabs.map((typeKey) => (
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
                  {typeKey === "orders"
                    ? t("customer.orders")
                    : t("customer.history")}
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
        <Box flex="1" overflowY="auto" py={4} pb="90px">
          <VStack spacing={4}>
            {filteredOrders.length === 0 && (
              <Text color="text.timer" textAlign="center" pt={8}>
                {t("ordersCustomer.noOrders")}
              </Text>
            )}
            {filteredOrders.map((order) => (
              <Box
                key={order.id}
                w="100%"
                bg={
                  order.status === "completed" && order.isReceivedConfirmed
                    ? "green.700"
                    : "accent.blueCard"
                }
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
                    <Image src={order.image} alt={order.product} boxSize="70px" />
                  </Box>
                  <Box flex="1">
                    <Text fontSize="xl" fontWeight="bold" lineHeight="1.2">
                      {getCardTitle(order)}
                    </Text>
                    <Text mt={1} fontSize="sm">
                      {t("ordersCustomer.quantity")}{" "}
                      <Text as="span" color="accent.orange" fontWeight="semibold">
                        {order.quantity}
                      </Text>
                    </Text>
                    <Text fontSize="sm">
                      {t("ordersCustomer.date")}{" "}
                      <Text as="span" color="accent.orange" fontWeight="semibold">
                        {order.date}
                      </Text>
                    </Text>
                    <Flex mt={2} align="center" justify="flex-end" gap={2}>
                      <OrderStatusBadge status={order.status} />
                    </Flex>
                  </Box>
                </Flex>
                {order.status === "completed" && !order.isReceivedConfirmed && (
                  <Flex px={4} pb={4} gap={3}>
                    <Button
                      flex={1}
                      bg="red.400"
                      color="white"
                      borderRadius="full"
                      onClick={() => handleReject(order.id)}
                      _hover={{ bg: "red.500" }}
                    >
                      {t("ordersCustomer.no")}
                    </Button>
                    <Button
                      flex={1}
                      bg="green.400"
                      color="white"
                      borderRadius="full"
                      onClick={() => handleAccept(order.id)}
                      _hover={{ bg: "green.500" }}
                    >
                      {t("ordersCustomer.yes")}
                    </Button>
                  </Flex>
                )}
              </Box>
            ))}
          </VStack>
        </Box>
      </Container>
      <BottomNav role={"customer"} />
    </Box>
  );
}

export default OrdersCustomer;
