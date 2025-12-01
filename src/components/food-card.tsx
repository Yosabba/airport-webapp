"use client";

import Image from "next/image";
import Link from "next/link";
import type { YelpBusiness } from "@/lib/types";

interface FoodCardProps {
  food: YelpBusiness;
  index?: number;
}

export function FoodCard({ food, index = 0 }: FoodCardProps) {
  const address = food.location.display_address[0];
  const ratingStars = Math.round(food.rating);

  return (
    <Link
      href={`/food/${food.id}`}
      className="group block animate-slide-up touch-manipulation"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <article className="relative h-[280px] tablet:h-[320px] laptop:h-[340px] rounded-2xl overflow-hidden bg-card shadow-sm hover:shadow-2xl transition-all duration-500 active:scale-[0.98] tablet:hover:-translate-y-2">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={food.image_url || "/food-placeholder.svg"}
            alt={food.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        </div>

        {/* Top Row - Price & Rating */}
        <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
          {/* Rating Badge */}
          <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
            <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-bold text-sm text-gray-900">{food.rating}</span>
            <span className="text-xs text-gray-500">({food.review_count})</span>
          </div>

          {/* Price Badge */}
          {food.price && (
            <div className="bg-primary text-primary-foreground px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
              {food.price}
            </div>
          )}
        </div>

        {/* Bottom Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 tablet:p-5">
          {/* Categories */}
          <div className="flex flex-wrap gap-1.5 tablet:gap-2 mb-2 tablet:mb-3">
            {food.categories.slice(0, 2).map((category) => (
              <span
                key={category.alias}
                className="text-[10px] tablet:text-xs font-medium text-white/90 bg-white/20 backdrop-blur-sm px-2 tablet:px-2.5 py-0.5 tablet:py-1 rounded-full border border-white/10"
              >
                {category.title}
              </span>
            ))}
          </div>

          {/* Name */}
          <h3 className="font-bold text-base tablet:text-lg laptop:text-xl text-white mb-1.5 tablet:mb-2 line-clamp-2 group-hover:text-primary-foreground transition-colors">
            {food.name}
          </h3>

          {/* Address & Arrow */}
          <div className="flex items-center justify-between">
            <p className="text-xs tablet:text-sm text-white/70 line-clamp-1 flex items-center gap-1 tablet:gap-1.5 flex-1 mr-2 tablet:mr-3">
              <svg className="w-3.5 h-3.5 tablet:w-4 tablet:h-4 flex-shrink-0 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="truncate">{address}</span>
            </p>

            {/* Arrow */}
            <div className="w-8 h-8 tablet:w-10 tablet:h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
              <svg className="w-4 h-4 tablet:w-5 tablet:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Star Rating Bar */}
          <div className="mt-2 tablet:mt-3 pt-2 tablet:pt-3 border-t border-white/10">
            <div className="flex items-center gap-0.5 tablet:gap-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-3.5 h-3.5 tablet:w-4 tablet:h-4 ${i < ratingStars ? "text-amber-400" : "text-white/20"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-[10px] tablet:text-xs text-white/50 ml-1.5 tablet:ml-2">
                {food.review_count} reviews
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
