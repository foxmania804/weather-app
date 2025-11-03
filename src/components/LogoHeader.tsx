import { useEffect, useRef, useState } from "react";
import { unitData } from "../constants/constants";

interface LogoHeaderProps {
  metrics: boolean;
  setMetrics: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LogoHeader: React.FC<LogoHeaderProps> = ({
  metrics,
  setMetrics,
}) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const dropdownContentRef = useRef<HTMLDivElement | null>(null);
  const [tempUnit, setTempUnit] = useState<string>("Celcius (°C)");
  const [windSpeedUnit, setWindSpeedUnit] = useState<string>("km/h");
  const [precipitationUnit, setPrecipitaionUnit] =
    useState<string>("Millimeters (mm)");

  const getActiveUnit = (sectionName: string) => {
    switch (sectionName) {
      case "Temperature":
        return tempUnit;
      case "Wind Speed":
        return windSpeedUnit;
      case "Precipitation":
        return precipitationUnit;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownContentRef.current &&
        !dropdownContentRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        dropdownContentRef.current.classList.add("hidden");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    dropdownContentRef.current?.classList.toggle("hidden");
  };

  const toggleMetrics = (metrics: boolean) => {
    if (metrics) {
      setMetrics(false);
      setPrecipitaionUnit("Inches (in)");
      setTempUnit("Fahrenheit (°F)");
      setWindSpeedUnit("mph");
    } else {
      setMetrics(true);
      setPrecipitaionUnit("Millimeters (mm)");
      setTempUnit("Celcius (°C)");
      setWindSpeedUnit("km/h");
    }
  };

  return (
    <div className="mt-4 flex flex-row justify-between items-center relative">
      <img
        src="/src/assets/images/logo.svg"
        alt="logo"
        className="h-auto w-32 md:w-40 lg:w-40 xl:w-40 2xl:w-40"
      />
      <button
        ref={buttonRef}
        id="dropdownDividerButton"
        onClick={toggleDropdown}
        className="text-[#bdbcc8] bg-[#25253e] px-3 py-1.5 gap-2 rounded-lg text-sm text-center inline-flex items-center justify-center focus:outline-none focus:ring-1 focus:ring-offset-2"
        type="button"
      >
        <img src="/src/assets/images/icon-units.svg" alt="units" />
        Units
        <svg
          className="w-2.5 h-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      <div
        ref={dropdownContentRef}
        id="dropdownDivider"
        className="hidden absolute right-0 top-10 origin:top-right bg-[#25253e] rounded-lg shadow-sm w-50 pl-2 pr-2 z-10"
        style={{ fontFamily: "dm-sans" }}
      >
        <a
          href="#"
          onClick={() => toggleMetrics(metrics)}
          className={`block py-2 px-1 hover:bg-[#2f2f49] my-1 rounded-md text-[#e7e9ec] text-sm hover:border-[#fdfdfc] hover:border-1`}
        >
          {metrics ? `Switch to Imperial` : `Switch to Metrics`}
        </a>
        <div className="divide-y divide-[#4f4d65]">
          {unitData.map((item, index) => (
            <div key={`${index}-${item.sectionName}`}>
              <p className="text-[#706e83] text-xs font-bold mt-2 ">
                {item.sectionName}
              </p>
              <ul
                className="py-1 text-sm text-[#e7e9ec]"
                aria-labelledby="dropdownDividerButton"
              >
                {item.data.map((i) => (
                  <li key={`${index}-${item.sectionName}-${i}`}>
                    <a
                      href="#"
                      className={`block py-2 px-1 rounded-md ${
                        i === getActiveUnit(item.sectionName)
                          ? "bg-[#2f2f49]"
                          : ""
                      }`}
                    >
                      <div className="flex flex-row justify-between">
                        {i}
                        {i === getActiveUnit(item.sectionName) && (
                          <img
                            src="/src/assets/images/icon-checkmark.svg"
                            alt="selected unit"
                          />
                        )}
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
