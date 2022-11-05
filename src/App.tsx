import * as React from "react"
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
  GridItem,
} from "@chakra-ui/react"

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box backgroundColor='black' h='100vh'>
      <Grid
        templateColumns='200px 4fr 4fr'
        templateAreas={`"logo card transactions"`}
      >
        <GridItem minW='200px' h='100vh' bg='white' area={'logo'} />
        <GridItem minW='200px' h='100vh' bg='tomato' area={'card'} />
        <GridItem minW='200px' h='100vh' bg='papayawhip' area={'transactions'}/>
      </Grid>
    </Box>
  </ChakraProvider>
)
