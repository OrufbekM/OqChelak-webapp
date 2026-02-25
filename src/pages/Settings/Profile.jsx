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
import { Pencil, Phone, MapPin, Mail, Calendar, User } from "lucide-react";
import SettingsSection from "./components/SettingsSection";
import SettingsItem from "./components/SettingsItem";
import EditFieldDrawer from "./components/EditFieldDrawer";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "Oqchelak User",
    phone: "+998 20 010 09 09",
    location: "Andijan",
    email: "user@example.com",
    birthday: "2000-01-01",
    role: localStorage.getItem("role") || "customer",
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

  const role = profile.role === "seller" ? "seller" : "customer";
  const switchToRole = role === "seller" ? "customer" : "seller";

  const handleRoleSwitch = () => {
    saveProfile({ role: switchToRole });
    navigate(switchToRole === "seller" ? "/seller-home" : "/customer-home");
  };

  const items = [
    { key: "phone", label: t("settings.profile.fields.phone"), icon: Phone },
    { key: "location", label: t("settings.profile.fields.location"), icon: MapPin },
    { key: "email", label: t("settings.profile.fields.email"), icon: Mail },
    { key: "birthday", label: t("settings.profile.fields.birthday"), icon: Calendar },
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
        justifyContent={"center"}
      >
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
              _hover={{ bg: "bg.primary" }}
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
                left={it.icon ? <it.icon size={20} /> : undefined}
              />
            ))}
            <SettingsItem
              key="role-switch"
              label={t("settings.profile.fields.role")}
              value={
                role === "seller"
                  ? t("settings.profile.switchToCustomer")
                  : t("settings.profile.switchToSeller")
              }
              right="arrow"
              onClick={handleRoleSwitch}
              left={<User size={20} />}
            />
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
