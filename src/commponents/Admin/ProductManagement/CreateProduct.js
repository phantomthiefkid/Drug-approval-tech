import React, { useEffect, useState } from 'react'
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { PlusCircle, Trash3Fill, ArrowDownCircle } from 'react-bootstrap-icons'

import { fetchDrugs } from '../../../redux/drugManagement/drugSlice'
import { fetchCategories, fetchCountries, createProducts } from '../../../redux/approvalProduct/productSlice';

const CreateProduct = () => {

  const countriesAPI = useSelector((state) => state.productData.countries);
  const categoriesAPI = useSelector((state) => state.productData.categories);
  const drugsAPI = useSelector((drug) => drug.drugData.data)

  const [showToggle, setShowToggle] = useState([])
  const [showModals, setShowModals] = useState(Array(showToggle.length).fill(false));
  const [countriesList, setCountriesList] = useState([])
  const [categoriesList, setCategoriesList] = useState([])
  const [drugList, setDrugList] = useState([]);
  const [searchCountries, setSearchCountries] = useState('')
  const [searchCategories, setSearchCategories] = useState('')
  const [searchDrug, setSearchDrug] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCountryNSX, setSelectedCountryNSX] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDrug, setSelectedDrug] = useState('');
  const Navigate = useNavigate();
  const product_initial = {
    labeller: '',
    name: '',
    prescriptionName: '',
    drugIngredients: [
      {
        drugId: selectedDrug,
        strength: '',
        strengthNumber: '',
        strengthUnit: '',
        clinicallyRelevant: ''
      }],
    categoryId: selectedCategory,
    manufactor: {
      name: '',
      company: '',
      score: '',
      source: '',
      countryId: selectedCountryNSX
    },
    authorities: [
      {
        certificateName: '',
        countryId: selectedCountry
      }],
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
  const product_error = {
    labeller: '',
    name: '',
    prescriptionName: '',
    drugIngredients: [
      {
        // drugId: 0,
        strength: '',
        strengthNumber: '',
        strengthUnit: '',
        clinicallyRelevant: ''
      }
    ],
    // categoryId: 0,
    manufactor: {
      name: '',
      company: '',
      score: '',
      source: '',
      // countryId: 0
    },
    authorities: [
      {
        certificateName: '',
        // countryId: 0
      }
    ],
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
  const [product, setProduct] = useState(product_initial)
  const [errorProduct, setErrorProduct] = useState(product_error)
  const dispatch = useDispatch();
  const [drugInputs, setDrugInputs] = useState(Array(showToggle.length).fill({ strength: '', strengthNumber: '', strengthUnit: '', clinicallyRelevant: '' }));


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

  const handleSearchChange = (e) => setSearchDrug(e.target.value);

  const handleValidation = (product) => {
    setErrorProduct({ ...product_error });
    const specialCharacters = /[@#$%^&*+\=\[\]{}':"\\|<>\/]+/;
    let isValid = false;
    if (!product) {
      isValid = true;
      return isValid
    }
    if (product?.labeller.trim() === '') {
      setErrorProduct(prevState => ({ ...prevState, labeller: "Người dán nhãn không được bỏ trống!" }));
      isValid = true;
    } else if (specialCharacters.test(product.labeller)) {
      setErrorProduct(prevState => ({ ...prevState, labeller: "Người dán nhãn không được chứa ký tự đặc biệt!" }));
      isValid = true;
    }
    if (product?.name.trim() === '') {
      setErrorProduct(prevState => ({ ...prevState, name: "Tên thuốc không được bỏ trống!" }));
      isValid = true;
    } else if (specialCharacters.test(product.name)) {
      setErrorProduct(prevState => ({ ...prevState, name: "Tên thuốc không được chứa ký tự đặc biệt!" }));
      isValid = true;
    }
    if (product?.prescriptionName.trim() === '') {
      setErrorProduct(prevState => ({ ...prevState, prescriptionName: "Tên đơn thuốc không được bỏ trống!" }));
      isValid = true;
    } else if (specialCharacters.test(product.prescriptionName)) {
      setErrorProduct(prevState => ({ ...prevState, prescriptionName: "Tên đơn thuốc không được chứa ký tự đặc biệt!" }));
      isValid = true;
    }

    if (product?.drugIngredients && product.drugIngredients.strength.trim() === '') {
      setErrorProduct(prevState => ({ ...prevState, drugIngredients: "Độ mạnh của thuốc không được bỏ trống!", }));
      isValid = true;
    } else if (specialCharacters.test(product.drugIngredients.strength)) {
      setErrorProduct(prevState => ({ ...prevState, drugIngredients: "Độ mạnh của thuốc không được chứa ký tự đặc biệt!", }));
      isValid = true;
    } else {
      setErrorProduct(prevState => ({ ...prevState, drugIngredients: null }));
      isValid = false;
    }
    if (product?.drugIngredients && product.drugIngredients.strengthNumber.trim() === '') {
      setErrorProduct(prevState => ({ ...prevState, drugIngredients: "Số độ mạnh không được bỏ trống!", }));
      isValid = true;
    } else if (specialCharacters.test(product.drugIngredients.strengthNumber)) {
      setErrorProduct(prevState => ({ ...prevState, drugIngredients: "Số độ mạnh không được chứa ký tự đặc biệt!", }));
      isValid = true;
    } else {
      setErrorProduct(prevState => ({ ...prevState, drugIngredients: null }));
      isValid = false;
    }
    if (product?.drugIngredients && product.drugIngredients.strengthUnit.trim() === '') {
      setErrorProduct(prevState => ({ ...prevState, drugIngredients: "Độ mạnh đơn vị không được bỏ trống!", }));
      isValid = true;
    } else if (specialCharacters.test(product.drugIngredients.strengthUnit)) {
      setErrorProduct(prevState => ({ ...prevState, drugIngredients: "Độ mạnh đơn vị không được chứa ký tự đặc biệt!", }));
      isValid = true;
    } else {
      setErrorProduct(prevState => ({ ...prevState, drugIngredients: null }));
      isValid = false;
    }
    if (product?.drugIngredients && product.drugIngredients.clinicallyRelevant.trim() === '') {
      setErrorProduct(prevState => ({ ...prevState, drugIngredients: "Lâm sàng không được bỏ trống!", }));
      isValid = true;
    } else if (specialCharacters.test(product.drugIngredients.clinicallyRelevant)) {
      setErrorProduct(prevState => ({ ...prevState, drugIngredients: "Lâm sàng không được chứa ký tự đặc biệt!", }));
      isValid = true;
    } else {
      setErrorProduct(prevState => ({ ...prevState, drugIngredients: null }));
      isValid = false;
    }
    if (product?.manufactor && product.manufactor.name.trim() === '') {
      setErrorProduct(prevState => ({ ...prevState, manufactor: "Tên nhà sản xuất không được bỏ trống!", }));
      isValid = true;
    } else if (specialCharacters.test(product.manufactor.name)) {
      setErrorProduct(prevState => ({ ...prevState, manufactor: "Tên nhà sản xuất không được chứa ký tự đặc biệt!", }));
      isValid = true;
    } else {
      setErrorProduct(prevState => ({ ...prevState, manufactor: null }));
      isValid = false;
    }
    if (product?.manufactor && product.manufactor.company.trim() === '') {
      setErrorProduct(prevState => ({ ...prevState, manufactor: "Tên Công ty không được bỏ trống!", }));
      isValid = true;
    } else if (specialCharacters.test(product.manufactor.company)) {
      setErrorProduct(prevState => ({ ...prevState, manufactor: "Tên Công ty không được chứa ký tự đặc biệt!", }));
      isValid = true;
    } else {
      setErrorProduct(prevState => ({ ...prevState, manufactor: null }));
      isValid = false;
    }
    if (product?.manufactor && product.manufactor.score.trim() === '') {
      setErrorProduct(prevState => ({ ...prevState, manufactor: "Điểm của Công ty không được bỏ trống!", }));
      isValid = true;
    } else if (specialCharacters.test(product.manufactor.score)) {
      setErrorProduct(prevState => ({ ...prevState, manufactor: "Điểm của Công ty không được chứa ký tự đặc biệt!", }));
      isValid = true;
    } else {
      setErrorProduct(prevState => ({ ...prevState, manufactor: null }));
      isValid = false;
    }
    if (product?.manufactor && product.manufactor.source.trim() === '') {
      setErrorProduct(prevState => ({ ...prevState, manufactor: "Nguồn của Công ty không được bỏ trống!", }));
      isValid = true;
    } else if (specialCharacters.test(product.manufactor.source)) {
      setErrorProduct(prevState => ({ ...prevState, manufactor: "Nguồn của Công ty không được chứa ký tự đặc biệt!", }));
      isValid = true;
    } else {
      setErrorProduct(prevState => ({ ...prevState, manufactor: null }));
      isValid = false;
    }
    if (product?.authorities && product.authorities.certificateName.trim() === '') {
      setErrorProduct(prevState => ({ ...prevState, authorities: "Tên chứng chỉ không được bỏ trống!", }));
      isValid = true;
    } else if (specialCharacters.test(product.authorities.certificateName)) {
      setErrorProduct(prevState => ({ ...prevState, authorities: "Tên chứng chỉ không được chứa ký tự đặc biệt!", }));
      isValid = true;
    } else {
      setErrorProduct(prevState => ({ ...prevState, authorities: null }));
      isValid = false;
    }
    if (product?.pharmacogenomic && product.pharmacogenomic.indication.trim() === '') {
      setErrorProduct(prevState => ({ ...prevState, pharmacogenomic: "Chỉ dẫn không được bỏ trống!", }));
      isValid = true;
    } else if (specialCharacters.test(product.pharmacogenomic.indication)) {
      setErrorProduct(prevState => ({ ...prevState, pharmacogenomic: "Chỉ dẫn không được chứa ký tự đặc biệt!", }));
      isValid = true;
    } else {
      setErrorProduct(prevState => ({ ...prevState, pharmacogenomic: null }));
      isValid = false;
    }
    if (product?.pharmacogenomic && product.pharmacogenomic.pharmacodynamic.trim() === '') {
      setErrorProduct(prevState => ({ ...prevState, pharmacogenomic: "Dược động học không được bỏ trống!", }));
      isValid = true;
    } else if (specialCharacters.test(product.pharmacogenomic.pharmacodynamic)) {
      setErrorProduct(prevState => ({ ...prevState, pharmacogenomic: "Dược động học không được chứa ký tự đặc biệt!", }));
      isValid = true;
    } else {
      setErrorProduct(prevState => ({ ...prevState, pharmacogenomic: null }));
      isValid = false;
    }
    if (product?.pharmacogenomic && product.pharmacogenomic.mechanismOfAction.trim() === '') {
      setErrorProduct(prevState => ({ ...prevState, pharmacogenomic: "Cơ chế hoạt động không được bỏ trống!", }));
      isValid = true;
    } else if (specialCharacters.test(product.pharmacogenomic.mechanismOfAction)) {
      setErrorProduct(prevState => ({ ...prevState, pharmacogenomic: "Cơ chế hoạt động không được chứa ký tự đặc biệt!", }));
      isValid = true;
    } else {
      setErrorProduct(prevState => ({ ...prevState, pharmacogenomic: null }));
      isValid = false;
    }
    if (product?.pharmacogenomic && product.pharmacogenomic.asorption.trim() === '') {
      setErrorProduct(prevState => ({ ...prevState, pharmacogenomic: "Sự hấp thụ không được bỏ trống!", }));
      isValid = true;
    } else if (specialCharacters.test(product.pharmacogenomic.asorption)) {
      setErrorProduct(prevState => ({ ...prevState, pharmacogenomic: "Sự hấp thụ không được chứa ký tự đặc biệt!", }));
      isValid = true;
    } else {
      setErrorProduct(prevState => ({ ...prevState, pharmacogenomic: null }));
      isValid = false;
    }
    if (product?.pharmacogenomic && product.pharmacogenomic.toxicity.trim() === '') {
      setErrorProduct(prevState => ({ ...prevState, pharmacogenomic: "Độc tính không được bỏ trống!", }));
      isValid = true;
    } else if (specialCharacters.test(product.pharmacogenomic.toxicity)) {
      setErrorProduct(prevState => ({ ...prevState, pharmacogenomic: "Độc tính không được chứa ký tự đặc biệt!", }));
      isValid = true;
    } else {
      setErrorProduct(prevState => ({ ...prevState, pharmacogenomic: null }));
      isValid = false;
    }
    if (product?.productAllergyDetail && product.productAllergyDetail.detail.trim() === '') {
      setErrorProduct(prevState => ({ ...prevState, productAllergyDetail: "Chi tiết không được bỏ trống!", }));
      isValid = true;
    } else if (specialCharacters.test(product.productAllergyDetail.detail)) {
      setErrorProduct(prevState => ({ ...prevState, productAllergyDetail: "Chi tiết không được chứa ký tự đặc biệt!", }));
      isValid = true;
    } else {
      setErrorProduct(prevState => ({ ...prevState, productAllergyDetail: null }));
      isValid = false;
    }
    if (product?.productAllergyDetail && product.productAllergyDetail.summary.trim() === '') {
      setErrorProduct(prevState => ({ ...prevState, productAllergyDetail: "Tóm tắt không được bỏ trống!", }));
      isValid = true;
    } else if (specialCharacters.test(product.productAllergyDetail.summary)) {
      setErrorProduct(prevState => ({ ...prevState, productAllergyDetail: "Tóm tắt không được chứa ký tự đặc biệt!", }));
      isValid = true;
    } else {
      setErrorProduct(prevState => ({ ...prevState, productAllergyDetail: null }));
      isValid = false;
    }
    if (product?.contraindication && product.contraindication.relationship.trim() === '') {
      setErrorProduct(prevState => ({ ...prevState, contraindication: "Mối quan hệ không được bỏ trống!", }));
      isValid = true;
    } else if (specialCharacters.test(product.contraindication.relationship)) {
      setErrorProduct(prevState => ({ ...prevState, contraindication: "Mối quan hệ không được chứa ký tự đặc biệt!", }));
      isValid = true;
    } else {
      setErrorProduct(prevState => ({ ...prevState, contraindication: null }));
      isValid = false;
    }
    if (product?.contraindication && product.contraindication.value.trim() === '') {
      setErrorProduct(prevState => ({ ...prevState, contraindication: "Giá trị không được bỏ trống!", }));
      isValid = true;
    } else if (specialCharacters.test(product.contraindication.value)) {
      setErrorProduct(prevState => ({ ...prevState, contraindication: "Giá trị không được chứa ký tự đặc biệt!", }));
      isValid = true;
    } else {
      setErrorProduct(prevState => ({ ...prevState, contraindication: null }));
      isValid = false;
    }
    return isValid
  }

  const getDataProduct = (e, index) => {
    const { name, value } = e.target;

    setProduct((prevProduct) => {
      let updatedDrugIngredients = [...prevProduct.drugIngredients];
      let updatedAuthorities = [...prevProduct.authorities];

      updatedDrugIngredients = updatedDrugIngredients.map((ingredient) => {
        console.log("Ingredient.drugId:", ingredient.drugId);
        console.log("selectedDrug:", selectedDrug);
        console.log("Comparing:", ingredient.drugId === selectedDrug);

        if (ingredient.drugId === selectedDrug) {
          console.log("Matching drugId found");
          return {
            ...ingredient,
            strength: name === "strength" ? value : ingredient.strength,
            strengthNumber: name === "strengthNumber" ? value : ingredient.strengthNumber,
            strengthUnit: name === "strengthUnit" ? value : ingredient.strengthUnit,
            clinicallyRelevant: name === "clinicallyRelevant" ? value : ingredient.clinicallyRelevant,
          };
        }
        return ingredient;
      });
      updatedAuthorities = updatedAuthorities.map((authority, i) => {
        if (authority.countryId === selectedCountry) {
          return {
            ...authority,
            certificateName: name === "certificateName" ? value : authority.certificateName
          };
        }
        return authority;
      });
      // console.log("Name:", name);
      // console.log("Value:", value);
      // console.log("Selected Drug:", selectedDrug);
      // console.log("Selected Country:", selectedCountry);
      console.log("selectedDrug:", selectedDrug);
      console.log("name:", name);
      console.log("value:", value);
      console.log("updatedDrugIngredients:", updatedDrugIngredients);

      return {
        ...prevProduct,
        labeller: name === "labeller" ? value : prevProduct.labeller,
        name: name === "name" ? value : prevProduct.name,
        prescriptionName: name === "prescriptionName" ? value : prevProduct.prescriptionName,
        drugIngredients: updatedDrugIngredients,
        categoryId: selectedCategory,
        manufactor: {
          ...prevProduct.manufactor,
          name: name === "manufactorName" ? value : prevProduct.manufactor.name,
          company: name === "company" ? value : prevProduct.manufactor.company,
          score: name === "score" ? value : prevProduct.manufactor.score,
          source: name === "source" ? value : prevProduct.manufactor.source,
          countryId: selectedCountryNSX,
        },
        authorities: updatedAuthorities,
        pharmacogenomic: {
          ...prevProduct.pharmacogenomic,
          indication: name === "indication" ? value : prevProduct.pharmacogenomic.indication,
          pharmacodynamic: name === "pharmacodynamic" ? value : prevProduct.pharmacogenomic.pharmacodynamic,
          mechanismOfAction: name === "mechanismOfAction" ? value : prevProduct.pharmacogenomic.mechanismOfAction,
          absorption: name === "absorption" ? value : prevProduct.pharmacogenomic.absorption,
          toxicity: name === "toxicity" ? value : prevProduct.pharmacogenomic.toxicity,
        },
        productAllergyDetail: {
          ...prevProduct.productAllergyDetail,
          detail: name === "detail" ? value : prevProduct.productAllergyDetail.detail,
          summary: name === "summary" ? value : prevProduct.productAllergyDetail.summary,
        },
        contraindication: {
          ...prevProduct.contraindication,
          relationship: name === "relationship" ? value : prevProduct.contraindication.relationship,
          value: name === "value" ? value : prevProduct.contraindication.value,
        },
      };
    });
  };


  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      if (!handleValidation(product)) {
        await dispatch(createProducts(product))
        console.log(product)
        Swal.fire({
          title: 'Success!',
          text: 'Tạo mới thuốc thành công!',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        }).then(() => {
          Navigate('/');
        });
      } else {
        throw new Error('Thêm mới thất bại')
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: `Thêm mới thất bại: ${error.message || 'Unknown error'}`,
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      });
    }
  }

  function handleClick() {
    Swal.fire({
      title: "Thông tin của bạn sẽ không được lưu?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
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
        Navigate(`/`);
      }
    });
  }
  const handleSave = (index) => {
    setShowModals((prevShowModals) => {
      const newShowModals = [...prevShowModals];
      newShowModals[index] = false;
      return newShowModals;
    });
  };

  console.log(product)

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

                <div className='flex ml-8'>
                  <div class="mb-5 ">
                    <label class="block mb-2 text-sm font-medium text-gray-900 ">Tên nhà sản xuất</label>
                    <input type="text" name='manufactorName' onChange={getDataProduct} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />
                    {/* {errorProduct.manufactor.manufactorName && (<span className='text-red-500'>{errorProduct.manufactor.manufactorName}</span>)} */}
                  </div>
                  <div class="mb-5 ml-20">
                    <label class="block mb-2 text-sm font-medium text-gray-900 ">Công ty</label>
                    <input type="text" name='company' onChange={getDataProduct} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />
                    {/* {errorProduct.manufactor.company && (<span className='text-red-500'>{errorProduct.manufactor.company}</span>)} */}
                  </div>
                </div>
                <div className='flex ml-8'>
                  <div class="mb-5">
                    <label class="block mb-2 text-sm font-medium text-gray-900 ">Điểm</label>
                    <input type="text" name='score' onChange={getDataProduct} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />
                    {/* {errorProduct.manufactor.score && (<span className='text-red-500'>{errorProduct.manufactor.score}</span>)} */}
                  </div>
                  <div class="mb-5 ml-20">
                    <label class="block mb-2 text-sm font-medium text-gray-900 ">Nguồn</label>
                    <input type="text" name='source' onChange={getDataProduct} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />
                    {/* {errorProduct.manufactor.source && (<span className='text-red-500'>{errorProduct.manufactor.source}</span>)} */}
                  </div>
                </div>

                <label class="block mb-2 text-md font-extrabold text-gray-900 mt-5 ">Chính phủ:</label>
                <div class="mb-5 flex ml-8">
                  <div class="mb-5">
                    <label class="block mb-2 text-sm font-medium text-gray-900 ">Tên chứng chỉ</label>
                    <input type="text" name='certificateName' onChange={getDataProduct} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />
                    {/* {errorProduct.authorities.certificateName && (<span className='text-red-500'>{errorProduct.authorities.certificateName}</span>)} */}
                  </div>
                  <div className='mb-5 ml-20'>
                    <div className="relative mt-2 mr-24">
                      <select
                        value={selectedCountry}
                        onChange={(e) => setSelectedCountry(e.target.value)} className="appearance-none relative w-full cursor-pointer rounded-md bg-white py-2 pl-3 pr-10 text-left text-gray-900 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label">
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
                </div>

                <label class="flex items-center mb-2 text-md font-extrabold text-gray-900">
                  Sản phẩm dị ứng:
                </label>
                <div class="mb-5 ml-8 mr-16">
                  <label class="block mb-2 text-sm font-medium text-gray-900 ">Chi tiết</label>
                  <textarea type="text" name='detail' onChange={getDataProduct} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full " />
                  {/* {errorProduct.productAllergyDetail.detail && (<span className='text-red-500'>{errorProduct.productAllergyDetail.detail}</span>)} */}
                </div>
                <div class="mb-5 ml-8 mr-16">
                  <label class="block mb-2 text-sm font-medium text-gray-900 ">Tóm tắt</label>
                  <textarea type="text" name='summary' onChange={getDataProduct} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full " />
                  {/* {errorProduct.productAllergyDetail.summary && (<span className='text-red-500'>{errorProduct.productAllergyDetail.summary}</span>)} */}
                </div>
              </div>

              <div class="sm:flex-1 px-2">
                <div className='flex justify-between'>
                  <div class="mb-5">
                    <label class="block mb-2 text-sm font-medium text-gray-900 ">Tên sản phẩm</label>
                    <input type="text" name='name' onChange={getDataProduct} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />
                    {/* {errorProduct.name && (<span className='text-red-500'>{errorProduct.name}</span>)} */}
                  </div>
                  <div class="mb-5">
                    <label class="block mb-2 text-sm font-medium text-gray-900 ">Người dán nhãn</label>
                    <input type="text" name='labeller' onChange={getDataProduct} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />
                    {/* {errorProduct.labeller && (<span className='text-red-500'>{errorProduct.labeller}</span>)} */}
                  </div>
                </div>
                <div class="mb-5">
                  <label class="block mb-2 text-sm font-medium text-gray-900 ">Tên đơn thuốc</label>
                  <input type="text" name='prescriptionName' onChange={getDataProduct} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />
                  {/* {errorProduct.prescriptionName && (<span className='text-red-500'>{errorProduct.prescriptionName}</span>)} */}
                </div>
                <label class="flex items-center mb-2 text-md font-extrabold text-gray-900">
                  Thành phần thuốc: <PlusCircle class="ml-2" size={20} onClick={() => handleAdd()}></PlusCircle>
                </label>

                {showToggle.map((data, i) => {
                  return (
                    <>
                      <div className='border border-solid border-gray-200 p-2 rounded-md mb-2'>
                        <div className='mb-1 flex'>
                          <div className="relative mt-2">
                            <select
                              value={selectedDrug}
                              onChange={(e) => setSelectedDrug(e.target.value)} className="appearance-none relative w-full cursor-pointer rounded-md bg-white py-2 pl-3 pr-10 text-left text-gray-900 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label">
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

                          <div className="relative mt-2 ml-14">
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

                          <div className='ml-32 mt-3' onClick={() => handleToggleClick(i)}>
                            <ArrowDownCircle size={25}></ArrowDownCircle>
                          </div>
                          <div className='ml-5 mt-3' onClick={() => handleDelete(i)}>
                            <Trash3Fill size={25} color="red"></Trash3Fill>
                          </div>
                        </div>
                      </div>
                      {showModals[i] && (
                        <div className='border border-solid border-gray-200 p-2 rounded-md mb-5'>
                          <div className='flex  ml-4'>
                            <div class="mb-5">
                              <label class="block mb-2 text-sm font-medium text-gray-900 ">Độ mạnh</label>
                              <input type="text" name='strength' onChange={getDataProduct} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />
                              {/* {errorProduct.drugIngredients.strength && (<span className='text-red-500'>{errorProduct.drugIngredients.strength}</span>)} */}
                            </div>
                            <div class="mb-5 ml-20">
                              <label class="block mb-2 text-sm font-medium text-gray-900 ">Số độ mạnh</label>
                              <input type="text" name='strengthNumber' onChange={getDataProduct} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 " />
                              {/* {errorProduct.drugIngredients.strengthNumber && (<span className='text-red-500'>{errorProduct.drugIngredients.strengthNumber}</span>)} */}
                            </div>
                          </div>
                          <div className='flex  ml-4'>
                            <div class="mb-5">
                              <label class="block mb-2 text-sm font-medium text-gray-900 ">Độ mạnh đơn vị</label>
                              <input type="text" name='strengthUnit' onChange={getDataProduct} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />
                              {/* {errorProduct.drugIngredients.strengthUnit && (<span className='text-red-500'>{errorProduct.drugIngredients.strengthUnit}</span>)} */}
                            </div>
                            <div class="mb-5 ml-20">
                              <label class="block mb-2 text-sm font-medium text-gray-900 ">Lâm sàng</label>
                              <input type="text" name='clinicallyRelevant' onChange={getDataProduct} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />
                              {/* {errorProduct.drugIngredients.clinicallyRelevant && (<span className='text-red-500'>{errorProduct.drugIngredients.clinicallyRelevant}</span>)} */}
                            </div>
                          </div>
                          <div className='text-right mr-28'>
                            <button onClick={() => handleSave(i)} className='text-white mb-3 hover:scale-110 transition-transform duration-300 bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2 text-center ml-auto'>
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
                <div className='ml-8'>
                  <div class="mb-5">
                    <label class="block mb-2 text-sm font-medium text-gray-900 ">Chỉ dẫn</label>
                    <textarea type="text" name='indication' onChange={getDataProduct} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full " />
                    {/* {errorProduct.pharmacogenomic.indication && (<span className='text-red-500'>{errorProduct.pharmacogenomic.indication}</span>)} */}
                  </div>
                  <div class="mb-5">
                    <label class="block mb-2 text-sm font-medium text-gray-900 ">Dược động học</label>
                    <textarea type="text" name='pharmacodynamic' onChange={getDataProduct} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full " />
                    {/* {errorProduct.pharmacogenomic.pharmacodynamic && (<span className='text-red-500'>{errorProduct.pharmacogenomic.pharmacodynamic}</span>)} */}
                  </div>
                  <div class="mb-5">
                    <label class="block mb-2 text-sm font-medium text-gray-900 ">Cơ chế hoạt động</label>
                    <textarea type="text" name='mechanismOfAction' onChange={getDataProduct} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full " />
                    {/* {errorProduct.pharmacogenomic.mechanismOfAction && (<span className='text-red-500'>{errorProduct.pharmacogenomic.mechanismOfAction}</span>)} */}
                  </div>
                  <div class="mb-5">
                    <label class="block mb-2 text-sm font-medium text-gray-900 ">Sự thấp thụ</label>
                    <textarea type="text" name='asorption' onChange={getDataProduct} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full " />
                    {/* {errorProduct.pharmacogenomic.asorption && (<span className='text-red-500'>{errorProduct.pharmacogenomic.asorption}</span>)} */}
                  </div>
                  <div class="mb-5">
                    <label class="block mb-2 text-sm font-medium text-gray-900 ">Độc tính</label>
                    <textarea type="text" name='toxicity' onChange={getDataProduct} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full " />
                    {/* {errorProduct.pharmacogenomic.toxicity && (<span className='text-red-500'>{errorProduct.pharmacogenomic.toxicity}</span>)} */}
                  </div>
                </div>

                <label class="flex items-center mb-2 text-md font-extrabold text-gray-900">
                  Chống chỉ định:
                </label>
                <div class="mb-5 ml-8">
                  <label class="block mb-2 text-sm font-medium text-gray-900 ">Mối quan hệ</label>
                  <textarea type="text" name='relationship' onChange={getDataProduct} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full " />
                  {/* {errorProduct.contraindication.relationship && (<span className='text-red-500'>{errorProduct.contraindication.relationship}</span>)} */}
                </div>
                <div class="mb-5 ml-8">
                  <label class="block mb-2 text-sm font-medium text-gray-900 ">Giá trị</label>
                  <textarea type="text" name='value' onChange={getDataProduct} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full " />
                  {/* {errorProduct.contraindication.value && (<span className='text-red-500'>{errorProduct.contraindication.value}</span>)} */}
                </div>

                <div class="flex justify-center gap-14 row mt-10 mb-5">
                  <div class="w-1/2 ml-20">
                    <Link to={'/'}
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
                    <button type='button' onClick={handleCreateProduct} className='w-40 rounded-full text-white mb-8 hover:scale-110 transition-transform duration-300 bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold text-sm px-5 py-2.5 text-center ml-auto'>
                      Tạo mới
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

export default CreateProduct