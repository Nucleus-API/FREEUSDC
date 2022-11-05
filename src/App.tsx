import "@fontsource/roboto-mono";

import {
  RainbowKitAuthenticationProvider,
  RainbowKitProvider,
  createAuthenticationAdapter,
  getDefaultWallets,
} from "@rainbow-me/rainbowkit";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";
import { WagmiConfig, chain, configureChains, createClient } from "wagmi";
import { Box, ChakraProvider, HStack, Image, SimpleGrid, Text, VStack, theme } from "@chakra-ui/react";
import { SiweMessage } from "siwe";
import * as Sentry from "@sentry/react";
import { useState } from "react";

import { CardInfo } from "./components/CardInfo";
import { TransactionHistory } from "./components/TransactionHistory";

const { chains, provider } = configureChains(
  [process.env.REACT_APP_STAGE === "dev" ? chain.goerli : chain.mainnet],
  [infuraProvider({ apiKey: process.env.REACT_APP_INFURA_KEY }), publicProvider()]
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
  const [unauthenticated, setUnauthenticated] = useState<boolean>(!localStorage.getItem("token"));
  document.body.style.backgroundColor = "#000000";

  // const postDisconnect = () => {
  //   if (location.pathname !== '/onboarding/dao/connect-multisig') {
  //     navigate("/login");
  //   }
  // }

  // const postConnect = async () => {
  //   const user = await UserService.me();
  //   if (location.pathname === '/login/dao') {
  //     navigate("/onboarding/dao");
  //   } else if (location.pathname === '/onboarding/dao/connect-multisig') {
  //     // Stay on page
  //   } else {
  //     // User has finished onboarding
  //     if (user && user.id && responseToOnboardingStatus(user.onboardingStatus) === OnboardingStatus.TERMS_AGREED){
  //       navigate("/");
  //     } else {
  //       navigate("/onboarding/user");
  //     }
  //   }
  // }

  const authenticationAdapter = createAuthenticationAdapter({
    getNonce: async () => {
      return process.env.REACT_APP_NONCE ? process.env.REACT_APP_NONCE : 'test';
    },
    createMessage({ nonce, address, chainId }) {
      Sentry.setTag("wallet_address", address);
      Sentry.setTag("chain_id", chainId);
      return new SiweMessage({
        domain: window.location.host,
        address,
        statement: "Sign in with Ethereum to Nucleus.",
        uri: window.location.origin,
        version: "1",
        chainId,
      });
    },
    getMessageBody: ({ message }: any) => {
      return message.prepareMessage();
    },
    verify: async ({ message, signature }) => {
      // const response = await EthereumLoginService.login(message, signature);
      // localStorage.setItem("token", response.access_token);
      setUnauthenticated(false);
      // postConnect();

      return true;
    },
    signOut: async () => {
      localStorage.removeItem("token");
      setUnauthenticated(true);
      // postDisconnect();
    },
  });

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitAuthenticationProvider
        adapter={authenticationAdapter}
        status={unauthenticated ? "unauthenticated" : "authenticated"}
      >
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
      </RainbowKitAuthenticationProvider>
    </WagmiConfig>
  );
};
