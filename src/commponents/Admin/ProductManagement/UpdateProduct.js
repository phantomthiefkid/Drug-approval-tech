import React, { useEffect, useState } from 'react'
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import { PlusCircle, Trash3Fill, ArrowDownCircle } from 'react-bootstrap-icons'

import { fetchDrugs } from '../../../redux/drugManagement/drugSlice'
import { fetchCategories, fetchCountries } from '../../../redux/approvalProduct/productSlice';
import { fetchProductDetail } from '../../../redux/productManagement/ProductSlice';

const UpdateProduct = () => {
  const countriesAPI = useSelector((state) => state.productData.countries);
  const categoriesAPI = useSelector((state) => state.productData.categories);
  const drugsAPI = useSelector((drug) => drug.drugData.data)
  const { id } = useParams();
  const productApi = useSelector((product) => product.product.detail)

  const [showToggle, setShowToggle] = useState([])
  const [showModalsCerti, setShowModalsCerti] = useState([])
  const [showModals, setShowModals] = useState(Array(showToggle.length).fill(false));
  const [searchDrug, setSearchDrug] = useState('')
  const [countriesList, setCountriesList] = useState([])
  const [categoriesList, setCategoriesList] = useState([])
  const [drugList, setDrugList] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCountryNSX, setSelectedCountryNSX] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDrug, setSelectedDrug] = useState('');

  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAdd = () => {
    const add = [...showToggle, []]
    setShowToggle(add)
    setShowModals(Array(add.length).fill(false));
  }

  const handleDelete = (i) => {
    const deleteToggle = [...showToggle]
    deleteToggle.splice(i, 1)
    setShowToggle(deleteToggle)
  }

  const handleAddModal = () => {
    const add = [...showModalsCerti, []]
    setShowModalsCerti(add)
  }

  const handleDeleteModals = (i) => {
    const deleteModal = [...showModalsCerti]
    deleteModal.splice(i, 1)
    setShowModalsCerti(deleteModal)
  }

  const handleToggleClick = (index) => {
    setShowModals((prev) => {
      const newModals = [...prev];
      newModals[index] = !newModals[index];
      return newModals;
    });
  };

  useEffect(() => {
    if (Array.isArray(countriesAPI)) {
      setCountriesList(countriesAPI); //
    }
  }, [countriesAPI]);

  useEffect(() => {
    if (Array.isArray(categoriesAPI)) {
      setCategoriesList(categoriesAPI);
    }
  }, [categoriesAPI]);

  useEffect(() => {
    if (Array.isArray(drugsAPI)) {
      setDrugList(drugsAPI)
    }
  }, [drugsAPI])

  useEffect(() => {
    dispatch(fetchCountries({}))
      .then((response) => { })
      .catch((error) => {
        console.error('Error fetching countries', error)
      })

    dispatch(fetchCategories({}))
      .then((response) => { })
      .catch((error) => {
        console.error('Error fetching categories', error);
      });

    dispatch(fetchDrugs({
      search: searchDrug,
      pageSize: 15,
    }))
      .then((response) => { })
      .catch((error) => {
        console.error('Error fetching drugs', error);
      });
  }, [dispatch, searchDrug])

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(fetchProductDetail({ id })).then(() => { });

  }, [dispatch, id]);

  const handleChangeCountry = (e) => {
    const value = e.target.value;
    console.log("Selected Country ID:", value);
    setSelectedCountry(value);
  };

  const handleChangeDrug = (e) => {
    const value = e.target.value;
    console.log("Selected Drug ID:", value);
    setSelectedDrug(value)
  }
  function handleClick() {
    Swal.fire({
      title: "Thông tin của thuốc sẽ không được lưu?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Có",
      cancelButtonText: "Không",
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      showClass: {
        popup: 'animate__animated animate__fadeIn'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOut'
      },
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        window.scrollTo(0, 0);
        Navigate(`/productdetail/${productApi.id}`);
      }
    });
  }

  return (
    <>
      <div className='mt-20 py-8 '>
        <div class="max-w-6xl mx-auto py-4 lg:px-4 shadow-lg shadow-gray-400 rounded-md">
          <form class="">
            <div class="flex flex-col md:flex-row ">
              <div class="sm:flex-1">
                <div class="flex items-center justify-center">
                  <img className='border-2 rounded-xl' src={"https://t4.ftcdn.net/jpg/05/65/22/41/360_F_565224180_QNRiRQkf9Fw0dKRoZGwUknmmfk51SuSS.jpg"} alt='product' />
                </div>
                <div class="mb-5 flex justify-between mt-5">
                  <label class="block mb-2 text-md font-extrabold text-gray-900 ">Nhà sản xuất:</label>
                  <div className="relative mt-2 mr-24">
                    <select
                      value={selectedCountryNSX}
                      onChange={(e) => setSelectedCountryNSX(e.target.value)} className="appearance-none relative w-full cursor-pointer rounded-md bg-white py-2 pl-3 pr-10 text-left text-gray-900 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label">
                      <option value="" disabled hidden>
                        Chọn Quốc Gia
                      </option>
                      {Array.isArray(countriesList) &&
                        countriesList.map((country, index) => (
                          <option key={index} value={country.id}>
                            {country.name}
                          </option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                {productApi.manufactor && (
                  <>
                    <div className='flex ml-8'>
                      <div class="mb-5 ">
                        <label class="block mb-2 text-sm font-medium text-gray-900 ">Tên nhà sản xuất</label>
                        <input type="text" name='manufactorName' value={productApi.manufactor.name} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />

                      </div>
                      <div class="mb-5 ml-20">
                        <label class="block mb-2 text-sm font-medium text-gray-900 ">Công ty</label>
                        <input type="text" name='company' value={productApi.manufactor.company} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />

                      </div>
                    </div>
                    <div className='flex ml-8'>
                      <div class="mb-5">
                        <label class="block mb-2 text-sm font-medium text-gray-900 ">Điểm đánh giá</label>
                        <input type="text" name='score' value={productApi.manufactor.score} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />

                      </div>
                      <div class="mb-5 ml-20">
                        <label class="block mb-2 text-sm font-medium text-gray-900 ">Nguồn</label>
                        <input type="text" name='source' value={productApi.manufactor.source} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />

                      </div>
                    </div>
                  </>
                )}
                <label class=" flex mb-2 text-md font-extrabold text-gray-900 mt-5 ">Cơ quan chứng nhận:
                  <PlusCircle class="ml-2" size={20} onClick={() => handleAddModal()}></PlusCircle>
                </label>
                {showModalsCerti.map((data, i) => {
                  return (
                    <>
                      <div class=" border border-solid border-gray-200 mb-2 p-2 rounded-md flex w-3/4 justify-between ml-8">
                        <div class="mb-5">
                          <label class="block mb-2 text-sm font-medium text-gray-900 ">Tên chứng nhận</label>
                          <input type="text" name='certificateName' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />

                        </div>
                        <div className='mb-5 mt-4'>
                          <div className="relative mt-2">
                            <select
                              value={selectedCountry}
                              onChange={handleChangeCountry} className="appearance-none relative w-full cursor-pointer rounded-md bg-white py-2 pl-3 pr-10 text-left text-gray-900 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label">
                              <option value="" disabled hidden>
                                Chọn Quốc Gia
                              </option>
                              {Array.isArray(countriesList) &&
                                countriesList.map((country, index) => (
                                  <option key={country.id} value={country.id}>
                                    {country.name}
                                  </option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                  fillRule="evenodd"
                                  d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className='ml-5 mt-8' onClick={() => handleDeleteModals(i)}>
                          <Trash3Fill size={25} color="red"></Trash3Fill>
                        </div>
                      </div>
                    </>
                  )
                })}
                <label class="flex items-center mb-2 text-md font-extrabold text-gray-900">
                  Sản phẩm dị ứng:
                </label>
                {productApi.productAllergyDetail && (
                  <>
                    <div class="mb-5 ml-8 mr-16">
                      <label class="block mb-2 text-sm font-medium text-gray-900 ">Chi tiết</label>
                      <textarea type="text" name='detail' value={productApi.productAllergyDetail.detail} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full " />

                    </div>
                    <div class="mb-5 ml-8 mr-16">
                      <label class="block mb-2 text-sm font-medium text-gray-900 ">Tóm tắt</label>
                      <textarea type="text" name='summary' value={productApi.productAllergyDetail.summary} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full " />

                    </div>
                  </>
                )}
              </div>

              <div class="sm:flex-1 px-2">
                <div className='flex justify-between'>
                  <div class="mb-5">
                    <label class="block mb-2 text-sm font-medium text-gray-900 ">Tên sản phẩm</label>
                    {productApi && productApi.name && (
                      <input type="text" name='name' value={productApi.name} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />
                    )}
                  </div>
                  <div class="mb-5">
                    <label class="block mb-2 text-sm font-medium text-gray-900 ">Người dán nhãn</label>
                    {productApi && productApi.labeller && (
                      <input type="text" name='labeller' value={productApi.labeller} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />
                    )}
                  </div>
                </div>
                <div class="mb-5">
                  <label class="block mb-2 text-sm font-medium text-gray-900 ">Tên đơn thuốc</label>
                  {productApi && productApi.prescriptionName && (
                    <input type="text" name='prescriptionName' value={productApi.prescriptionName} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />
                  )}
                </div>
                <label class="flex items-center mb-2 text-md font-extrabold text-gray-900">
                  Thành phần thuốc: <PlusCircle class="ml-2" size={20} onClick={() => handleAdd()}></PlusCircle>
                  <div className="relative mt-2 ml-14 ">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)} className="appearance-none relative w-full cursor-pointer rounded-md bg-white py-2 pl-3 pr-10 text-left text-gray-900 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label">
                      <option value="" disabled hidden>
                        Loại thuốc
                      </option>
                      {Array.isArray(categoriesList) &&
                        categoriesList.map((category, index) => (
                          <option key={index} value={category.id}>
                            {category.title}
                          </option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </label>
                {showToggle.map((data, i) => {
                  return (
                    <>
                      <div className='border border-solid border-gray-200 p-2 rounded-md mb-2 w-3/4 ml-8'>
                        <div className='mb-1 flex'>
                          <div className="relative mt-2">
                            <select
                              value={selectedDrug}
                              onChange={handleChangeDrug} className="appearance-none relative w-full cursor-pointer rounded-md bg-white py-2 pl-3 pr-10 text-left text-gray-900 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label">
                              <option value="" disabled hidden>
                                Hoạt chất
                              </option>
                              {Array.isArray(drugList) &&
                                drugList.map((drug, index) => (
                                  <option key={index} value={drug.id}>
                                    {drug.name}
                                  </option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                  fillRule="evenodd"
                                  d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          </div>
                          <div className='ml-32 mt-3' onClick={() => handleToggleClick(i)}>
                            <ArrowDownCircle size={25}></ArrowDownCircle>
                          </div>
                          <div className='ml-5 mt-3' onClick={() => handleDelete(i)}>
                            <Trash3Fill size={25} color="red"></Trash3Fill>
                          </div>
                        </div>
                      </div>
                      {showModals[i] && (
                        <div className='border border-solid border-gray-200 p-2 rounded-md mb-5 w-3/4 ml-8'>
                          <div className='flex'>
                            <div class="mb-5">
                              <label class="block mb-2 text-sm font-medium text-gray-900 ">Nồng độ</label>
                              <input type="text" name='strength' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />
                              {/* {errorProduct.drugIngredients.strength && (<span className='text-red-500'>{errorProduct.drugIngredients.strength}</span>)} */}
                            </div>
                            <div class="mb-5 ml-20">
                              <label class="block mb-2 text-sm font-medium text-gray-900 ">Số nồng độ</label>
                              <input type="text" name='strengthNumber' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 " />
                              {/* {errorProduct.drugIngredients.strengthNumber && (<span className='text-red-500'>{errorProduct.drugIngredients.strengthNumber}</span>)} */}
                            </div>
                          </div>
                          <div className='flex'>
                            <div class="mb-5">
                              <label class="block mb-2 text-sm font-medium text-gray-900 ">Đơn vị nồng độ</label>
                              <input type="text" name='strengthUnit' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />
                              {/* {errorProduct.drugIngredients.strengthUnit && (<span className='text-red-500'>{errorProduct.drugIngredients.strengthUnit}</span>)} */}
                            </div>
                            <div class="mb-5 ml-20">
                              <label class="block mb-2 text-sm font-medium text-gray-900 ">Thông tin lâm sàng</label>
                              <input type="text" name='clinicallyRelevant' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />
                              {/* {errorProduct.drugIngredients.clinicallyRelevant && (<span className='text-red-500'>{errorProduct.drugIngredients.clinicallyRelevant}</span>)} */}
                            </div>
                          </div>
                          <div className='text-right mr-10'>
                            <button className='text-white mb-3 hover:scale-110 transition-transform duration-300 bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2 text-center ml-auto'>
                              Lưu
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  )
                })}

                <label class="flex items-center mb-2 text-md font-extrabold text-gray-900">
                  Dược động học:
                </label>
                {productApi && productApi.pharmacogenomic && (
                  <div className='ml-8'>
                    <div class="mb-5">
                      <label class="block mb-2 text-sm font-medium text-gray-900 ">Chỉ dẫn</label>
                      <textarea type="text" name='indication' value={productApi.pharmacogenomic.indication} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full " />
                    </div>
                    <div class="mb-5">
                      <label class="block mb-2 text-sm font-medium text-gray-900 ">Dược động học</label>
                      <textarea type="text" name='pharmacodynamic' value={productApi.pharmacogenomic.pharmacodynamic} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full " />
                    </div>
                    <div class="mb-5">
                      <label class="block mb-2 text-sm font-medium text-gray-900 ">Cơ chế hoạt động</label>
                      <textarea type="text" name='mechanismOfAction' value={productApi.pharmacogenomic.mechanismOfAction} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full " />
                    </div>
                    <div class="mb-5">
                      <label class="block mb-2 text-sm font-medium text-gray-900 ">Sự thấp thụ</label>
                      <textarea type="text" name='asorption' value={productApi.pharmacogenomic.asorption} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full " />
                    </div>
                    <div class="mb-5">
                      <label class="block mb-2 text-sm font-medium text-gray-900 ">Độc tính</label>
                      <textarea type="text" name='toxicity' value={productApi.pharmacogenomic.toxicity} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full " />
                    </div>
                  </div>
                )}

                <label class="flex items-center mb-2 text-md font-extrabold text-gray-900">
                  Chống chỉ định:
                </label>
                {productApi.contraindication && (
                  <>
                    <div class="mb-5 ml-8">
                      <label class="block mb-2 text-sm font-medium text-gray-900 ">Mối quan hệ</label>
                      <textarea type="text" name='relationship' value={productApi.contraindication.relationship} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full " />
                    </div>
                    <div class="mb-5 ml-8">
                      <label class="block mb-2 text-sm font-medium text-gray-900 ">Giá trị</label>
                      <textarea type="text" name='value' value={productApi.contraindication.value} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full " />
                    </div>
                  </>
                )}
                <div class="flex justify-center gap-14 row mt-10 mb-5">
                  <div class="w-1/2 ml-20">
                    <Link to={`/productdetail/${productApi.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleClick();
                      }}>
                      <button className="w-40 rounded-full text-red-600 mb-8 hover:scale-110 transition-transform duration-300 bg-white focus:ring-4 focus:outline-none focus:ring-blue-300 border border-gray-500 text-sm font-bold px-5 py-2.5 focus:z-10">
                        Trở về
                      </button>
                    </Link>
                  </div>
                  <div class="w-1/2 mr-28">
                    <button type='button' className='w-40 rounded-full text-white mb-8 hover:scale-110 transition-transform duration-300 bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold text-sm px-5 py-2.5 text-center ml-auto'>
                      Lưu
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default UpdateProduct