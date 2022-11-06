import "@fontsource/montserrat/700.css";

import { HStack, Spacer, Text, VStack } from "@chakra-ui/react";

import { BankingService } from "services/BankingService";
import { VGSCVV } from "components/VGSCVV";
import { VGSCardNumber } from "components/VGSCardNumber";
import { useAccount } from "wagmi";
import { useEffect } from "react";
import { useState } from "react";

type CardProps = {
  cards: any[];
};

export const Card = (props: CardProps) => {
  const { address } = useAccount();
  const { cards } = props;
  const [cardToken, setCardToken] = useState<any>();

  useEffect(() => {
    if (cards.length !== 0) {
      fetchCardToken();
    }

    // eslint-disable-next-line
  }, [cards]);

  const fetchCardToken = async () => {
    const response = await BankingService.createCardToken(address);
    setCardToken(response);
  };

  if (cards && cards.length === 0) {
    return (
      <VStack>
        <Text>No card state</Text>
      </VStack>
    );
  }

  const card = cards[0];
  return (
    <VStack alignItems="flex-start" spacing={6}>
      <VStack
        w="500px"
        h="270px"
        bg="white"
        borderRadius={14}
        pl={6}
        pr={6}
        pt={6}
        pb={8}
        alignItems="flex-start"
        boxShadow="xl"
      >

        <HStack w="full">
          <Text fontWeight="bold" color="black" fontSize={16}>
            {card.label}
          </Text>
          <Spacer />
          <VStack alignItems="flex-end" spacing={5}>
            <Text fontWeight="bold" color="black" fontSize={16}>
              #FREEUSDC
            </Text>
            <Text fontWeight="bold" color="black" fontSize={16}>
              $100 max per transaction
            </Text>
          </VStack>



        </HStack>

        <Spacer />
        <HStack w="full" alignItems="flex-end">
          <VStack alignItems="flex-start">
            <Text color="gray" fontSize={14}>
              CVV:
            </Text>
            <Text fontWeight="bold" color="black" fontSize={16}>
              {cardToken && <VGSCVV showToken={cardToken.showToken} solidCardId={cardToken.id} />}
            </Text>
          </VStack>
        </HStack>

        <HStack w="full">
          <VStack alignItems="flex-start">
            <Text color="gray" fontSize={14}>
              Card Number:
            </Text>
            <Text fontWeight="bold" color="black" fontSize={16}>
              {cardToken && <VGSCardNumber showToken={cardToken.showToken} solidCardId={cardToken.id} />}
            </Text>
          </VStack>

          <Spacer />
          <VStack>
            <Text w="full" color="gray" fontSize={14}>
              Card Expiry:
            </Text>
            <Text fontWeight="bold" color="black" fontSize={16}>
              {card.expiryMonth}/{card.expiryYear}
            </Text>

          </VStack>

        </HStack>
      </VStack>


    </VStack>
  );
};
