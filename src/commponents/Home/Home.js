import React from 'react';
import Navigation from '../Navbar/Navigation';

const Home = () => {
  return (
    <div>
      <Navigation />
      <div className="mt-32"> {/* Thêm khoảng cách bằng lớp mt-32 */}
        <span>This is homepage</span>
        
      </div>
    </div>
  );
}

export default Home;
