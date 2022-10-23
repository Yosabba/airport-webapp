import {
  Text,
  Input,
  Flex,
  Button,
  Heading,
  FormControl,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { fetchFoodNearMe } from "../features/food-location/food-location-slice";
import { useRouter } from "next/router";

const GetUserLocation = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoading } = useSelector((state) => state.food);
  const [formData, setFormData] = useState({
    location: "",
  });

  const handleClick = async (e) => {
    e.preventDefault();

    if (formData.location === "") {
      return console.log("cannot be empty");
    }

    try {
      const response = await dispatch(fetchFoodNearMe(formData));
      unwrapResult(response);

      setFormData({
        location: "",
      });

      router.push("/food");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <Flex justify="center" wrap="wrap" direction="column" zIndex="999">
      <Heading as="h1" my="4rem" color="white" zIndex="90">
        Welcome to Airportly
      </Heading>

      <FormControl>
        <FormHelperText
          align="left"
          color="white"
          zIndex="20"
          textTransform="capitalize"
        >
          Enter your airport
        </FormHelperText>
        <Input
          maxLength="3"
          size="sm"
          type="text"
          placeholder="Ex: LAX"
          textTransform="uppercase"
          bg="white"
          zIndex="20"
          border="3px solid #F5f5f5"
          padding=".4rem"
          borderRadius="5px"
          variant="unstyled"
          my=".5rem"
          value={formData.location}
          onChange={handleChange}
          name="location"
          _placeholder={{ color: "gray.300" }}
          _focus={{
            padding: ".4rem",
            border: "3px solid #0078FF",
            transition: "all .4s ease-in-out",
            boxShadow: "lg",
          }}
        />
      </FormControl>

      <Button
        colorScheme="messenger"
        w={{
          mobile: "30vw",
          tablet: "10vw",
          laptop: "10vw",
          desktop: "10vw",
        }}
        mx="auto"
        my="3"
        _hover={{
          transition: "all .2s ease-in-out",
          transform: "scale(1.1)",
        }}
        isLoading={isLoading}
        loadingText="Searching"
        onClick={handleClick}
      >
        Search
      </Button>
    </Flex>
  );
};

export default GetUserLocation;
