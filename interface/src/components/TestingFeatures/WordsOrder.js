import React, { useState, useEffect, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { baseUrl } from '../../Share';
import { Fragment } from 'react'
import Alert from '../Features/Alert';
import { motion } from 'framer-motion';
import { Reorder } from "framer-motion"

export default function WordsOrder({ answer, description, name, sessionID, exerciseID, bgCardUrl }) {
    let [isOpen, setIsOpen] = useState(false);
   
    
    const [exerciseLog, setExerciseLog]  = useState(JSON.parse(localStorage.getItem("exerciseLog")));
    const [isAlert, setIsAlert] = useState(false);
    const message = useRef('');
    const [alertTime, setAlertTime] = useState(0);
    const [confirmSubmit, setConfirmSubmit] = useState(false);
    const [questions, setQuestions] = useState(null)
    const [result, setResult] = useState(0);

    useEffect(()=>{
      let list = [];
      answer.forEach((question) => {
      list.push(question.split(' ').sort(() => Math.random() - 0.5));
    });
    setQuestions(list);
    console.log(list);
    },[answer])

    useEffect(()=>{
      console.log(questions)
    },[questions])

    function closeModal() {
        setIsOpen(false)
    }
    function openModal() {
        setIsOpen(true)
    }
    function confirmSubmitting() {
      setConfirmSubmit(!confirmSubmit);

      
    }
  
    const handleReorder = (newOrder, questionIndex) => {
      const newQuestions = [...questions]
      newQuestions[questionIndex] = newOrder
      setQuestions(newQuestions)
    }
  const restart = () =>{

    setResult(0);
    let list = [];
      answer.forEach((question)=>{
        list.push(question.split(' ').sort(() => Math.random() - 0.5))
      })
    setQuestions(list)
    setConfirmSubmit(false)
    
  }

  const handleSubmitWork = () => {

    let score = 0;

    questions.forEach((question, index)=>{
      if(question.join(' ') === answer[index]){
        score += 1;
      }
    })

    if( score === 0 ) {
      setIsAlert(true);
      message.current = "Remember to do your work before submitting the homework!";
      setAlertTime((prev) => prev + 1);
      return;
    }
    setResult(score)

    let dataPut =  exerciseLog; 
    
    if(exerciseLog[exerciseID] === undefined) {
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
          
          <div className=" flex items-center   justify-center z-10">
            <button
              type="button"
              onClick={openModal}
              data-tooltip-content='Nhấp vào đây để rèn luyện từ vựng thôi!'
              data-tooltip-id="tooltip-vocab"
              className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
            >
              Do Homework
            </button>
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
                        {/* <div className='bg-white text-xl font-semibold rounded-lg shadow-lg p-2 py-4 '>
                        {instruction} :
                      </div> */}
                        {result !== 0 &&
                      <div className='col-span-4'>
                        <div className="flex justify-center items-center min-h-screen flex-col">
                        <div className="bg-gray-400 p-6 rounded-lg shadow-lg">
                            <h1 className="text-2xl font-bold mb-4">Result for your homework! </h1>
                            <div className='p-2' >
                                <span className="text-right font-semibold mb-2 bg-purple-300 rounded-lg p-2"> 
                                Your Score: { result }/{answer.length}
                                </span>
                            </div>
                            <div className="my-4" id="result"> 
                            <p className='text-sm'>
                              <br/>- Click on "Play again" if you want to do it again! 
                            </p>
                            </div>
                            <div className="flex justify-between">
                              <button
                                  type="button"
                                  className="bg-red-400 text-purple-900 mx-2  duration-500 px-4   border border-transparent rounded-lg hover:bg-red-300 hover:scale-95 hover:text-gray-800"
                                  onClick={restart}
                              >
                                  Play Again!
                              </button>
                              <button
                              type="button"
                              className="  ml-1 justify-center rounded-md duration-500 border border-transparent bg-blue-100 px-4  text-base  text-purple-900 hover:scale-95 hover:bg-yellow-300 "
                              onClick={closeModal}
                              >
                              Quit
                              </button>
                            </div>
                        </div>
                        
                        {questions?.map((items, questionIndex) => (
                          <div
                          >
                            { items.join(' ') === answer[questionIndex] &&
                            <div className='bg-white text-green-500 font-light text-xs rounded-lg shadow-lg p-2 py-4 flex flex-row my-3'>
                             {items.join(' ')}
                            </div>
                            }
                            { items.join(' ') !== answer[questionIndex] &&
                            <>
                              <div className='bg-white  text-red-400 min-w-96  font-light text-xs rounded-lg shadow-lg p-2 py-4 flex flex-col my-3'>
                                <p>
                                {items.join(' ')} 
                                </p>
                                <p className='text-green-300'> -- {answer[questionIndex]}</p>
                              </div>
                            </>
                            
                            }
                          </div>
                        ))}
                        
                    </div>
                    </div>}
                    {result === 0  && 
                    <>
                      {questions?.map((items, questionIndex) => (
                              <Reorder.Group as='div'
                                key={questionIndex}
                                axis="x"
                                values={items}
                                onReorder={(newOrder) => handleReorder(newOrder, questionIndex)}
                              >
                                <div className='bg-white text-xs rounded-lg shadow-lg p-2 py-4 flex flex-row my-3'>
                                  {items.map((item) => (
                                    <Reorder.Item as='div' className='text-lg mx-2 font-light' key={item} value={item}>
                                      {item}
                                    </Reorder.Item>
                                  ))}
                                </div>
                              </Reorder.Group>
                            ))}
                    </>
                    }

                          
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


