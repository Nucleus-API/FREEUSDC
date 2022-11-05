import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Button,
  useDisclosure,
} from "@chakra-ui/react"
import { KycModal } from "./onboarding/KycModal";

export const InfoSection = () => {
  const { isOpen: isKycOpen, onOpen: onKycOpen, onClose: onKycClose } = useDisclosure();
  
  return (
    <Box p='20px' h='100%'>
      <Flex flexDirection="column" h='100%'>
        <Box flexGrow={1}>
          <Box color='white' w='100%' h='100px'>
            TEST
          </Box>
        </Box>
        <Button onClick={() => onKycOpen()} colorScheme='teal' mb='20px' ml='40px' mr='40px' fontSize='1.75em' p='30px'>
          GET A CARD -&gt;
        </Button>
      </Flex>
      {isKycOpen && <KycModal isOpen={isKycOpen} onOpen={onKycOpen} onClose={onKycClose} />}
    </Box>
  );
};
