import React from "react";
import { Box, Text, Container } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const Billing = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <Box pt={6}>
        <Text fontSize="2xl" fontWeight="bold">{t("settings.items.billing")}</Text>
        <Text mt={4} color="text.timer">{t("settings.items.billing")} page content (stub)</Text>
      </Box>
    </Container>
  );
};

export default Billing;