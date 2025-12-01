"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { YelpBusinessDetails } from "@/lib/types";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Dynamically import map to avoid SSR issues with Leaflet
const Map = dynamic(() => import("@/components/map").then((mod) => mod.Map), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] bg-muted rounded-lg flex items-center justify-center">
      <p className="text-muted-foreground">Loading map...</p>
    </div>
  ),
});

interface FoodDetailsProps {
  business: YelpBusinessDetails;
}

// Convert 24h time (e.g., "0900") to 12h format
function convertTime(time: string): string {
  const hour = parseInt(time.slice(0, 2));
  const minute = time.slice(2);
  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return `${displayHour}:${minute} ${period}`;
}

// Get day name from day number (0 = Monday)
function getDayName(day: number): string {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days[day];
}

export function FoodDetails({ business }: FoodDetailsProps) {
  const address = business.location.display_address.join(", ");
  const photos = business.photos || [business.image_url];
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${business.coordinates.latitude},${business.coordinates.longitude}`;

  // Get today's hours
  const today = new Date().getDay();
  const yelpDay = today === 0 ? 6 : today - 1; // Convert JS day to Yelp day (0 = Monday)
  const todayHours = business.hours?.[0]?.open.find((h) => h.day === yelpDay);

  return (
    <div className="space-y-6">
      {/* Image Carousel */}
      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          className="rounded-lg overflow-hidden"
        >
          {photos.map((photo, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-64 tablet:h-80 laptop:h-96">
                <Image
                  src={photo}
                  alt={`${business.name} photo ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Business Info */}
      <div className="grid grid-cols-1 laptop:grid-cols-2 gap-6">
        {/* Left Column - Info */}
        <Card>
          <CardContent className="p-6 space-y-4">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {business.categories.map((category) => (
                <Badge key={category.alias} variant="secondary">
                  {category.title}
                </Badge>
              ))}
            </div>

            {/* Name */}
            <h1 className="text-2xl tablet:text-3xl font-bold">{business.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <span className="text-yellow-500 text-xl">★</span>
                <span className="font-semibold text-lg">{business.rating}</span>
              </div>
              <span className="text-muted-foreground">
                ({business.review_count} reviews)
              </span>
              {business.price && (
                <Badge variant="outline" className="ml-2">
                  {business.price}
                </Badge>
              )}
            </div>

            {/* Address */}
            <p className="text-muted-foreground">{address}</p>

            {/* Phone */}
            {business.display_phone && (
              <p className="text-muted-foreground">{business.display_phone}</p>
            )}

            {/* Hours */}
            {business.hours && business.hours[0] && (
              <div className="space-y-2">
                <h3 className="font-semibold">Hours</h3>
                <div className="text-sm space-y-1">
                  {business.hours[0].open.map((hours, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-muted-foreground">
                        {getDayName(hours.day)}
                      </span>
                      <span>
                        {convertTime(hours.start)} - {convertTime(hours.end)}
                      </span>
                    </div>
                  ))}
                </div>
                {todayHours && (
                  <p className="text-sm text-green-600 font-medium">
                    Open today: {convertTime(todayHours.start)} -{" "}
                    {convertTime(todayHours.end)}
                  </p>
                )}
              </div>
            )}

            {/* Get Directions Button */}
            <Button asChild className="w-full" size="lg">
              <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                Get Directions
              </a>
            </Button>
          </CardContent>
        </Card>

        {/* Right Column - Map */}
        <Card>
          <CardContent className="p-0 h-[300px] laptop:h-full laptop:min-h-[400px]">
            <Map
              latitude={business.coordinates.latitude}
              longitude={business.coordinates.longitude}
              name={business.name}
              address={address}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
