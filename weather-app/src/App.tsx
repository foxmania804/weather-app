import { useEffect, useState } from "react";
import axios from "axios";
import { fetchWeatherApi } from "openmeteo";
import "./App.css";
import { MainCard } from "./components/MainCard";
import { LogoHeader } from "./components/LogoHeader";
import { Header } from "./components/Header";
import { DayWeather } from "./components/DayWeather";
import { DayWiseWeather } from "./components/DayWiseWeather";
import { HourlyForecast } from "./components/HourlyForecast";
import { Search } from "./components/Search";
import {
  dayName,
  dayweatherImperial,
  dayweatherMetrics,
} from "./constants/constants";
import { ErrorMessage } from "./components/ErrorComponent";

interface dayWeatherProps {
  name: string;
  key_name: string;
  unit: string;
}

async function getCoordinatesForCity(cityName: string) {
  try {
    const response = await axios.get(
      `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1`
    );
    const data = response.data;

    if (data.results && data.results.length > 0) {
      const firstResult = data.results[0]; // Take the first result
      const latitude = firstResult.latitude;
      const longitude = firstResult.longitude;
      const country = firstResult.country;
      const city = firstResult.name;
      return { latitude, longitude, country, city };
    } else {
      console.warn(`No results found for city: ${cityName}`);
      return {
        message: `No search result found!`,
      };
    }
  } catch (error) {
    console.error("Error fetching geocoding data:", error);
    return null;
  }
}

async function fetchWeatherForCity(cityName: string, metrics: boolean) {
  const coords = await getCoordinatesForCity(cityName);
  if (coords && !coords.message) {
    try {
      const { latitude, longitude, country, city } = coords;
      let params = {};
      metrics
        ? (params = {
            latitude: latitude,
            longitude: longitude,
            daily: ["temperature_2m_max", "temperature_2m_min", "weather_code"],
            hourly: ["temperature_2m", "weather_code"],
            current: [
              "temperature_2m",
              "relative_humidity_2m",
              "precipitation",
              "wind_speed_10m",
              "apparent_temperature",
            ],
            timezone: "auto",
          })
        : (params = {
            latitude: latitude,
            longitude: longitude,
            daily: ["temperature_2m_max", "temperature_2m_min", "weather_code"],
            hourly: ["temperature_2m", "weather_code"],
            current: [
              "temperature_2m",
              "relative_humidity_2m",
              "precipitation",
              "wind_speed_10m",
              "apparent_temperature",
            ],
            wind_speed_unit: "mph",
            temperature_unit: "fahrenheit",
            precipitation_unit: "inch",
            timezone: "auto",
          });
      // Now use latitude and longitude in your Open-Meteo weather forecast API call
      // Example:
      const url = "https://api.open-meteo.com/v1/forecast";
      const responses = await fetchWeatherApi(url, params);
      const utcOffsetSeconds = responses[0].utcOffsetSeconds();
      const current = responses[0].current()!;
      const hourly = responses[0].hourly()!;
      const daily = responses[0].daily()!;
      const weatherData = {
        current: {
          time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
          temperature_2m: current.variables(0)!.value(),
          relative_humidity_2m: current.variables(1)!.value(),
          precipitation: current.variables(2)!.value(),
          wind_speed_10m: current.variables(3)!.value(),
          apparent_temperature: current.variables(4)!.value(),
        },
        hourly: {
          time: Array.from(
            {
              length:
                (Number(hourly.timeEnd()) - Number(hourly.time())) /
                hourly.interval(),
            },
            (_, i) =>
              new Date(
                (Number(hourly.time()) +
                  i * hourly.interval() +
                  utcOffsetSeconds) *
                  1000
              )
          ),
          temperature_2m: hourly.variables(0)!.valuesArray(),
          weather_code: hourly.variables(1)!.valuesArray(),
        },
        daily: {
          time: Array.from(
            {
              length:
                (Number(daily.timeEnd()) - Number(daily.time())) /
                daily.interval(),
            },
            (_, i) =>
              new Date(
                (Number(daily.time()) +
                  i * daily.interval() +
                  utcOffsetSeconds) *
                  1000
              )
          ),
          temperature_2m_max: daily.variables(0)!.valuesArray(),
          temperature_2m_min: daily.variables(1)!.valuesArray(),
          weather_code: daily.variables(2)!.valuesArray(),
        },
        country: country,
        cityName: city,
      };
      return weatherData;
    } catch {
      return {
        error:
          "We could'nt connect to the server (API error). Please try again in a few moments",
      };
    }
  }
  if (coords && coords.message) {
    return coords;
  }
  return {
    error: `We could'nt connect to the server (API error). Please try again in a few moments`,
  };
}

