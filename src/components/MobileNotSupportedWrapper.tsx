import "@fontsource/roboto-mono";

import { Show, Text, VStack } from "@chakra-ui/react";

export const MobileNotSupportedWrapper = ({ children }) => {
  return (
    <>
      <Show above="md">{children}</Show>
      <Show below="md">
        <MobileNotSupported />
      </Show>
    </>
  );
};

const MobileNotSupported = () => {
  return (
    <VStack w="100vw" h="100vh" bg="black" justifyContent="center" alignItems="center" p={3}>
      <Text fontSize={28} fontWeight="bold" color="white" fontFamily="Roboto Mono" textAlign="center">
        #FREEUSDC
      </Text>
      <Text fontSize={28} fontWeight="bold" color="white" fontFamily="Roboto Mono" textAlign="center">
        MOBILE IS NOT SUPPORTED. VISIT US ON DESKTOP INSTEAD.
      </Text>
    </VStack>
  );
};
