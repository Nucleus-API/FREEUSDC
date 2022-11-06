import "@fontsource/roboto-mono";

import { Box, HStack, Image, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { BankingService } from "services/BankingService";
import { CardInfo } from "./components/CardInfo";
import { TransactionHistory } from "./components/transactions/TransactionHistory";
import { useAccount } from "wagmi";

export const App = () => {
  document.body.style.backgroundColor = "#000000";

  const { address } = useAccount();

  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (address) {
      listCards();
    }

    // eslint-disable-next-line
  }, [address]);

  const listCards = async () => {
    const response = await BankingService.listCards(address);
    setCards(response);
  };

  return (
    <VStack bg="black" h="full" w="full" spacing={0}>
      <VStack bg="#0066FF" w="full" pt={1.5} pb={1.5}>
        <Text color="white" fontWeight="bold" fontSize={24} fontFamily="Roboto Mono" textAlign={"center"}>
          TEXT "FREEUSDC" TO 805-328-4736 TO BE NOTIFIED OF THE DROP
        </Text>
      </VStack>

      <HStack h="full" w="full" spacing={10} alignItems="flex-start">
        <Box h="calc(100vh)" w="19px" bg="#8526FE" />
        <Image src="./FREEUSDC.png" w={32} pt={2} pb={2} />

        <SimpleGrid columns={{ md: 1, lg: 2, xl: 2 }} spacing={10} w="full" flexGrow={1} pt={2.5} pr={10} pb={6}>
          <CardInfo cards={cards} />
          <TransactionHistory />
        </SimpleGrid>
      </HStack>
    </VStack>
  );
};
