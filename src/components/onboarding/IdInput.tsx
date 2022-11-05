import React, { useState } from "react";
import {
  Box,
  Flex,
  Input,
  Select
} from "@chakra-ui/react";

export default function IdInput({
  size,
  value,
  options,
  isDisabled,
  isInvalid,
  onChange,
  ...rest
}: any) {
  let [number, setNumber] = useState(value || "");
  let [idType, setIdType] = useState("ssn");

  const onIdTypeChange = (e: any) => {
    let value = e.target.value;
    setIdType(value);
    onChange({
      idType: value,
      number,
    });
  };

  const onIdChange = (e: any) => {
    let value = e.target.value;
    setNumber(value);
    onChange({
      idType,
      number: value
    });
  };

  return (
    <Flex>
      <Box>
        <Select
          w="150px"
          bottom={0}
          value={idType}
          onChange={onIdTypeChange}
          borderColor='#E2E8F0'
          background='#E2E8F0'
          focusBorderColor="#E2E8F0.0"
          isInvalid={false}
          isDisabled={isDisabled}
        >
          {options.map((option: any) => (
              <option value={option.value}>{option.label}</option>
          ))}
        </Select>
      </Box>
      <Input
        {...rest}
        ml="10px"
        w="100%"
        placeholder={options.filter((option: any) => option.value === idType)[0].placeholder}
        size={size}
        type="tel"
        onChange={onIdChange}
        isDisabled={isDisabled}
        isInvalid={isInvalid}
      />
    </Flex>
  );
}

IdInput.defaultProps = {
  options: [],
  size: "md"
};
