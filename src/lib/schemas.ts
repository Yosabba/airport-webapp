import { z } from "zod";

export const airportSearchSchema = z.object({
  airportCode: z
    .string()
    .min(1, "Airport code is required")
    .max(4, "Airport code must be 4 characters or less")
    .transform((val) => val.toUpperCase()),
});

export type AirportSearchInput = z.infer<typeof airportSearchSchema>;
