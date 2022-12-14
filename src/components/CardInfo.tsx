import { Alert, AlertIcon, Box, Button, HStack, Image, Text, VStack, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { BankingService } from "../services/BankingService";
import { Card } from "./Card";
import { KycModal } from "./onboarding/KycModal";
import { useAccount } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";

type CardInfoProps = {
  cards: any[];
};

export const CardInfo = (props: CardInfoProps) => {
  const { isConnected, address } = useAccount();
  const [kycStatus, setKycStatus] = useState<string | undefined>(undefined);
  const { openConnectModal } = useConnectModal();
  const [justConnected, setJustConnected] = useState<boolean | undefined>(false);

  const { isOpen: isKycOpen, onOpen: onKycOpen, onClose: onKycClose } = useDisclosure();

  const getCardClick = async () => {
    if (isConnected) {
      if (kycStatus === "notStarted") {
        onKycOpen();
      }
    } else {
      openConnectModal!();
      setJustConnected(true);
    }
  };

  useEffect(() => {
    if (address) {
      fetchKycStatus(address).then((status) => {
        setKycStatus(status);
      });
    }
  }, [address]);

  const fetchKycStatus = async (walletAddress: string) => {
    const response = await BankingService.kycStatus(walletAddress);
    return response.status;
  };

  useEffect(() => {
    if (isConnected && justConnected && kycStatus === "notStarted") {
      onKycOpen();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, justConnected, kycStatus]);

  return (
    <VStack w="full" h="100%" borderColor="white" borderWidth={6} borderRadius={36} flexGrow={1}>
      <VStack w="full" h="full" alignItems="flex-start" spacing={6} pt={6} pb={6} pr={10} pl={10}>
        <Box>
          <Text fontFamily="Roboto Mono" fontWeight="bold" color="white" fontSize={26}>
            HUNDREDS OF CARDS, ONE WALLET: <br />
            SPEND IT IF YOU'RE FAST ENOUGH
          </Text>
        </Box>

        <Text fontWeight="bold" fontSize={20} color="white" flexGrow={1}>
          FreeUSDC is a{" "}
          <a
            href="https://etherscan.io/address/0x00a625febc1b7e8aa2b267d906de0b3a1a2f8be8"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#00D1FF",
              fontWeight: "bold",
              textDecoration: "underline",
            }}
          >
            shared wallet
          </a>
          . USDC is deposited at random times.
          <br />
          All cards are connected to the same wallet. Race to spend it before others.
        </Text>

        <Card cards={props.cards} />

        {props.cards.length === 0 ? (
          <VStack spacing={4} alignItems="flex-start">
            <HStack spacing={8}>
              <Image src="./01x.png" w={20}></Image>
              <Text fontFamily="Roboto Mono" fontSize={40} fontWeight="bold" color="white">
                GET A CARD
              </Text>
            </HStack>

            <HStack spacing={8}>
              <Image src="./0x2.png" w={20}></Image>
              <Text fontFamily="Roboto Mono" fontSize={40} fontWeight="bold" color="white">
                WAIT FOR THE DROP
              </Text>
            </HStack>

            <HStack spacing={8}>
              <Image src="./0x3.png" w={20}></Image>
              <Text fontFamily="Roboto Mono" fontSize={40} fontWeight="bold" color="white">
                SPEND THE MONEY
              </Text>
            </HStack>
          </VStack>
        ) : (
          <VStack spacing={4} alignItems="flex-start">
            <HStack spacing={8}>
              <VStack alignItems="flex-start">
                <Text fontFamily="Roboto Mono" fontSize={26} fontWeight="bold" color="white">
                  FIRST DROP:
                </Text>
                <Text fontFamily="Roboto Mono" fontSize={26} fontWeight="bold" color="#24FF00">
                  TOMORROW 11/06
                </Text>
                <Text fontFamily="Roboto Mono" fontSize={26} fontWeight="bold" color="white">
                  GET READY ETHSF!
                </Text>
              </VStack>
            </HStack>
          </VStack>
        )}

        {(kycStatus === "inReview" || props.cards.length === 0) && isConnected && (
          <Alert status="success" variant="subtle" borderRadius="10px">
            <AlertIcon />
            <strong>Submitted! Refresh this page in a few minutes to see your card.</strong>
          </Alert>
        )}

        {!isConnected && (
          <Button
            onClick={() => getCardClick()}
            fontFamily="Roboto Mono"
            w="100%"
            bg="#8526FE"
            mb="20px"
            ml="40px"
            mr="40px"
            fontSize="1.75em"
            p="30px"
            color="white"
            _hover={{
              bg: "#9D53FB",
            }}
          >
            GET A CARD -&gt;
          </Button>
        )}
        {onKycOpen && <KycModal isOpen={isKycOpen} onOpen={onKycOpen} onClose={onKycClose} />}
      </VStack>
    </VStack>
  );
};
