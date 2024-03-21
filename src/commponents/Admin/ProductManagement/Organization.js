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

const Organization = () => {
    return (
        <div className='mt-20 mb-20'>
            <div className='py-8 flex px-48'>
                <h1 className='italic text-4xl font-extrabold text-blue-900 flex border-b-4 border-blue-500 py-4'>
                    <span className='ml-2 font-sans'>Các tổ chức quản lí dược</span>
                </h1>
            </div>
            <div className='w-5/6 mx-auto mt-20 flex gap-12 bg-opacity-40'>
                {organizations.map((organization, index) => (
                    <Link key={index} to={`/productlist/${organization.name}`} className='w-1/3 h-52 relative rounded-xl transition-transform duration-300 transform hover:scale-110 hover:shadow-2xl' style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${organization.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
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
            <div className='text-center mt-8 p-16'>
                <p className='text-gray-600 text-lg leading-relaxed mx-auto font-normal'>
                    <span className="font-bold text-blue-700">DrugApproval</span> là một cơ sở dữ liệu trực tuyến được sử dụng rộng rãi trong lĩnh vực dược phẩm và sinh học phân tử. Nó cung cấp thông tin chi tiết về các loại thuốc, từ thông tin về thành phần hóa học đến cơ chế hoạt động, tác dụng phụ, tương tác thuốc và ứng dụng lâm sàng. DrugApproval cũng cung cấp thông tin về các biến thể di truyền của các gen liên quan đến phản ứng dược lý, cũng như thông tin về các dược phẩm và sản phẩm chứa thuốc. Nó là một công cụ quan trọng cho các nhà nghiên cứu, nhà sản xuất thuốc, bác sĩ và những người làm trong lĩnh vực dược phẩm để hiểu rõ hơn về các thuốc và ứng dụng của chúng trong y học và nghiên cứu.
                </p>

            </div>
            <div className="grid grid-cols-3 gap-10 mt-8 w-full mx-auto">
                <img src="https://d3i6fh83elv35t.cloudfront.net/static/2018/06/GettyImages-758299279-1024x683.jpg" alt="Medical Image 1" className=" object-cover object-center w-3/4 h-3/4 mx-auto" />
                <img src="https://i0.wp.com/www.apifirst.in/wp-content/uploads/2021/03/pharma-products-in-india-500x500-1.jpg?fit=460%2C351&ssl=1" alt="Medical Image 2" className=" object-cover object-center w-3/4 h-3/4 mx-auto" />
                <img src="https://nkgabc.com/wp-content/uploads/2020/07/SERVICES-FOR-NEW-DRUG-APPROVAL-DrugBlog-1024x768.jpg" alt="Medical Image 3" className=" object-cover object-center w-3/4 h-3/4 mx-auto" />
            </div>

        </div>
    );
};

export default Organization;
