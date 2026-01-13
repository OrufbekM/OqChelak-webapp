import React from "react";
import { Box, Text, Container } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <Box pt={6}>
        <Text fontSize="2xl" fontWeight="bold">{t("settings.items.about")}</Text>
        <Text mt={4} color="text.timer">About content (stub)</Text>
      </Box>
    </Container>
  );
};

export default About;