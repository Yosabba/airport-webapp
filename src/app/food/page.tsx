"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { FoodCard } from "@/components/food-card";
import { Button } from "@/components/ui/button";
import type { YelpBusiness } from "@/lib/types";

export default function FoodListPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const airport = searchParams.get("airport");
  const [foods, setFoods] = useState<YelpBusiness[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get results from sessionStorage
    const storedResults = sessionStorage.getItem("foodResults");
    const storedAirport = sessionStorage.getItem("airportCode");

    if (storedResults && storedAirport === airport) {
      setFoods(JSON.parse(storedResults));
      setIsLoading(false);
    } else if (!airport) {
      router.push("/");
    } else {
      // No cached results, go back to search
      router.push("/");
    }
  }, [airport, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
          <p className="text-muted-foreground">Loading restaurants...</p>
        </div>
      </div>
    );
  }

  if (foods.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center px-4">
          <h2 className="text-2xl font-bold">No Results Found</h2>
          <p className="text-muted-foreground">
            No restaurants found near {airport} airport.
          </p>
          <Link href="/">
            <Button>Try Another Airport</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="sm">
              ← Back
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">
            Food near {airport} Airport
          </h1>
          <div className="w-16" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Grid */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-6">
          {foods.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      </main>
    </div>
  );
}
