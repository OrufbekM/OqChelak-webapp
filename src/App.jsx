import React from 'react'
import { Button, Flex, VStack, Heading } from '@chakra-ui/react'
import { ColorModeButton } from './components/ui/color-mode'

const App = () => {
  return (
    <Flex justifyContent='center' alignItems='center' minHeight='100vh' px={4}>
      <VStack spacing={6}>
        <Heading as='h1' size='xl'>OqChelak</Heading>
        <Button bg='brand.main' color='text.light' _hover={{ opacity: 0.9 }}>
          Get Started
        </Button>
        <ColorModeButton />
      </VStack>
    </Flex>
  )
}

export default App
