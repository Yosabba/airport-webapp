import {
  Box,
  Text,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Button,
  Heading,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { useEffect } from "react";

const GetUserLocation = () => {
  return (
    <Flex justify="center" wrap="wrap" direction="column" zIndex="999">
      <Heading as="h1" my="4rem" color="white" zIndex="90">
        Welcome to Airportly
      </Heading>
      <Text align="left" color="white" zIndex="20">
        Enter your airport
      </Text>
      <Input
        maxLength="3"
        size="sm"
        type="text"
        placeholder="Ex: LAX"
        textTransform="uppercase"
        bg="white"
        zIndex="20"
        borderColo="white"
        outline="none"
        _focus={{
          transition: "all 0.2s ease-in-out",
        }}
      />
      <Button
        colorScheme="messenger"
        w="10vw"
        mx="auto"
        my="3"
        _hover={{ transition: "all .2s ease-in-out", transform: "scale(1.1)" }}
      >
        Search
      </Button>
    </Flex>
  );
};

export default GetUserLocation;
