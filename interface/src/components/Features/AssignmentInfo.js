import React, { useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react'
import { baseUrl } from '../../Share';
import { Link } from 'react-router-dom';
function AssignmentInfo({ setAssignments, id, name, dataComment='!@#$', question, description, answer, images, student, session, dataScore}) {

  // instruction,  description, name, sessionID, exerciseID
    let [isOpen, setIsOpen] = useState(false);
    const [comment, setComment] = useState(dataComment.split('!@#$')[0]);
    const [docsLink, setDocsLink] = useState(dataComment.split('!@#$')[1]);
    const [score, setScore] = useState(dataScore);
    const [imageUrls, setImgageUrls] = useState(images.split("|"));
    useEffect(() => {
      const beforeUnloadHandler = (event) => {
        event.preventDefault();
        // Chrome requires returnValue to be set
        event.returnValue = "";
        // Return a message (not necessary in modern browsers)
        return "";
      };
  
      if (comment !== "") {
        window.addEventListener("beforeunload", beforeUnloadHandler);
      } else {
        window.removeEventListener("beforeunload", beforeUnloadHandler);
      }
      // Cleanup function to remove event listener when component unmounts
      return () => {
        window.removeEventListener("beforeunload", beforeUnloadHandler);
      };
    }, [comment]);

    
    function closeModal() {
        setIsOpen(false)
    }
    function openModal() {
        setIsOpen(true)
    }
    function TextToLinks(text){
      if(!text) return (<></>)

      return <React.Fragment>
      {text?.split('\n').map((paragraph, index) => {

          if (paragraph.trim().startsWith('https://') || paragraph.trim().startsWith('http://')) {
              // If the paragraph is a URL, return it as an anchor tag
              return (
                  <a key={index} href={paragraph.trim()} className="text-gray-700" target="_blank" rel="noopener noreferrer">
                      NZEC Link
                  </a>
              );
          }
          else if (paragraph.trim().startsWith('<img/>')) {
              return (
                  <img src={paragraph.trim().slice(6)} className="h-70 w-auto" alt="img for assignment"/>
              );
          }
          else {
              return <p key={index} className="my-0 py-0">{paragraph}</p>;
          }
      })}
  </React.Fragment> 
      
    }
    const handleSubmitWork = () => {
      const url = baseUrl + "api/assignment/";
      let newComment = comment + '!@#$' + docsLink 
    
      let data = {
        id: id,
        score: score,
        comment: newComment,
      };
      console.log(data);
    
      fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access"),
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.status === 401) {
            console.log(response);
          } else if (response.ok === false) {
            console.log(response);
          } else {
            return  response.JSON()
            // let dataPut = exerciseLog;
            // if (exerciseLog[exerciseID] === undefined) {
            //   dataPut[exerciseID] = [0];
            // }
            // const url = baseUrl + "api/profile/";
            // fetch(url, {
            //   method: "PUT",
            //   headers: {
            //     "Content-Type": "application/json",
            //     Authorization: "Bearer " + localStorage.getItem("access"),
            //   },
            //   body: JSON.stringify({ exerciseLog: dataPut }),
            // })
            //   .then((response) => {
            //     if (response.status === 401) {
            //       console.log(response);
            //     } else if (response.ok === false) {
            //       console.log(response);
            //     }
            //   })
            //   .then(() => {
            //     setExerciseLog(dataPut);
            //     localStorage.setItem("exerciseLog", JSON.stringify(dataPut));
            //   });
            // return response.json();
          }
        })
        .then((data) => {
          console.log(data);

          closeModal();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
        closeModal();
    };
   
    
    return (
        <>
            {localStorage.getItem('role') !== "Student" && 
          <div className=" flex items-center  justify-center">
            <button
              type="button"
              onClick={openModal}
              className="rounded-md flex items-center   px-1 py-1 text-sm font-medium text-gray-800 hover:bg-black/30 hover:bg-gray-200 ease-linear hover:scale-105 duration-300"
            >
                <p>
                    View Assignment   
                </p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
                </svg>
            </button>
          </div>
            }
          {localStorage.getItem('role') === "Student" && 
            
            <img className=' w-auto h-3/5 object-cover cursor-pointer ' onClick={openModal} src="https://img.freepik.com/free-photo/workplace-with-open-notebook_1101-349.jpg?t=st=1709636664~exp=1709640264~hmac=e0b68f45114336a69e6d5ed40f4f271a4c89bb40012373021542a842501ac5bb&w=826"></img>
          }
            
    
          <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10 h-screen" onClose={closeModal}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black/25" />
              </Transition.Child>
    
              <div className="fixed inset-0  overflow-scroll">
            <div className="flex items-center  justify-center px-4 py-2 text-center ">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full mx-6 transform h-screen overflow-hidden rounded-2xl bg-white px-7 text-left align-middle shadow-xl transition-all">
                    <div className='grid grid-cols-6 gap-1'>

                      <div className='col-span-4 frid grid-cols-1 pt-4  gap-2 overflow-y-scroll h-screen py-10 px-4'>
                          <div className='bg-white rounded-lg shadow-lg p-2 text-md  my-2 '>Assignment title: <span className='font-semibold capitalize'> {name} </span> </div>
                          <div className='bg-white text-sm rounded-lg shadow-lg p-2'>  {TextToLinks(question)}</div>
                          <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mt-10">Answer </label>
                          <p className="border-gray-300 border rounded-md p-2 py-8 w-full text-xs text-gray-800 mb-4 resize-none">
                            {answer}
                          </p>
                          {(imageUrls.length !== 0 && imageUrls[0] !== '') && 
                          <div className="grid grid-cols-2 gap-1">  
                            {imageUrls.map((image)=> 
                            <div className='relative'>
                              <img src={image} alt="image" className='rounded-lg h-48 w-auto object-cover' />
                            </div>
                            )}
                          </div>}
                          {(imageUrls.length === 0 || imageUrls[0] === '') && 
                          <div className="text-sm font-light gap-1">
                            Student submit no image!
                          </div>}

                          <div className='flex flex-row gap-2 mt-10'>
                            {localStorage.getItem('role') !== "Student" &&
                              <button
                                  type="button"
                                  className="inline-flex ml-1 justify-center rounded-md duration-500 border border-transparent bg-blue-100 px-4 py-2 text-base  text-purple-900 hover:bg-green-300   "
                                  onClick={
                                    handleSubmitWork
                                  }


                                  >
                                  Return your assessment!
                              </button>
                            }

                          <button
                              type="button"
                              className="inline-flex  ml-1 justify-center rounded-md duration-500 border border-transparent bg-blue-100 px-4 py-2 text-base  text-purple-900 hover:bg-yellow-300   "
                              onClick={closeModal}
                              >
                              Quit!
                          </button>

                          </div>

                      </div>
          
                      <div className='col-span-2 mt-24 mx-3 px-2  overflow-y-scroll h-screen'>
                          <div className='rounded-lg my-1 p-2 text-bold bg-gray-100 border-gray-300 border'> {student} - {session.split("-")[1]} - Session {session.split("-")[0]} <br/> {description} </div>
                         
                          {localStorage.getItem('role') !== "Student" && 
                          <div className='rounded-lg p-2 text-sm '> 
                            <label htmlFor="score" className="block text-md font-medium text-gray-700"> Score <span className='font-light text-sm'>(base 100)</span> </label>
                            <input 
                            id='score'
                            name='score'
                            value = {score }
                            type='number'
                            max={100}
                            min={0}
                            onChange={(e)=>{
                              if (e.target.value <= 100 && e.target.value >= 0) {
                                setScore(e.target.value);
                              }
                            }}
                            className='text-black  p-2 rounded-lg border-1 text-sm w-32 bg-gray-100 border-black'
                            />
                           </div>
                          }
                          {
                            (localStorage.getItem('role')=== "Student" && score === 0 ) && 
                            <div 
                            className='text-black  p-2 rounded-lg border-1 text-sm w-32 bg-yellow-100 border-black'
                            >
                              Assignment being assessed by Teacher!
                            </div>
                          }
                          {
                            (localStorage.getItem('role')=== "Student" && score !== 0 ) && 
                            <div 
                            className='text-black  p-2 rounded-lg border-1 text-sm w-32 bg-green-100 border-black'
                            >
                              {score}/100
                            </div>
                          }

                          <div className="border-1 border-gray-200 w-full my-2"> </div>
                          {localStorage.getItem('role') !== "Student" && <>
                            <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mt-1"> Teacher's comment </label>
                            <textarea
                                name="answer"
                                id="answer" 
                                type="text" onChange={(e)=>{ setComment(e.target.value) } } value={comment}  placeholder='Your comment'
                                className="border-gray-300 border rounded-md p-2 w-full text-xs text-gray-800 mb-4 resize-none"
                                rows={20} 
                            />
                            <a href="https://docs.google.com/document/u/0/create?usp=dot_new" target="_blank" rel="noopener noreferrer">New docs</a>

                            <label htmlFor="docs" className="block text-sm font-medium text-gray-700 mt-2"> Teacher's assessment by Docs </label>
                            <textarea
                                name="docs"
                                id="docs"
                                type="text"  onChange={(e)=>{  setDocsLink(e.target.value)}} value={docsLink}  placeholder='Google/Word Document Link'
                                className="border-gray-300 border rounded-md p-2 w-full text-xs text-gray-800 mb-4 resize-none"
                                rows={10} 
                            />
                          </>}
                          {localStorage.getItem('role') === "Student" && <>
                            <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mt-1"> Teacher's comment </label>
                            <textarea
                                name="answer"
                                id="answer" 
                                type="text"  value={comment}  placeholder='Your comment'
                                className="border-gray-300 border rounded-md p-2 w-full text-xs text-gray-800 mb-4 resize-none"
                                rows={20} 
                            />
                            <label htmlFor="docs" className="block text-sm font-medium text-gray-700 mt-2"> Teacher's assessment by Docs </label>
                            <div className='"border-gray-300 border rounded-md p-2 w-full text-xs text-gray-800 mb-4 resize-none'>
                              {TextToLinks(docsLink)}

                            </div>
                            <textarea
                                name="docs"
                                id="docs"
                                type="text" value={""}  
                                className=" rounded-md p-2 w-full text-xs text-gray-800 mb-4 resize-none"
                                rows={10} 
                            />
                            
                          </>}
                          

                          
                          
                          
                      </div>
                    </div>
                      
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </>
      )
    
}
export default AssignmentInfo;