import { useState } from 'react';
import {
  Container,
  Flex,
  VStack,
  Box,
  Image,
  Text,
  Input,
  Button,
  Field,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from '@/components/PrimaryButton';

const NameInput = () => {
  const [name, setName] = useState('');
//   const navigate = useNavigate();

//   const handleNext = () => {
//     if (name.length > 2) {
//       console.log('Ism saqlandi:', name);
//     }
//   };

  return (
    <Container maxW="450px" h="100vh" bg="#121212" color="white" p={6}>
      <Flex direction="column" h="full" justify="space-between" align="center" py={10}>
        
        <VStack gap={10} w="full">
          <VStack gap={4}>
            <Box 
              bgGradient="to-b" 
            >
              <Image src="/images/oqchelak-logo-rounded.svg" w="100px" />
            </Box>
            <Text fontSize="2xl" fontWeight="semibold">Ismingizni kiriting:</Text>
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
                Ismingiz
              </Field.Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                size="lg"
                h="58px"
                borderRadius="xl"
                borderWidth="1.5px"
                borderColor="blue.500"
                bg="transparent"
                _focus={{ 
                  borderColor: "blue.300", 
                  ring: "1px", 
                  ringColor: "blue.300" 
                }}
              />
            </Box>
          </Field.Root>
        </VStack>

        <PrimaryButton isDisabled={name.length < 3} onClick={() => console.log("Tayyor!")}>
          Tasdiqlash
        </PrimaryButton>

      </Flex>
    </Container>
  );
};

export default NameInput;