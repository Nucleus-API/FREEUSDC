import * as React from "react"
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
  GridItem,
} from "@chakra-ui/react"
import { InfoSection } from "./components/InfoSection"

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box backgroundColor='black' h='100vh'>
      <Grid
        templateColumns='300px 1fr 1fr'
        templateAreas={`"logo card transactions"`}
      >
        <GridItem minW='200px' p='20px' h='100vh' area={'logo'}>

        </GridItem>
        <GridItem minW='200px' p='20px' h='100vh' area={'card'}>
          <InfoSection />
        </GridItem>
        <GridItem minW='200px' p='20px' h='100vh' area={'transactions'}>
          <InfoSection />
        </GridItem>
      </Grid>
    </Box>
  </ChakraProvider>
)
