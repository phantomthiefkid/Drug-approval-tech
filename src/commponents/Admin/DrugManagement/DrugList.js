import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { Filter, Boxes, PlusCircle, PencilFill, Trash3Fill } from 'react-bootstrap-icons'
import ModalUpdateDrug from './ModalUpdateDrug';
import { deactivateDrugs, fetchDrugs } from '../../../redux/drugManagement/drugSlice'
import { toast, ToastContainer } from 'react-toastify';

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
    //------
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDrug, setSelectedDrug] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [shouldReloadData, setShouldReloadData] = useState(true);
    const [drugs, setDrugs] = useState([]);
    let count = 1

    const [searchTerm, setSearchTerm] = useState('');

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
                console.log("123456", response.payload.content)
            }
        })
            .catch((error) => {
                // Xử lý lỗi nếu có
                console.error('Error fetching users:', error);
            });
    }, [dispatch, currentPage, sortField, sortOrder, shouldReloadData, searchTerm]);

    useEffect(() => {
        setDrugList([...apiData]);
    }, [apiData]);
    const handleUpdateSuccess = () => {
        // Đặt shouldReloadData thành true để load lại dữ liệu
        setShouldReloadData(!shouldReloadData);
        // Đóng modal
        setShowModal(false);
    };

    const toggleModal = () => {
        setShowModal(!showModal);
        setIsOpen(false)
    };

    const toggleDropdown = (drug) => {
        setSelectedDrug(drug)
        setIsOpen(!isOpen);
    };

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

    const handleDeactivate = (id) => {
        dispatch(deactivateDrugs(id)).then(() => {
            toast.success('Vô hiệu hóa thành công!', { autoClose: 300 })
            // dispatch(fetchDrugs({ pageSize: 8, pageNo: currentPage }))
            setShouldReloadData(!shouldReloadData)
            setIsOpen(false);
        })

    }

    // const handleActive = (drugId) => {
    //     const drugActive = { active: true, id: drugId }
    //     dispatch(updateDrugs(drugActive)).then(() => {
    //         toast.success('Kích hoạt thành công!', { autoClose: 300 })
    //         // dispatch(fetchDrugs({ pageSize: 8, pageNo: currentPage }))
    //         setShouldReloadData(!shouldReloadData)
    //         setIsOpen(false);
    //     })

    // }

    return (
        <>
            <div className='mt-28'>
                <ToastContainer></ToastContainer>
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
                    <div><Link to={'/createdrug'}><button type="button" className="text-white flex bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm py-2.5 text-center ml-24 me-2 mt-8 p-4 gap-2"><PlusCircle size={20}></PlusCircle> Thêm mới</button></Link></div>
                </div>

                <div className='mb-6'>
                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table class="w-5/6 shadow-2xl mb-12 table-auto mx-auto text-sm text-left rtl:text-right text-gray-500 ">
                            <thead class="text-xs text-white uppercase bg-blue-900">
                                <tr>
                                    <th scope="col" class="py-3 w-14 text-center">
                                        Số thứ tự
                                    </th>
                                    <th scope="col" class=" py-3 w-14">
                                        Tên
                                    </th>
                                    <th scope="col" class=" py-3 w-20">
                                        Loại
                                    </th>
                                    <th scope="col" class=" py-3 w-20">
                                        Tình trạng
                                    </th>
                                    <th scope="col" class=" py-3 w-40">
                                        <button className='flex'>MÔ TẢ CƠ BẢN</button>
                                    </th>
                                    <th scope="col" class=" py-3 w-14">
                                        <button className='flex'>HOẠT ĐỘNG</button>
                                    </th>

                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(drugList) && drugList.map((drug, index) => drug.active ? (<tr class="bg-white border-b hover:bg-gray-100">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {/* {index + 1 + currentPage * itemsPerPage} */} {count++}
                                    </th>
                                    <td class=" py-4 w-14">
                                        {drug.name}
                                    </td>
                                    <td class=" py-4 w-20">
                                        {drug.type}
                                    </td>
                                    <td class=" py-4 w-20">
                                        {drug.state}
                                    </td>
                                    <td class=" py-4">
                                        {drug.simpleDescription}
                                    </td>
                                    <td class=" py-4 w-14">
                                        <button type="button"
                                            onClick={() => toggleDropdown(drug)}
                                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-gray-400 rounded-md focus:outline-none  ">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                                                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
                                            </svg>
                                        </button>
                                        {isOpen && selectedDrug && selectedDrug.id === drug.id && (
                                            <div className="absolute right-24 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <div className="py-1">
                                                    <button onClick={toggleModal}
                                                        className="flex gap-2 px-4 w-full py-2 text-sm text-blue-600 hover:bg-gray-200 hover:text-blue-900"
                                                    >
                                                        <div className='mt-1'><PencilFill size={15} color="blue"></PencilFill></div>Chỉnh sửa
                                                    </button>
                                                </div>
                                                <div className="py-1">
                                                    <button onClick={() => handleDeactivate(drug.id)}
                                                        className="flex text-red-600 gap-2 px-4 w-full py-2 text-sm hover:bg-gray-200 hover:text-red-900"
                                                    >
                                                        <div className='mt-1'><Trash3Fill size={15} color="red"></Trash3Fill></div>Xoá
                                                    </button>
                                                </div>

                                            </div>
                                        )}
                                    </td>
                                </tr>) : null)}
                            </tbody>
                        </table>
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
                </div>
                <ModalUpdateDrug isOpen={showModal} toggleModal={toggleModal} drug={selectedDrug} onUpdateSuccess={handleUpdateSuccess} />

            </div>
        </>
    )
}

export default DrugList