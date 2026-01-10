import { Container, Flex, Image, Text, Box, Heading, SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate()

  const handleCustomerClick = () => {
    navigate('/verifyphone', { 
      state: { userType: 'customer' } 
    });
  };

  const handleSellerClick = () => {
    navigate('/verifyphone', { 
      state: { userType: 'seller' } 
    });
  };
  return (
    <Container maxW="container.xl">
      <Flex
      py={5} px={2}
        flexDirection={"column"}
        justifyContent={"space-between"}
        alignItems={"center"}
        gap={12}
      >
        <Flex
          flexDirection={"column"}
          justifyContent='center'
          gap='10px'
          alignItems={"center"}
        >
          <Image src={"/images/oqchelak-logo-rounded.svg"} w={"100px"} />
          <Text fontSize={"2xl"} fontWeight={"semibold"} textAlign="center">
            Qaysi biri sizga ko'proq mos keladi?
          </Text>
        </Flex>
        <Flex display={"flex"} flexDirection={"column"} gap={2}>
          <Box onClick={handleCustomerClick} p={2} display={'flex'} gap={"10px"} bg={'accent.yellow'} borderRadius={"16px"} border={"3px solid white"}>
            <Image src={"/public/images/customer.png"} />
             <Box display={'flex'} flexDirection={"column"}>
              <Heading color={'accent.orange'}>
                Haridor
              </Heading>
              <Text color={"accent.orange"}>
                Siz mahsulotlarni tanlaysiz, buyurtma berasiz va yetkazib berilishini kutasiz.
              </Text>
             </Box>
          </Box>
          <Box onClick={handleSellerClick} p={2} display={'flex'} gap={"10px"} bg={'accent.lightBlue'} borderRadius={"16px"} border={"3px solid white"}>
            <Image src={"/public/images/seller.png"} />
             <Box display={'flex'} flexDirection={"column"}>
              <Heading color={'accent.blue'}>
              Sotuvchi
              </Heading>
              <Text color={"accent.blue"}>
              Siz buyurtmalarni qabul qilasiz, tayyorlaysiz va mijozlarga yetkazib berasiz.
              </Text>
             </Box>
          </Box>
        </Flex>
      </Flex>
    </Container>
  )
}

export default Register;