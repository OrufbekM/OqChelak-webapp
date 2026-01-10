import PrimaryButton from "@/components/PrimaryButton";
import { Box, Container, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
  return (
    <Box bg={"bg.primary"}>
      <Container>
        <Flex
          flexDirection={"column"}
          justifyContent={"space-between"}
          alignItems={"baseline"}
        >
          <Flex
            flexDirection={"column"}
            justifyContent={"space-between"}
            alignItems={"baseline"}
          >
            <Image src={"/images/oqchelak-logo-rounded.svg"} w={"100px"} />
            <Text fontSize={"xl"} fontWeight={"semibold"}>
              Oqchelakka xush kelibsiz!
            </Text>
          </Flex>
          <PrimaryButton onClick={() => navigate("/register")}>Boshlash</PrimaryButton>
        </Flex>
      </Container>
    </Box>
  );
};

export default Welcome;
