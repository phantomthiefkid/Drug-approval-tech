import React, { useState, useEffect } from 'react';
import { Form, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PlusCircle, XCircle, ArrowUp, ArrowDown } from 'react-bootstrap-icons'
import { getDetailStepTwo } from '../../../redux/profileProduct/profileProductSlice';
import { getEmailAdmin, sendMailAdmin } from '../../../redux/apiEmail/apiAdminSlice';
import { getEmailFromToken } from '../../../redux/auth/loginSlice';
import { fetchDrugs } from '../../../redux/drugManagement/drugSlice'
import { fetchCategories, fetchCountries } from '../../../redux/approvalProduct/productSlice'
import { uploadFile } from '../../../redux/uploadFile/uploadFile';
import { updateProfileProductStepTwo } from '../../../redux/profileProduct/profileProductSlice';
const dataSend = {
  email: '',
  content: '',
  tesText: 'https://drug-approval-tech.vercel.app/'
}
const UpdateStepTwo = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const emailAdmin = useSelector((state) => state.getAdmin.data)
  const [selectedEmail, setSelectedEmail] = useState('')
  const emailSecrectary = getEmailFromToken();
  const detailProfile = useSelector((state) => state.profileProduct.stepTwo);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState([]);
  const [expandedProducts, setExpandedProducts] = useState({});
  const categoriesAPI = useSelector((state) => state.productData.categories)
  const countriesAPI = useSelector((state) => state.productData.countries)
  const drugsAPI = useSelector((drug) => drug.drugData.data.content)
  useEffect(() => {
    if (id) {
      dispatch(getDetailStepTwo({ id }));
    }
  }, [id, dispatch]);
  useEffect(() => {
    if (detailProfile && detailProfile.profileDetailList) {
      setFormData(detailProfile.profileDetailList);
    }
  }, [detailProfile]);
  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(fetchCountries())
    dispatch(fetchDrugs({}))
    dispatch(getEmailAdmin({}))
  }, [dispatch])


  const toggleProductExpansion = (index) => {
    setExpandedProducts({
      ...expandedProducts,
      [index]: !expandedProducts[index]
    });
  };
  const handleEmailChange = (event) => {
    console.log("Check mail: ", event.target.value)
    setSelectedEmail(event.target.value);
};
  const handleImageChange = async (event, productIndex) => {
    if (!event || !event.target || !event.target.files || event.target.files.length === 0) {
      console.error('No file selected.');
      return;
    }

    const file = event.target.files[0];
    const image = new FormData();
    image.append('file', file);

    try {
      const response = await dispatch(uploadFile(image));
      const url = response.payload;

      // Update the imageURL property in the formData array
      setFormData(prev => {
        const updatedData = [...prev];
        updatedData[productIndex] = {
          ...updatedData[productIndex],
          product: {
            ...updatedData[productIndex].product,
            imageURL: url // Update the imageURL property
          }
        };
        return updatedData;
      });
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };



  const handleOnChangeIngredient = (indexProduct, indexIngredient, field, value) => {
    const updateProducts = [...formData];

    // Check if the field starts with 'drugIngredients'
    if (field.startsWith('drugIngredients')) {
      const drugName = field.split('.')[1];

      // Copy the product object to update
      const updatedProduct = { ...updateProducts[indexProduct] };

      // Copy the drugIngredients array to update
      const updatedDrugIngredients = [...updatedProduct.product.drugIngredients];

      // Parse drugId to integer if it's the drugId field
      const parsedValue = drugName === 'drugId' ? parseInt(value, 10) : value;

      // Update the specific ingredient
      updatedDrugIngredients[indexIngredient] = {
        ...updatedDrugIngredients[indexIngredient],
        [drugName]: parsedValue // Update the specified field with the new value
      };

      // Update the product object with the modified drugIngredients array
      updatedProduct.product = {
        ...updatedProduct.product,
        drugIngredients: updatedDrugIngredients
      };

      // Update the formData array with the modified product object
      updateProducts[indexProduct] = updatedProduct;
    }

    // Perform further operations as needed

    // Return the updated formData array or perform further operations
    setFormData(updateProducts);
  };

  const handleOnChangeAuthorities = (indexProduct, indexAutho, field, value) => {
    const updateProducts = [...formData];

    // Check if the field starts with 'drugIngredients'
    if (field.startsWith('authorities')) {
      const authName = field.split('.')[1];

      // Copy the product object to update
      const updatedProduct = { ...updateProducts[indexProduct] };

      // Copy the drugIngredients array to update
      const updatedAuthorities = [...updatedProduct.product.authorities];

      // Parse drugId to integer if it's the drugId field
      const parsedValue = authName === 'countryId' ? parseInt(value, 10) : value;

      // Update the specific ingredient
      updatedAuthorities[indexAutho] = {
        ...updatedAuthorities[indexAutho],
        [authName]: parsedValue // Update the specified field with the new value
      };

      // Update the product object with the modified drugIngredients array
      updatedProduct.product = {
        ...updatedProduct.product,
        authorities: updatedAuthorities
      };

      // Update the formData array with the modified product object
      updateProducts[indexProduct] = updatedProduct;
    }

    // Perform further operations as needed

    // Return the updated formData array or perform further operations
    setFormData(updateProducts);
  };

  const handleOnChange = (index, field, value) => {
    const updateProduct = [...formData];
    if (field.startsWith('manufactor')) {
      const manufactorName = field.split('.')[1];
      updateProduct[index] = {
        ...updateProduct[index],  // Sao chép lại đối tượng sản phẩm
        product: {
          ...updateProduct[index].product,  // Sao chép lại đối tượng product
          manufactor: {
            ...updateProduct[index].product.manufactor,  // Sao chép lại đối tượng manufactor
            [manufactorName]: value
          }
        }
      };
    }
    if (field.startsWith('pharmacogenomic')) {
      const pharmacogenomicName = field.split('.')[1];
      updateProduct[index] = {
        ...updateProduct[index],  // Sao chép lại đối tượng sản phẩm
        product: {
          ...updateProduct[index].product,  // Sao chép lại đối tượng product
          pharmacogenomic: {
            ...updateProduct[index].product.pharmacogenomic,  // Sao chép lại đối tượng manufactor
            [pharmacogenomicName]: value
          }
        }
      };
    }
    if (field.startsWith('productAllergyDetail')) {
      const productAllergyDetailName = field.split('.')[1];
      updateProduct[index] = {
        ...updateProduct[index],  // Sao chép lại đối tượng sản phẩm
        product: {
          ...updateProduct[index].product,  // Sao chép lại đối tượng product
          productAllergyDetail: {
            ...updateProduct[index].product.productAllergyDetail,  // Sao chép lại đối tượng manufactor
            [productAllergyDetailName]: value
          }
        }
      };
    }

    if (field.startsWith('productAllergyDetail')) {
      const productAllergyDetailName = field.split('.')[1];
      updateProduct[index] = {
        ...updateProduct[index],  // Sao chép lại đối tượng sản phẩm
        product: {
          ...updateProduct[index].product,  // Sao chép lại đối tượng product
          productAllergyDetail: {
            ...updateProduct[index].product.productAllergyDetail,  // Sao chép lại đối tượng manufactor
            [productAllergyDetailName]: value
          }
        }
      };
    }

    if (field.startsWith('contraindication')) {
      const contraindicationName = field.split('.')[1];
      updateProduct[index] = {
        ...updateProduct[index],  // Sao chép lại đối tượng sản phẩm
        product: {
          ...updateProduct[index].product,  // Sao chép lại đối tượng product
          contraindication: {
            ...updateProduct[index].product.contraindication,  // Sao chép lại đối tượng manufactor
            [contraindicationName]: value
          }
        }
      };
    }

    if (field.startsWith('name')) {
      updateProduct[index] = {
        ...updateProduct[index],
        product: {
          ...updateProduct[index].product,
          [field]: value
        }
      }
    }

    if (field.startsWith('labeller')) {
      updateProduct[index] = {
        ...updateProduct[index],
        product: {
          ...updateProduct[index].product,
          [field]: value
        }
      }
    }

    if (field.startsWith('route')) {
      updateProduct[index] = {
        ...updateProduct[index],
        product: {
          ...updateProduct[index].product,
          [field]: value
        }
      }
    }

    if (field.startsWith('categoryId')) {
      updateProduct[index] = {
        ...updateProduct[index],
        product: {
          ...updateProduct[index].product,
          [field]: parseInt(value)
        }
      }
    }

    if (field.startsWith('prescriptionName')) {
      updateProduct[index] = {
        ...updateProduct[index],
        product: {
          ...updateProduct[index].product,
          [field]: value
        }
      }
    }

    if (field === 'approvedByFDA') {
      updateProduct[index] = {
        ...updateProduct[index],
        product: {
          ...updateProduct[index].product,
          [field]: value 
        }
      };
    }

    if (field === 'approvedByANSM') {
      updateProduct[index] = {
        ...updateProduct[index],
        product: {
          ...updateProduct[index].product,
          [field]: value
        }
      };
    }

    setFormData(updateProduct);
  };

  const handleUpdateFinish = () => {
    const updatedProfileDetailList = [...formData];
    const updateDataSend = {
      ...dataSend,
      email: selectedEmail,
      content: `Secretary ${emailSecrectary} has successfully created the profile product. Please login to review`
    }
    const requestBody = {
      profileId: id, 
      profileDetailList: updatedProfileDetailList,
      status: "PENDING TO APPROVE" 
    };

    dispatch(updateProfileProductStepTwo(requestBody))
    console.log(updateDataSend)
    dispatch(sendMailAdmin(updateDataSend))
    toast.success('Tạo thành công!', { autoClose: 200 });
    console.log("Dữ liệu sẽ được gửi đi:", requestBody);
    setTimeout(() => {
      navigate('/profilelist');
    }, 500);
  };

  const handlSaveAsDraft = () => {
    const updatedProfileDetailList = [...formData];
    const requestBody = {
      profileId: id,
      profileDetailList: updatedProfileDetailList,
      status: "PENDING TO PROCEED"
    };
    dispatch(updateProfileProductStepTwo(requestBody))
    toast.success('Tạo thành công!', { autoClose: 200 });
    setTimeout(() => {
      navigate('/profilelist');
    }, 500);
  }

  return (
    <>
      <form class="max-w-sm mx-auto">
        <select onChange={handleEmailChange} class="bg-gray-50 mt-6 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option selected>Chọn người duyệt</option>
          {emailAdmin && emailAdmin.map((item, index) => (<option value={item.email}>{item.fullname}</option>))}
        </select>
      </form>

      <div className='w-5/6 mb-5 mt-2 mx-auto h-auto min-h-96 border border-gray-200 shadow-xl'>
        <ToastContainer></ToastContainer>
        <div className='p-5'>
          {formData && formData.map((item, index) => (

            <div key={index} className="mb-6 border border-gray-300 p-3">
              <button className='w-full' onClick={() => toggleProductExpansion(index)}>
                <div key={index} className={`bg-blue-600 mt-2 ${expandedProducts[index] ? "rounded-t-2xl" : "rounded-2xl"} overflow-hidden`}>
                  <button className='w-full flex justify-between items-center p-4 focus:outline-none text-white text-lg font-semibold'>
                    <h2>Thuốc {index + 1}</h2>
                    <div className='flex items-center'>
                      <span>{expandedProducts[index] ? 'Thu gọn' : 'Hiện'}</span>
                      {expandedProducts[index] ? (
                        <ArrowUp className='ml-2' size={20} />
                      ) : (
                        <ArrowDown className='ml-2' size={20} />
                      )}
                    </div>
                  </button>
                </div>

              </button>
              <div className={`${!expandedProducts[index] && 'hidden'}`}>
                <div className='grid grid-cols-12 gap-4 p-4'>
                  <div className='col-span-5 py-8'>
                    <input
                      type="file"
                      id={`fileUpload_${index}`} // Sử dụng id duy nhất cho mỗi input file
                      accept="image/*"
                      onChange={(event) => handleImageChange(event, index)}
                      className="hidden"
                    />
                    <label
                      htmlFor={`fileUpload_${index}`}
                      className="block w-full h-full cursor-pointer"
                    >
                      <img
                        className='w-5/6 cursor-pointer'
                        src={formData[index].product.imageURL ? formData[index].product.imageURL : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiaH4XnlaUWReFVAIftt0qvvd_Y_ieJWREjOCVsPUTxYW5-DI_8oGctr8rvffv4zdxSyE&usqp=CAU"}
                        alt="Preview"
                      />
                    </label>
                  </div>

                  <div className='col-span-7'>
                    <div className='flex gap-4'>
                      <div class="w-1/2">
                        <label for="base-input" class="block mb-2 text-sm  font-medium text-gray-900">Tên thuốc</label>
                        <input onChange={(e) => handleOnChange(index, "name", e.target.value)} value={item.product.name} name='name' type="text" class={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`} />
                        {/* { errorValidation[index] && errorValidation[index].name && (<span className='text-red-500'>{errorValidation[index].name}</span>)} */}
                      </div>
                      <div className='w-1/2'>
                        <label for="base-input" class="block mb-2 text-sm  font-medium text-gray-900">Loại thuốc</label>
                        <select name='categoryId' onChange={(e) => handleOnChange(index, 'categoryId', e.target.value)} className={`block w-full border  rounded-lg shadow-sm p-2 bg-gray-50`} required>
                          <option value=''>Chọn loại thuốc</option>
                          {categoriesAPI && categoriesAPI.map((cate) => (
                            <option value={cate.id} selected={item.product.categoryId === cate.id}>{cate.title}</option>
                          ))}

                        </select>

                      </div>
                    </div>
                    <div class="mb-2 w-full">
                      <label for="base-input" class="block mb-2 text-sm  font-medium text-gray-900">Nhãn</label>
                      <input name='labeller' onChange={(e) => handleOnChange(index, 'labeller', e.target.value)} value={item.product.labeller} type="text" class={`bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`} />

                    </div>
                    <div class="mb-2 w-full">
                      <label for="base-input" class="block mb-2 text-sm  font-medium text-gray-900">Đường dẫn</label>
                      <input name='route' onChange={(e) => handleOnChange(index, 'route', e.target.value)} value={item.product.route} type="text" class={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`} />
                    </div>
                    <div class="mb-2 w-full">
                      <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900">Tên đơn thuốc</label>
                      <input name='prescriptionName' onChange={(e) => handleOnChange(index, 'prescriptionName', e.target.value)} value={item.product.prescriptionName} type="text" class={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`} />
                    </div>
                  </div>
                </div>
                <div className='gap-4 p-4'>
                  {item.product.drugIngredients && item.product.drugIngredients.map((drug, indexInge) => (<div key={index} className="mb-6 border border-gray-300 p-5 w-full">
                    <div className='flex gap-6'>
                      <h3 className="text-sm mb-2 font-bold">Thành phần hoạt chất {indexInge + 1}</h3>
                      <div className="relative px-6" id="customSelect">

                        <form class="max-w-sm mx-auto">
                          <label for="drugId" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hoạt chất: </label>
                          <select onChange={(e) => handleOnChangeIngredient(index, indexInge, 'drugIngredients.drugId', e.target.value)} class="block w-full mt-1 border border-gray-300 rounded-md shadow-sm p-2.5 bg-gray-50 text-sm" required>
                            <option disabled selected>Chọn hoạt chất</option>
                            {drugsAPI && drugsAPI.map((drugItem) => (
                              <option key={drugItem.id} value={drugItem.id} selected={drugItem.id === drug.drugId}>{drugItem.name}</option>
                            ))}
                          </select>
                        </form>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Nồng độ</label>
                        <input onChange={(e) => handleOnChangeIngredient(index, indexInge, 'drugIngredients.strength', e.target.value)} name='strength' value={drug.strength} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Chỉ số nồng độ</label>
                        <input onChange={(e) => handleOnChangeIngredient(index, indexInge, 'drugIngredients.strengthNumber', e.target.value)} name='strengthNumber' value={drug.strengthNumber} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Đơn vị nồng độ</label>
                        <input onChange={(e) => handleOnChangeIngredient(index, indexInge, 'drugIngredients.strengthUnit', e.target.value)} name='strengthUnit' value={drug.strengthUnit} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                      </div>

                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900">Thông tin lâm sàng</label>
                      <textarea onChange={(e) => handleOnChangeIngredient(index, indexInge, 'drugIngredients.clinicallyRelevant', e.target.value)} name='clinicallyRelevant' value={drug.clinicallyRelevant} rows={3} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                    </div>

                    {/* <div className='flex justify-end'>

                      <button
                        type="button"
                        onClick={() => handleDeleteIngredient(index)}
                        className="mt-2 bg-red-500 text-white font-bold py-2 px-4 rounded-lg inline-flex items-center"
                      >
                        <XCircle className="mr-1" size={20} />
                        Xóa hoạt chất
                      </button>
                    </div> */}

                  </div>))

                  }
                  {/* <button type="button" className="bg-blue-500 mb-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg inline-flex items-center" onClick={handleAddNewIngredient}>
                    <PlusCircle className="mr-1" size={20} />
                    Thêm thành phần hoạt chất</button> */}
                </div>
                <div class="mb-5 border border-gray-300 p-5">
                  <h3 className='text-lg mb-2 w-full font-bold'>Nhà sản xuất</h3>
                  <div className="flex gap-4">
                    <div className='mb-3 w-2/5'>
                      <label class="block mb-2 text-sm font-medium text-gray-900">Tên nhà sản xuất</label>
                      <input name='manufactor.name' onChange={(e) => handleOnChange(index, "manufactor.name", e.target.value)} value={item.product.manufactor.name} type="text" class={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2`} />

                    </div>

                    <div class="mb-3 w-2/5">
                      <label class="block mb-2 text-sm font-medium text-gray-900">Quốc gia</label>
                      <select name='countryId' onChange={(e) => handleOnChange(index, "manufactor.countryId", e.target.value)} class={`block w-full mt-1 border rounded-md shadow-sm p-2.5 bg-gray-50 text-sm`} required>
                        <option value="">Chọn quốc gia</option>
                        {countriesAPI && countriesAPI.map((country) => (<option selected={country.id === item.product.manufactor.countryId} value={country.id}>{country.name}</option>))}
                      </select>

                    </div>
                    <div className='mb-3 w-1/5'>
                      <label class="block mb-2 text-sm font-medium text-gray-900">Điểm số</label>
                      <input name='manufactor.score' onChange={(e) => handleOnChange(index, "manufactor.score", e.target.value)} value={item.product.manufactor.score} type="text" class={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2`} />

                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className='mb-3 w-1/2'>
                      <label class="block mb-2 text-sm font-medium text-gray-900">Nguồn</label>
                      <input name='manufactor.source' onChange={(e) => handleOnChange(index, "manufactor.source", e.target.value)} value={item.product.manufactor.source} type="text" class={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2`} />

                    </div>
                    <div className='mb-3 w-1/2'>
                      <label class="block mb-2 text-sm font-medium text-gray-900">Công ty</label>
                      <input name='manufactor.company' onChange={(e) => handleOnChange(index, "manufactor.company", e.target.value)} value={item.product.manufactor.company} type="text" class={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2`} />

                    </div>
                  </div>

                </div>


                <div className='col-span-12 flex flex-wrap'>
                  <div className='w-full'> <h2 className="text-2xl w-full font-bold mb-4">Dược lý và di truyền</h2></div>
                  <div className='flex gap-4 w-full'>
                    <div className='w-1/3'>
                      <label className="block mb-2 text-sm font-medium text-gray-900">Độc tính</label>
                      <input name='toxicity' onChange={(e) => handleOnChange(index, "pharmacogenomic.toxicity", e.target.value)} value={item.product.pharmacogenomic.toxicity} type="text" className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`} />

                    </div>
                    <div className='w-1/3'>
                      <label className="block mb-2 text-sm font-medium text-gray-900">Hấp thụ</label>
                      <input name='asorption' onChange={(e) => handleOnChange(index, "pharmacogenomic.asorption", e.target.value)} value={item.product.pharmacogenomic.asorption} type="text" className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`} />

                    </div>
                    <div className='w-1/3'>
                      <label className="block mb-2 text-sm font-medium text-gray-900">Dược lực học</label>
                      <input name='pharmacodynamic' onChange={(e) => handleOnChange(index, "pharmacogenomic.pharmacodynamic", e.target.value)} value={item.product.pharmacogenomic.pharmacodynamic} type="text" className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`} />
                    </div>
                  </div>
                  <div className='flex w-full gap-4'>
                    <div className='w-1/2'>
                      <label className="block mb-2 text-sm font-medium text-gray-900">Cơ chế hoạt động</label>
                      <textarea rows={3} name='mechanismOfAction' onChange={(e) => handleOnChange(index, "pharmacogenomic.mechanismOfAction", e.target.value)} value={item.product.pharmacogenomic.mechanismOfAction} type="text" className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`} />
                    </div>
                    <div className='mb-3 w-1/2'>
                      <label className="block mb-2 text-sm font-medium text-gray-900">Triệu chứng</label>
                      <textarea rows={3} name='indication' onChange={(e) => handleOnChange(index, "pharmacogenomic.indication", e.target.value)} value={item.product.pharmacogenomic.indication} type="text" className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`} />

                    </div>
                  </div>
                </div>
                <div className='col-span-12'>
                  <div className='w-full'> <h2 className="text-2xl w-full font-bold mb-4">Dị ứng thuốc</h2></div>
                  <div className='flex gap-4'>
                    <div className='mb-3 w-1/2'>
                      <label className="block mb-2 text-sm font-medium text-gray-900">Chi tiết</label>
                      <textarea onChange={(e) => handleOnChange(index, 'productAllergyDetail.detail', e.target.value)} value={item.product.productAllergyDetail.detail} rows={2} name='productAllergyDetail.detail' type="text" className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`} />

                    </div>
                    <div className='mb-3 w-1/2'>
                      <label className="block mb-2 text-sm font-medium text-gray-900">Tóm tắt về dị ứng thuốc</label>
                      <textarea rows={2} onChange={(e) => handleOnChange(index, 'productAllergyDetail.summary', e.target.value)} value={item.product.productAllergyDetail.summary} name='productAllergyDetail.summary' type="text" className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`} />

                    </div>
                  </div>
                </div>
                <div className='col-span-12'>
                  <div className='w-full'> <h2 className="text-2xl w-full font-bold mb-4">Chống chỉ định</h2></div>
                  <div className='flex gap-4'>
                    <div className='mb-3 w-1/2'>
                      <label className="block mb-2 text-sm font-medium text-gray-900">Mối liên hệ</label>
                      <input name='contraindication.relationship' onChange={(e) => handleOnChange(index, 'contraindication.relationship', e.target.value)} value={item.product.contraindication.relationship} type="text" className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`} />

                    </div>
                    <div className='mb-3 w-1/2'>
                      <label className="block mb-2 text-sm font-medium text-gray-900">Giá trị</label>
                      <input name='contraindication.value' value={item.product.contraindication.value} onChange={(e) => handleOnChange(index, 'contraindication.value', e.target.value)} type="text" className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`} />

                    </div>
                  </div>
                </div>
                <div className='col-span-12'>
                  <h2 className="text-2xl w-full font-bold mb-4">Cơ quan có thẩm quyền</h2>
                  {item.product.authorities && item.product.authorities.map((authority, indexAut) => (
                    <div key={index} className="mb-4 flex border border-gray-300 p-5">
                      <div className="mb-2 w-1/2">

                        <label className="block mb-2 text-sm font-medium text-gray-900">Tên chứng nhận</label>
                        <input
                          required
                          type="text"
                          id={`certificateName${index}`}
                          name="certificateName"
                          value={authority.certificateName}
                          onChange={(e) => handleOnChangeAuthorities(index, indexAut, 'authorities.certificateName', e.target.value)}
                          className="md:w-2/3 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div className="mb-3 w-1/4">

                        <label class="block mb-2 text-sm font-medium text-gray-900">Quốc gia</label>
                        <select onChange={(e) => handleOnChangeAuthorities(index, indexAut, 'authorities.countryId', e.target.value)} class="block w-full mt-1 border border-gray-300 rounded-md shadow-sm p-2.5 bg-gray-50 text-sm" required>
                          <option value="">Chọn quốc gia</option>
                          {countriesAPI && countriesAPI.map((country) => (<option selected={country.id === authority.countryId} value={country.id}>{country.name}</option>))}
                        </select>
                      </div>
                      {/* 
                      <div className='w-1/4 mt-6'><button
                        type="button"
                        onClick={() => handleDeleteAuthority(index)}
                        className="mt-1 ml-8 bg-red-500 text-white font-bold py-2 px-4 rounded-lg inline-flex items-center"
                      >
                        <XCircle className="mr-1" size={20} />
                        Xóa
                      </button></div> */}

                    </div>
                  ))}
                  {/* <button
                    type="button"
                    onClick={handleAddAuthority}
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg inline-flex items-center"
                  >
                    <PlusCircle className="mr-1" size={20} />
                    Thêm cơ quan có thẩm quyền
                  </button> */}
                </div>
                <div className='col-span-12 flex p-2 mt-4'>
                  <div className='w-1/3'>
                    <h2 className="text-2xl w-full font-bold mb-4">Tổ chức quản lí dược</h2>
                  </div>
                  <div className="flex items-center mb-4 w-1/3">
                    <input
                      type="checkbox"
                      id="approvedByFDA"
                      onChange={(e) => handleOnChange(index, 'approvedByFDA', e.target.checked)}
                      checked={item.product.approvedByFDA} // Kiểm tra trạng thái approvedByFDA
                      className="form-checkbox h-5 w-5 text-blue-500"
                    />
                    <label htmlFor="approvedByFDA" className="ml-2 text-sm text-gray-700">Approved by FDA</label>
                  </div>

                  <div className="flex items-center mb-4 w-1/3">
                    <input
                      type="checkbox"
                      id="approvedByANSM"
                      onChange={(e) => handleOnChange(index, 'approvedByANSM', e.target.checked)}
                      checked={item.product.approvedByANSM} // Kiểm tra giá trị approvedByANSM bằng true
                      className="form-checkbox h-5 w-5 text-blue-500"
                    />
                    <label htmlFor="approvedByANSM" className="ml-2 text-sm text-gray-700">Approved by ANSM</label>
                  </div>
                </div>



              </div>
              {/* <div className='flex justify-end mt-2 space-x-4'>
                {expandedProducts[index] && (
                  <button onClick={() => toggleProductExpansion(index)} className='bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-3 rounded-lg inline-flex items-center'>
                    Đóng
                  </button>
                )}
                {expandedProducts[index] && (
                  <button type="button" className='bg-red-600 hover:bg-red-300 text-white font-bold py-2 px-3 rounded-lg inline-flex items-center'>
                    <XCircle className="mr-1" size={20} />
                    Xóa Thuốc
                  </button>
                )}
              </div> */}


            </div>)

          )}
          {/* <button type="button" className="bg-blue-500 mb-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg inline-flex items-center">
            <PlusCircle className='mr-1' size={20}></PlusCircle>
            Thêm
          </button> */}
        </div>
        <div className='flex justify-end mr-6 gap-4 mt-3 mb-3'>

          <button onClick={handlSaveAsDraft} className="px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Lưu nháp
          </button>


          <button onClick={handleUpdateFinish} className='px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50' >
            Tạo
          </button>


        </div>
      </div>
    </>
  )
}

export default UpdateStepTwo