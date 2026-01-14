import { Button as ChakraButton } from "@chakra-ui/react";

const PrimaryButton = ({ children, variant = "primary", full, ...props }) => {
  const isFull =
    full === true ||
    full === "yes" ||
    full === "true" ||
    full === 1 ||
    full === "1";

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
      width={
        isFull
          ? "100%"
          : {
              base: "100%",
              sm: "280px",
              md: "320px",
            }
      }
      maxW={isFull ? "none" : "320px"}
      _hover={{
        bg: "brand.600",
        transition: "all 0.2s ease-in-out",
      }}
      _active={{
        transform: "scale(0.9)",
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
