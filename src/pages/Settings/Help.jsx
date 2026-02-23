import React from "react";
import { Box, Text, Container, VStack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import BackButton from "@/components/BackButton";
import BottomNav from "@/components/MobileNav";

const Help = () => {
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
          {t("settings.items.help")}
        </Text>
      </Box>
      <Box mt={6} pb="110px" overflowY="auto">
        <VStack spacing={4} align="stretch">
          <Box bg="bg.secondary" p={4} borderRadius="xl">
            <Text fontWeight="bold" mb={2}>{t("settings.help.faqTitle", "Frequently Asked Questions")}</Text>
            <Text fontSize="sm" color="text.timer">{t("settings.help.faqDesc", "Common questions about using our platform")}</Text>
          </Box>
          
          <Box bg="bg.secondary" p={4} borderRadius="xl">
            <Text fontWeight="bold" mb={2}>{t("settings.help.contactTitle", "Contact Support")}</Text>
            <Text fontSize="sm" color="text.timer">{t("settings.help.contactDesc", "Need more help? Reach out to our support team")}</Text>
          </Box>
          
          <Box bg="bg.secondary" p={4} borderRadius="xl">
            <Text fontWeight="bold" mb={2}>{t("settings.help.tutorialsTitle", "Video Tutorials")}</Text>
            <Text fontSize="sm" color="text.timer">{t("settings.help.tutorialsDesc", "Step-by-step guides to help you get started")}</Text>
          </Box>
          
          <Box bg="bg.secondary" p={4} borderRadius="xl">
            <Text fontWeight="bold" mb={2}>{t("settings.help.communityTitle", "Community Forum")}</Text>
            <Text fontSize="sm" color="text.timer">{t("settings.help.communityDesc", "Connect with other users and share tips")}</Text>
          </Box>
        </VStack>
      </Box>
      <BottomNav />
    </Container>
  );
};

export default Help;