import PrimaryButton from "@/components/PrimaryButton";
import { Box, Container, Flex, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
  return (
    <Box bg="bg.primary" minH="100vh" display="flex" alignItems="center" justifyContent="center">
      <Container maxW="container.sm" px={4}>
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
              Oqchelakka xush<br />kelibsiz!
            </Text>
          </VStack>
          
          <Box w="full" maxW="320px">
            <PrimaryButton 
              onClick={() => navigate("/register")}
              w="full"
            >
              Boshlash
            </PrimaryButton>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Welcome;
