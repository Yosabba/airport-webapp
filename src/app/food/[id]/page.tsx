"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAction } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { FoodDetails } from "@/components/food-details";
import { Button } from "@/components/ui/button";
import type { YelpBusinessDetails } from "@/lib/types";

export default function FoodDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const businessId = params.id as string;
  const [business, setBusiness] = useState<YelpBusinessDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getBusinessDetails = useAction(api.yelp.getBusinessDetails);

  useEffect(() => {
    async function fetchDetails() {
      if (!businessId) {
        router.push("/");
        return;
      }

      try {
        const details = await getBusinessDetails({ businessId });
        setBusiness(details as YelpBusinessDetails);
      } catch (err) {
        console.error("Failed to fetch business details:", err);
        setError("Failed to load business details. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchDetails();
  }, [businessId, getBusinessDetails, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
          <p className="text-muted-foreground">Loading details...</p>
        </div>
      </div>
    );
  }

  if (error || !business) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center px-4">
          <h2 className="text-2xl font-bold">Error</h2>
          <p className="text-muted-foreground">
            {error || "Business not found."}
          </p>
          <Link href="/">
            <Button>Go Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            ← Back
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        <FoodDetails business={business} />
      </main>
    </div>
  );
}
