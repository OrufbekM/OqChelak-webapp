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
  const [query, setQuery] = useState("");

  // Define the sections & items by key so we can localize labels and filter them
  const sections = [
    {
      key: "account",
      items: [
        { key: "profile", right: "arrow" },
        { key: "privacyPolicy", right: "arrow" },
        { key: "billing", right: "arrow" },
        { key: "security", right: "arrow" },
      ],
    },
    {
      key: "appearance",
      items: [
        { key: "darkMode", right: "switch" },
        { key: "language", right: "arrow" },
      ],
    },
    {
      key: "more",
      items: [
        { key: "help", right: "arrow" },
        { key: "about", right: "arrow" },
        { key: "logout", danger: true },
      ],
    },
  ];

  const normalizedQuery = query.trim().toLowerCase();

  const filteredSections = sections
    .map((s) => ({
      ...s,
      items: s.items.filter((item) => {
        const label = t(`settings.items.${item.key}`).toLowerCase();
        if (!normalizedQuery) return true;
        return label.includes(normalizedQuery);
      }),
    }))
    .filter((s) => s.items && s.items.length > 0);

  return (
    <Container maxW="container.sm" px={4} w="100%" display="flex" flexDirection="column" height="100vh">
      <Box pt="6" flexShrink={0} position={"sticky"} top={'0'} zIndex={10}
      >
        <Text fontSize="2xl" fontWeight="bold" textAlign="center" pb="10">
          {t("settings.title")}
        </Text>
        <SecondaryInput value={query} onChange={(e) => setQuery(e.target.value)} />
      </Box>
      <Box mt="6" pb={"110px"} overflowY={"auto"} >
        {filteredSections.length === 0 ? (
          <Box px={4} py={6} textAlign="center" color="text.timer">
            {t("settings.search.noResults")}
          </Box>
        ) : (
          filteredSections.map((section) => (
            <SettingsSection key={section.key} title={t(`settings.sections.${section.key}`)}>
              {section.items.map((it) => (
                <SettingsItem
                  key={it.key}
                  label={t(`settings.items.${it.key}`)}
                  right={it.right}
                  danger={it.danger}
                  to={`/settings/${it.key}`}
                />
              ))}
            </SettingsSection>
          ))
        )}
      </Box>

      <BottomNav role={localStorage.getItem("role")} />
    </Container>
  );
};

export default Settings;
