import { Button as ChakraButton } from "@chakra-ui/react";

const PrimaryButton = ({ children, variant = "primary", ...props }) => {
  return (
    <ChakraButton
      bg="brand.main"
      color="text.light"
      fontSize="md"
      borderRadius="xl"
      height={{
        base: "48px",
        sm: "46px",
        md: "40px",
      }}
      width={{
        base: "100%",
        sm: "280px",
        md: "320px",
      }}
      maxW="320px"
      _hover={{
        bg: "brand.600",
        transition: "all 0.2s ease-in-out",
      }}
      _active={{
        transform: "translateY(0px)",
        boxShadow: "md",
      }}
      transition="all 0.2s ease-in-out"
      {...props}
    >
      {children}
    </ChakraButton>
  );
};

export default PrimaryButton;
