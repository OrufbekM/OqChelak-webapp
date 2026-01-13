import { Flex, Text } from "@chakra-ui/react";
import { ChevronRight } from "lucide-react";
import { ColorModeButton } from "@/components/ui/color-mode";
import { useNavigate } from "react-router-dom";

const SettingsItem = ({ label, right, danger, to }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (right === "switch") return;

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
      <Text
        _hover={{ cursor: right === "switch" ? "default" : "pointer" }}
        fontSize="md"
        color={danger ? "red.400" : "text.primary"}
      >
        {label}
      </Text>

      {right === "arrow" && <ChevronRight size={20} color="#A0AEC0" />}

      {right === "switch" && <ColorModeButton />}
    </Flex>
  );
};

export default SettingsItem;
