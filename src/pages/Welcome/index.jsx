import PrimaryButton from "@/components/PrimaryButton";
import { Box, Container, Flex, Image, Text, VStack } from "@chakra-ui/react";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n/config";

const languages = [
  { code: "uz-latin", label: "O'z", flag: "/images/uz.svg" },
  { code: "uz-cyrillic", label: "Ўз", flag: "/images/uz.svg" },
  { code: "en", label: "En", flag: "/images/uk.svg" },
  { code: "ru", label: "Py", flag: "/images/ru.svg" },
];

const Welcome = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [currentLang, setCurrentLang] = useState(
    localStorage.getItem("language") || "uz-latin"
  );
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLanguage = languages.find((lang) => lang.code === currentLang) || languages[0];

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem("language", langCode);
    setCurrentLang(langCode);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <Box
      bg="bg.primary"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="relative"
    >
      <Container maxW="container.sm" px={4} position="relative" w="100%">
        {/* Language Selector - Top Right */}
        <Box position="absolute" top={4} right={4} zIndex={10} ref={dropdownRef}>
          <Box position="relative">
            <Box
              cursor="pointer"
              display="flex"
              alignItems="center"
              justifyContent="center"
              onClick={() => setIsOpen(!isOpen)}
              transition="all 0.2s"
            >
              <Image
                src={currentLanguage.flag}
                alt={currentLanguage.label}
                w="48px"
                h="32px"
                objectFit="cover"
                borderRadius="sm"
              />
            </Box>

            {isOpen && (
              <Box
                position="absolute"
                top="100%"
                right={0}
                mt={2}
                bg="bg.secondary"
                borderRadius="lg"
                border="1px solid"
                borderColor="bg.input"
                minW="140px"
                py={2}
                boxShadow="lg"
                zIndex={20}
              >
                {languages
                  .filter((lang) => lang.code !== currentLang)
                  .map((lang) => (
                    <Box
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      cursor="pointer"
                      px={4}
                      py={2}
                      display="flex"
                      alignItems="center"
                      gap={3}
                      _hover={{ bg: "bg.input" }}
                      transition="all 0.2s"
                    >
                      <Image
                        src={lang.flag}
                        alt={lang.label}
                        w="32px"
                        h="24px"
                        objectFit="cover"
                        borderRadius="sm"
                      />
                      <Text fontSize="sm" color="text.primary" fontWeight="medium">
                        {lang.label}
                      </Text>
                    </Box>
                  ))}
              </Box>
            )}
          </Box>
        </Box>

        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap={8}
          minH="100vh"
          py={10}
        >
          <VStack gap={6} alignItems="center" flex={1} justifyContent="center">
            <Image
              src="/images/oqchelak-logo-rounded.svg"
              w="100px"
              h="100px"
              objectFit="contain"
            />
            <Text
              fontSize="xl"
              fontWeight="semibold"
              textAlign="center"
              color="text.primary"
            >
              {t("welcome.titleLine1")}
              <br />
              {t("welcome.titleLine2")}
            </Text>
          </VStack>

          <Box w="full" maxW="320px">
            <PrimaryButton onClick={() => navigate("/register")} w="full">
              {t("welcome.registerButton")}
            </PrimaryButton>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Welcome;
