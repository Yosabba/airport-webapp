import { Box, Heading, SimpleGrid, Flex, Text } from "@chakra-ui/react";

const FoodCard = ({ food }) => {
  return (
    <Flex alignItems="center" direction="column" justify="center">
      <Heading>{food.name}</Heading>
      <Text>{food.price}</Text>
    </Flex>
  );
};

export default FoodCard;
