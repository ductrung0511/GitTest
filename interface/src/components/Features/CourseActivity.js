import { NavLink, useNavigate } from "react-router-dom"
import ProgressBar from "./Progress"
import { useEffect, useState } from "react"
import { baseUrl } from "../../Share"
import useFetch from "../hook/useFetch"
import CreateCourse from "./CreateCourse"
import ResultModal from "./ResultModal"
 


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
    const courseTotal = localStorage.getItem('courseAuth').split('/').filter( item => item !== '').length;
    const exerciseTotal = Object.keys(JSON.parse(localStorage.getItem('exerciseLog'))).length;
    const [exerciseTotalCourses, setExerciseTotalCourses] =useState();
    

    
    
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
            let courseAuth = localStorage.getItem("courseAuth");
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

                            courseAuth += c.id;
                            courseAuth += '/';
                            console.log(courseAuth, "courseAuth");

                            let profileUpdate = {courseKey: profileKeys, courseAuth: courseAuth };
                            const url = baseUrl + "/api/profile/"
                            fetch(url, {
                                method:"PUT",
                                headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.getItem('access'),},
                                body: JSON.stringify(profileUpdate),
                                
                            }).then((response)=>{
                                console.log(response);
                                if(response.status === 401) console.log("Authentication suck");
                                if(response.ok){
                                    localStorage.setItem("courseAuth", courseAuth);
                                    localStorage.setItem("courseKey", profileKeys);
                                }
                            }).then((data) => {
                                profileData.courseKey = profileKeys;
                                
                            })


                            // Add the matched course to the authCourse array if needed
                            //setCourses( ...courses, c);
                            console.log("AddCourseKey panel: ", profileData , c, courses, localStorage.getItem('courseAuth'));
                            setCourses([...courses, c]);
                            setAddSuccessNotification(true);
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
    const navigate = useNavigate();
    useEffect(() => {

        if (data) {
            setExerciseTotalCourses(data.exerciseTotalCourses);
            console.log(data);
            let authCourse = [];

            if(localStorage.getItem('role') !== 'Administrator'){
                
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

            else if(localStorage.getItem('role') === 'Administrator'){
                setCourses(data.courses);
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
        <>
        {/* Breadcrumb */}

    <div className="stats  shadow  mt-20 ">
        
        <div className="stat">
            <div className="stat-figure text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
            </div>
            <div className="stat-title">Total Courses </div>
            <div className="stat-value text-primary">{courseTotal} {courseTotal > 1 ? 'Courses' : 'Course'}</div>
            <div className="stat-desc">{courseTotal} more than last year</div>
        </div>
        
        <div className="stat">
            <div className="stat-figure text-yellow-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <div className="stat-title ">Exercise Done</div>
            <div className="stat-value text-yellow-300">{exerciseTotal} {exerciseTotal > 1 ? 'Exercies' : 'Exercise'} </div>
            <div className="stat-desc"> {exerciseTotal} more than last year</div>
        </div>
        
        <div className="stat">
            
            <div className="stat-value">{ Math.ceil( 100 - ((exerciseTotalCourses - exerciseTotal) * 100  / exerciseTotalCourses ) )  } %</div>
            <div className="stat-title">Exercises done </div>
            <div className="stat-desc text-secondary">{(exerciseTotalCourses - exerciseTotal)} exericse remaining</div>
        </div>
        
    </div>


    <div className="flex flex-col  rounded-2xl bg-white px-7 pt-2 mt-9 shadow-lg ">
        

        
        
        <div className="px-10 py-1 mt-2 flex flex-col gap-y-1 bg-teal-900 text-white rounded-xl ">
            
                <form className="flex flex-col w-full py-3" onSubmit={handleSearchSubmit}>
                    <p className="text-semibold text-white ml-4"> Search for your dream course here!</p>
                    
                    <input type="text" id="key" name="key" value={key} onChange={handleChangeKey} required placeholder="Course code" className=" mb-1 bg-transparent border-2 rounded-full py-2 px-3 text-[16px] leading-[22.4px] font-light placeholder:text-white text-white"/>
                    <button type="submit" className="max-w-[200px] h-auto rounded-full bg-white text-black py-2 px-2 ">
                        <span className="text-teal-900 font-semibold">Search</span>
                    </button>
                </form>
                {addSuccessNotification && <ResultModal setClose={setAddSuccessNotification} messageTitle={"Your course has been added successfully"} messageBody={"Find your course details updated down below!"}/> }
                {addFailNotification && <ResultModal setClose={setAddFailNotification} messageTitle={"Course cannot be added to your list"} messageBody={"Either because it is already in your list or your code is not correct"}/> }
        </div>  
        <div className="flex flex-row justify-between mt-8 mb-2">
            <div>
                <h4 className="font-bold text-gray-400 py-0 mt-0"> Your Registered Courses</h4>
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

        </>
     


    )}