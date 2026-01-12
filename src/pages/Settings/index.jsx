import BottomNav from "@/components/MobileNav";
import SecondaryInput from "@/components/SecondaryInput";
import { Container, Text, Box, Flex, List } from "@chakra-ui/react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const Settings = () => {
  const { t } = useTranslation();
  const [currentLang, setCurrentLang] = useState(
    localStorage.getItem("language") || "uz-latin"
  );
  return (
    <Container maxW="container.sm" px={4} w="100%">
      <Box pt="6" flexShrink={0}>
        <Text fontSize="2xl" fontWeight="bold" textAlign="center" pb="10">
          {t("settings.title")}
        </Text>
        <SecondaryInput />
      </Box>
      <Box>
        Bugunga yetarli ko'p narsa qildim o'zi🗿
        <List.Root>
          <List.Item fontSize="lg" fontWeight="medium" color={"#ed2788"}>
            1. Home - ikkoviniyam itargansiz
            <List.Root ps="5">
              <List.Item
                fontSize="sm"
                fontWeight="normal"
                color={"text.primary"}
              >
                Sellerda umuman buyurtma yo bosa text chiqarish kere
              </List.Item>
              <List.Item
                fontSize="sm"
                fontWeight="normal"
                color={"text.primary"}
              >
                Customerda textni prosta yozib qoygansiz mahsulot qoshilsa nima
                boladi?
              </List.Item>
            </List.Root>
          </List.Item>
          <List.Item fontSize="lg" fontWeight="medium" color={"#0f479f"}>
            2. Components - brooooo shuninisi eng muhimi
          </List.Item>
        </List.Root>
      </Box>
      <BottomNav />
    </Container>
  );
};

export default Settings;
