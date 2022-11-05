import { FormControl, FormErrorMessage, FormLabel, Input, Select } from "@chakra-ui/react"
import { Field } from "formik"
import { AsYouType } from "libphonenumber-js";
import { ethers } from "ethers";
import * as yup from 'yup';
import PhoneNumberInput from "components/onboarding/PhoneNumberInput";
import { COUNTRIES } from "components/onboarding/countries";
import IdInput from "components/onboarding/IdInput";

export const formikWrappedInput = (
  name: string,
  friendlyName: string,
  disabled: boolean,
  styling?: {},
  label: boolean = false,
  showPlaceholder: boolean = true,
  placeholder: string = friendlyName,
  isRequired: boolean = true,
) => {
  return (
    <Field name={name} validate={isRequired ? (value) => !value ? `${friendlyName} is required` : undefined : null}>
      {formikFormControlInput(name, friendlyName, disabled, styling, label, showPlaceholder, placeholder, isRequired)}
    </Field>
  )
}

export const formikWrappedInputWalletAddress = (
  name: string,
  friendlyName: string,
  disabled: boolean,
  styling?: {},
  label: boolean = false,
  placeholder: string = friendlyName,
) => {
  return (
    <Field name={name} validate={async (value) => {
        if (!value) {
          return `${friendlyName} is required`;
        }
        if (!(ethers.utils.isAddress(value))) {
          return 'Invalid wallet address';
        }
      }}>
      {formikFormControlInput(name, friendlyName, disabled, styling, label, true, placeholder)}
    </Field>
  )
}

const countryOptions = COUNTRIES.map(({ name, iso }) => ({
  label: name,
  value: iso
}));
export const formikWrappedInputPhoneNumber = (
  name: string,
  friendlyName: string,
  disabled: boolean,
  styling?: {},
  label: boolean = false,
) => {
  return (
    <Field name={name} validate={(value) => {
      if (!value || value === '') {
        return `${friendlyName} is required`;
      }

      const asYouType = new AsYouType();
      asYouType.input(value);
      if (!asYouType.getNumber() || !asYouType.getNumber().isValid()) {
        return `Invalid phone number`;
      }
    }}>
    {({ field, form }) => (
      <FormControl {...styling} isInvalid={form.errors[name] && form.submitCount > 0} isRequired>
        {label ? <FormLabel>{friendlyName}</FormLabel> : <></>}
          <PhoneNumberInput
            options={countryOptions}
            isDisabled={disabled}
            isInvalid={form.errors[name] && form.submitCount > 0}
            {...field}
            onChange={(value) => form.setFieldValue(field.name, value)}
          />
        <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
      </FormControl>
    )}
    </Field>
  )
}
export const formikWrappedInputTaxId = (
  name: string,
  friendlyName: string,
  disabled: boolean,
  styling?: {},
  label: boolean = false,
) => {
  return (
    <Field name={name} validate={(data) => {
      if (!data || !data.taxId || data.taxId === '') {
        return `${friendlyName} is required`;
      }

      if (data.taxCountry === 'USA') {
        const regexes = [/^[1-9]\d?-\d{7}$/, /^\d{9}$/];
        if (regexes.map(regex => data.taxId.match(new RegExp(regex))).filter(match => match && match !== null).length === 0) {
          return 'Invalid USA Tax ID';
        }
      } else {
        // TODO: Tax id validation for non-US
      }
    }}>
    {({ field, form }) => (
      <FormControl {...styling} isInvalid={form.errors[name] && form.submitCount > 0} isRequired>
        {label ? <FormLabel>{friendlyName}</FormLabel> : <></>}
          <TaxNumberInput
            options={countryOptions}
            isDisabled={disabled}
            isInvalid={form.errors[name] && form.submitCount > 0}
            {...field}
            onChange={(value) => form.setFieldValue(field.name, value)}
          />
        <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
      </FormControl>
    )}
    </Field>
  )
}

const idOptions = [
  {
    label: 'SSN',
    value: 'ssn',
    placeholder: 'SSN'
  },
  {
    label: 'Passport',
    value: 'passport',
    placeholder: 'Passport Number'
  }
]
export const formikWrappedInputID = (
  name: string,
  friendlyName: string,
  disabled: boolean,
  styling?: {},
  label: boolean = false,
) => {
  return (
    <Field name={name} validate={(value) => {
      if (!value || !value.number) {
        return `${friendlyName} is required`;
      }

      if (value.idType === 'ssn') {
        const regexes = [/^\d{9}$/, /^\d{3}-\d{2}-\d{4}$/];
        if (regexes.map(regex => value.number.match(new RegExp(regex))).filter(match => match && match !== null).length === 0) {
          return 'Invalid SSN';
        }
      } else {
        // TODO: Passport number validation
      }
    }}>
    {({ field, form }) => (
      <FormControl {...styling} isInvalid={form.errors[name] && form.submitCount > 0} isRequired>
        {label ? <FormLabel>{friendlyName}</FormLabel> : <></>}
          <IdInput
            options={idOptions}
            isDisabled={disabled}
            isInvalid={form.errors[name] && form.submitCount > 0}
            {...field}
            onChange={(value) => form.setFieldValue(field.name, value)}
          />
        <FormErrorMessage pl="160px">{form.errors[name]}</FormErrorMessage>
      </FormControl>
    )}
    </Field>
  )
}

