
export interface WeatherData {
  temp: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  city: string;
  seaLevel?: number;
  pressure: number;
}

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

const MOCK_WEATHER: WeatherData = {
  temp: 28,
  description: "scattered clouds",
  icon: "03d",
  humidity: 65,
  windSpeed: 4.5,
  city: "Mumbai Harbor (Demo)",
  pressure: 1012,
};

export async function getWeatherData(lat: number, lon: number): Promise<WeatherData> {
  if (!API_KEY || API_KEY === "YOUR_OPENWEATHER_API_KEY") {
    console.warn("OpenWeather API Key is missing. Using mock data.");
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_WEATHER), 800));
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const data = await response.json();

    return {
      temp: Math.round(data.main.temp),
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      city: data.name,
      seaLevel: data.main.sea_level,
      pressure: data.main.pressure,
    };
  } catch (error) {
    console.error("Weather API error, falling back to mock data:", error);
    return MOCK_WEATHER;
  }
}

export async function getWeatherDataByCity(city: string): Promise<WeatherData> {
  if (!API_KEY || API_KEY === "YOUR_OPENWEATHER_API_KEY") {
    return MOCK_WEATHER;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const data = await response.json();

    return {
      temp: Math.round(data.main.temp),
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      city: data.name,
      seaLevel: data.main.sea_level,
      pressure: data.main.pressure,
    };
  } catch (error) {
    return MOCK_WEATHER;
  }
}
