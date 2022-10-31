import {
  Box,
  Heading,
  SimpleGrid,
  Image,
  Text,
  Flex,
  AspectRatio,
  Button,
} from "@chakra-ui/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Link from "next/link";

// import required modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";

function BusinessDetails({ businessDetails }) {

  const convertTime = (time) => {
    // turn 0430 into 4:30
    const hour = time.slice(0, 2);
    const minute = time.slice(2, 4);

    //remove 0 from hour
    const hourWithoutZero = hour.replace(/^0+/, "");

    return `${hourWithoutZero}:${minute} AM`;
  };

  const convert24to12 = (time) => {
    const hour = time.slice(0, 2);
    const minute = time.slice(2, 4);

    //turn 24 hour time into 12 hour time
    const hour12 = hour > 12 ? hour - 12 : hour;

    return `Closes at ${hour12}:${minute} PM`;
  };

  return (
    <main>
      <Link href="/food">
        <Button
          size="md"
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

      <SimpleGrid
        columns={{ desktop: 2, laptop: 1, tablet: 1, mobile: 1 }}
        spacing={10}
      >
        <Box>
          <Box
            height={{ laptop: "sm", mobile: "xs" }}
            // backgroundRepeat="no-repeat"
            // bgPosition="center"
            // backgroundImage={businessDetails.image_url}
            // bgSize="cover"
            borderRadius={{
              desktop: "30px",
              laptop: "0",
              tablet: "0",
              mobile: "0",
            }}
            mx={{
              desktop: "2rem",
              laptop: "0",
              tablet: "0",
              mobile: "0",
            }}
            mt={{
              desktop: "1rem",
              laptop: "0",
              tablet: "0",
              mobile: "0",
            }}
            mb={{ desktop: "28%", laptop: "16%", tablet: "13rem", mobile: "0" }}
          >
            <Swiper
              modules={[Pagination, Navigation]}
              spaceBetween={50}
              slidesPerView={1}
              navigation={true}
              loop={true}
              className="mySwiper"
            >
              {businessDetails.photos.map((photo) => (
                <SwiperSlide>
                  <AspectRatio maxW="full">
                    <Image
                      src={photo}
                      alt="food"
                      objectFit="cover"
                      borderRadius={{ laptop: "30px", mobile: "0px" }}
                    />
                  </AspectRatio>
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>

          <Flex
            mx={{ laptop: "2rem", mobile: "0" }}
            mb={{ laptop: "1rem", mobile: "0" }}
            direction="column"
          >
            <Heading
              fontSize={{ laptop: "4xl", mobile: "xl" }}
              fontWeight="bold"
              color="black"
              mt="2rem"
            >
              {businessDetails.name}
            </Heading>
            <Flex direction="row" my=".3rem" wrap="wrap">
              <Text
                color="gray.500"
                mr=".5rem"
                fontSize={{ mobile: ".8rem", laptop: "1rem" }}
              >
                {businessDetails.categories
                  .map((category) => category.title)
                  .join(", ")}
              </Text>
              <Text
                color="gray.500"
                mr=".5rem"
                fontSize={{ mobile: ".8rem", laptop: "1rem" }}
              >
                •
              </Text>
              <Text
                mr=".2rem"
                color="gray.500"
                fontSize={{ mobile: ".8rem", laptop: "1rem" }}
              >
                {businessDetails.rating}
              </Text>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="gray"
                width="15px"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd"
                />
              </svg>
              <Text
                mx=".5rem"
                color="gray.500"
                fontSize={{ mobile: ".8rem", laptop: "1rem" }}
              >
                {businessDetails.review_count}+ Reviews
              </Text>
              {businessDetails.price ? (
                <Text
                  color="gray.500"
                  mx=".2rem"
                  fontSize={{ mobile: ".8rem", laptop: "1rem" }}
                >
                  •
                </Text>
              ) : null}

              <Text
                color="gray.500"
                mx=".2rem"
                fontSize={{ mobile: ".8rem", laptop: "1rem" }}
              >
                {businessDetails.price}
              </Text>
            </Flex>

            <Flex
              direction="row"
              my=".3rem"
              fontSize={{ mobile: ".8rem", laptop: "1rem" }}
            >
              {businessDetails.hours ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15px"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
                  <path d="M13 7h-2v6h6v-2h-4z"></path>
                </svg>
              ) : null}

              <Text color="gray.500" mx=".5rem">
                {businessDetails.hours
                  ? convertTime(
                      businessDetails.hours[0].open.find((day) => day.day === 0)
                        .start
                    )
                  : null}
              </Text>
              {businessDetails.hours ? (
                <Text color="gray.500" mx=".2rem">
                  •
                </Text>
              ) : null}

              <Text mx=".5rem" color="gray.500">
                {businessDetails.hours
                  ? convert24to12(
                      businessDetails.hours[0].open.find((day) => day.day === 0)
                        .end
                    )
                  : null}
              </Text>
            </Flex>
          </Flex>
        </Box>

        <Box>
          <Heading fontSize="4xl">Google maps here</Heading>
        </Box>
      </SimpleGrid>
    </main>
  );
}

export default BusinessDetails;