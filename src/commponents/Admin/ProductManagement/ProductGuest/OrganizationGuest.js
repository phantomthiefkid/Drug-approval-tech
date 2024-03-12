import React from 'react';
import { Link } from 'react-router-dom';

const organizations = [
    {
        name: 'FDA',
        image: 'https://www.fda.gov/files/styles/call_to_action_992x558/public/FDA-White-Oak-Building-01.jpg?itok=_Pl8HxgS',
        description: 'The Food and Drug Administration (FDA) is a federal agency of the United States Department of Health and Human Services.'
    },
    {
        name: 'ANSM',
        image: 'https://cloudfront-eu-central-1.images.arcpublishing.com/leparisien/3GHGZMMOBTODAY3S2MA3LIU4X4.jpg',
        description: 'The National Agency for the Safety of Medicines and Health Products (ANSM) is the French agency responsible for regulating health products.'
    },
    {
        name: 'DAV',
        image: 'https://dav.gov.vn/images/logo1lduoc.jpg',
        description: 'The Drug Administration of Vietnam (DAV) is the government agency in charge of managing and licensing pharmaceuticals in Vietnam.'
    },
];

const OrganizationGuest = () => {
    return (
        <div className='mt-20 mb-20'>
            <div className='py-8 flex px-48'>
                <h1 className='italic text-4xl font-extrabold text-blue-900 flex border-b-4 border-blue-500 py-4'>
                    <span className='ml-2 font-sans'>Các tổ chức quản lí dược</span>
                </h1>
            </div>


            <div className='w-5/6 mx-auto mt-20 flex gap-12 bg-opacity-40'>
                {organizations.map((organization, index) => (
                    <Link key={index} to={`/productlistguest/${organization.name}`} className='w-1/3 h-52 relative rounded-xl transition-transform duration-300 transform hover:scale-110 hover:shadow-2xl' style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${organization.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                        <div className='absolute inset-0 z-0 rounded-xl'></div>
                        <div className='flex flex-col justify-between h-full z-10 border border-gray-300 transition-transform duration-300 transform rounded-xl p-6'>
                            <div className='text-center'>
                                <h1 className='text-4xl font-bold text-yellow-400'>{organization.name}</h1>
                            </div>
                            <div className='text-white text-sm'>
                                <p>{organization.description}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default OrganizationGuest;
