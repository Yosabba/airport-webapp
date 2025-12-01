"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  showBack?: boolean;
  title?: string;
  subtitle?: string;
}

export function Header({ showBack = false, title, subtitle }: HeaderProps) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 tablet:px-6">
        <div className="flex items-center justify-between h-14 tablet:h-16">
          {/* Left */}
          <div className="flex items-center gap-2 tablet:gap-4 min-w-0 flex-shrink-0">
            {showBack ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.back()}
                className="gap-1 tablet:gap-2 -ml-2 px-2 tablet:px-3"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="hidden tablet:inline">Back</span>
              </Button>
            ) : (
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </div>
                <span className="font-bold text-base tablet:text-lg">Airportly</span>
              </Link>
            )}
          </div>

          {/* Center - Title (hidden on very small screens when there's a title) */}
          {title && (
            <div className="hidden tablet:block absolute left-1/2 -translate-x-1/2 text-center max-w-[40%]">
              <h1 className="font-bold text-base laptop:text-lg truncate">{title}</h1>
              {subtitle && (
                <p className="text-xs text-muted-foreground truncate">{subtitle}</p>
              )}
            </div>
          )}

          {/* Right */}
          <div className="flex items-center gap-1 tablet:gap-2 flex-shrink-0">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-1 tablet:gap-2 px-2 tablet:px-3">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="hidden tablet:inline">New Search</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
