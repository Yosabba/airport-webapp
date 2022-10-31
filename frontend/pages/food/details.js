import Head from "next/head";
import Image from "next/image";
import { Box, Heading, SimpleGrid, Flex, Text } from "@chakra-ui/react";
import BusinessDetails from "../../Components/Food-Details";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
export default function Details() {
  const [business, setBusiness] = useState({});

  useEffect(() => {
    const { businessDetails } = useSelector((state) => state.food);

    setBusiness(businessDetails);
  }, [businessDetails]);

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

      {business < 0 ? null : <BusinessDetails businessDetails={business} />}
    </main>
  );
}
