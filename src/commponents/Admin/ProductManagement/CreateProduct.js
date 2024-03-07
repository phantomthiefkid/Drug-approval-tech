import React, { useEffect, useState } from 'react';
import { Boxes, PlusCircle, XCircle } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createProducts, fetchCategories, fetchCountries } from '../../../redux/approvalProduct/productSlice';
import { fetchDrugs } from '../../../redux/drugManagement/drugSlice'
const product_initial = {
  labeller: '',
  name: '',
  prescriptionName: '',
  drugIngredients: [],
  categoryId: -1,
  manufactor: {
    name: '',
    company: '',
    score: '',
    source: '',
    countryId: -1
  },
  authorities: [],
  pharmacogenomic: {
    indication: '',
    pharmacodynamic: '',
    mechanismOfAction: '',
    asorption: '',
    toxicity: ''
  },
  productAllergyDetail: {
    detail: '',
    summary: ''
  },
  contraindication: {
    relationship: '',
    value: ''
  }
}

const product_err_initial = {
  labeller: '',
  name: '',
  prescriptionName: '',
  drugIngredients: [],
  categoryId: -1,
  manufactor: {
    name: '',
    company: '',
    score: '',
    source: '',
    countryId: -1
  },
  authorities: [],
  pharmacogenomic: {
    indication: '',
    pharmacodynamic: '',
    mechanismOfAction: '',
    asorption: '',
    toxicity: ''
  },
  productAllergyDetail: {
    detail: '',
    summary: ''
  },
  contraindication: {
    relationship: '',
    value: ''
  }
}

