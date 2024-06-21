import React, { useContext, useEffect, useState } from 'react';
import { EmployeeContext } from '../context/EmployeeContext';
import { EmployeeCard } from '../components/Card';
import { useNavigate, useLocation } from "react-router-dom";

const Home = () => {
    const { employees, error, fetchEmployees } = useContext(EmployeeContext);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [fav, setFav] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [input, setInput] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFav(favorites);
        fetchEmployees();

        const params = new URLSearchParams(location.search);
        const searchQuery = params.get('search');
        if (searchQuery) {
            setSearchTerm(searchQuery);
        }
    }, [fetchEmployees, location.search]);

    useEffect(() => {
        if (searchTerm) {
            // fetch filtered employees based on the search term
            async function fetchFilteredEmployees() {
                const response = await fetch(`https://randomuser.me/api/?results=10&seed=${searchTerm}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch employees');
                }
                const data = await response.json();
                setFilteredEmployees(data.results);
            }
            fetchFilteredEmployees();
        } else {
            // Set filteredEmployees based on the fetched employees
            setFilteredEmployees(employees);
        }
    }, [employees, searchTerm]);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='flex flex-col justify-center items-center'>
            <div>
                <form action="" className='sm:w-[90%] md:w-1/2 lg:w-1/3 m-5'>
                    <div class="relative flex">
                        <input
                            type="search"
                            className="relative m-0 -me-0.5 block flex-auto rounded-s border border-solid border-neutral-200 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-surface outline-none transition duration-200 ease-in-out placeholder:text-neutral-500 focus:z-[3] focus:border-primary focus:shadow-inset focus:outline-none motion-reduce:transition-none"
                            placeholder="Search"
                            aria-label="Search"
                            id="exampleFormControlInput3"
                            aria-describedby="button-addon3"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                        />
                        <button
                            className="z-[2] inline-block rounded-e border-2 border-primary px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:border-primary-accent-300 hover:bg-primary-50/50 hover:text-primary-accent-300 focus:border-primary-600 focus:bg-primary-50/50 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700"
                            data-twe-ripple-init
                            data-twe-ripple-color="white"
                            type="button"
                            id="button-addon3"
                            onClick={() => {
                                navigate(`/?search=${input}`);
                            }}
                        >
                            Search
                        </button>
                    </div>
                </form>
            </div>
            {
                searchTerm && (<>
                        <h1 className='text-2xl'>Showing search results for {searchTerm}</h1>
                    <div>
                        <ul className='flex flex-wrap gap-5 justify-center'>
                            {filteredEmployees.length > 0 && filteredEmployees.map((employee, i) => (
                                <EmployeeCard key={employee?.login?.uuid} employee={employee} company={searchTerm} index={i} />
                            ))}
                        </ul>
                    </div>
                </>)
            }
            {!searchTerm && (<>
                        <h1 className='text-2xl'>Employees of the month</h1>
                <div>
                    <ul className='flex flex-wrap gap-5 justify-center'>
                        {Array.from(employees).map(([company, employeesList]) => (
                            <>
                                {employeesList.map((employee, index) => (
                                    <EmployeeCard key={employee?.login?.uuid} employee={employee} company={company} index={index} />
                                ))}
                            </>
                        ))}
                    </ul>
                </div>
                    <h1 className='text-2xl'>Favorites</h1>
                <div>
                    <ul className='flex flex-wrap gap-5 justify-center items-center'>
                        {(fav.length === 0) && <p>No favorites yet</p>}
                        {(fav.length > 0) && fav.map(e => (
                            <EmployeeCard key={e.employee?.login?.uuid} employee={e.employee} company={e.company} index={e.index} />
                        ))}
                    </ul>
                </div></>)}
        </div>
    );
}

export default Home;