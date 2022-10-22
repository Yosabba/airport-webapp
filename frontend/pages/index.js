import Head from "next/head";
import Image from "next/image";
import { Box, Heading, SimpleGrid, Flex, Text } from "@chakra-ui/react";
import GetUserLocation from "../Components/GetUserLocations";
import styled from "@emotion/styled";

export default function Home() {
  return (
    <main>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex direction="column" align="center" justify="center">
        <Box
          background="rgba(0, 0, 0, 0.5)"
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100vh"
        >
          <Video autoPlay loop muted>
            <source src="/waiting.mp4" type="video/mp4" />
          </Video>
        </Box>

        <GetUserLocation />
      </Flex>
    </main>
  );
}

const Video = styled.video`
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  object-position: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -2;
`;
