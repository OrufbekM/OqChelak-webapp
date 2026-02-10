import React from "react";
import { Box } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

function getStatusStyle(status) {
  switch (status) {
    case "completed":
      return {
        bg: "green.100",
        color: "green.700",
      };
    case "cancelled":
      return {
        bg: "red.100",
        color: "red.700",
      };
    case "processing":
      return {
        bg: "blue.100",
        color: "blue.700",
      };
    case "pending":
    default:
      return {
        bg: "orange.100",
        color: "orange.700",
      };
  }
}

function OrderStatusBadge({ status }) {
  const { t } = useTranslation();
  const { bg, color } = getStatusStyle(status);

  return (
    <Box
      px={3}
      py={1}
      borderRadius="full"
      bg={bg}
      color={color}
      fontSize="xs"
      fontWeight="semibold"
      textTransform="capitalize"
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      minW="96px"
    >
      {t(`orderStatus.${status}`)}
    </Box>
  );
}

export default OrderStatusBadge;
