import { Route, Routes } from 'react-router-dom';
import Weather from './pages/Weather';
import Result from './pages/Result';
import WeatherProvider from './context/Context.tsx';

// const apiKey = '642e083e028c045243165a622b1cbf62';
// const apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid={apikey}&units=metric&lat=10.65&lon=78.0833&q=`;

export default function App() {
  return (
    <WeatherProvider>
      <Routes>
        <Route path='/' element={<Weather />} />
        <Route path='/result' element={<Result />} />
      </Routes>
    </WeatherProvider>
  );
}
