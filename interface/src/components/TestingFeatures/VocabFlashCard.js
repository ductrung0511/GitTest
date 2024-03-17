import React, { useState, useEffect, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import { baseUrl } from '../../Share';
import { Fragment } from 'react'
import {v4 as uuidv4} from 'uuid'
import { Tooltip } from 'react-tooltip';
function VocabFlashCard( {vocabList, instruction, exerciseID}) {
    let [isOpen, setIsOpen] = useState(false);
    const [list, setList] = useState(vocabList);

    const [done, setDone] = useState(false);
    const replay = useRef(0);
    
    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }
    const handleSubmitVocab= () => {

      //console.log( setExerciseLog, questionsData, instruction, exerciseLog, exerciseID , "before submit EX log");
      let dataPut =  JSON.parse(localStorage.getItem('exerciseLog')); 
      console.log(dataPut, exerciseID, "hello");

      if( dataPut[exerciseID] === undefined) {
          dataPut[exerciseID] = [ Math.ceil((  ( vocabList.length - (replay.current -vocabList.length)) /vocabList.length) * 100)];
      }
      else if (dataPut[exerciseID]){
          dataPut[exerciseID].push( Math.ceil(( ( vocabList.length - (replay.current -vocabList.length)) /vocabList.length) * 100));
      }
      const url = baseUrl + 'api/profile/';
      fetch(url, {
          method: "PUT",
          headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.getItem('access'),},
          body: JSON.stringify({exerciseLog: dataPut}),    
      }).then((response) => {
          //console.log(response );
          if(response.status === 401)
          {
              console.log(response)
          }
          else if(response.ok === false )
          {
              console.log(dataPut, exerciseID, "hello");
              localStorage.setItem('exerciseLog', JSON.stringify(dataPut));

          }
      }).then((data) => {
          
        
      })
      
      closeModal();
  }
    const handleEasy = (word) =>{
      let newList = list.filter((vocab) => { return vocab.word !== word} )
      setList(newList);
      if(newList.length === 0 )  setDone(true);
    }
    const restart = () =>{
      replay.current =0;
      setList(vocabList);
      setDone(false);
    }
    // if(done){
    //   return <div className='col-span-4'>
        
            
    //             <div className="flex justify-center items-center min-h-screen">
    //             <div className="bg-white p-6 rounded-lg shadow-lg">
    //                 <button className='text-white px-4 py-1 bg-gray-300 rounded-lg flex flex-row items-center gap-2 mb-4'> 
    //                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
    //                     <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
    //                     </svg>
    //                     Copy Exercise Link
    //                 </button>
    //                 <h1 className="text-2xl font-bold mb-4">Quiz Game</h1>
    //                 <div className='p-2' >
    //                     <span className="text-right font-semibold mb-2 bg-purple-300 rounded-lg p-2"> 
    //                     Your Score: { ( vocabList.length - (replay.current -vocabList.length)) }/{vocabList.length}
    //                     </span>
    //                 </div>
    
    //                 <div className="mb-4" id="result"></div>
    //                 <div className="flex justify-between">
    //                     <button
    //                         onClick={handleSubmitVocab}
    //                         type="button"
    //                         className="bg-purple-500 text-purple-950 duration-500 px-4 py-2 border  border-transparent rounded-lg mr-2 hover:bg-green-300 hover:text-gray-800"
    //                     >
    //                         Submit!
    //                     </button>
    //                     <button
    //                         type="button"
    //                         className="bg-purple-500 text-purple-900  duration-500 px-4 py-2  border border-transparent rounded-lg hover:bg-red-300 hover:text-gray-800"
    //                         onClick={restart}
    //                     >
    //                         Play Again!
    //                     </button>
    //                 <button
    //                 type="button"
    //                 className="inline-flex  ml-1 justify-center rounded-md duration-500 border border-transparent bg-blue-100 px-4 py-2 text-base  text-purple-900 hover:bg-yellow-300   "
    //                 onClick={closeModal}
    //                 >
    //                 Quit
    //                 </button>
                
    //                 </div>
    //             </div>
    //         </div>
    //         </div>
    
    
    return (
        <>
          <div className=" flex items-center z-70  justify-center">
            <button
              type="button"
              onClick={openModal}
              data-tooltip-content='Nhấp vào đây để rèn luyện từ vựng thôi!'
              data-tooltip-id="tooltip-vocab"
              className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
            >
              View Vocabulary List
            </button>
            <Tooltip id='tooltip-vocab' />


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
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full mx-6 transform h-screen   overflow-hidden rounded-2xl bg-white px-7 text-left align-middle shadow-xl transition-all">


                    <div className='grid grid-cols-6 gap-1'>



                    


                    <div className='col-span-4 grid  grid-cols-5 pt-4  gap-2 overflow-y-scroll h-screen py-10 px-4'>
                    {done &&
                      <div className='col-span-4'>
                        <div className="flex justify-center items-center min-h-screen">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <button className='text-white px-4 py-1 bg-gray-300 rounded-lg flex flex-row items-center gap-2 mb-4'> 
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                                </svg>
                                Copy Exercise Link
                            </button>
                            <h1 className="text-2xl font-bold mb-4">Quiz Game</h1>
                            <div className='p-2' >
                                <span className="text-right font-semibold mb-2 bg-purple-300 rounded-lg p-2"> 
                                Your Score: { ( vocabList.length - (replay.current -vocabList.length)) }/{vocabList.length}
                                </span>
                            </div>

                            <div className="mb-4" id="result"></div>
                            <div className="flex justify-between">
                                <button
                                    onClick={handleSubmitVocab}
                                    type="button"
                                    className="bg-purple-500 text-purple-950 duration-500 px-4 py-2 border  border-transparent rounded-lg mr-2 hover:bg-green-300 hover:text-gray-800"
                                >
                                    Submit!
                                </button>
                                <button
                                    type="button"
                                    className="bg-purple-500 text-purple-900  duration-500 px-4 py-2  border border-transparent rounded-lg hover:bg-red-300 hover:text-gray-800"
                                    onClick={restart}
                                >
                                    Play Again!
                                </button>
                            <button
                            type="button"
                            className="inline-flex  ml-1 justify-center rounded-md duration-500 border border-transparent bg-blue-100 px-4 py-2 text-base  text-purple-900 hover:bg-yellow-300   "
                            onClick={closeModal}
                            >
                            Quit
                            </button>
                        
                            </div>
                        </div>
                    </div>
                    </div>}

                     
                    {list.map((vocab)=>{
                            return(
                              <div  key={uuidv4()} className= {`w-full py-2 px-2 max-h-72 bg-white shadow-lg my-2  rounded-lg col-span-${Math.ceil(Math.random() * 3)}`}>
                                
                                <label className="swap swap-flip text-sm">
                                
                                  <input type="checkbox" onChange={()=>{replay.current += 1; console.log(replay.current)}} />
                                  <div className="swap-off">{vocab.word}</div>
                                  <div className="swap-on flex flex-col justify-between items-baseline">
                                    <div>
                                      {vocab.meaning}
                                    </div>
                                    <div className='flex flex-row gap-1'>
                                        <button className=" p-2 border-1 border-gray-400 rounded-xl mt-3" onClick={()=>{handleEasy(vocab.word)}}> Easy </button>
                                        <div className=" p-2 border-1 border-gray-400 rounded-xl mt-3 hover:bg-gray-300" > Replay   </div>
                                    </div>
                                    
                                     
                                    
                                  </div>

                                </label>
                              </div>

                                
                            )
                        })}
                      
                    

                      
                     




                    </div>





                    
                    <div className='col-span-2 mt-24 mx-3 overflow-y-scroll h-80  scroll-behavior-smooth scrollbar-thin scroll-hide'>
                        <p className='text-base font-semibold text-purple-800'> Intruction:</p>
                        <p className='text-sm font-semibold  text-purple-800' > {instruction}
                        </p>
                        <div className="border-1 border-gray-200 w-full my-4"> </div>
                        <p className='text-base font-semibold text-purple-800'> Your Previous History</p>
                        

                        {JSON.parse(localStorage.getItem('exerciseLog'))[exerciseID]?
                        JSON.parse(localStorage.getItem('exerciseLog'))[exerciseID].map((item, index) =>{

                            return(

                                <p key={index} className='text-sm font-semibold mx-3 text-purple-400' > Attempt  number {index + 1}: {item}</p>
                            )
                        }) : <div>No attempts yet </div>

                        
                        }
                        
                        <button
                                    type="button"
                                    className="inline-flex  ml-1 justify-center rounded-md duration-500 border border-transparent bg-blue-100 px-4 py-2 text-base  text-purple-900 hover:bg-yellow-300   "
                                    onClick={closeModal}
                                    >
                                    Quit the game
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

export default VocabFlashCard;
