import React, { createContext, useState, useEffect } from 'react';

export const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState(() => {
    const savedEmployees = localStorage.getItem('employees');
    return savedEmployees ? JSON.parse(savedEmployees) : [];
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  const fetchEmployees = async (company = 'google') => {
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

  return (
    <EmployeeContext.Provider value={{ employees, error, fetchEmployees }}>
      {children}
    </EmployeeContext.Provider>
  );
};