import { useState, useEffect, useRef } from "react";
import {
  Container,
  Flex,
  VStack,
  Box,
  Image,
  Text,
  Field,
} from "@chakra-ui/react";
import PrimaryButton from "@/components/PrimaryButton";
import PrimaryInput from "@/components/PrimaryInput";
import { useColorModeValue } from "@/components/ui/color-mode";
import { useNavigate } from "react-router-dom";

const NameInput = ({ onNext, userName, role }) => {
  const [name, setName] = useState(userName || "");
  const labelBg = useColorModeValue("#FFFAFA", "#1A202C");
  const containerRef = useRef(null);
  const navigate = useNavigate()
  
  const handleNext = () => {
    if (name.length >= 3) {
      onNext(name);

      // Role bo'yicha yo'naltirish
      if (role === "customer") {
        navigate("/customer-home");
      } else if (role === "seller") {
        navigate("/seller-home");
      } else {
        navigate("/404"); 
      }
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const viewportHeight =
          window.visualViewport?.height || window.innerHeight;
        containerRef.current.style.minHeight = `${viewportHeight}px`;
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Enter" && name.length >= 3) {
        handleNext();
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
  }, [name]);

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
                Ismingizni kiriting:
              </Text>
            </VStack>

            <Field.Root
              w="full"
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
                  ismingiz
                </Text>
              </Box>
              <PrimaryInput
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Field.Root>
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
            <PrimaryButton isDisabled={name.length < 3} onClick={handleNext}>
              Tasdiqlash
            </PrimaryButton>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default NameInput;
