import React, { useEffect, useState } from 'react';
import '../../css/Homepage/Home.css';

const Home = () => {
  const [currentImage, setCurrentImage] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage % 4) + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, [currentImage]);

  return (
    <div>
      <div className="mt-32 mb-28 h-screen">
        <div className="slider">
          <div className="slides">
            {Array.from({ length: 4 }).map((_, index) => (
              <input
                key={index}
                type="radio"
                name="radio-btn"
                id={`radio${index + 1}`}
                checked={currentImage === index + 1}
              />
            ))}

            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className={`slide ${currentImage === index + 1 ? 'first' : ''}`}
              >
                <img src={`./${index + 1}.jpg`} alt="" />
              </div>
            ))}

            <div className="navigation-auto">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className={`auto-btn${index + 1}`}></div>
              ))}
            </div>
          </div>

          <div className="navigation-manual z-0">
            {Array.from({ length: 4 }).map((_, index) => (
              <label key={index} htmlFor={`radio${index + 1}`} className="manual-btn"></label>
            ))}
          </div>
        </div>
        <h2 className='mt-16 text-center text-3xl font-extrabold'>Drug data is rapidly increasing</h2>
        <h2 className='text-center mt-8 text-2xl'>
          In size, complexity, and inaccuracy. This is slowing down vital <br />
          research and leaving us to rely on outdated practices.
        </h2>
        <div className='grid grid-cols-3 mt-12 ml-40'>
          <div className='flex text-center '>
            <h2 className='text-2xl font-bold mr-3'>2M+</h2>
            <h2>Scientific journals <br /> published each year</h2>
          </div>

          <div className='flex text-center '>
            <h2 className='text-2xl font-bold mr-3'>7%</h2>
            <h2>Of systematic reviews <br /> are inaccurate  within <br />  24hrs of publication</h2>
          </div>

          <div className='flex text-center '>
            <h2 className='text-2xl font-bold mr-3'>23%</h2>
            <h2>Of reviews not updated in 2 yrs <br /> have incorrect conclusions</h2>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Home;
