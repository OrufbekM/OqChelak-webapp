import { Flex, Text } from "@chakra-ui/react";
import { Switch } from "@chakra-ui/react";
import { ChevronRight } from "lucide-react";

const SettingsItem = ({ label, right, danger }) => {
  return (
    <Flex
      align="center"
      justify="space-between"
      py="3"
      px="4"
      borderBottom="1px solid"
      borderColor="gray.700"
    >
      <Text fontSize="md" color={danger ? "red.400" : "white"}>
        {label}
      </Text>

      {right === "arrow" && (
        <ChevronRight size={20} color="#A0AEC0" />
      )}

      {right === "switch" && (
        <Switch.Root>
          <Switch.Control />
        </Switch.Root>
      )}
    </Flex>
  );
};

export default SettingsItem;
