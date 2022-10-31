import Head from "next/head";
import Image from "next/image";
import { Box, Heading, SimpleGrid, Flex, Text } from "@chakra-ui/react";
import BusinessDetails from "../../Components/Food-Details";
import { useSelector } from "react-redux";
export default function Details() {
  const { businessDetails } = useSelector((state) => state.food);
  return (
    <main>
      <Head>
        <title>Airportly</title>
        <meta
          name="description"
          content="Find food in your terminal and get directions to it"
        />
        <meta
          name="viewport"
          content="width=device-width, minimum-scale=1.0, maximum-scale = 1.0, user-scalable = no"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {businessDetails ? <BusinessDetails businessDetails={businessDetails} /> : null}
    </main>
  );
}
