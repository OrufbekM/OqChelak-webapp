import { Input, InputGroup } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import { useTranslation } from "react-i18next";

const SecondaryInput = ({
  placeholder,
  value,
  onChange,
  ...props
}) => {
  const { t } = useTranslation();
  const defaultPlaceholder = placeholder || t("common.search");
  return (
    <InputGroup
      bg="bg.input"
      borderRadius="full"
      mb="4"
      endElement={<LuSearch size={18} />}
      {...props}
    >
      <Input
        placeholder={defaultPlaceholder}
        bg="bg.input"
        border="1"
        borderRadius="16px"
        value={value}
        onChange={onChange}
        _focus={{ boxShadow: "none", borderColor: "brand.main" }}
        outline={"none"}
      />
    </InputGroup>
  );
};

export default SecondaryInput;
