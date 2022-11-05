import "@fontsource/roboto-mono";

import { Text, VStack } from "@chakra-ui/react";

export const TransactionHistory = () => {
  return (
    <VStack w="full" h="100%" borderColor="white" borderWidth={6} borderRadius={36} flexGrow={1}>
      <VStack w="full" h="full" alignItems="flex-start" spacing={12} pt={6} pb={6} pr={10} pl={10}>
        <Text fontFamily="Roboto Mono" fontWeight="bold" color="white" fontSize={32}>
          TRANSACTION HISTORY
        </Text>
      </VStack>
    </VStack>
  );
};
