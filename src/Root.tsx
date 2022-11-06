import "@fontsource/roboto-mono";

import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { WagmiConfig, chain, configureChains, createClient } from "wagmi";

import { App } from "App";
import { MobileNotSupportedWrapper } from "components/MobileNotSupportedWrapper";
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

export const Root = () => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} coolMode>
        <MobileNotSupportedWrapper>
          <App />
        </MobileNotSupportedWrapper>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};
