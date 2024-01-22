import React from 'react';
import Navigation from '../Navbar/Navigation';
import '../../css/Homepage/Home.css'
import Footer from '../Footer/Footer';

const Home = () => {
  return (
    <div>
      <Navigation />
      <div className="mt-28 h-screen">
        <span>This is homepage</span>
      </div>

      <Footer></Footer>

    </div>
  );
}

export default Home;
