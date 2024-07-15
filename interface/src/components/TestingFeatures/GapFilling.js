import React, { useState, useEffect, useRef } from 'react';
import { Dialog } from '@headlessui/react';
import { Fragment } from 'react'
import { motion } from 'framer-motion';
import { Transition } from '@headlessui/react';
import { baseUrl } from '../../Share';

export default function GapsFilling({ answer, question,  description, name, sessionID, exerciseID, bgCardUrl }) {
    let [isOpen, setIsOpen] = useState(false);
    const [confirmSubmit, setConfirmSubmit] = useState(false);
    const [questions, setQuestions] = useState(null)
    const [result, setResult] = useState(0);
    const [randList, setRandList] = useState([])
    const [options, setOptions] = useState();
    const [exerciseLog, setExerciseLog]  = useState( JSON.parse(localStorage.getItem("exerciseLog")));
    const [state, setState] = useState([])
    

    useEffect(()=>{
      console.log(state, 'state')
      
    },[state])

    useEffect(()=>{
      let list = answer;
      list.sort(() => Math.random() - 0.5)
      setRandList(list)
      setQuestions( question.split('...') )
      let raw = []
      question.split('...').map((item, index) =>{ 
        if(index !== question.split('...').length-1){
          raw.push('');
        }
      })
      setState(raw)
      setOptions(answer)
    },[answer])
    function restart() {
      let raw = []
      question.split('...').map((item, index) =>{ 
        if(index !== question.split('...').length-1){
          raw.push('');
        }
      })
      setState(raw);
      setResult(0);

    }

    function closeModal() {
        setIsOpen(false)
    }
    function openModal() {
        setIsOpen(true)
    }
    function confirmSubmitting() {
      setConfirmSubmit(!confirmSubmit);
    }
    const handleSubmitWork = () =>{
      let result  = 0;
      console.log(answer, state, question)
      for(let i = 0; i<state.length; i++){
        if(answer[i] === state[i]){
          result += 1;
        }
      }
      if(result === 0 ) result = -1;
      setResult(result);
      setConfirmSubmit(!confirmSubmit)
      let dataPut =  exerciseLog; 
        if( exerciseLog[exerciseID] === undefined) {
            dataPut[exerciseID] = [ Math.ceil( (result/state.length) * 100)];
        }
        else if (exerciseLog[exerciseID]){
            dataPut[exerciseID].push(Math.ceil((result/state.length)* 100));
        }
        const url = baseUrl + 'api/profile/';
        fetch(url, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.getItem('access'),},
            body: JSON.stringify({exerciseLog: dataPut}),    
        }).then((response) => {
            if(response.status=== 401)
            {
              console.log(response)
            }
            else if(response.ok=== false )
            {
              console.log(response)
            }
            else console.log(response)
        }).then((data) => {
           setExerciseLog(dataPut);
           console.log(dataPut)
           localStorage.setItem('exerciseLog',JSON.stringify(dataPut));
        })
      }
    return (
        <>
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

                      <div className='mockup-window border col-span-4 frid grid-cols-1 pt-4  gap-2 overflow-y-scroll h-screen py-10 px-4'>
                    
                      {result !== 0 &&
                      <div className='col-span-4'>
                        <div className="flex justify-center items-center min-h-screen">
                        <div className="bg-gray-400 p-6 rounded-lg shadow-lg">
                            <h1 className="text-2xl font-bold mb-4"> End of Gap Filling Homework! </h1>
                            <div className='p-2'>
                                <span className="text-right font-semibold mb-2 bg-purple-300 rounded-lg p-2"> 
                                Your Vocab Score: { result === -1 ? '0' : result }/{state.length}
                                </span>
                            </div>
                            <div className="my-4" id="result"> 
                            <p className='text-sm'> - Click the black button to quit
                              <br/>- But remember to notedown and understand everywords in the previous part before quitting!
                              <br/>- Click on "Play again" if you want to be stronger! 
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
                    </div>
                    </div>}
                    {result === 0  && 
                    <div className='flex flex-col'>
                      <div className=' flex flex-row'>
                        {options?.map((item)=>{return(
                          <div className='bg-white m-2 rounded-lg shadow-lg text-md font-light'>
                            {item}
                          </div> 
                        )})}
                      </div>
                      <div className='bg-white'>
                        <p className='p-1 '>
                          {questions?.map((question, index)=>{return(
                            <>
                              <span>{question}</span>
                              {index !== questions.length - 1 && 
                              <select 
                              className=" mx-2 border-b-black min-w-32"
                              onChange={(e)=>{
                                const updatedAnswerList = [...state];
                                const updatedValue = e.target.value;
                                updatedAnswerList[index] = updatedValue;
                                setState(updatedAnswerList);
                                const filteredList = randList.filter((item) => !updatedAnswerList.includes(item));
                                setOptions(filteredList);
                                console.log(updatedAnswerList, updatedValue, index, state);
                              }}
                              
                              >
                                  <option value='Select option' className='text-gray-100'> ........................... </option>
                                {randList.map((item, i) => (
                                  <option key={i} value={item} disabled={state.includes(item)} className={state.includes(item)? 'text-gray-200': 'text-black'} >{item}</option>
                                ))}
                              </select>
                              
                              }
                            </>
                          )})}
                        </p>
                      </div>

                    </div>
                    }

                      </div>
          
                      <div className='col-span-2 mt-24 mx-3 overflow-y-scroll h-screen scroll-behavior-smooth scrollbar-thin scroll-hide'>
                          <p className='text-sm font-semibold  text-gray-800' > {description}
                          </p>
                          <div className='grid grid-cols-2'>
                            <p className='text-sm font-light'> Your previous attempts</p>
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
                          {result === 0 && 
                          <button
                              type="button"
                              className="inline-flex my-1 ml-3 justify-center rounded-md  border border-transparent bg-blue-100 px-4 py-2 text-base  text-purple-900 hover:bg-green-300 hover:scale-105 duration-300   "
                              onClick={confirmSubmitting}
                              >
                              Submit Work
                          </button>
                          } 
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









