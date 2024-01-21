import '../../css/Navbar.css'
import React, { useState, useEffect } from 'react';
const Navigation = () => {
    const [navbarBackground, setNavbarBackground] = useState('bg-gray-800');

    const handleScroll = () => {
        if (window.scrollY > 50) {
            setNavbarBackground('bg-gray-600');
        } else {
            setNavbarBackground('bg-gray-800');
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <div className={`navbar ${navbarBackground} text-white p-4 fixed w-full top-0 transition-all ease-in-out duration-300`}>
                <div className="container mx-auto">
                    {/* Nội dung thanh navbar */}
                    Navbar Content
                </div>
            </div>
        </>
    );
};


export default Navigation