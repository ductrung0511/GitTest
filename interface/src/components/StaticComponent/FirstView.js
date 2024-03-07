
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
    { name: 'Workspace', href: '/workspace' },
  ];
function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }
export default function FirstView()

{
    const backgroundImageUrl = 'https://i.ibb.co/3Wdms3y/z5193581124391-caab4eb919973361c0f6e880aa5275c8.jpg';

  const containerStyle = {
    backgroundImage: `url('${backgroundImageUrl}')`,
    // Add other styles as needed
  };
    const profileImgUrl = localStorage.getItem('profile_img');

    return(



        <div
            className="w-screen h-screen bg-no-repeat bg-cover bg-fixed flex flex-col justify-between"
            style={containerStyle}
       >

            <div className="flex flex-row justify-between h-24 px-3 py-3">

                <div className="flex">
                    <img
                      className="h-[10vh] w-auto rounded  bg-transparent"
                      src="/logoTransparent.png"
                      alt="Your Company"
                    />
                    <div className="hidden sm:ml-6 sm:block   ">
                                <div className="flex space-x-4 pt-3 ">
                                {navigation.map((item) => (
                                    <NavLink
                                    key={item.name}
                                    to={item.href}
                                    className={({ isActive }) => {
                                        return ' no-underline px-3 py-2 rounded-md text-sm font-medium ' + (!isActive ?
                                        'text-gray-800 hover:bg-gray-700 hover:text-white' : 'bg-transparent text-white')
                                    }}
                                    >
                                    {}
                                    </NavLink>
                                ))}
                                </div>
                    </div>
                </div>
                <div className=' flex flex-row items-left rounded-lg py-1 mx-3 px-1  h-auto w-1/7 items-center bg-transparent'>
                    


                    <div className='rounded-3xl pl-2 pr-4 py-1 flex gap-2 flex-row items-center border-gray-400 border-1' >
                        {profileImgUrl ? (
                            // If the profile image URL exists, display the image
                            <img src={profileImgUrl} alt='Profile' className='rounded-full bg-black' />
                        ) : (
                            // If the profile image URL is not found, display a placeholder or default image
                            <img src='https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSx9yBvquZ3z_DsxhnCNx2PBb1AdzBOF5iyMOqtgZJWeIs6_k9m' alt='Profile'
                            className='rounded-full bg-black w-10 h-10' />
                        )}
                    <div className='text-base  text-gray-700'> {localStorage.getItem('username')}</div>

                    </div>
                    <Login/>

                    
                    
                    
                </div>
            </div>

            <div className="flex flex-col">
                <div className='w-50 pl-2 ml-14 h-72 flex flex-col pt-24 relative'> 

                    {/*
                    <img src='' alt='https://www.ilsc.com/hubfs/30yrs-Logo.svg' className='text-white w-40 h-40'/>
                    */}
                    <p className='font-extrabold text-blue-800 text-3xl uppercase z-20'> bring your  Tommorow closer </p>
                    <p className='font-extrabold text-blue-800 text-2xl ml-10 z-20'>"Enter to learn leave to achieve" </p>
                    <p className='font-extrabold ml-10 text-white text-2xl'></p>

                    <div className='bg-white h-72 absolute  top-0 w-full z-10 left-0 filter blur-3xl'></div>

                    
  
                        
                    
                    

                    

                </div>
            
                <div className='flex flex-row justify-between h-40 px-3 py-3'>
                    <div className='flex flex-row justify-between items-end'>
                        <div>
                        <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none
                        hover:bg-gray-100 focus:ring-4
                        focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2
                        dark:bg-gray-800 dark:text-white dark:border-gray-600
                        dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Language Test</button>
                        <button  className="text-gray-900 bg-yellow-200 border-2 border-yellow-100 focus:outline-none
                        hover:bg-gray-100 focus:ring-4
                        focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2
                        dark:bg-gray-800 dark:text-white dark:border-gray-600
                        dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Aplly now</button>
                        </div>
                        

                    </div>
                    <div className='grid grid-cols-1 pb-2'>
                            <button type="button" className="text-gray-900 ml-10 bg-white border-2 border-blue-200 focus:outline-none
                        hover:bg-gray-100 focus:ring-4
                        focus:ring-gray-200 font-medium rounded-full text-base px-5 py-2.5 me-2 mb-2 h-14
                        dark:bg-gray-800 dark:text-white dark:border-gray-600
                        dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Liên hệ:   0345 578 573</button>
                            
                            <div className='flex flex-row px-5'>
                                <svg className="w-6 h-6 text-yellow-100 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 20">
                                    <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z"/>
                                </svg>
                                
                                <span className=' ml-2 uppercase font-bold text-yellow-300 underline hover:no-underline'>
                                        Xem video
                                </span>
                            </div>
                    </div>
                </div>
            </div>
            

        </div>
    )
}