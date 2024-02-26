import React, { useState } from 'react'
import { Filter, PlusCircle } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom';
const ProductList = () => {

    const [isOpenFilter, setIsOpenFilter] = useState(false);

    const toggleFilter = () => {
        setIsOpenFilter(!isOpenFilter)
    }

    return (
        <>
            <div className='mt-28'>
                <div className='py-8 flex px-48'>
                    <h1 className=' italic text-3xl font-extrabold text-blue-900 flex'>
                        <span className='ml-2'>Quản lý thuốc</span>
                    </h1>
                </div>
                <div className='flex'>
                    <div className='w-2/3 gap-4 mt-8 mb-10 px-48 flex'>
                        <form className='w-1/2'>
                            <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                            <div class="relative w-full">
                                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                                <input
                                    type="search" name='search' id="default-search" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-blue-400 focus:outline-blue-500 rounded-lg " placeholder="Tìm kiếm..." required />
                            </div>
                        </form>
                        <div className=' ml-2 relative'>
                            <button onClick={toggleFilter} className='text-white bg-blue-600 flex w-auto focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2'>Filter
                                <svg className="w-3.5 h-3.5 mt-1 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            {isOpenFilter && (
                                <div className="absolute z-10 left-0 top-10 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                    <div className="py-1 text-center" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                        <h3 className="text-lg font-semibold mb-2">Dropdown Content</h3>
                                        <ul>
                                            <li className="py-2">Option 1</li>
                                            <li className="py-2">Option 2</li>
                                            <li className="py-2">Option 3</li>
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                    <div><Link to={'/addnewproduct'}><button type="button" className="text-white flex bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm py-2.5 text-center ml-24 me-2 mt-8 p-4 gap-2"><PlusCircle size={20}></PlusCircle> Thêm mới thuốc</button></Link></div>
                </div>
                <div className='w-11/12 mx-auto text-center'>
                    <h3 className='text-2xl font-medium text-blue-900 mb-6'>Thuốc được phê duyệt</h3>
                    <hr></hr>
                </div>
                <div className='mb-6 mt-10 grid grid-cols-4'>
                    <div class="max-w-sm bg-white rounded-lg shadow-xl col-span-1 w-11/12 mx-auto">
                        <a href="#">
                            <img class=" w-full h-64 rounded-lg rounded-b-none object-cover border border-b-1" src="https://www.mccabespharmacy.com/cdn/shop/products/5011080125090_t1.jpg?v=1685712737" alt="" />
                        </a>
                        <div class="p-3">
                            <a href="#">
                                <h5 class="mb-2 text-2xl font-light font-serif tracking-tight text-gray-900 dark:text-white">Panadol</h5>
                            </a>
                            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Category: Giảm đau</p>
                           
                        </div>
                    </div>
                    <div class="max-w-sm bg-white rounded-lg shadow-xl col-span-1 w-11/12 mx-auto ">
                        <a href="#">
                            <img class=" w-full h-64 rounded-lg rounded-b-none object-cover border border-b-1" src="https://i5.walmartimages.com/seo/Panadol-Cold-Flu-24ct_573e7718-7305-47a8-ae32-9425ac427cc3.d447f65f7b66dfd553ac1b957e529189.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF" alt="" />
                        </a>
                        <div class="p-3">
                            <a href="#">
                                <h5 class="mb-2 text-2xl font-light font-serif tracking-tight text-gray-900 dark:text-white">Panadol</h5>
                            </a>
                            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Category: Giảm đau</p>
                           
                        </div>
                    </div>
                    <div class="max-w-sm bg-white rounded-lg shadow-xl col-span-1 w-11/12 mx-auto ">
                        <a href="#">
                            <img class=" w-full h-64 rounded-lg rounded-b-none object-cover border border-b-1" src="https://www.medicalsupplies.com.sg/4750-superlarge_default/panadol-cough-and-cold-16-sbox.jpg" alt="" />
                        </a>
                        <div class="p-3">
                            <a href="#">
                                <h5 class="mb-2 text-2xl font-light font-serif tracking-tight text-gray-900 dark:text-white">Panadol</h5>
                            </a>
                            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Category: Giảm đau</p>
                           
                        </div>
                    </div>
                    <div class="max-w-sm bg-white rounded-lg shadow-xl col-span-1 w-11/12 mx-auto ">
                        <a href="#">
                            <img class=" w-full h-64 rounded-lg rounded-b-none object-cover border border-b-1" src="https://i-cf65.ch-static.com/content/dam/cf-consumer-healthcare/panadol/vi_vn/vietnamproduct/panadol_regular_pack_shot_blue/product_detail/Desktop-455x455.png?auto=format" alt="" />
                        </a>
                        <div class="p-3">
                            <a href="#">
                                <h5 class="mb-2 text-2xl font-light font-serif tracking-tight text-gray-900 dark:text-white">Panadol</h5>
                            </a>
                            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Category: Giảm đau</p>
                           
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductList