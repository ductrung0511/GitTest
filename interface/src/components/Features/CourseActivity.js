import { NavLink } from "react-router-dom"
import ProgressBar from "./Progress"
import { useEffect, useState } from "react"
import { baseUrl } from "../../Share"
import useFetch from "../hook/useFetch"
import CreateCourse from "./CreateCourse"
import ResultModal from "./ResultModal"
/*
const courses =[{
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiG7YF2ZSfUsi0N-y4_yDAYvE0JkrLONyJerCeWVk0FTJXkqk8DhBzw7_DZzdj4rpxb7k&usqp=CAU",
    title: "How to grow your Facebook Page",
    description: "Follow these simple steps",
    progress: 3/4,
    href: "#", 
    bgColor: "blue",
    },
    {
    logo: "https://icons8.com/preloaders/dist/media/hero-preloaders.svg",
    title: "Grow your community",
    description: "Follow these easy and simple steps",
    progress: 3/4,
    href: "#",  
    bgColor: "yellow",
    },
    {
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEGdhN_FZ8lDGke1fYv4-eBt-VRVGnf8JNfbF3dBqNRrxMF73uSNTYBNXBP3bJXpplJvk&usqp=CAU",
    title: "Analytics Science Bootcamp",
    description: "Follow these hard steps",
    progress: 3/4,
    href: "#",   
    bgColor: "pink",
    },
    {
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiG7YF2ZSfUsi0N-y4_yDAYvE0JkrLONyJerCeWVk0FTJXkqk8DhBzw7_DZzdj4rpxb7k&usqp=CAU",
        title: "How to grow your Instagram Page",
        description: "Follow these simple steps",
        progress: 3/4,
        href: "#", 
        bgColor: "green",
        },
    {
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEGdhN_FZ8lDGke1fYv4-eBt-VRVGnf8JNfbF3dBqNRrxMF73uSNTYBNXBP3bJXpplJvk&usqp=CAU",
    title: "Space Science Workshops",
    description: "Follow these hard steps",
    progress: 3/4,
    href: "#",   
    bgColor: "violet",
    },
]

*/ 








