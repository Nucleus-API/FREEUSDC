import { useEffect, useState } from "react";
import {
  Box,
  VStack,
  Text,
  Button,
  useDisclosure,
} from "@chakra-ui/react"
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { KycModal } from "./onboarding/KycModal";

export const CardInfo = () => {
  const { openConnectModal } = useConnectModal();
  console.log('openConnectModal: ', openConnectModal);
  const { isOpen: isKycOpen, onOpen: onKycOpen, onClose: onKycClose } = useDisclosure();

  const getCardClick = async () => {
    if (!openConnectModal) {
      onKycOpen();
    } else {
      openConnectModal();
    }
  }
  
  return (
    <VStack w="full" h="100%" borderColor="white" borderWidth={6} borderRadius={36} flexGrow={1}>
      <VStack w="full" h="full" alignItems="flex-start" spacing={12} pt={6} pb={6} pr={10} pl={10}>
      <Box flexGrow={1}>
        <Text fontFamily="Roboto Mono" fontWeight="bold" color="white" fontSize={32}>
          HUNDREDS OF CARDS, ONE WALLET: <br />
          SPEND IT IF YOU ARE FAST ENOUGH
        </Text>
        </Box>
        <Button onClick={() => getCardClick()} w='100%' colorScheme='teal' mb='20px' ml='40px' mr='40px' fontSize='1.75em' p='30px'>
          GET A CARD -&gt;
        </Button>
        {onKycOpen && <KycModal isOpen={isKycOpen} onOpen={onKycOpen} onClose={onKycClose} />}
      </VStack>
    </VStack>
  );
};
