import { Button } from "@chakra-ui/react";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function BackButton({ onClick }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleClick = () => (onClick ? onClick() : navigate(-1));
  return (
    <Button
      bg={"brand.main"}
      color={"brand.50"}
      maxW={"100px"}
      p={"12px"}
      borderRadius={"xl"}
      display={"flex"}
      alignItems={"center"}
      gap={1}
      _hover={{
        bg: "brand.600",
        transition: "all 0.2s ease-in-out",
      }}
      _active={{
        transform: "scale(0.9)",
        boxShadow: "md",
      }}
      onClick={handleClick}
      transition="all 0.2s ease-in-out"
    >
      <ArrowLeft /> {t("common.back")}
    </Button>
  );
}

export default BackButton;
