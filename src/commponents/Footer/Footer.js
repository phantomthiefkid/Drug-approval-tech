import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/Footer/Footer.css'
const Footer = () => {

  return (
    <div className='h-72 text-center w-full footer'>
      <div className='grid grid-cols-3'>
        <div className='justify-center mx-auto'>
          <Link to={`/`}><div><img className='w-24 ml-10 mt-10' src='./logo.png'/><span className='text-blue-950 text-xl font-bold'>DRUG APPROVAL</span><br></br><span className='font-medium text-gray-700'>Technology</span></div></Link>
          
        </div>
        <div>
          <div className='py-6'>
            <h3 className='text-xl'><b>Products</b></h3>
            <ul>
              <li>Clinical API</li>
              <li>Clinical Drug Datasets</li>
              <li>Academic Drug Datasets</li>
            </ul>
          </div>
          <div>
          <h3 className='text-xl'><b>Products</b></h3>
            <ul>
              <li>Clinical API</li>
              <li>Clinical Drug Datasets</li>
              <li>Academic Drug Datasets</li>
            </ul>
          </div>
        </div>
        <div>
        <div className='py-6'>
            <h3 className='text-xl'><b>Products</b></h3>
            <ul>
              <li>Clinical API</li>
              <li>Clinical Drug Datasets</li>
              <li>Academic Drug Datasets</li>
            </ul>
          </div>
        </div>
      </div>
      <div className='py-2'><p>© OMx Personal Health Analytics, Inc. 2023 </p></div>
    </div>
  );
};



export default Footer