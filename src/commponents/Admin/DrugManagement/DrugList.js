import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { Filter, Boxes } from 'react-bootstrap-icons'

import { fetchDrugs } from '../../../redux/drugManagement/drugSlice'

const DrugList = () => {

    const drugsAPI = useSelector((drug) => drug.druglist)
    const [totalPages, setTotalPages] = useState(0);
    const dispatch = useDispatch();
    const [isOpenFilter, setIsOpenFilter] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [apiData, setApiData] = useState([]);
    const [drugList, setDrugList] = useState([]);
    const [sortField, setSortField] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [searchTerm, setSearchTerm] = useState('');

    const itemsPerPage = 8

    useEffect(() => {
        if (Array.isArray(drugsAPI)) {
            setDrugList([...drugsAPI])
        }
    }, [drugsAPI])

    useEffect(() => {
        dispatch(fetchDrugs({
            pageSize: 8,
            pageNo: currentPage,
            sortField,
            sortOrder,
            search: searchTerm

        })).then((response) => {
            if (response.payload.content.length === 0) {
                setCurrentPage(0);
                setTotalPages(0);
            } else {
                setApiData(response.payload.content);
                setTotalPages(response.payload.totalPages);
            }
        })
            .catch((error) => {
                // Xử lý lỗi nếu có
                console.error('Error fetching users:', error);
            });
    }, [dispatch, currentPage, sortField, sortOrder, searchTerm]);
    useEffect(() => {
        setDrugList([...apiData]);
    }, [apiData]);

    const handleIncreasePage = () => {
        setCurrentPage((prev) => prev + 1);
    };

    const handleDecreasePage = () => {
        setCurrentPage((prev) => prev - 1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const toggleFilter = () => {
        setIsOpenFilter(!isOpenFilter)
    }
    const resetFilters = () => {
        setSortField('')
        setIsOpenFilter(false);
        setCurrentPage(0);
        setSortOrder('asc')
        dispatch(fetchDrugs({ pageSize: 8, pageNo: 0 }));
    };

    const handleSortFieldChange = (e) => setSortField(e.target.value);
    const handleSortOrderChange = (e) => setSortOrder(e.target.value);
    const handleSearchChange = (e) => setSearchTerm(e.target.value);

    return (
        <>
            <div className='mt-28'>
                <div className='py-8 flex px-48'>
                    <h1 className=' italic text-3xl font-extrabold text-blue-900 flex'>
                        <Boxes></Boxes>
                        <span className='ml-2'>Quản lý hoạt chất</span>
                    </h1>
                </div>

                <div className='flex'>
                    <div className='w-2/3 mt-8 mb-10 px-48 flex'>
                        <form>
                            <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                            <div class="relative">
                                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                                <input
                                    type="search" name='search' id="default-search" value={searchTerm} onChange={handleSearchChange} class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg " placeholder="Tìm kiếm..." required />
                            </div>
                        </form>

                        <div className='w-1/4 ml-2 flex'><button onClick={toggleFilter} className='text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'><Filter size={30}></Filter> </button>
                            {isOpenFilter && (
                                <div className="origin-top-right absolute z-10 ml-14 w-72 rounded-md shadow-xl bg-white ring-1 ring-black ring-opacity-5">
                                    <div className="py-4 px-6" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                        <h3 className="text-lg font-semibold mb-2">Filter Form</h3>
                                        <div className='flex w-full'>
                                            <div className="mb-4 w-full">
                                                <label htmlFor="sortField" className="block text-sm font-medium text-gray-700">Sort Field</label>
                                                <select value={sortField} onChange={handleSortFieldChange} id="sortField" className="mt-1 p-2 w-full border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300">
                                                    <option value="">Chọn</option>
                                                    <option value="name">Tên</option>
                                                    <option value="type">Loại</option>
                                                    <option value="state">Tình trạng</option>
                                                </select>
                                            </div>

                                            <div className="mb-4 ml-4 w-full">
                                                <label htmlFor="sortOrder" className="block text-sm font-medium text-gray-700">Sort Order</label>
                                                <select value={sortOrder} onChange={handleSortOrderChange} id="sortOrder" className="mt-1 p-2 w-full border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300">
                                                    <option value="asc">Tăng dần</option>
                                                    <option value="desc">Giảm dần</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="flex justify-end">
                                            <button onClick={resetFilters} className='text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 me-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800'>
                                                Reset
                                            </button>
                                            <button onClick={() => setIsOpenFilter(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-300 rounded-md hover:bg-gray-400 focus:outline-none focus:ring focus:border-gray-500">
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className='mb-6'>
                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table class="w-5/6 shadow-2xl mb-12 table-auto mx-auto text-sm text-left rtl:text-right text-gray-500">
                            <thead class="text-xs text-white uppercase bg-blue-900">
                                <tr>
                                    <th scope="col" class="px-2 py-3 ">
                                        Số thứ tự
                                    </th>
                                    <th scope="col" class="px-2 py-3">
                                        Tên
                                    </th>
                                    <th scope="col" class="px-2 py-3">
                                        Loại
                                    </th>
                                    <th scope="col" class="px-2 py-3">
                                        Tình trạng
                                    </th>
                                    <th scope="col" class="px-2 py-3 w-36">
                                        <button className='flex'>MÔ TẢ CƠ BẢN</button>
                                    </th>
                                    <th scope="col" class="px-2 py-3">

                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(drugList) && drugList.map((drug, index) => (<tr class="bg-white border-b hover:bg-gray-100">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {index + 1 + currentPage * itemsPerPage}
                                    </th>
                                    <td class="">
                                        {drug.name}
                                    </td>
                                    <td class="">
                                        {drug.type}
                                    </td>
                                    <td class="">
                                        {drug.state}
                                    </td>
                                    <td class="">
                                        {drug.simpleDescription}
                                    </td>
                                </tr>))}
                            </tbody>
                        </table>
                        <div className='mb-6 flex justify-center'>
                            <nav aria-label="">
                                <ul class="flex items-center -space-x-px h-10 text-base">
                                    <li className={`page-item ${currentPage === 0 ? "disabled" : ""}`}>
                                        <button onClick={handleDecreasePage} class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700">
                                            <svg class="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4" />
                                            </svg>
                                        </button>
                                    </li>
                                    {totalPages ? [...Array(totalPages).keys()].map((page) => (
                                        <li className={`page-item ${currentPage === page ? 'active' : ''}`}
                                            key={page}>
                                            <button onClick={() => handlePageChange(page)} class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">{page + 1}</button>
                                        </li>
                                    )) : <div></div>}
                                    <li className={`page-item ${currentPage === totalPages - 1 ? "disabled" : ""}`}>
                                        <button onClick={handleIncreasePage} class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700">

                                            <svg class="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                                            </svg>
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DrugList