export default function CourseActivity({profileData}){
    // const [data, setData] = useState();
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState();
    // const [isLoaded, setIsLoaded] = useState(false);

    const addCourse = (newCourse) => {
        setCourses([...courses, newCourse]);
      };
    const [addSuccessNotification, setAddSuccessNotification] = useState(false);
    const [addFailNotification, setAddFailNotification] = useState(false);

    
    
    useEffect(()=>{

    },[])
    
    const url = baseUrl + 'api/courses/';
    const { data , loading, error } =  useFetch(url, {
        method:'GET', 
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.getItem('access'),}
    });
    // setData(data);
    // setLoading(loading);
    // setError(error);
    // setIsLoaded(true);
    
    const [courses, setCourses] = useState(null);
    const [key, setKey] = useState('');
    
    function addCourseKey(key){
        if (data) {
            let added = false ;
            let profileKeys = localStorage.getItem("courseKey");
            let courseSave = localStorage.getItem("courseSave");
            if(profileKeys.includes(key)) 
            {
                setAddFailNotification(true); 
                return;
            }
            else for (let c of data.courses) {
                let courseKeys = c.courseKey.split("/");
                //console.log(c, "actual course", profileKeys );
                for (let lock of courseKeys) {
                        if (key === lock) {
                            profileKeys += key;
                            profileKeys += '/';

                            courseSave += c.id;
                            courseSave += '/';
                            console.log(courseSave,"courseSave");

                            let profileUpdate = {courseKey: profileKeys, courseSave: courseSave};
                            const url = baseUrl + "/api/profile/"
                            fetch(url, {
                                method:"PUT",
                                headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.getItem('access'),},
                                body: JSON.stringify(profileUpdate),
                                
                            }).then((response)=>{
                                console.log(response);
                                if(response.status === 401) console.log("Authentication suck");
                                if(response.ok){
                                    localStorage.setItem("courseSave", courseSave);
                                    localStorage.setItem("courseKey", courseKeys);
                                }
                            }).then((data) => {
                                profileData.courseKey = profileKeys;
                                
                            })


                            // Add the matched course to the authCourse array if needed
                            //setCourses( ...courses, c);
                            console.log("AddCourseKey panel: ", profileData , c, courses, localStorage.getItem('courseSave'));
                            setCourses([...courses, c]);
                            setAddSuccessNotification(true)
                            added = true;
                            return;
                        }
                }
                console.log( courses  , "updated course", key);
            }

            if (!added) setAddFailNotification(true);
        }

    }
    const handleSearchSubmit = (e) =>{
        e.preventDefault();
        addCourseKey(key.trim());
        setKey('');
    }
    const handleChangeKey = (e) => {
        setKey(e.target.value);
        console.log(e.target.value);
    }
    useEffect(() => {

        if (data) {
            
            console.log(data);
            let authCourse = [];
            let profileKeys = profileData.courseKey.split("/").filter((item) => { return item !== '' });
            for (let c of data.courses) {
                let courseKeys = c.courseKey.split("/");
                for (let lock of courseKeys) {
                    for (let key of profileKeys) {
                        if (key === lock  ) {
                            // Add the matched course to the authCourse array if needed
                            authCourse.push(c);
                            
                        }
                    }
                }
                setCourses(authCourse);
                
                
                
            }


        }
        /*
        let authCourse = [];
        for( course in data.courses)
        {
            for(lock in course.courseKey.split("/"))
            {   
                for (key in profile.courseKey.split("/"))  
                {
                    
                    
                    if(key=== lock)  console.log(key , lock , "match");
                }

            }
            

        }
        */

    }, [data]);

    if (loading) {
    return <div>Loading...</div>;
    }
    if (error) {
    return <div>Error: {error.message}</div>;
    }

    
    
    else if(courses) return(
    <div className="flex flex-col  rounded-2xl bg-white px-7 pt-4 mt-10 shadow-lg ">
        
        
        <div className="px-10 py-1 flex flex-col gap-y-1 bg-teal-900 text-white rounded-xl ">
            
                <form className="flex flex-col w-full py-3" onSubmit={handleSearchSubmit}>
                    <p className="text-semibold text-white ml-4"> Search for your dream course here!</p>
                    
                    <input type="text" id="key" name="key" value={key} onChange={handleChangeKey} required placeholder="Course code" className=" mb-4 bg-transparent border-2 rounded-full py-2 px-3 text-[16px] leading-[22.4px] font-light placeholder:text-white text-white"/>
                    <button type="submit" className="max-w-[200px] h-auto rounded-full bg-white text-black py-2 px-2 ">
                        <span className="text-teal-900 font-semibold">Search</span>
                    </button>
                </form>
                {addSuccessNotification && <ResultModal setClose={setAddSuccessNotification} messageTitle={"Your course has been added successfully"} messageBody={"Find your course details updated down below!"}/> }
                {addFailNotification && <ResultModal setClose={setAddFailNotification} messageTitle={"Course cannot be added to your list"} messageBody={"Either because it is already in your list or your code is not correct"}/> }
        </div>  
        <div className="flex flex-row justify-between mt-8 mb-2">
            <div>
                <h4 className="font-bold text-gray-400 py-0 mt-0"> Courses Activity</h4>
            </div>
            
        </div>
        

        
        


        
        {courses.map((course) => {return(

        
        <NavLink to={"/workspace/courses/" + course.id} key={course.name} className="no-underline">
        <div className= {`mt-2 rounded-xl bg-gray-400 grid grid-cols-9 py-2 no-underline mb-2 h-30`}>
            <div className="col-span-7 px-2 py-1 grid grid-cols-5">
                <img className="object-cover col-span-4 h-40 w-full px-2 rounded-2xl " src={course.bgCardUrl} alt=""/>
                <div className="col-span-1">
                    <p className="text-base font-bold text-white my-0 py-0">{course.name}</p>
                    <p className="text-sm text-white my-0 py-0">{}</p>
                </div>
            </div>
            <div className="col-span-2 m-1 flex flex-col justify-center">
                <div className="bg-white  text-black text-center font-bold rounded-lg text-sm flex items-center justify-center w-3/4 h-10 no-underline px-3 py-7" >{course.duration} sessions</div>
                <div className="font-light text-white text-sm">{}</div>
            </div>
            <div className="col-span-6 mt-3">
                <ProgressBar/>
            </div>
            <div className="col-span-3 pl-4 ml-4 mr-2 font-extralight text-sm text-white flex flex-row gap-1 items-center"> 
                <p className="mt-3"> Details </p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M17 4.25A2.25 2.25 0 0 0 14.75 2h-5.5A2.25 2.25 0 0 0 7 4.25v2a.75.75 0 0 0 1.5 0v-2a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 .75.75v11.5a.75.75 0 0 1-.75.75h-5.5a.75.75 0 0 1-.75-.75v-2a.75.75 0 0 0-1.5 0v2A2.25 2.25 0 0 0 9.25 18h5.5A2.25 2.25 0 0 0 17 15.75V4.25Z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M1 10a.75.75 0 0 1 .75-.75h9.546l-1.048-.943a.75.75 0 1 1 1.004-1.114l2.5 2.25a.75.75 0 0 1 0 1.114l-2.5 2.25a.75.75 0 1 1-1.004-1.114l1.048-.943H1.75A.75.75 0 0 1 1 10Z" clipRule="evenodd" />
                </svg>
            </div>
        </div>
        </NavLink>
        )})}
        {courses.length === 0 && <div className="flex flex-col justify-center">
            <img alt=" " className="w-full h-80" src="https://img.freepik.com/free-vector/social-distance-school-concept-illustration_114360-2831.jpg"/>
            <p className="text-3xl text-center text-blue-900 font-bold"> No course to display yet !</p>
            
            
            
            </div>}

        {localStorage.getItem('role') === 'Administrator'  && <CreateCourse addOrUpdateCourse={addCourse}  />  }

    </div>


    )}