import BottomNav from "@/components/MobileNav";
import SecondaryInput from "@/components/SecondaryInput";
import { Box, Container, Flex, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";

function OrdersSeller() {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("inProgress");

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
          pt="20"
          flexShrink={0}
          position={"sticky"}
          // top={"0"}
          zIndex={10}
          bg={"bg.primary"}
        >
          <Text fontSize="2xl" fontWeight="bold" textAlign="center" pb="10">
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
      </Container>
      <BottomNav role={"seller"} />
    </Box>
  );
}

export default OrdersSeller;
