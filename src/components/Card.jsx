import { FaStar, FaRegStar } from 'react-icons/fa';
import { useEffect, useState } from 'react';

export const Card = ({ employee, company, index }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFavorite(favorites.some(fav => fav.employee?.login?.uuid === employee.login.uuid));
  }, [employee]);

  const handleFav = () => {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (isFavorite) {
      favorites = favorites.filter(fav => fav.employee.login.uuid !== employee.login.uuid);
    } else {
      favorites.push({ employee, company, index });
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  }

  return (
    <div className="sm:w-[90%] md:w-1/2 md:min-w-[450px] sm:min-w[380px] lg:w-1/3 p-2">
      <div className="rounded overflow-hidden shadow-lg m-4 flex flex-row">
        <img className="w-auto md:h-36 lg:h-48 sm:h-24 object-cover" src={employee?.picture?.large} alt="Employee" />
        <div className="px-6 py-4 flex flex-col">
          <div className="font-bold text-xl mb-2">{employee?.name.first} {employee?.name.last}</div>
          <p className="text-gray-700 text-base">Age: {employee?.dob.age}</p>
          <p className="text-gray-700 text-base">Country: {employee?.location.country}</p>
          <div className="flex flex-row gap-5 mt-5">
            <a href={`/employee/?company=${company}&index=${index}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Details</a>
            <button onClick={handleFav}>
              {isFavorite ? <FaStar className="text-yellow-500" /> : <FaRegStar />}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};