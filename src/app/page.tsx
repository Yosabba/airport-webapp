import { AirportSearch } from "@/components/airport-search";

export default function Home() {
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-10"
      >
        <source src="/waiting.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 -z-10" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-10 px-6 text-center max-w-2xl mx-auto">
        {/* Title */}
        <div className="space-y-4 animate-slide-up">
          <h1 className="text-5xl tablet:text-6xl laptop:text-7xl font-bold text-white tracking-tight">
            Airportly
          </h1>
          <p className="text-xl tablet:text-2xl text-white/80 font-light max-w-xl mx-auto">
            Find the best restaurants inside any airport terminal
          </p>
        </div>

        {/* Search */}
        <div
          className="w-full max-w-md animate-scale-in"
          style={{ animationDelay: "150ms" }}
        >
          <AirportSearch />
        </div>

        {/* Stats */}
        <div
          className="flex items-center justify-center gap-4 tablet:gap-8 text-white/60 text-xs tablet:text-sm animate-fade-in"
          style={{ animationDelay: "300ms" }}
        >
          <div className="flex flex-col items-center gap-0.5 tablet:gap-1">
            <span className="text-lg tablet:text-2xl font-bold text-white">5,000+</span>
            <span>Airports</span>
          </div>
          <div className="w-px h-8 tablet:h-10 bg-white/20" />
          <div className="flex flex-col items-center gap-0.5 tablet:gap-1">
            <span className="text-lg tablet:text-2xl font-bold text-white">100K+</span>
            <span>Restaurants</span>
          </div>
          <div className="w-px h-8 tablet:h-10 bg-white/20" />
          <div className="flex flex-col items-center gap-0.5 tablet:gap-1">
            <span className="text-lg tablet:text-2xl font-bold text-white">Real-time</span>
            <span>Data</span>
          </div>
        </div>
      </div>
    </main>
  );
}
