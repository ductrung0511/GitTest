import {  Link, NavLink } from "react-router-dom";
import { baseUrl } from "../../Share";
import {v4 as uuidv4} from 'uuid'

import 'daisyui/dist/full.css';
import React, { useEffect, useState } from "react";
import CreateSession from "./Create&UpdateSession";
import { useLocation, useNavigate } from "react-router-dom";
import CreateCourse from "./CreateCourse";
import { useRef } from "react";
import { Tooltip } from 'react-tooltip'
import { Disclosure } from '@headlessui/react'
export default function CourseComponentSpace(props){
    const [course, setCourse] = useState(props.course);
    const navigate = useNavigate();
    const location = useLocation();
    const [sessions, setSessions]  = useState(props.sessions);
    const { id, ...updatedCourseData } = course;
    //    ?ßlocalStorage.setItem('courseKey', data.courseKey);
    const coursePerm = useRef();
    
    coursePerm.current = false;
    
    let keys = localStorage.getItem('courseKey').split('/').filter((item) =>  item !== '');
    let locks = props.course.courseKey.split('/').filter((item) =>  item !== '');
    for(let lock of locks){
    for(let key of keys){
        if (lock === key)
        {
            coursePerm.current = true;
            console.log("match", key, coursePerm.current);
        }
    }
    }


    const addSession= (session) => {
        setSessions([...sessions, session]);
    }
    function updateCourse(updatedCourse) {
        setCourse(updatedCourse);
    }
    
    function handleDeleteSession (sessionID){
        async function fetchDelete(){
            try {
                const url = baseUrl + "api/session/" + sessionID;
                fetch(url, {
                    headers:{
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + localStorage.getItem('access'),
                    },
                    method:"DELETE"})
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to delete course');
                    }})
                const updated = sessions.filter(session => session.id != sessionID);
                setSessions(updated);
            } catch (error) {
                console.error('Error deleting session:', error);
            }
        }
        fetchDelete();
        
    }
    const relatedCategories = [
        {name: "Mẫu Giáo ", href: "/course"},
        {name: "Trung Học", href: "/course"},
        {name: "Thiếu Nhi", href: "/course"},
        {name: "IELTS & TOEIC", href: "/course"},]

    const [similarCourses, setSimilarCourses] = useState([])



    useEffect(() => {
        async function fetchData() {
            
            const url = baseUrl + "api/category/" + props.categoryID;
            console.log(url,"url");
          try {
            const response = await fetch(url, {
              headers:{
                  'Content-Type': 'application/json',
                  Authorization: 'Bearer ' + localStorage.getItem('access'),
          }
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
            console.log("Fetch panel",response.status,  data);
            setSimilarCourses(data);

          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
      
        fetchData();
        scrollToPosition(0);

        
         // Call the fetchData function when the component mounts
      }, []); 
    
    
    
    function textToParagraphs(text){
        if(text) return <React.Fragment>
            {text.split('\n').map((paragraph, index) => (

             <p key={index}>{paragraph}</p>
          ))}
          </React.Fragment>
        else return;
    }
    function textToListItems(text){
        if(text) return <React.Fragment>
            {text.split('\n').map((paragraph, index) => (

             <li key={index} className="flex flex-row mb-1">
                

                {paragraph}
                </li>
          ))}
          </React.Fragment>
        else return;
    }
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
    const [toast, setToast] = useState(false);
    const [courseSaveList, setCourseSaveList] = useState(localStorage.getItem('courseSave')? localStorage.getItem('courseSave').split('/'): '')

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
    const backgroundImageUrl = "https://tailwindcss.com/_next/static/media/installation.50c59fdd.jpg";
    const containerStyle = {
        backgroundImage: `url('${backgroundImageUrl}')`,
        // Add other styles as needed
    };
    const scrollToPosition = (position) => {
        console.log('scroll to ');
        window.scrollTo({
          top: position,
          behavior: 'smooth' // This gives a smooth scrolling effect
        });
      };
    const handleCopyText = async (text)=>{
    try {
        navigator.clipboard.writeText(text)
    }
    catch(error){
        console.log("error copy data", error)
    }
    };
    
    useEffect(()=>{
        console.log("Console panel", similarCourses, relatedCategories, sessions, coursePerm.current)
    },[similarCourses, relatedCategories, sessions])

    

    return(
        
            <div className="p-1 grid grid-cols-1 bg-color-vibrant/10 pl-1 mt-14">
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
                        
                        
                        {localStorage.getItem('exerciseLog') === '{}' &&
                             <div className=" fixed top-10 right-20 bg-yellow-200  rounded-lg z-100  w-48 ">

                                <Disclosure>
                                {({ open }) => (
                                    <>
                                    <Disclosure.Button className="flex  w-full justify-between bg-yellow-200 shadow-lg rounded-t-lg  px-4 py-2 text-left text-sm font-medium ">
                                        <div className=" text-xs font-medium">
                                            Mở ra để xem phần hướng dẫn thui📋!
                                        </div>
                                        
                                    </Disclosure.Button>
                                    <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500 rounded-b-lg bg-yellow-100">
                                        <p className="text-light text-xs text-black">
                                        Các phần hướng dẫn chức năng sẽ hiện lên khi bạn rê chuột lên các phần mô tả nên đừng ngần ngại khám phá nha!💭💭<br/> Phần hướng dẫn này sẽ biến mất sau khi bạn thực hiện một bài tập nào đó trong hệ thống!                        
                                        </p>
                                    </Disclosure.Panel>
                                    </>
                                )}
                                </Disclosure>
                                    {/* <input type="checkbox" /> 
                                    

                                    <div className="collapse-content"> 
                                        
                                    </div> */}
                            </div>
                          } 

                        <div className= {`w-full h-[49vh] my-3 rounded-2xl bg-${course.color}-200 grid grid-cols-7 overflow-hidden hover:shadow-lg  cursor-pointer duration-700 `}>
                            <div className="  relative bg-white col-span-3"> 
                                <img src={course.bgCardUrl} alt="bgIMG" className="object-cover h-full ">
                                </img>
                            </div>

                            {(localStorage.getItem('courseAuth').split('/').length<4 && localStorage.getItem('role') === 'Staff') && <Tooltip id="course-tooltip"/> }
                            
                            <div className="p-3 flex justify-between flex-col col-span-4">
                                <div>
                                    <p className=" text-xl font-bold" 
                                    data-tooltip-content = '🎓 Course Name'
                                    data-tooltip-id = 'course-tooltip' >  {course.name}</p>
                                    <p
                                    data-tooltip-content = '📘 Course Series '
                                    data-tooltip-id = 'course-tooltip'
                                    data-tooltip-place="left"
                                    className="text-sm font-extralight text-black text-left">{course.serial}-{course.id}</p>

                                    <p
                                    
                                    className=" text-base m-0 p-0">  Text Book:  <span className="font-semibold ">{course.textBook} </span></p>
                                    <p
                                    data-tooltip-content = '🏁 Course Conclusion'
                                    data-tooltip-id = 'course-tooltip'
                                    data-tooltip-place="bottom"

                                    className="text-xs mt-2 text-gray-800"> {course.conclusion}
                                    </p>
                                </div>
                                <div className="flex flex-row justify-between">
                                    <p className="text-xs font-light  text-color-secondary  m-0 p-0"> <span className="text-sm "> {course.duration}</span> sessions</p>
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
                        {localStorage.getItem('role') === "Administrator" &&  <CreateCourse addOrUpdateCourse={updateCourse} id={course.id} course={updatedCourseData}/>}
                        <div className="flex justify-center my-4">
                        <div className= {` py-2 px-10 w-3/4  rounded-xl shadow-lg  bg-${course.color}-100 grid grid-cols-2 text-white `}>
                            {/* <div className=" pl-2 col-span-2 text-left rounded-lg text-black"> 
                                <div className="flex flex-row justify-between">

                                        <p className="text-xl my-0 py-0  font-extrabold uppercase">
                                        {course.name}
                                        </p>
                                        <CourseSetting/>
                                </div>
                                <p className="text-sm mt-0 "> Unit 7 Chapter 8 </p>
                                


                            </div>
                            <p className="text-sm text-gray-800"> Course Code: <strong>{course.serial}-{course.id}</strong></p>
                            <p className="text-sm text-gray-800"> Program: <strong> {course.serial}</strong></p>
                            <p className="text-sm text-gray-800"> Classroom: <strong>312</strong></p>
                            <p className="text-sm text-gray-800"> Status: <strong>Active</strong></p>
                            <p className="text-sm text-gray-800"> Class Schedule: <strong>8:00 - 10:00</strong></p>
                            <p className="text-sm text-gray-800"> Text Book: <strong>{course.textBook}</strong></p>
                            <p className="text-sm text-gray-800"> Duration: <strong>{course.duration} sessions</strong></p>
                            <p className="text-sm text-gray-800 "> Campus: <strong>VGU</strong></p> */}
                            <div className="w-full flex flex-row gap-1 items-center">

                                <div className=" rounded-lg text-black w-1/2 py-2 h-8 bg-white flex flex-row justify-center items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                                    </svg>
                                    <button onClick={()=>{navigate('/workspace/dashboard/')}}>

                                    {localStorage.getItem('exerciseLog') === '{}' &&  <Tooltip id="tooltip-student" className="absolute z-40"/> }
                                    <p
                                    data-tooltip-content='Head to your dashboard and complete the exercises for this course! 📝🏁'
                                    data-tooltip-id="tooltip-student"
                                     className="font-bold text-md my-0">
                                        Take all Exercise
                                    </p>
                                    </button>

                                </div>
                                <div className=" rounded-lg w-1/2 py-2 flex flex-row justify-center items-center text-gray-400 hover:text-gray-800 duration-700">
                                    <button onClick={ ()=>{  scrollToPosition(400)}} className="hover:border-1 hover:border-gray-400 rounded-lg">

                                    <p className="font-semibold text-sm my-0 pb-1 ">
                                        Current Lesson 
                                    </p>
                                    </button>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 ml-1 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>


                                </div>
                            </div>
                            {/*
                            <div className="flex flex-row "> 
                                <div className={`radial-progress text-color-secondary-dark ml-7`} style={{"--value":80, "--size": "7rem"}} role="progressbar">80%</div>
                                <div className={`radial-progress text-color-accent mr-1 ml-4`} style={{"--value":70, "--size": "7rem"}} role="progressbar">70%</div>

                            </div>
                            */}

                            <div className="col-span-1 flex flex-row justify-start  my-3 ml-8 text-gray-400 gap-4"> 
                            
                                
                                
                                <Tooltip id="my-tooltip" />
                                <svg data-tooltip-id="my-tooltip"
                                data-tooltip-content={course.description}
                                data-tooltip-place="top" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                </svg>
                                
                                <button onClick={()=>{handleCopyText(baseUrl + '/workspace/courses/' + course.id)}} className=" rounded-xl ">

                                    <svg data-tooltip-id="my-tooltip"
                                data-tooltip-content="Copy the Link and share this lovely course to your friends"
                                data-tooltip-place="top" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                                    </svg>
                                </button>


                            </div>

                            


                        </div>
                        </div>

                        <div className="m-2 px-2 mt-2 rounded-xl  grid ">
                            
                            {sessions.map((session, index) => {
                                return (<div className="grid grid-cols-8 gap-1 rounded-lg drop-shadow-lg my-2 bg-gray-200" >
                                            <div className="col-span-1 p-3" >
                                                <Link to={ coursePerm.current ?  "/workspace/session/" + session.id : "#" }>
                                                <button  className=" text-3xl p-1 font-extrabold text-color-secondary rounded-full">{(index + 1)<10 ? "0" + (index + 1) : (index + 1)  }</button>
                                                </Link>
    
                                            </div>
                                            
                                            <div className="col-span-1  text-sm   flex flex-col items-center pt-10">
                                                
                                                <strong
                                                data-tooltip-content='🏆Session Level'
                                                data-tooltip-id="tooltip-student"
                                                > {session.level}</strong>
                                            </div>
                                            <div className="col-span-4 ml-5 ">
                                                
                                                <p
                                                data-tooltip-content='📜Session Overview'
                                                data-tooltip-id="tooltip-student"
                                                 className="text-xl font-extrabold text-color-secondary mt-2 mb-0">{session.overview}</p>
                                                <p
                                                data-tooltip-content=' 🎯Session Topics'
                                                data-tooltip-id="tooltip-student"
                                                data-tooltip-place="bottom"
                                                className="text-xs  text-color-secondary">{session.topics}</p>
                                            </div>
                                            <button className=" rounded-full ">
                                                <Link to={ (coursePerm.current || localStorage.getItem('role')=== 'Administrator') ?  "/workspace/session/" + session.id : "#" }>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10 mr-1 text-color-accent/70">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                                                    </svg>
                                                </Link>
                                            </button>
                                            
                                            {localStorage.getItem('role') === "Administrator" &&
                                            <button onClick={() => {handleDeleteSession(session.id)}} className=" rounded-lg bg-gray-300 p-1 m-4 mt-4 border-color-primary-dark">Delete</button>
                                             }
                                             <Tooltip id='tooltip-session'/>
                                             { (localStorage.getItem('role') !== "Administrator" && coursePerm.current) && 
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" mt-10 w-6 h-6" data-tooltip-content='📋Khóa học đã được mở'
                                                data-tooltip-id="tooltip-session"
                                                data-tooltip-place="bottom">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                                                </svg>
                                             }
                                             { (localStorage.getItem('role') !== "Administrator" && !coursePerm.current) && 
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" mt-10 w-6 h-6" data-tooltip-content='📋Khóa học chưa được đăng kí'
                                                data-tooltip-id="tooltip-session"
                                                data-tooltip-place="bottom">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                                              </svg>
                                              
                                             }
                                            {/*
                                            <p className="col-span-1 uppercase text-sm pt-3"> • {session.teacher}</p>
                                            */}
                                        </div>)
                                        
                                    
                                })}
                               
                                {localStorage.getItem('role') === "Administrator" &&   <CreateSession addOrUpdateSession={addSession} courseID={props.id}/>}
                                
                            
                        </div>
                        <p className="text-sm my-4 font-extralight text-gray-200 text-left border-1 "> </p> 

                        <div className="flex flex-row justify-center gap-2">
                            <div className="rounded-xl p-7  w-40 bg-white text-center shadow-lg text-sm"> <p className="text-2xl p-0 m-0 font-bold">{course.duration * 1.5}</p> Tổng số Giờ Học</div>
                            <div className="rounded-xl p-7 w-40 bg-white text-center shadow-lg text-sm"> <p className="text-2xl font-bold p-0 m-0">{course.totalExercise} </p>Tổng số Bài Tập</div>
                            {/* <div className="rounded-xl p-7 w-40 bg-white shadow-lg relative">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 top-10 left-14 absolute ">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                            </svg> 
                            </div> */}
                        </div>
                        <p className="text-sm my-4 font-extralight text-gray-200 text-left border-1 "> </p> 
                        <div className=" bg-white shadow-lg ml-7 mr-7 px-4  py-4 overflow-y-auto  h-[100vh] border-transparent   rounded-lg">
                            
                            <p className="font-bold text-base text-black">Đôi Chút Về Khóa Học</p>
                            <p className="text-xs">{textToParagraphs(course.description)}</p>
                            <p className="text-xs" >In this class you'll learn:</p>
                            <ul className="text-xs">
                                {textToListItems(course.result)}
                            </ul>
                            <p className="text-xs"> {textToParagraphs(course.conclusion)}</p>
                            <div className="flex flex-row">
                                { (coursePerm.current || localStorage.getItem('role')=== 'Administrator') && 
                                <div>
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    {/* Excluding unused groups (SVGRepo_bgCarrier and SVGRepo_tracerCarrier) */}
                                    <g id="SVGRepo_iconCarrier">
                                        <path
                                        opacity="0.5"
                                        d="M2 16C2 13.1716 2 11.7574 2.87868 10.8787C3.75736 10 5.17157 10 8 10H16C18.8284 10 20.2426 10 21.1213 10.8787C22 11.7574 22 13.1716 22 16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H8C5.17157 22 3.75736 22 2.87868 21.1213C2 20.2426 2 18.8284 2 16Z"
                                        fill="#1C274C"
                                        />
                                        <path d="M12 18C13.1046 18 14 17.1046 14 16C14 14.8954 13.1046 14 12 14C10.8954 14 10 14.8954 10 16C10 17.1046 10.8954 18 12 18Z" fill="#1C274C" />
                                        <path
                                        d="M6.75 8C6.75 5.10051 9.10051 2.75 12 2.75C14.4453 2.75 16.5018 4.42242 17.0846 6.68694C17.1879 7.08808 17.5968 7.32957 17.9979 7.22633C18.3991 7.12308 18.6405 6.7142 18.5373 6.31306C17.788 3.4019 15.1463 1.25 12 1.25C8.27208 1.25 5.25 4.27208 5.25 8V10.0546C5.68651 10.022 6.18264 10.0089 6.75 10.0036V8Z"
                                        fill="#1C274C"
                                        />
                                    </g>
                                    </svg>

                                </div>
                                
                                
                                }
                                
                            </div>
                        </div>
                        <p className="text-sm my-4 font-extralight text-gray-200 text-left border-1 "> </p> 
                        









                        
                        <p className="text-sm my-4 font-extralight mx-7 text-gray-200 text-left border-1 "> </p> 
                        <div className="ml-7 px-5">
                            <p className="font-bold text-xl text-black">Related Categories</p>
                            <div className="flex flex-row gap-1">
                                {relatedCategories.map((category, index)=>{
                                    return <NavLink key={category.name} className=" no-underline" to={category.href}>
                                         <div className="border-1 border-gray-400 text-black font-bold text-sm rounded-md p-2">

                                         {category.name} 
                                         </div>
                                    </NavLink>
                                })}

                            </div>
                        </div>   

                        <p className="text-sm my-4  mx-7 font-extralight text-gray-200 text-left border-1 "> </p> 
                        <div className="ml-7 px-5">
                            <p className="font-bold text-xl text-black">Các Khóa Học Tương Tự</p>
                            <div className='grid grid-cols-3 gap-1'>
                                {similarCourses?.map((course) => {
                                        if(course !== undefined) return (
                                            <div key={course.name} className="col-span-1 shadow-md shadow-white flex flex-col mx-2  bg-white   h-[60vh] mt-2 mb-20 rounded-lg  ">
                                                <NavLink to={'/workspace/courses/' + course.id} className='no-underline  h-3/4'>
                                                
                                                    <div className=" relative flex flex-row gap-1 overflow-hidden">
                                                        <img className="peer h-[40vh] w-full rounded-lg object-cover " src={course.bgCardUrl} />
                                                
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
                            <div className="flex justify-center">
                                <Link to={"/course"} className="no-underline">
                                    <button className="rounded-lg px-4 h-7 text-xs  border-black border-1 text-black font-bold"> Xem tất cả </button>
                                </Link>
                            </div>
                        </div>
                        <p className="text-sm my-4  mx-7 font-extralight text-gray-200 text-left border-1 "> </p> 
                        




                    </div>
    )
}
// + "/session/" + session.id