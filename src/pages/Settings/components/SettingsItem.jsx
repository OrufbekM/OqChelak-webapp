import { Flex, Text, Box } from "@chakra-ui/react";
import { ChevronRight, Check } from "lucide-react";
import { ColorModeButton } from "@/components/ui/color-mode";
import { useNavigate } from "react-router-dom";

const SettingsItem = ({ label, value, right, danger, to, onClick, selected, left, icon, rightElement, variant }) => {
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
      _dark={{ 
        borderColor: "#3d3d3d",
        bg: variant === "danger" ? "red.900" : "bg.secondary",
        "&:hover": { 
          bg: variant === "danger" ? "red.800" : "bg.primary" 
        }
      }}
      bg={variant === "danger" ? "red.50" : "bg.secondary"}
      _hover={{ 
        bg: variant === "danger" ? "red.100" : "bg.primary", 
        cursor: right === "switch" ? "default" : "pointer" 
      }}
      _last={{ borderBottom: "none" }}
      onClick={handleClick}
    >
      <Box display="flex" alignItems="center">
        {(left || icon) && (
          <Box mr={3} color={variant === "danger" ? "red.500" : "inherit"}>
            {icon || left}
          </Box>
        )}

        <Text
          _hover={{ cursor: right === "switch" ? "default" : "pointer" }}
          fontSize="md"
          color={danger || variant === "danger" ? "red.500" : "text.primary"}
          _dark={{ color: danger || variant === "danger" ? "red.300" : "text.primary" }}
        >
          {label}
        </Text>
      </Box>

      <Box display="flex" alignItems="center">
        {value && (
          <Text fontSize="sm" color="text.timer" mr={3}>
            {value}
          </Text>
        )}

        {rightElement ? (
          rightElement
        ) : selected ? (
          <Check size={20} color="#48BB78" />
        ) : right === "arrow" ? (
          <ChevronRight size={20} color="#A0AEC0" />
        ) : right === "switch" ? (
          <ColorModeButton />
        ) : null}
      </Box>
    </Flex>
  );
};

export default SettingsItem;
