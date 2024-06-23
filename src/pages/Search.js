import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Card } from "../components/Card";

const Search = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const company = searchParams.get('company');

    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
              const response = await fetch(`https://randomuser.me/api/?results=10&seed=${company}`);
              if (!response.ok) {
                throw new Error('Failed to fetch employees');
              }
              const data = await response.json();
              const updatedEmployees = data.results.map((employee, index) => ({
                company,
                index,
                details: employee
              }));
              setEmployees(updatedEmployees);
            } catch (error) {
              setError(error.message);
            }
          };
        
        fetchEmployees();

        document.title = ` Search Results for ${company} | EmployeeManager`;
    }, [company]);

    if (error) {
        return <p className='bg-red-500 rounded-sm text-white'>{error}</p>;
    }

    return (
        <div>
            <h1 className='text-2xl text-center'>Search Results for {company}</h1>
                            <div>
                    <ul className='flex flex-wrap gap-5 justify-center'>
                        {employees.map((e) => (
                                    <Card key={e?.details?.login?.uuid} employee={e?.details} company={e?.company} index={e?.index} />
                                ))}
                    </ul>
                </div>
        </div>
    );
}

export default Search;