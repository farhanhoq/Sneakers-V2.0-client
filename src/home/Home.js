import React from 'react';
import Advertise from './Advertise';
import Banner from './Banner';
import Categories from './Categories';

const Home = () => {
    return (
        <div>
            <h1>Home Sweet Home</h1>
            <Banner></Banner>
            <div className='grid grid-cols-4 gap-6'>
                <div className='col-span-1'><Categories></Categories></div>
                <div className='col-span-3'><Advertise></Advertise></div>
            </div>
        </div>
    );
};

export default Home;