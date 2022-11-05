import "@fontsource/roboto-mono";

import { Box, ChakraProvider, Grid, GridItem, HStack, Image, SimpleGrid, Text, VStack, theme } from "@chakra-ui/react";
import { InfoSection } from "./components/InfoSection";

export const App = () => {
  document.body.style.backgroundColor = "#000000";

  return (
    <ChakraProvider theme={theme}>
      <VStack bg="black" h="full" w="full" spacing={0}>
        <VStack bg="#0066FF" w="full" pt={1.5} pb={1.5}>
          <Text color="white" fontWeight="bold" fontSize={24} fontFamily="Roboto Mono" textAlign={"center"}>
            TEXT "FREEUSDC" TO 805-328-4736 TO BE NOTIFIED OF THE DROP
          </Text>
        </VStack>

        <HStack h="full" w="full" spacing={10}>
          <Box h="calc(100vh)" w="19px" bg="#8526FE" />
          <Image src="./FREEUSDC.png" h="90vh" />

          <SimpleGrid columns={2} w="full" h="full" gap={10} pt={2.5} pr={10}>
            <GridItem minW="200px" h="100vh" bg="black" borderWidth={6} borderColor="white" borderRadius={36}>
              <InfoSection />
            </GridItem>
            <GridItem minW="200px" h="100vh" bg="black" borderWidth={6} borderColor="white" borderRadius={36} />
          </SimpleGrid>
        </HStack>
      </VStack>
    </ChakraProvider>
  );
};
