import React from "react";
import { Flex, Heading, Text } from "@chakra-ui/react";

export default function Nav() {
  return (
    <Flex px="2" py="1" justifyContent="center">
      <Heading>
        Bengaluru
        <Text as={"span"} fontSize="lg" color={"green.400"}>
          {"   "}
          Cabs
        </Text>
      </Heading>
    </Flex>
  );
}