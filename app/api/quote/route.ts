import { NextRequest, NextResponse } from "next/server";
import { quoteTrip, type TripItem } from "@/lib/booking";
import type { Currency } from "@/lib/catalog";

export async function POST(request: NextRequest) {
  const body = await request.json() as { items?: TripItem[]; currency?: Currency };
  if (!body.items?.length) return NextResponse.json({ error: "At least one itinerary item is required." }, { status: 400 });
  return NextResponse.json(quoteTrip(body.items, body.currency));
}
