import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  VStack,
  Image,
  Container,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import BottomNav from "@/components/MobileNav";
import PrimaryModal from "@/components/PrimaryModal";
import SecondaryInput from "@/components/SecondaryInput";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const INITIAL_TIME = 20 * 60;

// Ensure only sellers can access this page
function useSellerGuard(navigate) {
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole && storedRole !== "seller") {
      navigate(storedRole === "customer" ? "/customer-home" : "/login", {
        replace: true,
      });
    }
  }, [navigate]);
}

const ordersData = [
  {
    id: 1,
    productKey: "seller.productMilk1L",
    addressKey: "seller.addressNeptun",
    clientKey: "seller.clientJohnDoe",
    price: 11000,
    time: INITIAL_TIME,
    location: { lat: 40.7821, lng: 72.8442 },
  },
  {
    id: 2,
    productKey: "seller.productMilk1L",
    addressKey: "seller.addressYer",
    clientKey: "seller.clientJohnDoe",
    price: 11000,
    time: 10 * 60,
    location: { lat: 40.7204, lng: 72.8577 },
  },
  {
    id: 3,
    productKey: "seller.productMilk1L",
    addressKey: "seller.addressMars",
    clientKey: "seller.clientJohnDoe",
    price: 11000,
    time: 5 * 60,
    location: { lat: 40.7758, lng: 72.8508 },
  },
  {
    id: 4,
    productKey: "seller.productMilk1L",
    addressKey: "seller.addressSun",
    clientKey: "seller.clientJohnDoe",
    price: 11000,
    time: 0,
    location: { lat: 40.7871, lng: 72.8419 },
  },
];