const CreateProduct = () => {
  const categoriesAPI = useSelector((state) => state.productData.categories)
  const countriesAPI = useSelector((state) => state.productData.countries)
  const drugsAPI = useSelector((drug) => drug.drugData.data)
  const [productCreate, setProductCreate] = useState(product_initial)
  const [productError, setProductError] = useState(product_err_initial)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(fetchCountries())
    dispatch(fetchDrugs({}))
  }, [dispatch])

  const [drugIngredients, setDrugIngredients] = useState([
    { drugId: 0, strength: '', strengthNumber: '', strengthUnit: '', clinicallyRelevant: '' }
  ]);

  const handleAddIngredient = () => {
    setDrugIngredients([...drugIngredients, { drugId: 0, strength: '', strengthNumber: '', strengthUnit: '', clinicallyRelevant: '' }]);
  };


  const handleChangeIngredient = (index, event) => {
    const { name, value } = event.target;
    const updatedIngredients = [...drugIngredients];

    if (event.target.tagName === 'SELECT') {
      updatedIngredients[index]['drugId'] = parseInt(value);
    } else {
      updatedIngredients[index][name] = value;
    }

    setDrugIngredients(updatedIngredients);
  };

  const handleDeleteIngredient = (index) => {
    const updatedIngredients = [...drugIngredients];
    updatedIngredients.splice(index, 1)
    setDrugIngredients(updatedIngredients);
  };

  //------------------------------------
  const [authorities, setAuthorities] = useState([
    { certificateName: '', countryId: 0 }
  ]);
  const handleAddAuthority = () => {
    setAuthorities([...authorities, { certificateName: '', countryId: 0 }]);
  };

  const handleChangeAuthority = (index, event) => {
    const { name, value } = event.target;
    const updatedAuthorities = [...authorities];
    if (event.target.tagName === 'SELECT') {
      updatedAuthorities[index]['countryId'] = parseInt(value);
    } else {
      updatedAuthorities[index][name] = value
    }
    setAuthorities(updatedAuthorities)
  };

  const handleDeleteAuthority = (index) => {
    const updatedAuthorities = [...authorities];
    updatedAuthorities.splice(index, 1);
    setAuthorities(updatedAuthorities);
  };
  //-------------------
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    if (
      name === 'indication' ||
      name === 'pharmacodynamic' ||
      name === 'mechanismOfAction' ||
      name === 'asorption' ||
      name === 'toxicity' ||
      name === 'detail' ||
      name === 'summary' ||
      name === 'relationship' ||
      name === 'countryId'
    ) {
      if (name === 'countryId') {
        // Update countryId within manufactor object
        setProductCreate({
          ...productCreate,
          manufactor: {
            ...productCreate.manufactor,
            countryId: value === '' ? '' : parseInt(value), // Check if value is empty before parsing
          },
        });
      } else {
        // Update other fields within pharmacogenomic
        setProductCreate({
          ...productCreate,
          pharmacogenomic: {
            ...productCreate.pharmacogenomic,
            [name]: value,
          },
        });
      }
    } else if (name.startsWith('manufactor')) {
      // Update other fields within manufactor
      const manufactorName = name.split('.')[1];
      setProductCreate({
        ...productCreate,
        manufactor: {
          ...productCreate.manufactor,
          [manufactorName]: value,
        },
      });
    } else if (name === 'categoryId') {
      // Update categoryId
      setProductCreate({
        ...productCreate,
        [name]: parseInt(value),
      });
    } else if (name.startsWith('contraindication')) {
      // Update other fields within contraindication
      const fieldName = name.split('.')[1];
      setProductCreate({
        ...productCreate,
        contraindication: {
          ...productCreate.contraindication,
          [fieldName]: value,
        },
      });
    } else if (name.startsWith('productAllergyDetail')) {
      // Update other fields within productAllergyDetail
      const fieldName = name.split('.')[1];
      setProductCreate({
        ...productCreate,
        productAllergyDetail: {
          ...productCreate.productAllergyDetail,
          [fieldName]: value,
        },
      });
    } else {
      // Update other fields
      setProductCreate({ ...productCreate, [name]: value });
    }
  };


  const handleCheck = () => {

    productCreate.drugIngredients = drugIngredients
    productCreate.authorities = authorities
    dispatch(createProducts(productCreate))
  }
  return (
    <>
      <div className='mt-20 mb-16'>
        <div className='py-8 flex px-48'>
          <h1 className='italic text-3xl font-extrabold text-blue-800 flex'>
            <Boxes size={48}></Boxes>
            <span className='ml-2'>Thêm mới thuốc</span>
          </h1>
        </div>
        <div>
          <div className='w-5/6 mx-auto shadow-sm shadow-gray-400'>
            <div className='bg-blue-600 mt-2 h-12'><h2 className='text-center pt-2 font-bold text-white text-xl'>Thuốc mới</h2></div>
            <form className='py-10 w-5/6 mx-auto grid grid-cols-12 gap-8'>
              <div className='col-span-5 py-8'>
                <img className='border-2 rounded-xl' src="https://www.shutterstock.com/image-vector/no-image-available-picture-coming-600nw-2057829641.jpg" alt='drug' />
              </div>
              <div className='col-span-7'>
                <div className='w-full'>
                  <div className='flex gap-4'>
                    <div class="mb-3 w-full">
                      <label for="base-input" class="block mb-2 text-sm  font-medium text-gray-900">Tên thuốc</label>
                      <input onChange={handleOnChange} name='name' type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />

                    </div>
                    <div class="mb-3 w-full">
                      <label for="base-input" class="block mb-2 text-sm  font-medium text-gray-900">Nhãn</label>
                      <input onChange={handleOnChange} name='labeller' type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />

                    </div>
                  </div>
                  <div className='flex gap-4'>
                    <div class="mb-3 w-2/3">
                      <label for="base-input" class="block mb-2 text-sm  font-medium text-gray-900">Đường dẫn</label>
                      <input onChange={handleOnChange} type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />

                    </div>
                    <div className='mb-3 w-1/3'>
                      <label for="base-input" class="block mb-2 text-sm  font-medium text-gray-900">Loại thuốc</label>
                      <select name='categoryId' onChange={handleOnChange} className='block w-full mt-1 border border-gray-300 rounded-lg shadow-sm p-2.5 bg-gray-50'>
                        <option value=''>Chọn loại thuốc</option>
                        {categoriesAPI && categoriesAPI.map((cate) => (<option value={cate.id}>{cate.title}</option>))}
                      </select>
                    </div>
                  </div>

                  <div class="mb-3 w-full">
                    <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900">Tên đơn thuốc</label>
                    <input onChange={handleOnChange} name='prescriptionName' type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />

                  </div>

                  <div class="mb-5 border border-gray-300 p-5">
                    <h3 className='text-lg mb-2 w-full font-bold'>Nhà sản xuất</h3>
                    <div className="flex gap-4">
                      <div className='mb-3 w-2/3'>
                        <label class="block mb-2 text-sm font-medium text-gray-900">Tên nhà sản xuất</label>
                        <input onChange={handleOnChange} name='manufactor.name' type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />
                      </div>

                      <div class="mb-3 w-1/3">
                        <label class="block mb-2 text-sm font-medium text-gray-900">Quốc gia</label>
                        <select onChange={handleOnChange} name='countryId' class="block w-full mt-1 border border-gray-300 rounded-md shadow-sm p-2.5 bg-gray-50 text-sm">
                          <option value="">Chọn quốc gia</option>
                          {countriesAPI && countriesAPI.map((country) => (<option value={country.id}>{country.name}</option>))}
                        </select>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className='mb-3 w-2/3'>
                        <label class="block mb-2 text-sm font-medium text-gray-900">Nguồn</label>
                        <input onChange={handleOnChange} name='manufactor.source' type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />
                      </div>
                      <div className='mb-3 w-1/3'>
                        <label class="block mb-2 text-sm font-medium text-gray-900">Điểm số</label>
                        <input onChange={handleOnChange} name='manufactor.score' type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />
                      </div>
                    </div>
                    <div className=''>
                      <label class="block mb-2 text-sm font-medium text-gray-900">Công ty</label>
                      <input onChange={handleOnChange} name='manufactor.company' type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />
                    </div>
                  </div>


                </div>

              </div>
              <div className='col-span-12'>
                <h3 className="text-lg mb-2 font-bold">Thành phần hoạt chất</h3>
                {drugIngredients.map((ingredient, index) => (
                  <div key={index} className="mb-6 border border-gray-300 p-5">
                    <div className='flex gap-6'>
                      <h3 className="text-sm mb-2 font-bold">Thành phần hoạt chất {index + 1}</h3>
                      <div className="relative px-6" id="customSelect">

                        <form class="max-w-sm mx-auto">
                          <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hoạt chất: </label>
                          <select onChange={(event) => handleChangeIngredient(index, event)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected>Chọn hoạt chất</option>
                            {drugsAPI && drugsAPI.map((drug) => (<option value={drug.id}>{drug.name}</option>))}
                          </select>
                        </form>

                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Nồng độ</label>
                        <input name='strength' value={ingredient.strength} onChange={(event) => handleChangeIngredient(index, event)} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Chỉ số nồng độ</label>
                        <input name='strengthNumber' value={ingredient.strengthNumber} onChange={(event) => handleChangeIngredient(index, event)} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Đơn vị nồng độ</label>
                        <input name='strengthUnit' value={ingredient.strengthUnit} onChange={(event) => handleChangeIngredient(index, event)} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                      </div>

                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900">Thông tin lâm sàng</label>
                      <textarea name='clinicallyRelevant' onChange={(event) => handleChangeIngredient(index, event)} rows={3} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                    </div>
                    <div className='flex justify-end'>
                      <button
                        type="button"
                        onClick={() => handleDeleteIngredient(index)}
                        className="mt-2 bg-red-500 text-white font-bold py-2 px-4 rounded-lg inline-flex items-center"
                      >
                        <XCircle className="mr-1" size={20} />
                        Xóa
                      </button>
                    </div>
                  </div>
                ))}
                <button type="button" className="bg-blue-500 mb-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleAddIngredient}>Thêm thành phần hoạt chất</button>
                <hr></hr>
              </div>

              <div className='col-span-12 flex flex-wrap'>
                <div className='w-full'> <h2 className="text-2xl w-full font-bold mb-4">Dược lý và di truyền</h2></div>
                <div className='mb-3 w-full'>
                  <label className="block mb-2 text-sm font-medium text-gray-900">Triệu chứng</label>
                  <textarea onChange={handleOnChange} rows={3} name='indication' type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                </div>
                <div className='mb-3 w-full'>
                  <label className="block mb-2 text-sm font-medium text-gray-900">Dược lực học</label>
                  <input onChange={handleOnChange} name='pharmacodynamic' type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                </div>
                <div className='mb-3 w-full'>
                  <label className="block mb-2 text-sm font-medium text-gray-900">Cơ chế hoạt động</label>
                  <textarea onChange={handleOnChange} rows={2} name='mechanismOfAction' type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                </div>
                <div className='w-full flex gap-4'>
                  <div className='mb-3 w-1/2'>
                    <label className="block mb-2 text-sm font-medium text-gray-900">Hấp thụ</label>
                    <input onChange={handleOnChange} rows={2} name='asorption' type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                  </div>
                  <div className='mb-3 w-1/2'>
                    <label className="block mb-2 text-sm font-medium text-gray-900">Độc tính</label>
                    <input onChange={handleOnChange} rows={2} name='toxicity' type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                  </div>
                </div>
              </div>
              <div className='col-span-12'>
                <div className='w-full'> <h2 className="text-2xl w-full font-bold mb-4">Dị ứng thuốc</h2></div>
                <div className='flex gap-4'>
                  <div className='mb-3 w-1/2'>
                    <label className="block mb-2 text-sm font-medium text-gray-900">Chi tiết</label>
                    <textarea onChange={handleOnChange} rows={2} name='productAllergyDetail.detail' type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                  </div>
                  <div className='mb-3 w-1/2'>
                    <label className="block mb-2 text-sm font-medium text-gray-900">Tóm tắt về dị ứng thuốc</label>
                    <textarea onChange={handleOnChange} rows={2} name='productAllergyDetail.summary' type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                  </div>
                </div>
              </div>
              <div className='col-span-12'>
                <div className='w-full'> <h2 className="text-2xl w-full font-bold mb-4">Chống chỉ định</h2></div>
                <div className='flex gap-4'>
                  <div className='mb-3 w-1/2'>
                    <label className="block mb-2 text-sm font-medium text-gray-900">Mối liên hệ</label>
                    <input onChange={handleOnChange} name='contraindication.relationship' type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                  </div>
                  <div className='mb-3 w-1/2'>
                    <label className="block mb-2 text-sm font-medium text-gray-900">Giá trị</label>
                    <input onChange={handleOnChange} name='contraindication.value' type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                  </div>
                </div>
              </div>


              <div className='col-span-12'>
                <h2 className="text-2xl w-full font-bold mb-4">Cơ quan có thẩm quyền</h2>
                {authorities.map((authority, index) => (
                  <div key={index} className="mb-4 flex border border-gray-300 p-5">
                    <div className="mb-2 w-1/2">

                      <label className="block mb-2 text-sm font-medium text-gray-900">Tên chứng nhận</label>
                      <input
                        type="text"
                        id={`certificateName${index}`}
                        name="certificateName"
                        value={authority.certificateName}
                        onChange={(event) => handleChangeAuthority(index, event)}
                        className="md:w-2/3 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="mb-3 w-1/4">

                      <label class="block mb-2 text-sm font-medium text-gray-900">Quốc gia</label>
                      <select onChange={(event) => handleChangeAuthority(index, event)} class="block w-full mt-1 border border-gray-300 rounded-md shadow-sm p-2.5 bg-gray-50 text-sm">
                        <option value="">Chọn quốc gia</option>
                        {countriesAPI && countriesAPI.map((country) => (<option value={country.id}>{country.name}</option>))}
                      </select>
                    </div>

                    <div className='w-1/4 mt-6'><button
                      type="button"
                      onClick={() => handleDeleteAuthority(index)}
                      className="mt-1 ml-8 bg-red-500 text-white font-bold py-2 px-4 rounded-lg inline-flex items-center"
                    >
                      <XCircle className="mr-1" size={20} />
                      Xóa
                    </button></div>

                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddAuthority}
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg inline-flex items-center"
                >
                  <PlusCircle className="mr-1" size={20} />
                  Thêm cơ quan có thẩm quyền
                </button>

              </div>
              <div>

              </div>
            </form>
            <button onClick={handleCheck}>click</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateProduct;
