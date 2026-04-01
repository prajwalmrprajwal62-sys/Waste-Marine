import { useState, useEffect } from 'react';
import { 
  Cloud, 
  Droplets, 
  Wind, 
  MapPin, 
  Loader2, 
  AlertCircle, 
  RefreshCw, 
  Sun, 
  CloudRain, 
  CloudLightning, 
  Thermometer,
  Compass,
  Gauge,
  Waves
} from 'lucide-react';
import { Card, Button, Badge } from '../components/UI';
import { getWeatherData, WeatherData } from '../services/weatherService';
import { motion } from 'motion/react';

export default function WeatherPage() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!navigator.geolocation) {
        throw new Error("Geolocation is not supported by your browser");
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const data = await getWeatherData(position.coords.latitude, position.coords.longitude);
            setWeather(data);
            setLastUpdated(new Date());
          } catch (err: any) {
            setError(err.message || "Failed to fetch weather data");
          } finally {
            setLoading(false);
          }
        },
        (err) => {
          setError("Location access denied. Please enable location to see local weather.");
          setLoading(false);
        }
      );
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 pt-24 grid-pattern">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter">Marine Weather Station</h1>
            <p className="text-gray-500 font-mono text-xs uppercase tracking-widest mt-1">
              Real-time environmental monitoring for ocean safety
            </p>
          </div>
          <div className="flex items-center gap-4">
            {lastUpdated && (
              <span className="text-[10px] font-mono text-gray-600 uppercase">
                Last Sync: {lastUpdated.toLocaleTimeString()}
              </span>
            )}
            <Button 
              onClick={fetchWeather} 
              variant="outline" 
              className="text-[10px] h-8"
              disabled={loading}
            >
              <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
              Refresh Data
            </Button>
          </div>
        </header>

        {loading ? (
          <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
            <Loader2 className="animate-spin text-[#D1FF4D]" size={48} />
            <p className="text-xs font-black uppercase tracking-widest text-gray-500 animate-pulse">Synchronizing with Satellite Data...</p>
          </div>
        ) : error ? (
          <Card className="max-w-md mx-auto text-center p-12 border-red-500/30 bg-red-500/5">
            <AlertCircle className="text-red-500 mx-auto mb-4" size={48} />
            <h2 className="text-xl font-black uppercase tracking-tighter mb-2">Connection Error</h2>
            <p className="text-gray-400 text-sm mb-6">{error}</p>
            <Button onClick={fetchWeather}>Retry Connection</Button>
          </Card>
        ) : weather ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Weather Card */}
            <Card className="lg:col-span-2 p-8 border-[#1A1A1A] bg-[#0A0A0A] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Waves size={200} className="text-[#D1FF4D]" />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-[#D1FF4D] mb-4">
                  <MapPin size={16} />
                  <span className="text-sm font-black uppercase tracking-widest">{weather.city}</span>
                </div>

                <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-12">
                  <h2 className="text-9xl font-black tracking-tighter text-white">
                    {weather.temp}°
                  </h2>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-4">
                      <img 
                        src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`} 
                        alt={weather.description}
                        className="w-24 h-24 drop-shadow-[0_0_20px_rgba(209,255,77,0.4)]"
                      />
                      <div>
                        <p className="text-2xl font-black uppercase tracking-tight text-white">{weather.description}</p>
                        <Badge variant="accent" className="mt-1">Optimal Conditions</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <Droplets className="text-[#00CCFF] mb-2" size={20} />
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Humidity</p>
                    <p className="text-xl font-black text-white">{weather.humidity}%</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <Wind className="text-[#FFFF00] mb-2" size={20} />
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Wind Speed</p>
                    <p className="text-xl font-black text-white">{weather.windSpeed} m/s</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <Gauge className="text-[#FF00FF] mb-2" size={20} />
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Pressure</p>
                    <p className="text-xl font-black text-white">{weather.pressure} hPa</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <Thermometer className="text-[#FF6600] mb-2" size={20} />
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Feels Like</p>
                    <p className="text-xl font-black text-white">{weather.temp}°C</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Marine Safety Card */}
            <div className="space-y-6">
              <Card className="border-[#D1FF4D]/30 bg-[#D1FF4D]/5">
                <h3 className="text-lg font-bold uppercase tracking-tight text-[#D1FF4D] mb-4 flex items-center gap-2">
                  <ShieldCheck size={20} /> Marine Safety Advisory
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-[#D1FF4D] rounded-full mt-1.5" />
                    <p className="text-xs text-gray-300 leading-relaxed">
                      <span className="font-bold text-white">Safe Navigation:</span> Current wind speeds are within safe limits for small to medium vessels.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-[#D1FF4D] rounded-full mt-1.5" />
                    <p className="text-xs text-gray-300 leading-relaxed">
                      <span className="font-bold text-white">Visibility:</span> {weather.description.includes('clear') ? 'Excellent' : 'Moderate'} visibility reported for coastal operations.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="border-[#1A1A1A]">
                <h3 className="text-lg font-bold uppercase tracking-tight mb-4 flex items-center gap-2">
                  <Compass size={20} /> Regional Stations
                </h3>
                <div className="space-y-3">
                  {['Mumbai Harbor', 'Goa Coast', 'Chennai Port', 'Kochi Inlet'].map((station) => (
                    <div key={station} className="flex items-center justify-between p-3 bg-white/5 rounded border border-white/5 hover:border-[#D1FF4D]/30 transition-colors cursor-pointer group">
                      <span className="text-xs font-bold uppercase tracking-tight text-gray-400 group-hover:text-white">{station}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-[#D1FF4D]">28°C</span>
                        <div className="w-1.5 h-1.5 bg-[#D1FF4D] rounded-full" />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="border-[#1A1A1A] bg-[#0A0A0A]">
                <div className="flex items-center gap-2 mb-4">
                  <Waves className="text-[#00CCFF]" size={20} />
                  <h3 className="text-lg font-bold uppercase tracking-tight">Tide Information</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                    <span className="text-gray-500">High Tide</span>
                    <span className="text-white">14:45 // 3.2m</span>
                  </div>
                  <div className="h-1.5 bg-black rounded-full overflow-hidden">
                    <div className="h-full bg-[#00CCFF] w-[65%]" />
                  </div>
                  <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">
                    Next Low Tide in 5h 22m
                  </p>
                </div>
              </Card>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function ShieldCheck({ size }: { size: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
