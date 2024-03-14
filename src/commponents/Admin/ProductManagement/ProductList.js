import React, { useState, useEffect } from 'react'
import { Filter, PlusCircle } from 'react-bootstrap-icons'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { fetchProducts } from '../../../redux/productManagement/ProductSlice';
import '../../../css/ProductManagement/Product.css'
const ProductList = () => {
    const { id } = useParams();
    const [isOpenFilter, setIsOpenFilter] = useState(false);
    const dispatch = useDispatch();
    const totalPagesAPI = useSelector((page) => page.product.totalPages)
    const [sortField, setSortField] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const [productListApi, setProductListApi] = useState([]);
    const productList = useSelector((product) => product.product.data)
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState('');
    const [flag, setFlag] = useState(false)
    const navigate = useNavigate();

    const toggleFilter = () => {
        setIsOpenFilter(!isOpenFilter)
    }

    useEffect(() => {
        if (Array.isArray(productListApi)) {
            setProductListApi([...productList]);
        }
    }, [productList]);

    useEffect(() => {
        dispatch(fetchProducts({ pageSize: 8, sortOrder: 'asc', pageNo: currentPage, search: search, flag, id })).then(() => {
            setTotalPages(totalPagesAPI);
        });
    }, [dispatch, currentPage, totalPagesAPI, search]);
    const handleSortFieldChange = (e) => setSortField(e.target.value);
    const handleSortOrderChange = (e) => setSortOrder(e.target.value);
    const fetchNewProducts = () => {
        dispatch(fetchProducts({ sortField: sortField, sortOrder: sortOrder, pageSize: 8, pageNo: 0, id }))
    }

    const handleOnClickFilter = () => {
        setFlag(!flag)
        fetchNewProducts();
        setIsOpenFilter(false);
        setCurrentPage(0)
    }

    const handleIncreasePage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const handleDecreasePage = () => {
        if (currentPage > 0) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value)
        setCurrentPage(0)
    }

    return (
        <>
            <div className='mt-20'>
                <div className='py-8 flex px-48'>
                    <h1 className=' italic text-3xl font-extrabold text-blue-900 flex'>
                        <span className='ml-2'>Danh sách thuốc được cấp phép bởi {`${id}`}</span>
                    </h1>
                </div>
                <div className='flex'>
                    <div className='w-2/3 gap-4 mt-2 mb-10 px-48 flex'>
                        <form className='w-1/2'>
                            <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                            <div class="relative w-full">
                                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                                <input
                                    type="search" onChange={handleSearchChange} value={search} name='search' id="default-search" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-blue-400 focus:outline-blue-500 rounded-lg " placeholder="Tìm kiếm..." required />
                            </div>
                        </form>
                        <div className=' ml-2 mt-1 relative'>
                            <button onClick={toggleFilter} className={`text-white rounded-md  bg-blue-600 ${isOpenFilter ? "bg-blue-300" : ''} flex w-auto focus:ring-2 focus:ring-blue-300 font-medium text-sm px-5 py-2.5 me-2 mb-2`}><Filter size={20}></Filter>

                            </button>
                            {isOpenFilter && (

                                <div className="absolute z-10 left-16 top-0 rounded-md w-56 shadow-lg bg-white ring-1 ring-black ring-opacity-5">

                                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                        <div className='flex flex-col justify-start px-2 py-2'>
                                            <h3 className="text-xl font-semibold mb-2">Lọc</h3>
                                            <hr></hr>
                                            <div className='p-2'><h3><b>Sort Field</b></h3>
                                                <div className="flex items-center mb-2">
                                                    <input type="radio" id="sortByName" onChange={handleSortFieldChange} name="sortField" value="name" className="mr-2" />
                                                    <label htmlFor="sortByName">Name</label>
                                                </div>
                                                <div className="flex items-center mb-2">
                                                    <input type="radio" id="sortByCompany" onChange={handleSortFieldChange} name="sortField" value="company" className="mr-2" />
                                                    <label htmlFor="sortByCompany">Company</label>
                                                </div>
                                                <div className="flex items-center mb-2">
                                                    <input type="radio" id="sortByCategory" onChange={handleSortFieldChange} name="sortField" value="category" className="mr-2" />
                                                    <label htmlFor="sortByCategory">Category</label>
                                                </div></div>
                                            <div className='p-2'><h3><b>Sort Order</b></h3>
                                                <div className="flex items-center mb-2">
                                                    <input type="radio" id="sortOrderAsc" onChange={handleSortOrderChange} name="sortOrder" value="asc" className="mr-2" />
                                                    <label htmlFor="sortOrderAsc">Ascending</label>
                                                </div>
                                                <div className="flex items-center mb-2">
                                                    <input type="radio" id="sortOrderDesc" onChange={handleSortOrderChange} name="sortOrder" value="desc" className="mr-2" />
                                                    <label htmlFor="sortOrderDesc">Descending</label>
                                                </div></div>
                                        </div>
                                        <hr className="my-2" />
                                        <div className='flex justify-center'>
                                            <button className='bg-green-500 text-white rounded-md px-4 py-2 mx-2' onClick={handleOnClickFilter}>Apply</button>
                                            <button className='bg-red-500 text-white rounded-md px-4 py-2 mx-2' onClick={() => setIsOpenFilter(false)}>Cancel</button>
                                        </div>
                                    </div>
                                </div>

                            )}
                        </div>

                    </div>

                    <div><Link to={`/createproduct/${id}`}><button type="button" className="text-white flex bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm py-2.5 text-center ml-24 me-2 mt-8 p-4 gap-2"><PlusCircle size={20}></PlusCircle> Thêm mới thuốc</button></Link></div>
                </div>
                <div className='w-11/12 mx-auto text-center'>
                    <h3 className='text-2xl font-medium text-blue-900 mb-6'>Thuốc được phê duyệt</h3>
                    <hr className=' border-gray-300 mb-4 border-t-2'></hr>
                </div>
                <div className='mb-6 p-6 mt-4 grid grid-cols-4'>
                    {productListApi && productListApi.map((product) => (<div class="max-w-sm mt-4 bg-white rounded-lg shadow-xl col-span-1 w-11/12 mx-auto">
                        <div className="img-container">
                            <Link to={`/productdetail/${product.id}`}>
                                <img className="w-full h-56 rounded-lg rounded-b-none object-cover border border-b-1" src={product.image || `https://img.freepik.com/free-vector/isometric-gastroenterology-composition-with-view-medication-with-tubes-pills-illustration_1284-63536.jpg`} alt="" />
                            </Link>
                        </div>

                        <div class="p-3">
                            {/* <a href="#">
                                <h5 class=" text-xl font-light font-sans tracking-tight text-gray-900 dark:text-white">{product.name}</h5>
                            </a> */}
                            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Tên thuốc: <i>{product.name}</i></p>
                            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Loại thuốc: <i>{product.category}</i></p>

                        </div>
                    </div>))}

                </div>
                <div className='mb-6 flex justify-center'>
                    <nav aria-label="">
                        <ul className="flex items-center -space-x-2 h-10 text-base">
                            <li className={`page-item ${currentPage === 0 ? "disabled" : ""}`}>
                                <button onClick={handleDecreasePage} className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white hover:text-gray-700">
                                    Previous
                                </button>
                            </li>
                            {totalPages ? [...Array(totalPages).keys()].map((page) => (
                                <li className={`page-item ${currentPage === page ? 'active' : ''}`} key={page}>
                                    <button
                                        onClick={() => handlePageChange(page)}
                                        className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-300 '} border border-gray-300 rounded-xl mx-3`}
                                    >
                                        {page + 1}
                                    </button>
                                </li>
                            )) : <div></div>}
                            <li className={`page-item ${currentPage === totalPages - 1 ? "disabled" : ""}`}>
                                <button onClick={handleIncreasePage} className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white hover:text-gray-700">
                                    Next
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default ProductList