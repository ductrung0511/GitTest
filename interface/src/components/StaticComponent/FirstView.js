
import { Fragment, useState, useEffect } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { BellIcon } from '@heroicons/react/24/outline';
import { NavLink, useNavigate } from 'react-router-dom';
import Login from './Login&LogoutButton';
import LoginLanguage from './LanguageOption';
import { Tooltip } from 'react-tooltip';
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
    const backgroundImageUrl = '/background.jpg';

  const containerStyle = {
    backgroundImage: `url('${backgroundImageUrl}')`,
    // Add other styles as needed
  };
    const scrollToPosition = (position) => {
        window.scrollTo({
        top: position,
        behavior: 'smooth' // This gives a smooth scrolling effect
        });
    };
    const profileImgUrl = localStorage.getItem('profile_img');
    const navigate = useNavigate();

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
                    


                    {/* <div className='rounded-3xl pl-2 pr-4 py-1 flex gap-2 flex-row items-center border-gray-400 border-1' >
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
                    <Login/> */}
                    <div data-tooltip-content='Nhấn vào hình ảnh để mở Menu đăng nhập và xem các khóa học!' data-tooltip-id='my-tooltip' className='rounded-3xl pr-9 mr-10 flex gap-2 flex-row items-center border-gray-400  shadow-lg border-1' >
                      {/* {profileImgUrl ? (
                        // If the profile image URL exists, display the image
                        <img src={profileImgUrl} alt='Profile' className='rounded-full bg-black' />
                      ) : (
                        // If the profile image URL is not found, display a placeholder or default image
                        <img src='https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSx9yBvquZ3z_DsxhnCNx2PBb1AdzBOF5iyMOqtgZJWeIs6_k9m' alt='Profile'
                         className='rounded-full bg-black w-10 h-10' /> 
                      )} */}
                      <div  className="dropdown dropdown-bottom dropdown-end">
                                <Tooltip id='my-tooltip' className='absolute z-40'/>
                                {/* <div  className="btn m-1">Click</div> */}
                                <img   tabIndex={0} role="button" className="w-12 h-12 rounded-full hover:opacity-30 duration-700" src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSx9yBvquZ3z_DsxhnCNx2PBb1AdzBOF5iyMOqtgZJWeIs6_k9m" alt="avatar"/>
                                <ul tabIndex={0} className="dropdown-content z-[1] items-center menu p-2 shadow bg-gray-200 text-black rounded-box w-52">
                                    <li  data-tooltip-content='Theo dõi các thống kê về khóa học của bạn' data-tooltip-id='my-tooltip' data-tooltip-place='left'  ><button onClick={()=> {navigate("/workspace/dashboard/")}} className='flex gap-1'>Dashboard<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                                      </svg>
                                        </button> </li>

                                    <li data-tooltip-content='Tìm kiếm các khóa học của bạn' data-tooltip-id='my-tooltip' data-tooltip-place='left' ><button onClick={()=> {navigate("/workspace/resources/")}}>Courses<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="m7.875 14.25 1.214 1.942a2.25 2.25 0 0 0 1.908 1.058h2.006c.776 0 1.497-.4 1.908-1.058l1.214-1.942M2.41 9h4.636a2.25 2.25 0 0 1 1.872 1.002l.164.246a2.25 2.25 0 0 0 1.872 1.002h2.092a2.25 2.25 0 0 0 1.872-1.002l.164-.246A2.25 2.25 0 0 1 16.954 9h4.636M2.41 9a2.25 2.25 0 0 0-.16.832V12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 12V9.832c0-.287-.055-.57-.16-.832M2.41 9a2.25 2.25 0 0 1 .382-.632l3.285-3.832a2.25 2.25 0 0 1 1.708-.786h8.43c.657 0 1.281.287 1.709.786l3.284 3.832c.163.19.291.404.382.632M4.5 20.25h15A2.25 2.25 0 0 0 21.75 18v-2.625c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125V18a2.25 2.25 0 0 0 2.25 2.25Z" />
                                        </svg></button> </li>
                                    
                                    <li 
                                    data-tooltip-content='Theo dõi các các tài liệu của khóa học' data-tooltip-id='my-tooltip'  data-tooltip-place='right'
                                    ><button onClick={()=> {navigate("/workspace/resources/")}}>Material<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="m7.875 14.25 1.214 1.942a2.25 2.25 0 0 0 1.908 1.058h2.006c.776 0 1.497-.4 1.908-1.058l1.214-1.942M2.41 9h4.636a2.25 2.25 0 0 1 1.872 1.002l.164.246a2.25 2.25 0 0 0 1.872 1.002h2.092a2.25 2.25 0 0 0 1.872-1.002l.164-.246A2.25 2.25 0 0 1 16.954 9h4.636M2.41 9a2.25 2.25 0 0 0-.16.832V12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 12V9.832c0-.287-.055-.57-.16-.832M2.41 9a2.25 2.25 0 0 1 .382-.632l3.285-3.832a2.25 2.25 0 0 1 1.708-.786h8.43c.657 0 1.281.287 1.709.786l3.284 3.832c.163.19.291.404.382.632M4.5 20.25h15A2.25 2.25 0 0 0 21.75 18v-2.625c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125V18a2.25 2.25 0 0 0 2.25 2.25Z" />
                                        </svg></button> </li>
                                    <li
                                    data-tooltip-content='Đăng xuất hoặc đăng nhập tại đây' data-tooltip-id='my-tooltip'  data-tooltip-place='right'
                                    > <Login/> </li>
                                </ul>
                            </div>
                  <div className='text-base  text-gray-700 capitalize'> { Object.keys(localStorage).includes('username') ? localStorage.getItem('username') : <Login/> }</div>

                </div>

                    
                    
                    
                </div>
            </div>

            <div className="flex flex-col">
                <div className='w-50 pl-2 ml-14 h-72 flex flex-col pt-24 relative animate-wiggle-more animate-infinite animate-duration-1000 animate-ease-in'> 

                    {/*
                    <img src='' alt='https://www.ilsc.com/hubfs/30yrs-Logo.svg' className='text-white w-40 h-40'/>
                    */}
                    <p className='font-extrabold text-blue-800 text-3xl uppercase z-20 hover:text-4xl duration-700'> bring your  Tommorow closer </p>
                    <p className='font-extrabold text-blue-800 text-2xl ml-10 z-20 hover:text-3xl duration-700'>"Enter to learn leave to achieve" </p>
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
                        dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        onClick={()=>{ localStorage.getItem('access') ?   navigate('/workspace/courses/1') : navigate('/login')}}>Language Test</button>
                        <button  onClick={()=>{scrollToPosition(7340)}} className="text-gray-900 bg-yellow-200 border-2 border-yellow-100 focus:outline-none
                        hover:bg-gray-100 focus:ring-4
                        focus:ring-gray-200 font-medium rounded-full text-sm pl-4 pr-2 py-2.5 me-2 mb-2
                        dark:bg-gray-800 dark:text-white dark:border-gray-600
                        dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Aplly now 
                        
                        </button>
                        </div>
                        

                    </div>
                    <div className='grid grid-cols-1 pb-2'>
                        <div className='h-10 w-full'></div>
                            <button type="button" onClick={()=>{scrollToPosition(7340)}} className="text-gray-900 bg-white border-2 border-blue-200 focus:outline-none
                        hover:bg-gray-100 focus:ring-4 hover:px-7 duration-200 hover:h-17
                        focus:ring-gray-200 font-medium rounded-full text-base px-5 py-2.5 me-2 h-14
                        dark:bg-gray-800 dark:text-white dark:border-gray-600
                        dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Liên hệ:   0345 578 573</button>
                            
                            {/* <div className='flex flex-row px-5'>
                                <svg className="w-6 h-6 text-yellow-100 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 20">
                                    <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z"/>
                                </svg>
                                
                                <span className=' ml-2 uppercase font-bold text-yellow-300 underline hover:no-underline'>
                                        Xem video
                                </span>
                            </div> */}
                    </div>
                </div>
            </div>
            

        </div>
    )
}