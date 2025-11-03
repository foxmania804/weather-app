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
  0: "/src/assets/images/icon-sunny.webp",
  1: "/src/assets/images/icon-partly-cloudy.webp",
  2: "/src/assets/images/icon-partly-cloudy.webp",

  3: "/src/assets/images/icon-overcast.webp",
  45: "/src/assets/images/icon-fog.webp",
  48: "/src/assets/images/icon-fog.webp",
  51: "/src/assets/images/icon-drizzle.webp",
  53: "/src/assets/images/icon-drizzle.webp",
  55: "/src/assets/images/icon-drizzle.webp",
  56: "/src/assets/images/icon-drizzle.webp",
  57: "/src/assets/images/icon-drizzle.webp",
  71: "/src/assets/images/icon-snow.webp",
  73: "/src/assets/images/icon-snow.webp",
  75: "/src/assets/images/icon-snow.webp",
  77: "/src/assets/images/icon-snow.webp",
  85: "/src/assets/images/icon-snow.webp",
  86: "/src/assets/images/icon-snow.webp",
  61: "/src/assets/images/icon-rain.webp",
  63: "/src/assets/images/icon-rain.webp",
  65: "/src/assets/images/icon-rain.webp",
  66: "/src/assets/images/icon-rain.webp",
  67: "/src/assets/images/icon-rain.webp",
  80: "/src/assets/images/icon-rain.webp",
  81: "/src/assets/images/icon-rain.webp",
  82: "/src/assets/images/icon-rain.webp",
  95: "/src/assets/images/icon-storm.webp",
  96: "/src/assets/images/icon-storm.webp",
  99: "/src/assets/images/icon-storm.webp",
};