export const formikWrappedInputEmail = (
  name: string,
  friendlyName: string,
  disabled: boolean,
  styling?: {},
  label: boolean = false,
  placeholder?: string,
) => {
  return (
    <Field name={name} validate={async (value) => {
        if (!value) {
          return `${friendlyName} is required`;
        }
        if (!(await yup.string().email().isValid(value))) {
          return 'Invalid email';
        }
      }}>
      {formikFormControlInput(name, friendlyName, disabled, styling, label, true, placeholder)}
    </Field>
  )
}

export const formikWrappedInputDate = (
  name: string,
  friendlyName: string,
  disabled: boolean,
  styling?: {},
  label: boolean = false,
  placeholder?: string,
) => {
  return (
    <Field name={name} validate={async (value) => {
        if (!value) {
          return `${friendlyName} is required`;
        }
        const matchesDateRegex = value.match(/^\d{4}-\d{2}-\d{2}$/);
        const dateObj = new Date(value)
        if (!matchesDateRegex || !(dateObj instanceof Date) || isNaN(dateObj as any)) {
          return 'Invalid date format. Must of format YYYY-MM-DD';
        }
      }}>
      {formikFormControlInput(name, friendlyName, disabled, styling, label, true, placeholder)}
    </Field>
  )
}

export const formikWrappedSelect = (
  name: string,
  friendlyName: string,
  options: Item[],
  disabled: boolean,
  styling?: {},
  label: boolean = false,
  showPlaceholder: boolean = true,
  placeholder: string = `Select ${friendlyName}`,
) => {
  return (
    <Field name={name} validate={(value) => !value ? `${friendlyName} is required` : undefined}>
      {formikFormControlSelect(name, friendlyName, options, disabled, styling, label, showPlaceholder, placeholder)}
    </Field>
  )
}

export const formikWrappedInputRegex = (
  name: string,
  regexes: RegExp[],
  friendlyName: string,
  disabled: boolean,
  styling?: {},
  label: boolean = false,
  placeholder?: string,
) => {
  return (
    <Field name={name} validate={async (value) => {
        if (!value) {
          return `${friendlyName} is required`;
        }
        if (regexes.map(regex => value.match(new RegExp(regex))).filter(match => match && match !== null).length === 0) {
          return `Invalid ${friendlyName}`;
        }
      }}>
      {formikFormControlInput(name, friendlyName, disabled, styling, label, true, placeholder)}
    </Field>
  )
}

export const formikFormControlInput = (
  name: string,
  friendlyName: string,
  disabled: boolean,
  styling?: {},
  label: boolean = false,
  showPlaceholder: boolean = true,
  placeholder?: string,
  isRequired: boolean = true,
) => 
  ({ field, form }) => (
    <FormControl {...styling} isInvalid={form.errors[name] && form.submitCount > 0} isRequired={isRequired}>
      {label ? <FormLabel>{friendlyName}</FormLabel> : <></>}
      <Input
        isDisabled={disabled}
        isInvalid={form.errors[name] && form.submitCount > 0}
        placeholder={showPlaceholder ? placeholder : undefined}
        {...field}
      />
      <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
    </FormControl>
  );

export type Item = {
  label: string,
  value: string,
}
export const formikFormControlSelect = (
  name: string,
  friendlyName: string,
  options: Item[], 
  disabled: boolean,
  styling?: {},
  label: boolean = false,
  showPlaceholder: boolean = true,
  placeholder?: string
) => 
  ({ field, form }) => (
    <FormControl {...styling} isInvalid={form.errors[name] && form.submitCount > 0} isRequired>
      {label ? <FormLabel>{friendlyName}</FormLabel> : <></>}
      <Select
        bottom={0}
        value={field.value}
        placeholder={showPlaceholder ? placeholder : undefined}
        isInvalid={form.errors[name] && form.submitCount > 0}
        isDisabled={disabled}
        onChange={(e) => {form.setFieldValue(field.name, e.target.value)}}
      >
        {options.map(option => (
          <option value={option.value}>{option.label}</option>
        ))}
      </Select>
      <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
    </FormControl>
  )
