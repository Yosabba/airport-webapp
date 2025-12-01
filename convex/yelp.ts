"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";

export const searchFood = action({
  args: {
    airportCode: v.string(),
  },
  handler: async (ctx, args) => {
    const apiKey = process.env.YELP_API_KEY;

    if (!apiKey) {
      throw new Error("YELP_API_KEY environment variable is not set");
    }

    const airportCode = args.airportCode.toUpperCase();
    const searchLocation = `${airportCode} airport terminal`;

    // Search for food specifically inside the airport
    const params = new URLSearchParams({
      term: "food",
      categories: "restaurants,food,bars,coffee,bakeries",
      location: searchLocation,
      radius: "800", // ~0.5 miles - focused on terminal area
      sort_by: "distance", // Prioritize closest to terminal
      limit: "50", // Get more results to filter
    });

    const response = await fetch(
      `https://api.yelp.com/v3/businesses/search?${params}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Yelp API error: ${response.status}`);
    }

    const data = await response.json();

    // Filter to prioritize airport restaurants
    // Check if address contains airport-related keywords
    const airportKeywords = [
      "airport",
      "terminal",
      "concourse",
      "gate",
      airportCode.toLowerCase(),
    ];

    interface YelpBusiness {
      name: string;
      location?: {
        display_address?: string[];
        address1?: string;
      };
    }

    // Separate airport restaurants from nearby restaurants
    const airportRestaurants: YelpBusiness[] = [];
    const nearbyRestaurants: YelpBusiness[] = [];

    data.businesses.forEach((business: YelpBusiness) => {
      const addressText = [
        business.location?.address1 || "",
        ...(business.location?.display_address || []),
      ]
        .join(" ")
        .toLowerCase();

      const nameText = business.name.toLowerCase();

      const isInAirport = airportKeywords.some(
        (keyword) => addressText.includes(keyword) || nameText.includes(keyword)
      );

      if (isInAirport) {
        airportRestaurants.push(business);
      } else {
        nearbyRestaurants.push(business);
      }
    });

    // Combine: airport restaurants first, then nearby ones
    const allBusinesses = [...airportRestaurants, ...nearbyRestaurants];

    // Filter duplicates by name
    const uniqueBusinesses = allBusinesses.filter(
      (business, index, self) =>
        index === self.findIndex((t) => t.name === business.name)
    );

    return uniqueBusinesses;
  },
});

export const getBusinessDetails = action({
  args: {
    businessId: v.string(),
  },
  handler: async (ctx, args) => {
    const apiKey = process.env.YELP_API_KEY;

    if (!apiKey) {
      throw new Error("YELP_API_KEY environment variable is not set");
    }

    const response = await fetch(
      `https://api.yelp.com/v3/businesses/${args.businessId}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Yelp API error: ${response.status}`);
    }

    return await response.json();
  },
});
