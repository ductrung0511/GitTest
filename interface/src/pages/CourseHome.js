
import Contact from "../components/StaticComponent/Contact";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Footer from "../components/StaticComponent/Footer";
import FrequentlyAsked from "../components/StaticComponent/FrequentlyAsked";
import { baseUrl } from "../Share";
import { useLocation } from "react-router-dom";
import { useRef, useState } from "react";
import {v4 as uuidv4} from 'uuid';
import { useEffect } from "react";
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import ToastComponent from "../components/Features/Toast";
import { Tooltip } from "react-tooltip";


export default function CourseHome()
{
    const [courseCategories, setCourseCategories] = useState({});
    const location = useLocation();
    const navigate= useNavigate();
    const [categories, setCategories] = useState();
    const featureCourse = useRef();
    const [courseSaveList, setCourseSaveList] = useState(localStorage.getItem('courseSave')? localStorage.getItem('courseSave').split('/'): '')
    const [features, setFeatures] = useState([]);
    const [populars, setPopulars] = useState([]);
    const [toast, setToast] = useState(false);

    const scrollToPosition = (position) => {
        window.scrollTo({
          top: position,
          behavior: 'smooth' // This gives a smooth scrolling effect
        });
      };

    useEffect(() => {
        async function fetchData() {
          const url =  baseUrl + "api/index/";
          try {
            const response = await fetch(url);
            if(response.status === 404) alert('source not found: ' + baseUrl);
            else if (!response.ok) {
              console.error("Something went wrong");
              return;
            }
            const data = await response.json();
            setCourseCategories(data.courseCategories);
            let cats = [ {name: "All Courses", href: "/course"},  {name: "", href: "/"} ];
            let featureCourses = [];
            let popularCourses = [];
            if(data) {
                featureCourse.current = data.courseCategories['IELTS & TOEIC'][0];
                

                for(let key of Object.keys(data.courseCategories)){
                    cats.push({name: key, href: '/course/' + key + '/'});
                    featureCourses.push(data.courseCategories[key][0])
                    popularCourses.push(data.courseCategories[key][1])
                }
                console.log(featureCourses, popularCourses, cats , 'feature & popular');
                // features.current = featureCourses;
                setPopulars(popularCourses);
                setCategories(cats);
                setFeatures(featureCourses);

            }
            
            
            console.log("Fetch panel", data.courseCategories);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        } 
      
        fetchData();
        scrollToPosition(0);
      }, []);

    const handleSaveCourse =(courseID) =>{
        const putData = {courseSave:  localStorage.getItem("courseSave")  + courseID    + '/' }  ;
        const url = baseUrl + "api/profile/";
        async function updateCourseSave() {
            try {
              const response = await fetch(url, {
                method: 'PUT',
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('access'),
                },
                body: JSON.stringify(putData),
            });
              if(response.status === 404) console.log("Not found");
              if(response.status === 401) 
              {
                navigate("/login",{
                state:{ previousUrl : location.pathname,}
              });
              
            }
              else if (!response.ok) {
                console.error("Something went wrong");
                return;
              }
                const data = await response.json();   
                localStorage.setItem('courseSave',  data.courseSave );
                setCourseSaveList(localStorage.getItem('courseSave').split('/'))
                // console.log("Fetch Put Panel ",url , putData  , response.status, data , "courseSave:" , data.courseSave , localStorage.getItem('courseSave' )  );
                
            } catch (error) {
                console.error("Error adding data:", error);
            }
            
        }
      
         updateCourseSave();
         setToast(true);

         // Set a timeout to hide the toast after 4 seconds
         setTimeout(() => {
           setToast(false);
         }, 4000);

    }
    const handleUnSaveCourse =(courseID) =>{
        
        let newList = '/';
        for(let item of courseSaveList){
            if(item != courseID && item != ''){
                newList += item;
                newList += '/';
            }
        }

        const putData = {courseSave: newList };
        const url = baseUrl + "api/profile/";

        async function updateCourseSave() {
            try {
              const response = await fetch(url, {
                method: 'PUT',
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('access'),
                },
                body: JSON.stringify(putData),
            });
              if(response.status === 404) console.log("Not found");
              if(response.status === 401) 
              {
                navigate("/login",{
                state:{ previousUrl : location.pathname,}
              });
              
            }
              else if (!response.ok) {
                console.error("Something went wrong");
                return;
              }
                const data = await response.json();   
                localStorage.setItem('courseSave',  data.courseSave );
                setCourseSaveList(localStorage.getItem('courseSave').split('/'))
                console.log("Fetch Put (unSave) Panel ", url , putData  , response.status, data , "courseSave:" , localStorage.getItem('courseSave'), 'deleted:', courseID  );
                
            } catch (error) {
                console.error("Error adding data:", error);
            }
            
        }
        updateCourseSave();
        

    }

    const handleCopyText = async (text)=>{
        try {
          navigator.clipboard.writeText(text)
        }
        catch(error){
          console.log("error copy data", error)
        }
      };
    

    return(
        <section className="">
            {toast && <div id="toast-default" className="flex flex-col gap-2 z-30 shadow-xl fixed bottom-3 right-3 items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg  dark:text-gray-400 dark:bg-gray-800" role="alert">
                            <div className="ms-3 text-sm  font-semibold text-black uppercase "> Course has been saved to </div>
                            <div className="flex flex-row shadow-lg  justify-between items-center px-6 hover:bg-gray-400  duration-700 w-full h-10 text-black bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-blue-200">
                                <div className="ms-3 text-sm  font-light text-black  "> My Classes  </div>
                                <svg className="w-4 h-4" aria-hidden="true" xmflns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.147 15.085a7.159 7.159 0 0 1-6.189 3.307A6.713 6.713 0 0 1 3.1 15.444c-2.679-4.513.287-8.737.888-9.548A4.373 4.373 0 0 0 5 1.608c1.287.953 6.445 3.218 5.537 10.5 1.5-1.122 2.706-3.01 2.853-6.14 1.433 1.049 3.993 5.395 1.757 9.117Z"/>
                                </svg>
                            </div>
                            <div className="text-gray-800 w-full border-solid border-gray-800 border-1"></div>
                            <button type="button" onClick={() => {setToast(false)}} className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-default" aria-label="Close">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                            </button>
                        </div>
            }

            

            
            <div className="grid grid-cols-8  bg-color-vibrant bg-opacity-20 pt-28" id="BASE">
                <Tooltip id="my-tooltip" className="absolute z-50"/>
                <div id="LEFT SIDE BAR/ CATEGORIES" className="col-span-2 px-3">
                    <div className=" w-full h-full flex flex-col items-center  max-w-7xl px-2 rounded-xl  border-0  pt-2">
                        
                        {categories?.map((item, index) => (
                                <NavLink
                                key={item.name}
                                to={item.href}
                                {...(item.name === 'All Courses' 
                                ? {
                                    'data-tooltip-id': 'my-tooltip',
                                    'data-tooltip-content': '🗂️ This is where you\'ll find an overview of all course categories.',
                                    'data-tooltip-place': 'top'
                                }
                                : {})}
                                {...(item.name !== 'All Courses' 
                                ? {
                                    'data-tooltip-id': 'my-tooltip',
                                    'data-tooltip-content': '🚧 🚧 This is where the categories of courses will be displayed in detail (functionality is currently in development).',
                                    'data-tooltip-place': 'top',
                                }
                                : {})}


                                className={({ isActive }) => {
                                    if( item.name  === "All Courses" & isActive )
                                    return 'no-underline px-4 py-2 w-4/5 mb-2 h-10 rounded-md text-sm font-bold capitalize bg-color-secondary/90 text-white'
                                    else if( item.name  === "All Courses" & !isActive )
                                    return 'no-underline px-4 py-2 w-4/5 mb-2 h-10 rounded-md text-sm font-bold capitalize' + "text-color-secondary";
                                    else if(item.name === "") return 'border-1 border-black w-full my-4'

                                    else return 'no-underline px-4 py-2 w-4/5 mb-2 h-10 rounded-md text-sm font-bold capitalize' + (!isActive ?
                                    ' font-semibold  text-color-secondary' : ' bg-color-secondary/90 text-white ')
                                }}
                                >
                                {item.name}
                                </NavLink>

                            ))}
                        
                        
                    </div>
                    
                </div>
                <div className="col-span-6 px-2" id="COURSETABLE">
                    <div className="w-full h-[43vh] bg-no-repeat bg-cover px-6 bg-blue-400 rounded-2xl relative "
                        style={{
                            backgroundImage: `url('${"https://st3.depositphotos.com/1026266/14315/i/450/depositphotos_143152577-stock-photo-office-desk-closeup-with-white.jpg"}')`,
                        }}
                        >
                            <div className="absolute top-10 left-10 ">  
                            <p className=" text-3xl font-extrabold">  Online Classes </p>
                            <p className=" text-sm font-bold"> Find what fascinates you as you explore these online classes.</p>
                            <p className=" text-xs font-light"> Contact your Teacher for access to your course</p>
                            <button data-tooltip-id="my-tooltip" data-tooltip-content=" 🔍 🖥️ This will direct you to the workspace page where you can search for your courses." className="rounded-lg font-bold text-black bg-green-600 text-xl p-2" onClick={() => { localStorage.getItem('access')? navigate('/workspace/performance/') : navigate('/login/')}} > Start  Now </button>

                            </div>
                    </div>
                    <div className="border-1 border-gray-200 w-full my-4"> </div>
                    

                    {featureCourse.current && 
                    <div className="w-full h-[43vh]  shadow-md rounded-2xl bg-white grid grid-cols-2 overflow-hidden hover:shadow-lg  cursor-pointer duration-700">
                            <div className="  relative bg-white  overflow-hidden"> 
                                <NavLink to={'/workspace/courses/' + featureCourse.current.id} className='no-underline '>

                                    <img src={featureCourse.current.bgCardUrl} alt="" className="object-fill ">
                                    </img>
                                    <div className="rounded-3xl bg-green-400 font-semibold border-1  border-black text-black absolute bottom-7 left-7 px-2"> New</div>
                                </NavLink>
                            </div>
                            <div className="p-3 flex justify-between flex-col relative">
                                <div>
                                    <div className=" flex flex-row justify-between"> 
                                        <p className=" text-xl font-bold">{featureCourse.current.name}</p>
                                        <Menu as="div" className="relative inline-block text-left  top-2">
                                            <div>
                                                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-full hover:bg-white hover:bg-opacity-30 p-2 text-sm font-semibold text-gray-900 shadow-sm  ">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                                                </svg>
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
                                                <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md   bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <div className="py-1  flex flex-col justify-center rounded-full">
                                                    <Menu.Item> 
                                                    
                                                    <button onClick={ () => (handleCopyText(baseUrl + 'workspace/courses/' + featureCourse.current.id ))} className=" hover:bg-gray-100 p-2 text-sm ">
                                                        Copy Link
                                                    </button>
                                                    
                                                    </Menu.Item>
                                                    
                                                </div>
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    </div>
                                    <p className=" text-sm font-semibold mb-1 p-0" > {featureCourse.current.textBook} </p>
                                    <p className=" text-sm font-light m-0 p-0">{featureCourse.current.conclusion}</p>
                                </div>
                                <div className="flex flex-row justify-between">
                                    <p className="text-xs font-light  text-color-secondary  m-0 p-0">{featureCourse.current.duration} sessions</p>
                                    {courseSaveList.includes('' + featureCourse.current.id) ?
                                                        
                                        <button className=" text-black font-light  rounded-lg" onClick={()=>{handleUnSaveCourse(featureCourse.current.id)}}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                            <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM20.25 5.507v11.561L5.853 2.671c.15-.043.306-.075.467-.094a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93ZM3.75 21V6.932l14.063 14.063L12 18.088l-7.165 3.583A.75.75 0 0 1 3.75 21Z" />
                                            </svg>

                                        </button>:
                                        <button className=" text-black font-light  rounded-lg" onClick={()=>{handleSaveCourse(featureCourse.current.id)}}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6  `}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                                            </svg>
                                        </button>
                                    }

                                </div>
                                
                            </div>                     
                    </div>
                    }

                    <div id="FEATURED CLASSES">
                        <h2 className="text-black font-bold text-2xl capitalize mt-7"> Featured Classes </h2>
                        <div className='grid grid-cols-3 gap-1'>
                            {
                                
                                features?.map((course) => { 
                                    if(course !== undefined) return (
                                    <div key={uuidv4()} className="col-span-1 shadow-md shadow-white flex flex-col mx-2  bg-white   h-[60vh] mt-2 mb-20 rounded-lg  ">
                                        <NavLink to={'/workspace/' + course.name} className='no-underline  h-3/4'>
                                        
                                            <div className=" relative flex flex-row gap-1 overflow-hidden">
                                                <img className="peer h-[40vh] w-full rounded-lg object-cover " src={course.bgCardUrl} />
                                                <span className="absolute top-1 left-1 m-2 rounded-full bg-white/70 px-2 text-center text-xs font-medium text-gray-800">{course.sale}% OFF</span>
                                        
                                            </div>
                                        </NavLink>
                                            <div className="flex flex-col px-2 pt-0 ">
                                                <div className="flex flex-row justify-between">
                                                <p className="text-xs font-light  text-color-secondary  m-0 p-0"> {course.totalStudent} 188 students</p>
                                                <p className="text-xs font-light  text-color-secondary  m-0 p-0"> {course.duration} 100m</p>
                                                </div>
                                                <div className="text-xs mb-3 text-center rounded-lg font-extrabold hover:bg-blue-300/10 text-color-secondary  capitalize">
                                                    {course.name}</div>
                                                
                                                <div className="flex flex-row justify-between">
                                                    <p className="text-xs font-light  text-color-secondary  m-0 p-0"> {course.textBook} Oxford destination</p>
                                                    {courseSaveList.includes('' + course.id) ?
                                                        
                                                        <button className=" text-black font-light  rounded-lg" onClick={()=>{handleUnSaveCourse(course.id)}}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                            <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM20.25 5.507v11.561L5.853 2.671c.15-.043.306-.075.467-.094a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93ZM3.75 21V6.932l14.063 14.063L12 18.088l-7.165 3.583A.75.75 0 0 1 3.75 21Z" />
                                                            </svg>

                                                        </button>:
                                                        <button className=" text-black font-light  rounded-lg" onClick={()=>{handleSaveCourse(course.id)}}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6  `}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                                                            </svg>
                                                        </button>
                                                        }
                                                </div>

                                            </div>
                                    </div>
                                        
                                    );
                                })
                            }
                        </div>
                    </div>
                    <div id="POPULAR COURSES">
                        <div className="flex flex-row justify-between mb-2"> 

                            <h2 className="text-black font-bold text-2xl capitalize"> Popular Classes </h2>
                        </div>
                        <div className='grid grid-cols-3 gap-1'>
                            {populars?.map((course) => {
                                    if(course !== undefined) return (
                                        <div key={uuidv4()} className="col-span-1 shadow-md shadow-white flex flex-col mx-2  bg-white   h-[60vh] mt-2 mb-20 rounded-lg  ">
                                            <NavLink to={'/workspace/' + course.name} className='no-underline  h-3/4'>
                                            
                                                <div className=" relative flex flex-row gap-1 overflow-hidden">
                                                    <img className="peer h-[40vh] w-full rounded-lg object-cover " src={course.bgCardUrl} />
                                                    <span className="absolute top-1 left-1 m-2 rounded-full bg-white/70 px-2 text-center text-xs font-medium text-gray-800">{course.sale}% OFF</span>
                                            
                                                </div>
                                            </NavLink>
                                                <div className="flex flex-col px-2 pt-0 ">
                                                    <div className="flex flex-row justify-between">
                                                    <p className="text-xs font-light  text-color-secondary  m-0 p-0"> {course.totalStudent} 188 students</p>
                                                    <p className="text-xs font-light  text-color-secondary  m-0 p-0"> {course.duration} 100m</p>
                                                    </div>
                                                    <div className="text-xs mb-3 text-center rounded-lg font-extrabold hover:bg-blue-300/10 text-color-secondary  capitalize">
                                                        {course.name}</div>
                                                    
                                                    <div className="flex flex-row justify-between">
                                                        <p className="text-xs font-light  text-color-secondary  m-0 p-0"> {course.textBook} Oxford destination</p>
                                                        {courseSaveList.includes('' + course.id) ?
                                                            
                                                            <button className=" text-black font-light  rounded-lg" onClick={()=>{handleUnSaveCourse(course.id)}}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                                <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM20.25 5.507v11.561L5.853 2.671c.15-.043.306-.075.467-.094a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93ZM3.75 21V6.932l14.063 14.063L12 18.088l-7.165 3.583A.75.75 0 0 1 3.75 21Z" />
                                                                </svg>
    
                                                            </button>:
                                                            <button className=" text-black font-light  rounded-lg" onClick={()=>{handleSaveCourse(course.id)}}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6  `}>
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                                                                </svg>
                                                            </button>
                                                            }
                                                    </div>
    
                                                </div>
                                        </div>
                                            
                                        );
                                })}
                        </div>
                    </div>
                    {Object?.keys(courseCategories).map( (category) => {
                        
                        return(
                        <div id="EACH CATEGORY" key={uuidv4()}>
                            <div className="flex flex-row justify-between mb-2"> 
    
                                <h2 className="text-black font-bold text-2xl capitalize">{category}</h2>
                                <button className="rounded-lg px-4 text-xs  border-black border-1 text-black font-bold" onClick={()=> {navigate('/course/' + category + '/')}}> View All </button>
                            </div>
                            <div className='grid grid-cols-3 gap-1'>
                                {courseCategories[category].map((course) => {
                                        return (
                                            <div key={uuidv4()} className="col-span-1 shadow-md shadow-white flex flex-col mx-2  bg-white   h-[60vh] mt-2 mb-20 rounded-lg  ">
                                            <NavLink to={'/workspace/' + course.name} className='no-underline  h-3/4'>
                                            
                                                <div className=" relative flex flex-row gap-1 overflow-hidden">
                                                    <img className="peer h-[40vh] w-full rounded-lg object-cover " src={course.bgCardUrl} />
                                                    <span className="absolute top-1 left-1 m-2 rounded-full bg-white/70 px-2 text-center text-xs font-medium text-gray-800">{course.sale}% OFF</span>
                                            
                                                </div>
                                            </NavLink>
                                                <div className="flex flex-col px-2 pt-0 ">
                                                    <div className="flex flex-row justify-between">
                                                    <p className="text-xs font-light  text-color-secondary  m-0 p-0"> {course.totalStudent} 188 students</p>
                                                    <p className="text-xs font-light  text-color-secondary  m-0 p-0"> {course.duration} 100m</p>
                                                    </div>
                                                    <div className="text-xs mb-3 text-center rounded-lg font-extrabold hover:bg-blue-300/10 text-color-secondary  capitalize">
                                                        {course.name}</div>
                                                    
                                                    <div className="flex flex-row justify-between">
                                                        <p className="text-xs font-light  text-color-secondary  m-0 p-0"> {course.textBook} Oxford destination</p>
                                                        {courseSaveList.includes('' + course.id) ?
                                                            
                                                            <button className=" text-black font-light  rounded-lg" onClick={()=>{handleUnSaveCourse(course.id)}}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                                <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM20.25 5.507v11.561L5.853 2.671c.15-.043.306-.075.467-.094a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93ZM3.75 21V6.932l14.063 14.063L12 18.088l-7.165 3.583A.75.75 0 0 1 3.75 21Z" />
                                                                </svg>
    
                                                            </button>:
                                                            <button className=" text-black font-light  rounded-lg" onClick={()=>{handleSaveCourse(course.id)}}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6  `}>
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                                                                </svg>
                                                            </button>
                                                            }
                                                    </div>
    
                                                </div>
                                        </div>
                                            
                                        );
                                    })}
                            </div>
                        </div>
                        )




                    })
                    
                    
                    }
                    <div >
                        <h2 className="text-black font-bold text-3xl capitalize"> Explore Your Knowledge </h2>
                        <p  className=" text-sm pr-4"> 
                        Take the next step on your creative journey with the NZEC Language Center. With our diverse range of classes, you can delve into various language topics, tools, and techniques. Whether you're interested in improving your language proficiency, mastering communication skills, or exploring cultural nuances, we offer classes tailored to your needs. Whether you're a beginner or an experienced learner, you can enhance your skills with courses in grammar, vocabulary expansion, conversation practice, and more. Immerse yourself in our virtual classrooms, where you can learn from experienced instructors and interact with fellow language enthusiasts. From mastering new language software to honing your speaking and writing abilities, the NZEC Language Center is your gateway to linguistic excellence. Start your language journey today and unlock a world of opportunities!
                        </p>
                    </div>
                    <FrequentlyAsked/>
                    <Contact/>
                    {/* <div id="toast-default" className="flex fixed bottom-2 right-2 items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
                        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-blue-200">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.147 15.085a7.159 7.159 0 0 1-6.189 3.307A6.713 6.713 0 0 1 3.1 15.444c-2.679-4.513.287-8.737.888-9.548A4.373 4.373 0 0 0 5 1.608c1.287.953 6.445 3.218 5.537 10.5 1.5-1.122 2.706-3.01 2.853-6.14 1.433 1.049 3.993 5.395 1.757 9.117Z"/>
                            </svg>
                            <span className="sr-only">Fire icon</span>
                        </div>
                        <div className="ms-3 text-sm font-normal">Set yourself free.</div>
                        <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-default" aria-label="Close">
                            <span className="sr-only">Close</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                        </button>
                    </div> */}
                    
                    

                </div>
                
                
            </div>
            <Footer/>
            



        </section>




    )
}

/*
                <div className=" col-span-2 flex flex-col gap-4" id="RIGHT BAR">
                    <div id="CATEGORIES" className="px-4">
                        <h4 className="text-gray-600 font-bold capitalize"> Categories</h4>
                        <CourseCategories/> 
                                        
                    </div>
                    <div id="POPULAR Course" className="px-4">
                        <h4 className="text-gray-600 font-bold capitalize"> popular courses</h4>
                        <PopularCourses/>
                        
                    </div>
                    
                    

                </div>
                */