import { Route, Routes } from 'react-router-dom';
import Weather from './pages/Weather';
import Result from './pages/Result';
import WeatherProvider from './context/Context.tsx';


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
