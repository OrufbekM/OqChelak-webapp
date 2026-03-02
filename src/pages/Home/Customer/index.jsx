import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Image,
  Container,
  SimpleGrid,
  Icon,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { ShoppingBag } from "lucide-react";
import BottomNav from "@/components/MobileNav";
import SecondaryInput from "@/components/SecondaryInput";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  // TODO: Replace with backend response when customer home products API is ready.
  const customerHomeProducts = [
    {
      id: "milk-1",
      nameKey: "customer.milk",
      descriptionKey: "customer.milkDescription",
      price: 11000,
      originalPrice: 11500,
      image: "/images/milk.png",
      rating: 4.9,
      reviewsCount: 40310,
    },
  ];

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole && storedRole !== "customer") {
      navigate(storedRole === "seller" ? "/seller-home" : "/login", {
        replace: true,
      });
    }
  }, [navigate]);

  const filteredProducts = customerHomeProducts.filter((item) => {
    const localizedName = t(item.nameKey);
    return localizedName.toLowerCase().includes(query.toLowerCase());
  });

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
          pt={{ base: 6, md: 8 }}
          flexShrink={0}
          position="sticky"
          top="0"
          zIndex={10}
          bg="bg.primary"
        >
          <Text
            fontSize={{ base: "xl", md: "2xl" }}
            fontWeight="bold"
            textAlign="center"
            pb={{ base: 4, md: 6 }}
          >
            {t("customer.title")}
          </Text>
          <SecondaryInput
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Box>

        <Box
          flex="1"
          overflowY="auto"
          py="3"
          pb="80px"
        >
          {filteredProducts.length === 0 ? (
            <Text color="text.timer" textAlign="center" pt={8}>
              {t("settings.search.noResults")}
            </Text>
          ) : (
            <SimpleGrid
              columns={{ base: 2, md: 2 }}
              spacing={{ base: 3, md: 4 }}
              px={{ base: 0, md: 0.5 }}
            >
              {filteredProducts.map((item) => {
                return (
                  <Box
                    key={item.id}
                    bg="bg.secondary"
                    _dark={{ boxShadow: "0 8px 24px rgba(0, 0, 0, 0.45)" }}
                    borderRadius="18px"
                    overflow="hidden"
                    boxShadow="0 8px 20px rgba(22, 21, 37, 0.08)"
                    cursor="pointer"
                    onClick={() =>
                      navigate(`/customer-product?id=${item.id}`)
                    }
                  >
                    <Box
                      position="relative"
                      h={{ base: "140px", md: "180px" }}
                      bg="product.milk.bg"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      borderRadius="16px"
                      m={1.5}
                    >
                      <Image
                        src={item.image}
                        alt={t(item.nameKey)}
                        maxH="145px"
                        objectFit="contain"
                      />
                    </Box>

                    <Box px={2.5} pb={2.5}>
                      <Text
                        fontSize={{ base: "lg", md: "xl" }}
                        fontWeight="bold"
                        color="text.primary"
                        lineHeight="1.2"
                        mb={1}
                        noOfLines={2}
                      >
                        {t(item.nameKey)}
                      </Text>
                      <Flex align="center" gap={1} mb={2}>
                        <Text
                          fontSize={{ base: "xl", md: "2xl" }}
                          fontWeight="bold"
                          color="brand.main"
                          lineHeight="1.1"
                        >
                          {item.price.toLocaleString()}
                        </Text>
                        <Text
                          fontSize={{ base: "sm", md: "md" }}
                          fontWeight="semibold"
                          color="text.primary"
                        >
                          {t("common.currency")}
                        </Text>
                      </Flex>

                      <Text
                        fontSize={{ base: "sm", md: "md" }}
                        fontWeight="medium"
                        color="text.primary"
                        noOfLines={2}
                        mb={1}
                      >
                        {t(item.descriptionKey)}
                      </Text>

                      <Flex
                        as="button"
                        w="100%"
                        align="center"
                        justify="center"
                        gap={2}
                        bg="accent.blue"
                        _dark={{ bg: "accent.blueDarkAlt" }}
                        color="text.light"
                        py={{ base: 2, md: 2.5 }}
                        borderRadius="12px"
                        fontWeight="semibold"
                        fontSize={{ base: "sm", md: "md" }}
                        _hover={{ bg: "brand.main" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/customer-product?id=${item.id}`);
                        }}
                      >
                        <Icon as={ShoppingBag} boxSize={4} />
                        {t("seller.placeOrder")}
                      </Flex>
                    </Box>
                  </Box>
                );
              })}
            </SimpleGrid>
          )}
        </Box>
      </Container>
      <BottomNav role="customer" />
    </Box>
  );
};

export default Index;
