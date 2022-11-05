import React, { useState } from "react";
import {
  Box,
  Flex,
  Input,
  Select,
  InputGroup,
  InputLeftElement
} from "@chakra-ui/react";
// @ts-ignore
import Flag from "react-world-flags";

export default function CountryInput({
  size,
  initialValue = "",
  initialCountry = "USA",
  options,
  isDisabled,
  isInvalid,
  onChange,
  placeholder,
  ...rest
}: any) {
  let [value, setValue] = useState(initialValue);
  let [country, setCountry] = useState(initialCountry);

  const onCountryChange = (e: any) => {
    let data = e.target.value;

    setCountry(data);
    onChange({
      country: data,
      value,
    });
  };

  const onValueChange = (e: any) => {
    let data = e.target.value;

    setValue(data);
    onChange({
      country,
      value: data,
    });
  };

  return (
    <InputGroup size={size} {...rest}>
      <InputLeftElement width="4rem" ml="10px">
        <Flex>
          <Flex
            width="calc(100% - 1.75rem)"
            height="100%"
            alignItems="center"
            pos="absolute"
          >
            {country && (
              <Box mr="4px" width="100%" flex={1}>
                <Flag height="1rem" code={country || ""} />
              </Box>
            )}
          </Flex>
          <Select
            bottom={0}
            opacity={0}
            value={country}
            onChange={onCountryChange}
          >
            {options.map((option: any) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </Select>
        </Flex>
      </InputLeftElement>
      <Input
        {...rest}
        pl="4rem"
        onChange={onValueChange}
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        placeholder={placeholder}
      />
    </InputGroup>
  );
}

CountryInput.defaultProps = {
  options: [],
  size: "md"
};
