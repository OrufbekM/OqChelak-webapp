import React, { useState } from "react";
import { Box, Text, Container } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { ChevronRight, Lock, Mail, Phone, Shield, Activity, Monitor, Trash2, AlertTriangle } from "lucide-react";
import BackButton from "@/components/BackButton";
import BottomNav from "@/components/MobileNav";
import SettingsSection from "./components/SettingsSection";
import SettingsItem from "./components/SettingsItem";
import EditFieldDrawer from "./components/EditFieldDrawer";
import { toaster } from "@/components/ui/toaster";

const Security = () => {
  const { t } = useTranslation();
  const [isDeleteDrawerOpen, setIsDeleteDrawerOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");

  const handlePasswordChange = () => {
    toaster.create({
      title: t("settings.security.changePassword"),
      description: t("settings.security.changePasswordInfo"),
      type: "info",
      duration: 3000,
    });
  };

  const handleEmailChange = () => {
    toaster.create({
      title: t("settings.security.changeEmail"),
      description: t("settings.security.changeEmailInfo"),
      type: "info",
      duration: 3000,
    });
  };

  const handlePhoneChange = () => {
    toaster.create({
      title: t("settings.security.changePhone"),
      description: t("settings.security.changePhoneInfo"),
      type: "info",
      duration: 3000,
    });
  };

  const handleTwoFactorAuth = () => {
    toaster.create({
      title: t("settings.security.twoFactorAuth"),
      description: t("settings.security.twoFactorAuthInfo"),
      type: "info",
      duration: 3000,
    });
  };

  const handleLoginActivity = () => {
    toaster.create({
      title: t("settings.security.loginActivity"),
      description: t("settings.security.loginActivityInfo"),
      type: "info",
      duration: 3000,
    });
  };

  const handleDevices = () => {
    toaster.create({
      title: t("settings.security.devices"),
      description: t("settings.security.devicesInfo"),
      type: "info",
      duration: 3000,
    });
  };

  const handleDeleteAccount = () => {
    setIsDeleteDrawerOpen(true);
  };

  const confirmDeleteAccount = () => {
    if (deleteConfirmation.toLowerCase() === "delete") {
      toaster.create({
        title: t("settings.security.deleteAccount"),
        description: t("settings.security.deleteAccountInfo"),
        type: "warning",
        duration: 3000,
      });
      setIsDeleteDrawerOpen(false);
      setDeleteConfirmation("");
    } else {
      toaster.create({
        title: t("settings.security.invalidConfirmationTitle"),
        description: t("settings.security.invalidConfirmationDesc"),
        type: "error",
        duration: 3000,
      });
    }
  };

  const cancelDeleteAccount = () => {
    setIsDeleteDrawerOpen(false);
    setDeleteConfirmation("");
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
          {t("settings.items.security")}
        </Text>
      </Box>
      <Box pt={6}>
        <SettingsSection title={t("settings.security.authTitle")}>
          <SettingsItem
            label={t("settings.security.changePassword")}
            icon={<Lock size={20} />}
            onClick={handlePasswordChange}
            right="arrow"
          />
          <SettingsItem
            label={t("settings.security.twoFactorAuth")}
            icon={<Shield size={20} />}
            onClick={handleTwoFactorAuth}
            right="arrow"
          />
        </SettingsSection>

        <SettingsSection title={t("settings.security.accountInfoTitle")}>
          <SettingsItem
            label={t("settings.security.changeEmail")}
            icon={<Mail size={20} />}
            onClick={handleEmailChange}
            right="arrow"
          />
          <SettingsItem
            label={t("settings.security.changePhone")}
            icon={<Phone size={20} />}
            onClick={handlePhoneChange}
            right="arrow"
          />
        </SettingsSection>

        {/* Activity & Devices Section */}
        <SettingsSection title={t("settings.security.activityDevicesTitle")}>
          <SettingsItem
            label={t("settings.security.loginActivity")}
            icon={<Activity size={20} />}
            onClick={handleLoginActivity}
            right="arrow"
          />
          <SettingsItem
            label={t("settings.security.devices")}
            icon={<Monitor size={20} />}
            onClick={handleDevices}
            right="arrow"
          />
        </SettingsSection>

        {/* Danger Zone Section */}
        <SettingsSection title={t("settings.security.dangerZone")}>
          <SettingsItem
            label={t("settings.security.deleteAccount")}
            icon={<Trash2 size={20} />}
            onClick={handleDeleteAccount}
            variant="danger"
            right="arrow"
          />
        </SettingsSection>

        {/* Delete Account Confirmation Drawer */}
        <EditFieldDrawer
          open={isDeleteDrawerOpen}
          onOpenChange={(isOpen) => {
            if (!isOpen) cancelDeleteAccount();
          }}
          placement="bottom"
          title={
            <Box display="flex" alignItems="center">
              <AlertTriangle size={24} style={{ marginRight: "8px" }} />
              {t("settings.security.deleteAccount")}
            </Box>
          }
          label={t("settings.security.deleteAccountWarning")}
          value={deleteConfirmation}
          onChangeValue={setDeleteConfirmation}
          onSave={confirmDeleteAccount}
          cancelText={t("settings.security.cancelDelete")}
          saveText={t("settings.security.confirmDelete")}
        />
      </Box>
      <BottomNav/>
    </Container>
  );
};

export default Security;
