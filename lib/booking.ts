import { experiences, fxRates, type Currency, priceWithMarkup } from "./catalog";

export type TripItem = { experienceId: string; date: string; adults: number };
export function quoteTrip(items: TripItem[], currency: Currency = "USD") {
  const lines = items.flatMap((item) => {
    const experience = experiences.find((entry) => entry.id === item.experienceId);
    if (!experience || !experience.published) return [];
    const unitUsdCents = priceWithMarkup(experience.basePriceCents);
    return [{ ...item, experience, unitUsdCents, totalUsdCents: unitUsdCents * item.adults }];
  });
  const totalUsdCents = lines.reduce((sum, line) => sum + line.totalUsdCents, 0);
  return { lines, totalUsdCents, currency, rate: fxRates[currency], totalDisplayCents: Math.round(totalUsdCents * fxRates[currency]) };
}

export function isBookable(date: string, experienceId: string, adults: number) {
  const experience = experiences.find((entry) => entry.id === experienceId);
  if (!experience || !experience.published || adults > experience.capacity) return false;
  const day = new Date(`${date}T12:00:00`).getDay();
  return day !== 0; // Sunday is an explicit seed blackout date.
}
