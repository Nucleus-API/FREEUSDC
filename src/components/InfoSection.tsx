import { useEffect, useState } from "react";
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
  GridItem,
  Flex,
  Button,
  useDisclosure,
} from "@chakra-ui/react"

export const InfoSection = () => {
  const { isOpen: isKycOpen, onOpen: onKycOpen, onClose: onKycClose } = useDisclosure();
  
  return (
    <Box border='2px solid white' borderRadius="10px" p='10px' h='100%'>
      <Flex flexDirection="column" h='100%'>
        <Box flexGrow={1}>
          <Box color='white' w='100%' h='100px'>
            TEST
          </Box>
          <Box color='white' w='100%' h='100px'>
            TEST
          </Box>
          <Box color='white' w='100%' h='100px'>
            TEST
          </Box>
        </Box>
        <Button colorScheme='teal' mb='20px' ml='40px' mr='40px' fontSize='1.75em' p='30px'>
          GET A CARD -&gt;
        </Button>
      </Flex>
    </Box>
  );
};
