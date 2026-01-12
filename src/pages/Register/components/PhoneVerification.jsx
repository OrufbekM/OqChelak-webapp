import { useState, useEffect, useRef } from "react";
import {
  Container,
  Flex,
  Image,
  Field,
  VStack,
  Box,
  Text,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import PrimaryButton from "@/components/PrimaryButton";
import PrimaryInput from "@/components/PrimaryInput";
import { useColorModeValue } from "@/components/ui/color-mode";

const PhoneVerification = ({ onNext, onBack }) => {
  const { t } = useTranslation();
  const [phone, setPhone] = useState("+998 ");
  const labelBg = useColorModeValue("#FFFAFA", "#1A202C");
  const containerRef = useRef(null);

  const handleSendCode = () => {
    const digitsOnly = phone.replace(/\D/g, "");
    if (digitsOnly.length >= 12) {
      onNext(phone);
    } else {
      alert(t("register.phoneError"));
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const viewportHeight = window.visualViewport?.height || window.innerHeight;
        containerRef.current.style.minHeight = `${viewportHeight}px`;
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        handleSendCode();
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
    window.addEventListener("keydown", handleKeyDown);
    
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", handleResize);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", handleResize);
      }
    };
  }, [phone]);

  const handlePhoneChange = (e) => {
    let value = e.target.value;
    
    if (!value.startsWith("+998 ")) {
      setPhone("+998 ");
      return;
    }
    
    const digitsOnly = value.replace(/[^\d]/g, "").slice(3);
    
    if (digitsOnly.length === 0) {
      setPhone("+998 ");
    } else if (digitsOnly.length <= 2) {
      setPhone(`+998 ${digitsOnly}`);
    } else if (digitsOnly.length <= 5) {
      setPhone(`+998 ${digitsOnly.slice(0, 2)} ${digitsOnly.slice(2)}`);
    } else if (digitsOnly.length <= 7) {
      setPhone(`+998 ${digitsOnly.slice(0, 2)} ${digitsOnly.slice(2, 5)} ${digitsOnly.slice(5)}`);
    } else if (digitsOnly.length <= 9) {
      setPhone(`+998 ${digitsOnly.slice(0, 2)} ${digitsOnly.slice(2, 5)} ${digitsOnly.slice(5, 7)} ${digitsOnly.slice(7)}`);
    } else {
      setPhone(`+998 ${digitsOnly.slice(0, 2)} ${digitsOnly.slice(2, 5)} ${digitsOnly.slice(5, 7)} ${digitsOnly.slice(7, 9)}`);
    }
  };

  return (
    <Box
      ref={containerRef}
      bg="bg.primary"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="relative"
    >
      <Container maxW="450px" px={4}>
        <Flex
          direction="column"
          h="full"
          justify="space-between"
          align="center"
          py={10}
          minH="100vh"
        >
          <VStack gap={10} w="full" flex={1} justify="center">
            <VStack gap={4}>
              <Box bgGradient="to-b">
                <Image
                  src="/images/oqchelak-logo-rounded.svg"
                  w="100px"
                  h="100px"
                  objectFit="contain"
                />
              </Box>
              <Text fontSize="2xl" fontWeight="semibold" color="text.primary">
                {t("register.title")}
              </Text>
            </VStack>

            <Field.Root
              w="full"
              h="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
              justifyItems="center"
            >
              <Box
                display="flex"
                alignItems="start"
                w="full"
                maxW="320px"
                sm={{ maxW: "280px" }}
                md={{ maxW: "320px" }}
                lg={{ maxW: "320px" }}
                xl={{ maxW: "320px" }}
              >
                <Text fontSize="sm" color="text.primary">
                  {t("register.phoneLabel")}
                </Text>
              </Box>
              <PrimaryInput
                placeholder={t("register.phonePlaceholder")}
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
              />
            </Field.Root>
          </VStack>

          <Box
            w="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
            justifyItems="center"
            pb={4}
            position="sticky"
            bottom={0}
            bg="bg.primary"
            pt={4}
          >
            <PrimaryButton onClick={handleSendCode}>{t("register.confirm")}</PrimaryButton>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default PhoneVerification;
