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

    const searchQuery = `${args.airportCode} airport`;
    const params = new URLSearchParams({
      term: "Food",
      location: searchQuery,
      radius: "1609", // 1 mile in meters
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

    // Filter duplicates by name (Yelp sometimes returns duplicates)
    const uniqueBusinesses = data.businesses.filter(
      (business: { name: string }, index: number, self: { name: string }[]) =>
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
