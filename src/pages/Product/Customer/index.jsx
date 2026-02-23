import React, { useEffect, useMemo, useState } from "react";
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
import { useNavigate, useSearchParams } from "react-router-dom";
import BottomNav from "@/components/MobileNav";
import { appendCustomerOrder } from "@/utils/customerOrders";
import { customerProducts } from "@/data/products";

const volumes = ["1L", "2L", "3L"];
const fats = ["0% Skimmed", "2.5% Semi", "3.2% Whole"];

const quantityByVolume = {
  "1L": "1 litr",
  "2L": "2 litr",
  "3L": "3 litr",
};

const priceByVolume = {
  "1L": 11000,
  "2L": 22000,
  "3L": 33000,
};

function CustomerProduct() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedVolume, setSelectedVolume] = useState("1L");
  const [selectedFat, setSelectedFat] = useState("2.5% Semi");
  const productId = searchParams.get("id");
  const product =
    customerProducts.find((item) => item.id === productId) || customerProducts[0];

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole && storedRole !== "customer") {
      navigate(storedRole === "seller" ? "/seller-home" : "/login", {
        replace: true,
      });
    }
  }, [navigate]);

  const totalPrice = useMemo(
    () => priceByVolume[selectedVolume] || priceByVolume["1L"],
    [selectedVolume]
  );

  const handleAddToCart = () => {
    const order = {
      id: Date.now(),
      product: product.name,
      quantity: quantityByVolume[selectedVolume] || "1 litr",
      date: new Date().toLocaleDateString(i18n.language || "uz-UZ"),
      status: "pending",
      image: product.image,
      fat: selectedFat,
      isReceivedConfirmed: false,
    };

    appendCustomerOrder(order);
    navigate("/customer-orders?tab=history");
  };

  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
      <Container
        maxW="container.sm"
        px={4}
        w="100%"
        display="flex"
        flexDirection="column"
        h="100vh"
      >
        <Box py={6} pb="90px" overflowY="auto">
          <Box borderRadius="2xl" overflow="hidden" position="relative" mb={6}>
            <Image
              src={product.coverImage || product.image}
              fallbackSrc={product.image}
              alt={product.name}
              w="100%"
              h="220px"
              objectFit="cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = product.image;
              }}
            />
            <Box position="absolute" inset="0" bg="blackAlpha.300" />
            <VStack
              align="flex-start"
              spacing={1}
              position="absolute"
              left={4}
              right={4}
              bottom={4}
            >
              <Text fontSize="3xl" color="white" fontWeight="bold">
                {product.name}
              </Text>
              <Text color="whiteAlpha.800">{product.description}</Text>
            </VStack>
          </Box>

          <Text fontSize="sm" fontWeight="bold" mb={3}>
            {t("productPage.selectVolume")}
          </Text>
          <Flex gap={3} mb={6}>
            {volumes.map((volume) => (
              <Button
                key={volume}
                flex={1}
                h="44px"
                borderRadius="xl"
                bg={selectedVolume === volume ? "brand.main" : "white"}
                color={selectedVolume === volume ? "white" : "text.primary"}
                borderWidth="1px"
                borderColor="gray.200"
                _dark={{
                  bg: selectedVolume === volume ? "brand.main" : "gray.700",
                  color: selectedVolume === volume ? "white" : "whiteAlpha.900",
                  borderColor: "whiteAlpha.300",
                }}
                _hover={{
                  bg: "brand.main",
                }}
                onClick={() => setSelectedVolume(volume)}
              >
                {volume}
              </Button>
            ))}
          </Flex>

          <Text fontSize="sm" fontWeight="bold" mb={3}>
            {t("productPage.fatPercentage")}
          </Text>
          <Flex gap={3} mb={8}>
            {fats.map((fat) => (
              <Button
                key={fat}
                flex={1}
                h="44px"
                borderRadius="xl"
                bg={selectedFat === fat ? "brand.main" : "white"}
                color={selectedFat === fat ? "white" : "text.primary"}
                borderWidth="1px"
                borderColor={"gray.200"}
                _dark={{
                  bg: selectedFat === fat ? "brand.main" : "gray.700",
                  color: selectedFat === fat ? "white" : "whiteAlpha.900",
                  borderColor: selectedFat === fat ? "brand.main" : "whiteAlpha.300",
                }}
                _hover={{
                  bg: "brand.main",
                }}
                onClick={() => setSelectedFat(fat)}
              >
                {fat}
              </Button>
            ))}
          </Flex>

          <Box mb={3}>
            <Text color="text.timer" fontSize="sm">
              {t("productPage.totalPrice")}
            </Text>
            <Text fontSize="3xl" fontWeight="bold">
              {totalPrice.toLocaleString()} so'm
            </Text>
          </Box>

          <Button
            w="100%"
            h="52px"
            borderRadius="xl"
            bg="brand.main"
            color="white"
            onClick={handleAddToCart}
            _hover={{ bg: "blue.600" }}
          >
            {t("productPage.addToCart")}
          </Button>
        </Box>
      </Container>
      <BottomNav role="customer" />
    </Box>
  );
}

export default CustomerProduct;
