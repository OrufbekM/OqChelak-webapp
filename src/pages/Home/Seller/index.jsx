import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Input,
  InputGroup,
  Button,
  VStack,
  Image,
} from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import BottomNav from "@/components/BottomNav";

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
    if (time <= 5 * 60) return "semantic.error";
    if (time <= 10 * 60) return "semantic.warning";
    return "semantic.success";
  };

  const filteredOrders = orders.filter(
    (o) => (filter === "new" ? o.type === "new" : o.type === "old")
  );

  return (
    <Flex direction="column" minH="100vh" bg="surface.dark" pt={20}>
      <Box px="4" pt="6" flexShrink={0}>
        <Text fontSize="2xl" fontWeight="bold" textAlign="center" pb="10">
          Buyurtmalar
        </Text>

        <InputGroup
          bg="text.timer"
          borderRadius="full"
          mb="4"
          endElement={<LuSearch size={18} />}
        >
          <Input
            placeholder="Qidiruv..."
            bg="text.timer"
            border="1"
            borderRadius={'16px'}
            _focus={{ boxShadow: "none" }}
          />
        </InputGroup>

        <Flex justify="center" gap="8">
          {["new", "old"].map((t) => (
            <Box
              key={t}
              cursor="pointer"
              onClick={() => setFilter(t)}
              position="relative"
              pb="2"
            >
              <Text fontWeight="medium" color={filter === t ? "white" : "text.timer"}>
                {t === "new" ? "Yangi" : "Eski"}
              </Text>

              {filter === t && (
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

      <Box flex="1" overflowY="auto" px="4" py="4">
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
                        qolgan vaqt:{" "}
                        <Text as="span" color={getColor(order.time)} fontWeight="medium">
                          {formatTime(order.time)}
                        </Text>
                      </Text>
                    </Flex>

                    <Text fontSize="sm">Manzil: {order.address}</Text>
                    <Text fontSize="sm">Mijoz: {order.client}</Text>
                    <Text fontSize="sm" fontWeight="medium">
                      Narx: {order.price}
                    </Text>
                  </Box>
                </Flex>

                {/* Action Buttons */}
                <Flex>
                  <Button flex="1" borderRadius="0" bg="semantic.success" color="white">
                    Qabul qilish
                  </Button>
                  <Button flex="1" borderRadius="0" bg="semantic.error" color="white">
                    Bekor qilish
                  </Button>
                </Flex>
              </Box>
            );
          })}
        </VStack>

        
      </Box>
      <Box flexShrink={0}>
        <BottomNav />
      </Box>
    </Flex>
  );
};

export default Index;
