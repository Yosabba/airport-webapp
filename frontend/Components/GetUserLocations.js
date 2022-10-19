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
import { useDispatch, useSelector } from "react-redux";
import { getLocation } from "../redux/actions/getLocation";

const GetUserLocation = () => {
  
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.isLoading);

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
      <Button onClick={() => dispatch(getLocation())} bg="green.400" mt="1rem">
        Search
      </Button>
    </Flex>
  );
};

export default GetUserLocation;
