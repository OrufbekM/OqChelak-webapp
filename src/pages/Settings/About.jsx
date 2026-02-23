import React from "react";
import { Box, Text, Container, VStack, Image } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import BackButton from "@/components/BackButton";
import BottomNav from "@/components/MobileNav";

const About = () => {
  const { t } = useTranslation();
  return (
    <Container
      maxW="container.sm"
      px={4}
      w="100%"
      display="flex"
      flexDirection="column"
      height="100vh"
    >
      <Box
        maxH={"52px"}
        pt="6"
        flexShrink={0}
        position="sticky"
        top="0"
        zIndex={10}
        display={"flex"}
        justifyContent={"space-between"}
      >
        <BackButton />
        <Text fontSize="2xl" fontWeight="bold" textAlign="center" pb="10">
          {t("settings.items.about")}
        </Text>
      </Box>
      <Box mt={6} pb="110px" overflowY="auto">
        <VStack spacing={4} align="stretch">
          <Box bg="bg.secondary" p={4} borderRadius="xl" textAlign="center">
            <Text fontWeight="bold" mb={1}>{t("settings.about.appName", "Oqchelak")}</Text>
            <Text fontSize="sm" color="text.timer">{t("settings.about.version", "Version 1.0.0")}</Text>
          </Box>
          
          <Box bg="bg.secondary" p={4} borderRadius="xl">
            <Text fontWeight="bold" mb={2}>{t("settings.about.companyTitle", "About Our Company")}</Text>
            <Text fontSize="sm" color="text.timer">{t("settings.about.companyDesc", "We are dedicated to providing the best service to our customers")}</Text>
          </Box>
          
          <Box bg="bg.secondary" p={4} borderRadius="xl">
            <Text fontWeight="bold" mb={2}>{t("settings.about.missionTitle", "Our Mission")}</Text>
            <Text fontSize="sm" color="text.timer">{t("settings.about.missionDesc", "To connect customers and sellers in the most efficient way possible")}</Text>
          </Box>
          
          <Box bg="bg.secondary" p={4} borderRadius="xl">
            <Text fontWeight="bold" mb={2}>{t("settings.about.contactTitle", "Contact Us")}</Text>
            <Text fontSize="sm" color="text.timer">{t("settings.about.contactDesc", "Reach out to us at contact@oqchelak.uz")}</Text>
          </Box>
          
          <Box bg="bg.secondary" p={4} borderRadius="xl">
            <Text fontWeight="bold" mb={2}>{t("settings.about.termsTitle", "Terms & Conditions")}</Text>
            <Text fontSize="sm" color="text.timer">{t("settings.about.termsDesc", "Learn about our policies and terms of service")}</Text>
          </Box>
        </VStack>
      </Box>
      <BottomNav />
    </Container>
  );
};

export default About;