import React, { useState } from "react";
import {
  Box,
  Text,
  Container,
  Image,
  Button,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import BottomNav from "@/components/MobileNav";
import BackButton from "@/components/BackButton";
import { Pencil } from "lucide-react";
import SettingsSection from "./components/SettingsSection";
import SettingsItem from "./components/SettingsItem";
import EditFieldDrawer from "./components/EditFieldDrawer";

const Profile = () => {
  const { i18n, t } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language || "uz-latin");

  const setLang = (lng) => {
    i18n.changeLanguage(lng);
  };

  const [profile, setProfile] = useState({
    name: "Adolf Hitler",
    phone: "+998 20 010 09 09",
    location: "Andijon 2-kichik daha",
    email: "adolfhitler1889@gmail.com",
    birthday: "1899, april 20",
    role: localStorage.getItem("role") || "user",
  });

  const saveProfile = (next) => {
    const merged = { ...profile, ...next };
    setProfile(merged);
    try {
      if (next && next.role !== undefined) {
        localStorage.setItem("role", String(next.role));
      }
      localStorage.setItem("profile", JSON.stringify(merged));
    } catch (e) {}
  };

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [editingValue, setEditingValue] = useState("");

  const openEditor = (fieldKey, label) => {
    setEditingField({ key: fieldKey, label });
    setEditingValue(profile[fieldKey] || "");
    setDrawerOpen(true);
  };

  const handleSave = () => {
    if (!editingField) return;
    saveProfile({ [editingField.key]: editingValue });
    setDrawerOpen(false);
  };

  const items = [
    { key: "phone", label: t("settings.profile.fields.phone") },
    { key: "location", label: t("settings.profile.fields.location") },
    { key: "email", label: t("settings.profile.fields.email") },
    { key: "birthday", label: t("settings.profile.fields.birthday") },
    { key: "role", label: t("settings.profile.fields.role") },
  ];

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
          {t("settings.items.profile")}
        </Text>
      </Box>

      <Box mt="6" pb="110px" overflowY="auto">
        <Box
          width="full"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          paddingBlock="5"
          gap={3}
        >
          <Box position="relative" maxW="160px">
            <Image src="/images/placeholder.png" w="150px" rounded="full" />
            <Button
              position="absolute"
              bottom={1}
              right={1}
              p={2}
              bg="bg.input"
              rounded="full"
              color="text.primary"
            >
              <Pencil size={20} />
            </Button>
          </Box>
          <Text color="text.primary" fontSize="2xl" fontWeight="semibold">
            {t("settings.profile.greeting", { name: profile.name })}
          </Text>
        </Box>

        <Box mt={6} px={2}>
          <SettingsSection title={t("settings.profile.sectionTitle")}>
            {items.map((it) => (
              <SettingsItem
                key={it.key}
                label={it.label}
                value={profile[it.key]}
                right="arrow"
                onClick={() => openEditor(it.key, it.label)}
              />
            ))}
          </SettingsSection>
        </Box>
      </Box>

      <BottomNav role={profile.role} />

      <EditFieldDrawer
        open={drawerOpen}
        onOpenChange={(e) => setDrawerOpen(e.open)}
        title={t("settings.profile.editTitle", {
          field: editingField?.label || "",
        })}
        label={editingField?.label || ""}
        value={editingValue}
        onChangeValue={setEditingValue}
        onSave={handleSave}
        cancelText={t("common.cancel")}
        saveText={t("common.save")}
      />
    </Container>
  );
};

export default Profile;
