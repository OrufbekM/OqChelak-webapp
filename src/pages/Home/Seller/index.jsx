import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  VStack,
  Image,
  Container,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import BottomNav from "@/components/MobileNav";
import SecondaryInput from "@/components/SecondaryInput";

const INITIAL_TIME = 20 * 60;

const ordersData = [
  {
    id: 1,
    type: "new",
    product: "Sut 1 litr",
    address: "Andijon, 2-kichik daha",
    client: "John Doe",
    price: "11,000 som",
    time: INITIAL_TIME,
  },
  {
    id: 2,
    type: "new",
    product: "Sut 1 litr",
    address: "Andijon, 2-kichik daha",
    client: "John Doe",
    price: "11,000 som",
    time: 10 * 60,
  },
  {
    id: 3,
    type: "old",
    product: "Sut 1 litr",
    address: "Andijon, 2-kichik daha",
    client: "John Doe",
    price: "11,000 som",
    time: 5 * 60,
  },
];

const Index = () => {
  const { t } = useTranslation();
  const [orders, setOrders] = useState(ordersData);
  const [filter, setFilter] = useState("new");

  // Timer for countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setOrders((prev) =>
        prev.map((o) => ({
          ...o,
          time: o.time > 0 ? o.time - 1 : 0,
        }))
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const getColor = (time) => {
    if (time <= 5 * 60) return "accent.orange";
    if (time <= 10 * 60) return "accent.yellow";
    return "accent.blue";
  };

  const filteredOrders = orders.filter(
    (o) => (filter === "new" ? o.type === "new" : o.type === "old")
  );

  return (
    <Box bg="bg.primary" minH="100vh" display="flex" alignItems="center" justifyContent="center">
      <Container maxW="container.sm" px={4} w="100%">
        <Flex direction="column" minH="100vh" pt={20} pb="80px">
          <Box pt="6" flexShrink={0}>
            <Text fontSize="2xl" fontWeight="bold" textAlign="center" pb="10">
              {t("seller.orders")}
            </Text>

            <SecondaryInput />

            <Flex justify="center" gap="8">
            {["new", "old"].map((typeKey) => (
  <Box key={typeKey} cursor="pointer" onClick={() => setFilter(typeKey)} position="relative" pb="2">
    <Text fontWeight="medium" color={filter === typeKey ? "text.light" : "text.timer"}>
      {typeKey === "new" ? t("seller.new") : t("seller.old")}
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

          <Box flex="1" overflowY="auto" py="4">
            <VStack spacing="4">
              {filteredOrders.map((order) => {
                const progress = (order.time / INITIAL_TIME) * 100;

                return (
                  <Box
                    key={order.id}
                    w="100%"
                    bg="bg.secondary"
                    borderRadius="xl"
                    overflow="hidden"
                    position="relative"
                  >
                    <Box
                      position="absolute"
                      top="0"
                      left="0"
                      h="4px"
                      w={`${progress}%`}
                      bg={getColor(order.time)}
                      transition="width 1s linear"
                    />

                    <Flex p="4" gap="3">
                      <Flex
                        w="100px"
                        h="100px"
                        align="center"
                        justify="center"
                        borderRadius="lg"
                        bg="product.milk.bg"
                      >
                        <Image src="/images/milk.png" alt="milk" />
                      </Flex>

                      <Box flex="1">
                        <Flex justify="space-between">
                          <Text fontWeight="semibold">{order.product}</Text>
                          <Text fontSize="sm" color="text.timer">
                            {t("seller.remainingTime")}{" "}
                            <Text as="span" color={getColor(order.time)} fontWeight="medium">
                              {formatTime(order.time)}
                            </Text>
                          </Text>
                        </Flex>

                        <Text fontSize="sm">{t("seller.address")} {order.address}</Text>
                        <Text fontSize="sm">{t("seller.client")} {order.client}</Text>
                        <Text fontSize="sm" fontWeight="medium">
                          {t("seller.price")} {order.price}
                        </Text>
                      </Box>
                    </Flex>

                    {/* Action Buttons */}
                    <Flex>
                      <Button flex="1" borderRadius="0" bg="accent.blue" color="text.light">
                        {t("seller.accept")}
                      </Button>
                      <Button flex="1" borderRadius="0" bg="accent.orange" color="text.light">
                        {t("seller.cancel")}
                      </Button>
                    </Flex>
                  </Box>
                );
              })}
            </VStack>
          </Box>
        </Flex>
      </Container>
      <BottomNav role="seller" />
    </Box>
  );
};

export default Index;
