import React from 'react';
import Advertise from './Advertise';
import Banner from './Banner';
import Categories from './Categories';
import ContactUs from './ContactUs';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <div className='grid grid-cols-4 gap-6 my-10'>
                <div className='col-span-1'><Categories></Categories></div>
                <div className='col-span-3'><Advertise></Advertise></div>
            </div>
            <ContactUs></ContactUs>
        </div>
    );
};

export default Home;