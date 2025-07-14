import { c as createComponent, b as createAstro, a as renderComponent, e as renderScript, r as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../chunks/astro/server_DH_zCuNi.mjs';
import 'kleur/colors';
import { b as cn, c as createApiUrl, $ as $$Layout, B as Button } from '../chunks/Layout_BnXPpko-.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cva } from 'class-variance-authority';
import { f as fetchWithRetry } from '../chunks/authentication_BRtRS5JO.mjs';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { Circle } from 'lucide-react';
import { c as createOrder } from '../chunks/orders_xF5Gfnx_.mjs';
import { g as getProductBySlug } from '../chunks/dataFetching_CkgelruV.mjs';
/* empty css                                */
export { renderers } from '../renderers.mjs';

const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  LabelPrimitive.Root,
  {
    ref,
    className: cn(labelVariants(), className),
    ...props
  }
));
Label.displayName = LabelPrimitive.Root.displayName;

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    "textarea",
    {
      className: cn(
        "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ref,
      ...props
    }
  );
});
Textarea.displayName = "Textarea";

function CustomDropdown({
  options,
  placeholder,
  value,
  onChange,
  name,
  id,
  disabled = false,
  required = false,
  className = ""
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  const selectedOption = options.find((option) => option.value === value);
  const filteredOptions = options.filter(
    (option) => option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);
  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      setSearchTerm("");
    }
  };
  const handleSelect = (option) => {
    onChange(option.value);
    setIsOpen(false);
    setSearchTerm("");
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleKeyDown = (e) => {
    if (!isOpen) return;
    if (e.key === "Escape") {
      setIsOpen(false);
      setSearchTerm("");
    } else if (e.key === "Enter" && filteredOptions.length > 0) {
      handleSelect(filteredOptions[0]);
    }
  };
  return /* @__PURE__ */ jsxs("div", { ref: dropdownRef, className: `relative w-full ${className}`, children: [
    /* @__PURE__ */ jsx("input", { type: "hidden", name, value, required }),
    /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        id,
        className: `flex items-center justify-between w-full px-2.5 py-1.5 text-left bg-white border rounded-md h-8 sm:h-9 text-xs sm:text-sm ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-gray-50"}`,
        onClick: toggleDropdown,
        disabled,
        "aria-haspopup": "listbox",
        "aria-expanded": isOpen,
        children: [
          /* @__PURE__ */ jsx(
            "span",
            {
              className: `block truncate ${!selectedOption ? "text-gray-400" : ""}`,
              children: selectedOption ? selectedOption.label : placeholder
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "ml-2 pointer-events-none", children: /* @__PURE__ */ jsx(
            "svg",
            {
              className: `w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform ${isOpen ? "transform rotate-180" : ""}`,
              fill: "none",
              stroke: "currentColor",
              viewBox: "0 0 24 24",
              children: /* @__PURE__ */ jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: "2",
                  d: "M19 9l-7 7-7-7"
                }
              )
            }
          ) })
        ]
      }
    ),
    isOpen && /* @__PURE__ */ jsxs(
      "div",
      {
        className: "absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden",
        role: "listbox",
        onKeyDown: handleKeyDown,
        children: [
          /* @__PURE__ */ jsx("div", { className: "sticky top-0 p-1.5 bg-white border-b", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                ref: searchInputRef,
                type: "text",
                className: "w-full px-2 py-1 border rounded-md text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 h-8 sm:h-9",
                placeholder: `Search ${placeholder.toLowerCase()}`,
                value: searchTerm,
                onChange: handleSearchChange,
                onClick: (e) => e.stopPropagation()
              }
            ),
            searchTerm && /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                className: "absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5",
                onClick: () => setSearchTerm(""),
                children: /* @__PURE__ */ jsx(
                  "svg",
                  {
                    className: "w-3 h-3 sm:w-3.5 sm:h-3.5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /* @__PURE__ */ jsx(
                      "path",
                      {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: "2",
                        d: "M6 18L18 6M6 6l12 12"
                      }
                    )
                  }
                )
              }
            )
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "overflow-auto max-h-[200px] sm:max-h-[240px]", children: /* @__PURE__ */ jsx("ul", { className: "py-1", children: filteredOptions.length > 0 ? filteredOptions.map((option) => /* @__PURE__ */ jsx(
            "li",
            {
              className: `px-2.5 py-1 cursor-pointer hover:bg-gray-100 text-xs sm:text-sm ${option.value === value ? "bg-gray-100 font-medium" : ""}`,
              onClick: () => handleSelect(option),
              role: "option",
              "aria-selected": option.value === value,
              children: option.label
            },
            option.value
          )) : /* @__PURE__ */ jsx("li", { className: "px-2.5 py-1.5 text-gray-500 text-center text-xs sm:text-sm", children: "No options found" }) }) })
        ]
      }
    )
  ] });
}

