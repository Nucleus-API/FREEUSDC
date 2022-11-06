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
    return <></>;
  }

  const card = cards[0];
  return (
    <VStack alignItems="flex-start" spacing={6}>
      <VStack
        w="303px"
        h="151px"
        bg="white"
        borderRadius={14}
        pl={6}
        pr={6}
        pt={6}
        pb={8}
        alignItems="flex-start"
        boxShadow="xl"
      >
        <Text fontWeight="bold" color="white" fontSize={16}>
          {card.label}
        </Text>
        <Spacer />
        <HStack w="full">
          <Text fontWeight="bold" color="white" fontSize={16}>
            **** **** **** {card.last4}
          </Text>
          <Spacer />
          <Text fontWeight="bold" color="white" fontSize={16}>
            {card.expiryMonth}/{card.expiryYear}
          </Text>
        </HStack>
      </VStack>

      {/* CARD DETAILS */}
      <VStack alignItems="flex-start" spacing={5}>
        <VStack alignItems="flex-start">
          <VStack alignItems={"flex-start"}>
            {cardToken && <VGSCardNumber showToken={cardToken.showToken} solidCardId={cardToken.id} />}
          </VStack>
        </VStack>

        <HStack spacing={7}>
          <VStack alignItems="flex-start">
            <Text fontWeight="bold" fontSize={16}>
              Expiration
            </Text>
            <Text fontWeight="bold" fontSize={22}>
              {card.expiryMonth}/{card.expiryYear}
            </Text>
          </VStack>

          <VStack alignItems="flex-start">
            <Text fontWeight="bold" fontSize={16}>
              CVV
            </Text>
            <VStack alignItems={"flex-start"}>
              {cardToken && <VGSCVV showToken={cardToken.showToken} solidCardId={cardToken.id} />}
            </VStack>
          </VStack>
        </HStack>
      </VStack>
    </VStack>
  );
};
