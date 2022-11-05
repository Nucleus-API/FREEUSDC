import React, { useState } from "react";
import { AsYouType } from "libphonenumber-js";
import { getCountryTelCode } from "./countries";
import CountryInput from "./CountryInput";

export default function PhoneNumberInput({
  size,
  value,
  country,
  options,
  isDisabled,
  isInvalid,
  onChange,
  ...rest
}: any) {
  const initialCountry = "USA";
  let [selectedCountry, setSelectedCountry] = useState(country || initialCountry);

  const onCountryInputChange = data => {
    let code = getCountryTelCode(data.country);
    setSelectedCountry(data.country);
    let parsedNumber = new AsYouType().input(`${code}${data.value}`);
    onChange(parsedNumber);
  }

  return (
    <CountryInput
      size={size}
      options={options}
      initialCountry={initialCountry}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      onChange={onCountryInputChange}
      placeholder={`${selectedCountry} phone number`}
      {...rest}
    />
  )
}

PhoneNumberInput.defaultProps = {
  options: [],
  size: "md"
};
