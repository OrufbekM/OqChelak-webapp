import { Flex, Text, Box } from "@chakra-ui/react";
import { ChevronRight, Check } from "lucide-react";
import { ColorModeButton } from "@/components/ui/color-mode";
import { useNavigate } from "react-router-dom";

const SettingsItem = ({ label, right, danger, to, onClick, selected, left }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (right === "switch") return;

    if (onClick) {
      onClick();
      return;
    }

    if (to === "/settings/logout") {
      try {
        localStorage.removeItem("role");
      } catch (e) {}
      navigate("/", { replace: true });
      return;
    }

    if (to) navigate(to);
  };

  return (
    <Flex
      align="center"
      justify="space-between"
      py="3"
      px="4"
      borderBottom="2px solid"
      borderColor="#bebebe"
      _dark={{ borderColor: "#3d3d3d" }}
      bg={"bg.secondary"}
      _hover={{ bg: "bg.input", cursor: right === "switch" ? "default" : "pointer" }}
      _last={{ borderBottom: "none" }}
      onClick={handleClick}
    >
      <Box display="flex" alignItems="center">
        {left && <Box mr={3}>{left}</Box>}

        <Text
          _hover={{ cursor: right === "switch" ? "default" : "pointer" }}
          fontSize="md"
          color={danger ? "red.400" : "text.primary"}
        >
          {label}
        </Text>
      </Box>

      {selected ? (
        <Check size={20} color="#48BB78" />
      ) : right === "arrow" ? (
        <ChevronRight size={20} color="#A0AEC0" />
      ) : right === "switch" ? (
        <ColorModeButton />
      ) : null}
    </Flex>
  );
};

export default SettingsItem;
