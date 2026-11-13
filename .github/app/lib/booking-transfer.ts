/**
 * Airport-transfer pricing, shared by the booking form and the booking route's
 * action so the price shown and the variant charged at checkout always agree.
 *
 * Each price is a total for the group, set by how many travelers there are.
 * Every group size is its own variant on the transfer product in Shopify,
 * titled with its range and leg, e.g. "1-4 travelers / One way". Checkout
 * charges that variant's price, so changing a price is an Admin edit.
 */

export interface TransferTier {
  /** Smallest group this price applies to. */
  min: number;
  /** Largest group this price applies to. */
  max: number;
  onewayPrice: number;
  returnPrice: number;
  onewayVariantId: string;
  returnVariantId: string;
}

export interface TransferConfig {
  /** Sorted by group size, smallest first. */
  tiers: TransferTier[];
  image: string;
  imageAlt: string;
}

/** The price row covering this many travelers, or null if none does. */
export function transferTierFor(
  tiers: TransferTier[],
  travelers: number,
): TransferTier | null {
  return tiers.find((tier) => travelers >= tier.min && travelers <= tier.max) ?? null;
}

/**
 * Reads the group range out of a variant title: "1-4 travelers / One way" →
 * {min: 1, max: 4}. A title with no range (the old single One way / Return
 * variants) covers every group, so the store keeps working until the
 * per-size variants are added. Not Infinity: that does not survive being sent
 * from the loader to the browser.
 */
export function transferRange(title: string): {min: number; max: number} {
  const m = title.match(/(\d+)\s*(?:-|–|to)\s*(\d+)/i);
  return m ? {min: Number(m[1]), max: Number(m[2])} : {min: 1, max: Number.MAX_SAFE_INTEGER};
}

/** Which leg a variant title is: "One way", "Return", or neither. */
export function transferLeg(title: string): 'oneway' | 'return' | null {
  if (/one\s*way/i.test(title)) return 'oneway';
  if (/return/i.test(title)) return 'return';
  return null;
}
