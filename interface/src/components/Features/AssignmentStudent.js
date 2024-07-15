
import { useState } from 'react'
import { baseUrl } from '../../Share'
import { Link, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import AssignmentInfo from "./AssignmentInfo"
import { useEffect } from "react"

export default function AssignmentStudent(){  
    const [assignments, setAssignments] = useState([])
    const navigate = useNavigate();
    const [notFound, setNotFound] = useState(false);
    useEffect(() => {
        async function fetchData() {
            const url = baseUrl + "api/assignment/";
            try {
              const response = await fetch(url , {
                method: "GET",
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('access'),
                },
                });
              if(response.status === 404) setNotFound(true);
              else if(response.status === 401) navigate("/login");
              else if (!response.ok) {
                console.error("Something went wrong");
                return;
              }
              const data = await response.json();   
              setAssignments( [  data.filter((assignment)=>{return assignment['score'] === 0})   , data.filter((assignment)=>{return assignment['score'] !== 0})   ] );
                //   setAssignments(data);
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          }
          fetchData();
        }, []) // Empty dependency array to ensure it runs only once
    return(

        <div className="m-2 px-2  rounded-xl pt-10  grid ">
           

            <div className='rounded-xl w-3/4 grid grid-cols-1 p-3 my-7 bg-white backdrop-blur-lg relative'>
                <div className='flex flex-col my-3 ml-20'>
                    <p className='text-md text-gray-600 font-semibold  p-0 m-1'> Welcome to</p>
                    <p className='text-xl text-gray-900 font-bold capitalize p-0 m-1 '>Your Assignment manager area</p>
                    <p className='text-sm text-gray-600 font-light p-0 mb-7 mx-1'> Where you can see the score and comment of Teacher on your Works </p>
                    
                    <Link to={"https://docs.google.com/document/d/1UuqCtEoUO_BpTDCrfsnomXCcj1z2fD_OIJCWG9d8jQU/edit?usp=sharing"}
                        className='bg-green-400 no-underline text-white rounded-lg p-2 text-md font-semibold max-w-48 hover:bg-yellow-200 hover:text-black  hover:text-sm duration-300 shadow-lg' 
                        >
                    See description
                    </Link>
                        

                </div>
                <img className=" max-h-80 absolute   -right-24 -top-24"  src='/children.png'></img>


            </div>
           


            <div className='grid grid-cols-3 gap-3'>
                <p className='rounded-3xl p-1 pt-2 text-lg  font-semibold bg-amber-200 text-gray-500  text-center '>
                    <span className='shadow-3xl p-3 bg-white rounded-lg text-2xl text-gray-800 mx-2 my-1  '>{assignments[0]?.length} </span>  Submitted
                </p> 
                {/* <p className='rounded-3xl p-1 pt-3 text-lg font-semibold text-gray-500 bg-green-200 text-center '>
                     
                </p> */}
                <p className='rounded-3xl p-1 pt-2 text-lg  font-semibold text-gray-500 bg-green-200 text-center  '>
                    <span className='shadow-3xl p-3 bg-white rounded-lg text-2xl text-gray-800 mx-2 my-1'>{assignments[1]?.length} </span>  Scored and Checked
                </p> 
                <div className=''></div>
            { assignments[0]?.map((assignment) => {
                return (
                    <div key={uuidv4()} className="flex flex-col col-span-1  h-72 rounded-lg drop-shadow-lg overflow-hidden my-2 bg-white relative" >
                        {/* <img className='h-3/5 object-cover overflow-hidden max-h-48' src={assignment.bgCardUrl}></img> */}
                        <AssignmentInfo  id={assignment.id} name={assignment.name} dataComment={assignment.comment} question={assignment.question} images={assignment.images } answer={assignment.answer} description={assignment.description} student={assignment.student} session={assignment.session} dataScore={assignment.score}   />
                        <div className='h-2/5 px-3'>
                            <p className='text-base mt-2 mb-0 pb-0 font-semibold text-black'>
                                {assignment.name}
                            </p>
                            <span className='text-sm font-light'>
                            question: {assignment.question.slice(0,140)} ...
                            </span>
                        </div>
                        <div className='absolute top-2 left-3 rounded-lg bg-yellow-300 p-2 text-black font-light text-sm'> Pending </div>

                    </div>)
            })}
            { assignments[1]?.map((assignment) => {
                return (
                    <div key={uuidv4()} className="flex flex-col col-span-1  h-72 rounded-lg drop-shadow-lg overflow-hidden my-2 bg-white relative" >
                        {/* <img className='h-3/5 object-cover overflow-hidden max-h-48' src={assignment.bgCardUrl}></img> */}
                        <AssignmentInfo  id={assignment.id} name={assignment.name} dataComment={assignment.comment} question={assignment.question} images={assignment.images } answer={assignment.answer} description={assignment.description} student={assignment.student} session={assignment.session} dataScore={assignment.score}   />
                        <div className='h-2/5 px-3'>
                            <p className='text-base mt-2 mb-0 pb-0 font-semibold text-black'>
                                {assignment.name}
                            </p>
                            <span className='text-sm font-light'>
                            question: {assignment.question.slice(0,140)} ...
                            </span>
                        </div>
                        <div className='absolute top-2 left-3 rounded-lg bg-green-300 p-2 text-black font-light text-sm'> scored </div>
                    </div>)
            })}
            </div>
        </div>
            
    )
}