import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  IconButton,
  Popover,
  Portal,
  Text,
} from "@chakra-ui/react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

const WEEK_DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const toIso = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const parseIsoDate = (value) => {
  if (!value) return null;
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return null;
  const parsed = new Date(year, month - 1, day);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const isSameDay = (a, b) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const buildCalendarDays = (viewDate) => {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const startWeekday = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  const cells = [];

  for (let i = startWeekday - 1; i >= 0; i -= 1) {
    cells.push({
      date: new Date(year, month - 1, prevMonthDays - i),
      inCurrentMonth: false,
    });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push({ date: new Date(year, month, day), inCurrentMonth: true });
  }

  while (cells.length < 42) {
    const nextDay = cells.length - (startWeekday + daysInMonth) + 1;
    cells.push({
      date: new Date(year, month + 1, nextDay),
      inCurrentMonth: false,
    });
  }

  return cells;
};

const CustomDatePicker = ({
  label,
  onChange,
  value,
  placeholder = "Select date",
  ...boxProps
}) => {
  const initialDate = parseIsoDate(value) || new Date();
  const [viewDate, setViewDate] = useState(initialDate);

  const selectedDate = parseIsoDate(value);

  const calendarDays = useMemo(() => buildCalendarDays(viewDate), [viewDate]);

  const monthLabel = viewDate.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  const handleSelect = (date) => {
    onChange?.(toIso(date));
  };

  return (
    <Box w="100%" {...boxProps}>
      {label ? (
        <Text mb="2" fontSize="sm" fontWeight="semibold" color="text.primary">
          {label}
        </Text>
      ) : null}

      <Popover.Root positioning={{ placement: "bottom-start" }}>
        <Popover.Trigger asChild>
          <Button
            width="100%"
            justifyContent="space-between"
            bg="bg.input"
            color={selectedDate ? "text.primary" : "text.timer"}
            borderRadius="xl"
            border="1px solid"
            borderColor="gray.200"
            _hover={{ bg: "bg.secondary" }}
          >
            <Text>
              {selectedDate
                ? selectedDate.toLocaleDateString("en-GB")
                : placeholder}
            </Text>
            <CalendarDays size={16} />
          </Button>
        </Popover.Trigger>

        <Portal>
          <Popover.Positioner>
            <Popover.Content
              p="4"
              bg="bg.primary"
              borderRadius="2xl"
              border="1px solid"
              borderColor="gray.200"
              boxShadow="xl"
              width="19rem"
            >
              <Popover.Body p="0">
                <Flex align="center" justify="space-between" mb="4">
                  <Text fontWeight="bold" fontSize="md">
                    {monthLabel}
                  </Text>
                  <Flex gap="1">
                    <IconButton
                      aria-label="Previous month"
                      size="sm"
                      variant="ghost"
                      onClick={() =>
                        setViewDate(
                          (prev) =>
                            new Date(
                              prev.getFullYear(),
                              prev.getMonth() - 1,
                              1,
                            ),
                        )
                      }
                    >
                      <ChevronLeft size={16} />
                    </IconButton>
                    <IconButton
                      aria-label="Next month"
                      size="sm"
                      variant="ghost"
                      onClick={() =>
                        setViewDate(
                          (prev) =>
                            new Date(
                              prev.getFullYear(),
                              prev.getMonth() + 1,
                              1,
                            ),
                        )
                      }
                    >
                      <ChevronRight size={16} />
                    </IconButton>
                  </Flex>
                </Flex>

                <Grid templateColumns="repeat(7, 1fr)" gap="1" mb="2">
                  {WEEK_DAYS.map((day) => (
                    <Text
                      key={day}
                      textAlign="center"
                      fontSize="xs"
                      fontWeight="bold"
                      color="text.timer"
                    >
                      {day}
                    </Text>
                  ))}
                </Grid>

                <Grid templateColumns="repeat(7, 1fr)" gap="1">
                  {calendarDays.map(({ date, inCurrentMonth }) => {
                    const isSelected =
                      selectedDate && isSameDay(selectedDate, date);
                    const isToday = isSameDay(new Date(), date);

                    return (
                      <Button
                        key={date.toISOString()}
                        size="sm"
                        variant="ghost"
                        borderRadius="md"
                        fontWeight={
                          isSelected || isToday ? "semibold" : "normal"
                        }
                        color={inCurrentMonth ? "text.primary" : "text.timer"}
                        bg={isSelected ? "brand.main" : "transparent"}
                        _hover={{
                          bg: isSelected ? "brand.main" : "bg.secondary",
                        }}
                        onClick={() => handleSelect(date)}
                      >
                        {date.getDate()}
                      </Button>
                    );
                  })}
                </Grid>
              </Popover.Body>
            </Popover.Content>
          </Popover.Positioner>
        </Portal>
      </Popover.Root>
    </Box>
  );
};

export default CustomDatePicker;
