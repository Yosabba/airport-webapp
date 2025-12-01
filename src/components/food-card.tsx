"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { YelpBusiness } from "@/lib/types";

interface FoodCardProps {
  food: YelpBusiness;
}

export function FoodCard({ food }: FoodCardProps) {
  const address = food.location.display_address[1] || food.location.display_address[0];

  return (
    <Link href={`/food/${food.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
        <div className="relative h-48 w-full">
          <Image
            src={food.image_url || "/logo.svg"}
            alt={food.name}
            fill
            className="object-cover"
            sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
          />
        </div>
        <CardContent className="p-4 space-y-3">
          {/* Categories */}
          <div className="flex flex-wrap gap-1">
            {food.categories.slice(0, 3).map((category) => (
              <Badge key={category.alias} variant="secondary" className="text-xs">
                {category.title}
              </Badge>
            ))}
          </div>

          {/* Name */}
          <h3 className="font-semibold text-lg line-clamp-1">{food.name}</h3>

          {/* Address */}
          <p className="text-sm text-muted-foreground line-clamp-1">{address}</p>

          {/* Rating and Reviews */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <span className="text-yellow-500">★</span>
              <span className="font-medium">{food.rating}</span>
            </div>
            <span className="text-muted-foreground text-sm">
              ({food.review_count} reviews)
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
