import Head from "next/head";
import Image from "next/image";
import { Box, Heading, SimpleGrid, Flex, Button } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";
import FoodCard from "../Components/Food-Card";
import { motion as m } from "framer-motion";
import { fetchSingleFood } from "../features/food-location/food-location-slice";
import { unwrapResult } from "@reduxjs/toolkit";

export default function Home() {
  const dispatch = useDispatch();
  const { isLoading, isFetched, foodNearMe, airport } = useSelector(
    (state) => state.food
  );

  useEffect(() => {
    if (foodNearMe.length <= 0) {
      Router.push("/");
    }
  }, [foodNearMe]);

  const handleClick = async (id) => {
    try {
      const response = await dispatch(fetchSingleFood(id));
      unwrapResult(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <Head>
        <title>Airportly</title>
        <meta
          name="description"
          content="Find food in your airport terminal and get directions"
        />
        <meta
          name="viewport"
          content="width=device-width, minimum-scale=1.0, maximum-scale = 1.0, user-scalable = no"
        />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex
        direction={{ base: "row" }}
        justify="space-between"
        alignItems="center"
        mx="2rem"
        mr={{ mobile: "5rem" }}
      >
        <Link href="/">
          <Button
            size="xs"
            backgroundColor="white"
            _hover={{ backgroundColor: "white" }}
          >
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              width="1rem"
              style={{ marginRight: ".3rem" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              />
            </svg>
            Back
          </Button>
        </Link>

        <Heading textAlign="center" my="3rem">
          Food in {airport.toUpperCase()}
        </Heading>
        <Box></Box>
      </Flex>

      {isFetched && (
        <SimpleGrid
          columns={{ mobile: 1, tablet: 2, laptop: 2, desktop: 3, "2xl": 3 }}
          spacing={3}
          mx="1rem"
          pb="2rem"
        >
          {foodNearMe.map((food, index) => (
            <m.div
              key={food.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.3 }}
            >
              <Link href={`/${food.id}`}>
                <a onClick={() => handleClick(food.id)}>
                  <FoodCard food={food} />
                </a>
              </Link>
            </m.div>
          ))}
        </SimpleGrid>
      )}
    </main>
  );
}
