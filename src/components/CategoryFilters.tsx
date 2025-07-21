import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/Slider";
import { Switch } from "@/components/ui/switch";
import type { FilterableAttribute } from "@/lib/interface";
import { cn } from "@/lib/utils";

interface CategoryFiltersProps {
  attributes: FilterableAttribute[];
  currentFilters: Record<string, string>;
  categorySlug: string;
  minPrice?: string;
  maxPrice?: string;
  sort?: string;
}

export default function CategoryFilters({
  attributes = [], // <-- add default value
  currentFilters = {},
  categorySlug,
  minPrice,
  maxPrice,
  sort,
}: CategoryFiltersProps) {
  const [minPriceState, setMinPrice] = useState(
    parseInt(currentFilters.minPrice || "0"),
  );
  const [maxPriceState, setMaxPrice] = useState(
    parseInt(currentFilters.maxPrice || "50000"),
  );
  const [onSale, setOnSale] = useState(!!currentFilters.hasDiscount);
  const [freeDelivery, setFreeDelivery] = useState(
    !!currentFilters.freeDelivery,
  );

  const handlePriceChange = (value: number[]) => {
    setMinPrice(value[0]);
    setMaxPrice(value[1]);
  };

  const applyFilters = (
    overrides: Partial<{ hasDiscount: boolean; freeDelivery: boolean }> = {},
  ) => {
    const params = new URLSearchParams(currentFilters);
    params.set("minPrice", String(minPriceState));
    params.set("maxPrice", String(maxPriceState));

    // Use state or overrides
    const onSaleValue = overrides.hasDiscount ?? onSale;
    const freeDeliveryValue = overrides.freeDelivery ?? freeDelivery;

    if (onSaleValue) params.set("hasDiscount", "true");
    else params.delete("hasDiscount");

    if (freeDeliveryValue) params.set("freeDelivery", "true");
    else params.delete("freeDelivery");

    params.set("page", "1");
    window.location.search = params.toString();
  };

  useEffect(() => {
    setMinPrice(parseInt(currentFilters.minPrice || "0"));
    setMaxPrice(parseInt(currentFilters.maxPrice || "50000"));
    setOnSale(!!currentFilters.hasDiscount);
    setFreeDelivery(!!currentFilters.freeDelivery);
  }, [
    currentFilters.minPrice,
    currentFilters.maxPrice,
    currentFilters.hasDiscount,
    currentFilters.freeDelivery,
  ]);

  return (
    <div className="divide-y divide-gray-200 border p-4 w-full">
      <Accordion
        type="multiple"
        className="w-full"
        defaultValue={["general", "price", ...attributes.map((a) => a.slug)]}
      >
        {/* General Filters */}
        <AccordionItem value="general">
          <AccordionTrigger>General</AccordionTrigger>
          <AccordionContent className="pt-4 space-y-4">
            <div className="flex items-center justify-between">
              <label
                htmlFor="hasDiscount"
                className="text-xs font-medium text-gray-700"
              >
                On Sale
              </label>
              <Switch
                id="hasDiscount"
                checked={onSale}
                onCheckedChange={(checked) => {
                  setOnSale(checked);
                  applyFilters({ hasDiscount: checked });
                }}
              />
            </div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="freeDelivery"
                className="text-xs font-semibold text-gray-700"
              >
                Free Delivery
              </label>
              <Switch
                id="freeDelivery"
                checked={freeDelivery}
                onCheckedChange={(checked) => {
                  setFreeDelivery(checked);
                  applyFilters({ freeDelivery: checked });
                }}
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Price Range Slider */}
        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent className="pt-6">
            <Slider
              defaultValue={[
                typeof minPriceState === "number" ? minPriceState : 0,
                typeof maxPriceState === "number" ? maxPriceState : 50000,
              ]}
              min={0}
              max={50000}
              step={100}
              onValueChange={handlePriceChange}
              onValueCommit={() => applyFilters()}
            />
            <div className="flex justify-between text-xs text-gray-600 mt-2">
              <span>৳{minPriceState.toLocaleString()}</span>
              <span>৳{maxPriceState.toLocaleString()}</span>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Dynamic Attribute Filters */}
        {attributes.map((attr) => (
          <AccordionItem key={attr.id} value={attr.slug}>
            <AccordionTrigger>{attr.name}</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-wrap gap-2 pt-4">
                <a
                  href={getFilterUrl(attr.slug, null, currentFilters)}
                  className={cn(
                    "px-3 py-1.5 text-xs rounded-full border transition-colors",
                    !currentFilters[attr.slug]
                      ? "bg-black text-white border-black"
                      : "bg-white hover:bg-gray-100 border-gray-300",
                  )}
                >
                  All
                </a>
                {attr.values.map((value) => (
                  <a
                    key={value}
                    href={getFilterUrl(attr.slug, value, currentFilters)}
                    className={cn(
                      "px-3 py-1.5 text-xs rounded-full border transition-colors",
                      currentFilters[attr.slug] === value
                        ? "bg-black text-white border-black"
                        : "bg-white hover:bg-gray-100 border-gray-300",
                    )}
                  >
                    {value}
                  </a>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="pt-6">
        <a
          href={`/categories/${categorySlug}`}
          className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 border border-input bg-transparent hover:bg-accent hover:text-accent-foreground"
        >
          Reset All Filters
        </a>
      </div>
    </div>
  );
}

// Helper to construct filter URLs
function getFilterUrl(
  key: string,
  value: string | null,
  currentFilters: Record<string, string>,
) {
  const params = new URLSearchParams(currentFilters);
  params.set("page", "1");
  if (value === null) {
    params.delete(key);
  } else {
    params.set(key, value);
  }
  return `?${params.toString()}`;
}
