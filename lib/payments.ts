import { quoteTrip, type TripItem } from "./booking";

export type PaymentIntent = { bookingReference: string; amountUsdCents: number; items: TripItem[] };
export type PaymentResult = { provider: string; providerReference: string; status: "paid" | "pending"; bookingReference: string };
export interface PaymentAdapter { createIntent(intent: PaymentIntent): Promise<PaymentResult>; verifyWebhook(payload: string, signature?: string): Promise<PaymentResult>; }

/** Development-only adapter. Replace through PAYMENT_PROVIDER without changing booking logic. */
export class TestPaymentAdapter implements PaymentAdapter {
  async createIntent(intent: PaymentIntent): Promise<PaymentResult> {
    return { provider:"test", providerReference:`test_${crypto.randomUUID()}`, status:"paid", bookingReference:intent.bookingReference };
  }
  async verifyWebhook(payload: string): Promise<PaymentResult> { return JSON.parse(payload) as PaymentResult; }
}

export function paymentAdapter(): PaymentAdapter {
  // Future Paymob/Stripe adapters implement this same boundary and perform signature validation.
  return new TestPaymentAdapter();
}

export async function createTestPayment(items: TripItem[]) {
  const quote = quoteTrip(items, "USD");
  const bookingReference = `SST-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
  const payment = await paymentAdapter().createIntent({ bookingReference, amountUsdCents: quote.totalUsdCents, items });
  return { bookingReference, payment, quote };
}
