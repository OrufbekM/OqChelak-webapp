import React from "react";
import { Box, Button, Input, VStack, Drawer, Text } from "@chakra-ui/react";

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
              <Text fontSize="sm" fontWeight="semibold" mb={2}>
                {label}
              </Text>
              <Input
                value={value}
                onChange={(e) => onChangeValue?.(e.target.value)}
              />
            </Box>
          </VStack>
        </Drawer.Body>
        <Drawer.Footer>
          <Drawer.ActionTrigger asChild>
            <Button variant="ghost" mr={3}>
              {cancelText}
            </Button>
          </Drawer.ActionTrigger>
          <Button
            bg={"brand.main"}
            color={"white"}
            rounded={"xl"}
            onClick={onSave}
          >
            {saveText}
          </Button>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer.Root>
  );
}

export default EditFieldDrawer;
