import React, { createContext, useState, useEffect } from 'react';

export const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState(() => {
    const savedEmployees = localStorage.getItem('employees');
    return savedEmployees ? new Map(JSON.parse(savedEmployees)) : new Map();
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const employeesArray = Array.from(employees.entries());
    localStorage.setItem('employees', JSON.stringify(employeesArray));
  }, [employees]);

  const fetchEmployees = async (company = 'google') => {
    try {
      const response = await fetch(`https://randomuser.me/api/?results=10&seed=${company}`);
      if (!response.ok) {
        throw new Error('Failed to fetch employees');
      }
      const data = await response.json();
      setEmployees(prevEmployees => new Map(prevEmployees).set(company, data.results));
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