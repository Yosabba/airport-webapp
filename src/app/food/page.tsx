"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { FoodCard } from "@/components/food-card";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { getCacheAge, formatCacheAge, clearCache, setCachedResults } from "@/lib/cache";
import type { YelpBusiness } from "@/lib/types";

function SkeletonCard() {
  return (
    <div className="relative h-[280px] tablet:h-[320px] laptop:h-[340px] rounded-2xl overflow-hidden bg-muted">
      <div className="absolute inset-0 shimmer" />
      <div className="absolute bottom-0 left-0 right-0 p-4 tablet:p-5 space-y-2 tablet:space-y-3">
        <div className="flex gap-1.5 tablet:gap-2">
          <div className="h-5 tablet:h-6 w-14 tablet:w-16 rounded-full bg-white/10" />
          <div className="h-5 tablet:h-6 w-16 tablet:w-20 rounded-full bg-white/10" />
        </div>
        <div className="h-5 tablet:h-7 w-3/4 rounded bg-white/10" />
        <div className="h-4 tablet:h-5 w-1/2 rounded bg-white/10" />
      </div>
    </div>
  );
}

export default function FoodListPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const airport = searchParams.get("airport");
  const [foods, setFoods] = useState<YelpBusiness[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [sortBy, setSortBy] = useState<"rating" | "reviews" | "default">("default");
  const [cacheAge, setCacheAgeState] = useState<string | null>(null);

  const searchFood = useAction(api.yelp.searchFood);

  const updateCacheAge = useCallback(() => {
    if (airport) {
      const age = getCacheAge(airport);
      if (age !== null) {
        setCacheAgeState(formatCacheAge(age));
      } else {
        setCacheAgeState(null);
      }
    }
  }, [airport]);

  useEffect(() => {
    const storedResults = sessionStorage.getItem("foodResults");
    const storedAirport = sessionStorage.getItem("airportCode");

    if (storedResults && storedAirport === airport) {
      setFoods(JSON.parse(storedResults));
      setIsLoading(false);
      updateCacheAge();
    } else if (!airport) {
      router.push("/");
    } else {
      router.push("/");
    }
  }, [airport, router, updateCacheAge]);

  // Update cache age every minute
  useEffect(() => {
    const interval = setInterval(updateCacheAge, 60000);
    return () => clearInterval(interval);
  }, [updateCacheAge]);

  const handleRefresh = async () => {
    if (!airport || isRefreshing) return;

    setIsRefreshing(true);

    try {
      // Clear cache for this airport
      clearCache(airport);

      // Fetch fresh data
      const results = (await searchFood({
        airportCode: airport,
      })) as YelpBusiness[];

      // Update cache
      setCachedResults(airport, results);

      // Update state
      setFoods(results);
      sessionStorage.setItem("foodResults", JSON.stringify(results));
      updateCacheAge();
    } catch (error) {
      console.error("Refresh failed:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const sortedFoods = [...foods].sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "reviews") return b.review_count - a.review_count;
    return 0;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />

        {/* Hero Skeleton */}
        <div className="bg-gradient-to-b from-primary/5 to-background py-8 tablet:py-12">
          <div className="container mx-auto px-4 tablet:px-6 text-center">
            <div className="h-6 tablet:h-8 w-28 tablet:w-32 rounded-full shimmer mx-auto" />
            <div className="h-10 tablet:h-14 w-32 tablet:w-40 rounded shimmer mx-auto mt-3 tablet:mt-4" />
            <div className="h-4 tablet:h-5 w-40 tablet:w-48 rounded shimmer mx-auto mt-2 tablet:mt-3" />
          </div>
        </div>

        <main className="container mx-auto px-4 tablet:px-6 py-6 tablet:py-8">
          <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </main>
      </div>
    );
  }

  if (foods.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />

        <div className="flex-1 flex items-center justify-center p-4 tablet:p-6 min-h-[70vh]">
          <div className="flex flex-col items-center gap-4 tablet:gap-6 text-center max-w-md animate-fade-in">
            <div className="w-20 h-20 tablet:w-24 tablet:h-24 rounded-full bg-muted flex items-center justify-center">
              <svg className="w-10 h-10 tablet:w-12 tablet:h-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl tablet:text-3xl font-bold">No Results</h2>
              <p className="text-muted-foreground text-base tablet:text-lg">
                No restaurants found near <span className="text-primary font-semibold">{airport}</span> airport.
              </p>
            </div>
            <Link href="/">
              <Button size="lg" className="rounded-xl">
                Try Another Airport
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-primary/5 to-background border-b border-border/50">
        <div className="container mx-auto px-4 tablet:px-6 py-8 tablet:py-12 text-center">
          <div className="inline-flex items-center gap-1.5 tablet:gap-2 px-3 tablet:px-4 py-1.5 tablet:py-2 rounded-full bg-primary/10 text-primary text-xs tablet:text-sm font-medium mb-3 tablet:mb-4">
            <svg className="w-3.5 h-3.5 tablet:w-4 tablet:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            Airport Code
          </div>
          <h1 className="text-4xl tablet:text-5xl laptop:text-6xl font-bold text-primary mb-1.5 tablet:mb-2">{airport}</h1>
          <p className="text-base tablet:text-lg text-muted-foreground">
            {foods.length} restaurant{foods.length !== 1 ? "s" : ""} inside the airport
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-14 tablet:top-16 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 tablet:px-6 py-2 tablet:py-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1 tablet:gap-2 overflow-x-auto no-scrollbar">
              <span className="text-xs tablet:text-sm text-muted-foreground hidden tablet:inline flex-shrink-0">Sort:</span>
              <div className="flex gap-1">
                <Button
                  variant={sortBy === "default" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setSortBy("default")}
                  className="rounded-full text-[10px] tablet:text-xs px-2.5 tablet:px-3 h-7 tablet:h-8"
                >
                  Default
                </Button>
                <Button
                  variant={sortBy === "rating" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setSortBy("rating")}
                  className="rounded-full text-[10px] tablet:text-xs px-2.5 tablet:px-3 h-7 tablet:h-8"
                >
                  Top Rated
                </Button>
                <Button
                  variant={sortBy === "reviews" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setSortBy("reviews")}
                  className="rounded-full text-[10px] tablet:text-xs px-2.5 tablet:px-3 h-7 tablet:h-8"
                >
                  Most Reviews
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2 tablet:gap-3 flex-shrink-0">
              {/* Cache Status */}
              {cacheAge && (
                <div className="hidden laptop:flex items-center gap-1.5 text-xs text-muted-foreground">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Updated {cacheAge}</span>
                </div>
              )}

              {/* Refresh Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="rounded-full text-[10px] tablet:text-xs gap-1 tablet:gap-1.5 px-2 tablet:px-3 h-7 tablet:h-8"
              >
                <svg
                  className={`w-3.5 h-3.5 tablet:w-4 tablet:h-4 ${isRefreshing ? "animate-spin" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span className="hidden tablet:inline">{isRefreshing ? "Refreshing..." : "Refresh"}</span>
              </Button>

              {/* Results count */}
              <div className="hidden laptop:flex items-center gap-2 text-sm text-muted-foreground border-l border-border pl-3">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                {foods.length} results
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <main className="container mx-auto px-4 tablet:px-6 py-6 tablet:py-8">
        <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-4 tablet:gap-6">
          {sortedFoods.map((food, index) => (
            <FoodCard key={food.id} food={food} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 tablet:mt-12 text-center">
          <p className="text-sm tablet:text-base text-muted-foreground mb-3 tablet:mb-4">
            Didn&apos;t find what you&apos;re looking for?
          </p>
          <Link href="/">
            <Button variant="outline" className="rounded-xl gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search Another Airport
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
