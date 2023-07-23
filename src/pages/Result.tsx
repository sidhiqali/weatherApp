import { useContext } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { BsThermometerSun } from 'react-icons/bs';
import { PiDropHalfFill } from 'react-icons/pi';
import { MdOutlineLocationOn } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { WeatherContext } from '../context/Context';
const Result = () => {
  const navigate = useNavigate();
  const { weather } = useContext(WeatherContext);

  return (
    <div className='flex items-center justify-center min-h-screen bg-blue'>
      <div className='bg-white mx-10 w-96 rounded-md shadow-sm shadow-slate-500'>
        <div className='flex px-6 py-4 items-center justify-start  text-blue font-semibold text-lg'>
          <div
            onClick={() => navigate('/')}
            className='mr-2 cursor-pointer hover:bg-slate-200 rounded-full'
          >
            <IoArrowBack />
          </div>
          <div>Weather App</div>
        </div>
        <hr />
        <div className='px-6 py-4 flex flex-col items-center justify-center'>
          <div className='image bg-white '>
            <img
              className=' h-36 w-36'
              src={`https://openweathermap.org/img/wn/${weather?.weather[0]?.icon}.png`}
              alt='weather icon'
            />
          </div>
          <div className='text-6xl font-semibold py-3 '>
            {weather?.main?.temp}°C
          </div>
          <div className='text-lg font-medium py-2'>
            {weather?.weather[0]?.description}
          </div>
          <div className='flex items-center text-lg font-medium py-2 '>
            <MdOutlineLocationOn />{' '}
            {`${weather?.name} , ${weather?.sys?.country}`}
          </div>
        </div>
        <div className='flex w-full'>
          <div className='flex w-[50%] items-center justify-center border-2 rounded-bl-md py-2'>
            <div className='icon text-blue text-3xl'>
              <BsThermometerSun />
            </div>
            <div className='type flex flex-col leading-tight font-semibold'>
              <div className='text-sm'>{weather?.main?.feels_like}°C</div>
              <div className='text-xs'>feels like</div>
            </div>
          </div>
          <div className='flex w-[50%] items-center justify-center border-2 rounded-br-md py-2'>
            <div className='icon text-blue text-3xl'>
              <PiDropHalfFill />
            </div>
            <div className='type flex flex-col leading-tight font-semibold'>
              <div className='text-sm'>{weather?.main?.humidity}%</div>
              <div className='text-xs'>Humidity</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