function SimpleDropdown({
  options,
  placeholder,
  value,
  onChange,
  name,
  id,
  disabled = false,
  required = false,
  className = ""
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const selectedOption = options.find((option) => option.value === value);
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };
  const handleSelect = (option) => {
    onChange(option.value);
    setIsOpen(false);
  };
  const handleKeyDown = (e) => {
    if (!isOpen) return;
    if (e.key === "Escape") {
      setIsOpen(false);
    } else if (e.key === "Enter" && options.length > 0) {
      handleSelect(options[0]);
    }
  };
  return /* @__PURE__ */ jsxs("div", { ref: dropdownRef, className: `relative w-full ${className}`, children: [
    /* @__PURE__ */ jsx("input", { type: "hidden", name, value, required }),
    /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        id,
        className: `flex items-center justify-between w-full px-2.5 py-1.5 text-left bg-white border rounded-md h-8 sm:h-9 text-xs sm:text-sm ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-gray-50"}`,
        onClick: toggleDropdown,
        disabled,
        "aria-haspopup": "listbox",
        "aria-expanded": isOpen,
        children: [
          /* @__PURE__ */ jsx(
            "span",
            {
              className: `block truncate ${!selectedOption ? "text-gray-400" : ""}`,
              children: selectedOption ? selectedOption.label : placeholder
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "ml-2 pointer-events-none", children: /* @__PURE__ */ jsx(
            "svg",
            {
              className: `w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform ${isOpen ? "transform rotate-180" : ""}`,
              fill: "none",
              stroke: "currentColor",
              viewBox: "0 0 24 24",
              children: /* @__PURE__ */ jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: "2",
                  d: "M19 9l-7 7-7-7"
                }
              )
            }
          ) })
        ]
      }
    ),
    isOpen && /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg overflow-auto max-h-[160px] sm:max-h-[180px]",
        role: "listbox",
        onKeyDown: handleKeyDown,
        children: /* @__PURE__ */ jsx("ul", { className: "py-1", children: options.length > 0 ? options.map((option) => /* @__PURE__ */ jsx(
          "li",
          {
            className: `px-2.5 py-1 cursor-pointer hover:bg-gray-100 text-xs sm:text-sm ${option.value === value ? "bg-gray-100 font-medium" : ""}`,
            onClick: () => handleSelect(option),
            role: "option",
            "aria-selected": option.value === value,
            children: option.label
          },
          option.value
        )) : /* @__PURE__ */ jsx("li", { className: "px-2.5 py-1.5 text-gray-500 text-center text-xs sm:text-sm", children: "No options available" }) })
      }
    )
  ] });
}

async function getCities$1() {
  try {
    const url = createApiUrl("/locations/cities");
    const response = await fetchWithRetry(url, {}, 3, 8e3, false);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching cities:", error);
    return null;
  }
}
async function getZones(cityId) {
  if (!cityId) {
    console.error("getZones: cityId is required.");
    return null;
  }
  try {
    const url = createApiUrl(`/locations/zones?cityId=${cityId}`);
    const response = await fetchWithRetry(url, {}, 3, 8e3, false);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(`Error fetching zones for city "${cityId}":`, error);
    return null;
  }
}
async function getAreas(zoneId) {
  if (!zoneId) {
    console.error("getAreas: zoneId is required.");
    return null;
  }
  try {
    const url = createApiUrl(`/locations/areas?zoneId=${zoneId}`);
    const response = await fetchWithRetry(url, {}, 3, 8e3, false);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(`Error fetching areas for zone "${zoneId}":`, error);
    return null;
  }
}
async function getShippingMethods() {
  try {
    const url = createApiUrl("/shipping-methods");
    const response = await fetchWithRetry(url, {}, 3, 8e3, false);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    return data.shippingMethods;
  } catch (error) {
    console.error("Error fetching shipping methods:", error);
    return null;
  }
}

