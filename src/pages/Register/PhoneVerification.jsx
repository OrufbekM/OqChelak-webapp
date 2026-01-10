import { useState } from 'react';
import {
  Container,
  Flex,
  Image,
  Input,
  Button,
  Field,
  VStack,
  Box,
  Text
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from '@/components/PrimaryButton';

const PhoneVerification = () => {
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleSendCode = () => {
    if (phone.replace(/\D/g, '').length >= 9) {
      console.log('Kod yuborildi:', phone);
      navigate('/verifynumber', { state: { phoneNumber: phone } });
    } else {
      alert('Iltimos, telefon raqamingizni to‘liq kiriting');
    }
  };

  return (
    <Container maxW="450px" h="100vh" bg="#121212" color="white" p={6}>
      <Flex direction="column" h="full" justify="space-between" align="center" py={10}>
        <VStack gap={10} w="full">
          <VStack gap={4}>
            <Box 
              bgGradient="to-b" 
            >
            <Image src={"/images/oqchelak-logo-rounded.svg"} w={"100px"} />
          </Box>
            <Text fontSize="2xl" fontWeight="semibold">Ro’yxatdan o’tish</Text>
          </VStack>

          <Field.Root w="full">
            <Box position="relative" w="full">
              <Field.Label
                position="absolute"
                top="-10px"
                left="12px"
                bg="#121212"
                px={2}
                fontSize="xs"
                color="blue.400"
                zIndex={1}
              >
                telefon raqamingiz
              </Field.Label>
              <Input
                placeholder="+998 90 123 45 67"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                size="lg"
                h="58px"
                borderRadius="xl"
                borderWidth="1.5px"
                borderColor="blue.500"
                _focus={{ borderColor: "blue.300", ring: "1px", ringColor: "blue.300" }}
                bg="transparent"
                fontSize="lg"
              />
            </Box>
          </Field.Root>
        </VStack>

        <PrimaryButton onClick={handleSendCode}>Tasdiqlash</PrimaryButton>
      </Flex>
    </Container>
  );
};

export default PhoneVerification;