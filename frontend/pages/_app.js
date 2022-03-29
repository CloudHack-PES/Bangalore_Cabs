import { ChakraProvider } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import Nav from "../components/Nav";
import NextNProgress from "nextjs-progressbar";



function MyApp({ Component, pageProps }) {
  return(<ChakraProvider>
    <Flex flexDir="column">
    <NextNProgress color="#68D391" height={5} />
    <Nav />
    <Component {...pageProps}/>
    </Flex>
    </ChakraProvider> )
}

export default MyApp