const Index = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Enforce seller-only access for this page
  useSellerGuard(navigate);

  const [orders, setOrders] = useState(ordersData);
  const [query, setQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [pendingAction, setPendingAction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const normalizedQuery = query.trim().toLowerCase();

  // Timer for countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setOrders((prev) =>
        prev.map((o) => ({
          ...o,
          time: o.time > 0 ? o.time - 1 : 0,
        })),
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const getColor = (time) => {
    if (time <= 5 * 60) return "accent.orange";
    if (time <= 10 * 60) return "accent.yellow";
    return "accent.blue";
  };

  const filteredOrders = orders.filter((order) => {
    if (order.time <= 0) return false;

    if (!normalizedQuery) return true;

    const productText = t(order.productKey);
    const addressText = t(order.addressKey);
    const clientText = t(order.clientKey);

    const searchableText = [
      productText,
      addressText,
      clientText,
      order.price,
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  });

  const openConfirmationModal = (order, action) => {
    setSelectedOrder(order);
    setPendingAction(action);
    setIsModalOpen(true);
  };

  const closeConfirmationModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
    setPendingAction(null);
  };

  const handleConfirmAction = () => {
    if (!selectedOrder || !pendingAction) return;

    setOrders((prevOrders) =>
      prevOrders.filter((order) => order.id !== selectedOrder.id),
    );
    closeConfirmationModal();
  };

  const modalTitle =
    pendingAction === "accept"
      ? t("seller.confirmAcceptTitle")
      : t("seller.confirmCancelTitle");

  const modalDescription = selectedOrder
    ? `${t(selectedOrder.productKey)} • ${t(
        selectedOrder.addressKey,
      )} • ${selectedOrder.price.toLocaleString()} ${t("common.currency")}`
    : "";

  const confirmLabel =
    pendingAction === "accept" ? t("seller.accept") : t("seller.cancel");

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
          pt="8"
          flexShrink={0}
          position={"sticky"}
          top={"0"}
          zIndex={10}
          bg={"bg.primary"}
        >
          <Text fontSize="2xl" fontWeight="bold" textAlign="center" pb="6">
            {t("seller.title")}
          </Text>
          <SecondaryInput
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Box>
        <Flex
          direction="column"
          height="100vh"
          pt={4}
          pb="80px"
          overflow="hidden"
        >
          <Box flex="1" overflowY="auto" py="4">
            <VStack spacing="4">
              {filteredOrders.length === 0 && (
                <Text color="text.timer" textAlign="center" pt={8}>
                  {t("settings.search.noResults")}
                </Text>
              )}
              {filteredOrders.map((order) => {
                const productText = t(order.productKey);
                const addressText = t(order.addressKey);
                const clientText = t(order.clientKey);
                const progress = (order.time / INITIAL_TIME) * 100;
                const isExpired = order.time === 0;

                return (
                  <Box
                    key={order.id}
                    w="100%"
                    bg="bg.secondary"
                    borderRadius="xl"
                    overflow="hidden"
                    position="relative"
                  >
                    <Box
                      position="absolute"
                      top="0"
                      left="0"
                      h="4px"
                      w={`${progress}%`}
                      bg={getColor(order.time)}
                      transition="width 1s linear"
                    />

                    <Flex p="4" gap="3">
                      <Flex
                        w="100px"
                        h="100px"
                        align="center"
                        justify="center"
                        borderRadius="lg"
                        bg="product.milk.bg"
                      >
                        <Image
                          src="/images/milk.png"
                          alt={t("seller.imageMilkAlt")}
                        />
                      </Flex>

                      <Box flex="1">
                        <Flex justify="space-between">
                          <Text fontWeight="semibold">{productText}</Text>
                          <Text fontSize="sm" color="text.timer">
                            {t("seller.remainingTime")}{" "}
                            <Text
                              as="span"
                              color={getColor(order.time)}
                              fontWeight="medium"
                            >
                              {formatTime(order.time)}
                            </Text>
                          </Text>
                        </Flex>

                        <Text fontSize="sm">
                          {t("seller.address")}{" "}
                          <ChakraLink
                            as={RouterLink}
                            to={`/order-location?lat=${order.location.lat}&lng=${order.location.lng}&address=${encodeURIComponent(
                              addressText,
                            )}`}
                            color="brand.main"
                            textDecoration="underline"
                            textUnderlineOffset="2px"
                          >
                            {addressText}
                          </ChakraLink>
                        </Text>
                        <Text fontSize="sm">
                          {t("seller.client")} {clientText}
                        </Text>
                        <Text fontSize="sm" fontWeight="medium">
                          {t("seller.price")} {order.price.toLocaleString()}{" "}
                          {t("common.currency")}
                        </Text>
                      </Box>
                    </Flex>

                    {/* Action Buttons (only for active orders) */}
                    {!isExpired && (
                      <Flex>
                        <Button
                          flex="1"
                          borderRadius="0"
                          bg="accent.blue"
                          color="text.light"
                          onClick={() => openConfirmationModal(order, "accept")}
                        >
                          {t("seller.accept")}
                        </Button>
                        <Button
                          flex="1"
                          borderRadius="0"
                          bg="accent.orange"
                          color="text.light"
                          onClick={() => openConfirmationModal(order, "cancel")}
                        >
                          {t("seller.cancel")}
                        </Button>
                      </Flex>
                    )}
                  </Box>
                );
              })}
            </VStack>
          </Box>
        </Flex>
      </Container>

      <PrimaryModal
        open={isModalOpen}
        onOpenChange={(open) => {
          if (!open) closeConfirmationModal();
        }}
        title={modalTitle}
        description={modalDescription}
        secondaryActionLabel={t("common.back")}
        onSecondaryAction={closeConfirmationModal}
        primaryActionLabel={confirmLabel}
        onPrimaryAction={handleConfirmAction}
        primaryActionProps={{
          bg: pendingAction === "accept" ? "accent.blue" : "accent.orange",
          _hover: {
            opacity: 0.9,
          },
        }}
      >
        <Text fontSize="sm" color="text.timer">
          {t("seller.confirmActionDescription")}
        </Text>
      </PrimaryModal>

      <BottomNav role="seller" />
    </Box>
  );
};

export default Index;
