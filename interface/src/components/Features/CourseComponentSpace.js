import {  Link, NavLink } from "react-router-dom";
import { baseUrl } from "../../Share";
import useFetch from "../hook/useFetch";

import 'daisyui/dist/full.css';
import React, { useEffect, useState } from "react";
import CourseSetting from "./CourseSetting";
import CreateSession from "./Create&UpdateSession";
import { useLocation, useNavigate } from "react-router-dom";
import CreateCourse from "./CreateCourse";
import { useRef } from "react";
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
        if (lock === key){
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
        {name: "mẫu giáo ", href: "/course"},
        {name: "Trung học", href: "/course"},
        {name: "cao học", href: "/course"},
        {name: "IELTS", href: "/course"},]
    const courseAbout = " Enter the realm of Runway and AI-driven storytelling! Animated images have been one of the fastest growing fields in AI.\n With step-by-step instruction and hands-on exercises, you'll how to use AI to generate a story, create the images, and animate it. \n This course is designed to walk you through everything you need to know to begin your journey with Runway. These lessons are fit for artists and creatives of all levels, from those who are just getting started to those who want to experiment with AI animation. ";
    const courseResult = " How to animate images with Runway to bring stories to life \n Crafting compelling narratives through ChatGPT \n The variety of animation styles you can achieve with Runway \n The workflow of creating images on Midjourney \n Using AI to organize your entire creative process";
    const courseConclusion = "This is your chance to be at the forefront of AI-driven animation and storytelling with this AI Animation course. You'll receive all the support and inspiration you need as we explore the vast possibilities of AI-enhanced storytelling together. I'm thrilled to guide you through this exciting course – let's begin your adventure in animation with Runway!";
    
    const similarCourses = useRef()


    // useEffect(()=>{
    //     const url = baseUrl + "api/category/" + props.categoryID; 
    //     console.log(url, "url");
    //     fetch(url,{
    //         method:"GET",
    //         headers:{
    //             'Content-Type': 'application/json',
    //             Authorization: "Bearer" + localStorage.getItem('access') 
    //         },
            
    //     }).then((response) => {
    //         console.log(response.status, "status")
            
    //         if(response.status === 401) 
    //         {
    //           navigate("/login",{
    //           state:{ previousUrl : location.pathname,}
    //         })}
    //     }).then((data) => {
    //         console.log(data, "data recieved");
    //     })
    //     .catch(error => {
    //       console.error('Error: ', error);
    //       // Handle error appropriately (e.g., show error message to user)
    //     });

    // },[])
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
            similarCourses.current= data;

          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
      
        fetchData();
        
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
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                </svg>

                {paragraph}
                </li>
          ))}
          </React.Fragment>
        else return;

    }
    const backgroundImageUrl = "https://tailwindcss.com/_next/static/media/installation.50c59fdd.jpg";
    const containerStyle = {
        backgroundImage: `url('${backgroundImageUrl}')`,
        // Add other styles as needed
    };
    useEffect(()=>{
        console.log("Console panel", similarCourses, relatedCategories, sessions, coursePerm.current)
    },[similarCourses, relatedCategories, sessions])
    return(
        
            <div className="p-1 grid grid-cols-1 bg-color-vibrant/10 pl-1 ">
                        {/*
                        <p className="text-sm mt-1 font-extrabold text-black text-left"> General Infomation</p>
                        */}
                        <div className= {`w-full h-[49vh] my-3 rounded-2xl bg-${course.color}-200 grid grid-cols-7 overflow-hidden hover:shadow-lg  cursor-pointer duration-700 `}>
                            <div className="  relative bg-blue-400 col-span-3"> 
                                <img src={course.bgCardUrl} alt="bgIMG" className="object-cover ">
                                </img>
                            </div>
                            <div className="p-3 flex justify-between flex-col col-span-4">
                                <div>
                                    <p className=" text-xl font-bold">  {course.name}</p>
                                    <p className="text-sm font-extralight text-black text-left">{course.serial}-{course.id}</p>

                                    <p className=" text-base m-0 p-0">  Text Book:  <span className="font-semibold ">{course.textBook} </span></p>
                                    <p className=" text-xs font-light m-0 p-0"> 288 students</p>

                                </div>
                                <div className="flex flex-row justify-between">
                                    <p className="text-xs font-light  text-color-secondary  m-0 p-0">{course.duration} sessions</p>
                                    <button className="bg-white text-black font-light">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 bg-gray-300">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>                     
                        </div>
                        {localStorage.getItem('role') === "Administrator" &&  <CreateCourse addOrUpdateCourse={updateCourse} id={course.id} course={updatedCourseData}/>}
                        <div className="flex justify-center">
                        <div className= {`pt-4 py-2 px-10 w-3/4  rounded-xl shadow-lg  bg-${course.color}-100 grid grid-cols-2 text-white `}>
                            <div className=" pl-2 col-span-2 text-left rounded-lg text-black"> 
                                <div className="flex flex-row justify-between">

                                        <p className="text-xl my-0 py-0  font-extrabold uppercase">
                                        {course.name}
                                        </p>
                                        <CourseSetting/>
                                </div>
                                <p className="text-sm mt-0 "> Unit 7 Chapter 8 </p>
                                <p className="text-sm mt-0 "> {course.conclusion}
                                </p>


                            </div>
                            <p className="text-sm text-gray-800"> Course Code: <strong>{course.serial}-{course.id}</strong></p>
                            <p className="text-sm text-gray-800"> Program: <strong> {course.serial}</strong></p>
                            <p className="text-sm text-gray-800"> Classroom: <strong>312</strong></p>
                            <p className="text-sm text-gray-800"> Status: <strong>Active</strong></p>
                            <p className="text-sm text-gray-800"> Class Schedule: <strong>8:00 - 10:00</strong></p>
                            <p className="text-sm text-gray-800"> Text Book: <strong>{course.textBook}</strong></p>
                            <p className="text-sm text-gray-800"> Duration: <strong>{course.duration} sessions</strong></p>
                            <p className="text-sm text-gray-800 "> Campus: <strong>VGU</strong></p>
                            <div className="w-full flex flex-row gap-1 items-center">

                            <div className=" rounded-lg text-black w-1/2 py-2 h-8 bg-white flex flex-row justify-center items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                                </svg>
                                <p className="font-bold text-md my-0">
                                    Take all Exercise
                                </p>

                            </div>
                            <div className=" rounded-lg w-1/2 py-2 flex flex-row justify-center items-center text-gray-400">
                                
                                <p className="font-semibold text-sm my-0 pb-1">
                                    Current Lesson 
                                </p>
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
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                                </svg>


                            </div>

                            


                        </div>
                        </div>

                        <p className="text-sm my-4 font-extralight text-gray-200 text-left border-1 "> </p> 
                        <div className="flex flex-row justify-center gap-2">
                            <div className="rounded-xl p-7  w-40 bg-white text-center shadow-lg text-sm"> <p className="text-2xl p-0 m-0 font-bold">{course.duration * 1.5}</p> study hours</div>
                            <div className="rounded-xl p-7 w-40 bg-white text-center shadow-lg text-sm"> <p className="text-2xl font-bold p-0 m-0">{course.totalExercise}48 </p>Online exercise</div>
                            {/* <div className="rounded-xl p-7 w-40 bg-white shadow-lg relative">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 top-10 left-14 absolute ">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                            </svg> 
                            </div> */}
                        </div>
                        <p className="text-sm my-4 font-extralight text-gray-200 text-left border-1 "> </p> 
                        <div className=" bg-white shadow-lg ml-7 px-5  overflow-y-auto h-96 border-transparent  py-5 rounded-lg">
                            <p className="font-bold text-xl text-black">About This Class</p>
                            <p>{textToParagraphs(course.description)}</p>
                            <p>In this class you'll learn:</p>
                            <ul>
                                {textToListItems(course.result)}
                            </ul>
                            <p> {textToParagraphs(course.conclusion)}</p>
                        </div>
                        <p className="text-sm my-4 font-extralight text-gray-200 text-left border-1 "> </p> 


                        <div className="m-2 px-2  rounded-xl bg-white/30 grid ">
                            
                            {sessions.map((session, index) => {
                                return (<div className="grid grid-cols-8 gap-1 rounded-lg drop-shadow-lg my-2 bg-gray-200" >
                                            <div className="col-span-1 p-3" >
                                                <Link to={ coursePerm.current ?  "/workspace/session/" + session.id : "#" }>
                                                <button  className=" text-3xl p-2 font-extrabold text-color-secondary rounded-full">{(index + 1)<10 ? "0" + (index + 1) : (index + 1)  }</button>
                                                </Link>
    
                                            </div>
                                            
                                            <div className="col-span-1  text-sm   flex flex-col items-center pt-10">
                                                
                                                <strong>{session.date} 8:00 - 10:00</strong>
                                            </div>
                                            <div className="col-span-4 ml-5 ">
                                                
                                                <p className="text-xl font-extrabold text-color-secondary mt-4 mb-0">{session.overview}</p>
                                                <p className="text-xs  text-color-secondary">Basic Geometry Concept and Formula</p>
    
    
                                            </div>
                                            <button className=" rounded-full ">
                                                <Link to={ (coursePerm.current || localStorage.getItem('role')=== 'Administrator') ?  "/workspace/session/" + session.id : "#" }>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10 mr-1 text-color-accent/70">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                                                    </svg>
                                                </Link>
                                            </button>
                                            <button onClick={() => {handleDeleteSession(session.id)}} className=" rounded-lg bg-gray-300 p-2 m-4 mt-4 border-color-primary-dark">Delete</button>
                                            {/*
                                            <p className="col-span-1 uppercase text-sm pt-3"> • {session.teacher}</p>
                                            */}
                                        </div>)
                                        
                                        
                                    
                                })}
                               
                                {localStorage.getItem('role') === "Administrator" &&   <CreateSession addOrUpdateSession={addSession} courseID={props.id}/>}
                                
                            
                        </div>
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
                            <p className="font-bold text-xl text-black">Similar Classes</p>
                            <div className='grid grid-cols-3 gap-1'>
                                {similarCourses?.current?.map((course) => {
                                        return (
                                    <NavLink to={'/workspace/' + course.name} className='no-underline'>
                                        <div key={course.name} className="col-span-1 shadow-md shadow-white flex flex-col mx-2  bg-white   h-[60vh] mt-2 mb-20 rounded-lg  ">
                                            <div className=" relative flex flex-row gap-1 h-3/4 overflow-hidden">
                                                <img className="peer h-[40vh] w-full rounded-lg object-cover " src={course.bgCardUrl} />
                                            <span className="absolute top-1 left-1 m-2 rounded-full bg-white/70 px-2 text-center text-xs font-medium text-gray-800">{course.sale} % OFF</span>
                                            </div>
                                                <div className="flex flex-col px-2 pt-0 ">
                                                    <div className="flex flex-row justify-between">
                                                    <p className="text-xs font-light  text-color-secondary  m-0 p-0"> {course.totalStudent ? course.totalStudent : 101 } Students enrolled</p>
                                                    <p className="text-xs font-light  text-color-secondary  m-0 p-0"> {course.duration} sessions</p>
                                                    </div>
                                                    <div className="text-xs mb-3 mt-2 text-center rounded-lg font-extrabold hover:bg-blue-300/10 text-color-secondary  capitalize">
                                                        {course.name}</div>
                                                    <div className="flex flex-row justify-between">
                                                        <p className="text-xs font-light  text-color-secondary  m-0 p-0"> {course.textBook}</p>
                                                        <button className="bg-white text-black font-light">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                    

                                                    
                                                <Link to={"/workspace/courses/" + course.id} className="no-underline"> 
                                                
                                                </Link>

                                                </div>
                                        </div>
                                    </NavLink>
                                            
                                        );
                                    })}
                                
                            </div>
                            <div className="flex justify-center">
                                <Link to={"/course"} className="no-underline">
                                    <button className="rounded-lg px-4 h-7 text-xs  border-black border-1 text-black font-bold"> View All </button>
                                </Link>
                            </div>
                        </div>
                        <p className="text-sm my-4  mx-7 font-extralight text-gray-200 text-left border-1 "> </p> 
                        




                    </div>
    )
}
// + "/session/" + session.id