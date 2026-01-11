import { ChakraProvider } from '@chakra-ui/react'
import { ThemeProvider } from 'next-themes'
import { system } from '@/theme'

export function Provider(props) {
  return (
    <ChakraProvider value={system}>
      <ThemeProvider attribute='class'>{props.children}</ThemeProvider>
    </ChakraProvider>
  )
}