function LocationSelector({
  cities,
  cityLabel = "City",
  zoneLabel = "Zone",
  areaLabel = "Area (Optional)",
  showAreaField = true
}) {
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedZone, setSelectedZone] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [zones, setZones] = useState([]);
  const [areas, setAreas] = useState([]);
  const [isLoadingZones, setIsLoadingZones] = useState(false);
  const [isLoadingAreas, setIsLoadingAreas] = useState(false);
  const loadZones = async (cityId) => {
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
  const loadAreas = async (zoneId) => {
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
  const handleCityChange = (value) => {
    setSelectedCity(value);
    setSelectedZone("");
    setSelectedArea("");
    setZones([]);
    setAreas([]);
    loadZones(value);
  };
  const handleZoneChange = (value) => {
    setSelectedZone(value);
    setSelectedArea("");
    setAreas([]);
    if (value) {
      loadAreas(value);
      const selectedZoneData = zones.find((z) => z.id === value);
      const event = new CustomEvent("zone-selected", {
        detail: {
          zoneId: value,
          zoneName: selectedZoneData?.name || ""
        }
      });
      window.dispatchEvent(event);
    }
  };
  const handleAreaChange = (value) => {
    setSelectedArea(value);
  };
  const cityOptions = cities.map((city) => ({
    value: city.id,
    label: city.name
  }));
  const zoneOptions = zones.map((zone) => ({
    value: zone.id,
    label: zone.name
  }));
  const areaOptions = areas.map((area) => ({
    value: area.id,
    label: area.name
  }));
  return /* @__PURE__ */ jsxs("div", { className: "space-y-2.5", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxs(
        Label,
        {
          htmlFor: "city",
          className: "mb-0.5 block text-xs sm:text-sm font-medium",
          children: [
            cityLabel,
            " *"
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        CustomDropdown,
        {
          id: "city",
          name: "city",
          placeholder: "Select a city",
          options: cityOptions,
          value: selectedCity,
          onChange: handleCityChange,
          required: true
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxs(
        Label,
        {
          htmlFor: "zone",
          className: "mb-0.5 block text-xs sm:text-sm font-medium",
          children: [
            zoneLabel,
            " *"
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        CustomDropdown,
        {
          id: "zone",
          name: "zone",
          placeholder: "Select a zone",
          options: zoneOptions,
          value: selectedZone,
          onChange: handleZoneChange,
          disabled: !selectedCity || isLoadingZones,
          required: true
        }
      ),
      isLoadingZones && /* @__PURE__ */ jsx("div", { className: "absolute right-2.5 top-[calc(50%-0.5rem+2px)] h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]", children: /* @__PURE__ */ jsx("span", { className: "!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]", children: "Loading..." }) })
    ] }),
    showAreaField && /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx(
        Label,
        {
          htmlFor: "area",
          className: "mb-0.5 block text-xs sm:text-sm font-medium",
          children: areaLabel
        }
      ),
      /* @__PURE__ */ jsx(
        SimpleDropdown,
        {
          id: "area",
          name: "area",
          placeholder: "Select an area (optional)",
          options: areaOptions,
          value: selectedArea,
          onChange: handleAreaChange,
          disabled: !selectedZone || isLoadingAreas,
          className: "z-10"
        }
      ),
      isLoadingAreas && /* @__PURE__ */ jsx("div", { className: "absolute right-2.5 top-[calc(50%-0.5rem+2px)] h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]", children: /* @__PURE__ */ jsx("span", { className: "!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]", children: "Loading..." }) })
    ] })
  ] });
}

const RadioGroup = React.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    RadioGroupPrimitive.Root,
    {
      className: cn("grid gap-2", className),
      ...props,
      ref
    }
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;
const RadioGroupItem = React.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    RadioGroupPrimitive.Item,
    {
      ref,
      className: cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(RadioGroupPrimitive.Indicator, { className: "flex items-center justify-center", children: /* @__PURE__ */ jsx(Circle, { className: "h-3.5 w-3.5 fill-primary" }) })
    }
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

function ShippingLocationSelector({
  shippingMethods,
  shippingMethodLabel = "Choose Delivery Option"
}) {
  const [selectedLocation, setSelectedLocation] = useState(
    shippingMethods.length > 0 ? shippingMethods[0].id : void 0
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
          fee: shippingMethods.find((sm) => sm.id === selectedLocation)?.fee || 0
        }
      });
      window.dispatchEvent(event);
    }
  }, [selectedLocation, shippingMethods]);
  const handleLocationChange = (value) => {
    setSelectedLocation(value);
  };
  if (!shippingMethods || shippingMethods.length === 0) {
    return /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Label, { className: "mb-0.5 block text-xs sm:text-sm font-medium", children: shippingMethodLabel }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "No shipping methods available at this time." })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(Label, { className: "mb-0.5 sm:mb-1 block text-xs sm:text-sm font-medium", children: shippingMethodLabel }),
    /* @__PURE__ */ jsx(
      RadioGroup,
      {
        value: selectedLocation,
        onValueChange: handleLocationChange,
        className: "grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-1.5",
        name: "shippingLocation",
        children: shippingMethods.map((method) => /* @__PURE__ */ jsxs(
          Label,
          {
            htmlFor: method.id,
            className: `flex items-center justify-between rounded-md border bg-white p-2 sm:p-2.5 cursor-pointer transition-all hover:border-black ${selectedLocation === method.id ? "border-black ring-1 ring-black" : "border-gray-300"}`,
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 sm:space-x-2.5", children: [
                /* @__PURE__ */ jsx(
                  RadioGroupItem,
                  {
                    value: method.id,
                    id: method.id,
                    className: "w-4 h-4 flex items-center justify-center"
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "font-medium text-xs sm:text-sm", children: method.name })
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "text-xs sm:text-sm font-semibold", children: [
                "৳",
                method.fee.toLocaleString()
              ] })
            ]
          },
          method.id
        ))
      }
    )
  ] });
}

