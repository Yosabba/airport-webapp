import { Box, Heading, SimpleGrid, Flex, Text } from "@chakra-ui/react";
import GetUserLocation from "./Components/GetUserLocations";
import Videonoob from "./assets/waiting.mp4";
import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        "https://api.yelp.com/v3/businesses/search/NYC"
      );
      setUserLocation(response.data);
    };

    
  }, []);
  return (
    <Flex direction="column" align="center" justify="center">
      <Box
        sx={
          {
            // position: "fixed",
            // display: "none",
            // width: "100%",
            // height: "100%",
            // top: "0",
            // left: "0",
            // right: "0",
            // bottom: "0",
            // backgroundColor: "rgba(0,0,0,0.5)",
            // zIndex: "-2",
          }
        }
      >
        <video
          autoPlay
          loop
          muted
          style={{
            width: "100vw",
            height: "100vh",
            objectFit: "cover",
            objectPosition: "center",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: -1,
          }}
        >
          <source src={Videonoob} type="video/mp4" />
        </video>
        <Heading as="h1" my="4rem">
          Welcome to Airportly
        </Heading>
        <Text>Stuff here</Text>
        <GetUserLocation />
      </Box>
    </Flex>
  );
};

export default App;
