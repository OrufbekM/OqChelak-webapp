import { Button } from "@chakra-ui/react";
import { ArrowLeft } from "lucide-react";
import React from "react";

function BackButton() {
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
      transition="all 0.2s ease-in-out"
    >
      <ArrowLeft /> Ortga
    </Button>
  );
}

export default BackButton;