async function validateDiscount(code, total, items, shippingCost, customerPhone) {
  if (!code || !code.trim()) {
    console.error("validateDiscount: code is required.");
    return null;
  }
  try {
    const params = new URLSearchParams({ code });
    if (total !== void 0) params.append("total", String(total));
    if (shippingCost !== void 0)
      params.append("shippingCost", String(shippingCost));
    if (customerPhone) params.append("customerPhone", customerPhone);
    if (items && items.length > 0) {
      params.append("items", JSON.stringify(items));
    }
    const url = createApiUrl(`/discounts/validate?${params.toString()}`);
    const response = await fetchWithRetry(url, {}, 2, 8e3, false);
    if (!response.ok) {
      const errorData = await response.json();
      return errorData;
    }
    return await response.json();
  } catch (error) {
    console.error(`Error validating discount code "${code}":`, error);
    return {
      valid: false,
      error: "An unexpected error occurred while validating the discount."
    };
  }
}
async function recordDiscountUsage(discountId, orderId, customerId, amountDiscounted) {
  try {
    const url = createApiUrl("/discounts/usage");
    const payload = {
      discountId,
      orderId,
      customerId,
      amountDiscounted
    };
    const response = await fetchWithRetry(
      url,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      },
      2,
      8e3,
      true
    );
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to record discount usage:", errorText);
      return false;
    }
    console.log(
      `Successfully recorded usage for discount ${discountId} on order ${orderId}.`
    );
    return true;
  } catch (error) {
    console.error(
      `Error recording discount usage for discount ID "${discountId}":`,
      error
    );
    return false;
  }
}

async function getCities() {
  try {
    const citiesData = await getCities$1();
    return citiesData || [];
  } catch (error) {
    console.error("Failed to fetch cities from API via library:", error);
    return [];
  }
}
async function processOrder(formData) {
  try {
    const customerName = formData.get("customerName");
    let customerPhone = formData.get("customerPhone").replace(/^\+?880/, "").trim();
    if (customerPhone.startsWith("1")) {
      customerPhone = "0" + customerPhone;
    }
    const customerEmail = formData.get("customerEmail") || null;
    const shippingAddress = formData.get("shippingAddress");
    const cityId = formData.get("city");
    const zoneId = formData.get("zone");
    const areaId = formData.get("area") || null;
    const notes = formData.get("notes") || null;
    const cartItemsJson = formData.get("cartItems");
    const shippingLocationId = formData.get("shippingLocation");
    const discountJson = formData.get("discountCodeHidden");
    const cartItems = JSON.parse(cartItemsJson);
    const cartItemsArray = Object.values(cartItems);
    if (!customerName || !customerPhone || !shippingAddress || !cityId || !zoneId || !shippingLocationId || cartItemsArray.length === 0) {
      throw new Error(
        "Please fill in all required fields and add items to your cart."
      );
    }
    if (!/^01[3-9]\d{8}$/.test(customerPhone)) {
      throw new Error("Please enter a valid Bangladeshi phone number");
    }
    let cityName = null;
    let zoneName = null;
    let areaName = null;
    try {
      const allCities = await getCities$1();
      const city = allCities?.find((c) => c.id === cityId);
      if (city) cityName = city.name;
      if (zoneId) {
        const allZones = await getZones(cityId);
        const zone = allZones?.find((z) => z.id === zoneId);
        if (zone) zoneName = zone.name;
      }
      if (areaId && zoneId) {
        const allAreas = await getAreas(zoneId);
        const area = allAreas?.find((a) => a.id === areaId);
        if (area) areaName = area.name;
      }
    } catch (locationError) {
      console.error("Error fetching location names:", locationError);
    }
    let shippingCharge = 0;
    const allShippingMethods = await getShippingMethods();
    const selectedMethod = allShippingMethods?.find(
      (method) => method.id === shippingLocationId
    );
    if (selectedMethod) {
      shippingCharge = selectedMethod.fee;
    } else {
      throw new Error("Invalid shipping method selected.");
    }
    const productPromises = cartItemsArray.map(
      (item) => getProductBySlug(item.slug || item.id)
    );
    const productDataResults = await Promise.all(productPromises);
    const processedItems = [];
    let subtotal = 0;
    for (let i = 0; i < cartItemsArray.length; i++) {
      const item = cartItemsArray[i];
      const productData = productDataResults[i];
      if (!productData) {
        throw new Error(`Product "${item.name}" is no longer available.`);
      }
      const { product, variants } = productData;
      let finalPrice = product.discountedPrice;
      let variantId = null;
      let availableStock = 0;
      if (item.variantId && item.variantId !== "default") {
        const variant = variants.find((v) => v.id === item.variantId);
        if (variant) {
          variantId = variant.id;
          finalPrice = variant.price || product.price;
          if (product.discountPercentage > 0) {
            finalPrice = Math.round(
              finalPrice * (1 - product.discountPercentage / 100)
            );
          }
          availableStock = variant.stock;
        } else {
          throw new Error(
            `Selected variant for "${product.name}" is no longer available.`
          );
        }
      } else {
        availableStock = variants.reduce((sum, v) => sum + v.stock, 0);
      }
      if (availableStock < item.quantity) {
        throw new Error(
          `Insufficient stock for ${product.name}. Available: ${availableStock}, Requested: ${item.quantity}`
        );
      }
      subtotal += finalPrice * item.quantity;
      processedItems.push({
        productId: product.id,
        variantId,
        quantity: item.quantity,
        price: finalPrice
      });
    }
    let discountId = null;
    let discountAmount = null;
    let discountCode = null;
    let finalNotes = notes || "";
    if (discountJson) {
      const discountData = JSON.parse(discountJson);
      const validationResult = await validateDiscount(
        discountData.code,
        subtotal,
        Object.values(cartItems),
        shippingCharge,
        customerPhone
      );
      if (!validationResult?.valid) {
        throw new Error(
          validationResult?.error || "The applied discount is no longer valid."
        );
      }
      discountId = validationResult.discount?.id || null;
      discountAmount = validationResult.discountAmount || null;
      discountCode = validationResult.discount?.code || null;
      if (discountAmount && discountCode) {
        const note = `[Discount Applied: ${discountCode} (-৳${discountAmount})]`;
        finalNotes = finalNotes ? `${finalNotes}
${note}` : note;
      }
    }
    const payload = {
      customerName,
      customerPhone,
      customerEmail,
      shippingAddress,
      city: cityId,
      zone: zoneId,
      area: areaId,
      cityName,
      zoneName,
      areaName,
      notes: finalNotes,
      items: processedItems,
      shippingCharge,
      discountAmount
    };
    const result = await createOrder(payload);
    if (result.success && result.orderId && discountId && discountAmount && discountAmount > 0) {
      await recordDiscountUsage(
        discountId,
        result.orderId,
        null,
        discountAmount
      );
    }
    return result;
  } catch (error) {
    console.error("Order processing failed:", error);
    return {
      success: false,
      error: error instanceof Error ? { message: error.message } : { message: "An unexpected error occurred" }
    };
  }
}

