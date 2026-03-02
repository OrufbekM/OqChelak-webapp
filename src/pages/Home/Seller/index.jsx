import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Image,
  Container,
  SimpleGrid,
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

// TODO: replace with backend response.
const ordersData = [
  {
    id: 1,
    productName: "Sut",
    address: "Neptun",
    clientName: "John Doe",
    price: 11000,
    quantity: 1,
    phone: "+998958557575",
    time: INITIAL_TIME,
    initialTime: INITIAL_TIME,
    location: { lat: 40.7821, lng: 72.8442 },
  },
  {
    id: 2,
    productName: "Sut",
    address: "Yer",
    clientName: "John Doe",
    price: 11000,
    quantity: 1,
    phone: "+998958557575",
    time: 10 * 60,
    initialTime: 10 * 60,
    location: { lat: 40.7204, lng: 72.8577 },
  },
  {
    id: 3,
    productName: "Sut",
    address: "Mars",
    clientName: "John Doe",
    price: 11000,
    quantity: 1,
    phone: "+998958557575",
    time: 5 * 60,
    initialTime: 5 * 60,
    location: { lat: 40.7758, lng: 72.8508 },
  },
  {
    id: 4,
    productName: "Sut",
    address: "Quyosh",
    clientName: "John Doe",
    price: 11000,
    quantity: 1,
    phone: "+998958557575",
    time: 0,
    initialTime: 5 * 60,
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

  const getColor = (time) => {
    if (time <= 5 * 60) return "accent.orange";
    if (time <= 10 * 60) return "accent.yellow";
    return "accent.blue";
  };

  const filteredOrders = orders.filter((order) => {
    if (order.time <= 0) return false;

    if (!normalizedQuery) return true;

    const searchableText = [
      order.productName,
      order.address,
      order.clientName,
      order.phone,
      order.price,
      order.quantity,
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
    ? `${selectedOrder.productName} | ${selectedOrder.address} | ${selectedOrder.price.toLocaleString()} ${t("common.currency")}`
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
          position="sticky"
          top="0"
          zIndex={10}
          bg="bg.primary"
        >
          <Text fontSize="2xl" fontWeight="bold" textAlign="center" pb="6">
            {t("seller.title")}
          </Text>
          <SecondaryInput
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Box>
        <Flex direction="column" height="100vh" pt={4} pb="80px" overflow="hidden">
          <Box flex="1" overflowY="auto" py={4}>
            {filteredOrders.length === 0 ? (
              <Text color="text.timer" textAlign="center" pt={8}>
                {t("settings.search.noResults")}
              </Text>
            ) : (
              <SimpleGrid
                columns={{ base: 2, md: 2 }}
                columnGap={{ base: 3, md: 4 }}
                rowGap={{ base: 3, md: 4 }}
              >
                {filteredOrders.map((order) => {
                  const isExpired = order.time <= 0;
                  const minutesLeft = Math.max(0, Math.ceil(order.time / 60));
                  const progressRatio =
                    order.initialTime > 0 ? order.time / order.initialTime : 0;
                  const safeProgress = Math.min(Math.max(progressRatio, 0), 1);
                  const phoneText = String(order.phone ?? "").replace(
                    /^\+998\s*/,
                    "",
                  );

                  const circleSize = 44;
                  const strokeWidth = 3;
                  const radius = (circleSize - strokeWidth) / 2;
                  const circumference = 2 * Math.PI * radius;
                  const dashOffset = circumference * (1 - safeProgress);
                  const progressColor = `var(--chakra-colors-${getColor(
                    order.time,
                  ).replace(".", "-")})`;

                  return (
                    <Box
                      key={order.id}
                      w="100%"
                      minW={0}
                      bg="white"
                      borderRadius="2xl"
                      overflow="hidden"
                      position="relative"
                      border="1px solid"
                      borderColor="blackAlpha.100"
                      boxShadow="0 10px 24px rgba(25, 25, 25, 0.12)"
                      _dark={{
                        bg: "gray.800",
                        borderColor: "whiteAlpha.200",
                        boxShadow: "0 10px 24px rgba(0, 0, 0, 0.45)",
                      }}
                    >
                      <Box p={3} pb={2} position="relative">
                        <Box
                          position="absolute"
                          top={2}
                          right={2}
                          w={`${circleSize}px`}
                          h={`${circleSize}px`}
                        >
                          <svg
                            width={circleSize}
                            height={circleSize}
                            viewBox={`0 0 ${circleSize} ${circleSize}`}
                            style={{ display: "block" }}
                          >
                            <circle
                              cx={circleSize / 2}
                              cy={circleSize / 2}
                              r={radius}
                              fill="transparent"
                              strokeWidth={strokeWidth}
                              stroke="rgba(140, 140, 140, 0.28)"
                            />
                            <circle
                              cx={circleSize / 2}
                              cy={circleSize / 2}
                              r={radius}
                              fill="transparent"
                              strokeWidth={strokeWidth}
                              stroke={progressColor}
                              strokeDasharray={`${circumference} ${circumference}`}
                              strokeDashoffset={dashOffset}
                              strokeLinecap="round"
                              transform={`rotate(-90 ${circleSize / 2} ${circleSize / 2})`}
                              style={{ transition: "stroke-dashoffset 1s linear" }}
                            />
                          </svg>
                          <Text
                            position="absolute"
                            inset="0"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            fontSize="md"
                            fontWeight="bold"
                            color="text.primary"
                            lineHeight="1"
                          >
                            {minutesLeft}m
                          </Text>
                        </Box>

                        <Flex
                          h={{ base: "94px", md: "108px" }}
                          align="center"
                          justify="center"
                          mb={2}
                        >
                          <Image
                            src="/images/milk.png"
                            alt={t("seller.imageMilkAlt")}
                            w={{ base: "86px", md: "96px" }}
                            h="auto"
                            objectFit="contain"
                          />
                        </Flex>

                        <Flex align="center" justify="space-between" gap={2} mb={1}>
                          <Text
                            flex="1"
                            minW={0}
                            noOfLines={1}
                            fontSize={{ base: "2xl", md: "2xl" }}
                            fontWeight="bold"
                            lineHeight="1"
                          >
                            {order.productName}
                          </Text>
                          <Text
                            flexShrink={0}
                            fontSize={{ base: "lg", md: "lg" }}
                            fontWeight="semibold"
                            lineHeight="1.1"
                          >
                            {order.price.toLocaleString()} {t("common.currency")}
                          </Text>
                        </Flex>

                        <Text fontSize="sm" noOfLines={1} lineHeight="1.2">
                          {t("ordersCustomer.quantity")} {order.quantity} L
                        </Text>
                        <Text fontSize="sm" noOfLines={1} lineHeight="1.2">
                          {t("seller.client")} {order.clientName}
                        </Text>
                        <Flex align="center" gap={1} fontSize="sm" lineHeight="1.2">
                          <Text as="span" flexShrink={0}>
                            {t("settings.profile.fields.phone")}:
                          </Text>
                          <Text
                            as="span"
                            minW={0}
                            overflow="hidden"
                            textOverflow="ellipsis"
                            whiteSpace="nowrap"
                          >
                            {phoneText}
                          </Text>
                        </Flex>
                      </Box>

                      <ChakraLink
                        as={RouterLink}
                        to={`/order-location?lat=${order.location.lat}&lng=${order.location.lng}&address=${encodeURIComponent(
                          order.address,
                        )}`}
                        display="block"
                      >
                        <Box
                          textAlign="center"
                          bg="accent.green"
                          color="text.light"
                          py={2}
                          fontSize={{ base: "md", md: "lg" }}
                          fontWeight="bold"
                          lineHeight="1.1"
                        >
                          {t("meta.orderLocation")}
                        </Box>
                      </ChakraLink>

                      <Flex>
                        <Button
                          flex="1"
                          h="42px"
                          borderRadius="0"
                          borderBottomLeftRadius="2xl"
                          bg="accent.blue"
                          color="text.light"
                          fontSize={{ base: "sm", md: "md" }}
                          _disabled={{ opacity: 0.55, cursor: "not-allowed" }}
                          isDisabled={isExpired}
                          onClick={() => openConfirmationModal(order, "accept")}
                        >
                          {t("seller.accept")}
                        </Button>
                        <Button
                          flex="1"
                          h="42px"
                          borderRadius="0"
                          borderBottomRightRadius="2xl"
                          bg="red.500"
                          color="text.light"
                          fontSize={{ base: "sm", md: "md" }}
                          _disabled={{ opacity: 0.55, cursor: "not-allowed" }}
                          isDisabled={isExpired}
                          onClick={() => openConfirmationModal(order, "cancel")}
                        >
                          {t("seller.cancel")}
                        </Button>
                      </Flex>
                    </Box>
                  );
                })}
              </SimpleGrid>
            )}
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
          bg: pendingAction === "accept" ? "accent.blue" : "red.500",
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
