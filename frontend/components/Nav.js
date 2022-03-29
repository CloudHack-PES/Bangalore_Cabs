import React from "react";
import { Flex, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Nav() {
  const router=useRouter();
  return (
    <Flex px="2" py="1" justifyContent="center">
      <Heading style={{"cursor":"pointer"}} onClick={() => router.push("/")}>
        Blr
        <Text as={"span"} fontSize="lg" color={"green.400"}>
          {"   "}
          Cabs
        </Text>
      </Heading>
    </Flex>
  );
}