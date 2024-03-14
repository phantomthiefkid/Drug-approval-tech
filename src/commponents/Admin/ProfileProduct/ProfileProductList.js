import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { PlusCircle, Bank2 } from 'react-bootstrap-icons'
import { fetchProfileProducts } from '../../../redux/profileProduct/profileProductSlice'

const ProfileProductList = () => {

  const profilesAPI = useSelector((profile) => profile.profileProduct.data)
  const totalPages = useSelector((state) => state.profileProduct.data.totalPages);
  // const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [apiData, setApiData] = useState([]);
  const [profileList, setProfileList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const token = localStorage.getItem('token')
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (Array.isArray(profilesAPI)) {
      setProfileList([...profilesAPI])
    }
  }, [profilesAPI])

  useEffect(() => {
    dispatch(fetchProfileProducts({
      pageSize: 8,
      pageNo: currentPage,
      search: searchTerm

    })).then((response) => {
      if (response.payload.length === 0) {
        setCurrentPage(0);
      } else {
        setApiData(response.payload.content);

      }
    })
      .catch((error) => {
        // Xử lý lỗi nếu có
        console.error('Error fetching users:', error);
      });
  }, [dispatch, currentPage, searchTerm]);

  // console.log("pppp", totalPages)

  useEffect(() => {
    setProfileList([...apiData]);
  }, [apiData])

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // const handleIncreasePage = () => {
  //   if (currentPage < totalPages - 1) {
  //     setCurrentPage((prev) => prev + 1);
  //   }
  // };

  // const handleDecreasePage = () => {
  //   if (currentPage > 0) {
  //     setCurrentPage((prev) => prev - 1);
  //   }
  // };

  // const handlePageChange = (page) => {
  //   setCurrentPage(page);
  // };

  const handleIncreasePage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handleDecreasePage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const handlePageChange = (page) => {

    setCurrentPage(page);

  };

  useEffect(() => {
    if (!token) {
      navigate('/')
    }
  }, [token])

  return (
    <div className='mt-14 mb-20'>
      <div className='py-8 flex px-48'>
        <h1 className='italic text-4xl font-extrabold text-blue-900 flex border-blue-500 py-4'>
          <Bank2></Bank2>   <span className='ml-2 font-sans'>Hồ sơ thuốc</span>
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
                type="search" name='search' value={searchTerm} onChange={handleSearchChange} id="default-search" class="block w-full p-3 pl-10 text-sm text-gray-900 border border-blue-400 focus:outline-blue-500 rounded-lg " placeholder="Tìm kiếm..." required />
            </div>
          </form>
        </div>
        <div><Link to={'/createprofileproduct'}><button type="button" className="text-white flex bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm py-2.5 text-center ml-24 me-2 p-4 gap-2"><PlusCircle size={20}></PlusCircle> Thêm mới hồ sơ thuốc</button></Link></div>
      </div>

      {Array.isArray(profileList) && profileList.map((profile, index) => (
        <Link to={`/profiledetail/${profile.profileId}`}>
          <div className='w-5/6 mx-auto flex bg-opacity-40 mb-5'>
            <div className='w-full h-48 relative rounded-xl transition-transform duration-300 transform hover:scale-110 hover:shadow-2xl'>
              <div className='absolute inset-0 z-0 rounded-xl'></div>
              <div className='h-full z-10 border border-gray-300 transition-transform duration-300 transform rounded-xl items-center flex'>
                <div className='ml-3'>
                  <img className={`logo`} src='https://images2.thanhnien.vn/528068263637045248/2024/1/27/den-vau-99-17063223334631232917099.jpg' alt='profile' style={{ width: '130px', height: '130px' }} />
                </div>
                <div className='ml-20'>
                  <div className='flex'>
                    <div className='flex-grow flex-col'>
                      <div className='mx-8'>
                        <span className='font-bold text-lg'>Tiêu đề thuốc:</span> {profile.title}

                      </div>
                      <div className='mx-8 mt-8'>
                        <span className='font-bold text-lg'>UpdatedBy:</span> {profile.updatedBy}
                      </div>
                    </div>
                    <div className='flex flex-col'>
                      <div className='mx-8'>
                        <span className='font-bold text-lg'>CreatedBy:</span> {profile.createdBy}
                      </div>
                      <div className='mx-8 mt-8'>
                        <span className='font-bold text-lg'>UpdateOn:</span> {profile.updatedOn}
                      </div>
                    </div>
                    <div className='flex flex-col'>
                      <div className='mx-8'>
                        <span className='font-bold text-lg'>CreatedOn:</span> {profile.createdOn}
                      </div>
                      <div className='mx-8 mt-8'>
                        <span className='font-bold text-lg'>Status:</span> {profile.status}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
              </div>
            </div>
          </div>
        </Link>
      ))}
      <div className='mb-6 flex justify-center'>
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
  )
}

export default ProfileProductList