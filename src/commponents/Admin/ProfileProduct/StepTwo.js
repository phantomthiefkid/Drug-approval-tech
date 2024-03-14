import React, { useState, useEffect } from 'react'
import { PlusCircle, XCircle, ArrowUp, ArrowDown } from 'react-bootstrap-icons'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchCategories, fetchCountries } from '../../../redux/approvalProduct/productSlice'
import { fetchDrugs } from '../../../redux/drugManagement/drugSlice'
import { createProfileProductStepTwo } from '../../../redux/profileProduct/profileProductSlice'
const product_initial = {
  labeller: '',
  name: '',
  route: '',
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
  },
  approvedByFDA: false,
  approvedByANSM: false
}

const drugIngredient_initial = {
  drugId: 0,
  strength: '',
  strengthNumber: '',
  strengthUnit: '',
  clinicallyRelevant: ''
}

const authorrities_initial = {
  certificateName: '',
  countryId: 0
}

const initial_data = {
  profileId: 0,
  productList: [],
  status: 'PENDING'
}


const StepTwo = ({ productTitle }) => {
  const [products, setProducts] = useState([product_initial])
  const [stepTwo, setStepTwo] = useState(initial_data)
  const [drugIngredients, setDrugIngredients] = useState([drugIngredient_initial])
  const [authorities, setAuthorities] = useState([authorrities_initial])
  const [expandedProducts, setExpandedProducts] = useState({});
  const categoriesAPI = useSelector((state) => state.productData.categories)
  const countriesAPI = useSelector((state) => state.productData.countries)
  const drugsAPI = useSelector((drug) => drug.drugData.data)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(fetchCountries())
    dispatch(fetchDrugs({}))
  }, [dispatch])
  //-------------------
  const handleAddNewProduct = () => {
    setProducts([...products, product_initial])
  }
  const handleDeleteProduct = (index) => {
    const updateAmountProduct = [...products];
    updateAmountProduct.splice(index, 1)
    setProducts(updateAmountProduct)
  }
  //------------------
  const handleAddNewIngredient = () => {
    setDrugIngredients([...drugIngredients, drugIngredient_initial])
  }
  const handleDeleteIngredient = (index) => {
    const updateIngredients = [...drugIngredients];
    updateIngredients.splice(index, 1)
    setDrugIngredients(updateIngredients)
  }
  //-------------------
  const handleAddAuthority = () => {
    setAuthorities([...authorities, authorrities_initial]);
  };
  const handleDeleteAuthority = (index) => {
    const updatedAuthorities = [...authorities];
    updatedAuthorities.splice(index, 1);
    setAuthorities(updatedAuthorities);
  };
  //------------------
  const toggleProductExpansion = (index) => {
    setExpandedProducts({
      ...expandedProducts,
      [index]: !expandedProducts[index]
    });
  };
  //-----------------
  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...products];

    if (field.startsWith('manufactor')) {
      const manufactorName = field.split('.')[1];
      updatedProducts[index] = {
        ...updatedProducts[index],
        manufactor: {
          ...updatedProducts[index].manufactor,
          [manufactorName]: value
        }
      }
    }
    else if (field.startsWith('productAllergyDetail')) {
      const productAllergyDetailName = field.split('.')[1];
      updatedProducts[index] = {
        ...updatedProducts[index],
        productAllergyDetail: {
          ...updatedProducts[index].productAllergyDetail,
          [productAllergyDetailName]: value
        }
      }
    }
    else if (field.startsWith('pharmacogenomic')) {
      const pharmacogenomicName = field.split('.')[1]
      updatedProducts[index] = {
        ...updatedProducts[index],
        pharmacogenomic: {
          ...updatedProducts[index].pharmacogenomic,
          [pharmacogenomicName]: value
        }
      }
    }
    else if (field.startsWith('contraindication')) {
      const contraindicationName = field.split('.')[1]
      updatedProducts[index] = {
        ...updatedProducts[index],
        contraindication: {
          ...updatedProducts[index].contraindication,
          [contraindicationName]: value
        }
      }
    }
    else if (field === "categoryId") {
      value = parseInt(value);
      updatedProducts[index] = {
        ...updatedProducts[index],
        [field]: value
      }
    }
    else {
      updatedProducts[index] = {
        ...updatedProducts[index],
        [field]: value
      };
    }
    setProducts(updatedProducts);

  };
  //-------------------
  const handleOnChangeIngredient = (indexProduct, indexIngredient, field, value) => {
    // Sao chép mảng products
    const updatedProducts = [...products];

    // Lấy sản phẩm cần cập nhật
    const productToUpdate = { ...updatedProducts[indexProduct] };

    // Sao chép mảng drugIngredients của sản phẩm
    const updatedIngredients = [...productToUpdate.drugIngredients];

    // Kiểm tra nếu field là "drugId", ép giá trị về kiểu number
    if (field === "drugId") {
      value = parseInt(value); // Ép về kiểu number
    }

    // Cập nhật giá trị của trường field cho thành phần hoạt chất tại chỉ số indexIngredient
    updatedIngredients[indexIngredient] = {
      ...updatedIngredients[indexIngredient],
      [field]: value
    };

    // Cập nhật mảng drugIngredients của sản phẩm sau khi đã thay đổi giá trị
    productToUpdate.drugIngredients = updatedIngredients;

    // Cập nhật lại sản phẩm trong mảng products
    updatedProducts[indexProduct] = productToUpdate;

    // Cập nhật state với các sản phẩm đã được cập nhật
    setProducts(updatedProducts);
  };

  const handleOnChangeAuthorities = (indexProduct, indexAuthorities, field, value) => {
    const updatedProducts = [...products];

    // Lấy sản phẩm cần cập nhật
    const productToUpdate = { ...updatedProducts[indexProduct] };

    // Sao chép mảng drugIngredients của sản phẩm
    const updateAuthorities = [...productToUpdate.authorities];

    // Kiểm tra nếu field là "drugId", ép giá trị về kiểu number
    if (field === "countryId") {
      value = parseInt(value); // Ép về kiểu number
    }

    // Cập nhật giá trị của trường field cho thành phần hoạt chất tại chỉ số indexIngredient
    updateAuthorities[indexAuthorities] = {
      ...updateAuthorities[indexAuthorities],
      [field]: value
    };

    // Cập nhật mảng drugIngredients của sản phẩm sau khi đã thay đổi giá trị
    productToUpdate.authorities = updateAuthorities;

    // Cập nhật lại sản phẩm trong mảng products
    updatedProducts[indexProduct] = productToUpdate;

    // Cập nhật state với các sản phẩm đã được cập nhật
    setProducts(updatedProducts);
  }

  const handleSubmit = () => {
    const dataUpdate = { ...stepTwo }
    dataUpdate.productList = [...products]
    dataUpdate.profileId = productTitle

    dispatch(createProfileProductStepTwo(dataUpdate))
    console.log("Check all: ", dataUpdate)
    console.log("Check Id: ", productTitle)
  }
  console.log(products)
  console.log(stepTwo)
  return (
    <div className='w-5/6 mb-5 mt-2 mx-auto h-auto min-h-96 border border-gray-200 shadow-xl'>
      <div className='p-5'>

        {products.map((item, index) => (

          <div key={index} className="mb-6 border border-gray-300 p-5">
            <button className='w-full' onClick={() => toggleProductExpansion(index)}>
              <div key={index} className='bg-blue-600 mt-2 h-12 flex justify-items-center'>
                <h2 className='text-center w-5/6 pt-2 font-bold text-white text-xl'>Thuốc {index + 1}</h2>
                <div className='w-1/6 flex justify-end mt-3'>
                  <span className='text-white font-bold'>{expandedProducts[index] ? 'Thu gọn' : 'Hiện'}</span>
                  {expandedProducts[index] ? (
                    <ArrowUp className='text-white mr-2' size={25} />
                  ) : (
                    <ArrowDown className='text-white mr-2' size={25} />
                  )}

                </div></div></button>
            <div className={`${!expandedProducts[index] && 'hidden'}`}>
              <div className='grid grid-cols-12 gap-4 p-4'>
                <div className='col-span-5 py-8'>
                  <img className='w-5/6' src='https://vinmec-prod.s3.amazonaws.com/images/20220324_013008_431435_decolgen-nd.max-1800x1800.jpg' />

                </div>
                <div className='col-span-7'>
                  <div className='flex gap-4'>
                    <div class="w-1/2">
                      <label for="base-input" class="block mb-2 text-sm  font-medium text-gray-900">Tên thuốc</label>
                      <input name='name' onChange={(e) => handleProductChange(index, 'name', e.target.value)} type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />

                    </div>
                    <div className='w-1/2'>
                      <label for="base-input" class="block mb-2 text-sm  font-medium text-gray-900">Loại thuốc</label>
                      <select name='categoryId' onChange={(e) => handleProductChange(index, 'categoryId', e.target.value)} className='block w-full border border-gray-300 rounded-lg shadow-sm p-2 bg-gray-50' required>
                        <option value=''>Chọn loại thuốc</option>
                        {categoriesAPI && categoriesAPI.map((cate) => (<option value={cate.id}>{cate.title}</option>))}
                      </select>

                    </div>
                  </div>
                  <div class="mb-2 w-full">
                    <label for="base-input" class="block mb-2 text-sm  font-medium text-gray-900">Nhãn</label>
                    <input name='labeller' onChange={(e) => handleProductChange(index, 'labeller', e.target.value)} type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />

                  </div>
                  <div class="mb-2 w-full">
                    <label for="base-input" class="block mb-2 text-sm  font-medium text-gray-900">Đường dẫn</label>
                    <input name='route' onChange={(e) => handleProductChange(index, 'route', e.target.value)} type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                  </div>
                  <div class="mb-2 w-full">
                    <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900">Tên đơn thuốc</label>
                    <input name='prescriptionName' onChange={(e) => handleProductChange(index, 'prescriptionName', e.target.value)} type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                  </div>
                </div>
              </div>
              <div className='gap-4 p-4'>
                {drugIngredients && drugIngredients.map((drug, indexInge) => (<div key={index} className="mb-6 border border-gray-300 p-5 w-full">
                  <div className='flex gap-6'>
                    <h3 className="text-sm mb-2 font-bold">Thành phần hoạt chất {index + 1}</h3>
                    <div className="relative px-6" id="customSelect">

                      <form class="max-w-sm mx-auto">
                        <label for="drugId" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hoạt chất: </label>
                        <select onChange={(e) => handleOnChangeIngredient(index, indexInge, 'drugId', e.target.value)} class="block w-full mt-1 border border-gray-300 rounded-md shadow-sm p-2.5 bg-gray-50 text-sm" required>
                          <option selected>Chọn hoạt chất</option>
                          {drugsAPI && drugsAPI.map((drug) => (<option value={drug.id}>{drug.name}</option>))}
                        </select>
                      </form>

                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900">Nồng độ</label>
                      <input name='strength' onChange={(e) => handleOnChangeIngredient(index, indexInge, 'strength', e.target.value)} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900">Chỉ số nồng độ</label>
                      <input name='strengthNumber' onChange={(e) => handleOnChangeIngredient(index, indexInge, 'strengthNumber', e.target.value)} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900">Đơn vị nồng độ</label>
                      <input name='strengthUnit' onChange={(e) => handleOnChangeIngredient(index, indexInge, 'strengthUnit', e.target.value)} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                    </div>

                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">Thông tin lâm sàng</label>
                    <textarea name='clinicallyRelevant' onChange={(e) => handleOnChangeIngredient(index, indexInge, 'clinicallyRelevant', e.target.value)} rows={3} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                  </div>

                  <div className='flex justify-end'>

                    <button
                      type="button"
                      onClick={() => handleDeleteIngredient(index)}
                      className="mt-2 bg-red-500 text-white font-bold py-2 px-4 rounded-lg inline-flex items-center"
                    >
                      <XCircle className="mr-1" size={20} />
                      Xóa hoạt chất
                    </button>
                  </div>

                </div>))

                }
                <button type="button" className="bg-blue-500 mb-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg inline-flex items-center" onClick={handleAddNewIngredient}>
                  <PlusCircle className="mr-1" size={20} />
                  Thêm thành phần hoạt chất</button>
              </div>
              <div class="mb-5 border border-gray-300 p-5">
                <h3 className='text-lg mb-2 w-full font-bold'>Nhà sản xuất</h3>
                <div className="flex gap-4">
                  <div className='mb-3 w-2/5'>
                    <label class="block mb-2 text-sm font-medium text-gray-900">Tên nhà sản xuất</label>
                    <input name='manufactor.name' onChange={(e) => handleProductChange(index, 'manufactor.name', e.target.value)} type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />

                  </div>

                  <div class="mb-3 w-2/5">
                    <label class="block mb-2 text-sm font-medium text-gray-900">Quốc gia</label>
                    <select onChange={(e) => handleProductChange(index, 'manufactor.countryId', e.target.value)} name='countryId' class="block w-full mt-1 border border-gray-300 rounded-md shadow-sm p-2.5 bg-gray-50 text-sm" required>
                      <option value="">Chọn quốc gia</option>
                      {countriesAPI && countriesAPI.map((country) => (<option value={country.id}>{country.name}</option>))}
                    </select>

                  </div>
                  <div className='mb-3 w-1/5'>
                    <label class="block mb-2 text-sm font-medium text-gray-900">Điểm số</label>
                    <input name='manufactor.score' onChange={(e) => handleProductChange(index, 'manufactor.score', e.target.value)} type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />

                  </div>
                </div>
                <div className="flex gap-4">
                  <div className='mb-3 w-1/2'>
                    <label class="block mb-2 text-sm font-medium text-gray-900">Nguồn</label>
                    <input name='manufactor.source' onChange={(e) => handleProductChange(index, 'manufactor.source', e.target.value)} type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />

                  </div>
                  <div className='mb-3 w-1/2'>
                    <label class="block mb-2 text-sm font-medium text-gray-900">Công ty</label>
                    <input name='manufactor.company' onChange={(e) => handleProductChange(index, 'manufactor.company', e.target.value)} type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />

                  </div>
                </div>

              </div>


              <div className='col-span-12 flex flex-wrap'>
                <div className='w-full'> <h2 className="text-2xl w-full font-bold mb-4">Dược lý và di truyền</h2></div>
                <div className='flex gap-4 w-full'>
                  <div className='w-1/3'>
                    <label className="block mb-2 text-sm font-medium text-gray-900">Độc tính</label>
                    <input name='toxicity' onChange={(e) => handleProductChange(index, 'pharmacogenomic.toxicity', e.target.value)} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />

                  </div>
                  <div className='w-1/3'>
                    <label className="block mb-2 text-sm font-medium text-gray-900">Hấp thụ</label>
                    <input name='asorption' onChange={(e) => handleProductChange(index, 'pharmacogenomic.asorption', e.target.value)} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />

                  </div>
                  <div className='w-1/3'>
                    <label className="block mb-2 text-sm font-medium text-gray-900">Dược lực học</label>
                    <input name='pharmacodynamic' onChange={(e) => handleProductChange(index, 'pharmacogenomic.pharmacodynamic', e.target.value)} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                  </div>
                </div>
                <div className='flex w-full gap-4'>
                  <div className='w-1/2'>
                    <label className="block mb-2 text-sm font-medium text-gray-900">Cơ chế hoạt động</label>
                    <textarea rows={3} name='mechanismOfAction' onChange={(e) => handleProductChange(index, 'pharmacogenomic.mechanismOfAction', e.target.value)} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                  </div>
                  <div className='mb-3 w-1/2'>
                    <label className="block mb-2 text-sm font-medium text-gray-900">Triệu chứng</label>
                    <textarea rows={3} name='indication' onChange={(e) => handleProductChange(index, 'pharmacogenomic.indication', e.target.value)} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />

                  </div>
                </div>
              </div>
              <div className='col-span-12'>
                <div className='w-full'> <h2 className="text-2xl w-full font-bold mb-4">Dị ứng thuốc</h2></div>
                <div className='flex gap-4'>
                  <div className='mb-3 w-1/2'>
                    <label className="block mb-2 text-sm font-medium text-gray-900">Chi tiết</label>
                    <textarea rows={2} name='productAllergyDetail.detail' onChange={(e) => handleProductChange(index, 'productAllergyDetail.detail', e.target.value)} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />

                  </div>
                  <div className='mb-3 w-1/2'>
                    <label className="block mb-2 text-sm font-medium text-gray-900">Tóm tắt về dị ứng thuốc</label>
                    <textarea rows={2} name='productAllergyDetail.summary' onChange={(e) => handleProductChange(index, 'productAllergyDetail.summary', e.target.value)} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />

                  </div>
                </div>
              </div>
              <div className='col-span-12'>
                <div className='w-full'> <h2 className="text-2xl w-full font-bold mb-4">Chống chỉ định</h2></div>
                <div className='flex gap-4'>
                  <div className='mb-3 w-1/2'>
                    <label className="block mb-2 text-sm font-medium text-gray-900">Mối liên hệ</label>
                    <input name='contraindication.relationship' onChange={(e) => handleProductChange(index, 'contraindication.relationship', e.target.value)} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />

                  </div>
                  <div className='mb-3 w-1/2'>
                    <label className="block mb-2 text-sm font-medium text-gray-900">Giá trị</label>
                    <input name='contraindication.value' onChange={(e) => handleProductChange(index, 'contraindication.value', e.target.value)} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />

                  </div>
                </div>
              </div>
              <div className='col-span-12'>
                <h2 className="text-2xl w-full font-bold mb-4">Cơ quan có thẩm quyền</h2>
                {authorities.map((authority, indexAut) => (
                  <div key={index} className="mb-4 flex border border-gray-300 p-5">
                    <div className="mb-2 w-1/2">

                      <label className="block mb-2 text-sm font-medium text-gray-900">Tên chứng nhận</label>
                      <input
                        required
                        type="text"
                        id={`certificateName${index}`}
                        name="certificateName"
                        onChange={(e) => handleOnChangeAuthorities(index, indexAut, 'certificateName', e.target.value)}
                        className="md:w-2/3 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="mb-3 w-1/4">

                      <label class="block mb-2 text-sm font-medium text-gray-900">Quốc gia</label>
                      <select onChange={(e) => handleOnChangeAuthorities(index, indexAut, 'countryId', e.target.value)} class="block w-full mt-1 border border-gray-300 rounded-md shadow-sm p-2.5 bg-gray-50 text-sm" required>
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
              <div className='col-span-12 flex p-2 mt-4'>
                <div className='w-1/3'> <h2 className="text-2xl w-full font-bold mb-4">Tổ chức quản lí dược</h2></div>
                <div className="flex items-center mb-4 w-1/3">
                  <input
                    type="checkbox"
                    id="approvedByFDA"
                    checked={products[index].approvedByFDA}
                    onChange={(e) => handleProductChange(index, 'approvedByFDA', e.target.checked)}
                    className="form-checkbox h-5 w-5 text-blue-500"

                  />
                  <label htmlFor="approvedByFDA" className="ml-2 text-sm text-gray-700">Approved by FDA</label>
                </div>

                <div className="flex items-center mb-4 w-1/3">
                  <input
                    type="checkbox"
                    id="approvedByANSM"
                    checked={products[index].approvedByByANSM}
                    className="form-checkbox h-5 w-5 text-blue-500"
                    onChange={(e) => handleProductChange(index, 'approvedByANSM', e.target.checked)}
                  />
                  <label htmlFor="approvedByANSM" className="ml-2 text-sm text-gray-700">Approved by ANSM</label>
                </div>

              </div>

            </div>
            <div className='flex justify-end'>

              <button
                type="button"
                onClick={() => handleDeleteProduct(index)}
                className={`mt-2 bg-red-500 text-white font-bold py-2 px-4 rounded-lg inline-flex items-center ${!expandedProducts[index] && 'hidden'}`}
              >
                <XCircle className="mr-1" size={20} />
                Xóa Thuốc
              </button>
            </div>
          </div>)

        )}
        <button type="button" className="bg-blue-500 mb-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg inline-flex items-center" onClick={handleAddNewProduct}>
          <PlusCircle className='mr-1' size={20}></PlusCircle>
          Thêm
        </button>
      </div>
      <div className='flex justify-end mr-6 gap-4 mt-3 mb-3'>

        <button className="w-48 rounded-full text-red-600 mb-8 hover:scale-110 transition-transform duration-300 bg-white focus:ring-4 focus:outline-none focus:ring-blue-300 border border-gray-500 text-sm font-bold px-5 py-2.5 focus:z-10">
          Trở về
        </button>


        <button onClick={handleSubmit} type='submit' className='w-48 text-white mb-8 hover:scale-110 transition-transform duration-300 bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-full text-sm px-5 py-2.5 text-center' >
          Lưu
        </button>


      </div>
    </div>
  )
}

export default StepTwo