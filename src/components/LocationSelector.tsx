import { useState } from "react";
import { Label } from "./ui/label";
import CustomDropdown from "./CustomDropdown";
import SimpleDropdown from "./SimpleDropdown";
import { getAreas, getZones } from "../lib/apiRequest/shipping";
import type { LocationData } from "@/lib/interface";
// import { getZones, getAreas, type LocationData } from "@/lib/api";

// Use the LocationData type directly from api-client
interface LocationSelectorProps {
  cities: LocationData[];
  cityLabel?: string;
  zoneLabel?: string;
  areaLabel?: string;
  showAreaField?: boolean;
}

export default function LocationSelector({
  cities,
  cityLabel = "City",
  zoneLabel = "Zone",
  areaLabel = "Area (Optional)",
  showAreaField = true,
}: LocationSelectorProps) {
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedZone, setSelectedZone] = useState<string>("");
  const [selectedArea, setSelectedArea] = useState<string>("");
  const [zones, setZones] = useState<LocationData[]>([]);
  const [areas, setAreas] = useState<LocationData[]>([]);
  const [isLoadingZones, setIsLoadingZones] = useState<boolean>(false);
  const [isLoadingAreas, setIsLoadingAreas] = useState<boolean>(false);

  const loadZones = async (cityId: string) => {
    if (!cityId) return;
    setIsLoadingZones(true);
    try {
      const response = await getZones(cityId);
      if (response) {
        setZones(response);
      } else {
        setZones([]);
      }
    } catch (error) {
      console.error("Error loading zones:", error);
      setZones([]);
    } finally {
      setIsLoadingZones(false);
    }
  };

  const loadAreas = async (zoneId: string) => {
    if (!zoneId) return;
    setIsLoadingAreas(true);
    try {
      const response = await getAreas(zoneId);
      if (response) {
        setAreas(response);
      } else {
        setAreas([]);
      }
    } catch (error) {
      console.error("Error loading areas:", error);
      setAreas([]);
    } finally {
      setIsLoadingAreas(false);
    }
  };

  const handleCityChange = (value: string) => {
    setSelectedCity(value);
    setSelectedZone("");
    setSelectedArea("");
    setZones([]);
    setAreas([]);
    loadZones(value);
  };

  const handleZoneChange = (value: string) => {
    setSelectedZone(value);
    setSelectedArea("");
    setAreas([]);
    if (value) {
      loadAreas(value);
      // Dispatch a custom event when the zone is selected
      const selectedZoneData = zones.find((z) => z.id === value);
      const event = new CustomEvent("zone-selected", {
        detail: {
          zoneId: value,
          zoneName: selectedZoneData?.name || "",
        },
      });
      window.dispatchEvent(event);
    }
  };

  const handleAreaChange = (value: string) => {
    setSelectedArea(value);
  };

  // Convert data to dropdown options format
  const cityOptions = cities.map((city) => ({
    value: city.id,
    label: city.name,
  }));

  const zoneOptions = zones.map((zone) => ({
    value: zone.id,
    label: zone.name,
  }));

  const areaOptions = areas.map((area) => ({
    value: area.id,
    label: area.name,
  }));

  return (
    <div className="space-y-2.5">
      <div className="relative">
        <Label
          htmlFor="city"
          className="mb-0.5 block text-xs sm:text-sm font-medium"
        >
          {cityLabel} *
        </Label>
        <CustomDropdown
          id="city"
          name="city"
          placeholder="Select a city"
          options={cityOptions}
          value={selectedCity}
          onChange={handleCityChange}
          required
        />
      </div>

      <div className="relative">
        <Label
          htmlFor="zone"
          className="mb-0.5 block text-xs sm:text-sm font-medium"
        >
          {zoneLabel} *
        </Label>
        <CustomDropdown
          id="zone"
          name="zone"
          placeholder="Select a zone"
          options={zoneOptions}
          value={selectedZone}
          onChange={handleZoneChange}
          disabled={!selectedCity || isLoadingZones}
          required
        />
        {isLoadingZones && (
          <div className="absolute right-2.5 top-[calc(50%-0.5rem+2px)] h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        )}
      </div>

      {showAreaField && (
        <div className="relative">
          <Label
            htmlFor="area"
            className="mb-0.5 block text-xs sm:text-sm font-medium"
          >
            {areaLabel}
          </Label>
          <SimpleDropdown
            id="area"
            name="area"
            placeholder="Select an area (optional)"
            options={areaOptions}
            value={selectedArea}
            onChange={handleAreaChange}
            disabled={!selectedZone || isLoadingAreas}
            className="z-10"
          />
          {isLoadingAreas && (
            <div className="absolute right-2.5 top-[calc(50%-0.5rem+2px)] h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]">
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
