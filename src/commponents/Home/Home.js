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
    <div className='w-full'>
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
        </div>
        <h2 className='mt-16 text-center text-3xl font-extrabold'>Dữ liệu thuốc đang tăng lên nhanh chóng</h2>
        <h2 className='text-center mt-8 text-2xl'>
          Về kích thước, độ phức tạp và độ chính xác. Điều này đang làm chậm lại những <br />  nghiên cứu quan trọng và khiến chúng ta phải dựa vào những phương pháp đã lỗi thời.
        </h2>
        <div className='grid grid-cols-3 mt-12 ml-40'>
          <div className='flex text-center '>
            <h2 className='text-2xl font-bold mr-3'>2M+</h2>
            <h2>Tạp chí khoa học <br /> xuất bản mỗi năm</h2>
          </div>

          <div className='flex text-center '>
            <h2 className='text-2xl font-bold mr-3'>7%</h2>
            <h2>Đánh giá có hệ thống <br /> không chính xác trong vòng <br /> 24 giờ xuất bản</h2>
          </div>

          <div className='flex text-center '>
            <h2 className='text-2xl font-bold mr-3'>23%</h2>
            <h2>Trong số các đánh giá không được  <br />cập nhật trong 2 năm có kết luận sai</h2>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Home;
