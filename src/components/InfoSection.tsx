import { useEffect, useState } from "react";
import {
  Box,
  VStack,
  Text,
  Button,
  useDisclosure,
} from "@chakra-ui/react"
import { KycModal } from "./onboarding/KycModal";

export const InfoSection = () => {
  const { isOpen: isKycOpen, onOpen: onKycOpen, onClose: onKycClose } = useDisclosure();
  
  return (
    <VStack w="full" h="100%" borderColor="white" borderWidth={6} borderRadius={36} flexGrow={1}>
      <VStack w="full" h="full" alignItems="flex-start" spacing={12} pt={6} pb={6} pr={10} pl={10}>
      <Box flexGrow={1}>
        <Text fontFamily="Roboto Mono" fontWeight="bold" color="white" fontSize={32}>
          HUNDREDS OF CARDS, ONE WALLET: <br />
          SPEND IT IF YOU ARE FAST ENOUGH
        </Text>
        </Box>
        <Button onClick={() => onKycOpen()} w='100%' colorScheme='teal' mb='20px' ml='40px' mr='40px' fontSize='1.75em' p='30px'>
          GET A CARD -&gt;
        </Button>
      </VStack>
    </VStack>
    // <Box p='20px' h='100%'>
    //   <Flex flexDirection="column" h='100%'>
    //     <Box flexGrow={1}>
    //       <Box color='white' w='100%' h='100px'>
    //         TEST
    //       </Box>
    //     </Box>
    //     <Button onClick={() => onKycOpen()} colorScheme='teal' mb='20px' ml='40px' mr='40px' fontSize='1.75em' p='30px'>
    //       GET A CARD -&gt;
    //     </Button>
    //   </Flex>
    //   {isKycOpen && <KycModal isOpen={isKycOpen} onOpen={onKycOpen} onClose={onKycClose} />}
    // </Box>
  );
};
