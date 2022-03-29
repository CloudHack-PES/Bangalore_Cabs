import {
    Flex,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Box,
    Button,
    Center,
    InputLeftElement,
    InputGroup,
  } from "@chakra-ui/react";
  import { useFormik } from "formik";
  import * as Yup from "yup";
  import { useRouter } from "next/router";

  import {AiOutlineCar, AiOutlineUser} from "react-icons/ai";
  import {MdOutlineChair, MdOutlineLocationOn} from "react-icons/md";
  
  export const PostSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Too Short!')
    .max(50, 'Too Long!').required("* Required"),
    pickup: Yup.string().required("* Required"),
    seats: Yup.number().min(1,'Atleast 1 person should come naa').max(4,'No more than 4 seats in car').required("* Required"),
    destination: Yup.string().required("* Required"),
  });
  
  export default function PostForm() {
    const router = useRouter();
    const formik = useFormik({
      initialValues: { name: "", seats: "", destination: "", pickup: "" },
      onSubmit: async (values, { setSubmitting, resetForm }) => {
        const data = await fetch("http://localhost:6969/new_ride", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }).then((res) => res.json());
  
        setSubmitting(false);
  
        if (data?.name) {
          resetForm();
          router.push("/message");
        }
      },
      validationSchema: PostSchema,
      validateOnBlur: true,
    });
  
    return (
      <Flex flexDir="column" w="100vw" alignItems={"center"}>
        <Box
          mx="25 "
          my="2"
          px="10"
          py="10"
          w={["90vw", "100vw", "40vw"]}
          rounded="lg"
          shadow={"lg"}
          justifyContent={"center"}
          bg="gray.50"
        >
          <form onSubmit={formik.handleSubmit}>
            <FormControl
              mb="4"
              id="name"
              isInvalid={formik.touched?.name && formik?.errors?.name}
            >
              <Box display={"inline-block"}>
                <FormLabel display={"inline"}>Name</FormLabel>
                <FormErrorMessage display={"inline"} fontSize="xs">
                  {formik.touched?.name && formik?.errors?.name}
                </FormErrorMessage>
              </Box>
              <InputGroup>
                <InputLeftElement children={<AiOutlineUser size={20} color='gray'/>} />
              <Input
                onBlur={formik.handleBlur}
                value={formik.values.name}
                onChange={formik.handleChange}
                type="name"
                focusBorderColor="green.300"
              />
                </InputGroup>
            </FormControl>
  
            <FormControl
              mb="4"
              id="pickup"
              isInvalid={formik.touched?.pickup && formik?.errors?.pickup}
            >
              <Box display={"inline-block"}>
                <FormLabel display={"inline"}>Pickup</FormLabel>
                <FormErrorMessage display={"inline"} fontSize="xs">
                  {formik.touched?.pickup && formik?.errors?.pickup}
                </FormErrorMessage>
              </Box>
              <InputGroup>
                <InputLeftElement children={<AiOutlineCar size={19} color='gray'/>} />
                <Input
                  onBlur={formik.handleBlur}
                  value={formik.values.pickup}
                  onChange={formik.handleChange}
                  type="Pickup"
                  focusBorderColor="green.300"
                />
              </InputGroup>
            </FormControl>
  
            <FormControl
              mb="4"
              id="seats"
              isInvalid={formik.touched?.seats && formik?.errors?.seats}
            >
              <Box display={"inline-block"}>
                <FormLabel display={"inline"}>Seats</FormLabel>
                <FormErrorMessage display={"inline"} fontSize="xs">
                  {formik.touched?.seats && formik?.errors?.seats}
                </FormErrorMessage>
              </Box>
              <InputGroup>
              <InputLeftElement children={<MdOutlineChair size={19} color='gray'/>} />
              <Input
                onBlur={formik.handleBlur}
                value={formik.values.seats}
                onChange={formik.handleChange}
                type="seats"
                focusBorderColor="green.300"
              />
            </InputGroup>
            </FormControl>
  
            <FormControl
              mb="4"
              id="destination"
              isInvalid={formik.touched?.destination && formik?.errors?.destination}
            >
              <Box display={"inline-block"}>
                <FormLabel display={"inline"}>Destination</FormLabel>
                <FormErrorMessage display={"inline"} fontSize="xs">
                  {formik.touched?.destination && formik?.errors?.destination}
                </FormErrorMessage>
              </Box>
              <InputGroup>
              <InputLeftElement children={< MdOutlineLocationOn size={19} color='gray'/>} />
                <Input
                  onBlur={formik.handleBlur}
                  value={formik.values.destination}
                  onChange={formik.handleChange}
                  type="destination"
                  focusBorderColor="green.300"
                />
              </InputGroup>
            </FormControl>
  
            <Center>
              <Button
                isLoading={formik.isSubmitting}
                type="submit"
                color="white"
                bgColor="green.300"
                colorScheme={"green"}
                loadingText="Submitting"
                mt="4"
              >
                Submit
              </Button>
            </Center>
          </form>
        </Box>
      </Flex>
    );
  }