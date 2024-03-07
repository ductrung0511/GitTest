
import Contact from "../components/StaticComponent/Contact";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Footer from "../components/StaticComponent/Footer";
import FrequentlyAsked from "../components/StaticComponent/FrequentlyAsked";
import { baseUrl } from "../Share";
import { useLocation } from "react-router-dom";


const courses = [
  {name: "Academic Reading", teacher: "Mr John" , bgCardUrl: "/courseBg1.jpeg", id:"YLS2-D203AA",
  adress:"Tầng 2, Becamex Bình Dương, Phường Thới Hòa",
   dateStart :"18/12/2023", dateEnd:"18/3/2024", id: 1},

  {name: "Academic Writing", teacher: "Mr Zion", bgCardUrl: "https://st3.depositphotos.com/31677386/36974/i/450/depositphotos_369744836-stock-photo-close-view-wooden-desk-laptop.jpg", id:"YLS2-D203AA",
  adress:"Tầng 2, Becamex Bình Dương, Phường Thới Hòa",
   dateStart :"18/12/2023", dateEnd:"18/3/2024", id:2},
   {name: "Academic Listening", teacher: "Mr Zion", bgCardUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxWuQug61cB110_065WN0JQGSLM3WBAwOVONwW90vZJJiJFhUK8JMqKk-5kAekuGrgREU&usqp=CAU", id:"YLS2-D203AA",
  adress:"Tầng 2, Becamex Bình Dương, Phường Thới Hòa",
   dateStart :"18/12/2023", dateEnd:"18/3/2024" , id:3},
  
]
export default function CourseHome()

{
    const location = useLocation();
    const navigate= useNavigate();
    const categories = [
        {name: "All Courses", href: "/course"},
        {name: "", href: "/"},
        {name: "IELTS Academic", href :"/ielts/"},
        {name: "TOEIC", href :"/toeic/"},
        {name: "IELTS General", href :"/ielts-general/"},
    ];
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
                console.log("Fetch Put Panel ",url , putData  , response.status, data , "courseSave:" , data.courseSave , localStorage.getItem('courseSave' )  );
                
            } catch (error) {
                console.error("Error adding data:", error);
            }
            
        }
      
         updateCourseSave();




    }
    
    /*
    const [notFound, setNotFound] = useState(false);   
    const [sliceCourses, setSliceCourses] = useState();   
    const [data, setData] = useState();
    const [courses, setCourses] =useState([]);
    const [currentPage, setCurrentPage] = useState(0);


    useEffect(()=>{
        const CoursesPerPage = 1;
        const totalPages = 3;
        const lastCourseIndex = currentPage * totalPages;
        const firstCourseIndex = lastCourseIndex-CoursesPerPage;
    setSliceCourses( courses.slice(firstCourseIndex, lastCourseIndex));
    },[currentPage])
    
    <CoursePagination courses={sliceCourses}/>
    <Pagination itemsPerPage={1} total={3} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
    

    useEffect(() => {
        async function fetchData() {
          const url = "http://127.0.0.1:8000/api/course/";
          try {
            const response = await fetch(url);
            if(response.status === 404) setNotFound(true);
            else if (!response.ok) {
              console.error("Something went wrong");
              return;
            }
            const data = await response.json();
            
            setData(data);
            setCourses(data.courses);
            
            
    
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
      
        fetchData();
         // Call the fetchData function when the component mounts
      }, []); // Empty dependency array to ensure it runs only once
      console.log(courses);
      */
     //<HeaderStatic/>
    return(
        <section className="">
            
            <div className="grid grid-cols-8  bg-color-vibrant bg-opacity-20 pt-28" id="BASE">
                <div id="LEFT SIDE BAR/ CATEGORIES" className="col-span-2 px-3">
                    <div className=" w-full h-full flex flex-col items-center  max-w-7xl px-2 rounded-xl  border-0  pt-2">
                        
                        
                        {categories.map((item, index) => (
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
                            <button className="rounded-lg font-bold text-black bg-green-600 text-xl p-2"> Start for Free</button>
                               
                            </div>
                    </div>
                    <div className="border-1 border-gray-200 w-full my-4"> </div>
                    <div className="w-full h-[43vh]    rounded-2xl bg-gray-300 grid grid-cols-2 overflow-hidden hover:shadow-lg  cursor-pointer duration-700">
                            <div className="  relative bg-blue-400"> 
                                <img src="https://st3.depositphotos.com/31677386/36974/i/450/depositphotos_369744836-stock-photo-close-view-wooden-desk-laptop.jpg" alt="" className="object-fill ">
                                </img>
                                <div className="rounded-xl  p-1 font-bold bg-green-600 text-black absolute bottom-2 left-2 px-3"> New</div>
                            </div>
                            <div className="p-3 flex justify-between flex-col">
                                <div>
                                    <p className=" text-xl font-bold">  Al Animation with Runway: Creating Powerful Animated Imagery featuring ChatGPT & Midjourney</p>
                                    <p className=" text-sm font-bold m-0 p-0"> Oxford destination</p>
                                    <p className=" text-sm font-bold m-0 p-0"> 98 students</p>
                                </div>
                                <div className="flex flex-row justify-between">
                                    <p className="text-xs font-light  text-color-secondary  m-0 p-0">79m</p>
                                    <button className="bg-white text-black font-light">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 bg-gray-300">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>                     
                    </div>

                    <div id="FEATURED CLASSES">
                        <h2 className="text-black font-bold text-2xl capitalize mt-7"> Featured Classes </h2>
                        <div className='grid grid-cols-3 gap-1'>
                            {courses.map((course, index) => {
                                    return (
                                    <div key={course.name} className="col-span-1 shadow-md shadow-white flex flex-col mx-2  bg-white   h-[60vh] mt-2 mb-20 rounded-lg  ">
                                        <NavLink to={'/workspace/' + course.name} className='no-underline  h-3/4'>
                                        
                                            <div className=" relative flex flex-row gap-1 overflow-hidden">
                                                <img className="peer h-[40vh] w-full rounded-lg object-cover " src={course.bgCardUrl} />
                                                {console.log(course.bgCardUrl)}
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
                                                    <button className="bg-white text-black font-light" onClick={() => handleSaveCourse(course.id)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                                                        </svg>
                                                    </button>
                                                </div>
                                                

                                                
                                            {/* <Link to={"/workspace/courses/" + course.id} className="no-underline"> 
                                               
                                            </Link> */}

                                            </div>
                                    </div>
                                        
                                    );
                                })}
                        </div>
                    </div>
                    <div id="POPULAR COURSES">
                        <div className="flex flex-row justify-between mb-2"> 

                            <h2 className="text-black font-bold text-2xl capitalize"> Popular Classes </h2>
                            <button className="rounded-lg px-4 text-xs  border-black border-1 text-black font-bold"> View All </button>
                        </div>
                        <div className='grid grid-cols-3 gap-1'>
                            {courses.map((course) => {
                                    return (
                                <NavLink to={'/workspace/' + course.name} className='no-underline'>
                                    <div key={course.name} className="col-span-1 shadow-md shadow-white flex flex-col mx-2  bg-white   h-[60vh] mt-2 mb-20 rounded-lg  ">
                                        <div className=" relative flex flex-row gap-1 h-3/4 overflow-hidden">
                                            <img className="peer h-[40vh] w-full rounded-lg object-cover " src={course.bgCardUrl} />
                                            {console.log(course.bgCardUrl)}
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
                    </div>
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