import React, { useEffect } from "react";
import { Box, Flex, Text, Image, Container } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import BottomNav from "@/components/MobileNav";
import SecondaryInput from "@/components/SecondaryInput";
import { useNavigate } from "react-router-dom";

const index = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole && storedRole !== "customer") {
      // Redirect users to their proper home if roles don't match
      navigate(storedRole === "seller" ? "/seller-home" : "/login", { replace: true });
    }
  }, [navigate]);

  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
      <Container maxW="container.sm" px={4} w="100%">
        <Box minH="100vh" pb="80px" pt={20}>
          <Box pt="6" px={4}>
            <SecondaryInput />
          </Box>
          <Box
            bg="product.milk.bg"
            borderRadius="radius.lg"
            p={4}
            m={4}
          >
            <Flex align="center" gap={4}>
              <Image
                src="/public/images/milk.png" 
                alt="Sut"
                boxSize="140px"
                objectFit="contain"
              />

              <Box>
                <Text fontSize="section.title" fontWeight="section.title" color="text.primary">
                  {t("customer.milk")}
                </Text>
                <Text fontSize="button.text" color="text.timer" mt={1}>
                  {t("customer.milkDescription")}
                </Text>

                <Text mt={2} fontSize="button.text" color="text.primary">
                  {t("customer.price")}{" "}
                  <Text as="span" color="accent.orange" fontWeight="button.text">
                    11,000 so'm
                  </Text>
                </Text>
              </Box>
            </Flex>
          </Box>

          <Flex
            flex={1}
            align="center"
            justify="center"
            textAlign="center"
            px={6}
            mt={20}
          >
            <Text color="text.timer" fontSize="button.text">
              {t("customer.onlyProduct")} <br />
              {t("customer.continueUsing")} <br />
              {t("customer.moreProducts")}
            </Text>
          </Flex>
        </Box>
      </Container>
      <BottomNav role={"customer"} />
    </Box>
  );
};

export default index;
