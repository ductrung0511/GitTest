import { Fragment, useState, useEffect } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { BellIcon } from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';
import Login from './Login&LogoutButton';
import LoginLanguage from './LanguageOption';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Course', href: '/course' },
  { name: 'Blog', href: '/blog' },
  { name: 'Workspace', href: '/workspace/dashboard' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Header(props) {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

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
      <Disclosure as="nav" className= {isHeaderVisible ? 'fixed w-full max-w-7xl  bg-color-vibrant hidden  z-50': 'fixed w-full max-w-7xl z-40  bg-white' }>
        {({ isHeaderVisible }) => (
          <>
            <div className=" max-w-7xl px-2 sm:px-6 lg:px-8 bg-color-vibrant bg-opacity-20">
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
                      {navigation.map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.href}
                          className={({ isActive }) => {
                            return ' no-underline px-3 py-2 rounded-md text-sm font-medium ' + (!isActive ?
                              'text-gray-800 hover:bg-gray-700 hover:text-white' : 'bg-gray-900 text-white')
                          }}
                        >
                          {item.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>

                
                <div className=' flex flex-row bg-transparent'>
                

                <div className='rounded-3xl pl-2 pr-4 py-1 flex gap-2 flex-row items-center border-gray-400 border-1' >
                      {profileImgUrl ? (
                        // If the profile image URL exists, display the image
                        <img src={profileImgUrl} alt='Profile' className='rounded-full bg-black' />
                      ) : (
                        // If the profile image URL is not found, display a placeholder or default image
                        <img src='https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSx9yBvquZ3z_DsxhnCNx2PBb1AdzBOF5iyMOqtgZJWeIs6_k9m' alt='Profile'
                         className='rounded-full bg-black w-10 h-10' /> 
                      )}
                  <div className='text-base  text-gray-700'> { Object.keys(localStorage).includes('username') ? localStorage.getItem('username') : "Not logged in" }</div>

                </div>
                <Login/>
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