import React from "react";
import { Box, Button, Input, VStack, Drawer, Text } from "@chakra-ui/react";
import CustomDatePicker from "@/components/DatePicker";

function EditFieldDrawer({
  open,
  onOpenChange,
  placement = "bottom",
  title,
  label,
  value,
  onChangeValue,
  onSave,
  cancelText,
  saveText,
  inputType = "text",
}) {
  return (
    <Drawer.Root placement={placement} open={open} onOpenChange={onOpenChange}>
      <Drawer.Content
        bg={"bg.secondary"}
        boxShadow={"none"}
        border={"1px dashed"}
        borderColor={"brand.main"}
        rounded={"2xl"}
        roundedBottom={"none"}
      >
        <Drawer.Header>
          <Drawer.Title>{title}</Drawer.Title>
        </Drawer.Header>
        <Drawer.CloseTrigger />
        <Drawer.Body>
          <VStack gap={4} align="stretch">
            <Box>
              {inputType === "date" ? (
                <CustomDatePicker
                  label={label}
                  value={value}
                  onChange={onChangeValue}
                  width="100%"
                />
              ) : (
                <>
                  <Text fontSize="sm" fontWeight="semibold" mb={2}>
                    {label}
                  </Text>
                  <Input
                    value={value}
                    onChange={(e) => onChangeValue?.(e.target.value)}
                  />
                </>
              )}
            </Box>
          </VStack>
        </Drawer.Body>
        <Drawer.Footer>
          <Drawer.ActionTrigger asChild>
            <Button variant="ghost" mr={3} rounded={"xl"}>
              {cancelText}
            </Button>
          </Drawer.ActionTrigger>
          <Button
            bg={"brand.main"}
            color={"white"}
            rounded={"xl"}
            onClick={onSave}
            _hover={{ bg: "brand.600" }}
          >
            {saveText}
          </Button>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer.Root>
  );
}

export default EditFieldDrawer;
