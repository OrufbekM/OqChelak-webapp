import { Box, Container, Flex, Image, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import BackButton from "@/components/BackButton";
import RoleCards from "./components/RoleCards";
import PhoneVerification from "./components/PhoneVerification";
import VerifyCode from "./components/VerifyCode";
import NameInput from "./components/NameInput";

function Register() {
  const { t } = useTranslation();
  const [step, setStep] = useState("role");
  const [userType, setUserType] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userName, setUserName] = useState("");

  const handleCustomerClick = () => {
    setUserType("customer");
    setStep("phone");
  };

  const handleSellerClick = () => {
    setUserType("seller");
    setStep("phone");
  };

  const handlePhoneNext = (phone) => {
    setPhoneNumber(phone);
    setStep("verify");
  };

  const handlePhoneBack = () => {
    setStep("role");
    setPhoneNumber("");
  };

  const handleVerifyNext = (code) => {
    console.log("Verification code:", code);
    setStep("name");
  };

  const handleVerifyBack = () => {
    setStep("phone");
  };

  const handleNameNext = (name) => {
    setUserName(name);
    console.log("Registration complete:", { userType, phoneNumber, name });
  };

  const handleNameBack = () => {
    setStep("verify");
  };

  const getBackButtonProps = () => {
    if (step === "role") return {};
    if (step === "phone") return { onClick: handlePhoneBack };
    if (step === "verify") return { onClick: handleVerifyBack };
    if (step === "name") return { onClick: handleNameBack };
    return {};
  };

  const renderStep = () => {
    switch (step) {
      case "role":
        return (
          <Box
            bg="bg.primary"
            minH="100vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Container maxW="container.sm" px={4}>
              <Flex flexDirection="column" alignItems="center" gap={8} py={10}>
                <Flex flexDirection="column" alignItems="center" gap={4}>
                  <Image
                    src="/images/oqchelak-logo-rounded.svg"
                    w="100px"
                    h="100px"
                    objectFit="contain"
                  />
                  <Text
                    fontSize="2xl"
                    fontWeight="bold"
                    textAlign="center"
                    color="text.primary"
                  >
                    {t("register.roleQuestion")}
                  </Text>
                </Flex>

                <RoleCards
                  onCustomerClick={handleCustomerClick}
                  onSellerClick={handleSellerClick}
                />
              </Flex>
            </Container>
          </Box>
        );
      case "phone":
        return (
          <PhoneVerification
            onNext={handlePhoneNext}
            onBack={handlePhoneBack}
          />
        );
      case "verify":
        return (
          <VerifyCode
            phoneNumber={phoneNumber}
            onNext={handleVerifyNext}
            onBack={handleVerifyBack}
          />
        );
      case "name":
        return (
          <NameInput
            onNext={handleNameNext}
            userName={userName}
            role={userType}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box position="relative" minH="100vh">
      {step !== "role" && (
        <Box
          position="absolute"
          top={4}
          left={4}
          zIndex={10}
        >
          <BackButton {...getBackButtonProps()} />
        </Box>
      )}
      {renderStep()}
    </Box>
  );
}

export default Register;
