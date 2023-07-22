import { createContext, useState, ReactNode } from 'react';
import { Weather } from '../utils/interfaces';



interface WeatherContextProps {
  weather: Weather | null;
  setWeather: React.Dispatch<React.SetStateAction<Weather | null>>;
}

export const WeatherContext = createContext<WeatherContextProps>({
  weather: null,
  setWeather: () => {},
});

const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const [weather, setWeather] = useState<Weather | null>(null);

  return (
    <WeatherContext.Provider value={{ weather, setWeather }}>
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherProvider;
