import React, { useEffect, useState } from 'react';
import { Card } from '../components/Card';

const Fav = () => {

    const [fav, setFav] = useState([]);

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFav(favorites);
        document.title = 'Favorites - EmployeeManager';
    }, [fav]);


    return (
        <div className='flex flex-col justify-center items-center'>
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

export default Fav;