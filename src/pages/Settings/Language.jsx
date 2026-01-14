import React, { useState } from "react";
import { Box, Text, Container, Image } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import SettingsSection from "./components/SettingsSection";
import SettingsItem from "./components/SettingsItem";
import BottomNav from "@/components/MobileNav";
import BackButton from "@/components/BackButton";

const languages = [
  { code: "uz-latin", label: "O'z", flag: "/images/uz.svg" },
  { code: "uz-cyrillic", label: "Ўз", flag: "/images/uz.svg" },
  { code: "en", label: "En", flag: "/images/uk.svg" },
  { code: "ru", label: "Py", flag: "/images/ru.svg" },
];

const Language = () => {
  const { i18n, t } = useTranslation();
  const [currentLang, setCurrentLang] = useState(
    localStorage.getItem("language") || i18n.language || "uz-latin"
  );

  const setLang = (lng) => {
    i18n.changeLanguage(lng);
    try {
      localStorage.setItem("language", lng);
    } catch (e) {}
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
          {t("settings.items.language")}
        </Text>
      </Box>

      <Box mt="6" pb={"110px"} overflowY={"auto"}>
        <SettingsSection>
          {languages.map((lang) => (
            <SettingsItem
              key={lang.code}
              label={lang.label}
              left={
                <Image
                  src={lang.flag}
                  alt={lang.label}
                  w="28px"
                  h="20px"
                  objectFit="cover"
                  borderRadius="sm"
                />
              }
              selected={lang.code === currentLang}
              onClick={() => {
                setLang(lang.code);
                setCurrentLang(lang.code);
              }}
            />
          ))}
        </SettingsSection>
      </Box>

      <BottomNav role={localStorage.getItem("role")} />
    </Container>
  );
};

export default Language;
