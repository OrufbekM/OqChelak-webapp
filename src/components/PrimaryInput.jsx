import { Input as ChakraInput } from "@chakra-ui/react";

const PrimaryInput = ({ ...props }) => {
  return (
    <ChakraInput
      h="58px"
      borderRadius="xl"
      borderWidth="1.5px"
      borderColor="blue.500"
      bg="transparent"
      fontSize="lg"
      height={{
        base: "50px",
        sm: "48px",
        md: "46px",
        lg: "46px",
        xl: "48px",
      }}
      width={{
        base: "100%",
        sm: "280px",
        md: "320px",
      }}
      maxW="320px"
      {...props}
    />
  );
};

export default PrimaryInput;
