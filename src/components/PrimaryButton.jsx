import { Button as ChakraButton } from "@chakra-ui/react";

const PrimaryButton = ({ children, variant = "primary", ...props }) => {
  return (
    <ChakraButton
      bg="brand.main"
      color="text.light"
      borderRadius="xl"
      width={{
        base: "100%",
        sm: "280px",
        md: "320px",
      }}
      maxW="320px"
      
      _hover={{
        bg: "brand.600",
        boxShadow: "lg",
        transition: "all 0.2s ease-in-out",
      }}
      
      _active={{
        transform: "translateY(0px)",
        boxShadow: "md",
      }}
      
      _focus={{
        boxShadow: "outline",
      }}
      
      transition="all 0.2s ease-in-out"
      
      {...props}
    >
      {children}
    </ChakraButton>
  );
};

export default PrimaryButton;