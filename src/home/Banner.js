import React from 'react';

const Banner = () => {
    return (
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `url("https://images.complex.com/complex/images/c_fill,dpr_auto,f_auto,q_90,w_1400/fl_lossy,pg_1/uwszw7b3j7rlmud6wdy2/sneaker-con-2016")`,
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Sneakers v2.0</h1>
            <p className="mb-5 text-xl">
              Find your desired sneaker here
            </p>
          </div>
        </div>
      </div>
    );
};

export default Banner;