import * as amplitude from "@amplitude/analytics-browser";

import {
  Alert,
  AlertIcon,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import {
  formikWrappedInput,
  formikWrappedInputDate,
  formikWrappedInputEmail,
  formikWrappedInputID,
  formikWrappedInputPhoneNumber,
  formikWrappedSelect,
} from "../../utils/formikHelperComponents";

import { BankingService } from "../../services/BankingService";
import { COUNTRIES } from "./countries";
import { TreasuryButton } from "../TreasuryButton";
import { useAccount } from "wagmi";
import { useEffect } from "react";

interface KycModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const KycModal = ({ isOpen, onOpen, onClose }: KycModalProps) => {
  const { address } = useAccount();

  // iso2 is what iban uses that Solid requires: https://www.iban.com/country-codes
  const countryOptions = COUNTRIES.map(({ name, iso2 }: any) => ({
    label: name,
    value: iso2,
  }));

  useEffect(() => {
    if (isOpen) {
      amplitude.track("KYC Modal Open");
    }

    // eslint-disable-next-line
  }, [isOpen]);

  // Hacky
  function timeout(ms: any) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  const submit = async (values: any) => {
    await BankingService.createPerson(address, {
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
      email: values.email,
      dateOfBirth: values.dateOfBirth,
      idNumber: values.idNumber,
      idType: values.idType,
      address: {
        addressType: "mailing",
        line1: values.line1,
        line2: "",
        city: values.city,
        state: values.state && values.state !== "" ? values.state : values.city, // Default to city if state not present
        country: values.country,
        postalCode: values.postalCode,
      },
    });
    await timeout(2000);
    window.location.reload();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
      }}
      size="6xl"
    >
      <ModalOverlay />
      <ModalContent>
        <Formik
          initialValues={{}}
          onSubmit={async (values: any, actions) => {
            const parsedNumber = `+${values.phone.replace(/\D/g, "")}`;
            await submit({
              ...values,
              phone: parsedNumber,
              idType: values.id.idType,
              idNumber: values.id.number.replaceAll("-", ""),
            });
            actions.setSubmitting(false);
          }}
        >
          {(props) => (
            // Add noValidate to disable default HTML5 validation
            <Form noValidate>
              <ModalHeader>Complete your Profile</ModalHeader>
              <ModalBody>
                <VStack w="full" alignItems="flex-start" spacing={3}>
                  <Alert status="info">
                    <AlertIcon />
                    <Text fontWeight="600" fontSize="14">
                      Our bank partner is mandated by federal law (USA PATRIOT ACT) to collect this information. This
                      information is never saved with Nucleus. It is only used to verify your identity and will not
                      affect your credit score.
                    </Text>
                  </Alert>

                  <Flex w="full" gap="10px">
                    {formikWrappedInput("firstName", "First Name", props.isSubmitting, {}, true, false)}
                    {formikWrappedInput("lastName", "Last Name", props.isSubmitting, {}, true, false)}
                  </Flex>
                  <Flex w="full" gap="10px">
                    {formikWrappedInputPhoneNumber("phone", "Phone Number", props.isSubmitting, {}, true)}
                    {formikWrappedInputEmail("email", "Email", props.isSubmitting, {}, true, "test@example.com")}
                  </Flex>
                  <Flex w="full" gap="10px">
                    {formikWrappedInputDate("dateOfBirth", "Date of Birth", props.isSubmitting, {}, true, "1980-01-30")}
                    {formikWrappedInputID("id", "ID Number", props.isSubmitting, {}, true)}
                  </Flex>
                  <HStack w="full" gap="10px">
                    {formikWrappedInput("line1", "Address", props.isSubmitting, { width: "67%" }, true, false)}
                    {formikWrappedInput(
                      "city",
                      "City",
                      props.isSubmitting,
                      { marginLeft: "0 !important", width: "33%" },
                      true,
                      false
                    )}
                  </HStack>
                  <Flex w="full" gap="10px">
                    {formikWrappedInput(
                      "state",
                      "State/Province",
                      props.isSubmitting,
                      {},
                      true,
                      false,
                      "State/Province",
                      false
                    )}
                    {formikWrappedInput("postalCode", "Zip Code", props.isSubmitting, {}, true)}
                    {formikWrappedSelect("country", "Country", countryOptions, props.isSubmitting, {}, true, true)}
                  </Flex>
                </VStack>
              </ModalBody>
              <ModalFooter>
                <TreasuryButton type="submit" title="Submit" w="fit" isLoading={props.isSubmitting} />
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
};
