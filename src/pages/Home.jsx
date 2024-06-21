import React, { useContext, useEffect, useState } from 'react';
import { EmployeeContext } from '../context/EmployeeContext';
import { Card } from '../components/Card';
import { useNavigate } from "react-router-dom";

const Home = () => {
    const { employees, error, fetchEmployees } = useContext(EmployeeContext);
    const [fav, setFav] = useState([]);
    const [input, setInput] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFav(favorites);
        fetchEmployees();
        document.title = 'Home | EmployeeManager';
    }, [fetchEmployees]);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='flex flex-col justify-center items-center'>
            <div>
                <form action="" className='sm:w-[90%] md:w-1/2 lg:w-1/3 m-5'>
                    <div class="flex gap-4">
                        <input
                            type="search"
                            className='w-[200px] px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                            placeholder="Search"
                            aria-label="Search"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                        />
                        <button
                            className="w-[80px] rounded-lg h-[50px] px-4 bg-blue-500 text-white font-bold hover:bg-blue-700"
                            data-twe-ripple-init
                            data-twe-ripple-color="white"
                            type="button"
                            id="button-addon3"
                            onClick={() => {
                                navigate(`/search?company=${input}`);
                            }}
                        >
                            Search
                        </button>
                    </div>
                </form>
            </div>
                        <h1 className='text-2xl'>Employees of the month</h1> 
                <div>
                    <ul className='flex flex-wrap gap-5 justify-center'>
                        {employees.map((e) => (
                                    <Card key={e?.details?.login?.uuid} employee={e?.details} company={e?.company} index={e?.index} />
                                ))}
                    </ul>
                </div>
                    <h1 className='text-2xl'>Favorites</h1>
                <div>
                    <ul className='flex flex-wrap gap-5 justify-center items-center'>
                        {(fav.length === 0) && <p>No favorites yet</p>}
                        {(fav.length > 0) && fav.map(e => (
                            <Card key={e.employee?.login?.uuid} employee={e.employee} company={e.company} index={e.index} />
                        ))}
                    </ul>
                </div>
        </div>
    );
}

export default Home;