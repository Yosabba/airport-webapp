import {
  Box,
  Heading,
  SimpleGrid,
  Flex,
  Button,
  Badge,
  StarIcon,
  Image,
  Text,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";

const FoodCard = ({ food }) => {
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      mx="auto"
      my="5rem"
      _hover={{ cursor: "pointer" }}
    >
      <Image src={`${food.image_url}`} alt="food" width={400} height={300} />

      <Box p="6">
        <Box display="flex" alignItems="baseline">
          {food.categories.map((category) => (
            <Badge borderRadius="full" px="2" colorScheme="blue">
              {category.title}
            </Badge>
          ))}
        </Box>

        <Text
          mt="1rem"
          fontWeight="semibold"
          lineHeight="tight"
          noOfLines={1}
          fontSize="2xl"
        >
          {food.name}
        </Text>

        <Text>{food.location.display_address[1]}</Text>

        <Box display="flex" mt="2" alignItems="center">
          <Text>{food.rating}</Text>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="gold"
            width="20px"
          >
            <path
              fillRule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
              clipRule="evenodd"
            />
          </svg>
          <Box as="span" color="gray.600" fontSize="xs">
            {`(${food.review_count})`} reviews
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FoodCard;
