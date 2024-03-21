import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PencilSquare, ArrowUp, ArrowDown, Command } from 'react-bootstrap-icons'
import Swal from 'sweetalert2';
import { getUserDataFromToken } from '../../../redux/auth/loginSlice';
import { fetchProfileProductsDetail, processProfile, submissionStatus } from '../../../redux/profileProduct/profileProductSlice'

const ProfileDetail = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const profileApi = useSelector((profile) => profile.profileProduct.detail)
  
  const [expandedProducts, setExpandedProducts] = useState({});
  const [radioChecked, setRadioChecked] = useState();
  const roleName = getUserDataFromToken()
  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(fetchProfileProductsDetail({ id }))
  }, [dispatch, id])

  const toggleProductExpansion = (index) => {
    setExpandedProducts({
      ...expandedProducts,
      [index]: !expandedProducts[index]
    });
  };

  const handleProcess = async (event) => {
    event.preventDefault();
    try {
      if (profileApi?.profileInformation?.profileId) {
        await dispatch(processProfile({ id: profileApi.profileInformation.profileId }));
        Swal.fire({
          title: 'Success!',
          text: 'Thay đổi trạng thái hồ sơ thành công!',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        }).then(() => {
          dispatch(fetchProfileProductsDetail({ id }))
        });
      } else {
        throw new Error('Profile ID is missing or invalid');
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: `Failed to process profile: ${error.message || 'Unknown error'}`,
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const dataArray = [];
      Object.entries(radioChecked).forEach(([profileDetailId, status]) => {
        dataArray.push({ profileDetailId, status });
      });
      await dispatch(submissionStatus({ profileId: profileApi.profileInformation.profileId, data: dataArray }));
      Swal.fire({
        title: 'Success!',
        text: 'Thay đổi trạng thái thuốc thành công!',
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      }).then(() => {
        Navigate('/profilelist')
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: `Failed to change product status: ${error.message || 'Unknown error'}`,
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      });
    }
  };

  const handleRadioChange = (profileDetailId, status) => {
    setRadioChecked({
      ...radioChecked,
      [profileDetailId]: status
    });
  };

  console.log(radioChecked)

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
            <h1 className='text-4xl font-bold text-blue-800 mb-6'>Chi tiết hồ sơ thuốc</h1>
          </div>
          {profileApi && profileApi.profileInformation && (profileApi.profileInformation.status === 'DRAFT') && (
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
          <div className='grid grid-cols-1 gap-2 md:grid-cols-2 mt-6 mb-6'>
            <div className='w-5/6 flex justify-center border-gray-200'>
              {profileApi && profileApi.profileInformation && (
                <img className='max-w-md rounded-md border border-gray-300 hover:scale-110 shadow-lg hover:shadow-2xl transition duration-300' src={profileApi.profileInformation.imageURL || 'https://uicreative.s3.ap-southeast-1.amazonaws.com/wp-content/uploads/2020/01/23073244/company-profile-finance-product-services-1024x683.jpg'} alt='Profile Image' />
              )}
            </div>
            <div className=''>
              <div className='flex'>
                {profileApi && profileApi.profileInformation && (
                  <h2 className=' mb-4 text-3xl text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 hover:to-yellow-500 font-bold'>{profileApi.profileInformation.title}</h2>
                )}
                {roleName === 'ADMIN' && profileApi && profileApi.profileInformation && profileApi.profileInformation.status === 'PENDING TO APPROVE' ? (
                  <button onClick={handleProcess} className='flex items-center bg-rose-600 border border-gray-200 text-lg p-2 rounded-full text-white ml-28'>
                    <Command className="mr-2" />
                    PROCESS PROFILE
                  </button>
                ) : null}
              </div>
              {profileApi && profileApi.profileInformation && (
                <div>
                  <p className='mb-5'><span className='font-semibold text-lg'>Created By:</span> {profileApi.profileInformation.createdBy}  </p>
                  <p className='mb-5'><span className='font-semibold text-lg'>Created On:</span> {profileApi.profileInformation.createdOn}  </p>
                  <p className='mb-5'><span className='font-semibold text-lg'>Updated By:</span> {profileApi.profileInformation.updatedBy}  </p>
                  <p className='mb-5'><span className='font-semibold text-lg'>Updated On:</span> {profileApi.profileInformation.updatedOn}  </p>
                  <div>
                    <div>
                      <div className='inline-block mr-5'>
                        {profileApi.profileInformation.status === 'DRAFT' ? (
                          <p className='status bg-sky-400 text-white p-2 rounded text-2xl'> {profileApi.profileInformation.status}  </p>
                        ) : profileApi.profileInformation.status === 'PENDING TO APPROVE' || 'PENDING TO PROCEED' || 'PENDING TO SYSTEM' ? (
                          <p className='status bg-red-500 text-white p-2 rounded text-2xl'> {profileApi.profileInformation.status}  </p>
                        ) : profileApi.profileInformation.status === 'APPROVE' ? (
                          <p className='status bg-green-500 text-white p-2 rounded text-2xl'> {profileApi.profileInformation.status}  </p>
                        ) : (
                          <p className=''>{profileApi.profileInformation.status}  </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {profileApi && profileApi.profileDetailList && profileApi.profileDetailList.map((detail, index) => (
            <div key={index} className='mb-10 mt-10 w-5/6 mx-auto '>
              <button className='w-full' >

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
                            ) : detail.status === 'REJECTED BY SYSTEM' || detail.status === 'REJECTED' ? (
                              <p className='status bg-red-500 text-white p-2 rounded text-xl'>{detail.status}  </p>
                            ) : detail.status === 'APPROVED BY SYSTEM' || detail.status === 'APPROVED' ? (
                              <p className='status bg-green-500 text-white p-2 rounded text-xl'>{detail.status}  </p>
                            ) : (
                              <p className='bg-pink-500 text-white p-2 rounded text-xl inline-block'>{detail.status}  </p>
                            )}
                          </span>
                          {profileApi.profileInformation.status === 'PROCESSING' && detail.status === 'APPROVED BY SYSTEM' ? (
                            <div className='col-span-12 flex p-2 mt-4 ml-24'>
                              <div className="flex items-center mb-4 w-2/3">
                                <input
                                  type="radio"
                                  id={`approved-${detail.profileDetailId}`}
                                  name={`status-${detail.profileDetailId}`}
                                  value="APPROVED"
                                  checked={radioChecked && radioChecked[detail.profileDetailId] === 'APPROVED'}
                                  onChange={() => handleRadioChange(detail.profileDetailId, 'APPROVED')}
                                  className="form-radio h-5 w-5 text-blue-500"
                                />
                                <label htmlFor={`approved-${detail.profileDetailId}`} className="ml-2 text-sm font-bold text-green-500">Approved</label>
                              </div>
                              <input
                                type="radio"
                                id={`rejected-${detail.profileDetailId}`}
                                name={`status-${detail.profileDetailId}`}
                                value="REJECTED"
                                checked={radioChecked && radioChecked[detail.profileDetailId] === 'REJECTED'}
                                onChange={() => handleRadioChange(detail.profileDetailId, 'REJECTED')}
                                className="form-radio h-5 w-5 text-blue-500 ml-4"
                              />
                              <label htmlFor={`approved-${detail.profileDetailId}`} className="ml-2 text-sm font-bold text-red-500">Rejected</label>
                            </div>

                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className='w-1/6 flex justify-end mt-3'>
                      <span className=' font-bold' onClick={() => toggleProductExpansion(index)}>{expandedProducts[index] ? 'Thu gọn' : 'Hiện'}</span>
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
                          <input disabled name='name' type="text" value={detail.productResponseDTO.name} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                        </div>
                        <div className='w-1/2'>
                          <label for="base-input" class="block mb-2 text-sm  font-medium text-gray-900">Loại thuốc</label>
                          <input disabled name='name' type="text" value={detail.productResponseDTO.category.title} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                        </div>
                      </div>
                      <div class="mb-2 w-full">
                        <label for="base-input" class="block mb-2 text-sm  font-medium text-gray-900">Nhãn</label>
                        <input disabled name='labeller' value={detail.productResponseDTO.labeller} type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                      </div>
                      <div class="mb-2 w-full">
                        <label for="base-input" class="block mb-2 text-sm  font-medium text-gray-900">Đường dẫn</label>
                        <input disabled name='route' value={detail.productResponseDTO.route} type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                      </div>
                      <div class="mb-2 w-full">
                        <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900">Tên đơn thuốc</label>
                        <input disabled name='prescriptionName' value={detail.productResponseDTO.prescriptionName} type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                      </div>
                    </div>
                  </div>
                  <div className='gap-4 p-4'>
                    <div className=''>
                      <p className='font-bold text-2xl mb-6'>Thành phần hoạt chất:</p>
                      <div className='overflow-x-auto'>
                        <table className='min-w-full divide-y divide-gray-200 border-none'>
                          <thead className='bg-gray-300'>
                            <tr>
                              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider '>Tên</th>
                              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider '>Nồng độ</th>
                              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider '>Số nồng độ</th>
                              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider '>Đơn vị nồng độ</th>
                              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider '>Thông tin lâm sàng</th>
                            </tr>
                          </thead>
                          <tbody className='bg-white divide-y divide-gray-200'>
                            {detail.productResponseDTO.drugIngredients.map((drug, drugIndex) => (
                              <tr key={drugIndex} className='bg-gray-50 hover:bg-slate-100'>
                                <td className='px-6 py-4 whitespace-nowrap'>{drug.name}</td>
                                <td className='px-6 py-4 whitespace-nowrap'>{drug.strength}</td>
                                <td className='px-6 py-4 whitespace-nowrap'>{drug.strengthNumber}</td>
                                <td className='px-6 py-4 whitespace-nowrap'>{drug.strengthUnit}</td>
                                <td className='px-6 py-4 whitespace-nowrap'>{drug.clinicallyRelevant}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <div class="mb-5 border border-gray-300 p-5">
                    <h3 className='text-lg mb-2 w-full font-bold'>Nhà sản xuất</h3>
                    <div className="flex gap-4">
                      <div className='mb-3 w-2/5'>
                        <label class="block mb-2 text-sm font-medium text-gray-900">Tên nhà sản xuất</label>
                        <input disabled name='manufactor.name' value={detail.productResponseDTO.manufactor.name} type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />
                      </div>
                      <div class="mb-3 w-2/5">
                        <label class="block mb-2 text-sm font-medium text-gray-900">Quốc gia</label>
                        <input disabled name='name' type="text" value={detail.productResponseDTO.manufactor.countryName} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                      </div>
                      <div className='mb-3 w-1/5'>
                        <label class="block mb-2 text-sm font-medium text-gray-900">Điểm số</label>
                        <input disabled name='manufactor.score' value={detail.productResponseDTO.manufactor.score} type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className='mb-3 w-1/2'>
                        <label class="block mb-2 text-sm font-medium text-gray-900">Nguồn</label>
                        <input disabled name='manufactor.source' value={detail.productResponseDTO.manufactor.source} type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />
                      </div>
                      <div className='mb-3 w-1/2'>
                        <label class="block mb-2 text-sm font-medium text-gray-900">Công ty</label>
                        <input disabled name='manufactor.company' value={detail.productResponseDTO.manufactor.company} type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />
                      </div>
                    </div>
                  </div>
                  <div className='col-span-12 flex flex-wrap'>
                    <div className='w-full'> <h2 className="text-2xl w-full font-bold mb-4">Dược lý và di truyền</h2></div>
                    <div className='flex gap-4 w-full'>
                      <div className='w-1/3'>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Độc tính</label>
                        <input disabled name='toxicity' value={detail.productResponseDTO.pharmacogenomic.toxicity} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                      </div>
                      <div className='w-1/3'>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Hấp thụ</label>
                        <input disabled name='asorption' value={detail.productResponseDTO.pharmacogenomic.asorption} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />

                      </div>
                      <div className='w-1/3'>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Dược lực học</label>
                        <input disabled name='pharmacodynamic' value={detail.productResponseDTO.pharmacogenomic.pharmacodynamic} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                      </div>
                    </div>
                    <div className='flex w-full gap-4'>
                      <div className='w-1/2'>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Cơ chế hoạt động</label>
                        <textarea rows={3} disabled name='mechanismOfAction' value={detail.productResponseDTO.pharmacogenomic.mechanismOfAction} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                      </div>
                      <div className='mb-3 w-1/2'>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Triệu chứng</label>
                        <textarea rows={3} disabled name='indication' value={detail.productResponseDTO.pharmacogenomic.indication} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                      </div>
                    </div>
                  </div>
                  <div className='col-span-12'>
                    <div className='w-full'> <h2 className="text-2xl w-full font-bold mb-4">Dị ứng thuốc</h2></div>
                    <div className='flex gap-4'>
                      <div className='mb-3 w-1/2'>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Chi tiết</label>
                        <textarea rows={2} disabled name='productAllergyDetail.detail' value={detail.productResponseDTO.productAllergyDetail.detail} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                      </div>
                      <div className='mb-3 w-1/2'>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Tóm tắt về dị ứng thuốc</label>
                        <textarea rows={2} disabled name='productAllergyDetail.summary' value={detail.productResponseDTO.productAllergyDetail.summary} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                      </div>
                    </div>
                  </div>
                  <div className='col-span-12'>
                    <div className='w-full'> <h2 className="text-2xl w-full font-bold mb-4">Chống chỉ định</h2></div>
                    <div className='flex gap-4'>
                      <div className='mb-3 w-1/2'>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Mối liên hệ</label>
                        <input disabled name='contraindication.relationship' value={detail.productResponseDTO.contraindication.relationship} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />

                      </div>
                      <div className='mb-3 w-1/2'>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Giá trị</label>
                        <input disabled name='contraindication.value' value={detail.productResponseDTO.contraindication.value} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />

                      </div>
                    </div>
                  </div>
                  <div className='col-span-12'>
                    <div className='mt-4'>
                      <h2 className='font-bold mb-2 text-2xl'>Cơ quan chứng nhận:</h2>
                      <div className='overflow-x-auto'>
                        <table className='min-w-full divide-y divide-gray-200'>
                          <thead className='bg-gray-300'>
                            <tr>
                              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Tên chứng nhận</th>
                              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Quốc gia</th>
                            </tr>
                          </thead>
                          <tbody className='bg-white divide-y divide-gray-200'>
                            {detail.productResponseDTO.authorities.map((authority, authorityIndex) => (
                              <tr key={authorityIndex} className='bg-gray-50 hover:bg-slate-100'>
                                <td className='px-6 py-4 whitespace-nowrap'>{authority.certificateName}</td>
                                <td className='px-6 py-4 whitespace-nowrap'>{authority.countryName}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <div className='col-span-12 flex p-2 mt-4'>
                    <div className='w-1/3'> <h2 className="text-2xl w-full font-bold mb-4">Tổ chức quản lí dược</h2></div>
                    <div className="flex items-center mb-4 w-1/3">
                      <input
                        type="checkbox"
                        id="approvedByFDA"
                        checked={detail.productResponseDTO.approvedByFDA}
                        className="form-checkbox h-5 w-5 text-blue-500"
                      />
                      <label htmlFor="approvedByFDA" className="ml-2 text-sm text-gray-700">Approved by FDA</label>
                    </div>
                    <div className="flex items-center mb-4 w-1/3">
                      <input
                        type="checkbox"
                        id="approvedByANSM"
                        checked={detail.productResponseDTO.approvedByANSM}
                        className="form-checkbox h-5 w-5 text-blue-500"
                      />
                      <label htmlFor="approvedByANSM" className="ml-2 text-sm text-gray-700">Approved by ANSM</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {profileApi && profileApi.profileInformation && profileApi.profileInformation.status === 'PROCESSING' ? (
            <div className='flex justify-end mt-5 mb-5 mr-28'>
              <button onClick={handleSubmit} className='border border-gray-100 p-2 bg-blue-500 text-white rounded-lg text-xl'>
                Submit
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  )
}

export default ProfileDetail