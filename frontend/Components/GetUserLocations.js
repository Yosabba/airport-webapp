import {
  Box,
  Text,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Button,
} from "@chakra-ui/react";
import React, { useEffect } from "react";

const GetUserLocation = () => {
  return (
    <Flex justify="center" wrap="wrap">
      <Text>Enter your airport</Text>
      <Input
        maxLength="3"
        size="sm"
        type="text"
        placeholder="Ex: LAX"
        textTransform="uppercase"
      />
      <Button bg="green.400" mt="1rem">
        Search
      </Button>
    </Flex>
  );
};

export default GetUserLocation;
