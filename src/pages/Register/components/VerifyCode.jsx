import { useState, useEffect, useRef } from "react";
import {
  Container,
  Flex,
  VStack,
  Box,
  Image,
  Text,
  HStack,
  Link,
  Icon,
  PinInput,
} from "@chakra-ui/react";
import { MdEdit } from "react-icons/md";
import { useTranslation } from "react-i18next";
import PrimaryButton from "@/components/PrimaryButton";

const VerifyCode = ({ phoneNumber, onNext, onBack }) => {
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState(59);
  const [code, setCode] = useState(["", "", "", "", ""]);
  const containerRef = useRef(null);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const viewportHeight = window.visualViewport?.height || window.innerHeight;
        containerRef.current.style.minHeight = `${viewportHeight}px`;
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        const codeArray = Array.isArray(code) ? code : ["", "", "", "", ""];
        const codeString = codeArray.join("");
        if (codeString.length === 5) {
          onNext(codeString);
        }
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
  }, [code, onNext]);

  const handleCodeComplete = (value) => {
    const codeArray = Array.isArray(value) ? value : [];
    const codeString = codeArray.join("");
    if (codeString.length === 5) {
      onNext(codeString);
    }
  };

  const handleCodeChange = (value) => {
    const codeArray = Array.isArray(value) ? value : ["", "", "", "", ""];
    setCode(codeArray);
  };

  const handleSubmit = () => {
    const codeArray = Array.isArray(code) ? code : ["", "", "", "", ""];
    const codeString = codeArray.join("");
    if (codeString.length === 5) {
      onNext(codeString);
    }
  };

  const handleResend = () => {
    setTimeLeft(59);
    setCode(["", "", "", "", ""]);
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
              <Box bgGradient="to-b" pb={4}>
                <Image
                  src="/images/oqchelak-logo-rounded.svg"
                  w="100px"
                  h="100px"
                  objectFit="contain"
                />
              </Box>
            </VStack>

            <VStack gap={1} mb={8} w="full">
              <HStack gap={2} align="center" justify="center">
                <Text fontSize="2xl" fontWeight="bold" color="text.primary">
                  {phoneNumber}
                </Text>
                <Box as="button" onClick={onBack} display="flex">
                  <Icon as={MdEdit} boxSize={5} color="text.primary" />
                </Box>
              </HStack>
              <Text color="gray.400" textAlign="center">
                {t("register.codeSent")}
              </Text>
            </VStack>

            <PinInput.Root
              count={5}
              placeholder=""
              variant="outline"
              mb={10}
              onValueChange={handleCodeChange}
              onValueComplete={handleCodeComplete}
            >
              <PinInput.Control>
                <HStack gap={3} justify="center">
                  {[0, 1, 2, 3, 4].map((index) => (
                    <PinInput.Input
                      key={index}
                      index={index}
                      w="44px"
                      h="54px"
                      fontSize="xl"
                      fontWeight="bold"
                      borderRadius="xl"
                      borderColor="blue.500"
                      borderWidth="2px"
                      bg="transparent"
                      _focus={{
                        borderColor: "blue.300",
                        boxShadow:
                          "0 0 0 1px var(--chakra-colors-accent-lightBlue)",
                      }}
                    />
                  ))}
                </HStack>
              </PinInput.Control>
            </PinInput.Root>

            <VStack gap={2}>
              <Text color="gray.400" fontSize="sm">
                {t("register.codeNotReceived")}
              </Text>
              {timeLeft > 0 ? (
                <Text fontSize="md">
                  {t("register.resendCodeIn")}{" "}
                  <Text as="span" color="gray.500">
                    {timeLeft}s
                  </Text>
                </Text>
              ) : (
                <Link
                  color="blue.400"
                  fontWeight="bold"
                  onClick={handleResend}
                  style={{ textDecoration: "none" }}
                >
                  {t("register.resendCode")}
                </Link>
              )}
            </VStack>
          </VStack>

          <Box
            w="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
            pb={4}
            position="sticky"
            bottom={0}
            bg="bg.primary"
            pt={4}
          >
            <PrimaryButton 
              onClick={onNext}
              isDisabled={!Array.isArray(code) || code.join("").length !== 5}
            >
              {t("register.confirm")}
            </PrimaryButton>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default VerifyCode;
