import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { ShippingMethod } from "@/lib/interface";

export interface ShippingLocationSelectorProps {
  shippingMethods: ShippingMethod[];
  shippingMethodLabel?: string;
}

export default function ShippingLocationSelector({
  shippingMethods,
  shippingMethodLabel = "Choose Delivery Option",
}: ShippingLocationSelectorProps) {
  const [selectedLocation, setSelectedLocation] = useState<string | undefined>(
    shippingMethods.length > 0 ? shippingMethods[0].id : undefined,
  );

  useEffect(() => {
    if (shippingMethods.length > 0 && !selectedLocation) {
      setSelectedLocation(shippingMethods[0].id);
    }
  }, [shippingMethods, selectedLocation]);

  useEffect(() => {
    if (selectedLocation) {
      const event = new CustomEvent("shippingLocationChange", {
        detail: {
          id: selectedLocation,
          fee:
            shippingMethods.find((sm) => sm.id === selectedLocation)?.fee || 0,
        },
      });
      window.dispatchEvent(event);
    }
  }, [selectedLocation, shippingMethods]);

  const handleLocationChange = (value: string) => {
    setSelectedLocation(value);
  };

  if (!shippingMethods || shippingMethods.length === 0) {
    return (
      <div>
        <Label className="mb-0.5 block text-xs sm:text-sm font-medium">
          {shippingMethodLabel}
        </Label>
        <p className="text-sm text-gray-500">
          No shipping methods available at this time.
        </p>
      </div>
    );
  }

  return (
    <div>
      <Label className="mb-0.5 sm:mb-1 block text-xs sm:text-sm font-medium">
        {shippingMethodLabel}
      </Label>
      <RadioGroup
        value={selectedLocation}
        onValueChange={handleLocationChange}
        className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-1.5"
        name="shippingLocation"
      >
        {shippingMethods.map((method) => (
          <Label
            key={method.id}
            htmlFor={method.id}
            className={`flex items-center justify-between rounded-md border bg-white p-2 sm:p-2.5 cursor-pointer transition-all hover:border-black ${selectedLocation === method.id ? "border-black ring-1 ring-black" : "border-gray-300"}`}
          >
            <div className="flex items-center space-x-2 sm:space-x-2.5">
              <RadioGroupItem
                value={method.id}
                id={method.id}
                className="w-4 h-4 flex items-center justify-center"
              />
              <span className="font-medium text-xs sm:text-sm">
                {method.name}
              </span>
            </div>
            <span className="text-xs sm:text-sm font-semibold">
              ৳{method.fee.toLocaleString()}
            </span>
          </Label>
        ))}
      </RadioGroup>
    </div>
  );
}
