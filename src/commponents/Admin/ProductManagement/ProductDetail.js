import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { PencilSquare } from 'react-bootstrap-icons'
import { fetchProductDetail } from '../../../redux/productManagement/ProductSlice';
const ProductDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem('token')
  const { id } = useParams();
  const productApi = useSelector((product) => product.product.detail)
  const [detailProduct, setDetailProduct] = useState({});
  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(fetchProductDetail({ id })).then(() => { console.log(productApi) });

  }, [dispatch, id]);


  useEffect(() => {
    if (!token) {
      navigate('/')
    }
  }, [token])

  return (
    <>
      <div className='container mx-auto mt-28 mb-20'>
        <h1 className='text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400  text-center mb-6'>Chi tiết về thuốc</h1>
        <hr className='border-gray-300'></hr>
        <div className='grid grid-cols-1 gap-2 md:grid-cols-2 mt-6 mx-auto'>
          <div className='w-full flex justify-center border-gray-200'>
            <img className='max-w-lg rounded-md border border-gray-300 shadow-lg hover:shadow-xl transition duration-300' src='https://i-cf65.ch-static.com/content/dam/cf-consumer-healthcare/panadol/en_pk/pakistan_product/panadol-regular/408x300-panadol-regular.png?auto=formathttps://vastovers.com/image/cache/catalog/Anagelsic%20/113-700x700.JPG' alt='Product Image' />
          </div>
          <div className='max-w-2xl'>
            <div className='flex justify-between'>
              {productApi && (
                <h2 className='text-3xl text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 font-bold mb-2'>{productApi.name}</h2>
              )}
              <div><Link to={`/updateproduct/${productApi.id}`}><button type="button" className="text-white flex bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm py-2.5 text-center ml-24 me-2 mt-8 p-4 gap-2"><PencilSquare size={20}></PencilSquare> Chỉnh sửa</button></Link></div>
            </div>
            <hr className='w-32 border-gray-400 mb-4 border-t-4'></hr>
            {productApi && productApi.route && (
              <p className='mb-4'><span className='font-semibold'>Đường dùng:</span> {productApi.route}</p>
            )}
            {productApi && productApi.prescriptionName && (
              <p className='mb-4'><span className='font-semibold'>Tên đăng ký:</span> {productApi.prescriptionName}</p>
            )}
            <div className=''>
              <p className='font-semibold mb-6'>Thành phần hoạt chất:</p>
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
                    {productApi && productApi.drugIngredients && productApi.drugIngredients.map((detail) =>
                    (<tr className='bg-gray-50 hover:bg-slate-100'>
                      <td className='px-6 py-4 whitespace-nowrap'>{detail.name}</td>
                      <td className='px-6 py-4 whitespace-nowrap'>{detail.strength}</td>
                      <td className='px-6 py-4 whitespace-nowrap'>{detail.strengthNumber}</td>
                      <td className='px-6 py-4 whitespace-nowrap'>{detail.strengthUnit}</td>
                      <td className='px-6 py-4 whitespace-nowrap'>{detail.clinicallyRelevant}</td>
                    </tr>))}

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {productApi && (<div className='grid grid-cols-1 w-5/6 gap-8 md:grid-cols-2 mt-6 mx-auto'>
          <div className='mt-6 ml-8 max-w-2xl'>
            <h2 className='text-xl font-semibold'>Phân loại</h2>
            <div className='flex gap-6 mb-2'>
              <p><span className='font-semibold'>Tiêu đề:</span> {productApi.category && productApi.category.title}</p>
              <p><span className='font-semibold'>Slug:</span> {productApi.category && productApi.category.slug}</p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-1 mb-2 border-2 p-3 shadow-lg'>
              <h2 className='text-xl font-semibold mb-2'>Nhà sản xuất</h2>
              {productApi.manufactor && (<div>
                <p className='mb-2'><span className='font-semibold'>Tên:</span> {productApi.manufactor.name}</p>
                <p className='mb-2'><span className='font-semibold'>Công ty:</span> {productApi.manufactor.company}</p>
                <p className='mb-2'><span className='font-semibold'>Điểm đánh giá:</span> {productApi.manufactor.score || 'null'}</p>
                <p className='mb-2'><span className='font-semibold'>Nguồn:</span> {productApi.manufactor.source}</p>
                <p className='mb-2'><span className='font-semibold'>Quốc gia:</span> {productApi.manufactor.countryName}</p></div>
              )}



            </div>
            <div className='mt-4'>
              <h2 className='font-semibold mb-2 text-xl'>Cơ quan chứng nhận:</h2>
              <div className='overflow-x-auto'>
                <table className='min-w-full divide-y divide-gray-200'>
                  <thead className='bg-gray-300'>
                    <tr>
                      <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Tên chứng nhận</th>
                      <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Quốc gia</th>
                    </tr>
                  </thead>
                  <tbody className='bg-white divide-y divide-gray-200'>
                    {productApi && productApi.authorities && productApi.authorities.map((authorities) =>
                    (<tr className='bg-gray-50 hover:bg-slate-100'>
                      <td className='px-6 py-4 whitespace-nowrap'>{authorities.certificateName}</td>
                      <td className='px-6 py-4 whitespace-nowrap'>{authorities.countryName}</td>
                    </tr>))}
                  </tbody>
                </table>
              </div>

            </div>
            <div className='mt-4'>
              <h2 className='font-semibold mb-2 text-xl'>Chống chỉ định:</h2>
              {productApi.contraindication && (
                <>
                  <p className='mb-4'><span className='font-semibold'>Mối quan hệ:</span> {productApi.contraindication.relationship}</p>
                  <p className='mb-4'><span className='font-semibold'>Giá trị:</span> {productApi.contraindication.value}</p>
                </>
              )}
            </div>
          </div>
          <div>
            <div className='mt-6 p-3 border-2 shadow-lg'>
              <h2 className='text-xl font-semibold mb-4'>Chi tiết về dị ứng thuốc</h2>
              {/* <ul>
                                <li className='mb-4'><b>Chi tiết:</b> {productApi.productAllergyDetail.detail}</li>
                                <li className='mb-4'><b>Tóm tắt: </b>{productApi.productAllergyDetail.summary}</li>
                            </ul> */}
              {productApi.productAllergyDetail && (<div>
                <ul>
                  <li className='mb-4'><b>Chi tiết:</b> {productApi.productAllergyDetail.detail}</li>
                  <li className='mb-4'><b>Tóm tắt: </b>{productApi.productAllergyDetail.summary}</li>
                </ul>
              </div>)}
            </div>
            <div className='mt-6 max-w-2xl'>
              <h2 className='text-xl font-semibold mb-2'>Dược di truyền:</h2>
              {productApi.pharmacogenomic && (
                <>
                  <p className='mb-4'><span className='font-semibold'>Chỉ định:</span> {productApi.pharmacogenomic.indication}</p>
                  <p className='mb-4'><span className='font-semibold'>Dược lý động học:</span> {productApi.pharmacogenomic.pharmacodynamic}</p>
                  <p className='mb-4'><span className='font-semibold'>Cơ chế hoạt động:</span> {productApi.pharmacogenomic.mechanismOfAction}</p>
                  <p className='mb-4'><span className='font-semibold'>Hấp thụ:</span> {productApi.pharmacogenomic.asorption}</p>
                  <p className='mb-4'><span className='font-semibold'>Độc tính:</span> {productApi.pharmacogenomic.toxicity}</p>
                </>
              )}
            </div>

          </div>
        </div>)}
      </div>
    </>
  );
}

export default ProductDetail;
