import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeUser, deactivateUser, fetchUsers } from '../../../redux/userlistManagement/userSlice'
import '../../../css/UserManagement/userlist.css'
import { Link } from 'react-router-dom';
import { EyeFill, EyeSlashFill, Filter, PencilFill, PlusCircle } from 'react-bootstrap-icons'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
const UserList = () => {
  const usersAPI = useSelector((user) => user.userlist.data.content)
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userList, setUserList] = useState([]);
  const [apiData, setApiData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = useSelector((state) => state.userlist.data.totalPages);
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [roleName, setRoleName] = useState('');
  const [status, setStatus] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [search, setSearch] = useState('');
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  let count = 1
  useEffect(() => {
    if (!token) {
      navigate('/')
    }
  }, [token])
  useEffect(() => {
    if (Array.isArray(usersAPI)) {
      setUserList([...usersAPI]);
    }
  }, [usersAPI]);

  useEffect(() => {
    dispatch(fetchUsers({
      pageSize: 8,
      pageNo: currentPage,
      sortField,
      sortOrder,
      roleName,
      status,
      gender: genderFilter === 'Nam' ? 1 : genderFilter === 'Nữ' ? 0 : null,
      search: search
    })).then((response) => {
      if (response.payload.content.length === 0) {
        // Nếu không có dữ liệu, set lại currentPage về 0
        setCurrentPage(0);
      } else {
        setApiData(response.payload.content);
      }
    })
      .catch((error) => {
        // Xử lý lỗi nếu có
        console.error('Error fetching users:', error);
      });
  }, [dispatch, currentPage, sortField, sortOrder, roleName, status, genderFilter, search]);

  useEffect(() => {
    setUserList([...apiData]);
  }, [apiData]);


  useEffect(() => {
    dispatch(fetchUsers({
      pageSize: 8,
      pageNo: currentPage,
      sortField,
      sortOrder,
      roleName,
      status,
      gender: genderFilter === 'Nam' ? 1 : genderFilter === 'Nữ' ? 0 : null,
      search: search
    })).then((response) => {
      if (response.payload.content.length === 0) {
        // Nếu không có dữ liệu, set lại currentPage về 0
        setCurrentPage(0);
      } else {
        setApiData(response.payload.content);
      }
    })
      .catch((error) => {
        // Xử lý lỗi nếu có
        console.error('Error fetching users:', error);
      });
  }, [dispatch, currentPage, sortField, sortOrder, roleName, status, genderFilter, search]);

  useEffect(() => {
    setUserList([...apiData]);
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

  const toggleDropdown = (user) => {
    setSelectedUser(user);
    setIsOpen(!isOpen);
  };

  const toggleFilter = () => {
    setIsOpenFilter(!isOpenFilter)
  }

  const resetFilters = () => {
    setSortField('')
    setIsOpenFilter(false);
    setCurrentPage(0);
    setGenderFilter('')
    setRoleName('')
    setStatus('')
    setSortOrder('asc')
    setSearch('')
    dispatch(fetchUsers({ pageSize: 8, pageNo: 0 }));
  };

  const handleChangeStatus = (user) => {
    try {
      if (user.isActive === "Active") {
        dispatch(deactivateUser({ email: user.email })).then(() => {
          toast.success('Vô hiệu hóa người dùng thành công!!!', { autoClose: 200 })
          setIsOpen(false)
          dispatch(fetchUsers({ pageSize: 8, pageNo: currentPage }));
        })
      } if (user.isActive === 'Deactivate') {
        dispatch(activeUser({ email: user.email })).then(() => {
          toast.success('Kích hoạt người dùng thành công!!!', { autoClose: 200 })
          setIsOpen(false)
          dispatch(fetchUsers({ pageSize: 8, pageNo: currentPage }));
        })
      }
    } catch (error) {
      toast.error('Lỗi đã xảy ra', { autoClose: 200 })
      setIsOpen(false)
      throw error
    }
  }

  const handleSortFieldChange = (e) => setSortField(e.target.value);
  const handleSortOrderChange = (e) => setSortOrder(e.target.value);
  const handleRoleNameChange = (e) => setRoleName(e.target.value);
  const handleStatusChange = (e) => setStatus(e.target.value);
  const handleGenderChange = (e) => setGenderFilter(e.target.value);
  const handleSearchChange = (e) => setSearch(e.target.value);



  return (
    <>
      <ToastContainer></ToastContainer>
      <div className='mt-20'>
        <div className='py-8 flex px-48'>
          <h1 className=' italic text-3xl font-extrabold text-blue-900 flex'>
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-people mt-1" viewBox="0 0 16 16">
              <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4" />
            </svg>
            <span className='ml-2'>Quản lí người dùng</span>
          </h1>
        </div>
        <div className='flex'>
          <div className='w-2/3 mt-2 mb-10 px-48 flex'>
            <form>
              <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
              <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                  </svg>
                </div>
                <input type="search" name='search' onChange={handleSearchChange} value={search} id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg " placeholder="Tìm kiếm..." required />
              </div>
            </form>

            <div className='w-1/4 ml-2 flex'><button onClick={toggleFilter} className='text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'><Filter size={30}></Filter>

            </button>
              {isOpenFilter && (
                <div className="origin-top-right absolute z-10 ml-14 w-72 rounded-md shadow-xl bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-4 px-6" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <h3 className="text-lg font-semibold mb-2">Filter Form</h3>
                    {/* Sort Field */}
                    <div className='flex w-full'>
                      <div className="mb-4 w-full">
                        <label htmlFor="sortField" className="block text-sm font-medium text-gray-700">Sort Field</label>
                        <select value={sortField} onChange={handleSortFieldChange} id="sortField" className="mt-1 p-2 w-full border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300">
                          <option value="">Choose</option>
                          <option value="fullname">Full Name</option>
                          <option value="email">Email</option>
                          <option value="username">Username</option>
                        </select>
                      </div>

                      {/* Sort Order */}
                      <div className="mb-4 ml-4 w-full">
                        <label htmlFor="sortOrder" className="block text-sm font-medium text-gray-700">Sort Order</label>
                        <select value={sortOrder} onChange={handleSortOrderChange} id="sortOrder" className="mt-1 p-2 w-full border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300">
                          <option value="asc">Ascending</option>
                          <option value="desc">Descending</option>
                        </select>
                      </div>
                    </div>

                    {/* Role Name */}
                    <div className="mb-4">
                      <label htmlFor="roleName" className="block text-sm font-medium text-gray-700">Role Name</label>
                      <select value={roleName} onChange={handleRoleNameChange} id="roleName" className="mt-1 p-2 w-full border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300">
                        <option value="">Choose</option>
                        <option value="ADMIN">Admin</option>
                        <option value="SECRETARY">Secretary</option>
                      </select>
                    </div>

                    {/* Status */}
                    <div className="mb-4">
                      <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                      <select value={status} onChange={handleStatusChange} id="status" className="mt-1 p-2 w-full border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300">
                        <option value="">Choose</option>
                        <option value="Active">Active</option>
                        <option value="Deactivate">Deactivate</option>
                      </select>
                    </div>

                    {/* Gender */}
                    <div className="mb-4">
                      <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                      <select value={genderFilter}
                        onChange={handleGenderChange} id="gender" className="mt-1 p-2 w-full border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300">
                        <option value={null}>Choose</option>
                        <option value='Nam'>Nam</option>
                        <option value="Nữ">Nữ</option>
                      </select>
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
          <div><Link to={'/createuser'}><button type="button" className="text-white flex gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm py-2.5 text-center ml-24 me-2 mt-8 p-4"><PlusCircle size={20}></PlusCircle> Thêm mới nhân viên</button></Link></div>
        </div>

        <div className='mb-6'>
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg px-5">
            <table class="w-full divide-gray-200 overflow-x-auto mx-auto">
              <thead class="bg-blue-300 ">
                <tr className=''>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    STT
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Họ và tên
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày sinh
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tên đăng nhập
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Giới tính
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vai trò
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                {Array.isArray(userList) && userList.map((user) => (<tr class="bg-white border-b hover:bg-gray-100">
                  <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {count++}
                  </th>
                  <td class="px-6 py-4">
                    <div className='display flex items-center'>
                      <img className='rounded-full flex-shrink-0 h-12 w-12 mr-5' src={user.avatar || 'https://w7.pngwing.com/pngs/754/2/png-transparent-samsung-galaxy-a8-a8-user-login-telephone-avatar-pawn-blue-angle-sphere.png'} alt="Avatar" />
                      {user.fullname}
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    {user.dayOfBirth}
                  </td>
                  <td class="px-6 py-4">
                    {user.email}
                  </td>
                  <td class="px-6 py-4">
                    {user.username}
                  </td>
                  <td class="px-6 py-4">
                    {user.gender === 1 ? "Nam" : "Nữ"}
                  </td>
                  <td class="px-6 py-4">
                    {user.roleName}
                  </td>
                  {/* <td class="px-5 inline-flex text-md leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {user.isActive}
                  </td> */}
                  <td className="px-5 inline-flex text-md leading-5 font-semibold rounded-full p-5">
                    {user.isActive === 'Active' ? (
                      <span className="bg-green-100 text-green-800">Active</span>
                    ) : (
                      <span className="bg-red-100 text-red-800">Deactive</span>
                    )}
                  </td>
                  <td class="px-6 py-4 text-right">
                    {/* <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a> */}
                    <button type="button"
                      onClick={() => toggleDropdown(user)}
                      className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium border border-gray-500  rounded-md focus:outline-none  ">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                        <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
                      </svg>
                    </button>
                    {isOpen && selectedUser && selectedUser.id === user.id && (
                      <div className="absolute right-10 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-2 text-amber-800">
                          <Link to={`/edituser/${user.email}`}><button

                            className="flex gap-2 px-4 w-full py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
                          >
                            <div><PencilFill size={15} color="brown"></PencilFill></div>Chỉnh sửa người dùng
                          </button></Link>
                          {
                            user.isActive === 'Active' ? (<button onClick={() => handleChangeStatus(selectedUser)}

                              className="flex gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100 hover:text-gray-900"
                            >
                              <div className='mt-1'> <EyeSlashFill size={15} color="red"></EyeSlashFill></div>Vô hiệu hóa người dùng
                            </button>) : (<button onClick={() => handleChangeStatus(selectedUser)}

                              className="flex px-4 py-2 text-sm text-blue-600 hover:bg-gray-100 hover:text-gray-900"
                            >
                              <div className='mt-1 mr-2'> <EyeFill size={15} color="blue"></EyeFill></div> Kích hoạt người dùng
                            </button>)
                          }

                        </div>
                      </div>
                    )}
                  </td>
                </tr>))}
              </tbody>
            </table>

            <div className='mb-6 flex justify-center mt-10'>
              <nav aria-label="">
                <ul class="flex items-center -space-x-px h-10 text-base">
                  <li className={`page-item ${currentPage === 0 ? "disabled" : ""}`}>
                    <button onClick={handleDecreasePage} class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white hover:text-gray-700">
                      Previous
                    </button>
                  </li>
                  {totalPages ? [...Array(totalPages).keys()].map((page) => (
                    <li className={`page-item ${currentPage === page ? 'active' : ''}`}
                      key={page}>
                      <button onClick={() => handlePageChange(page)} class={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-300 '} border border-gray-300 rounded-xl mx-3`}>{page + 1}</button>
                    </li>
                  )) : <div></div>}
                  <li className={`page-item ${currentPage === totalPages - 1 ? "disabled" : ""}`}>
                    <button onClick={handleIncreasePage} class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white hover:text-gray-700">

                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div >
    </>
  )

}
export default UserList