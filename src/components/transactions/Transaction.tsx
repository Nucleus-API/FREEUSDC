import { Divider, HStack, Spacer, Text, VStack } from "@chakra-ui/react";

export const Transaction = () => {
  return (
    <VStack w="full" spacing={8}>
      <HStack w="full">
        <VStack alignItems="flex-start" spacing={3.5}>
          <Text fontWeight="bold" fontSize={24} color="white">
            Amazon
          </Text>
          <Text fontWeight="bold" fontSize={24} color="red">
            -$44.15
          </Text>
        </VStack>

        <Spacer />

        <VStack alignItems="flex-end" spacing={3.5}>
          <Text fontWeight="bold" fontSize={24} color="white">
            11/06/2022
          </Text>
          <Text fontWeight="bold" fontSize={24} color="white">
            3:22PM
          </Text>
        </VStack>
      </HStack>

      <Divider color="white" bg="white" borderColor="white" />
    </VStack>
  );
};
