import React, { useState, useEffect, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { baseUrl } from '../../Share';
import { Fragment } from 'react'
import Alert from '../Features/Alert';
import { motion } from 'framer-motion';

function Reading({ answer, instruction,  description, name, sessionID, exerciseID, bgCardUrl }) {
    let [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [image, setImage] = useState();
    const [imageUrls, setImgageUrls] = useState([]);
    const [loadingImg, setLoadingImg] = useState(false);
    const [accessment, setAccessment] = useState(
      {score:0,
      rawAnswer:[
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
    ]})
    const [exerciseLog, setExerciseLog]  = useState( JSON.parse(localStorage.getItem("exerciseLog")));
    const [isAlert, setIsAlert] = useState(false);
    const message = useRef('');
    const [alertTime, setAlertTime] = useState(0);
    const [confirmSubmit, setConfirmSubmit] = useState(false);

    // useEffect(() => {
    //   const beforeUnloadHandler = (event) => {
    //     event.preventDefault();
    //     event.returnValue = "";
    //     return "";
    //   };
  
    //   if (inputValue !== "") {
    //     window.addEventListener("beforeunload", beforeUnloadHandler);
    //   } else {
    //     window.removeEventListener("beforeunload", beforeUnloadHandler);
    //   }
    //   // Cleanup function to remove event listener when component unmounts
    //   return () => {
    //     window.removeEventListener("beforeunload", beforeUnloadHandler);
    //   };
    // }, [inputValue]);

    function closeModal() {
        setIsOpen(false)
    }
    function openModal() {
        setIsOpen(true)
    }
    function confirmSubmitting() {
      if (exerciseLog[exerciseID]){
        if(exerciseLog[exerciseID].length > 0 && confirmSubmit === false ) {
          setIsAlert(true);
          message.current = "Warning: You have already sumbmit the assignment!";
          setAlertTime((prev) => prev + 1);
        }
      }
      setConfirmSubmit(!confirmSubmit);
    }
    function TextToLinks(text){

      return <React.Fragment>
      {text.split('\n').map((paragraph, index) => {

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
                  <img src={paragraph.trim().slice(6)} className="h-70 w-auto rounded-md my-4" alt="img for assignment"/>
              );
          }
          else if ( paragraph.trim().startsWith('<audio/>')) {
            return (
                <>
                    <iframe className="mt-3" width="100%" height="166"  frameborder="no" allow="autoplay" src={paragraph.trim().slice(8)}></iframe>
                </>
               );

        }
          else {
              return <p key={index} className=" my-2 text-md py-0 ">{paragraph}</p>;
          }

      })}
      {/* <div className='my-0 text-md py-0'>{text}</div> */}
  </React.Fragment> 
  }

  
  const handleSubmitWork = () => {

    let score = 0;
    let incorrectAnswer = [];
    for( let i = 0; i < answer.length; i++){
      if(accessment.rawAnswer[i].toLowerCase() === answer[i].toLowerCase()){
        score += 1;
      }
      else{
        incorrectAnswer.push({index: i, rawAnswer: accessment.rawAnswer[i], correctAnswer: answer[i]})
      }
    }
    setAccessment({ ...accessment, score: score,  incorrectAnswer: incorrectAnswer})

   
    if( score === 0 ) {
      setIsAlert(true);
      message.current = "Remember not to submit empty answer or empty images of your work!";
      setAlertTime((prev) => prev + 1);
      return;
    }

    if (exerciseLog[exerciseID] === undefined) {
      dataPut[exerciseID] = [0];
    }
    let dataPut =  exerciseLog; 
    if( exerciseLog[exerciseID] === undefined) {
      dataPut[exerciseID] = [ Math.ceil( (score/answer.length) * 100)];
    }
    else if (exerciseLog[exerciseID]){
      dataPut[exerciseID].push( Math.ceil( (score/answer.length) * 100) );
    }

    const url = baseUrl + "api/profile/";
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
      body: JSON.stringify({ exerciseLog: dataPut }),
    })
      .then((response) => {
        if (response.status === 401) {
          console.log(response);
        } else if (response.ok === false) {
          console.log(response);
        }
      })
      .then(() => {
        setExerciseLog(dataPut);
        localStorage.setItem("exerciseLog", JSON.stringify(dataPut));
      });
    }
      
  
  
    return (
        <>
          {isAlert && <Alert message={message.current} dataValue={3} alertTime={alertTime} setIsAlert={setIsAlert}/>}
          
          <div className=" flex items-center z-70  justify-center">
            <button
              type="button"
              onClick={openModal}
              data-tooltip-content='Nhấp vào đây để rèn luyện từ vựng thôi!'
              data-tooltip-id="tooltip-vocab"
              className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
            >
              View Assignment
            </button>
            {/* <Tooltip id='tooltip-vocab' /> */}
          </div>
    
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
                    enter="ease-out duration-700"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-400"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full mx-6 transform h-screen   overflow-hidden rounded-2xl bg-white px-7 text-left align-middle shadow-xl transition-all">
                    <div className='grid grid-cols-6 gap-1'>

                      <div className='col-span-4 frid grid-cols-1 pt-4  gap-2 overflow-y-scroll h-screen py-10 px-4'>
                          {accessment.score !== 0 &&
                          <div className=''>
                            <div className='rounded-lg p-2   shadow-lg m-4 mt-10 '>
                                    <div className='p-4 text-sm font-light text-gray-600 bg-gray-200'>

                                        {accessment.incorrectAnswer.length > 4 && <p> Oh no! You need to improve your reading skill more. Below is the list of questions got wrong. Try hard to improve it next time!</p>}
                                        {(accessment.incorrectAnswer.length <= 4 && accessment.incorrectAnswer.length > 0  ) && <p> Good job! Your reading skill seem good today! But there might be some minor mistakes. Check out the list of words you might need to learn again. Good luck!</p>}
                                        {(accessment.incorrectAnswer.length ===0 ) && <p>  Exellent!  You make no mistake in the test! </p>}
                                    </div>
                                    <div className='grid grid-cols-7 text-xs mt-2 '>
                                        <div className=' p-1 text-center  content-center  border-1 border-gray-300'>
                                            <p>Question's index</p>
                                        </div>
                                        <div className=' p-1 col-span-3 text-center  content-center border-1 border-gray-300'>
                                            <p>Correct answer</p>
                                        </div>
                                        <div className=' p-1 col-span-3 text-center  content-center border-1 border-gray-300'>
                                            <p>Your answer</p>
                                        </div>

                                    {accessment.incorrectAnswer.map((item) => {return(
                                      <>
                                        <div className=' p-1 text-center  content-center  border-1 border-gray-300'>
                                            <p>{item.index+1}</p>
                                        </div>
                                        <div className=' p-1 col-span-3 text-center  content-center border-1 border-gray-300'>
                                            <p>{item.correctAnswer}</p>
                                        </div>
                                        <div className=' p-1 col-span-3 text-center  content-center border-1 border-gray-300'>
                                            <p>{item.rawAnswer}</p>
                                        </div>
                                      </>
                                    )})}
                                    <button onClick={()=>{closeModal()}} className='bg-yellow-200 rounded-lg p-2 my-2'> End Test</button>

                                    </div>



                                </div>
                            

                          </div>
                          }
                          <div className='bg-white text-xs rounded-lg shadow-lg p-2 py-4'>  {TextToLinks(instruction)}</div>

                        

                      </div>
          
                      <div className='col-span-2 mt-24 mx-3 overflow-y-scroll h-screen scroll-behavior-smooth scrollbar-thin scroll-hide'>
                          <p className='text-sm font-semibold  text-gray-800' > {description}
                          </p>
                          <div className='grid grid-cols-2'>
                            <p className='text-sm font-light'> Your previous attempts</p>
                            <p></p>
                            {exerciseLog[exerciseID]?
                            exerciseLog[exerciseID].map((score, index) =>{
                                return(
                                    <p key={index}
                                    //  className='text-sm border-1 border-gray-500 p-2 rounded-lg  font-ligt mx-3 text-black'
                                    className={`text-sm border border-gray-500 p-2 rounded-lg font-light mx-3 text-black ${
                                      score > 80
                                        ? 'bg-green-500'
                                        : score > 50
                                        ? 'bg-yellow-500'
                                        : score > 30
                                        ? 'bg-red-500'
                                        : 'bg-purple-500'
                                    }`}
                                      > {index + 1}: {score}/100</p>
                                )
                            }) : <div>No attempts yet</div>
                            }
                          </div>
                          <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mt-10"> {exerciseLog[exerciseID]? 'Submit another answer' : 'Your Answer' }</label>
                          <div className='flex flex-col w-full'>
                            {accessment.rawAnswer.map((space, index) => {
                              return (
                                <div key={index} className='flex flex-row gap-2 my-3 w-full'>
                                  <p className='text-xs text-gray-500'>{index + 1}</p>
                                  <textarea
                                    value={space}
                                    onChange={(e) => {
                                      const newRawAnswer = [...accessment.rawAnswer];
                                      newRawAnswer[index] = e.target.value;
                                      setAccessment({ ...accessment, rawAnswer: newRawAnswer });
                                    }}
                                    rows={1}
                                    className='border-1 text-xs p-1 w-full rounded-md'
                                  />
                                </div>
                              );
                            })}
                          </div>


                          
                          <div className="border-1 border-gray-200 w-full my-4"> </div>
                          <button
                              type="button"
                              className="inline-flex my-1 ml-3 justify-center rounded-md  border border-transparent bg-blue-100 px-4 py-2 text-base  text-purple-900 hover:bg-green-300 hover:scale-105 duration-300   "
                              onClick={confirmSubmitting}
                              >
                              Submit Work
                          </button>
                          {confirmSubmit && 
                          <motion.button
                              initial={
                                {
                                    opacity:0,
                                    x: '40vw',
                                }
                            }
                            animate={{opacity:0.9, x:0,}}
                            transition={{delay: 0, duration: 1.4}}
                              type="button"
                              className="inline-flex my-1 ml-3 justify-center rounded-md  border border-transparent bg-blue-100 px-4 py-2 text-base  text-purple-900 hover:bg-yellow-200 hover:scale-105 duration-300   "
                              onClick={handleSubmitWork}
                              >
                              Confirm Submit Exercise
                          </motion.button>
                          }
                          <div className="border-1 border-gray-200 w-full my-4"> </div>

                          <button
                              type="button"
                              className="inline-flex my-1 ml-3 justify-center rounded-md  border border-transparent bg-blue-100 px-4 py-2 text-base  text-purple-900 hover:bg-yellow-300 hover:scale-105 duration-300   "
                              onClick={closeModal}
                              >
                              Quit Exercise!
                          </button>

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

export default Reading;
