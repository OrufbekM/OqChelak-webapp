import BottomNav from "@/components/MobileNav";
import SecondaryInput from "@/components/SecondaryInput";
import { Box, Container, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";

function OrdersSeller() {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");

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
            {t("ordersSeller.title")}
          </Text>
          <SecondaryInput placeholder={t("ordersSeller.search")} onChange={(e) => setQuery(e.target.value)} />
        </Box>
      </Container>
      <BottomNav role={"seller"} />
    </Box>
  );
}

export default OrdersSeller;
