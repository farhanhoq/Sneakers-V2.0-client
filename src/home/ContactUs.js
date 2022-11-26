import React from 'react';

const ContactUs = () => {
    return (
        <div
            className='flex flex-col text-center p-12 my-10'
            // style={{
            //     background: `url(${})`
            // }}
        >
            <h4 className='text-lg text-primary font-bold'>Contact Us</h4>
            <h1 className='text-4xl font-bold text-white mb-6'>Stay connected with us</h1>
            <input type="text" placeholder="Email Address" className="input w-[450px] my-2 mx-auto" />
            <input type="text" placeholder="Subject" className="input w-[450px] my-2 mx-auto" />
            <textarea className="textarea w-[450px] h-32 my-2 mx-auto" placeholder="Your Message"></textarea>
            <button className="btn btn-primary my-4 bg-gradient-to-r from-primary to-secondary text-white">Submit</button>
        </div>
    );
};

export default ContactUs;

