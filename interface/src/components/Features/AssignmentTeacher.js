
import { useState } from 'react'
import { baseUrl } from '../../Share'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import AssignmentInfo from "./AssignmentInfo"
import { useEffect } from "react"

export default function AssignmentTeacher(){  
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
                    <p className='text-sm text-gray-600 font-light p-0 mb-7 mx-1'> Where teacher can score and comment on students' Works </p>
                    <button className='rounded-3xl bg-color-accent text-white text-sm p-2  mb-2 max-w-24'>Learn more</button>
                    <button
                        className='bg-yellow-400 rounded-lg p-2 text-md font-semibold max-w-48 hover:bg-yellow-200 hover:text-sm duration-150 shadow-lg' 
                        onClick={  ()=>{ setAssignments( [assignments[1], assignments[0]] )       }    }
                    > Switch Order </button>

                </div>
                <img className=" max-h-80 absolute  -top-10 -right-20"  src='/workingMan.png'></img>


            </div>
           


            { assignments[0]?.map((assignment) => {
                return (
                <div key={uuidv4()} className="grid grid-cols-8 gap-1 rounded-lg drop-shadow-lg my-2 bg-white" >
                            <div className="col-span-1 flex items-center pl-4 " >
                                <p className="text-sm text-black font-bold">{assignment.student}</p>
                            </div>
                            
                            <div className="col-span-1  text-sm   flex items-center  ">
                                {assignment.score === 0 && <div className="text-sm text-yellow-400">Turned in- <br/> -not scored</div>}
                                {assignment.score !== 0 && <div className="text-sm text-green-400">Scored</div>}
                            </div>

                            <div className="col-span-3 ml-5 ">
                                
                                <p
                                data-tooltip-content='📜Session Overview'
                                data-tooltip-id="tooltip-student"
                                    className="text-xl font-extrabold text-color-secondary mt-2 mb-0">{assignment.name}</p>
                                <p
                                data-tooltip-content=' 🎯Session Topics'
                                data-tooltip-id="tooltip-student"
                                data-tooltip-place="bottom"
                                className="text-xs  text-color-secondary">{assignment.session}</p>
                            </div>
                            {assignment.score !== 0  &&
                                <div className="text-sm text-black flex items-center ">
                                    Grade  <strong >: {assignment.score}/100</strong>
                                </div>
                            }
                            {/* {assignment.score === 0  &&
                                <div className="text-sm text-black flex items-center ">
                                    View asignment <br/> to Score 
                                </div>
                            } */}
                            <button className=" rounded-full ">
                                <AssignmentInfo setAssignments={setAssignments}  id={assignment.id} name={assignment.name} dataComment={assignment.comment} question={assignment.question} images={assignment.images } answer={assignment.answer} description={assignment.description} student={assignment.student} session={assignment.session} dataScore={assignment.score}   />
                            </button>
                            <button onClick={() => {navigate('/workspace/session/' + assignment.session.split("-")[0]  )}} className=" col-span-2 rounded-lg bg-gray-300 p-1 m-4 mt-4 border-color-primary-dark font-light hover:text-white duration-500 hover:p-2"> Open session </button>
                                
                            
                        </div>)
                        
                    
                })}
            { assignments[1]?.map((assignment) => {
                return (
                <div key={uuidv4()} className="grid grid-cols-8 gap-1 rounded-lg drop-shadow-lg my-2 bg-white" >
                            <div className="col-span-1 flex items-center pl-4 " >
                                <p className="text-sm text-black font-bold">{assignment.student}</p>
                            </div>
                            
                            <div className="col-span-1  text-sm   flex items-center  ">
                                {assignment.score === 0 && <div className="text-sm text-yellow-400">Turned in- <br/> -not scored</div>}
                                {assignment.score !== 0 && <div className="text-sm text-green-400">Scored</div>}
                            </div>

                            <div className="col-span-3 ml-5 ">
                                
                                <p
                                data-tooltip-content='📜Session Overview'
                                data-tooltip-id="tooltip-student"
                                    className="text-xl font-extrabold text-color-secondary mt-2 mb-0">{assignment.name}</p>
                                <p
                                data-tooltip-content=' 🎯Session Topics'
                                data-tooltip-id="tooltip-student"
                                data-tooltip-place="bottom"
                                className="text-xs  text-color-secondary">{assignment.session}</p>
                            </div>
                            {assignment.score !== 0  &&
                                <div className="text-sm text-black flex items-center ">
                                    Grade  <strong >: {assignment.score}/100</strong>
                                </div>
                            }
                            {/* {assignment.score === 0  &&
                                <div className="text-sm text-black flex items-center ">
                                    View asignment <br/> to Score 
                                </div>
                            } */}
                            <button className=" rounded-full ">
                                <AssignmentInfo  setAssignment={setAssignments} name={assignment.name} dataComment={assignment.comment} question={assignment.question} images={assignment.images } answer={assignment.answer} description={assignment.description} student={assignment.student} session={assignment.session} dataScore={assignment.score}   />
                            </button>
                            
                            <button onClick={() => {navigate('/workspace/session/' + assignment.session.split("-")[0]  )}} className="  rounded-lg bg-gray-300 p-1 m-4 mt-4 text-xs border-color-primary-dark font-light hover:text-white duration-500 hover:p-2"> Open session </button>

                                
                            
                        </div>)
                        
                    
                })}
        </div>
    )
}