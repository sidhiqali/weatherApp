import axios from 'axios';
import { useContext, useState } from 'react';
import { WeatherContext } from '../context/Context';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import getDeviceLocation from '../utils/GeoLocation';
const Weather = () => {
  const apikey: string = import.meta.env.VITE_API_KEY;
  const { setWeather, weather } = useContext(WeatherContext);
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  //fetching weather data based on coordination or Location
  const fetchData = async (url: string) => {
    try {
      setLoading(true);
      const result = await axios.get(url);
      setWeather(result?.data);
      setLoading(false);
      return result?.data;
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      toast.error(error?.response?.data?.message || 'An error occurred');
    }
  };

  console.log(weather);

  //searching based on Location Input

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWeather(null);
    const url = `https://api.openweathermap.org/data/2.5/weather?appid=${apikey}&units=metric&q=${location}`;
    try {
      const data = await fetchData(url);
      if (data) {
        navigate('/result');
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'An error occurred');
    }
  };

  //searching with data get from device coordinates
  const getLocation = async () => {
    setWeather(null);
    try {
      const position = await getDeviceLocation();
      const { latitude, longitude } = position.coords;
      console.log(latitude, longitude);
      const url = `https://api.openweathermap.org/data/2.5/weather?appid=${apikey}&units=metric&lat=${latitude}&lon=${longitude}`;
      try {
        const data = await fetchData(url);
        if (data) {
          navigate('/result');
        }
      } catch (error: any) {
        toast.error(error?.response?.data?.message || 'An error occurred');
      }
    } catch (error) {
      console.error('Error getting device location:', error);
      toast.error('Error getting device location. Please try again.');
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-blue'>
      <div className='bg-white mx-10 w-96 rounded-md shadow-sm shadow-slate-500'>
        <div className='flex px-6 py-4 items-start text-blue font-semibold text-lg'>
          Weather App
        </div>
        <hr />
        <div className='px-6 py-4'>
          <form className='py-3' onSubmit={handleFormSubmit}>
            <div>
              <input
                className='w-full bg-transparent placeholder-center text-center text-base text-black border-2 border-gray-300 h-12 rounded-md  px-3  focus:border-blue focus:outline-none '
                name='username'
                type='text'
                placeholder='Enter city name'
                autoComplete='off'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setLocation(e.target.value)
                }
              />
            </div>
          </form>
          <div className='flex items-center justify-center'>
            <div className=' w-[50%] border-b  border-gray-300' />
            <span className='text-gray-400 px-2'>or</span>
            <div className=' w-[50%] border-b border-gray-300' />
          </div>

          <div className='w-full flex items-center justify-center'>
            <button
              onClick={getLocation}
              className=' my-5 flex w-full justify-center  text-white items-center border h-12 rounded-md bg-blue px-3 py-1.5  font-semibold'
              type='submit'
            >
              {loading ? 'Fetching....' : 'Get Device Location'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
