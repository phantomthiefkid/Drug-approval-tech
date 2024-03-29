import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { PlusCircle, Bank2 } from 'react-bootstrap-icons'
import { fetchProfileProducts } from '../../../redux/profileProduct/profileProductSlice'

const ProfileProductList = () => {

  const profilesAPI = useSelector((profile) => profile.profileProduct.data.content)
  const totalPagesAPI = useSelector((page) => page.profileProduct.data.totalPages);
  const [currentPage, setCurrentPage] = useState(0);
  const [apiData, setApiData] = useState([]);
  const [profileList, setProfileList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const pageRange = 5

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
      if (response.payload.content.length === 0) {
        setCurrentPage(0);
      } else {
        setApiData(response.payload.content);
      }
    })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, [dispatch, currentPage, searchTerm]);

  useEffect(() => {
    setProfileList([...apiData]);
  }, [apiData])

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

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
  }, [token, navigate])

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
            <div className='w-full h-44 relative rounded-xl transition-transform duration-300 transform hover:scale-105 hover:shadow-xl'>
              <div className='absolute inset-0 z-0 rounded-xl'></div>
              <div className='h-full z-10 border border-gray-300 transition-transform duration-300 transform rounded-xl items-center flex'>
                <div className='ml-3'>
                  <img className={`logo`} src={profile.imageURL || 'https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/305629404_387010020291228_5415088369092979332_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFf5FpiiQMWSMoSwRaz9pYeuugHYAEI1Gy66AdgAQjUbJwuBoyNM-GO9vzwWkWqwZFBcZpNucoy_ebvrZRrmFGP&_nc_ohc=s0WQL6aV27gAX-j0SrO&_nc_ht=scontent.fsgn2-6.fna&oh=00_AfDBz78d51KtmrN369AkN2sbE9MXtq5n7XOW9jCdnWpEAg&oe=66006499'} alt='profile' style={{ width: '130px', height: '130px' }} />
                </div>
                <div className='ml-20'>
                  <div className='flex'>
                    <div class=''>
                      <div class='mx-8 flex items-center'>
                        <span class='font-bold text-2xl'>Tên hồ sơ:</span>
                        <h2 class='ml-3 text-3xl text-transparent bg-clip-text bg-gradient-to-r bg-purple-900 font-bold'>{profile.title}</h2>
                      </div>
                      <div className='mx-8 mt-8 flex'>
                        <div className='inline-block'>
                          {profile.status === 'DRAFT' ? (
                            <p className="status bg-sky-600 text-white p-2 rounded text-xl">{profile.status}</p>
                          ) : profile.status === 'PENDING TO APPROVE' || profile.status === 'PENDING' || profile.status === 'PENDING TO PROCEED' ? (
                            <p className="status bg-red-500 text-white p-2 rounded text-xl">{profile.status}</p>
                          ) : profile.status === 'APPROVE' || profile.status === 'CLOSED' ? (
                            <p className="status bg-green-500 text-white p-2 rounded text-xl">{profile.status}</p>
                          ) : profile.status === 'PENDING TO PROCEED' ? (
                            <p className="status bg-yellow-400 text-white p-2 rounded text-xl">{profile.status}</p>
                          ) : (
                            <p className="status">{profile.status}</p>
                          )}
                        </div>
                        <div className='absolute top-0 right-0 border border-gray-100 p-2 rounded-md bg-sky-400 text-white mt-24 mr-48'>
                          <span className='font-bold text-xl justify-end mr-3'>CreatedOn:</span>
                          <span>{profile.createdOn}</span>
                        </div>
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
          <ul className="flex items-center -space-x-px h-10 text-base">
            <li className={`page-item ${currentPage === 0 ? "disabled" : ""}`}>
              <button onClick={handleDecreasePage} className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white hover:text-gray-700">
                Previous
              </button>
            </li>
            {totalPagesAPI && [...Array(totalPagesAPI).keys()].slice(currentPage, currentPage + pageRange).map((page) => (
              <li className={`page-item ${currentPage === page ? 'active' : ''}`} key={page}>
                <button onClick={() => handlePageChange(page)} className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-300 '} border border-gray-300 rounded-xl mx-3`}>{page + 1}</button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPagesAPI - 1 ? "disabled" : ""}`}>
              <button onClick={handleIncreasePage} className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white hover:text-gray-700">
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