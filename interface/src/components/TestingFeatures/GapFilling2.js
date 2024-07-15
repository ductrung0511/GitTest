import React, { useEffect, useState } from 'react';
import {v4 as uuidv4} from 'uuid'
import { Dialog } from '@headlessui/react';
import { Fragment } from 'react';
import { motion } from 'framer-motion';
import { Transition } from '@headlessui/react';

const PassageFill = ({ answer, question,  description, name, sessionID, exerciseID, bgCardUrl }) => {
  let [isOpen, setIsOpen] = useState(false);
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const [dropIndicator, setDropIndicator] = useState();
  const [exerciseLog, setExerciseLog]  = useState( JSON.parse(localStorage.getItem("exerciseLog")));
  const [words, setWords] = useState( 
    // [["Yes","No","No","No"], ["Yes","No","No","No"], ["Yes","No","No","No"], ["Yes","No","No","No"]]
    answer
  );
  const [answerList, setAnswerList] = useState(['','','',''])
  const [result, setResult] = useState(0)
  useEffect(()=>{
    console.log(question, answer, description, 'drag', question.split('\n'))
    let list = []
    question.split('\n').map((question)=> {
      list.push("")
    })
    setAnswerList(list);
  },[])
  const [questions, setQuestions] = useState(question.split('\n'));

  useEffect(()=>{
    console.log(dropIndicator, 'drop')
  },[dropIndicator])

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
    let score = 0;
    for( let i =0; i < answer.length; i++){
      console.log(answer[i][0], answerList[i],'-')
      if(answer[i][0] === answerList[i])
        {
          score += 1;
        }
    }
    setResult(score);
    console.log(answerList, answer, result)
  }    
  const onDragStart = (e, word) => {
    e.dataTransfer.setData("text/plain", word);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    console.log(e.currentTarget.id, 'id in dragOver')
    setDropIndicator(e.currentTarget.id); // currentTarget
  };
  const handleDragStart = (e , text) => {
    e.dataTransfer.setData("text/plain", text);
  };
  const handleDragEnd = (e) => {
    e.dataTransfer.clearData();
    setDropIndicator(null);
  };
  const handleDrop = (e, id) => {
    e.preventDefault();
    setDropIndicator(id);
    const text = e.dataTransfer.getData("text/plain");
    console.log(text, id, answerList)
    if(words[id].includes(text)){
      let list = answerList;
      list[id] = text;
      setAnswerList(list)
      setDropIndicator(null);
    }
  };

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

                <div className=' col-span-4 frid grid-cols-1 pt-4  gap-2 overflow-y-scroll h-screen py-10 px-4'>
              
               
              {result === 0  && 
              <div className="container mx-auto p-4 gap-4">
                {question?.split('\n').map((segment, index) => {
                  return(
                    <div className='flex flex-col'>
                      <div className='flex flex-row'>
                        <p className=''>
                          {index + '. '} 
                          
                          {segment.split('....')[0 ]} 
                          <span
                          id={index}
                          onDragOver={handleDragOver}
                          onDrop={(e) => handleDrop(e, index )}
                          className={` mx-1 py-1 rounded-lg px-10 border-1 border-gray-200 ${
                            dropIndicator === index ? "bg-blue-200" : "bg-yellow-100 "
                          }
                          `} 
                          >
                            {answerList[index]}
                          </span>
                          {segment.split('....')[1]}
                        </p>
                      </div>
                      <div className='flex flex-row justify-between'>
                        {words[index].map( (answer)=>{
                          if(answerList[index] === answer ) return;
                          else return(
                          <p 
                          key={uuidv4()}
                          className='bg-green-100 rounded-lg shadow-lg border-1 px-7 border-gray-200'
                          draggable
                          onDragStart={(e) => handleDragStart(e, answer)}
                          onDragEnd={handleDragEnd}
                          >{answer}</p>
                        )})}
                      </div>
                    </div>
                  )
                })}
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



    
  );
};
export default PassageFill;
