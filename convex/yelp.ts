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

    interface YelpCategory {
      alias: string;
      title: string;
    }

    interface YelpBusiness {
      name: string;
      categories?: YelpCategory[];
      location?: {
        display_address?: string[];
        address1?: string;
      };
    }

    // Categories to EXCLUDE (non-food)
    const excludedCategories = [
      "airports",
      "airportterminals",
      "hotelstravel",
      "hotels",
      "transport",
      "publictransport",
      "trainstations",
      "busstations",
      "parking",
      "carrental",
    ];

    // Filter to only include food-related businesses
    const foodBusinesses = data.businesses.filter((business: YelpBusiness) => {
      const categoryAliases = business.categories?.map((c) => c.alias) || [];

      // Exclude if any category is in the excluded list
      const hasExcludedCategory = categoryAliases.some((alias) =>
        excludedCategories.includes(alias)
      );

      return !hasExcludedCategory;
    });

    // Remove duplicates by name
    const uniqueBusinesses = foodBusinesses.filter(
      (business: YelpBusiness, index: number, self: YelpBusiness[]) =>
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
