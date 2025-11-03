import { weatherCodes } from "../constants/constants";

interface DayWiseWeatherProps {
  day: Date | null;
  weather: number | null;
  max_temp: number | null;
  min_temp: number | null;
}

export const DayWiseWeather: React.FC<DayWiseWeatherProps> = ({
  day,
  weather,
  max_temp,
  min_temp,
}) => {
  let newDate;
  day ? (newDate = new Date(day)) : null;
  return (
    <div className="w-full h-35 pt-4 rounded-lg bg-[#25253e] border border-[#2b2b48] mt-2">
      <div className="justify-start items-center col text-left">
        <h5
          className="text-[#c1c0ce] text-sm text-center font-bold"
          style={{ fontFamily: "dm-sans" }}
        >
          {newDate ? newDate.toDateString().split(" ")[0] : ""}
        </h5>
        {weather !== null && weather !== undefined && (
          <img
            src={weatherCodes[weather]}
            alt="weather-icon"
            className="h-auto w-14 mx-auto mt-1"
          />
        )}
        <div className="flex justify-between p-2">
          <p
            className="text-[#e7e9ec] text-sm text-left"
            style={{ fontFamily: "bricolage-grotesque" }}
          >
            {max_temp ? `${Math.round(max_temp)}\u00B0C` : ""}
          </p>
          <p
            className="text-[#e7e9ec] text-sm text-right"
            style={{ fontFamily: "bricolage-grotesque" }}
          >
            {min_temp ? `${Math.round(min_temp)}\u00B0C` : ""}
          </p>
        </div>
      </div>
    </div>
  );
};
