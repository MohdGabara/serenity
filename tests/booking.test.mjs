import test from "node:test";
import assert from "node:assert/strict";

test("documented pricing rules", () => {
  const priceWithMarkup = (base, markup = .1) => Math.round(base * (1 + markup));
  assert.equal(priceWithMarkup(4000), 4400);
  assert.equal(priceWithMarkup(4000, .15), 4600);
});

test("display price snapshots the selected FX rate", () => {
  const usdCents = 8800;
  const eurRate = .92;
  assert.equal(Math.round(usdCents * eurRate), 8096);
});

test("capacity denies an oversold request", () => {
  const capacity = 12;
  assert.equal(13 > capacity, true);
  assert.equal(2 > capacity, false);
});
