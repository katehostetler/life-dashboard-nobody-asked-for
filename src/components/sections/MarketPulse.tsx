"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import ScrollReveal from "@/components/ui/ScrollReveal";
import TickingNumber from "@/components/ui/TickingNumber";
import { useMarketPrices } from "@/lib/hooks/useMarketPrices";

function formatPrice(price: number): string {
  if (price >= 1000) return price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return price.toFixed(2);
}

export default function MarketPulse() {
  const { prices, isLoading } = useMarketPrices();

  if (isLoading && prices.length === 0) {
    return (
      <SectionWrapper variant="contained" id="market-pulse">
        <ScrollReveal>
          <div className="text-center">
            <h2 className="font-[family-name:var(--font-playfair)] font-light text-[length:var(--font-size-display)] text-text-primary mb-3">
              Market pulse
            </h2>
            <p className="text-text-tertiary text-[length:var(--font-size-body)]">
              Loading prices...
            </p>
          </div>
        </ScrollReveal>
      </SectionWrapper>
    );
  }

  if (prices.length === 0) return null;

  return (
    <SectionWrapper variant="contained" id="market-pulse">
      <ScrollReveal>
        <div className="text-center mb-12">
          <h2 className="font-[family-name:var(--font-playfair)] font-light text-[length:var(--font-size-display)] text-text-primary mb-3">
            Market pulse
          </h2>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {prices.map((asset, i) => (
          <ScrollReveal key={asset.symbol} delay={0.1 * (i + 1)}>
            <div className="rounded-xl border border-border-subtle p-4 text-center hover:border-border-glow transition-colors">
              <p className="text-text-tertiary text-[length:var(--font-size-caption)] mb-1">
                {asset.symbol}
              </p>
              <TickingNumber
                value={asset.price}
                format="decimal"
                decimals={2}
                className="text-[length:var(--font-size-subheading)] text-text-primary"
              />
              <p className="text-[length:var(--font-size-caption)] mt-1 tabular-nums">
                <span className="text-text-tertiary">$</span>
                <span className="text-text-secondary">{formatPrice(asset.price)}</span>
              </p>
              <p
                className={`text-[length:var(--font-size-caption)] tabular-nums mt-1 ${
                  asset.change24h >= 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                {asset.change24h >= 0 ? "+" : ""}
                {asset.change24h.toFixed(2)}%
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
