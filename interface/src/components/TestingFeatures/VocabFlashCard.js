import React, { useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import { Fragment } from 'react'
function VocabFlashCard( {vocabList, instruction}) {
    let [isOpen, setIsOpen] = useState(false);
    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }
    return (
        <>
          <div className=" flex items-center  justify-center">
            <button
              type="button"
              onClick={openModal}
              className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
            >
              View Vocabulary List
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
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full mx-6 transform h-screen   overflow-hidden rounded-2xl bg-white px-7 text-left align-middle shadow-xl transition-all">
                      
















                    <div className='grid grid-cols-6 gap-1'>



                    


                    <div className='col-span-4 pt-4  overflow-y-scroll h-screen'>
                        {vocabList.map((vocab, index)=>{
                            return(

                                
                                <Disclosure>
                                    {({ open }) => (
                                    <>
                                        <Disclosure.Button className="flex w-full justify-between rounded-lg mt-3 bg-yellow-400 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200">
                                        <span className="text-base">{vocab.word}</span>
                                        <ChevronUpIcon
                                            className={`${
                                            open ? 'rotate-180 transform' : ''
                                            } h-5 w-5 text-purple-500`}
                                        />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="px-4 pb-2 pt-4 mb-3 text-sm text-gray-500 bg-yellow-300 rounded-lg">
                                            {vocab.meaning}
                                        </Disclosure.Panel>
                                        <div className='border-1 border-gray-400 font-light px-3'></div>
                                    </>
                                    )}
                                </Disclosure>
                            )
                        })}



                    </div>





                    
                    <div className='col-span-2 mt-24 mx-3 overflow-y-scroll h-80  scroll-behavior-smooth scrollbar-thin scroll-hide'>
                        <p className='text-base font-semibold text-purple-800'> Intruction:</p>
                        <p className='text-sm font-semibold  text-purple-800' > {instruction}
                        </p>
                        <div className="border-1 border-gray-200 w-full my-4"> </div>
                        
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
