

import { useEffect, useState } from "react"
import { baseUrl } from "../Share"
import { useNavigate, useLocation } from "react-router-dom"
import MyChartComponent from "../components/TestingFeatures/MyChartComponent";
import {v4 as uuidv4} from 'uuid';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { NavLink } from "react-router-dom"; 
import { Tooltip } from 'react-tooltip'
import NotificationModal from "../components/Features/NotifcationModal";
import UpdateProfile from "../components/Features/UpdateProfile";
import ProfileCard from "../components/Features/ProfileCard";
import { Disclosure } from "@headlessui/react";


export default function Performance(){
    const [loading, setLoading ] = useState(true);
    const [error, setError] = useState(true);
    const [courses, setCourses] = useState([]);
    const [exerciseLog, setExerciseLog] = useState();
    const location = useLocation();
    const navigate = useNavigate();
    if(!localStorage.getItem('access'))
    {
        navigate("/login",{
        state:{ previousUrl : location.pathname,}
      })
    }
    
    const courseTotal = localStorage.getItem('courseAuth')?.split('/').filter( item => item !== '').length
    const exerciseTotal =  localStorage.getItem('exerciseLog')  ? Object.keys(JSON.parse(localStorage.getItem('exerciseLog'))).length  :0;
    const blogTotal = localStorage.getItem('blogSave')?.split('/').filter( item => item !== '').length
    const courseSaveTotal = localStorage.getItem('courseSave')?.split('/').filter( item => item !== '').length
    
    // useEffect(() => {
    //     const access = localStorage.getItem('access');
    //     const courseAuth = localStorage.getItem('courseAuth');
    //     const exerciseLogData = localStorage.getItem('exerciseLog');
    //     const blogSave = localStorage.getItem('blogSave');
    //     const courseSave = localStorage.getItem('courseSave');

    //     // Check if any of the required data is missing in LocalStorage
    //     if (!access || !courseAuth || !exerciseLogData || !blogSave || !courseSave) {
    //         navigate("/login", {
    //             state: { previousUrl: location.pathname }
    //         });
    //     } else {
    //         setLoading(false);
    //         // Proceed with rendering or fetching additional data
    //     }
    // }, [navigate, location.pathname]);     
    

    

    const [exerciseTotalCourses, setExerciseTotalCourses] =useState();

    let role = localStorage.getItem('role');
    let username= localStorage.getItem('username');



    useEffect(() => {
        async function fetchData() {
            // const url = "http://127.0.0.1:8000/api/dashboard/";
            const url = baseUrl + "api/performance/";
          try {
            const response = await fetch(url, {
              headers:{
                  'Content-Type': 'application/json',
                  Authorization: 'Bearer ' + localStorage.getItem('access'),
          }
          });
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
            console.log(data ,"resources");
            setCourses(data.courses); 
            setExerciseLog(data.exerciseLog);
            setLoading(false);
            setExerciseTotalCourses(data.exerciseTotalCourses);
            
    
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
      
        fetchData();
        scrollToPosition(0);
        
        // Call the fetchData function when the component mounts
      }, []);
    const totalSession = () =>{
        let total = 0;
        courses.map((course)=>{
            total += course.totalSession;
        })
        return total;

    }
    const totalExercise = () =>{
        let total = 0;
        courses.map((course)=>{
            total += course.totalExercise;
        })
        return total;

    }
    const exerciseLogDataChart = () =>{
        let data = {};
        for(let i of Object.keys(exerciseLog)){
            data[i] = Math.max(... exerciseLog[i])
        }
        return data;


    }
    const handleCopyText = async (text)=>{
        try {
          navigator.clipboard.writeText(text)
        }
        catch(error){
          console.log("error copy data", error)
        }
      };
    const scrollToPosition = (position) => {
        window.scrollTo({
          top: position,
          behavior: 'smooth' // This gives a smooth scrolling effect
        });
      };
    


    
    
 

    if (loading) {
    return <div>Loading...</div>;
    }
    
    else if(courses) return(

    <div className="grid grid-cols-4 mt-14 rounded-2xl bg-white px-7 pt-4  pb-7 shadow-lg ">
        {/* <div style={{backgroundImage: `url('https://img.freepik.com/free-vector/online-courses-tutorials_52683-37860.jpg?t=st=1709698042~exp=1709701642~hmac=fa2423b26a4aa9eee547bb12ee32fb039651bd179f0ec2d7f04394d6046e1d3b&w=826')`}
        }   className="h-40 bg-cover bg-opacity-35 flex flex-col justify-start">
                <div className="text-white font-semibold"> Total Courses</div>
                <div className="text-white font-bold">{courses.length}</div>

        </div> */}
                        {localStorage.getItem('exerciseLog') === '{}' &&
                             <div className=" fixed top-20 right-2 bg-yellow-200  rounded-lg z-50 w-72   ">
                                <Disclosure>
                                {({ open }) => (
                                    <>
                                    <Disclosure.Button className="flex  w-full justify-between bg-yellow-200 shadow-lg rounded-t-lg  px-4 py-2 text-left text-sm font-medium ">
                                        <div className=" text-xs font-medium">
                                            Mở ra để xem phần hướng dẫn cho trang Dashboard nào bạn ơi📋!
                                        </div>
                                        
                                    </Disclosure.Button>
                                    <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500  rounded-b-lg bg-yellow-100">
                                        <p className="text-light text-xs text-black">
                                            Các số liệu thống kê học tập đang được hiện lên (như tổng số khóa học, bài tập và tiết học) <br/>
                                            💡Kéo xuống dưới hoặc nhấn vào nút bên dưới bạn sẽ thấy khóa học hiện tại của mình và tiến độ làm bài của mình nhé
                                                <button onClick={ ()=>{scrollToPosition(489)}} className="bg-white rounded-lg  p-2 my-1" > Nhấn vào đây để xem khóa học nào! </button> <br/>
                                            ⚔️Kéo xuống dưới hơn nữa hoặc nhấn vào nút bên dưới bạn sẽ thấy các cột mốc của mình trong hệ thống và các bài tập của ngày hôm nay của mình nhé
                                            <br/> <button onClick={ ()=>{scrollToPosition(2377)}} className="bg-white rounded-lg  p-2 my-1" >Xem bài tập và các cột mốc nào! </button> <br/>

                                            ⚔️Và cuối cùng là thống kê điểm số của các bài tập trong hệ thống nhé
                                            <br/> <button onClick={ ()=>{scrollToPosition(1572)}} className="bg-white rounded-lg  p-2 my-1" > Thống kê điểm số nào! </button> <br/>

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


        <div className="col-span-2"></div>
        <div className="flex flex-row col-span-2 gap-3 justify-center mt-2 mb-4 ">
            
            <div className="flex flex-row justify-center">
                <div className="flex flex-col mx-3">
                  <p className="font-bold text-gray-800 text-xl my-0 py-0"> {username}</p>
                  <p className="font-bold text-blue-600 text-sm ">{role} </p>
                </div>
                {/* <img  className="w-14 h-14 rounded-lg" src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSx9yBvquZ3z_DsxhnCNx2PBb1AdzBOF5iyMOqtgZJWeIs6_k9m" alt="avatar"/> */}
                <div className="dropdown dropdown-bottom dropdown-end">
                    {/* <div  className="btn m-1">Click</div> */}
                    <img  tabIndex={0} role="button" className="w-14 h-14 rounded-lg hover:opacity-80 duration-300" src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSx9yBvquZ3z_DsxhnCNx2PBb1AdzBOF5iyMOqtgZJWeIs6_k9m" alt="avatar"/>
                    <ul tabIndex={0} className="dropdown-content z-[1] bg-gray-300 menu p-2 shadow  rounded-box w-52">
                        <li><UpdateProfile />  </li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-col gap-1 mt-2 ml-2 z-40">
                <NotificationModal/>
                
            </div>

        </div>

        <div className="stats shadow mb-10 col-span-4   ">
            <Tooltip id="tooltip-intro" className=""/>

            
            <div data-tooltip-content='Tổng số các khóa học'  data-tooltip-id = 'tooltip-intro' className="stat bg-gray-200">
                <div className="stat-figure text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                </div>
                <div className="stat-title">Total Courses </div>
                <div className="stat-value text-primary">{courseTotal} {courseTotal > 1 ? 'Courses' : 'Course'}</div>
                <div className="stat-desc">{courseTotal} more than last year</div>
            </div>
            <div  data-tooltip-content='Tổng số các bài tập'  data-tooltip-id = 'tooltip-intro' className="stat bg-gray-200">
                <div className="stat-figure text-yellow-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div>
                <div className="stat-title ">Exercise Done</div>
                <div className="stat-value text-yellow-300">{exerciseTotal} {exerciseTotal > 1 ? 'Exercies' : 'Exercise'} </div>
                <div className="stat-desc"> {exerciseTotal} more than last year</div>
            </div>
            <div data-tooltip-content='Tỉ lệ phần trăm số bài tập đã hoàn thành'   data-tooltip-id = 'tooltip-intro' className="stat bg-gray-200">
                <div className="stat-value text-green-400">{ Math.ceil( 100 - ((exerciseTotalCourses - exerciseTotal) * 100  / exerciseTotalCourses ) )  } %</div>
                <div className="stat-title">Exercises done </div>
                <div className="stat-desc text-secondary">{(exerciseTotalCourses - exerciseTotal)} exericse remaining</div>
            </div>
            
        </div>





        {/* <div  data-tooltip-content='Khoá học đã đăng kí'   data-tooltip-id = 'tooltip-intro'  className="divider col-span-4 mt-4  text-2xl font-bold  text-gray-300">Your registerd courses</div>  */}

        {courses?.map((course) => {
            return(
            <>
            <div className="w-full h-[43vh] col-span-4 shadow-lg mt-7 mb-3   rounded-2xl bg-white grid grid-cols-2 overflow-hidden hover:shadow-lg  cursor-pointer duration-700">
                            <div className="  relative bg-white h-full"> 
                                <NavLink to={'/workspace/courses/' + course.id} className='no-underline  h-full '>

                                    <img src={course.bgCardUrl} alt="" className="object-cover h-full max-h-[43vh] ">
                                    </img>
                                </NavLink>
                            </div>
                            <div className="p-3  flex justify-between flex-col relative">
                                <div>
                                    <div className=" flex flex-row justify-between"> 
                                        <p className=" text-xl font-bold">{course.name}</p>
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
                                                    
                                                    <button  data-tooltip-content='lưu đường link tới khóa học'   data-tooltip-id = 'tooltip-intro' onClick={ () => (handleCopyText(baseUrl + 'workspace/courses/' + course.id ))} className=" hover:bg-gray-100 p-2 text-sm ">
                                                        Copy Link
                                                    </button>
                                                    
                                                    </Menu.Item>
                                                    
                                                </div>
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    </div>
                                    <p className=" text-sm font-light m-0 p-0" > {course.textBook} </p>
                                    <p className=" text-sm font-light m-1 p-0"> Serial: {course.serial}  </p>
                                </div>
                                <div className="flex flex-row justify-between mb-7 2xl:mb-10">
                                    <Tooltip id="tooltip-course" className="absolute z-40"/>
                                    <p  data-tooltip-content='số tiết học trong khóa' data-tooltip-place="right"   data-tooltip-id = 'tooltip-intro' className="text-xs font-light  text-color-secondary  m-0 p-0"> <span className="text-xl">{course.duration} </span>sessions</p>

                                    <div role="progressbar"
                                    data-tooltip-content='Đây là tiến độ bài tập của bạn trong khóa học này'
                                    data-tooltip-id="tooltip-course"
                                     className={`radial-progress bg-white font-extrabold border-2   text-yellow-300  border-gray-700`} style={{"--value":
                                    Math.ceil( ((Object.keys(course.exerciseDone).length /  course.totalExercise))*100 )
                                    , "--size": "4rem"}} >{Math.ceil( ((Object.keys(course.exerciseDone).length /  course.totalExercise))*100 )}%</div>

                                    

                                </div>
                                
                            </div>                     
                    </div>
            {course?.sessionsExercise.map((session, index)=>{
                return <div className="flex flex-col gap-2 m-1 p-2 rounded-lg shadow-lg  bg-white" key={uuidv4()}>
                    <NavLink  data-tooltip-content='xem tiết học và làm bài tập của mình nha bạn ơiﮩ٨ـﮩﮩ٨ـ ♡ ﮩ٨ـﮩﮩ٨ـ  ' data-tooltip-id="tooltip-course" data-tooltip-place="bottom" to={'/workspace/session/' + session.id} className='no-underline text-black'>
                        <div className="text-sm font-light"> Session <span className="font-semibold ">{index + 1} </span> : {session.name}</div>
                    </NavLink>
                    <progress className="progress progress-warning w-56 max-h-0.5" value={session.progress * 100 } max="100"></progress>
                </div>
            })}
            </>

            
            )
        })
        // <div> { console.log( Object.keys(courseSelected.exerciseDone).length / courseSelected.totalExercise)} </div>
        }
        {courses.length === 0 &&
        <>
        <div    data-tooltip-id="my-tooltip"
                data-tooltip-content="You haven't register a course yet."
                data-tooltip-place="top" className="w-full h-[43vh] col-span-4 shadow-lg mt-7   rounded-2xl bg-white grid grid-cols-2 overflow-hidden hover:shadow-lg  cursor-pointer duration-700">
            <div className="  skeleton "> 
                
            </div>
            <div className="p-3 flex justify-between flex-col relative">
                <div>
                    <div className=" flex flex-row justify-between"> 
                        <div className=" skeleton w-3/4 h-6"></div>
                        
                    </div>
                    <div className=" my-2 skeleton w-2/4 h-6"></div>
                    <div className=" my-2 skeleton w-2/4 h-6"></div>
                    
                </div>
                <div className="flex flex-row justify-between my-3">
                    <div className="skeleton h-4 w-20"></div>
                    <div className="skeleton w-16 h-16 rounded-full shrink-0"></div>

                </div>
                
            </div>                     
        </div>
        <div className="skeleton w-44 h-20 my-7" data-tooltip-id="my-tooltip" data-tooltip-content="Your session" data-tooltip-place="top"></div>
        <div className="skeleton w-44 h-20 my-7" data-tooltip-id="my-tooltip" data-tooltip-content="Your session" data-tooltip-place="top"></div>
        <div className="skeleton w-44 h-20 my-7" data-tooltip-id="my-tooltip" data-tooltip-content="Your session" data-tooltip-place="top"></div>
        <div className="skeleton w-44 h-20 my-7" data-tooltip-id="my-tooltip" data-tooltip-content="Your session" data-tooltip-place="top"></div>
      
        <Tooltip id="my-tooltip"/>
        </>    
        }

        <div className="col-span-4 h-48"></div>




        <div data-tooltip-content='Tổng số các khóa học'  data-tooltip-id = 'tooltip-intro' style={{backgroundImage: `url('https://img.freepik.com/free-vector/online-courses-tutorials_52683-37860.jpg?t=st=1709698042~exp=1709701642~hmac=fa2423b26a4aa9eee547bb12ee32fb039651bd179f0ec2d7f04394d6046e1d3b&w=826')`}
        } className="m-2  col-span-2  relative rounded-lg bg-cover  pt-8 pb-2 bg-green-200 grid grid-cols-3 overflow-hidden" >
            <div className="col-span-2 px-8 z-30">
                <p className="text-xl font-bold  text-white pt-3 my-0"> Total Courses</p>
                <p className="text-7xl text-yellow-300 font-extrabold  "> {courses.length} <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg> </p>
            </div>
            
            <div className=" z-20 absolute inset-0 bg-black opacity-70"></div>
            <button className=" z-20 absolute inset-0" onClick={()=>{scrollToPosition(800)}}></button>

        </div>
        <div data-tooltip-content='Tổng số các tiết học'   data-tooltip-id = 'tooltip-intro' style={{backgroundImage: `url('https://img.freepik.com/free-vector/seminar-concept-illustration_114360-22528.jpg?t=st=1709698384~exp=1709701984~hmac=b4d8ea8e8ec77c4ef22ddf901eca25ae2a5775ca750908ad5a352e46ff751216&w=826')`}
        } className="m-2 col-span-2 relative rounded-lg bg-cover  pt-8 pb-2 bg-green-200 grid grid-cols-3 overflow-hidden" >
            <div className="col-span-2 px-8 z-30">
                <p className="text-xl font-bold  text-white pt-3 my-0"> Total Sessions</p>
                <p className="text-7xl font-extrabold  text-green-400 "> {totalSession()} <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg> </p>
            </div>
            <div className=" z-20 absolute inset-0 bg-black opacity-70"></div>
            <button className=" z-20 absolute inset-0" onClick={()=>{scrollToPosition(800)}}></button>

        </div>

        <div data-tooltip-content='Tổng số các bài tập' data-tooltip-place="bottom"  data-tooltip-id = 'tooltip-intro' style={{backgroundImage: `url('https://img.freepik.com/free-vector/healthy-young-group-people-practicing-yoga-vector-illustration_1150-39750.jpg?t=st=1709700254~exp=1709703854~hmac=0896e9a40940670e2ae045eb74e15b19d23292593dfa572b998c27ba44fcb27a&w=740')`}
        } className="m-2 col-span-2 relative rounded-lg bg-cover  pt-8 pb-2 bg-green-200 grid grid-cols-3 overflow-hidden" >
            <div className="col-span-2 px-8 z-30">
                <p className="text-xl font-bold  text-white pt-3 my-0"> Total Exercise</p>
                <p className="text-7xl font-extrabold text-blue-300 "> {totalExercise()} <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg> </p>
            </div>
            <div className=" z-20 absolute inset-0 bg-black opacity-70"></div>
            <button className=" z-20 absolute inset-0" onClick={()=>{scrollToPosition(800)}}></button>

        </div>
        <div data-tooltip-content='Tổng số bài tập đã hoàn thành'  data-tooltip-place="bottom" data-tooltip-id = 'tooltip-intro' style={{backgroundImage: `url('https://img.freepik.com/free-vector/healthy-young-group-people-practicing-yoga-vector-illustration_1150-39750.jpg?t=st=1709700254~exp=1709703854~hmac=0896e9a40940670e2ae045eb74e15b19d23292593dfa572b998c27ba44fcb27a&w=740')`}
        } className="m-2 col-span-2 relative rounded-lg bg-cover  pt-8 pb-2 bg-green-200 grid grid-cols-3 overflow-hidden" >
            <div className="col-span-2 px-8 z-30">
                <p className="text-xl font-bold  text-white pt-3 my-0"> Exercise Done</p>
                <p className="text-7xl font-extrabold text-pink-300 "> {exerciseTotalCourses-  (exerciseTotalCourses - exerciseTotal)} <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="inline-block w-8 h-8 stroke-current"> <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
</svg>
</p>
            </div>
            <div className=" z-20 absolute inset-0 bg-black opacity-70"></div>
            <button className=" z-20 absolute inset-0" onClick={()=>{scrollToPosition(800)}}></button>

        </div>

        <div className="mt-20 col-span-4 px-10 mb-10  ">
            <p className="text-xl  mb-0 font-bold text-black"> Exercise Statistics</p>
            <p className="text-base pt-0 mt-0 font-base">Track your learning progress with one-of-a-kind exercise score report.</p>
        </div>
        <div data-tooltip-content='Xem các bài tập mà bạn đã làm ở đây ๋࣭ ⭑⚝'  data-tooltip-id='tooltip-milestone' className="col-span-4  flex justify-center px-10 h-screen items-start">
            <MyChartComponent jsonData={exerciseLogDataChart()} />
        </div>
        


        


        {/* <select 
            onChange={(e) =>{
                const courseSelected = courses?.find((course) =>  '' + course.id  === e.target.value );
                setCourseSelected(courseSelected);
            }}
            defaultValue='default'
        >
            <option value='default'>Choose Your Course </option>
            {courses?.map((course) =>{
                return(
                    <option key={uuidv4()} value={course.id}> {course.name} </option>
                )
            })}
        </select> */}

        {/* <div style={{backgroundImage: `url('')`}
        }   className="h-40 bg-cover bg-opacity-10 flex flex-col justify-start relative">
                <div className="text-white font-semibold"> Total Sessions</div>
                
                <div className="text-black font-bold z-20">{totalSession}</div>
                <div className="absolute top-0 left-0 backdrop-blur-sm w-full h-full z-0"></div>

        </div> */}

        
        <div className="border-1 mt-12 border-gray-400 px-4  col-span-4  w-full"></div>
        <div className="mt-10 col-span-2 ">
            {/* <p className="text-xl  mb-0 font-bold text-black"> Badges</p>
            <p className="text-base pt-0 mt-0 font-base"> Get rewarded for your learning progress with one-of-a-kind badges.</p> */}
            <p className="text-base mt-8 font-bold text-black">Milestones</p>
            <Tooltip id="tooltip-milestone"/>
            <div className="grid grid-cols-2 gap-3"> 
                <div data-tooltip-content='Đăng kí 1 khóa học' data-tooltip-id="tooltip-milestone" className= {`h-72 2xl:h-96 gap-4 w-3/4  rounded-lg  shadow-md  ${courseTotal > 0 ? 'bg-green-300' : 'bg-white'}  duration-700  hover:shadow-xl flex flex-col py-7  `} >
                    <img className="h-1/2 w-full px-1" alt="" src=" https://cdn.iconscout.com/icon/premium/png-512-thumb/course-2002766-1686896.png?f=webp&w=512"/>
                    <div className="text-lg px-4 text-center font-bold text-black"> Register a Course </div>
                </div>
                <div data-tooltip-content='Hoàn thành 1 bài tập' data-tooltip-id="tooltip-milestone" className= {`h-72 w-3/4  2xl:h-96 gap-4 rounded-lg  shadow-md  ${ exerciseTotal > 0 ? 'bg-green-300' : 'bg-white'}  duration-700  hover:shadow-xl flex flex-col py-7  `} >
                    <img className="h-1/2 w-full" alt="" src="https://cdn.iconscout.com/icon/premium/png-512-thumb/heart-growth-2489315-2087635.png?f=webp&w=512"/>
                    <div className="text-lg px-4 text-center font-bold text-black"> Complete an Exercise </div>
                </div>
                <div  data-tooltip-content='Đăng kí 3 khóa học' data-tooltip-id="tooltip-milestone" className= {`h-72 w-3/4 2xl:h-96 gap-4  rounded-lg  shadow-md  ${courseTotal > 2 ? 'bg-green-300' : 'bg-white'}  duration-700  hover:shadow-xl flex flex-col py-7  `} >
                    <img className="h-1/2 w-full" alt="" src="https://cdn.iconscout.com/icon/premium/png-512-thumb/course-1648742-1400672.png?f=webp&w=512 "/>
                    <div className="text-lg px-4 text-center font-bold text-black"> Register 3 Courses </div>
                </div>
                <div data-tooltip-content='Hoàn thành 3 bài tập' data-tooltip-id="tooltip-milestone" className= {`h-72 w-3/4 2xl:h-96 gap-4 rounded-lg  shadow-md  ${exerciseTotal > 2 ? 'bg-green-300' : 'bg-white'}  duration-700  hover:shadow-xl flex flex-col py-7  `} >
                    <img className="h-1/2 w-full" alt="" src="https://cdn.iconscout.com/icon/premium/png-512-thumb/exercise-2489317-2087637.png?f=webp&w=512"/>
                    <div className="text-lg px-4 text-center font-bold text-black"> Complete 3 Exercises </div>
                </div>
                <div data-tooltip-content='Hoàn thành 9 bài tập' data-tooltip-id="tooltip-milestone" className= {`h-72 w-3/4  2xl:h-96 gap-4 rounded-lg  shadow-md bg-white ${exerciseTotal > 8 ? 'bg-green-300' : 'bg-white'}  duration-700  hover:shadow-xl flex flex-col py-7  `} >
                    <img className="h-1/2 w-full px-1" alt="" src="https://cdn.iconscout.com/icon/premium/png-512-thumb/exercise-1640598-1390797.png?f=webp&w=512"/>
                    <div className="text-lg px-4 text-center font-bold text-black"> Complete 9 Exercises </div>
                </div>

            </div>
            <p className="text-base mt-8 font-bold text-black">Lifetime</p>
            <div className="grid grid-cols-2 gap-3"> 
                <div data-tooltip-content='Đăng kí tài khoản' data-tooltip-id="tooltip-milestone" className="h-72 w-3/4  2xl:h-96 gap-4 rounded-md  shadow-lg bg-green-200  hover:shadow-lg flex flex-col py-7">
                    <img className="h-1/2 w-full" alt="" src="https://static.skillshare.com/assets/images/rewards/badges/complete/save_a_class.svg"/>
                    <div className="text-lg px-4 text-center font-bold text-black"> Create an Account </div>
                </div>
                
                

            </div>
            
            
        </div>
        <div data-tooltip-content='Các bài tập của hôm nay nha bạn ơi -`♡´- ' data-tooltip-id="tooltip-milestone" className="col-span-2">
            <ProfileCard/>
        </div>

        <div className="border-1 mt-4 border-gray-400 px-4 col-span-4  w-full"></div>
        

        
        



    </div>


    )}