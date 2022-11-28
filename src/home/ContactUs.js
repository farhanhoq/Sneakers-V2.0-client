import React from 'react';

const ContactUs = () => {
    return (
        <div
            className='flex flex-col text-center p-12 my-10 text-red-600'
            // style={{
            //     background: `url(${})`
            // }}
        >
            <h4 className='text-lg font-bold'>Contact Us</h4>
            <h1 className='text-4xl font-bold mb-6'>Stay connected with us</h1>
            <input type="text" placeholder="Email Address" className="input w-[450px] my-2 mx-auto" />
            <input type="text" placeholder="Subject" className="input w-[450px] my-2 mx-auto" />
            <textarea className="textarea w-[450px] h-32 my-2 mx-auto" placeholder="Your Message"></textarea>
            <button className="btn w-1/4 mx-auto btn-primary bg-red-600 my-4">Submit</button>
        </div>
    );
};

export default ContactUs;

