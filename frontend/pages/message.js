import { Heading ,Text} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'

function message() {
  const router = useRouter()
  return (
    <Heading m={["15vw","15vw","17vw"]}>Your ride has been registered and our driver will reach out to you.... mean while
    <Text as={"span"} fontSize="2xl" color={"green.400"} style={{"cursor":"pointer"}} onClick={() => router.push("/about")}> Checkout The Datatbase</Text>
    </Heading>
  )
}

export default message