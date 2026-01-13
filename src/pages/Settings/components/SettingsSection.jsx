import { Box, Text } from "@chakra-ui/react";

const SettingsSection = ({ title, children }) => {
  return (
    <Box mt="6">
      {title && (
        <Text
          fontSize="sm"
          color="gray.400"
          mb="2"
          px="2"
        >
          {title}
        </Text>
      )}

      <Box
        bg="gray.800"
        rounded="xl"
        overflow="hidden"
      >
        {children}
      </Box>
    </Box>
  );
};

export default SettingsSection;
