import React from "react";
import { Box, Text, Container, VStack, Icon } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Download } from "lucide-react";
import BottomNav from "@/components/MobileNav";
import PrimaryButton from "@/components/PrimaryButton";
import BackButton from "@/components/BackButton";

const Privacy = () => {
  const { t, i18n } = useTranslation();

  const handleDownload = () => {
    const currentLang = i18n.language;
    const fileName = "privacy-policy.pdf";
    const fileUrl = `/assets/${fileName}`;

    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;

    link.click();
  };

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
          {t("settings.items.privacyPolicy")}
        </Text>
      </Box>
      <Box mt={6}>
        <VStack spacing={6} align="stretch">
          <Box bg="bg.secondary" p={6} borderRadius="xl" boxShadow="sm">
            <VStack spacing={6} align="stretch">
              <Text color="text.primary" lineHeight="tall">
                {t("privacy.description")}
              </Text>
              <Text fontSize="sm" color="gray.500" mt={2}>
                {t("privacy.lastUpdated")}
              </Text>

              <PrimaryButton
                leftIcon={<Icon as={Download} />}
                onClick={handleDownload}
                full={"yes"}
                mt={4}
              >
                {t("privacy.downloadButton")}
              </PrimaryButton>
            </VStack>
          </Box>
        </VStack>
      </Box>
      <BottomNav />
    </Container>
  );
};

export default Privacy;
