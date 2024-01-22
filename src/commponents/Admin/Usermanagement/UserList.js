import React, { useEffect, useState } from 'react'
import Navigation from '../../Navbar/Navigation'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../../../redux/userlistManagement/userSlice'
import '../../../css/UserManagement/userlist.css'
import { ThreeDots } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
const UserList = () => {
    const usersAPI = useSelector((user) => user.userlist.data)
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    let count = 1
    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch])

    const toggleDropdown = (user) => {
        setSelectedUser(user);
        setIsOpen(!isOpen);
        console.log(user)
    };

    if (!usersAPI) {
        // Handle loading state
        return <div>Loading...</div>;
    }

    if (!Array.isArray(usersAPI) || usersAPI.length === 0) {
        // Handle empty state
        return (<div>
            <div className="fixed top-0 w-full z-50">
                <Navigation />
            </div>
            <div className='mt-32 mb-32'><span>Loading...</span></div>
        </div>);
    }

    return (
        <>
            <div className="fixed top-0 w-full z-50">
                <Navigation />
            </div>
            <div className='mt-32 mb-32'>
                <div className='py-8 flex justify-center'>
                    <h1 className='text-5xl font-serif font-thin text-emerald-500 flex'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" fill="currentColor" class="bi bi-people mt-1" viewBox="0 0 16 16">
                            <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4" />
                        </svg>
                        <span className='ml-2'>User Management</span>
                    </h1>
                </div>
                <div>


                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table class="w-3/4 shadow-2xl mb-20 table-auto mx-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        No
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Fullname
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Date of birth
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Email
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Password
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Gender
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Role
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        {/* <span class="sr-only"></span> */}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {usersAPI && usersAPI.map((user) => (<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {count++}
                                    </th>
                                    <td class="px-6 py-4">
                                        {user.fullName}
                                    </td>
                                    <td class="px-6 py-4">
                                        {user.dob}
                                    </td>
                                    <td class="px-6 py-4">
                                        {user.email}
                                    </td>
                                    <td class="px-6 py-4">
                                        {user.password}
                                    </td>
                                    <td class="px-6 py-4">
                                        {user.gender === true ? "Male" : "Female"}
                                    </td>
                                    <td class="px-6 py-4">
                                        {user.role}
                                    </td>
                                    <td class="px-6 py-4 text-right">
                                        {/* <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a> */}
                                        <button type="button"
                                            onClick={() => toggleDropdown(user)}
                                            className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-gray-700 border border-transparent rounded-md focus:outline-none focus:border-gray-800 focus:ring focus:ring-gray-300 active:bg-gray-800">
                                            <ThreeDots color='white'></ThreeDots>
                                        </button>
                                        {isOpen && selectedUser && selectedUser.id === user.id && (
                                            <div className="absolute right-10 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <div className="py-4">
                                                    <button

                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                    >
                                                        <Link to={`/edituser/${user.id}`}>Chỉnh sửa người dùng</Link>
                                                    </button>
                                                    <a
                                                        href="#"
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                    >
                                                        Vô hiệu hóa người dùng
                                                    </a>
                                                    <a
                                                        href="#"
                                                        className="block text-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                    >
                                                        Xóa người dùng
                                                    </a>
                                                </div>
                                            </div>
                                        )}
                                    </td>
                                </tr>))}

                            </tbody>
                        </table>
                    </div>


                </div>



            </div>
        </>
    )
}

export default UserList