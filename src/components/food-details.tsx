"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { YelpBusinessDetails } from "@/lib/types";

const Map = dynamic(() => import("@/components/map").then((mod) => mod.Map), {
  ssr: false,
  loading: () => (
    <div className="h-full bg-muted rounded-xl flex items-center justify-center">
      <div className="flex flex-col items-center gap-3 text-muted-foreground">
        <svg className="w-8 h-8 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span className="text-sm">Loading map...</span>
      </div>
    </div>
  ),
});

interface FoodDetailsProps {
  business: YelpBusinessDetails;
}

function convertTime(time: string): string {
  const hour = parseInt(time.slice(0, 2));
  const minute = time.slice(2);
  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return `${displayHour}:${minute} ${period}`;
}

function getDayName(day: number): string {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days[day];
}

export function FoodDetails({ business }: FoodDetailsProps) {
  const address = business.location.display_address.join(", ");
  const photos = business.photos || [business.image_url];
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${business.coordinates.latitude},${business.coordinates.longitude}`;
  const [activePhoto, setActivePhoto] = useState(0);

  const today = new Date().getDay();
  const yelpDay = today === 0 ? 6 : today - 1;
  const todayHours = business.hours?.[0]?.open.find((h) => h.day === yelpDay);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <div className="relative -mx-4 tablet:-mx-6 -mt-8 laptop:-mx-0 laptop:-mt-0 laptop:rounded-3xl overflow-hidden">
        {/* Main Photo */}
        <div className="relative h-[40vh] tablet:h-[50vh] laptop:h-[60vh] max-h-[600px]">
          <Image
            src={photos[activePhoto] || "/logo.svg"}
            alt={business.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Hero Content */}
          <div className="absolute bottom-0 left-0 right-0 p-4 tablet:p-6 laptop:p-10">
            <div className="max-w-4xl space-y-2 tablet:space-y-3 laptop:space-y-4">
              {/* Categories */}
              <div className="flex flex-wrap gap-1.5 tablet:gap-2">
                {business.categories.slice(0, 3).map((category) => (
                  <span
                    key={category.alias}
                    className="text-xs tablet:text-sm font-medium text-white/90 bg-white/20 backdrop-blur-sm px-2 tablet:px-3 py-0.5 tablet:py-1 rounded-full"
                  >
                    {category.title}
                  </span>
                ))}
              </div>

              {/* Name */}
              <h1 className="text-2xl tablet:text-4xl laptop:text-5xl desktop:text-6xl font-bold text-white line-clamp-2">
                {business.name}
              </h1>

              {/* Quick Info */}
              <div className="flex flex-wrap items-center gap-2 tablet:gap-3 laptop:gap-4 text-white/90">
                {/* Rating */}
                <div className="flex items-center gap-1 tablet:gap-1.5 bg-white/20 backdrop-blur-sm px-2 tablet:px-3 py-1 tablet:py-1.5 rounded-full">
                  <svg className="w-4 h-4 tablet:w-5 tablet:h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-bold text-sm tablet:text-base">{business.rating}</span>
                  <span className="text-white/70 text-xs tablet:text-sm">({business.review_count})</span>
                </div>

                {/* Price */}
                {business.price && (
                  <span className="bg-primary text-primary-foreground px-2 tablet:px-3 py-1 tablet:py-1.5 rounded-full font-bold text-sm tablet:text-base">
                    {business.price}
                  </span>
                )}

                {/* Open Status */}
                {todayHours && (
                  <span className="bg-green-500/90 text-white px-2 tablet:px-3 py-1 tablet:py-1.5 rounded-full font-semibold text-xs tablet:text-sm">
                    Open Now
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Photo Thumbnails - Hidden on mobile, shown on tablet+ */}
        {photos.length > 1 && (
          <div className="hidden tablet:flex absolute bottom-4 right-4 tablet:bottom-6 tablet:right-6 laptop:bottom-10 laptop:right-10 gap-1.5 tablet:gap-2">
            {photos.slice(0, 4).map((photo, index) => (
              <button
                key={index}
                onClick={() => setActivePhoto(index)}
                className={`relative w-12 h-12 tablet:w-14 tablet:h-14 laptop:w-20 laptop:h-20 rounded-lg tablet:rounded-xl overflow-hidden border-2 transition-all ${
                  activePhoto === index
                    ? "border-white shadow-lg scale-105"
                    : "border-white/30 hover:border-white/60"
                }`}
              >
                <Image
                  src={photo}
                  alt={`Photo ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* Photo Thumbnails - Mobile horizontal scroll */}
        {photos.length > 1 && (
          <div className="tablet:hidden flex gap-2 overflow-x-auto no-scrollbar px-4 py-3 bg-background/50 backdrop-blur-sm">
            {photos.map((photo, index) => (
              <button
                key={index}
                onClick={() => setActivePhoto(index)}
                className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${
                  activePhoto === index
                    ? "border-primary shadow-lg"
                    : "border-transparent"
                }`}
              >
                <Image
                  src={photo}
                  alt={`Photo ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="mt-6 tablet:mt-8 grid grid-cols-1 laptop:grid-cols-3 gap-6 tablet:gap-8">
        {/* Left Column - Main Info */}
        <div className="laptop:col-span-2 space-y-4 tablet:space-y-6">
          {/* Quick Actions */}
          <div className="grid grid-cols-4 gap-2 tablet:gap-3">
            <Button asChild variant="outline" className="h-auto py-3 tablet:py-4 flex-col gap-1.5 tablet:gap-2 rounded-xl">
              <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                <svg className="w-5 h-5 tablet:w-6 tablet:h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <span className="text-[10px] tablet:text-sm font-medium">Directions</span>
              </a>
            </Button>

            {business.display_phone && (
              <Button asChild variant="outline" className="h-auto py-3 tablet:py-4 flex-col gap-1.5 tablet:gap-2 rounded-xl">
                <a href={`tel:${business.phone}`}>
                  <svg className="w-5 h-5 tablet:w-6 tablet:h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-[10px] tablet:text-sm font-medium">Call</span>
                </a>
              </Button>
            )}

            <Button asChild variant="outline" className="h-auto py-3 tablet:py-4 flex-col gap-1.5 tablet:gap-2 rounded-xl">
              <a href={business.url} target="_blank" rel="noopener noreferrer">
                <svg className="w-5 h-5 tablet:w-6 tablet:h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span className="text-[10px] tablet:text-sm font-medium">Yelp</span>
              </a>
            </Button>

            <Button variant="outline" className="h-auto py-3 tablet:py-4 flex-col gap-1.5 tablet:gap-2 rounded-xl">
              <svg className="w-5 h-5 tablet:w-6 tablet:h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              <span className="text-[10px] tablet:text-sm font-medium">Share</span>
            </Button>
          </div>

          {/* Location Card */}
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="p-4 tablet:p-5 border-b border-border">
              <h2 className="font-semibold text-base tablet:text-lg flex items-center gap-2">
                <svg className="w-4 h-4 tablet:w-5 tablet:h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Location
              </h2>
              <p className="text-sm tablet:text-base text-muted-foreground mt-1">{address}</p>
            </div>
            <div className="h-[200px] tablet:h-[250px]">
              <Map
                latitude={business.coordinates.latitude}
                longitude={business.coordinates.longitude}
                name={business.name}
                address={address}
              />
            </div>
          </div>

          {/* Hours Card */}
          {business.hours && business.hours[0] && (
            <div className="bg-card rounded-2xl border border-border p-4 tablet:p-5">
              <div className="flex items-center justify-between mb-3 tablet:mb-4 gap-2">
                <h2 className="font-semibold text-base tablet:text-lg flex items-center gap-2">
                  <svg className="w-4 h-4 tablet:w-5 tablet:h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Hours
                </h2>
                {todayHours && (
                  <span className="text-xs tablet:text-sm font-semibold text-green-600 bg-green-50 px-2 tablet:px-3 py-0.5 tablet:py-1 rounded-full whitespace-nowrap">
                    Open until {convertTime(todayHours.end)}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-4 tablet:grid-cols-4 laptop:grid-cols-7 gap-2 tablet:gap-3">
                {business.hours[0].open.map((hours, index) => {
                  const isToday = hours.day === yelpDay;
                  return (
                    <div
                      key={index}
                      className={`p-2 tablet:p-3 rounded-lg tablet:rounded-xl text-center ${
                        isToday
                          ? "bg-primary/10 border-2 border-primary"
                          : "bg-muted/50"
                      }`}
                    >
                      <p className={`text-xs tablet:text-sm font-semibold ${isToday ? "text-primary" : "text-muted-foreground"}`}>
                        {getDayName(hours.day)}
                      </p>
                      <p className={`text-[10px] tablet:text-sm mt-0.5 tablet:mt-1 ${isToday ? "font-medium" : ""}`}>
                        {convertTime(hours.start)}
                      </p>
                      <p className={`text-[10px] tablet:text-sm ${isToday ? "font-medium" : "text-muted-foreground"}`}>
                        {convertTime(hours.end)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-4 tablet:space-y-6">
          {/* CTA Card */}
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border border-primary/20 p-4 tablet:p-6 space-y-3 tablet:space-y-4">
            <h3 className="font-semibold text-base tablet:text-lg">Ready to visit?</h3>
            <p className="text-xs tablet:text-sm text-muted-foreground">
              Get directions to {business.name} and start your journey.
            </p>
            <Button asChild size="lg" className="w-full rounded-xl">
              <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 tablet:w-5 tablet:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Get Directions
              </a>
            </Button>
          </div>

          {/* Contact Card */}
          <div className="bg-card rounded-2xl border border-border p-4 tablet:p-5 space-y-3 tablet:space-y-4">
            <h3 className="font-semibold text-base tablet:text-lg">Contact</h3>

            {business.display_phone && (
              <a
                href={`tel:${business.phone}`}
                className="flex items-center gap-3 p-2.5 tablet:p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="w-9 h-9 tablet:w-10 tablet:h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 tablet:w-5 tablet:h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-xs tablet:text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium text-sm tablet:text-base truncate">{business.display_phone}</p>
                </div>
              </a>
            )}

            <a
              href={business.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-2.5 tablet:p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
            >
              <div className="w-9 h-9 tablet:w-10 tablet:h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 tablet:w-5 tablet:h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <div>
                <p className="text-xs tablet:text-sm text-muted-foreground">Website</p>
                <p className="font-medium text-sm tablet:text-base">View on Yelp</p>
              </div>
            </a>
          </div>

          {/* Rating Card */}
          <div className="bg-card rounded-2xl border border-border p-4 tablet:p-5">
            <h3 className="font-semibold text-base tablet:text-lg mb-3 tablet:mb-4">Rating</h3>
            <div className="flex items-center gap-3 tablet:gap-4">
              <div className="text-4xl tablet:text-5xl font-bold text-primary">{business.rating}</div>
              <div>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-4 h-4 tablet:w-5 tablet:h-5 ${
                        star <= Math.round(business.rating)
                          ? "text-amber-400"
                          : "text-muted"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-xs tablet:text-sm text-muted-foreground mt-1">
                  {business.review_count} reviews
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
