"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAction } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { FoodDetails } from "@/components/food-details";
import { Header } from "@/components/header";
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
      <div className="min-h-screen bg-background">
        <Header showBack />
        <div className="flex-1 flex items-center justify-center min-h-[80vh]">
          <div className="flex flex-col items-center gap-4 animate-fade-in">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 rounded-full border-4 border-muted" />
              <div className="absolute inset-0 rounded-full border-4 border-t-primary animate-spin" />
            </div>
            <p className="text-muted-foreground font-medium">Loading details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !business) {
    return (
      <div className="min-h-screen bg-background">
        <Header showBack />
        <div className="flex-1 flex items-center justify-center p-6 min-h-[80vh]">
          <div className="flex flex-col items-center gap-6 text-center max-w-md animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center">
              <svg className="w-10 h-10 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">Error</h2>
              <p className="text-muted-foreground text-lg">
                {error || "Business not found."}
              </p>
            </div>
            <Link href="/">
              <Button size="lg" className="rounded-xl">
                Go Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header showBack title={business.name} subtitle={business.categories?.[0]?.title} />

      {/* Content */}
      <main className="container mx-auto px-4 tablet:px-6 py-6 tablet:py-8">
        <FoodDetails business={business} />
      </main>
    </div>
  );
}
