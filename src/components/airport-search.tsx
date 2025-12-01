"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAction } from "convex/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../convex/_generated/api";
import { airportSearchSchema, type AirportSearchInput } from "@/lib/schemas";
import { getCachedResults, setCachedResults } from "@/lib/cache";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import type { YelpBusiness } from "@/lib/types";

export function AirportSearch() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [usedCache, setUsedCache] = useState(false);
  const searchFood = useAction(api.yelp.searchFood);

  const form = useForm<AirportSearchInput>({
    resolver: zodResolver(airportSearchSchema),
    defaultValues: {
      airportCode: "",
    },
  });

  async function onSubmit(data: AirportSearchInput) {
    setIsLoading(true);
    setUsedCache(false);

    try {
      const airportCode = data.airportCode.toUpperCase();

      // Check cache first
      const cachedResults = getCachedResults(airportCode);

      let results: YelpBusiness[];

      if (cachedResults) {
        // Use cached data
        results = cachedResults;
        setUsedCache(true);
      } else {
        // Fetch fresh data
        results = (await searchFood({
          airportCode,
        })) as YelpBusiness[];

        // Cache the results
        setCachedResults(airportCode, results);
      }

      // Store in sessionStorage for the food page
      sessionStorage.setItem("foodResults", JSON.stringify(results));
      sessionStorage.setItem("airportCode", airportCode);
      sessionStorage.setItem("fromCache", usedCache ? "true" : "false");

      router.push(`/food?airport=${airportCode}`);
    } catch (error) {
      console.error("Search failed:", error);
      form.setError("airportCode", {
        message: "Failed to search. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3 w-full"
      >
        <FormField
          control={form.control}
          name="airportCode"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Enter airport code (LAX, JFK...)"
                  className="h-14 text-lg text-center bg-white/95 backdrop-blur-sm border-0 rounded-xl shadow-lg font-semibold tracking-wider placeholder:text-muted-foreground/60 placeholder:font-normal placeholder:tracking-normal focus-visible:ring-2 focus-visible:ring-primary"
                  maxLength={4}
                  {...field}
                  onChange={(e) =>
                    field.onChange(e.target.value.toUpperCase())
                  }
                />
              </FormControl>
              <FormMessage className="text-white text-center font-medium" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isLoading}
          size="lg"
          className="h-14 text-lg font-semibold rounded-xl shadow-lg transition-all hover:scale-[1.02] disabled:opacity-50 hover:cursor-pointer"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Searching...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Find Restaurants
            </span>
          )}
        </Button>
      </form>
    </Form>
  );
}
