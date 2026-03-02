import React from "react";
import { CloseButton, Dialog, Portal, Text } from "@chakra-ui/react";
import PrimaryButton from "@/components/PrimaryButton";

function PrimaryModal({
  open,
  defaultOpen,
  onOpenChange,
  trigger,
  title = "Modal title",
  description,
  children,
  size = "md",
  placement = "center",
  closeOnInteractOutside = true,
  closeOnEscape = true,
  showCloseButton = true,
  primaryActionLabel,
  secondaryActionLabel,
  onPrimaryAction,
  onSecondaryAction,
  primaryActionProps,
  secondaryActionProps,
  contentProps,
}) {
  const hasFooterActions = primaryActionLabel || secondaryActionLabel;

  return (
    <Dialog.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={(details) => onOpenChange?.(details.open, details)}
      placement={placement}
      size={size}
      closeOnInteractOutside={closeOnInteractOutside}
      closeOnEscape={closeOnEscape}
    >
      {trigger ? <Dialog.Trigger asChild>{trigger}</Dialog.Trigger> : null}

      <Portal>
        <Dialog.Backdrop bg="blackAlpha.600" backdropFilter="blur(1px)" />
        <Dialog.Positioner>
          <Dialog.Content
            borderRadius="2xl"
            px={2}
            bg="bg.primary"
            boxShadow="2xl"
            {...contentProps}
          >
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body>
              {description ? (
                <Text color="text.timer" fontSize="sm" mb={children ? 4 : 0}>
                  {description}
                </Text>
              ) : null}
              {children}
            </Dialog.Body>

            {hasFooterActions ? (
              <Dialog.Footer>
                {secondaryActionLabel ? (
                  <PrimaryButton
                    width="auto"
                    maxW="none"
                    bg="transparent"
                    color="text.primary"
                    borderWidth="1px"
                    borderColor="gray.300"
                    _hover={{ bg: "bg.secondary" }}
                    onClick={onSecondaryAction}
                    {...secondaryActionProps}
                  >
                    {secondaryActionLabel}
                  </PrimaryButton>
                ) : null}
                {primaryActionLabel ? (
                  <PrimaryButton
                    width="auto"
                    maxW="none"
                    onClick={onPrimaryAction}
                    {...primaryActionProps}
                  >
                    {primaryActionLabel}
                  </PrimaryButton>
                ) : null}
              </Dialog.Footer>
            ) : null}

            {showCloseButton ? (
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            ) : null}
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

export default PrimaryModal;
