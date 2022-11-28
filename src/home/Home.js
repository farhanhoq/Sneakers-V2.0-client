import React, { useState } from 'react';
import Advertise from './Advertise';
import Banner from './Banner';
import Categories from './Categories';
import ContactUs from './ContactUs';

const Home = () => {

    const [selectedCategory, setSelectedCategory] = useState(null);

    return (
        <div>
            <Banner></Banner>
            <div className='grid grid-cols-8 gap-20 my-10'>
                <div className='col-span-3 mt-40'><Categories></Categories></div>
                <div className='col-span-5'><Advertise></Advertise></div>
            </div>
            <ContactUs></ContactUs>
        </div>
    );
};

export default Home;