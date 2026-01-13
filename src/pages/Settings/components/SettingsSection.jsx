import { Box, Text } from "@chakra-ui/react";

const SettingsSection = ({ title, children }) => {
  return (
    <Box mt="6">
      {title && (
        <Text
          fontSize="sm"
          color="text.timer"
          mb="2"
          px="2"
        >
          {title}
        </Text>
      )}

      <Box
        bg="bg.input"
        rounded="xl"
        overflow="hidden"
      >
        {children}
      </Box>
    </Box>
  );
};

export default SettingsSection;