async function getActiveCheckoutLanguage() {
  try {
    const url = createApiUrl("/checkout-languages/active");
    const response = await fetchWithRetry(url, {}, 3, 8e3, false);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    return data.language;
  } catch (error) {
    console.error("Error fetching active checkout language:", error);
    return null;
  }
}

const $$Astro = createAstro();
const $$Cart = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Cart;
  const cities = await getCities();
  const shippingMethodsResponse = await getShippingMethods();
  const shippingMethods = shippingMethodsResponse || [];
  const checkoutLanguageResponse = await getActiveCheckoutLanguage();
  const lang = checkoutLanguageResponse || {
    languageData: {
      pageTitle: "Cart & Checkout",
      checkoutSectionTitle: "Checkout Information",
      cartSectionTitle: "Shopping Cart",
      customerNameLabel: "Full Name",
      customerNamePlaceholder: "Enter your full name",
      customerPhoneLabel: "Phone Number",
      customerPhonePlaceholder: "01XXXXXXXXX",
      customerPhoneHelp: "Example: 01712345678",
      customerEmailLabel: "Email (Optional)",
      customerEmailPlaceholder: "Enter your email address",
      shippingAddressLabel: "Delivery Address",
      shippingAddressPlaceholder: "Enter your full delivery address",
      cityLabel: "City",
      zoneLabel: "Zone",
      areaLabel: "Area (Optional)",
      shippingMethodLabel: "Choose Delivery Option",
      orderNotesLabel: "Order Notes (Optional)",
      orderNotesPlaceholder: "Any special instructions for your order?",
      continueShoppingText: "Continue Shopping",
      subtotalText: "Subtotal",
      shippingText: "Shipping",
      discountText: "Discount",
      totalText: "Total",
      discountCodePlaceholder: "Discount code",
      applyDiscountText: "Apply",
      removeDiscountText: "Remove",
      placeOrderText: "Place Order",
      processingText: "Processing...",
      termsText: "By placing this order, you agree to our Terms of Service and Privacy Policy",
      processingOrderTitle: "Processing Your Order",
      processingOrderMessage: "Please wait while we process your order.",
      requiredFieldIndicator: "*"
    },
    fieldVisibility: {
      showEmailField: true,
      showOrderNotesField: true,
      showAreaField: true
    }};
  let errorMessage = "";
  let successOrderId = "";
  let isProcessing = false;
  if (Astro2.request.method === "POST") {
    try {
      isProcessing = true;
      const formData = await Astro2.request.formData();
      const cartItems = formData.get("cartItems");
      if (!cartItems || cartItems === "{}" || cartItems === "[]") {
        throw new Error(
          "Your cart is empty. Please add items to your cart before placing an order."
        );
      }
      const result = await processOrder(formData);
      if (result.success && result.orderId) {
        successOrderId = result.orderId;
        return Astro2.redirect(`/order-success?orderId=${result.orderId}`);
      } else {
        console.error("Order processing failed:", result.error);
        errorMessage = result.error?.message || "Failed to process order. Please try again.";
      }
    } catch (error) {
      console.error("Order creation failed:", error);
      errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    } finally {
      isProcessing = false;
    }
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": lang.languageData.pageTitle, "data-astro-cid-h3zw4u6d": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="container max-w-6xl mx-auto px-2 pt-2 pb-3 sm:px-3 sm:pt-2 sm:pb-3" data-astro-cid-h3zw4u6d> ${errorMessage && renderTemplate`<div class="bg-red-100 border border-red-400 text-red-700 px-3 py-2 sm:px-4 sm:py-3 rounded mb-2 sm:mb-2.5 relative text-xs sm:text-sm" role="alert" data-astro-cid-h3zw4u6d> <strong class="font-bold" data-astro-cid-h3zw4u6d>Error: </strong> <span class="block sm:inline" data-astro-cid-h3zw4u6d>${errorMessage}</span> </div>`} ${successOrderId && renderTemplate`<div class="bg-green-100 border border-green-400 text-green-700 px-3 py-2 sm:px-4 sm:py-3 rounded mb-2 sm:mb-2.5 relative text-xs sm:text-sm" role="alert" data-astro-cid-h3zw4u6d> <strong class="font-bold" data-astro-cid-h3zw4u6d>Success! </strong> <span class="block sm:inline" data-astro-cid-h3zw4u6d>
Your order has been placed successfully. Order ID: ${successOrderId} </span> </div>`} <div class="flex gap-2 sm:gap-2.5" data-astro-cid-h3zw4u6d> <!-- Cart Items Section - Now top on mobile, right on desktop --> <div class="lg:w-2/5 lg:sticky lg:top-2.5 lg:self-start order-1 lg:order-1" data-astro-cid-h3zw4u6d> <div class="bg-gray-50 rounded-lg p-2 sm:p-2.5 space-y-1.5 sm:space-y-2" data-astro-cid-h3zw4u6d> <div class="flex items-center justify-between" data-astro-cid-h3zw4u6d> <h2 class="text-base sm:text-lg font-bold" data-astro-cid-h3zw4u6d> ${lang.languageData.cartSectionTitle} </h2> <a href="/" class="text-xs text-gray-600 hover:text-black" data-astro-cid-h3zw4u6d> ${lang.languageData.continueShoppingText} </a> </div> <div class="divide-y" id="cartItems" data-astro-cid-h3zw4u6d> <!-- Cart items will be rendered here by JavaScript --> </div> <div class="space-y-0.5 pt-1.5 sm:pt-2 border-t" data-astro-cid-h3zw4u6d> <div class="flex justify-between text-xs sm:text-sm" data-astro-cid-h3zw4u6d> <span data-astro-cid-h3zw4u6d>${lang.languageData.subtotalText}</span> <span id="subtotal" data-astro-cid-h3zw4u6d>৳0</span> </div> <div class="flex justify-between text-xs sm:text-sm" data-astro-cid-h3zw4u6d> <span data-astro-cid-h3zw4u6d>${lang.languageData.shippingText}</span> <span id="shippingCost" data-astro-cid-h3zw4u6d>৳0</span> </div> <div class="flex justify-between text-xs sm:text-sm text-green-600" id="discountRow" data-astro-cid-h3zw4u6d> <span data-astro-cid-h3zw4u6d>${lang.languageData.discountText} (<span id="appliedDiscountCode" data-astro-cid-h3zw4u6d></span>)</span> <span id="discountAmount" data-astro-cid-h3zw4u6d>-৳0</span> </div> <div class="flex justify-between font-bold text-base sm:text-lg" data-astro-cid-h3zw4u6d> <span data-astro-cid-h3zw4u6d>${lang.languageData.totalText}</span> <span id="total" data-astro-cid-h3zw4u6d>৳0</span> </div> <!-- Discount Code Form --> <div class="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t" data-astro-cid-h3zw4u6d> <form id="discountForm" class="space-y-1 sm:space-y-1.5" data-astro-cid-h3zw4u6d> <div class="flex space-x-1 sm:space-x-1.5" data-astro-cid-h3zw4u6d> <input type="text" id="discountCodeInput"${addAttribute(lang.languageData.discountCodePlaceholder, "placeholder")} class="flex-1 px-2 py-1 sm:px-2.5 sm:py-1.5 border border-gray-300 rounded-md text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-black h-8 sm:h-9" data-astro-cid-h3zw4u6d> <button type="submit" id="applyDiscountBtn" class="px-2 py-1 sm:px-2.5 sm:py-1.5 bg-black text-white text-xs sm:text-sm font-medium rounded-md hover:bg-gray-800 h-8 sm:h-9" data-astro-cid-h3zw4u6d> ${lang.languageData.applyDiscountText} </button> <button type="button" id="removeDiscountBtn" onclick="window.removeDiscountCode()" class="px-2 py-1 sm:px-2.5 sm:py-1.5 bg-red-600 text-white text-xs sm:text-sm font-medium rounded-md hover:bg-red-700 h-8 sm:h-9" style="display: none;" data-astro-cid-h3zw4u6d> ${lang.languageData.removeDiscountText} </button> </div> <div id="discountMessage" class="text-red-600 text-sm mt-1" style="display: none;" data-astro-cid-h3zw4u6d></div> </form> </div> </div> </div> </div> <!-- Checkout Form Section - Now bottom on mobile, left on desktop --> <div class="" data-astro-cid-h3zw4u6d> <div class="bg-gray-50 rounded-lg p-2 sm:p-2.5 relative" data-astro-cid-h3zw4u6d> <h2 class="text-base sm:text-lg font-bold mb-2 sm:mb-2.5" data-astro-cid-h3zw4u6d> ${lang.languageData.checkoutSectionTitle} </h2> <form method="POST" class="space-y-2 sm:space-y-2.5" id="checkoutForm" data-astro-cid-h3zw4u6d> <input type="hidden" name="cartItems" id="cartItemsInput" data-astro-cid-h3zw4u6d> <input type="hidden" name="discountCodeHidden" id="discountCodeHidden" data-astro-cid-h3zw4u6d> <div class="grid gap-2 sm:gap-2.5 sm:grid-cols-2" data-astro-cid-h3zw4u6d> <div data-astro-cid-h3zw4u6d> ${renderComponent($$result2, "Label", Label, { "htmlFor": "customerName", "className": "mb-0.5 block text-xs sm:text-sm font-medium", "data-astro-cid-h3zw4u6d": true }, { "default": async ($$result3) => renderTemplate`${lang.languageData.customerNameLabel}${lang.languageData.requiredFieldIndicator}` })} ${renderComponent($$result2, "Input", Input, { "type": "text", "id": "customerName", "name": "customerName", "required": true, "placeholder": lang.languageData.customerNamePlaceholder, "className": "w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs sm:text-sm px-2 py-1 sm:px-2.5 sm:py-1.5 h-8 sm:h-9", "data-astro-cid-h3zw4u6d": true })} </div> <div data-astro-cid-h3zw4u6d> ${renderComponent($$result2, "Label", Label, { "htmlFor": "customerPhone", "className": "mb-0.5 block text-xs sm:text-sm font-medium", "data-astro-cid-h3zw4u6d": true }, { "default": async ($$result3) => renderTemplate`${lang.languageData.customerPhoneLabel}${lang.languageData.requiredFieldIndicator}` })} ${renderComponent($$result2, "Input", Input, { "type": "tel", "id": "customerPhone", "name": "customerPhone", "required": true, "placeholder": lang.languageData.customerPhonePlaceholder, "className": "w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs sm:text-sm px-2 py-1 sm:px-2.5 sm:py-1.5 h-8 sm:h-9", "data-astro-cid-h3zw4u6d": true })} <p class="text-xs text-gray-500 mt-0.5" data-astro-cid-h3zw4u6d> ${lang.languageData.customerPhoneHelp} </p> </div> ${lang.fieldVisibility.showEmailField && renderTemplate`<div class="sm:col-span-2" data-astro-cid-h3zw4u6d> ${renderComponent($$result2, "Label", Label, { "htmlFor": "customerEmail", "className": "mb-0.5 block text-xs sm:text-sm font-medium", "data-astro-cid-h3zw4u6d": true }, { "default": async ($$result3) => renderTemplate`${lang.languageData.customerEmailLabel}` })} ${renderComponent($$result2, "Input", Input, { "type": "email", "id": "customerEmail", "name": "customerEmail", "placeholder": lang.languageData.customerEmailPlaceholder, "className": "w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs sm:text-sm px-2 py-1 sm:px-2.5 sm:py-1.5 h-8 sm:h-9", "data-astro-cid-h3zw4u6d": true })} </div>`} <div class="sm:col-span-2" data-astro-cid-h3zw4u6d> ${renderComponent($$result2, "Label", Label, { "htmlFor": "shippingAddress", "className": "mb-0.5 block text-xs sm:text-sm font-medium", "data-astro-cid-h3zw4u6d": true }, { "default": async ($$result3) => renderTemplate`${lang.languageData.shippingAddressLabel}${lang.languageData.requiredFieldIndicator}` })} ${renderComponent($$result2, "Textarea", Textarea, { "id": "shippingAddress", "name": "shippingAddress", "required": true, "placeholder": lang.languageData.shippingAddressPlaceholder, "rows": 2, "className": "w-full resize-none border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs sm:text-sm px-2 py-1 sm:px-2.5 sm:py-1.5 min-h-[4rem] sm:min-h-[4.5rem]", "data-astro-cid-h3zw4u6d": true })} </div> <div class="sm:col-span-2" data-astro-cid-h3zw4u6d> ${renderComponent($$result2, "ShippingLocationSelector", ShippingLocationSelector, { "client:load": true, "shippingMethods": shippingMethods, "shippingMethodLabel": lang.languageData.shippingMethodLabel, "client:component-hydration": "load", "client:component-path": "@/components/ShippingLocationSelector", "client:component-export": "default", "data-astro-cid-h3zw4u6d": true })} </div> <div class="sm:col-span-2 z-40" data-astro-cid-h3zw4u6d> ${renderComponent($$result2, "LocationSelector", LocationSelector, { "client:load": true, "cities": cities, "cityLabel": lang.languageData.cityLabel, "zoneLabel": lang.languageData.zoneLabel, "areaLabel": lang.languageData.areaLabel, "showAreaField": lang.fieldVisibility.showAreaField, "client:component-hydration": "load", "client:component-path": "@/components/LocationSelector", "client:component-export": "default", "data-astro-cid-h3zw4u6d": true })} </div> ${lang.fieldVisibility.showOrderNotesField && renderTemplate`<div class="sm:col-span-2" data-astro-cid-h3zw4u6d> ${renderComponent($$result2, "Label", Label, { "htmlFor": "notes", "className": "mb-0.5 block text-xs sm:text-sm font-medium", "data-astro-cid-h3zw4u6d": true }, { "default": async ($$result3) => renderTemplate`${lang.languageData.orderNotesLabel}` })} ${renderComponent($$result2, "Textarea", Textarea, { "id": "notes", "name": "notes", "placeholder": lang.languageData.orderNotesPlaceholder, "rows": 2, "className": "w-full resize-none border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs sm:text-sm px-2 py-1 sm:px-2.5 sm:py-1.5 min-h-[4rem] sm:min-h-[4.5rem]", "data-astro-cid-h3zw4u6d": true })} </div>`} </div> <div class="pt-1 sm:pt-1.5" data-astro-cid-h3zw4u6d> ${renderComponent($$result2, "Button", Button, { "type": "submit", "className": "w-full bg-black text-white font-bold py-1.5 sm:py-2 rounded-md shadow-sm hover:bg-gray-800 transition-all duration-200 text-sm h-9 sm:h-10", "id": "submitButton", "disabled": isProcessing, "data-astro-cid-h3zw4u6d": true }, { "default": async ($$result3) => renderTemplate`${isProcessing ? lang.languageData.processingText : lang.languageData.placeOrderText}` })} <p class="text-xs text-gray-500 text-center mt-1.5 sm:mt-2" data-astro-cid-h3zw4u6d> ${lang.languageData.termsText} </p> </div> </form> </div> </div> </div> </main> ` })} <!-- Loading overlay - will be shown via JavaScript --> <div id="loadingOverlay" style="display: none; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.8); z-index: 99999; backdrop-filter: blur(4px);" data-astro-cid-h3zw4u6d> <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 20px; border-radius: 8px; text-align: center; width: 280px; box-shadow: 0 4px 10px rgba(0,0,0,0.2);" data-astro-cid-h3zw4u6d> <div style="margin: 0 auto 15px; width: 48px; height: 48px; border: 4px solid #f3f3f3; border-top: 4px solid #000; border-radius: 50%; animation: spin 1s linear infinite;" data-astro-cid-h3zw4u6d></div> <h3 style="margin: 0 0 8px; font-size: 16px; font-weight: bold;" data-astro-cid-h3zw4u6d> ${lang.languageData.processingOrderTitle} </h3> <p style="margin: 0 0 12px; font-size: 13px; color: #666;" data-astro-cid-h3zw4u6d> ${lang.languageData.processingOrderMessage} </p> <div style="width: 100%; height: 5px; background: #f3f3f3; border-radius: 2.5px; overflow: hidden;" data-astro-cid-h3zw4u6d> <div id="loadingProgressBar" style="width: 0%; height: 100%; background: #000; transition: width 0.5s;" data-astro-cid-h3zw4u6d></div> </div> </div> </div> ${renderScript($$result, "C:/Projects/astro-ecommerce/prime-wear/src/pages/cart.astro?astro&type=script&index=0&lang.ts")} `;
}, "C:/Projects/astro-ecommerce/prime-wear/src/pages/cart.astro", void 0);

const $$file = "C:/Projects/astro-ecommerce/prime-wear/src/pages/cart.astro";
const $$url = "/cart";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Cart,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
