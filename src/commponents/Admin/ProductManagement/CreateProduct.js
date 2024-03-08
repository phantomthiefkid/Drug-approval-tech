import React, { useEffect, useState } from 'react';
import { Boxes, PlusCircle, XCircle } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createProducts, fetchCategories, fetchCountries } from '../../../redux/approvalProduct/productSlice';
import { fetchDrugs } from '../../../redux/drugManagement/drugSlice'
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

const drugIngredient_initial = {
  drugId: 0,
  strength: '',
  strengthNumber: '',
  strengthUnit: '',
  clinicallyRelevant: ''
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
    drugIngredient_initial
  ]);
  const [drugIngredientsError, setDrugIngredientsError] = useState([])

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

  // const handleValidationDrugIgredient = (product) => {
  //   let error = '';
  //   const specialCharacters = /[@#$%^&*+\=\[\]{}':"\\|<>\/]+/;
  //   product.forEach((ingred, index) => {
  //     if (!ingred.strength) {
  //       error = 'Vui lòng nhập đầy đủ các trường bên trên';
  //       return error
  //     } else if (specialCharacters.test(ingred.strength)) {
  //       error = 'Vui lòng không nhập ký tự đặc biệt';
  //       return error
  //     }

  //     if (!ingred.strengthNumber) {
  //       error = 'Vui lòng nhập đầy đủ các trường bên trên';
  //       return error
  //     } else if (specialCharacters.test(ingred.strengthNumber)) {
  //       error = 'Vui lòng không nhập ký tự đặc biệt';
  //       return error
  //     }

  //     if (!ingred.strengthUnit) {
  //       error = 'Vui lòng nhập đầy đủ các trường bên trên';
  //       return error
  //     } else if (specialCharacters.test(ingred.strengthUnit)) {
  //       error = 'Vui lòng không nhập ký tự đặc biệt';
  //       return error
  //     }

  //     if (!ingred.clinicallyRelevant) {
  //       error = 'Vui lòng nhập đầy đủ các trường bên trên';
  //       return error
  //     } else if (specialCharacters.test(ingred.clinicallyRelevant)) {
  //       error = 'Vui lòng không nhập ký tự đặc biệt';
  //       return error
  //     }
  //   })
  //   return error
  // }

  const handleValidationDrugIgredient = (ingredients) => {
    let errors = [];
    const specialCharacters = /[@#$%^&*+\=\[\]{}':"\\|<>\/]+/;
    // Lặp qua mỗi phần tử trong mảng drugIngredients
    ingredients.forEach((ingredient, index) => {
      // Kiểm tra các điều kiện của từng thuộc tính trong phần tử
      if (!ingredient.strength) {
        errors.push({ index, field: 'strength', message: 'Strength không được bỏ trống!' });
      } else if (specialCharacters.test(ingredient.strength)) {
        errors.push({ index, field: 'strength', message: 'Strength không được có ký tự đặc biệt!' });
      }

      if (!ingredient.strengthNumber) {
        errors.push({ index, field: 'strengthNumber', message: 'strengthNumber không được bỏ trống!' });
      } else if (specialCharacters.test(ingredient.strengthNumber)) {
        errors.push({ index, field: 'strengthNumber', message: 'strengthNumber không được có ký tự đặc biệt!' });
      }

      if (!ingredient.strengthUnit) {
        errors.push({ index, field: 'strengthUnit', message: 'strengthUnit không được bỏ trống!' });
      } else if (specialCharacters.test(ingredient.strengthUnit)) {
        errors.push({ index, field: 'strengthUnit', message: 'strengthUnit không được có ký tự đặc biệt!' });
      }

      if (!ingredient.clinicallyRelevant) {
        errors.push({ index, field: 'clinicallyRelevant', message: 'clinicallyRelevant không được bỏ trống!' });
      } else if (specialCharacters.test(ingredient.clinicallyRelevant)) {
        errors.push({ index, field: 'clinicallyRelevant', message: 'clinicallyRelevant không được có ký tự đặc biệt!' });
      }

      if (!ingredient.drugId) {
        errors.push({ index, field: 'drugId', message: 'drugId không được bỏ trống!' });
      } else if (specialCharacters.test(ingredient.drugId)) {
        errors.push({ index, field: 'drugId', message: 'drugId không được có ký tự đặc biệt!' });
      }
    });

    return errors;
  };

  const handleValidation = (product1) => {
    setProductError({ ...product_err_initial })
    let isValid = false;
    const specialCharacters = /[@#$%^&*+\=\[\]{}':"\\|<>\/]+/;
    if (!product1) {
      isValid = true
      return isValid
    }
    if (product1?.labeller.trim() === '') {
      setProductError(prevState => ({ ...prevState, labeller: 'Nhãn không được bỏ trống!!!' }))
      isValid = true
    } else if (specialCharacters.test(product1.labeller)) {
      setProductError(prevState => ({ ...prevState, labeller: 'Nhãn không được có ký tự đặc biệt!!!' }))
      isValid = true
    }

    if (product1?.name.trim() === '') {
      setProductError(prevState => ({ ...prevState, name: 'Tên thuốc không được bỏ trống!!!' }))
      isValid = true
    } else if (specialCharacters.test(product1.name)) {
      setProductError(prevState => ({ ...prevState, name: 'Tên thuốc không được có ký tự đặc biệt!!!' }))
      isValid = true
    }

    if (product1?.route.trim() === '') {
      setProductError(prevState => ({ ...prevState, route: 'Đường dẫn thuốc không được bỏ trống!!!' }))
      isValid = true
    } else if (specialCharacters.test(product1.route)) {
      setProductError(prevState => ({ ...prevState, route: 'Đường dẫn thuốc không được có ký tự đặc biệt!!!' }))
      isValid = true
    }

    if (product1?.prescriptionName.trim() === '') {
      setProductError(prevState => ({ ...prevState, prescriptionName: 'Tên đơn thuốc không được bỏ trống!!!' }))
      isValid = true
    } else if (specialCharacters.test(product1.prescriptionName)) {
      setProductError(prevState => ({ ...prevState, prescriptionName: 'Tên đơn thuốc không được có ký tự đặc biệt!!!' }))
      isValid = true
    }

    if (product1?.manufactor.name.trim() === '') {
      setProductError(prevState => ({ ...prevState, manufactor: { ...prevState.manufactor, name: 'Tên đơn thuốc không được bỏ trống!!!' } }))
      isValid = true
    } else if (specialCharacters.test(product1.manufactor.name)) {
      setProductError(prevState => ({ ...prevState, manufactor: { ...prevState.manufactor, name: 'Tên đơn thuốc không được có ký tự đặc biệt!!!' } }))
      isValid = true
    }

    if (product1?.manufactor.company.trim() === '') {
      setProductError(prevState => ({ ...prevState, manufactor: { ...prevState.manufactor, company: 'Công ty không được bỏ trống!!!' } }))
      isValid = true
    } else if (specialCharacters.test(product1.manufactor.company)) {
      setProductError(prevState => ({ ...prevState, manufactor: { ...prevState.manufactor, company: 'Công ty không được có ký tự đặc biệt!!!' } }))
      isValid = true
    }

    if (product1?.manufactor.score.trim() === '') {
      setProductError(prevState => ({ ...prevState, manufactor: { ...prevState.manufactor, score: 'Điểm số không được bỏ trống!!!' } }))
      isValid = true
    } else if (specialCharacters.test(product1.manufactor.score)) {
      setProductError(prevState => ({ ...prevState, manufactor: { ...prevState.manufactor, score: 'Điểm số không được có ký tự đặc biệt!!!' } }))
      isValid = true
    }

    if (product1?.manufactor.source.trim() === '') {
      setProductError(prevState => ({ ...prevState, manufactor: { ...prevState.manufactor, source: 'Điểm số không được bỏ trống!!!' } }))
      isValid = true
    } else if (specialCharacters.test(product1.manufactor.source)) {
      setProductError(prevState => ({ ...prevState, manufactor: { ...prevState.manufactor, source: 'Điểm số không được có ký tự đặc biệt!!!' } }))
      isValid = true
    }

    if (product1?.manufactor.countryId === 0 || product1?.manufactor.countryId === -1) {
      setProductError(prevState => ({ ...prevState, manufactor: { ...prevState.manufactor, countryId: 'Vui lòng chọn quốc gia!' } }))
      isValid = true
    }

    if (product1?.pharmacogenomic.indication.trim() === '') {
      setProductError(prevState => ({ ...prevState, pharmacogenomic: { ...prevState.pharmacogenomic, indication: 'Triệu chứng không được bỏ trống!!!' } }))
      isValid = true
    } else if (specialCharacters.test(product1.pharmacogenomic.indication)) {
      setProductError(prevState => ({ ...prevState, pharmacogenomic: { ...prevState.pharmacogenomic, indication: 'Triệu chứng không được có ký tự đặc biệt!!!' } }))
      isValid = true
    }

    if (product1?.pharmacogenomic.asorption.trim() === '') {
      setProductError(prevState => ({ ...prevState, pharmacogenomic: { ...prevState.pharmacogenomic, asorption: 'Vui lòng điền vào trường bên trên!!!' } }))
      isValid = true
    } else if (specialCharacters.test(product1.pharmacogenomic.asorption)) {
      setProductError(prevState => ({ ...prevState, pharmacogenomic: { ...prevState.pharmacogenomic, asorption: 'Vui lòng không được có ký tự đặc biệt!!!' } }))
      isValid = true
    }

    if (product1?.pharmacogenomic.pharmacodynamic.trim() === '') {
      setProductError(prevState => ({ ...prevState, pharmacogenomic: { ...prevState.pharmacogenomic, pharmacodynamic: 'Vui lòng điền vào trường bên trên!!!' } }))
      isValid = true
    } else if (specialCharacters.test(product1.pharmacogenomic.pharmacodynamic)) {
      setProductError(prevState => ({ ...prevState, pharmacogenomic: { ...prevState.pharmacogenomic, pharmacodynamic: 'Vui lòng không được có ký tự đặc biệt!!!' } }))
      isValid = true
    }

    if (product1?.pharmacogenomic.mechanismOfAction.trim() === '') {
      setProductError(prevState => ({ ...prevState, pharmacogenomic: { ...prevState.pharmacogenomic, mechanismOfAction: 'Vui lòng điền vào trường bên trên!!!' } }))
      isValid = true
    } else if (specialCharacters.test(product1.pharmacogenomic.mechanismOfAction)) {
      setProductError(prevState => ({ ...prevState, pharmacogenomic: { ...prevState.pharmacogenomic, mechanismOfAction: 'Vui lòng không được có ký tự đặc biệt!!!' } }))
      isValid = true
    }

    if (product1?.pharmacogenomic.toxicity.trim() === '') {
      setProductError(prevState => ({ ...prevState, pharmacogenomic: { ...prevState.pharmacogenomic, toxicity: 'Vui lòng điền vào trường bên trên!!!' } }))
      isValid = true
    } else if (specialCharacters.test(product1.pharmacogenomic.toxicity)) {
      setProductError(prevState => ({ ...prevState, pharmacogenomic: { ...prevState.pharmacogenomic, toxicity: 'Vui lòng không được có ký tự đặc biệt!!!' } }))
      isValid = true
    }

    if (product1?.productAllergyDetail.detail.trim() === '') {
      setProductError(prevState => ({ ...prevState, productAllergyDetail: { ...prevState.productAllergyDetail, detail: 'Vui lòng điền vào trường bên trên!!!' } }))
      isValid = true
    } else if (specialCharacters.test(product1.productAllergyDetail.detail)) {
      setProductError(prevState => ({ ...prevState, productAllergyDetail: { ...prevState.productAllergyDetail, detail: 'Vui lòng không được có ký tự đặc biệt!!!' } }))
      isValid = true
    }

    if (product1?.productAllergyDetail.summary.trim() === '') {
      setProductError(prevState => ({ ...prevState, productAllergyDetail: { ...prevState.productAllergyDetail, summary: 'Vui lòng điền vào trường bên trên!!!' } }))
      isValid = true
    } else if (specialCharacters.test(product1.productAllergyDetail.summary)) {
      setProductError(prevState => ({ ...prevState, productAllergyDetail: { ...prevState.productAllergyDetail, summary: 'Vui lòng không được có ký tự đặc biệt!!!' } }))
      isValid = true
    }

    if (product1?.contraindication.relationship.trim() === '') {
      setProductError(prevState => ({ ...prevState, contraindication: { ...prevState.contraindication, relationship: 'Vui lòng điền vào trường bên trên!!!' } }))
      isValid = true
    } else if (specialCharacters.test(product1.contraindication.relationship)) {
      setProductError(prevState => ({ ...prevState, contraindication: { ...prevState.contraindication, relationship: 'Vui lòng không được có ký tự đặc biệt!!!' } }))
      isValid = true
    }

    if (product1?.contraindication.value.trim() === '') {
      setProductError(prevState => ({ ...prevState, contraindication: { ...prevState.contraindication, value: 'Vui lòng điền vào trường bên trên!!!' } }))
      isValid = true
    } else if (specialCharacters.test(product1.contraindication.value)) {
      setProductError(prevState => ({ ...prevState, contraindication: { ...prevState.contraindication, value: 'Vui lòng không được có ký tự đặc biệt!!!' } }))
      isValid = true
    }

    if (product1?.categoryId === 0 || product1?.categoryId === -1) {
      setProductError(prevState => ({ ...prevState, categoryId: 'Vui lòng chọn loại thuốc!' }))
      isValid = true
    }
    return isValid
  }

  const handleCheck = () => {

    if (handleValidationDrugIgredient(drugIngredients).length === 0 && !handleValidation(productCreate)) {
      productCreate.drugIngredients = drugIngredients
      productCreate.authorities = authorities
      dispatch(createProducts(productCreate)).then(() => { console.log("thanh cong!!!") })
    } else if (handleValidation(productCreate) && handleValidationDrugIgredient(drugIngredients).length > 0) {
      setDrugIngredientsError(handleValidationDrugIgredient(drugIngredients))
      console.log(handleValidation(productCreate))
    } else if (handleValidationDrugIgredient(drugIngredients).length > 0) {
      console.log(handleValidationDrugIgredient(drugIngredients))
      setDrugIngredientsError(handleValidationDrugIgredient(drugIngredients))
    }
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
                      {productError.name && (<span className='text-red-600'>{productError.name}</span>)}
                    </div>
                    <div class="mb-3 w-full">
                      <label for="base-input" class="block mb-2 text-sm  font-medium text-gray-900">Nhãn</label>
                      <input onChange={handleOnChange} name='labeller' type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                      {productError.labeller && (<span className='text-red-600'>{productError.labeller}</span>)}
                    </div>
                  </div>
                  <div className='flex gap-4'>
                    <div class="mb-3 w-2/3">
                      <label for="base-input" class="block mb-2 text-sm  font-medium text-gray-900">Đường dẫn</label>
                      <input onChange={handleOnChange} name='route' type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                      {productError.route && (<span className='text-red-600'>{productError.route}</span>)}
                    </div>
                    <div className='mb-3 w-1/3'>
                      <label for="base-input" class="block mb-2 text-sm  font-medium text-gray-900">Loại thuốc</label>
                      <select name='categoryId' onChange={handleOnChange} className='block w-full mt-1 border border-gray-300 rounded-lg shadow-sm p-2.5 bg-gray-50'>
                        <option value=''>Chọn loại thuốc</option>
                        {categoriesAPI && categoriesAPI.map((cate) => (<option value={cate.id}>{cate.title}</option>))}
                      </select>
                      {productError.categoryId && productError.categoryId !== -1 && (<span className='text-red-600'>{productError.categoryId}</span>)}
                    </div>
                  </div>

                  <div class="mb-3 w-full">
                    <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900">Tên đơn thuốc</label>
                    <input onChange={handleOnChange} name='prescriptionName' type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                    {productError.prescriptionName && (<span className='text-red-600'>{productError.prescriptionName}</span>)}
                  </div>

                  <div class="mb-5 border border-gray-300 p-5">
                    <h3 className='text-lg mb-2 w-full font-bold'>Nhà sản xuất</h3>
                    <div className="flex gap-4">
                      <div className='mb-3 w-2/3'>
                        <label class="block mb-2 text-sm font-medium text-gray-900">Tên nhà sản xuất</label>
                        <input onChange={handleOnChange} name='manufactor.name' type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />
                        {productError.manufactor.name && (<span className='text-red-600'>{productError.manufactor.name}</span>)}
                      </div>

                      <div class="mb-3 w-1/3">
                        <label class="block mb-2 text-sm font-medium text-gray-900">Quốc gia</label>
                        <select onChange={handleOnChange} name='countryId' class="block w-full mt-1 border border-gray-300 rounded-md shadow-sm p-2.5 bg-gray-50 text-sm">
                          <option value="">Chọn quốc gia</option>
                          {countriesAPI && countriesAPI.map((country) => (<option value={country.id}>{country.name}</option>))}
                        </select>
                        {productError.manufactor.countryId && productError.manufactor.countryId !== -1 && (<span className='text-red-600'>{productError.manufactor.countryId}</span>)}
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className='mb-3 w-2/3'>
                        <label class="block mb-2 text-sm font-medium text-gray-900">Nguồn</label>
                        <input onChange={handleOnChange} name='manufactor.source' type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />
                        {productError.manufactor.source && (<span className='text-red-600'>{productError.manufactor.source}</span>)}
                      </div>
                      <div className='mb-3 w-1/3'>
                        <label class="block mb-2 text-sm font-medium text-gray-900">Điểm số</label>
                        <input onChange={handleOnChange} name='manufactor.score' type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />
                        {productError.manufactor.score && (<span className='text-red-600'>{productError.manufactor.score}</span>)}
                      </div>
                    </div>
                    <div className=''>
                      <label class="block mb-2 text-sm font-medium text-gray-900">Công ty</label>
                      <input onChange={handleOnChange} name='manufactor.company' type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />
                      {productError.manufactor.company && (<span className='text-red-600'>{productError.manufactor.company}</span>)}
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
                    {drugIngredientsError && drugIngredientsError.map((item) => {
                      if (item.index === index)
                        return "Vui lòng điền đủ thông tin và không dùng kí tự đặc biệt!!!"
                    })
                    }
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
                  {productError.pharmacogenomic.indication && (<span className='text-red-600'>{productError.pharmacogenomic.indication}</span>)}
                </div>
                <div className='mb-3 w-full'>
                  <label className="block mb-2 text-sm font-medium text-gray-900">Dược lực học</label>
                  <input onChange={handleOnChange} name='pharmacodynamic' type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                  {productError.pharmacogenomic.pharmacodynamic && (<span className='text-red-600'>{productError.pharmacogenomic.pharmacodynamic}</span>)}
                </div>
                <div className='mb-3 w-full'>
                  <label className="block mb-2 text-sm font-medium text-gray-900">Cơ chế hoạt động</label>
                  <textarea onChange={handleOnChange} rows={2} name='mechanismOfAction' type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                  {productError.pharmacogenomic.mechanismOfAction && (<span className='text-red-600'>{productError.pharmacogenomic.mechanismOfAction}</span>)}
                </div>
                <div className='w-full flex gap-4'>
                  <div className='mb-3 w-1/2'>
                    <label className="block mb-2 text-sm font-medium text-gray-900">Hấp thụ</label>
                    <input onChange={handleOnChange} rows={2} name='asorption' type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                    {productError.pharmacogenomic.asorption && (<span className='text-red-600'>{productError.pharmacogenomic.asorption}</span>)}
                  </div>
                  <div className='mb-3 w-1/2'>
                    <label className="block mb-2 text-sm font-medium text-gray-900">Độc tính</label>
                    <input onChange={handleOnChange} rows={2} name='toxicity' type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                    {productError.pharmacogenomic.toxicity && (<span className='text-red-600'>{productError.pharmacogenomic.toxicity}</span>)}
                  </div>
                </div>
              </div>
              <div className='col-span-12'>
                <div className='w-full'> <h2 className="text-2xl w-full font-bold mb-4">Dị ứng thuốc</h2></div>
                <div className='flex gap-4'>
                  <div className='mb-3 w-1/2'>
                    <label className="block mb-2 text-sm font-medium text-gray-900">Chi tiết</label>
                    <textarea onChange={handleOnChange} rows={2} name='productAllergyDetail.detail' type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                    {productError.productAllergyDetail.detail && (<span className='text-red-600'>{productError.productAllergyDetail.detail}</span>)}
                  </div>
                  <div className='mb-3 w-1/2'>
                    <label className="block mb-2 text-sm font-medium text-gray-900">Tóm tắt về dị ứng thuốc</label>
                    <textarea onChange={handleOnChange} rows={2} name='productAllergyDetail.summary' type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                    {productError.productAllergyDetail.summary && (<span className='text-red-600'>{productError.productAllergyDetail.summary}</span>)}
                  </div>
                </div>
              </div>
              <div className='col-span-12'>
                <div className='w-full'> <h2 className="text-2xl w-full font-bold mb-4">Chống chỉ định</h2></div>
                <div className='flex gap-4'>
                  <div className='mb-3 w-1/2'>
                    <label className="block mb-2 text-sm font-medium text-gray-900">Mối liên hệ</label>
                    <input onChange={handleOnChange} name='contraindication.relationship' type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                    {productError.contraindication.relationship && (<span className='text-red-600'>{productError.contraindication.relationship}</span>)}
                  </div>
                  <div className='mb-3 w-1/2'>
                    <label className="block mb-2 text-sm font-medium text-gray-900">Giá trị</label>
                    <input onChange={handleOnChange} name='contraindication.value' type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                    {productError.contraindication.value && (<span className='text-red-600'>{productError.contraindication.value}</span>)}
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
