
import Contact from "../components/StaticComponent/Contact";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Footer from "../components/StaticComponent/Footer";
import FrequentlyAsked from "../components/StaticComponent/FrequentlyAsked";
import { baseUrl } from "../Share";
import { useLocation } from "react-router-dom";
import { useRef, useState } from "react";
import {v4 as uuidv4} from 'uuid';
import { useEffect } from "react";

export default function Category()

{
    const [courseCategories, setCourseCategories] = useState({});
    const location = useLocation();
    const navigate= useNavigate();
    const [categories, setCategories] = useState();
    const featureCourse = useRef();
    const [courseSaveList, setCourseSaveList] = useState(localStorage.getItem('courseSave')? localStorage.getItem('courseSave').split('/'): '')
    const [features, setFeatures] = useState([]);
    const [populars, setPopulars] = useState([]);

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
                    popularCourses.push(courseCategories[key][1])
                }
                console.log(featureCourses, popularCourses, 'feature & popular');
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
      }, []);

    // [
    //     {name: "All Courses", href: "/course"},
    //     // {name: "", href: "/"},
    //     // {name: "IELTS Academic", href :"/ielts/"},
    //     // {name: "TOEIC", href :"/toeic/"},
    //     // {name: "IELTS General", href :"/ielts-general/"},

    // ];
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

    return(
        <section className="">
            
            <div className="grid grid-cols-8  bg-color-vibrant bg-opacity-20 pt-28" id="BASE">
                <div id="LEFT SIDE BAR/ CATEGORIES" className="col-span-2 px-3">
                    <div className=" w-full h-full flex flex-col items-center  max-w-7xl px-2 rounded-xl  border-0  pt-2">
                        
                        
                        {categories?.map((item, index) => (
                                <NavLink
                                key={item.name}
                                to={item.href}
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
                            <button className="rounded-lg font-bold text-black bg-green-600 text-xl p-2"> Start for Free </button>
                            </div>
                    </div>
                    <div className="border-1 border-gray-200 w-full my-4"> </div>
                    

                    {featureCourse.current && 
                    <div className="w-full h-[43vh]    rounded-2xl bg-gray-300 grid grid-cols-2 overflow-hidden hover:shadow-lg  cursor-pointer duration-700">
                            <div className="  relative bg-blue-400"> 
                                <img src={featureCourse.current.bgCardUrl} alt="" className="object-fill ">
                                </img>
                                <div className="rounded-xl  p-1 font-bold border-1  border-black text-black absolute bottom-7 left-2 px-3"> New</div>
                            </div>
                            <div className="p-3 flex justify-between flex-col">
                                <div>
                                    <p className=" text-xl font-bold">{featureCourse.current.name}</p>
                                    <p className=" text-sm font-light m-0 p-0" > {featureCourse.current.textBook} </p>
                                    <p className=" text-sm font-light m-0 p-0">{featureCourse.current.totalStudent} XXX students</p>
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
                                
                                features.map((course) => { 
                                    return (
                                    <div key={course.name} className="col-span-1 shadow-md shadow-white flex flex-col mx-2  bg-white   h-[60vh] mt-2 mb-20 rounded-lg  ">
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
                                                

                                                
                                            {/* <Link to={"/workspace/courses/" + course.id} className="no-underline"> 
                                               
                                            </Link> */}

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
                            {populars.map((course) => {
                                    console.log(populars);
                                    if(course) return (
                                        <NavLink to={'/workspace/' + course.name} className='no-underline'>
                                            <div key={course.name} className="col-span-1 shadow-md shadow-white flex flex-col mx-2  bg-white   h-[60vh] mt-2 mb-20 rounded-lg  ">
                                                <div className=" relative flex flex-row gap-1 h-3/4 overflow-hidden">
                                                    <img className="peer h-[40vh] w-full rounded-lg object-cover " src={course.bgCardUrl} />
                                                <span className="absolute top-1 left-1 m-2 rounded-full bg-white/70 px-2 text-center text-xs font-medium text-gray-800">{course.sale}% OFF</span>
                                                </div>
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
                                                        

                                                        
                                                    <Link to={"/workspace/courses/" + course.id} className="no-underline"> 
                                                    
                                                    </Link>

                                                    </div>
                                            </div>
                                        </NavLink>
                                        );
                                })}
                        </div>
                    </div>
                    {Object.keys(courseCategories).map( (category) => {
                        
                        return(
                        <div id="EACH CATEGORY">
                            <div className="flex flex-row justify-between mb-2"> 
    
                                <h2 className="text-black font-bold text-2xl capitalize">{category}</h2>
                                <button className="rounded-lg px-4 text-xs  border-black border-1 text-black font-bold" onClick={()=> {navigate('/course/' + category + '/')}}> View All </button>
                            </div>
                            <div className='grid grid-cols-3 gap-1'>
                                {courseCategories[category].map((course) => {
                                        return (
                                    <NavLink to={'/workspace/courses/' + course.id} className='no-underline'>
                                        <div key={uuidv4()} className="col-span-1 shadow-md shadow-white flex flex-col mx-2  bg-white   h-[60vh] mt-2 mb-20 rounded-lg  ">
                                            <div className=" relative flex flex-row gap-1 h-3/4 overflow-hidden">
                                                <img className="peer h-[40vh] w-full rounded-lg object-cover " src={course.bgCardUrl} />
                                            <span className="absolute top-1 left-1 m-2 rounded-full bg-white/70 px-2 text-center text-xs font-medium text-gray-800">{course.sale}% OFF</span>
                                            </div>
                                                <div className="flex flex-col px-2 pt-0 ">
                                                    <div className="flex flex-row justify-between">
                                                        <p className="text-xs font-light  text-color-secondary  m-0 p-0"> {course.totalStudent} xxx students</p>
                                                        <p className="text-xs font-light  text-color-secondary  m-0 p-0"> {course.duration} sessions</p>
                                                    </div>
                                                    <div className="text-xs mb-3 text-center rounded-lg font-extrabold hover:bg-blue-300/10 text-color-secondary  capitalize">
                                                        {course.name}</div>
                                                    <div className="flex flex-row justify-between">
                                                        <p className="text-xs font-light  text-color-secondary  m-0 p-0"> {course.textBook}</p>
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
                                    </NavLink>
                                            
                                        );
                                    })}
                            </div>
                        </div>
                        )




                    })
                    
                    
                    }
                    <div >
                        <h2 className="text-black font-bold text-3xl capitalize"> Explore Your Knowledge </h2>
                        <p  className=" text-sm pr-4"> Take the next step on your creative journey. With these Skillshare classes, you can explore a range of topics, tools, and techniques, from photography and graphic design, to drawing and animation. Whether you’re looking for art classes for beginners or you’re an experienced professional, you can take your skills to the next level with online classes in software like Photoshop, Procreate and After Effects, or learning handmade techniques in painting, hand lettering, and illustration. Make a film, give your home a makeover, start a freelance business. There’s so much inspiration to explore on Skillshare, and you’ll get hands-on experience by completing and sharing your own projects.</p>
                    </div>
                    <FrequentlyAsked/>
                    <Contact/>
                </div>
                
                
            </div>
            <Footer/>
            



        </section>




    )
}

