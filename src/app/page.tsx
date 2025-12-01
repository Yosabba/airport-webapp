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
      <div className="absolute inset-0 bg-black/40 -z-10" />

      {/* Content */}
      <div className="flex flex-col items-center gap-8 px-4 text-center">
        <div className="space-y-2">
          <h1 className="text-4xl tablet:text-5xl laptop:text-6xl font-bold text-white drop-shadow-lg">
            Airportly
          </h1>
          <p className="text-lg tablet:text-xl text-white/90 drop-shadow">
            Find the best food near any airport
          </p>
        </div>

        <AirportSearch />
      </div>
    </main>
  );
}
