import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

const icon = new L.Icon({
  iconUrl: iconUrl,
  iconSize: [25, 41],
});

const Emp = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const company = searchParams.get('company');
  const index = searchParams.get('index');

  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(`https://randomuser.me/api/?results=10&seed=${company}`);
        if (!response.ok) {
          throw new Error('Failed to fetch employees');
        }
        const data = await response.json();
        setEmployee(data.results[parseInt(index)]);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchEmployees();
    if (employee) {
      document.title = `${employee.name.first} ${employee.name.last} | EmployeeFinder`;
    } else {
      document.title = "Loading... | EmployeeFinder";
    }
  }, [company, index, employee]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {employee ? (
        <div className='flex flex-col justify-center items-center'>
          <img
            src={employee.picture?.large}
            alt={`${employee.name?.first} ${employee.name?.last}`}
            className='rounded-full w-40 h-40'
          />
          <h2 className='text-2xl font-semibold mt-4'>
            Name: {employee.name?.first} {employee.name?.last}
          </h2>
          <p className='text-gray-500'>Email: {employee.email}</p>
          <p className='text-gray-500'>Phone: {employee.phone}</p>
          <p className='text-gray-500'>Location: {employee.location?.city}, {employee.location?.country}</p>
          {/* Leaflet Map */}
          <div id="map" className='m-4' style={{ height: '300px', width: '300px' }}>
            <MapContainer
              center={[employee.location.coordinates.latitude, employee.location.coordinates.longitude]}
              zoom={13}
              scrollWheelZoom={false}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker icon={icon} position={[employee.location.coordinates.latitude, employee.location.coordinates.longitude]} />
            </MapContainer>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EmployeeDetails;