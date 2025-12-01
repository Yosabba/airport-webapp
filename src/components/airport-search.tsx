"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAction } from "convex/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../convex/_generated/api";
import { airportSearchSchema, type AirportSearchInput } from "@/lib/schemas";
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
  const searchFood = useAction(api.yelp.searchFood);

  const form = useForm<AirportSearchInput>({
    resolver: zodResolver(airportSearchSchema),
    defaultValues: {
      airportCode: "",
    },
  });

  async function onSubmit(data: AirportSearchInput) {
    setIsLoading(true);
    try {
      const results = (await searchFood({
        airportCode: data.airportCode,
      })) as YelpBusiness[];

      // Store results in sessionStorage for the food page
      sessionStorage.setItem("foodResults", JSON.stringify(results));
      sessionStorage.setItem("airportCode", data.airportCode);

      router.push(`/food?airport=${data.airportCode}`);
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
        className="flex flex-col gap-4 w-full max-w-md"
      >
        <FormField
          control={form.control}
          name="airportCode"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Enter airport code (e.g., LAX)"
                  className="h-14 text-lg text-center bg-white/90 backdrop-blur-sm border-0 rounded-xl shadow-lg"
                  maxLength={4}
                  {...field}
                  onChange={(e) =>
                    field.onChange(e.target.value.toUpperCase())
                  }
                />
              </FormControl>
              <FormMessage className="text-white text-center" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isLoading}
          className="h-14 text-lg rounded-xl shadow-lg bg-blue-600 hover:bg-blue-700"
        >
          {isLoading ? "Searching..." : "Find Food"}
        </Button>
      </form>
    </Form>
  );
}
