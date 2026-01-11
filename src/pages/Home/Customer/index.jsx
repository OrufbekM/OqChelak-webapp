import React from "react";
import { Box, Flex, Text, Image } from "@chakra-ui/react";
import BottomNav from "@/components/BottomNav";

const index = () => {
  return (
    <Box minH="100vh" bg="bg.secondary" pb="70px">
      <Box
        bg="product.milk.bg"
        borderRadius="radius.lg"
        p={4}
        m={4}
      >
        <Flex align="center" gap={4}>
          <Image
            src="/public/images/milk.png" 
            alt="Sut"
            boxSize="140px"
            objectFit="contain"
          />

          <Box>
            <Text fontSize="section.title" fontWeight="section.title" color="text.primary">
              Sut
            </Text>
            <Text fontSize="button.text" color="text.timer" mt={1}>
              Sut ko‘p bo‘lsa, qaymoqi ham ko‘p bo‘ladi.
            </Text>

            <Text mt={2} fontSize="button.text" color="text.primary">
              Narxi:{" "}
              <Text as="span" color="accent.orange" fontWeight="button.text">
                11,000 so‘m
              </Text>
            </Text>
          </Box>
        </Flex>
      </Box>

      <Flex
        flex={1}
        align="center"
        justify="center"
        textAlign="center"
        px={6}
        mt={20}
      >
        <Text color="text.timer" fontSize="button.text">
          Hozircha faqat shu <br />
          Bizdan foydalanishni davom eting <br />
          albatta boshqa mahsulotlar ham bo‘ladi =)
        </Text>
      </Flex>

      <BottomNav role={"customer"} />
    </Box>
  );
};

export default index;
