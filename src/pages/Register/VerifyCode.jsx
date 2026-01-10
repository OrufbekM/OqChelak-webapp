import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
} from '@chakra-ui/react';
import { MdEdit } from 'react-icons/md';

const VerifyCode = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const phoneNumber = location.state?.phoneNumber;
  const [timeLeft, setTimeLeft] = useState(59);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <Container maxW="450px" h="100vh" bg="#121212" color="white" p={6}>
      <Flex direction="column" h="full" align="center" py={10}>
        <Box 
          bgGradient="to-b"
          pb={4}>
          <Image src="/images/oqchelak-logo-rounded.svg" w="100px"/>
        </Box>

        <VStack gap={1} mb={8}>
          <HStack gap={2} align="center">
            <Text fontSize="2xl" fontWeight="bold">{phoneNumber}</Text>
            <Box as="button" onClick={() => navigate(-1)} display="flex">
              <Icon as={MdEdit} boxSize={5} color="white" />
            </Box>
          </HStack>
          <Text color="gray.400">Raqamingizga kod yubordik</Text>
        </VStack>

        <PinInput.Root count={5} placeholder="" variant="outline" mb={10} onValueComplete={() => navigate('/nameinput')}    >
          <PinInput.Control>
            <HStack gap={3}>
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
                    boxShadow: "0 0 0 1px #63b3ed" 
                  }}
                />
              ))}
            </HStack>
          </PinInput.Control>
        </PinInput.Root>

        <VStack gap={2}>
          <Text color="gray.400" fontSize="sm">Kodni olmadingizmi?</Text>
          {timeLeft > 0 ? (
            <Text fontSize="md">
              Yangisini olish: <Text as="span" color="gray.500">{timeLeft}s</Text>
            </Text>
          ) : (
            <Link 
              color="blue.400" 
              fontWeight="bold" 
              onClick={() => setTimeLeft(59)}
              style={{ textDecoration: 'none' }}
            >
              Yangisini olish
            </Link>
          )}
        </VStack>

      </Flex>
    </Container>
  );
};

export default VerifyCode;