import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Input,
  VStack,
  Text,
  Dialog,
  Portal,
  Flex,
} from "@chakra-ui/react";
import CustomDatePicker from "@/components/DatePicker";

function EditFieldDrawer({
  open,
  onOpenChange,
  title,
  label,
  value,
  onChangeValue,
  onSave,
  cancelText,
  saveText,
  inputType = "text",
  isLocationField = false,
  locationOptions = [],
}) {
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const locationRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!isLocationOpen) return;

    const handleOutside = (event) => {
      if (!locationRef.current?.contains(event.target)) {
        setIsLocationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [isLocationOpen]);

  useEffect(() => {
    if (
      open &&
      !isLocationField &&
      inputType !== "date" &&
      inputRef.current
    ) {
      // Delay to ensure the dialog is mounted before focusing
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open, isLocationField, inputType]);

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(details) => {
        if (!details.open) setIsLocationOpen(false);
        onOpenChange?.(details);
      }}
      placement="center"
    >
      <Portal>
        <Dialog.Backdrop bg="blackAlpha.600" />
        <Dialog.Positioner px={4}>
          <Dialog.Content
            bg="bg.secondary"
            boxShadow="none"
            border="1px dashed"
            borderColor="brand.main"
            rounded="2xl"
            maxW="container.sm"
            w="100%"
          >
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.CloseTrigger />
            <Dialog.Body>
              <VStack gap={4} align="stretch">
                <Box>
                  {inputType === "date" ? (
                    <CustomDatePicker
                      label={label}
                      value={value}
                      onChange={onChangeValue}
                      width="100%"
                    />
                  ) : isLocationField ? (
                    <>
                      <Text fontSize="sm" fontWeight="semibold" mb={2}>
                        {label}
                      </Text>
                      <Box position="relative" ref={locationRef}>
                        <Flex
                          role="button"
                          tabIndex={0}
                          onClick={() => setIsLocationOpen((prev) => !prev)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              setIsLocationOpen((prev) => !prev);
                            }
                          }}
                          h="48px"
                          px={4}
                          align="center"
                          justify="space-between"
                          borderWidth="1px"
                          borderColor="whiteAlpha.300"
                          rounded="md"
                          bg="bg.primary"
                          color="text.primary"
                        >
                          <Text>{value}</Text>
                          <Text fontSize="sm" color="text.timer">
                            {isLocationOpen ? "▲" : "▼"}
                          </Text>
                        </Flex>

                        {isLocationOpen ? (
                          <Box
                            position="absolute"
                            top="calc(100% + 6px)"
                            left={0}
                            right={0}
                            zIndex={30}
                            borderWidth="1px"
                            borderColor="whiteAlpha.300"
                            rounded="md"
                            bg="bg.primary"
                            maxH="240px"
                            overflowY="auto"
                          >
                            {locationOptions.map((region) => (
                              <Box
                                key={region}
                                as="button"
                                type="button"
                                w="100%"
                                textAlign="left"
                                px={4}
                                py={3}
                                bg={value === region ? "whiteAlpha.200" : "transparent"}
                                _hover={{ bg: "whiteAlpha.100" }}
                                onClick={() => {
                                  onChangeValue?.(region);
                                  setIsLocationOpen(false);
                                }}
                              >
                                {region}
                              </Box>
                            ))}
                          </Box>
                        ) : null}
                      </Box>
                    </>
                  ) : (
                    <>
                    <Text fontSize="sm" fontWeight="semibold" mb={2}>
                      {label}
                    </Text>
                    <Input
                      ref={inputRef}
                      value={value}
                      onChange={(e) => onChangeValue?.(e.target.value)}
                    />
                  </>
                  )}
                </Box>
              </VStack>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="ghost" mr={3} rounded="xl">
                  {cancelText}
                </Button>
              </Dialog.ActionTrigger>
              <Button
                bg="brand.main"
                color="white"
                rounded="xl"
                onClick={onSave}
                _hover={{ bg: "brand.600" }}
              >
                {saveText}
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

export default EditFieldDrawer;
