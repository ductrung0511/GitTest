import { Fragment, useState, useEffect } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { BellIcon } from '@heroicons/react/24/outline';
import { NavLink, useNavigate } from 'react-router-dom';
import Login from './Login&LogoutButton';
import LoginLanguage from './LanguageOption';
import {Tooltip} from 'react-tooltip'

const navigation = [
  { name: 'Home', href: '/', tip:'🌟Trang chủ là nơi bạn khám phá thêm về Trung tâm tuyệt vời của chúng tôi!' },
  { name: 'Course', href: '/course', tip:'🔍 Khám phá các khóa học hấp dẫn khác trong hệ thống của chúng tôi!' },
  // { name: 'Blog', href: '/blog' },
  { name: 'Workspace', href: '/workspace/dashboard', tip:'📝 Đây là nơi bạn giám sát các khóa học đã đăng ký của mình.  ' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Header(props) {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const threshold = props.threshold; // Adjust as needed

      setIsHeaderVisible(scrollPosition < threshold);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const profileImgUrl = localStorage.getItem('profile_img');


  return (
      
    
    <>
      <Disclosure as="nav" className= {isHeaderVisible ? 'fixed w-full  bg-color-vibrant hidden  z-50': 'fixed w-full  z-40  bg-white' }>
        {({ isHeaderVisible }) => (
          <>
            <div className=" w-full px-2 sm:px-6 lg:px-8 bg-color-vibrant bg-opacity-20">
              <div className="relative flex h-20 items-center justify-between">
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex">
                    <img
                      className="h-10 w-auto rounded"
                      src="/logoTransparent.png"
                      alt="Your Company"
                    />
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4 pt-2">
                      {navigation?.map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.href}
                          // data-tooltip-id ='my-tooltip'
                          // data-tooltip-content={item.tip}
                          // data-tooltip-place="bottom"
                          {...( ( (localStorage.getItem('courseAuth')? localStorage.getItem('courseAuth').split('/').length < 4 : true) || !localStorage.getItem('courseAuth'))
                                  ? {
                                      'data-tooltip-id': 'my-tooltip',
                                      'data-tooltip-content': item.tip,
                                      'data-tooltip-place': 'bottom'
                                    }
                                  : {})}
                          className={({ isActive }) => {
                            return ' no-underline px-3 py-2 rounded-md text-sm font-medium ' + (!isActive ?
                              'text-gray-800 hover:bg-gray-700 hover:text-white' : 'bg-gray-900 text-white')
                          }}
                        >
                          {item.name}
                        </NavLink>
                      ))}
                      <Tooltip id='my-tooltip'/>
                    </div>
                  </div>
                </div>

                
                <div data-tooltip-content='Đăng nhập, đăng xuất hoặc đăng kí tài khoản' data-tooltip-id='my-tooltip' data-tooltip-place='bottom' className=' flex flex-row bg-transparent'>
                  <Login/>
                

                  <div className='rounded-3xl pr-14 mr-9  flex gap-2 flex-row items-center border-gray-400 shadow-lg  border-1' >
                        {/* {profileImgUrl ? (
                          // If the profile image URL exists, display the image
                          <img src={profileImgUrl} alt='Profile' className='rounded-full bg-black' />
                        ) : (
                          // If the profile image URL is not found, display a placeholder or default image
                          <img src='https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSx9yBvquZ3z_DsxhnCNx2PBb1AdzBOF5iyMOqtgZJWeIs6_k9m' alt='Profile'
                          className='rounded-full bg-black w-10 h-10' /> 
                        )} */}
                      <div {...((localStorage.getItem('courseAuth')?.split('/').length < 4 || !localStorage.getItem('courseAuth'))
                                  ? {
                                      'data-tooltip-id': 'my-tooltip',
                                      'data-tooltip-content':
                                        'Menu này sẽ cung cấp cho bạn các tùy chọn📋🔧',
                                      'data-tooltip-place': 'bottom'
                                    }
                                  : {})}  className="dropdown dropdown-bottom dropdown-end">
                                {/* <div  className="btn m-1">Click</div> */}
                                <img
                                  
                                  
                                  tabIndex={0} role="button"

                                  className="w-12 h-12 rounded-full hover:opacity-30 duration-300" src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSx9yBvquZ3z_DsxhnCNx2PBb1AdzBOF5iyMOqtgZJWeIs6_k9m" alt="avatar"/>
                                <ul 
                                {...((localStorage.getItem('courseAuth')?.split('/').length < 5 )
                                ? {
                                    'data-tooltip-id': 'my-tooltip',
                                    'data-tooltip-content':
                                      'Click outside to close the menu. 🔄',
                                    'data-tooltip-place': 'right'
                                  }
                                : {})}  
                                tabIndex={0} className="dropdown-content z-[1] items-center menu p-2 shadow bg-gray-300 rounded-box w-52">
                                    <li><button onClick={()=> {navigate("/workspace/dashboard/")}} className='flex gap-1'>Dashboard<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                                      </svg>
                                        </button> </li>
                                    <li><button onClick={()=> {navigate("/workspace/performance/")}}>Statistics <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
                                        </svg>
                                        </button> </li>
                                    <li><button onClick={()=> {navigate("/workspace/resources/")}}>Resources <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="m7.875 14.25 1.214 1.942a2.25 2.25 0 0 0 1.908 1.058h2.006c.776 0 1.497-.4 1.908-1.058l1.214-1.942M2.41 9h4.636a2.25 2.25 0 0 1 1.872 1.002l.164.246a2.25 2.25 0 0 0 1.872 1.002h2.092a2.25 2.25 0 0 0 1.872-1.002l.164-.246A2.25 2.25 0 0 1 16.954 9h4.636M2.41 9a2.25 2.25 0 0 0-.16.832V12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 12V9.832c0-.287-.055-.57-.16-.832M2.41 9a2.25 2.25 0 0 1 .382-.632l3.285-3.832a2.25 2.25 0 0 1 1.708-.786h8.43c.657 0 1.281.287 1.709.786l3.284 3.832c.163.19.291.404.382.632M4.5 20.25h15A2.25 2.25 0 0 0 21.75 18v-2.625c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125V18a2.25 2.25 0 0 0 2.25 2.25Z" />
                                        </svg></button> </li>
                                    <li> <Login/> </li>
                                </ul>
                            </div>
                      <div  className='text-base  text-gray-700 capitalize'> { Object.keys(localStorage).includes('username') ? localStorage.getItem('username') : "" }</div>
                  </div>
                       
                </div>
              </div>
            </div>
          </>
        )}
      </Disclosure>

      {props.children}

      </>
  )
}





{/* 

<div className='flex ' >
                  <div className={`box-content rounded h-10 w-4/5 p-4 ${isHeaderVisible ? 'bg-transparent' : 'bg-white'} m4 px-10 py-2 justify-between `}>

                    <div className="absolute inset-y-0 right-10 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                      <button
                        type="button"
                        className=" text-yellow-400 "
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-8 w-8" aria-hidden="true" />
                      </button>

                      
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-10 w-10 rounded-full"
                              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                              alt=""
                            />
                          </Menu.Button>
                        </div>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                >
                                  Your Profile
                                </a>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                >
                                  Settings
                                </a>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                >
                                  Sign out
                                </a>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                </div>


*/}