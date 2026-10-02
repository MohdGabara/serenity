import { NextRequest, NextResponse } from "next/server";
import { isBookable, type TripItem } from "@/lib/booking";
import { createTestPayment } from "@/lib/payments";

export async function POST(request: NextRequest) {
  const body = await request.json() as { items?: TripItem[] };
  if (!body.items?.length || body.items.some(item => !isBookable(item.date, item.experienceId, item.adults))) {
    return NextResponse.json({ error: "Availability changed. Review the itinerary." }, { status: 409 });
  }
  const { bookingReference, payment, quote } = await createTestPayment(body.items);
  return NextResponse.json({ bookingId: bookingReference, status: payment.status, quote, provider: payment.provider });
}
