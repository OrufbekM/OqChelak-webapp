import React from "react";
import { Box, Text, Container, Button, VStack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const Language = () => {
  const { i18n, t } = useTranslation();

  const setLang = (lng) => {
    i18n.changeLanguage(lng);
    try {
      localStorage.setItem("language", lng);
    } catch (e) {}
  };

  return (
    <Container>
      <Box pt={6}>
        <Text fontSize="2xl" fontWeight="bold">{t("settings.items.language")}</Text>
        <VStack mt={4} align="start" gap={3}>
          <Button onClick={() => setLang("uz-latin")}>O'zbek (Lat)</Button>
          <Button onClick={() => setLang("uz-cyrillic")}>O'zbek (Cyr)</Button>
          <Button onClick={() => setLang("ru")}>Русский</Button>
          <Button onClick={() => setLang("en")}>English</Button>
        </VStack>
      </Box>
    </Container>
  );
};

export default Language;