export const App: React.FC = () => {
  const [city, setCity] = useState<string>("New York");
  const [metrics, setMetrics] = useState<boolean>(true);
  const [dayweather, setDayweather] =
    useState<dayWeatherProps[]>(dayweatherMetrics);
  const [searchClick, setSearchClick] = useState<boolean>(false);
  const [retry, setRetry] = useState<boolean>(false);

  const [weatherData, setWeatherData] = useState<any>(null);

  // fetchWeatherForCity("Berlin").then((data) => setWeatherData(data));
  useEffect(() => {
    setWeatherData(null);
    setDayweather(metrics ? dayweatherMetrics : dayweatherImperial);
    fetchWeatherForCity(city, metrics).then((data) => setWeatherData(data));

    setSearchClick(false);
  }, [city, metrics, retry]);

  return (
    <div className="mb-5 2xl:mx-35 xl:mx-30 lg:mx-20 md:mx-10 mx-5">
      <LogoHeader metrics={metrics} setMetrics={setMetrics} />
      {!weatherData?.error && (
        <>
          <Header />
          <div className="flex justify-center">
            <Search
              setCity={setCity}
              searchClick={searchClick}
              setSearchClick={setSearchClick}
            />
          </div>
          {!weatherData?.message && (
            <div className="2xl:flex-row xl:flex-row justify-between flex lg:flex-col lg:col md:flex-col md:col flex-col col gap-y-5 gap-x-5">
              <div className="lg:w-full md:w-full w-full xl:w-3/5 2xl:w-3/5 mt-3 gap-y-5">
                {
                  <MainCard
                    cityName={weatherData?.cityName ?? null}
                    country={weatherData?.country ?? null}
                    date={weatherData?.current?.time ?? null}
                    temp={weatherData?.current?.temperature_2m ?? null}
                  />
                }
                <div className="gap-x-5 gap-y-5 flex mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4">
                  {dayweather.map((prop: dayWeatherProps) => (
                    <DayWeather
                      key={prop.name}
                      propName={prop.name}
                      data={
                        weatherData?.current
                          ? weatherData?.current[prop.key_name]
                          : null
                      }
                      unit={prop.unit}
                    />
                  ))}
                </div>
                <div className="row mt-4">
                  <h1 className="text-[#e7e9ec] text-md font-bold">
                    Daily Forecast
                  </h1>
                  <div className="flex flex-row gap-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-7">
                    {weatherData?.country
                      ? weatherData?.daily?.time.map(
                          (d: Date, index: number) => (
                            <DayWiseWeather
                              key={index}
                              day={d}
                              weather={weatherData?.daily.weather_code[index]}
                              max_temp={
                                weatherData?.daily.temperature_2m_max[index]
                              }
                              min_temp={
                                weatherData?.daily.temperature_2m_min[index]
                              }
                            />
                          )
                        )
                      : dayName.map((_, index: number) => (
                          <DayWiseWeather
                            key={index}
                            day={null}
                            weather={null}
                            max_temp={null}
                            min_temp={null}
                          />
                        ))}
                  </div>
                </div>
              </div>
              <div className="lg:w-full md:w-full w-full xl:w-2/5 2xl:w-2/5 mt-3 col h-127">
                <HourlyForecast
                  data={weatherData?.hourly}
                  currentDate={weatherData?.current?.time}
                />
              </div>
            </div>
          )}
          {weatherData?.message && (
            <div
              className="text-[#fdfdfc] text-xl grid justify-items-center mt-5 font-bold"
              style={{ fontFamily: "dm-sans" }}
            >
              <p>{weatherData.message}</p>
            </div>
          )}
        </>
      )}
      {weatherData?.error && (
        <ErrorMessage
          errorMessage={weatherData.error}
          retry={retry}
          setRetry={setRetry}
        />
      )}
    </div>
  );
};
