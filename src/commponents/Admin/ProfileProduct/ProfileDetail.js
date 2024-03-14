import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PencilSquare } from 'react-bootstrap-icons'

import { fetchProfileProductsDetail } from '../../../redux/profileProduct/profileProductSlice'

const ProfileDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem('token')
  const { id } = useParams();
  const profileApi = useSelector((profile) => profile.profileProduct.detail)
  console.log("Check: ", profileApi)
  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(fetchProfileProductsDetail({ id }))
      .then(() => { console.log(profileApi) })
  }, [dispatch, id])

  return (
    <>
      <div className='container mx-auto mt-28 mb-20'>
        <div className='flex items-center justify-between'>
          <Link to={'/profilelist'}>
            <img src='https://cdn-icons-png.freepik.com/512/2099/2099190.png' alt='back' className='w-10 ml-4 h-auto' />
          </Link>
          <div className='text-center flex-grow'>
            <h1 className='text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 mb-6'>Chi tiết hồ sơ thuốc</h1>
          </div>
        </div>

        <hr className='border-gray-300'></hr>
        <div className='grid grid-cols-1 gap-2 md:grid-cols-2 mt-6'>
          <div className='w-full flex justify-center border-gray-200'>
            {profileApi && profileApi.profileInformation && (
              <img className='max-w-lg rounded-md border border-gray-300 hover:scale-110 shadow-lg hover:shadow-2xl transition duration-300' src={profileApi.profileInformation.imageURL || 'https://cdn.tgdd.vn/Products/Images/10029/131161/eugica-hinh-2.jpg'} alt='Profile Image' />
            )}
          </div>
          <div className=''>
            <div className='flex justify-between'>
              {profileApi && profileApi.profileInformation && (
                <h2 className=' mb-4 text-3xl text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 hover:to-yellow-500 font-bold'>{profileApi.profileInformation.title}</h2>
              )}
              <div><button type="button" className="text-white flex bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm py-2.5 text-center p-4 gap-2 mr-36"><PencilSquare size={20}></PencilSquare> Chỉnh sửa hồ sơ thuốc</button></div>
            </div>
            {profileApi && profileApi.profileInformation && (
              <div>
                <p className='mb-4'><span className='font-semibold'>Created By:</span> {profileApi.profileInformation.createdBy}  </p>
                <p className='mb-4'><span className='font-semibold'>Created On:</span> {profileApi.profileInformation.createdOn}  </p>
                <p className='mb-4'><span className='font-semibold'>Updated By:</span> {profileApi.profileInformation.updatedBy}  </p>
                <p className='mb-4'><span className='font-semibold'>Updated On:</span> {profileApi.profileInformation.updatedOn}  </p>
                <p className='mb-4'><span className='font-semibold'>Status:</span> {profileApi.profileInformation.status}  </p>
              </div>
            )}
          </div>
        </div>
        {profileApi && profileApi.profileDetailList && profileApi.profileDetailList.map((detail) => (
          <div className='w-5/6 mx-auto flex bg-opacity-40 mb-5 mt-10'>
            <div className='w-full h-48 relative rounded-xl transition-transform duration-300 transform hover:scale-110 hover:shadow-2xl'>
              <div className='absolute inset-0 z-0 rounded-xl'></div>
              <div className='h-full z-10 border border-gray-300 transition-transform duration-300 transform rounded-xl items-center flex'>
                <div className='ml-3'>
                  <img className={`logo`} src='https://images2.thanhnien.vn/528068263637045248/2024/1/27/den-vau-99-17063223334631232917099.jpg' alt='profile' style={{ width: '130px', height: '130px' }} />
                </div>
                <div className='ml-10'>
                  <div className='flex'>
                    <div className='flex-grow flex-col'>
                      <div className='mx-12'>
                        <span className='font-bold text-lg mr-2'>Tên thuốc:</span>{detail.productResponseDTO.name}
                      </div>
                      <div className='mx-12 mt-8'>
                        <span className='font-bold text-lg'>CreatedOn:</span> {detail.productResponseDTO.createdOn}
                      </div>
                    </div>
                    <div className='flex flex-col'>
                      <div className='mx-12'>
                        <span className='font-bold text-lg'>Nhãn:</span> {detail.productResponseDTO.labeller}
                      </div>
                      <div className='mx-12 mt-8'>
                        <span className='font-bold text-lg'>Loại thuốc:</span> {detail.productResponseDTO.category}
                      </div>
                    </div>
                    <div className='flex flex-col'>
                      <div className='mx-12'>
                        <span className='font-bold text-lg'>Đường dẫn:</span> {detail.productResponseDTO.route}
                      </div>
                      <div className='mx-12 mt-8'>
                        <span className='font-bold text-lg'>Trạng thái:</span> {detail.status}
                      </div>
                    </div>
                    <div className='flex flex-col'>
                      <div className='mx-12'>
                        <span className='font-bold text-lg'>Công ty:</span> {detail.productResponseDTO.company}
                      </div>
                    </div>
                  </div>
                  <div className='mx-12 mt-8'>
                    <span className='font-bold text-lg'>Tên đơn thuốc:</span> {detail.productResponseDTO.prescriptionName}
                  </div>
                </div>
              </div>
              <div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </>
  )
}

export default ProfileDetail