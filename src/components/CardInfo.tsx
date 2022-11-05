import { Box, Button, HStack, Image, Text, VStack, useDisclosure } from "@chakra-ui/react";

import { KycModal } from "./onboarding/KycModal";

export const CardInfo = () => {
  const { isOpen: isKycOpen, onOpen: onKycOpen, onClose: onKycClose } = useDisclosure();

  return (
    <VStack w="full" h="100%" borderColor="white" borderWidth={6} borderRadius={36} flexGrow={1}>
      <VStack w="full" h="full" alignItems="flex-start" spacing={12} pt={6} pb={6} pr={10} pl={10}>
        <Box>
          <Text fontFamily="Roboto Mono" fontWeight="bold" color="white" fontSize={32}>
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
          . USDC is deposited at random times. <br />
          <br />
          All cards are connected to the same wallet. Race to spend it before others.
        </Text>

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

        <Button
          onClick={() => onKycOpen()}
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
        {isKycOpen && <KycModal isOpen={isKycOpen} onOpen={onKycOpen} onClose={onKycClose} />}
      </VStack>
    </VStack>
  );
};
