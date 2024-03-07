import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect} from 'react'
import QuizAppInternal from './QuizzAppInternalData';


export default function QuestionModal(props) {
    const [questions, setQuestions] = useState([])
    
    /*"questions": [
                        {
                            "question": "In &quot;Call Of Duty: Zombies&quot;, you can upgrade the &quot;Apothicon Servant&quot; in the &quot;Shadows Of Evil&quot; map.",
                            "correct_answer": "False",
                            "incorrect_answers": [
                                "True"
                            ]
                        },
                        {
                            "question": "In &quot;Call Of Duty: Zombies&quot;, you can upgrade the &quot;Apothicon Servant&quot; in the &quot;Shadows Of Evil&quot; map.",
                            "correct_answer": "True",
                            "incorrect_answers": [
                                "False"
                            ]
                        }
                    ]*/

    // get questionJSON from a session through id 
    
    useEffect(() => {
        setQuestions(props.questions); 
        
      }, []); 

  let [isOpen, setIsOpen] = useState(false)
  console.log(questions);
  
  function handleInputChange(event) {
    //const { name, value } = event.target;
    //setCourseData({ ...courseData, [name]: value });
  }

  
  

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <div className=" flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        >
          Open Homework
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Fill out the Details
                  </Dialog.Title>
                  <div className="mt-2" id='HOMEWORK SESSION'>
                    
                    
                    
                    {questions[0].question}
                    <QuizAppInternal questions ={questions} />
                  
                    
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                    Submit Your Work
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                    Cancle and Close
                    </button>
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
