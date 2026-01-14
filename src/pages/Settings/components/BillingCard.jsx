import PrimaryButton from "@/components/PrimaryButton";
import { Box, Flex, Text, Badge } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";

function BillingCard() {
  const { t } = useTranslation();
  return (
    <Box
      bg="bg.secondary"
      p={4}
      display={"flex"}
      flexDirection={"column"}
      rounded={"2xl"}
      gap={4}
    >
      <Flex justify="space-between">
        <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="semibold">
          {t("settings.billing.nextPaymentTitle")}
        </Text>
        <Badge colorPalette={"purple"}>{t("settings.billing.planBasic")}</Badge>
      </Flex>
      <Flex justify="space-between">
        <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="semibold">
          12.000 uzs
        </Text>
        <Text>DUE-BILL-2025-09</Text>
      </Flex>
      <Flex>
        <PrimaryButton full={"yes"}>{t("settings.billing.payNow")}</PrimaryButton>
      </Flex>
    </Box>
  );
}

export default BillingCard;
