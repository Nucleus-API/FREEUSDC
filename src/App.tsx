import "@fontsource/roboto-mono";

import { Box, ChakraProvider, HStack, Image, SimpleGrid, Text, VStack, theme } from "@chakra-ui/react";
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { WagmiConfig, chain, configureChains, createClient } from "wagmi";

import { CardInfo } from "./components/CardInfo";
import { TransactionHistory } from "./components/transactions/TransactionHistory";
import { infuraProvider } from "wagmi/providers/infura";

const { chains, provider } = configureChains(
  [process.env.REACT_APP_STAGE === "dev" ? chain.goerli : chain.mainnet],
  [infuraProvider({ apiKey: process.env.REACT_APP_INFURA_KEY })]
);
const { connectors } = getDefaultWallets({
  appName: "Nucleus",
  chains,
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export const App = () => {
  document.body.style.backgroundColor = "#000000";

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} coolMode>
        <ChakraProvider theme={theme}>
          <VStack bg="black" h="full" w="full" spacing={0}>
            <VStack bg="#0066FF" w="full" pt={1.5} pb={1.5}>
              <Text color="white" fontWeight="bold" fontSize={24} fontFamily="Roboto Mono" textAlign={"center"}>
                TEXT "FREEUSDC" TO 805-328-4736 TO BE NOTIFIED OF THE DROP
              </Text>
            </VStack>

            <HStack h="full" w="full" spacing={10} alignItems="flex-start">
              <Box h="calc(100vh)" w="19px" bg="#8526FE" />
              <Image src="./FREEUSDC.png" h="100vh" pt={2} pb={2} />

              <SimpleGrid columns={{ md: 1, lg: 2, xl: 2 }} spacing={10} w="full" h="100vh" pt={2.5} pr={10} pb={6}>
                <CardInfo />
                <TransactionHistory />
              </SimpleGrid>
            </HStack>
          </VStack>
        </ChakraProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};
