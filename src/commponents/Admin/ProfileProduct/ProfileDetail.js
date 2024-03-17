import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PencilSquare, PlusCircle, XCircle, ArrowUp, ArrowDown } from 'react-bootstrap-icons'

import { fetchProfileProductsDetail, fetchProductsWithAdmin } from '../../../redux/profileProduct/profileProductSlice'

const ProfileDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem('token')
  const { id } = useParams();
  const profileApi = useSelector((profile) => profile.profileProduct.detail)
  console.log("Check: ", profileApi)
  const [expandedProducts, setExpandedProducts] = useState({});
  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(fetchProfileProductsDetail({ id }))
      .then(() => { console.log(profileApi) })
  }, [dispatch, id])

  const toggleProductExpansion = (index) => {
    setExpandedProducts({
      ...expandedProducts,
      [index]: !expandedProducts[index]
    });
  };

  return (
    <>
      <div className='container mx-auto mt-28 mb-20 '>
        <div className='flex items-center justify-between w-5/6 mx-auto'>
          <div>
            <Link to={'/profilelist'}>
              <img src='https://cdn-icons-png.freepik.com/512/2099/2099190.png' alt='back' className='w-10 ml-4 h-auto' />
            </Link>
          </div>
          <div className='text-center flex-grow'>
            <h1 className='text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 mb-6'>Chi tiết hồ sơ thuốc</h1>
          </div>
          {profileApi && profileApi.profileInformation && (profileApi.profileInformation.status === 'DRAFT' || profileApi.profileInformation.status === 'PENDING TO PROCCED') && (
            <div className="flex-shrink-0 ml-auto">
              <Link to={`/updateprofileproduct/${id}`}>
                <button type="button" className="text-white flex bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm py-2.5 text-center p-4 gap-2">
                  <PencilSquare size={20}></PencilSquare> Chỉnh sửa hồ sơ thuốc
                </button>
              </Link>
            </div>
          )}

        </div>
        <div className='w-5/6 h-auto border border-gray-200 shadow-xl mx-auto'>
          <div className='grid grid-cols-1 gap-2 md:grid-cols-2 mt-6'>
            <div className='w-5/6 flex justify-center border-gray-200'>
              {profileApi && profileApi.profileInformation && (
                <img className='max-w-md rounded-md border border-gray-300 hover:scale-110 shadow-lg hover:shadow-2xl transition duration-300' src={profileApi.profileInformation.imageURL || 'https://uicreative.s3.ap-southeast-1.amazonaws.com/wp-content/uploads/2020/01/23073244/company-profile-finance-product-services-1024x683.jpg'} alt='Profile Image' />
              )}
            </div>
            <div className=''>
              <div className='flex justify-between'>
                {profileApi && profileApi.profileInformation && (
                  <h2 className=' mb-4 text-3xl text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 hover:to-yellow-500 font-bold'>{profileApi.profileInformation.title}</h2>
                )}

              </div>
              {profileApi && profileApi.profileInformation && (
                <div>
                  <p className='mb-5'><span className='font-semibold text-lg'>Created By:</span> {profileApi.profileInformation.createdBy}  </p>
                  <p className='mb-5'><span className='font-semibold text-lg'>Created On:</span> {profileApi.profileInformation.createdOn}  </p>
                  <p className='mb-5'><span className='font-semibold text-lg'>Updated By:</span> {profileApi.profileInformation.updatedBy}  </p>
                  <p className='mb-5'><span className='font-semibold text-lg'>Updated On:</span> {profileApi.profileInformation.updatedOn}  </p>
                  <div>
                    {profileApi && profileApi.profileInformation && (
                      <div className='inline-block mr-5'>
                        {profileApi.profileInformation.status === 'DRAFT' ? (
                          <p className='status bg-sky-400 text-white p-2 rounded text-2xl'>Status: {profileApi.profileInformation.status}  </p>
                        ) : profileApi.profileInformation.status === 'PENDING TO PROCCED' ? (
                          <p className='status bg-red-500 text-white p-2 rounded text-2xl'>Status: {profileApi.profileInformation.status}  </p>
                        ) : profileApi.profileInformation.status === 'APPROVE' ? (
                          <p className='status bg-green-500 text-white p-2 rounded text-2xl'>Status: {profileApi.profileInformation.status}  </p>
                        ) : (
                          <p className=''>{profileApi.profileInformation.status}  </p>
                        )}
                      </div>
                    )}
                    <button className='bg-rose-600 border border-gray-200 text-lg inline-block p-2 rounded-full text-white'>PROCESS PROFILE</button>
                  </div>
                </div>
              )}
            </div>
          </div>
          {profileApi && profileApi.profileDetailList && profileApi.profileDetailList.map((detail, index) => (
            <div key={index} className='p-14 mt-5 w-5/6 mx-auto '>
              <button className='w-full' onClick={() => toggleProductExpansion(index)}>

                <div key={index} className=' h-28 relative rounded-xl transition-transform duration-300 hover:scale-100 shadow-xl '>
                  <div className='h-full z-10 border border-gray-300 rounded-xl items-center flex'>
                    <div className='ml-3'>
                      <img className={`logo border border-gray-100 shadow-xl`} src={detail.productResponseDTO.image || 'https://img.freepik.com/free-vector/isometric-gastroenterology-composition-with-view-medication-with-tubes-pills-illustration_1284-63536.jpg'} alt='product' style={{ width: '80px', height: '80px' }} />
                    </div>
                    <div className='flex ml-10'>
                      <div class='flex-grow flex-col'>
                        <div class='mx-6 flex items-center'>
                          <span class='font-bold text-2xl text-amber-500'>{detail.productResponseDTO.name}</span>
                          <span className='inline-block ml-44'>
                            {detail.status === 'DRAFT' ? (
                              <p className='status bg-sky-400 text-white p-2 rounded text-xl'>{detail.status}  </p>
                            ) : detail.status === 'PENDING' ? (
                              <p className='status bg-red-500 text-white p-2 rounded text-xl'>{detail.status}  </p>
                            ) : detail.status === 'APPROVED' ? (
                              <p className='status bg-green-500 text-white p-2 rounded text-xl'>{detail.status}  </p>
                            ) : (
                              <p className='bg-pink-500 text-white p-2 rounded text-xl inline-block'>{detail.status}  </p>
                            )}
                          </span>
                          {/* {profileApi.profileInformation.status === 'APPROVED' ? ( */}
                          <div className='col-span-12 flex p-2 mt-4 ml-24'>
                            <div className="flex items-center mb-4 w-2/3">
                              <input
                                type="checkbox"
                                id="approvedByFDA"
                                // checked={products[index].approvedByFDA}                                
                                className="form-checkbox h-5 w-5 text-blue-500"
                              />
                              <label htmlFor="approvedByFDA" className="ml-2 text-sm font-bold text-green-500">Approved</label>
                            </div>
                            <div className="flex items-center ml-5 mb-4 w-2/3">
                              <input
                                type="checkbox"
                                id="approvedByANSM"
                                // checked={products[index].approvedByByANSM}
                                className="form-checkbox h-5 w-5 text-blue-500"
                              />
                              <label htmlFor="approvedByANSM" className="ml-2 text-sm font-bold text-red-500">Rejected</label>
                            </div>
                          </div>
                          {/* ) : null} */}
                        </div>
                      </div>
                    </div>
                    <div className='w-1/6 flex justify-end mt-3'>
                      <span className=' font-bold'>{expandedProducts[index] ? 'Thu gọn' : 'Hiện'}</span>
                      {expandedProducts[index] ? (
                        <ArrowUp className='' size={25} />
                      ) : (
                        <ArrowDown className='' size={25} />
                      )}
                    </div>
                  </div>
                </div>

              </button>

              <div className={`${!expandedProducts[index] && 'hidden'}`}>
                <div className='mb-6 border-b-2 border-l-2 border-r-2 border-gray-300 p-5'>
                  <div className='grid grid-cols-12 gap-4 p-4'>
                    <div className='col-span-5 py-8'>
                      <img className='w-5/6' src='https://vinmec-prod.s3.amazonaws.com/images/20220324_013008_431435_decolgen-nd.max-1800x1800.jpg' />
                    </div>
                    <div className='col-span-7'>
                      <div className='flex gap-4'>
                        <div class="w-1/2">
                          <label for="base-input" class="block mb-2 text-sm  font-medium text-gray-900">Tên thuốc</label>
                          <input name='name' type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                        </div>
                        <div className='w-1/2'>
                          <label for="base-input" class="block mb-2 text-sm  font-medium text-gray-900">Loại thuốc</label>
                          <select name='categoryId' className='block w-full border border-gray-300 rounded-lg shadow-sm p-2 bg-gray-50' required>
                            <option value=''>Chọn loại thuốc</option>
                            {/* {categoriesAPI && categoriesAPI.map((cate) => (<option value={cate.id}>{cate.title}</option>))} */}
                          </select>

                        </div>
                      </div>
                      <div class="mb-2 w-full">
                        <label for="base-input" class="block mb-2 text-sm  font-medium text-gray-900">Nhãn</label>
                        <input name='labeller' type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                      </div>
                      <div class="mb-2 w-full">
                        <label for="base-input" class="block mb-2 text-sm  font-medium text-gray-900">Đường dẫn</label>
                        <input name='route' type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                      </div>
                      <div class="mb-2 w-full">
                        <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900">Tên đơn thuốc</label>
                        <input name='prescriptionName' type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                      </div>
                    </div>
                  </div>
                  <div className='gap-4 p-4'>
                    <div className="mb-6 border border-gray-300 p-5 w-full">
                      <div className='flex gap-6'>
                        <h3 className="text-sm mb-2 font-bold">Thành phần hoạt chất </h3>
                        <div className="relative px-6" id="customSelect">

                          <form class="max-w-sm mx-auto">
                            <label for="drugId" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hoạt chất: </label>
                            <select class="block w-full mt-1 border border-gray-300 rounded-md shadow-sm p-2.5 bg-gray-50 text-sm" required>
                              <option selected>Chọn hoạt chất</option>

                            </select>
                          </form>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mt-4">
                        <div>
                          <label className="block mb-2 text-sm font-medium text-gray-900">Nồng độ</label>
                          <input name='strength' type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>
                        <div>
                          <label className="block mb-2 text-sm font-medium text-gray-900">Chỉ số nồng độ</label>
                          <input name='strengthNumber' type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>
                        <div>
                          <label className="block mb-2 text-sm font-medium text-gray-900">Đơn vị nồng độ</label>
                          <input name='strengthUnit' type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Thông tin lâm sàng</label>
                        <textarea name='clinicallyRelevant' rows={3} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                      </div>
                    </div>
                  </div>
                  <div class="mb-5 border border-gray-300 p-5">
                    <h3 className='text-lg mb-2 w-full font-bold'>Nhà sản xuất</h3>
                    <div className="flex gap-4">
                      <div className='mb-3 w-2/5'>
                        <label class="block mb-2 text-sm font-medium text-gray-900">Tên nhà sản xuất</label>
                        <input name='manufactor.name' type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />
                      </div>

                      <div class="mb-3 w-2/5">
                        <label class="block mb-2 text-sm font-medium text-gray-900">Quốc gia</label>
                        <select name='countryId' class="block w-full mt-1 border border-gray-300 rounded-md shadow-sm p-2.5 bg-gray-50 text-sm" required>
                          <option value="">Chọn quốc gia</option>
                        </select>
                      </div>
                      <div className='mb-3 w-1/5'>
                        <label class="block mb-2 text-sm font-medium text-gray-900">Điểm số</label>
                        <input name='manufactor.score' type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className='mb-3 w-1/2'>
                        <label class="block mb-2 text-sm font-medium text-gray-900">Nguồn</label>
                        <input name='manufactor.source' type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />
                      </div>
                      <div className='mb-3 w-1/2'>
                        <label class="block mb-2 text-sm font-medium text-gray-900">Công ty</label>
                        <input name='manufactor.company' type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />
                      </div>
                    </div>
                  </div>
                  <div className='col-span-12 flex flex-wrap'>
                    <div className='w-full'> <h2 className="text-2xl w-full font-bold mb-4">Dược lý và di truyền</h2></div>
                    <div className='flex gap-4 w-full'>
                      <div className='w-1/3'>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Độc tính</label>
                        <input name='toxicity' type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />

                      </div>
                      <div className='w-1/3'>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Hấp thụ</label>
                        <input name='asorption' type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />

                      </div>
                      <div className='w-1/3'>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Dược lực học</label>
                        <input name='pharmacodynamic' type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                      </div>
                    </div>
                    <div className='flex w-full gap-4'>
                      <div className='w-1/2'>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Cơ chế hoạt động</label>
                        <textarea rows={3} name='mechanismOfAction' type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                      </div>
                      <div className='mb-3 w-1/2'>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Triệu chứng</label>
                        <textarea rows={3} name='indication' type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />

                      </div>
                    </div>
                  </div>
                  <div className='col-span-12'>
                    <div className='w-full'> <h2 className="text-2xl w-full font-bold mb-4">Dị ứng thuốc</h2></div>
                    <div className='flex gap-4'>
                      <div className='mb-3 w-1/2'>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Chi tiết</label>
                        <textarea rows={2} name='productAllergyDetail.detail' type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />

                      </div>
                      <div className='mb-3 w-1/2'>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Tóm tắt về dị ứng thuốc</label>
                        <textarea rows={2} name='productAllergyDetail.summary' type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />

                      </div>
                    </div>
                  </div>
                  <div className='col-span-12'>
                    <div className='w-full'> <h2 className="text-2xl w-full font-bold mb-4">Chống chỉ định</h2></div>
                    <div className='flex gap-4'>
                      <div className='mb-3 w-1/2'>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Mối liên hệ</label>
                        <input name='contraindication.relationship' type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />

                      </div>
                      <div className='mb-3 w-1/2'>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Giá trị</label>
                        <input name='contraindication.value' type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />

                      </div>
                    </div>
                  </div>
                  <div className='col-span-12'>
                    <h2 className="text-2xl w-full font-bold mb-4">Cơ quan có thẩm quyền</h2>
                    {/* {authorities.map((authority, indexAut) => ( */}
                    <div className="mb-4 flex border border-gray-300 p-5">
                      <div className="mb-2 w-1/2">

                        <label className="block mb-2 text-sm font-medium text-gray-900">Tên chứng nhận</label>
                        <input
                          required
                          type="text"
                          // id={`certificateName${index}`}
                          name="certificateName"

                          className="md:w-2/3 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div className="mb-3 w-1/4">

                        <label class="block mb-2 text-sm font-medium text-gray-900">Quốc gia</label>
                        <select class="block w-full mt-1 border border-gray-300 rounded-md shadow-sm p-2.5 bg-gray-50 text-sm" required>
                          <option value="">Chọn quốc gia</option>

                        </select>
                      </div>

                    </div>
                    {/* )} */}
                  </div>
                  <div className='col-span-12 flex p-2 mt-4'>
                    <div className='w-1/3'> <h2 className="text-2xl w-full font-bold mb-4">Tổ chức quản lí dược</h2></div>
                    <div className="flex items-center mb-4 w-1/3">
                      <input
                        type="checkbox"
                        id="approvedByFDA"
                        // checked={products[index].approvedByFDA}
                        // onChange={(e) => handleProductChange(index, 'approvedByFDA', e.target.checked)}
                        className="form-checkbox h-5 w-5 text-blue-500"

                      />
                      <label htmlFor="approvedByFDA" className="ml-2 text-sm text-gray-700">Approved by FDA</label>
                    </div>

                    <div className="flex items-center mb-4 w-1/3">
                      <input
                        type="checkbox"
                        id="approvedByANSM"
                        // checked={products[index].approvedByByANSM}
                        className="form-checkbox h-5 w-5 text-blue-500"
                      // onChange={(e) => handleProductChange(index, 'approvedByANSM', e.target.checked)}
                      />
                      <label htmlFor="approvedByANSM" className="ml-2 text-sm text-gray-700">Approved by ANSM</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex justify-end mt-5'>
                <button className='border border-gray-100 p-2 bg-green-500 text-white rounded-lg'>
                  Submit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default ProfileDetail