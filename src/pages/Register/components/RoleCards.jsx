import { Box, Flex, Heading, Image, Text, useToken } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";

const RoleCards = ({ onCustomerClick, onSellerClick }) => {
  const { t } = useTranslation();
  const [yellowBorder, blueBorder] = useToken("colors", [
    "accent.yellowBorder",
    "accent.blueBorder",
  ]);

  return (
    <Flex flexDirection="column" gap={6} w="full" maxW="500px">
      <Box
        onClick={onCustomerClick}
        p={5}
        display="flex"
        flexDirection="row"
        alignItems="center"
        textAlign="left"
        gap={6}
        bg="accent.yellowCard"
        borderRadius="2xl"
        borderWidth="3px"
        borderColor="accent.yellowBorder"
        boxShadow={`0 12px 0 ${yellowBorder}`}
        transition="all 0.15s ease"
        cursor="pointer"
        w="full"
        _active={{
          transform: "translateY(4px)",
          boxShadow: `0 8px 0 ${yellowBorder}`,
        }}
      >
        <Image
          src="/images/figure-boy.svg"
          boxSize="80px"
          objectFit="contain"
          flexShrink={0}
        />

        <Box flex={1}>
          <Heading
            size="lg"
            color="accent.orange"
            fontWeight="black"
            mb={1}
          >
            {t("register.customer")}
          </Heading>
          <Text
            color="accent.orange"
            fontWeight="600"
            fontSize="md"
            lineHeight="1.3"
          >
            {t("register.customerDescription")}
          </Text>
        </Box>
      </Box>

      <Box
        onClick={onSellerClick}
        p={5}
        display="flex"
        flexDirection="row"
        alignItems="center"
        textAlign="left"
        gap={6}
        bg="accent.blueLightAlt"
        borderRadius="2xl"
        borderWidth="3px"
        borderColor="accent.blueBorder"
        boxShadow={`0 12px 0 ${blueBorder}`}
        transition="all 0.15s ease"
        cursor="pointer"
        w="full"
        _hover={{
          transform: "translateY(-2px)",
        }}
        _active={{
          transform: "translateY(4px)",
          boxShadow: `0 8px 0 ${blueBorder}`,
        }}
      >
        <Image
          src="/images/figure-girl.svg"
          boxSize="80px"
          objectFit="contain"
          flexShrink={0}
        />
        <Box flex={1}>
          <Heading
            size="lg"
            color="accent.blueDarkAlt"
            fontWeight="black"
            mb={1}
          >
            {t("register.seller")}
          </Heading>
          <Text
            color="accent.blueDarkAlt"
            fontWeight="600"
            fontSize="md"
            lineHeight="1.3"
          >
            {t("register.sellerDescription")}
          </Text>
        </Box>
      </Box>
    </Flex>
  );
};

export default RoleCards;
