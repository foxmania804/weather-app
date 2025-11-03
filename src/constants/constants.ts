import SunnyWeather from "../assets/images/icon-sunny.webp";
import PartlyCloudyWeather from "../assets/images/icon-partly-cloudy.webp";
import Overcast from "../assets/images/icon-overcast.webp";
import Fog from "../assets/images/icon-fog.webp";
import Drizzle from "../assets/images/icon-drizzle.webp";
import Snowy from "../assets/images/icon-snow.webp";
import Rain from "../assets/images/icon-rain.webp";
import Storm from "../assets/images/icon-storm.webp";

export const dayweatherMetrics = [
  { name: "Feels Like", key_name: "apparent_temperature", unit: "°" },
  { name: "Humidity", key_name: "relative_humidity_2m", unit: "%" },
  { name: "Wind", key_name: "wind_speed_10m", unit: " km/h" },
  { name: "Precipitation", key_name: "precipitation", unit: " mm" },
];

export const dayweatherImperial = [
  { name: "Feels Like", key_name: "apparent_temperature", unit: "°" },
  { name: "Humidity", key_name: "relative_humidity_2m", unit: "%" },
  { name: "Wind", key_name: "wind_speed_10m", unit: " mph" },
  { name: "Precipitation", key_name: "precipitation", unit: " in" },
];

export const unitData = [
  { sectionName: "Temperature", data: ["Celcius (°C)", "Fahrenheit (°F)"] },
  { sectionName: "Wind Speed", data: ["km/h", "mph"] },
  { sectionName: "Precipitation", data: ["Millimeters (mm)", "Inches (in)"] },
];

export const dayName = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
export const monthName = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const hours = [
  "12 AM",
  "1 AM",
  "2 AM",
  "3 AM",
  "4 AM",
  "5 AM",
  "6 AM",
  "7 AM",
  "8 AM",
  "9 AM",
  "10 AM",
  "11 AM",
  "12 PM",
  "1 PM",
  "2 PM",
  "3 PM",
  "4 PM",
  "5 PM",
  "6 PM",
  "7 PM",
  "8 PM",
  "9 PM",
  "10 PM",
  "11 PM",
];

export const options = {
  weekday: "long",
  month: "short",
  day: "numeric",
  year: "numeric",
};
export const weatherCodes: { [key: number]: string } = {
  0: SunnyWeather,
  1: PartlyCloudyWeather,
  2: PartlyCloudyWeather,
  3: Overcast,
  45: Fog,
  48: Fog,
  51: Drizzle,
  53: Drizzle,
  55: Drizzle,
  56: Drizzle,
  57: Drizzle,
  71: Snowy,
  73: Snowy,
  75: Snowy,
  77: Snowy,
  85: Snowy,
  86: Snowy,
  61: Rain,
  63: Rain,
  65: Rain,
  66: Rain,
  67: Rain,
  80: Rain,
  81: Rain,
  82: Rain,
  95: Storm,
  96: Storm,
  99: Storm,
};
