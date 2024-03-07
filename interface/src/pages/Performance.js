

import { useEffect, useState } from "react"
import { baseUrl } from "../Share"
import { useNavigate, useLocation } from "react-router-dom"
import MyChartComponent from "../components/TestingFeatures/MyChartComponent";


export default function Performance(){
    console.log("Route");
    const [loading, setLoading ] = useState(true)
    const [error, setError ] = useState(true)
    const [courses, setCourses] = useState([])
    const [exerciseLog, setExerciseLog] = useState()
    const location = useLocation()
    const navigate = useNavigate()


    useEffect(() => {
        async function fetchData() {
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
            
    
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
      
        fetchData();
        
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

    
    
 

    if (loading) {
    return <div>Loading...</div>;
    }
    
    else if(courses) return(

    <div className="grid grid-cols-4  rounded-2xl bg-white px-7 pt-4 mt-10 shadow-lg ">
        {/* <div style={{backgroundImage: `url('https://img.freepik.com/free-vector/online-courses-tutorials_52683-37860.jpg?t=st=1709698042~exp=1709701642~hmac=fa2423b26a4aa9eee547bb12ee32fb039651bd179f0ec2d7f04394d6046e1d3b&w=826')`}
        }   className="h-40 bg-cover bg-opacity-35 flex flex-col justify-start">
                <div className="text-white font-semibold"> Total Courses</div>
                <div className="text-white font-bold">{courses.length}</div>

        </div> */}

        <div style={{backgroundImage: `url('https://img.freepik.com/free-vector/online-courses-tutorials_52683-37860.jpg?t=st=1709698042~exp=1709701642~hmac=fa2423b26a4aa9eee547bb12ee32fb039651bd179f0ec2d7f04394d6046e1d3b&w=826')`}
        } className="m-2 col-span-2 relative rounded-lg bg-cover  pt-8 pb-2 bg-green-200 grid grid-cols-3 overflow-hidden" >
            <div className="col-span-2 px-8 z-30">
                <p className="text-xl font-bold  text-white pt-3 my-0"> Total Courses</p>
                <p className="text-7xl font-extrabold text-white "> {courses.length} </p>
            </div>
            <div className=" z-20 absolute inset-0 bg-black opacity-70"></div>
        </div>
        <div style={{backgroundImage: `url('https://img.freepik.com/free-vector/seminar-concept-illustration_114360-22528.jpg?t=st=1709698384~exp=1709701984~hmac=b4d8ea8e8ec77c4ef22ddf901eca25ae2a5775ca750908ad5a352e46ff751216&w=826')`}
        } className="m-2 col-span-2 relative rounded-lg bg-cover  pt-8 pb-2 bg-green-200 grid grid-cols-3 overflow-hidden" >
            <div className="col-span-2 px-8 z-30">
                <p className="text-xl font-bold  text-white pt-3 my-0"> Total Sessions</p>
                <p className="text-7xl font-extrabold text-white "> {totalExercise()} </p>
            </div>
            <div className=" z-20 absolute inset-0 bg-black opacity-70"></div>
        </div>

        <div style={{backgroundImage: `url('https://img.freepik.com/free-vector/healthy-young-group-people-practicing-yoga-vector-illustration_1150-39750.jpg?t=st=1709700254~exp=1709703854~hmac=0896e9a40940670e2ae045eb74e15b19d23292593dfa572b998c27ba44fcb27a&w=740')`}
        } className="m-2 col-span-2 relative rounded-lg bg-cover  pt-8 pb-2 bg-green-200 grid grid-cols-3 overflow-hidden" >
            <div className="col-span-2 px-8 z-30">
                <p className="text-xl font-bold  text-white pt-3 my-0"> Total Exercise</p>
                <p className="text-7xl font-extrabold text-white "> {totalSession()} </p>
            </div>
            <div className=" z-20 absolute inset-0 bg-black opacity-70"></div>
        </div>

        <div className="col-span-4 flex justify-center">

            <MyChartComponent jsonData={exerciseLogDataChart()} />
        </div>

        {/* <div style={{backgroundImage: `url('')`}
        }   className="h-40 bg-cover bg-opacity-10 flex flex-col justify-start relative">
                <div className="text-white font-semibold"> Total Sessions</div>
                
                <div className="text-black font-bold z-20">{totalSession}</div>
                <div className="absolute top-0 left-0 backdrop-blur-sm w-full h-full z-0"></div>

        </div> */}


    </div>


    )}