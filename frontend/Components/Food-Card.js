import { Box, Heading, SimpleGrid, Flex, Text } from "@chakra-ui/react";

const FoodCard = ({ food }) => {
  return (
    <Flex
      alignItems="center"
      direction="column"
      justify="center"
      borderRadius="50px"
      boxShadow="lg"
      pb="3rem"
      cursor="pointer"
    >
      <Box
        backgroundImage={food.image_url}
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        height={400}
        width={435}
        borderRadius="50px"
      >
        <Flex
          direction="column"
          justify="space-between"
          height="100%"
          width="100%"
          bg="rgba(0,0,0,0.5)"
          pb=".5rem"
          pl=".5rem"
          borderRadius="50px"
        >
          <Heading as="h3" color="white" fontSize="4xl" p="1rem">
            {food.name}
          </Heading>
          <Text color="white" fontSize="xl" p="1rem">
            {food.location.display_address[1]}
          </Text>

          <Flex
            direction="row"
            justify="flex-start"
            backgroundColor="white"
            w="4vw"
            p=".3rem"
            borderRadius="30px"
            ml="1rem"
          >
            <Text fontWeight="semibold" fontSize="1rem">
              {food.rating}
            </Text>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="gold"
              width="1rem"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
            <Text fontSize=".7rem" alignSelf="center" color="gray.500">
              ({food.review_count})
            </Text>
          </Flex>
        </Flex>
      </Box>

      <Text mt="1rem">
        {food.categories.map((category) => {
          return `${category.title}, `;
        })}
      </Text>
    </Flex>
  );
};

export default FoodCard;
