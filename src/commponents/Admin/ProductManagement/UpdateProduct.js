import React, { useEffect, useState } from 'react'
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Boxes, PlusCircle, XCircle } from 'react-bootstrap-icons'

import { fetchDrugs } from '../../../redux/drugManagement/drugSlice'
import { fetchCategories, fetchCountries, updateProducts } from '../../../redux/approvalProduct/productSlice';
import { fetchProductDetail, uploadFileProduct } from '../../../redux/productManagement/ProductSlice';

const UpdateProduct = () => {
  const countriesAPI = useSelector((state) => state.productData.countries);
  const categoriesAPI = useSelector((state) => state.productData.categories);
  const drugsAPI = useSelector((drug) => drug.drugData.data.content)
  const { id } = useParams();
  
  const productApi = useSelector((product) => product.product.detail)
  const responseId = useSelector((state) => state.productData.product.id)
  const [selectedFile, setSelectedFile] = useState(null);
  const [productUpdate, setProductUpdate] = useState({
    labeller: '',
    name: '',
    prescriptionName: '',
    route: '',
    drugIngredients: [],
    category: -1,
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
  })
  console.log("====> ", productApi)
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(fetchCountries())
    dispatch(fetchDrugs({}))
  }, [dispatch])


   useEffect(() => {
    if (responseId && selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      dispatch(uploadFileProduct({ file: formData, ApprovalProductID: responseId })).then(() => {
        console.log("Thanh cong!")
      });
    }
  }, [responseId, selectedFile]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file); // Set the selected file
  };


  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(fetchProductDetail({ id }));

  }, [dispatch, id]);

  useEffect(() => {
    if (productApi && productApi.authorities) {
      const updatedProduct = { ...productApi };
      updatedProduct.authorities = updatedProduct.authorities.map(authority => {
        const { countryName, ...rest } = authority;
        return rest;
      });
      if (updatedProduct.productAdministrationDTO) {
        updatedProduct.administrationId = updatedProduct.productAdministrationDTO.id;
        delete updatedProduct.productAdministrationDTO;
      }
      const categoryId = updatedProduct.category.id;
      const updatedProductWithCategoryId = { ...updatedProduct, categoryId };
      delete updatedProductWithCategoryId.category;

      setProductUpdate(updatedProductWithCategoryId);
    } else {
      setProductUpdate(productApi);
    }
  }, [productApi]);

  const [drugIngredients, setDrugIngredients] = useState([
    { drugId: 0, strength: '', strengthNumber: '', strengthUnit: '', clinicallyRelevant: '' }
  ]);

  const handleAddIngredient = () => {
    setDrugIngredients([...drugIngredients, { drugId: 0, strength: '', strengthNumber: '', strengthUnit: '', clinicallyRelevant: '' }]);
  };

  useEffect(() => {
    setDrugIngredients(productUpdate.drugIngredients || []);
  }, [productUpdate]);

  const handleChangeIngredient = (index, event) => {
    const { name, value } = event.target;

    setDrugIngredients((prevIngredients) => {
      const updatedIngredients = [...prevIngredients];
      const updatedIngredient = { ...updatedIngredients[index], [name]: value };

      if (event.target.tagName === 'SELECT') {
        updatedIngredient.drugId = parseInt(value);
      }
      updatedIngredients[index] = updatedIngredient;
      const updatedProduct = { ...productUpdate, drugIngredients: updatedIngredients };
      setProductUpdate(updatedProduct);
      return updatedIngredients;
    });
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

  useEffect(() => {
    setAuthorities(productUpdate.authorities || []);
  }, [productUpdate])
  const handleAddAuthority = () => {
    setAuthorities([...authorities, { certificateName: '', countryId: 0 }]);
  };

  const handleChangeAuthority = (index, event) => {
    const { name, value } = event.target;

    setAuthorities((prevAuthorities) => {
      const updatedAuthorities = [...prevAuthorities];
      const updatedAuthority = { ...updatedAuthorities[index], [name]: value };

      if (event.target.tagName === 'SELECT') {
        updatedAuthority.countryId = parseInt(value);
      }
      updatedAuthorities[index] = updatedAuthority;
      const updatedProduct = { ...productUpdate, authorities: updatedAuthorities };
      setProductUpdate(updatedProduct);
      return updatedAuthorities;
    });
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
        setProductUpdate({
          ...productUpdate,
          manufactor: {
            ...productUpdate.manufactor,
            countryId: value === '' ? '' : parseInt(value), // Check if value is empty before parsing
          },
        });
      } else {
        // Update other fields within pharmacogenomic
        setProductUpdate({
          ...productUpdate,
          pharmacogenomic: {
            ...productUpdate.pharmacogenomic,
            [name]: value,
          },
        });
      }
    } else if (name.startsWith('manufactor')) {
      // Update other fields within manufactor
      const manufactorName = name.split('.')[1];
      setProductUpdate({
        ...productUpdate,
        manufactor: {
          ...productUpdate.manufactor,
          [manufactorName]: value,
        },
      });
    } else if (name === 'categoryId') {
      // Update categoryId
      setProductUpdate({
        ...productUpdate,
        [name]: parseInt(value),
      });
    } else if (name.startsWith('contraindication')) {
      // Update other fields within contraindication
      const fieldName = name.split('.')[1];
      setProductUpdate({
        ...productUpdate,
        contraindication: {
          ...productUpdate.contraindication,
          [fieldName]: value,
        },
      });
    } else if (name.startsWith('productAllergyDetail')) {
      // Update other fields within productAllergyDetail
      const fieldName = name.split('.')[1];
      setProductUpdate({
        ...productUpdate,
        productAllergyDetail: {
          ...productUpdate.productAllergyDetail,
          [fieldName]: value,
        },
      });
    } else {
      // Update other fields
      setProductUpdate({ ...productUpdate, [name]: value });
    }
  };

  function handleClick() {
    Swal.fire({
      title: "Thông tin của bạn sẽ không được lưu?",
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

  const handleSubmit = () => {

    console.log("Update: ", updateProducts)
    dispatch(updateProducts(productUpdate))
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "Chỉnh sửa thông tin thuốc thành công",
          icon: "success",
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            Navigate(`/productdetail/${id}`);
            window.scrollTo(0, 0);
          }
        });
      })
      .catch((error) => {
        if (error.response && error.response.status === 409) {
          Swal.fire({
            title: "Conflict!",
            text: "There is a conflict. Please choose different values.",
            icon: "error",
            confirmButtonColor: '#d33',
            confirmButtonText: 'OK',
          });
        } else {
          console.error("Error during update:", error);
        }
      });
  }

  console.log('updateproduct', productUpdate)

  return (
    <>
      <div className='mt-36 mb-16'>
        <div>
          <div className='w-5/6 mx-auto shadow-sm shadow-gray-400'>
            <div className='bg-blue-600 mt-2 h-12'><h2 className='text-center pt-2 font-bold text-white text-xl'>Chỉnh sửa thông tin thuốc</h2></div>
            <form className='py-10 w-5/6 mx-auto grid grid-cols-12 gap-8'>
              <div className='col-span-5 py-8'>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="large_size">Upload image</label>
                {productUpdate.image && (
                  <img className='border-2 rounded-xl mt-4' src={productUpdate.image || URL.createObjectURL(selectedFile) || "https://www.universityofcalifornia.edu/sites/default/files/styles/article_default_banner/public/generic-drugs-istock.jpg?h=91106740&itok=N62lK3sY"} alt='drug' />
                )}
                <input onChange={handleFileChange} className="block w-full text-lg text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none mt-10" id="large_size" type="file"></input>
              </div>
              <div className='col-span-7'>
                <div className='w-full'>
                  <div className='flex gap-4'>
                    <div class="mb-3 w-full">
                      <label for="base-input" class="block mb-2 text-sm  font-medium text-gray-900">Tên thuốc</label>
                      <input onChange={handleOnChange} name='name' type="text" value={productUpdate.name} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />

                    </div>
                    <div class="mb-3 w-full">
                      <label for="base-input" class="block mb-2 text-sm  font-medium text-gray-900">Nhãn</label>
                      <input onChange={handleOnChange} name='labeller' type="text" value={productUpdate.labeller} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />

                    </div>
                  </div>
                  <div className='flex gap-4'>
                    <div class="mb-3 w-2/3">
                      <label for="base-input" class="block mb-2 text-sm  font-medium text-gray-900">Đường dẫn</label>
                      <input onChange={handleOnChange} name='route' type="text" value={productUpdate.route} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />

                    </div>
                    <div className='mb-3 w-1/3'>
                      <label for="base-input" class="block mb-2 text-sm  font-medium text-gray-900">Loại thuốc</label>
                      <select name='category' value={(productUpdate && productUpdate.category) || ''} onChange={handleOnChange} className='block w-full mt-1 border border-gray-300 rounded-lg shadow-sm p-2.5 bg-gray-50'>
                        {/* <option value=''>{productUpdate && productUpdate.category ? productUpdate.category.title : 'Select a category'}</option> */}
                        {categoriesAPI && categoriesAPI.map((cate) => (<option value={cate.id}>{cate.title}</option>))}
                      </select>
                    </div>
                  </div>

                  <div class="mb-3 w-full">
                    <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900">Tên đơn thuốc</label>
                    <input onChange={handleOnChange} name='prescriptionName' type="text" value={productUpdate.prescriptionName} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />

                  </div>
                  <div class="mb-5 border border-gray-300 p-5">
                    <h3 className='text-lg mb-2 w-full font-bold'>Nhà sản xuất</h3>
                    <div className="flex gap-4">
                      <div className='mb-3 w-2/3'>
                        <label class="block mb-2 text-sm font-medium text-gray-900">Tên nhà sản xuất</label>
                        <input onChange={handleOnChange} name='manufactor.name' value={productUpdate.manufactor.name} type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />
                      </div>

                      <div class="mb-3 w-1/3">
                        <label class="block mb-2 text-sm font-medium text-gray-900">Quốc gia</label>
                        <select onChange={handleOnChange} value={productUpdate && productUpdate.countryId} name='countryId' class="block w-full mt-1 border border-gray-300 rounded-md shadow-sm p-2.5 bg-gray-50 text-sm">
                          {/* <option value="">Chọn quốc gia</option> */}
                          {countriesAPI && countriesAPI.map((country) => (<option value={country.id}>{country.name}</option>))}
                        </select>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className='mb-3 w-2/3'>
                        <label class="block mb-2 text-sm font-medium text-gray-900">Nguồn</label>
                        <input onChange={handleOnChange} name='manufactor.source' value={productUpdate.manufactor.source} type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />
                      </div>
                      <div className='mb-3 w-1/3'>
                        <label class="block mb-2 text-sm font-medium text-gray-900">Điểm số</label>
                        <input onChange={handleOnChange} name='manufactor.score' value={productUpdate.manufactor.score} type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />
                      </div>
                    </div>
                    <div className=''>
                      <label class="block mb-2 text-sm font-medium text-gray-900">Công ty</label>
                      <input onChange={handleOnChange} name='manufactor.company' value={productUpdate.manufactor.company} type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" />
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
                          <select value={ingredient?.drugId || ''} onChange={(event) => handleChangeIngredient(index, event)} class="block w-full mt-1 border border-gray-300 rounded-md shadow-sm p-2.5 bg-gray-50 text-sm">
                            {drugsAPI && drugsAPI.map((drug) => (<option value={drug.id}>{drug.name}</option>))}
                          </select>
                        </form>

                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Nồng độ</label>
                        <input name='strength' value={drugIngredients[index].strength} onChange={(event) => handleChangeIngredient(index, event)} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Chỉ số nồng độ</label>
                        <input name='strengthNumber' value={drugIngredients[index].strengthNumber} onChange={(event) => handleChangeIngredient(index, event)} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Đơn vị nồng độ</label>
                        <input name='strengthUnit' value={drugIngredients[index].strengthUnit} onChange={(event) => handleChangeIngredient(index, event)} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                      </div>

                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900">Thông tin lâm sàng</label>
                      <textarea name='clinicallyRelevant' value={drugIngredients[index].clinicallyRelevant} onChange={(event) => handleChangeIngredient(index, event)} rows={3} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
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
                <button type="button" className="bg-blue-500 mb-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg inline-flex items-center" onClick={handleAddIngredient}>
                  <PlusCircle className="mr-1" size={20} />
                  Thêm thành phần hoạt chất</button>
                <hr></hr>
              </div>

              <div className='col-span-12 flex flex-wrap'>
                <div className='w-full'> <h2 className="text-2xl w-full font-bold mb-4">Dược lý và di truyền</h2></div>
                <div className='mb-3 w-full'>
                  <label className="block mb-2 text-sm font-medium text-gray-900">Triệu chứng</label>
                  <textarea onChange={handleOnChange} rows={3} name='indication' value={productUpdate.pharmacogenomic.indication} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                </div>
                <div className='mb-3 w-full'>
                  <label className="block mb-2 text-sm font-medium text-gray-900">Dược lực học</label>
                  <input onChange={handleOnChange} name='pharmacodynamic' type="text" value={productUpdate.pharmacogenomic.pharmacodynamic} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                </div>
                <div className='mb-3 w-full'>
                  <label className="block mb-2 text-sm font-medium text-gray-900">Cơ chế hoạt động</label>
                  <textarea onChange={handleOnChange} rows={2} name='mechanismOfAction' value={productUpdate.pharmacogenomic.mechanismOfAction} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                </div>
                <div className='w-full flex gap-4'>
                  <div className='mb-3 w-1/2'>
                    <label className="block mb-2 text-sm font-medium text-gray-900">Hấp thụ</label>
                    <input onChange={handleOnChange} rows={2} name='asorption' type="text" value={productUpdate.pharmacogenomic.asorption} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                  </div>
                  <div className='mb-3 w-1/2'>
                    <label className="block mb-2 text-sm font-medium text-gray-900">Độc tính</label>
                    <input onChange={handleOnChange} rows={2} name='toxicity' type="text" value={productUpdate.pharmacogenomic.toxicity} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                  </div>
                </div>
              </div>
              <div className='col-span-12'>
                <div className='w-full'> <h2 className="text-2xl w-full font-bold mb-4">Dị ứng thuốc</h2></div>
                <div className='flex gap-4'>
                  <div className='mb-3 w-1/2'>
                    <label className="block mb-2 text-sm font-medium text-gray-900">Chi tiết</label>
                    <textarea onChange={handleOnChange} rows={2} name='productAllergyDetail.detail' value={productUpdate.productAllergyDetail.detail} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                  </div>
                  <div className='mb-3 w-1/2'>
                    <label className="block mb-2 text-sm font-medium text-gray-900">Tóm tắt về dị ứng thuốc</label>
                    <textarea onChange={handleOnChange} rows={2} name='productAllergyDetail.summary' value={productUpdate.productAllergyDetail.summary} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                  </div>
                </div>
              </div>
              <div className='col-span-12'>
                <div className='w-full'> <h2 className="text-2xl w-full font-bold mb-4">Chống chỉ định</h2></div>
                <div className='flex gap-4'>
                  <div className='mb-3 w-1/2'>
                    <label className="block mb-2 text-sm font-medium text-gray-900">Mối liên hệ</label>
                    <input onChange={handleOnChange} name='contraindication.relationship' value={productUpdate.contraindication.relationship} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                  </div>
                  <div className='mb-3 w-1/2'>
                    <label className="block mb-2 text-sm font-medium text-gray-900">Giá trị</label>
                    <input onChange={handleOnChange} name='contraindication.value' type="text" value={productUpdate.contraindication.value} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
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
                        value={authorities[index].certificateName}
                        onChange={(event) => handleChangeAuthority(index, event)}
                        className="md:w-2/3 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="mb-3 w-1/4">

                      <label class="block mb-2 text-sm font-medium text-gray-900">Quốc gia</label>
                      <select value={authorities[index].countryId} onChange={(event) => handleChangeAuthority(index, event)} class="block w-full mt-1 border border-gray-300 rounded-md shadow-sm p-2.5 bg-gray-50 text-sm">
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
            <div className='flex justify-center gap-14 row mt-3 mb-3'>
              <Link to={'/productlist'}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick();
                }}>
                <button className="w-48 rounded-full text-red-600 mb-8 hover:scale-110 transition-transform duration-300 bg-white focus:ring-4 focus:outline-none focus:ring-blue-300 border border-gray-500 text-sm font-bold px-5 py-2.5 focus:z-10">
                  Trở về
                </button>
              </Link>
              <Link to=''>
                <button type='submit' onClick={handleSubmit} className='w-48 text-white mb-8 hover:scale-110 transition-transform duration-300 bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-full text-sm px-5 py-2.5 text-center ml-auto' >
                  Lưu
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateProduct