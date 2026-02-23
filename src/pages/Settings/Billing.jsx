import React from "react";
import { Box, Text, Container } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import BackButton from "@/components/BackButton";
import BottomNav from "@/components/MobileNav";
import BillingHistoryCard from "./components/BillingHistoryCard";
import SecondaryInput from "@/components/SecondaryInput";
import BillingCard from "./components/BillingCard";

const HEADER_HEIGHT = "72px";
const BOTTOM_NAV_HEIGHT = "90px";

const Billing = () => {
  const { t } = useTranslation();
  const [query, setQuery] = React.useState("");
  const normalizedQuery = query.trim().toLowerCase();

  const STATUSES = ["paid", "pending", "failed", "canceled"];

  const bills = React.useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        id: `Bill-2001-${12 + i}`,
        period: "December 2001",
        status: STATUSES[Math.floor(Math.random() * STATUSES.length)],
        amount: 12000,
        currency: "UZS",
        date: "2001-11-09",
      })),
    []
  );

  const filteredBills = bills.filter((bill) => {
    if (!normalizedQuery) return true;

    const localizedStatus = t(`settings.billing.status.${bill.status}`, {
      defaultValue: bill.status,
    }).toLowerCase();

    const searchableText = [
      bill.id,
      bill.period,
      bill.status,
      localizedStatus,
      bill.amount,
      bill.currency,
      bill.date,
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  });

  return (
    <Box h="100vh" display="flex" flexDirection="column">
      {/* HEADER */}
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        h={HEADER_HEIGHT}
        bg="bg.primary"
        zIndex={10}
      >
        <Container maxW="container.sm" px={4} h="100%">
          <Box h="100%" display="flex" alignItems="center" position="relative">
            <Box position="absolute" left={0}>
              <BackButton />
            </Box>
            <Text
              w="100%"
              fontSize={{ base: "lg", md: "2xl" }}
              fontWeight="bold"
              textAlign="right"
            >
              {t("settings.items.billing")}
            </Text>
          </Box>
        </Container>
      </Box>

      {/* CONTENT */}
      <Box flex={1} mt={HEADER_HEIGHT} mb={BOTTOM_NAV_HEIGHT} overflow="hidden">
        <Container maxW="container.sm" px={4} h="100%">
          <Box display="flex" flexDirection="column" h="100%" gap={4}>
            <BillingCard />

            <Text fontSize="lg" color="text.primary">
              {t("settings.billing.historyTitle")}
            </Text>

            <SecondaryInput
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            <Box
              flex={1}
              overflowY="auto"
              display="flex"
              flexDirection="column"
              gap={6}
              pb={4}
            >
              {filteredBills.length === 0 ? (
                <Text color="text.timer" textAlign="center" pt={6}>
                  {t("settings.search.noResults")}
                </Text>
              ) : (
                filteredBills.map((bill) => (
                  <BillingHistoryCard
                    key={bill.id}
                    period={bill.period}
                    billId={bill.id}
                    status={bill.status}
                    amount={bill.amount}
                    currency={bill.currency}
                    date={bill.date}
                  />
                ))
              )}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* BOTTOM NAV */}
      <BottomNav />
    </Box>
  );
};

export default Billing;
