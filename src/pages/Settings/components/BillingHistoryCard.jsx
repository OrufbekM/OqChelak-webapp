import { Box, Flex, Text, Badge } from "@chakra-ui/react";
import { Wallet } from "lucide-react";
import { useTranslation } from "react-i18next";

function BillingHistoryCard({
  period,
  billId,
  status,
  amount,
  date,
  currency,
}) {
  const { t } = useTranslation();
  const statusText = status;
  const normalizedStatus = String(statusText).toLowerCase();
  const statusStyles = {
    paid: {
      bg: "green.100",
      color: "green.700",
      _dark: { bg: "green.900", color: "green.300" },
    },
    pending: {
      bg: "yellow.100",
      color: "yellow.800",
      _dark: { bg: "yellow.900", color: "yellow.300" },
    },
    failed: {
      bg: "red.100",
      color: "red.700",
      _dark: { bg: "red.900", color: "red.300" },
    },
    canceled: {
      bg: "red.100",
      color: "red.700",
      _dark: { bg: "red.900", color: "red.300" },
    },
  };

  const badgeStyle = statusStyles[normalizedStatus] ?? {
    bg: "gray.100",
    color: "gray.700",
    _dark: { bg: "gray.800", color: "gray.300" },
  };

  const localizedStatus = t(`settings.billing.status.${normalizedStatus}`, {
    defaultValue: statusText,
  });

  return (
    <Box
      bg={"product.bread"}
      _dark={{ bg: "product.breadDark" }}
      p={4}
      gap={12}
      display="flex"
      flexDirection="column"
      rounded={"2xl"}
    >
      <Flex justifyContent="space-between">
        <Flex gap={4} alignItems="center">
          <Box
            bg={"gray.200"}
            _dark={{ bg: "whiteAlpha.300", color: "green.300" }}
            p={4}
            borderRadius="full"
            color={"green.500"}
            maxW={"58px"}
            maxH={"58px"}
          >
            <Wallet />
          </Box>
          <Box>
            <Text>{period}</Text>
            <Text>{billId}</Text>
          </Box>
        </Flex>
        <Badge
          px={4}
          py={2}
          fontSize="sm"
          rounded="2xl"
          bg={badgeStyle.bg}
          color={badgeStyle.color}
          _dark={badgeStyle._dark}
        >
          {localizedStatus}
        </Badge>
      </Flex>
      <Flex justifyContent="space-between">
        <Box>
          <Text fontSize="sm" color={"gray.500"} fontWeight={"medium"}>
            {t("settings.billing.amount")}
          </Text>
          <Text fontWeight={"semibold"} fontSize={"lg"}>
            {amount} {currency}
          </Text>
        </Box>
        <Box>
          <Text fontSize="sm" color="gray.500" fontWeight={"medium"}>
            {t("settings.billing.date")}
          </Text>
          <Text fontWeight={"semibold"} fontSize={"lg"}>
            {date}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}

export default BillingHistoryCard;
