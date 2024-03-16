import React, { useState, useEffect } from 'react'
import { PlusCircle, XCircle, ArrowUp, ArrowDown } from 'react-bootstrap-icons'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchCategories, fetchCountries } from '../../../redux/approvalProduct/productSlice'
import { fetchDrugs } from '../../../redux/drugManagement/drugSlice'
import { createProfileProductStepTwo } from '../../../redux/profileProduct/profileProductSlice'
const product_initial = {
    labeller: '',
    name: '',
    route: '',
    prescriptionName: '',
    drugIngredients: [],
    categoryId: 0,
    manufactor: {
        name: '',
        company: '',
        score: '',
        source: '',
        countryId: 0
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

const product_initial_err = {
    labeller: '',
    name: '',
    route: '',
    prescriptionName: '',
    drugIngredients: [],
    categoryId: 1,
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
    const [errorValidation, setErrorValidation] = useState([])
    const [stepTwo, setStepTwo] = useState(initial_data)
    const [drugIngredients, setDrugIngredients] = useState([drugIngredient_initial])
    const [authorities, setAuthorities] = useState([authorrities_initial])
    const [expandedProducts, setExpandedProducts] = useState({});
    const categoriesAPI = useSelector((state) => state.productData.categories)
    const countriesAPI = useSelector((state) => state.productData.countries)
    const drugsAPI = useSelector((drug) => drug.drugData.data)
    const dispatch = useDispatch();
    const navigate = useNavigate()
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

    const handleSaveAsDraftStepTwo = () => {
        const dataUpdate = { ...stepTwo }
        dataUpdate.productList = [...products]
        dataUpdate.profileId = productTitle

        console.log("Hello: ", dataUpdate)
        const response = dispatch(createProfileProductStepTwo(dataUpdate))

        if (response) {

            toast.success('Lưu thành công!', { autoClose: 200 });
            setTimeout(() => {
                navigate('/profilelist'); // Chuyển hướng sang '/profilelist'
            }, 1000);
            console.log("Lưu nháp thành công!!!")
        } else {
            console.log('Dữ liệu không tồn tại')
        }

    }
    const handleSavePendingToApproveStepTwo = () => {
        const dataUpdate = { ...stepTwo }
        dataUpdate.productList = [...products]
        dataUpdate.profileId = productTitle
        dataUpdate.status = 'PENDING TO APPROVE'
        if (validateData(dataUpdate)) {
            const response = dispatch(createProfileProductStepTwo(dataUpdate));
            toast.success('Lưu thành công!', { autoClose: 200 })
            if (response) {
                toast.success('Lưu thành công!', { autoClose: 200 });
                setTimeout(() => {
                    navigate('/profilelist'); // Chuyển hướng sang '/profilelist'
                }, 1000);
            } else {
                console.log('Dữ liệu không tồn tại')
            }



        } else {
            toast.error('Vui lòng điền đủ các trường!!!', { autoClose: 1500 })
        }
        console.log(validateData(dataUpdate))

    }
    const validateData = (dataUpdate) => {
        const errors = JSON.parse(JSON.stringify(dataUpdate.productList));// Mảng lưu trữ thông tin lỗi
        let isValid = true;
        console.log("Before: ", dataUpdate)
        if (dataUpdate.productList.length === 0) {
            isValid = false;
            return isValid;
        }

        dataUpdate.productList.forEach((product, index) => {
            // Kiểm tra trường labeller
            if (!product.labeller.trim()) {
                errors[index].labeller = 'Tên nhãn hiệu không được bỏ trống!!!';
                isValid = false;
            } else if (/[!@#$%^&*(),.?":{}|<>]/.test(product.labeller)) {
                errors[index].labeller = 'Tên nhãn hiệu không được có ký tự đặc biệt!!!';
                isValid = false;

            } else {
                errors[index].labeller = '';
            }

            // Kiểm tra trường route
            if (!product.route.trim()) {
                errors[index].route = 'Đường dẫn không được bỏ trống!!!';
                isValid = false;
            } else if (/[!@#$%^&*(),.?":{}|<>]/.test(product.route)) {
                errors[index].route = 'Đường dẫn không được có ký tự đặc biệt!!!';
                isValid = false;
            } else {
                errors[index].route = '';

            }

            // Kiểm tra trường prescriptionName
            if (!product.prescriptionName.trim()) {
                errors[index].prescriptionName = 'Tên đơn thuốc không được bỏ trống!!!';
                isValid = false;
            } else if (/[!@#$%^&*(),.?":{}|<>]/.test(product.prescriptionName)) {
                errors[index].prescriptionName = 'Tên đơn thuốc không được có ký tự đặc biệt!!!';
                isValid = false;

            } else {
                errors[index].prescriptionName = ''; // Gán giá trị rỗng khi không có ký tự đặc biệt

            }

            if (!product.name.trim()) {
                errors[index].name = 'Tên đơn thuốc không được bỏ trống!!!';
                isValid = false;
            } else if (/[!@#$%^&*(),.?":{}|<>]/.test(product.name)) {
                errors[index].name = 'Tên đơn thuốc không được có ký tự đặc biệt!!!';
                isValid = false;

            } else {
                errors[index].name = ''; // Gán giá trị rỗng khi không có ký tự đặc biệt

            }

            if (product.categoryId === 0) {
                isValid = false
            }

            if (!product.manufactor.name.trim()) {
                errors[index].manufactor.name = 'Tên nhà sản xuất không được bỏ trống!!!';
                isValid = false;
            } else if (/[!@#$%^&*(),.?":{}|<>]/.test(product.manufactor.name)) {
                errors[index].manufactor.name = 'Tên nhà sản xuất không được có ký tự đặc biệt!!!';
                isValid = false;
            } else {
                errors[index].manufactor.name = ''; // Gán giá trị rỗng khi không có lỗi
                ; // Đánh dấu là hợp lệ
            }

            if (!product.manufactor.company.trim()) {
                errors[index].manufactor.company = 'Tên công ty không được bỏ trống!!!';
                isValid = false;
            } else if (/[!@#$%^&*(),.?":{}|<>]/.test(product.manufactor.company)) {
                errors[index].manufactor.company = 'Tên công ty không được có ký tự đặc biệt!!!';
                isValid = false;
            } else {
                errors[index].manufactor.company = ''; // Gán giá trị rỗng khi không có lỗi
                ; // Đánh dấu là hợp lệ
            }

            if (!product.manufactor.score.trim()) {
                errors[index].manufactor.score = 'Điểm số không được bỏ trống!!!';
                isValid = false;
            } else if (/[!@#$%^&*(),.?":{}|<>]/.test(product.manufactor.score)) {
                errors[index].manufactor.score = 'Điểm số không được có ký tự đặc biệt!!!';
                isValid = false;
            } else {
                errors[index].manufactor.score = ''; // Gán giá trị rỗng khi không có lỗi
                ; // Đánh dấu là hợp lệ
            }

            if (!product.manufactor.source.trim()) {
                errors[index].manufactor.source = 'Nguồn không được bỏ trống!!!';
                isValid = false;
            } else if (/[!@#$%^&*(),.?":{}|<>]/.test(product.manufactor.source)) {
                errors[index].manufactor.source = 'Nguồn không được có ký tự đặc biệt!!!';
                isValid = false;
            } else {
                errors[index].manufactor.source = ''; // Gán giá trị rỗng khi không có lỗi
                ; // Đánh dấu là hợp lệ
            }

            if (product.manufactor.countryId === 0) {
                isValid = false
            } else if (product.manufactor.countryId > 0) {

            }

            if (!product.contraindication.relationship.trim()) {
                errors[index].contraindication.relationship = 'Mối liên hệ không được bỏ trống!!!';
                isValid = false;
            } else if (/[!@#$%^&*(),.?":{}|<>]/.test(product.contraindication.relationship)) {
                errors[index].contraindication.relationship = 'Mối liên hệ không được có ký tự đặc biệt!!!';
                isValid = false;
            } else {
                errors[index].contraindication.relationship = ''; // Gán giá trị rỗng khi không có lỗi
                ; // Đánh dấu là hợp lệ
            }

            if (!product.contraindication.value.trim()) {
                errors[index].contraindication.value = 'Giá không được bỏ trống!!!';
                isValid = false;
            } else if (/[!@#$%^&*(),.?":{}|<>]/.test(product.contraindication.value)) {
                errors[index].contraindication.value = 'Giá trị không được có ký tự đặc biệt!!!';
                isValid = false;
            } else {
                errors[index].contraindication.value = ''; // Gán giá trị rỗng khi không có lỗi
                ; // Đánh dấu là hợp lệ
            }

            if (!product.productAllergyDetail.detail.trim()) {
                errors[index].productAllergyDetail.detail = 'Chi tiết không được bỏ trống!!!';
                isValid = false;
            } else if (/[!@#$%^&*(),.?":{}|<>]/.test(product.productAllergyDetail.detail)) {
                errors[index].productAllergyDetail.detail = 'Chi tiết không được có ký tự đặc biệt!!!';
                isValid = false;
            } else {
                errors[index].productAllergyDetail.detail = ''; // Gán giá trị rỗng khi không có lỗi
                ; // Đánh dấu là hợp lệ
            }

            if (!product.productAllergyDetail.summary.trim()) {
                errors[index].productAllergyDetail.summary = 'Mối liên hệ không được bỏ trống!!!';
                isValid = false;
            } else if (/[!@#$%^&*(),.?":{}|<>]/.test(product.productAllergyDetail.summary)) {
                errors[index].productAllergyDetail.summary = 'Mối liên hệ không được có ký tự đặc biệt!!!';
                isValid = false;
            } else {
                errors[index].productAllergyDetail.summary = ''; // Gán giá trị rỗng khi không có lỗi
                ; // Đánh dấu là hợp lệ
            }

            // Kiểm tra trường absorption
            if (!product.pharmacogenomic.asorption || !product.pharmacogenomic.asorption.trim()) {
                errors[index].pharmacogenomic.asorption = 'Thông tin về asorption không được bỏ trống!!!';
                isValid = false;
            } else if (/[!@#$%^&*(),.?":{}|<>]/.test(product.pharmacogenomic.asorption)) {
                errors[index].pharmacogenomic.asorption = 'Thông tin về asorption không được có ký tự đặc biệt!!!';
                isValid = false;
            } else {
                errors[index].pharmacogenomic.asorption = ''; // Gán giá trị rỗng khi không có lỗi
                ; // Đánh dấu là hợp lệ
            }

            // Kiểm tra trường indication
            if (!product.pharmacogenomic.indication || !product.pharmacogenomic.indication.trim()) {
                errors[index].pharmacogenomic.indication = 'Thông tin về indication không được bỏ trống!!!';
                isValid = false;
            } else if (/[!@#$%^&*(),.?":{}|<>]/.test(product.pharmacogenomic.indication)) {
                errors[index].pharmacogenomic.indication = 'Thông tin về indication không được có ký tự đặc biệt!!!';
                isValid = false;
            } else {
                errors[index].pharmacogenomic.indication = ''; // Gán giá trị rỗng khi không có lỗi
                ; // Đánh dấu là hợp lệ
            }

            // Kiểm tra trường mechanismOfAction
            if (!product.pharmacogenomic.mechanismOfAction || !product.pharmacogenomic.mechanismOfAction.trim()) {
                errors[index].pharmacogenomic.mechanismOfAction = 'Thông tin về mechanismOfAction không được bỏ trống!!!';
                isValid = false;
            } else if (/[!@#$%^&*(),.?":{}|<>]/.test(product.pharmacogenomic.mechanismOfAction)) {
                errors[index].pharmacogenomic.mechanismOfAction = 'Thông tin về mechanismOfAction không được có ký tự đặc biệt!!!';
                isValid = false;
            } else {
                errors[index].pharmacogenomic.mechanismOfAction = ''; // Gán giá trị rỗng khi không có lỗi
                ; // Đánh dấu là hợp lệ
            }

            // Kiểm tra trường pharmacodynamic
            if (!product.pharmacogenomic.pharmacodynamic || !product.pharmacogenomic.pharmacodynamic.trim()) {
                errors[index].pharmacogenomic.pharmacodynamic = 'Thông tin về pharmacodynamic không được bỏ trống!!!';
                isValid = false;
            } else if (/[!@#$%^&*(),.?":{}|<>]/.test(product.pharmacogenomic.pharmacodynamic)) {
                errors[index].pharmacogenomic.pharmacodynamic = 'Thông tin về pharmacodynamic không được có ký tự đặc biệt!!!';
                isValid = false;
            } else {
                errors[index].pharmacogenomic.pharmacodynamic = ''; // Gán giá trị rỗng khi không có lỗi
                ; // Đánh dấu là hợp lệ
            }

            // Kiểm tra trường toxicity
            if (!product.pharmacogenomic.toxicity || !product.pharmacogenomic.toxicity.trim()) {
                errors[index].pharmacogenomic.toxicity = 'Thông tin về toxicity không được bỏ trống!!!';
                isValid = false;
            } else if (/[!@#$%^&*(),.?":{}|<>]/.test(product.pharmacogenomic.toxicity)) {
                errors[index].pharmacogenomic.toxicity = 'Thông tin về toxicity không được có ký tự đặc biệt!!!';
                isValid = false;
            } else {
                errors[index].pharmacogenomic.toxicity = ''; // Gán giá trị rỗng khi không có lỗi
                ; // Đánh dấu là hợp lệ
            }

            if (product.indexIngredient?.length === 0) {
                isValid = false
                toast.error('Thông tin về hoạt chất không được trống!!!', { autoClose: 1000 })
            }


        });
        if (!isValid) {
            setErrorValidation([...errors])
        }

        console.log("Check: ", errors);
        return isValid;
    };



    return (
        <div className='w-5/6 mb-5 mt-2 mx-auto h-auto min-h-96 border border-gray-200 shadow-xl'>
            <ToastContainer></ToastContainer>
            <div className='p-5'>

                {products.map((item, index) => (

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
                                    <img className='w-5/6' src='https://vinmec-prod.s3.amazonaws.com/images/20220324_013008_431435_decolgen-nd.max-1800x1800.jpg' />

                                </div>
                                <div className='col-span-7'>
                                    <div className='flex gap-4'>
                                        <div class="w-1/2">
                                            <label for="base-input" class="block mb-2 text-sm  font-medium text-gray-900">Tên thuốc</label>
                                            <input name='name' onChange={(e) => handleProductChange(index, 'name', e.target.value)} type="text" class={`bg-gray-50 border ${errorValidation[index]?.name ? "border-red-400" : 'border-gray-200'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`} />
                                            {/* { errorValidation[index] && errorValidation[index].name && (<span className='text-red-500'>{errorValidation[index].name}</span>)} */}
                                        </div>
                                        <div className='w-1/2'>
                                            <label for="base-input" class="block mb-2 text-sm  font-medium text-gray-900">Loại thuốc</label>
                                            <select name='categoryId' onChange={(e) => handleProductChange(index, 'categoryId', e.target.value)} className={`block w-full border ${errorValidation[index]?.categoryId === 0 ? "border-red-400" : "border-gray-300"} rounded-lg shadow-sm p-2 bg-gray-50`} required>
                                                <option value=''>Chọn loại thuốc</option>
                                                {categoriesAPI && categoriesAPI.map((cate) => (<option value={cate.id}>{cate.title}</option>))}
                                            </select>

                                        </div>
                                    </div>
                                    <div class="mb-2 w-full">
                                        <label for="base-input" class="block mb-2 text-sm  font-medium text-gray-900">Nhãn</label>
                                        <input name='labeller' onChange={(e) => handleProductChange(index, 'labeller', e.target.value)} type="text" class={`bg-gray-50 border ${errorValidation[index]?.labeller ? "border-red-400" : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`} />

                                    </div>
                                    <div class="mb-2 w-full">
                                        <label for="base-input" class="block mb-2 text-sm  font-medium text-gray-900">Đường dẫn</label>
                                        <input name='route' onChange={(e) => handleProductChange(index, 'route', e.target.value)} type="text" class={`bg-gray-50 border  ${errorValidation[index]?.route ? "border-red-400" : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`} />
                                    </div>
                                    <div class="mb-2 w-full">
                                        <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900">Tên đơn thuốc</label>
                                        <input name='prescriptionName' onChange={(e) => handleProductChange(index, 'prescriptionName', e.target.value)} type="text" class={`bg-gray-50 border  ${errorValidation[index]?.prescriptionName ? "border-red-400" : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`} />
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
                                        <input name='manufactor.name' onChange={(e) => handleProductChange(index, 'manufactor.name', e.target.value)} type="text" class={`bg-gray-50 border  ${errorValidation[index]?.manufactor.name ? "border-red-400" : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2`} />

                                    </div>

                                    <div class="mb-3 w-2/5">
                                        <label class="block mb-2 text-sm font-medium text-gray-900">Quốc gia</label>
                                        <select onChange={(e) => handleProductChange(index, 'manufactor.countryId', e.target.value)} name='countryId' class={`block w-full mt-1 border ${errorValidation[index]?.manufactor.countryId === 0 ? "border-red-400" : "border-gray-300"} rounded-md shadow-sm p-2.5 bg-gray-50 text-sm`} required>
                                            <option value="">Chọn quốc gia</option>
                                            {countriesAPI && countriesAPI.map((country) => (<option value={country.id}>{country.name}</option>))}
                                        </select>

                                    </div>
                                    <div className='mb-3 w-1/5'>
                                        <label class="block mb-2 text-sm font-medium text-gray-900">Điểm số</label>
                                        <input name='manufactor.score' onChange={(e) => handleProductChange(index, 'manufactor.score', e.target.value)} type="text" class={`bg-gray-50 border  ${errorValidation[index]?.manufactor.score ? "border-red-400" : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2`} />

                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className='mb-3 w-1/2'>
                                        <label class="block mb-2 text-sm font-medium text-gray-900">Nguồn</label>
                                        <input name='manufactor.source' onChange={(e) => handleProductChange(index, 'manufactor.source', e.target.value)} type="text" class={`bg-gray-50 border  ${errorValidation[index]?.manufactor.source ? "border-red-400" : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2`} />

                                    </div>
                                    <div className='mb-3 w-1/2'>
                                        <label class="block mb-2 text-sm font-medium text-gray-900">Công ty</label>
                                        <input name='manufactor.company' onChange={(e) => handleProductChange(index, 'manufactor.company', e.target.value)} type="text" class={`bg-gray-50 border  ${errorValidation[index]?.manufactor.company ? "border-red-400" : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2`} />

                                    </div>
                                </div>

                            </div>


                            <div className='col-span-12 flex flex-wrap'>
                                <div className='w-full'> <h2 className="text-2xl w-full font-bold mb-4">Dược lý và di truyền</h2></div>
                                <div className='flex gap-4 w-full'>
                                    <div className='w-1/3'>
                                        <label className="block mb-2 text-sm font-medium text-gray-900">Độc tính</label>
                                        <input name='toxicity' onChange={(e) => handleProductChange(index, 'pharmacogenomic.toxicity', e.target.value)} type="text" className={`bg-gray-50 border ${errorValidation[index]?.pharmacogenomic?.toxicity ? "border-red-500" : "border-gray-300"} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`} />

                                    </div>
                                    <div className='w-1/3'>
                                        <label className="block mb-2 text-sm font-medium text-gray-900">Hấp thụ</label>
                                        <input name='asorption' onChange={(e) => handleProductChange(index, 'pharmacogenomic.asorption', e.target.value)} type="text" className={`bg-gray-50 border ${errorValidation[index]?.pharmacogenomic?.asorption ? "border-red-500" : "border-gray-300"} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`} />

                                    </div>
                                    <div className='w-1/3'>
                                        <label className="block mb-2 text-sm font-medium text-gray-900">Dược lực học</label>
                                        <input name='pharmacodynamic' onChange={(e) => handleProductChange(index, 'pharmacogenomic.pharmacodynamic', e.target.value)} type="text" className={`bg-gray-50 border ${errorValidation[index]?.pharmacogenomic?.pharmacodynamic ? "border-red-500" : "border-gray-300"} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`} />
                                    </div>
                                </div>
                                <div className='flex w-full gap-4'>
                                    <div className='w-1/2'>
                                        <label className="block mb-2 text-sm font-medium text-gray-900">Cơ chế hoạt động</label>
                                        <textarea rows={3} name='mechanismOfAction' onChange={(e) => handleProductChange(index, 'pharmacogenomic.mechanismOfAction', e.target.value)} type="text" className={`bg-gray-50 border ${errorValidation[index]?.pharmacogenomic?.mechanismOfAction ? "border-red-500" : "border-gray-300"} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`} />
                                    </div>
                                    <div className='mb-3 w-1/2'>
                                        <label className="block mb-2 text-sm font-medium text-gray-900">Triệu chứng</label>
                                        <textarea rows={3} name='indication' onChange={(e) => handleProductChange(index, 'pharmacogenomic.indication', e.target.value)} type="text" className={`bg-gray-50 border ${errorValidation[index]?.pharmacogenomic?.indication ? "border-red-500" : "border-gray-300"} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`} />

                                    </div>
                                </div>
                            </div>
                            <div className='col-span-12'>
                                <div className='w-full'> <h2 className="text-2xl w-full font-bold mb-4">Dị ứng thuốc</h2></div>
                                <div className='flex gap-4'>
                                    <div className='mb-3 w-1/2'>
                                        <label className="block mb-2 text-sm font-medium text-gray-900">Chi tiết</label>
                                        <textarea rows={2} name='productAllergyDetail.detail' onChange={(e) => handleProductChange(index, 'productAllergyDetail.detail', e.target.value)} type="text" className={`bg-gray-50 border ${errorValidation[index]?.productAllergyDetail?.detail ? 'border-red-500' : "border-gray-300"} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`} />

                                    </div>
                                    <div className='mb-3 w-1/2'>
                                        <label className="block mb-2 text-sm font-medium text-gray-900">Tóm tắt về dị ứng thuốc</label>
                                        <textarea rows={2} name='productAllergyDetail.summary' onChange={(e) => handleProductChange(index, 'productAllergyDetail.summary', e.target.value)} type="text" className={`bg-gray-50 border  ${errorValidation[index]?.productAllergyDetail?.summary ? 'border-red-500' : "border-gray-300"}  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`} />

                                    </div>
                                </div>
                            </div>
                            <div className='col-span-12'>
                                <div className='w-full'> <h2 className="text-2xl w-full font-bold mb-4">Chống chỉ định</h2></div>
                                <div className='flex gap-4'>
                                    <div className='mb-3 w-1/2'>
                                        <label className="block mb-2 text-sm font-medium text-gray-900">Mối liên hệ</label>
                                        <input name='contraindication.relationship' onChange={(e) => handleProductChange(index, 'contraindication.relationship', e.target.value)} type="text" className={`bg-gray-50 border ${errorValidation[index]?.contraindication?.relationship ? 'border-red-500' : "border-gray-300"} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`} />

                                    </div>
                                    <div className='mb-3 w-1/2'>
                                        <label className="block mb-2 text-sm font-medium text-gray-900">Giá trị</label>
                                        <input name='contraindication.value' onChange={(e) => handleProductChange(index, 'contraindication.value', e.target.value)} type="text" className={`bg-gray-50 border ${errorValidation[index]?.contraindication?.value ? 'border-red-500' : "border-gray-300"} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`} />

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
                        <div className='flex justify-end mt-2 space-x-4'>
                            {expandedProducts[index] && (
                                <button onClick={() => toggleProductExpansion(index)} className='bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-3 rounded-lg inline-flex items-center'>
                                    Đóng
                                </button>
                            )}
                            {expandedProducts[index] && (
                                <button type="button" onClick={() => handleDeleteProduct(index)} className='bg-red-600 hover:bg-red-300 text-white font-bold py-2 px-3 rounded-lg inline-flex items-center'>
                                    <XCircle className="mr-1" size={20} />
                                    Xóa Thuốc
                                </button>
                            )}
                        </div>


                    </div>)

                )}
                <button type="button" className="bg-blue-500 mb-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg inline-flex items-center" onClick={handleAddNewProduct}>
                    <PlusCircle className='mr-1' size={20}></PlusCircle>
                    Thêm
                </button>
            </div>
            <div className='flex justify-end mr-6 gap-4 mt-3 mb-3'>

                <button onClick={handleSaveAsDraftStepTwo} className="px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    Lưu nháp
                </button>


                <button onClick={handleSavePendingToApproveStepTwo} className='px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50' >
                    Tạo
                </button>


            </div>
        </div>
    )
}

export default StepTwo