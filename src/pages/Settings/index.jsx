import BottomNav from "@/components/MobileNav";
import SecondaryInput from "@/components/SecondaryInput";
import { Container, Text, Box, Flex, List } from "@chakra-ui/react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import SettingsSection from "./components/SettingsSection";
import SettingsItem from "./components/SettingsItem";


const Settings = () => {
  const { t } = useTranslation();
  const [currentLang, setCurrentLang] = useState(
    localStorage.getItem("language") || "uz-latin"
  );
  return (
    <Container maxW="container.sm" px={4} w="100%" display="flex" flexDirection="column" height="100vh">
      <Box pt="6" flexShrink={0} position={"sticky"} top={'0'} zIndex={10}
      >
        <Text fontSize="2xl" fontWeight="bold" textAlign="center" pb="10">
          {t("settings.title")}
        </Text>
        <SecondaryInput />
      </Box>
      <Box mt="6" pb={"110px"} overflowY={"auto"} >
        <SettingsSection title="Hisob">
          <SettingsItem label="Profil & Hisob" right="arrow" />
          <SettingsItem label="Maxfiylik siyosati" right="arrow" />
          <SettingsItem label="Hisob-kitob & Obuna" right="arrow" />
          <SettingsItem label="Maxfiylik & Xavfsizlik" right="arrow" />
        </SettingsSection>

        <SettingsSection title="Ko‘rinish">
          <SettingsItem label="Qorong‘u rejim" right="switch" />
          <SettingsItem label="Til" right="arrow" />
        </SettingsSection>

        <SettingsSection title="Ko‘proq">
          <SettingsItem label="Hisobdan chiqish" danger />
          <SettingsItem label="Yordam" right="arrow" />
          <SettingsItem label="Biz haqimizda" right="arrow" />
        </SettingsSection>
      </Box>

      <BottomNav />
    </Container>
  );
};

export default Settings;
