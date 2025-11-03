import { useEffect, useRef, useState } from "react";
import { dayName, hours, weatherCodes } from "../constants/constants";

interface HourlyForecastProps {
  data: {
    time: Date[];
    temperature_2m: number[];
    weather_code: number[];
  };
  currentDate: Date;
}

interface DayDropdownProps {
  options: string[];
  selectedDay: number;
  setSelectedDay: React.Dispatch<React.SetStateAction<number>>;
}

export const HourlyForecast: React.FC<HourlyForecastProps> = ({
  data,
  currentDate,
}) => {
  const currentDateStamp = new Date(currentDate);
  const currentDay = currentDateStamp?.getUTCDay();
  const [dayOptions, setDayOptions] = useState<string[]>([]);
  const [selectedDay, setSelectedDay] = useState<number>(currentDay);

  useEffect(() => {
    if (
      currentDay !== null &&
      currentDay !== undefined &&
      !Number.isNaN(currentDay)
    ) {
      setSelectedDay(currentDay);
      setDayOptions(
        dayName.slice(currentDay).concat(dayName.slice(0, currentDay))
      );
    }
  }, [currentDay]);

  let currentDayTemp: number[] = [];
  let currentDayCode: number[] = [];
  let currentDayTime: string[] = [];
  data?.time.map((t, index) => {
    const date = new Date(t);
    if (date.getUTCDay() === selectedDay) {
      currentDayTemp = [...currentDayTemp, data.temperature_2m[index]];
      currentDayCode = [...currentDayCode, data.weather_code[index]];
      currentDayTime = [
        ...currentDayTime,
        date.toLocaleTimeString("en-US", { hour: "2-digit", hour12: true }),
      ];
    }
  });
  return (
    <div className="w-full h-full p-5 rounded-xl bg-[#25253F] border border-[#2b2b48] overflow-auto custom-scrollbar">
      <div className="justify-start items-center col text-left ">
        <div className="justify-between items-center flex flex-row">
          <h1
            className="text-[#e7e9ec] text-sm text-left font-bold"
            style={{ fontFamily: "dm-sans" }}
          >
            Hourly Forecast
          </h1>
          <div className="justify-end">
            <DayDropdown
              options={dayOptions}
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
            />
          </div>
        </div>

        {hours.map((time, index) => (
          <div
            key={index}
            className="flex justify-between p-2 h-14 bg-[#2f2f49] rounded-md mt-2 border border-[#363650] "
          >
            <div className="justify-start items-center flex-row flex gap-5">
              {currentDayCode.length > 0 && (
                <img
                  src={weatherCodes[currentDayCode[index]]}
                  alt="weather-icon"
                  className="h-auto w-10 "
                />
              )}
              <p
                className="text-[#e7e9ec] text-left text-lg"
                style={{ fontFamily: "bricolage-grotesque" }}
              >
                {currentDate ? time : ""}
              </p>
            </div>

            <p
              className="flex items-center text-[#e7e9ec] text-sm text-right mr-2"
              style={{ fontFamily: "bricolage-grotesque" }}
            >
              {currentDayTemp.length > 0
                ? `${Math.round(currentDayTemp[index])}\u00B0C`
                : ""}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const DayDropdown: React.FC<DayDropdownProps> = ({
  options,
  selectedDay,
  setSelectedDay,
}) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const dropdownContentRef = useRef<HTMLDivElement | null>(null);
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
  return (
    <div className="relative flex">
      <button
        ref={buttonRef}
        id="dayDropdownButton"
        onClick={toggleDropdown}
        className="text-[#a9a8b2] font-bold bg-[#3c3b5c] px-3 py-1.5 gap-2 rounded-sm text-sm text-center inline-flex items-center"
        type="button"
      >
        {options.length > 0 ? options[0] : "-"}
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
        id="DaydropdownContent"
        className="hidden absolute right-0 top-11 bg-[#25253f] border border-[#2a2a45] divide-y divide-gray-100 rounded-lg shadow-sm w-44 z-10"
      >
        <ul
          className="py-2 text-sm text-[#e7e9ec]"
          aria-labelledby="dropdownDividerButton"
          style={{ fontFamily: "dm-sans" }}
        >
          {options.map((option, index) => (
            <li key={`${option}-${index}`}>
              <a
                href="#"
                onClick={() => {
                  setSelectedDay(dayName.indexOf(option));
                  document
                    .getElementById("DaydropdownContent")
                    ?.classList.toggle("hidden");
                }}
                className={`block px-2 py-2 hover:bg-[#2f2f49] m-1 rounded-md ${
                  dayName[selectedDay] === option ? "bg-[#2f2f49]" : ""
                }`}
              >
                {option}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HourlyForecast;
