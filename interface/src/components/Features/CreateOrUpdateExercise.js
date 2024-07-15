import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState} from 'react'
import { baseUrl } from '../../Share';
import Alert from './Alert';
import { useRef } from 'react';



export default function CreateOrUpdateExercise({addOrUpdateExercise ,sessionID = 1 , exerciseID = 1, exercise = {
  name: '',
  bgCardUrl: '',
  description: '',
  instruction : '',
  type: '',
  questions: [],
}  }) { 
    let [isOpen, setIsOpen] = useState(false);
    const [exerciseData, setExerciseData] = useState(exercise);
    const [questionsEmpty, setQuestionsEmpty] = useState(false);

    const message = useRef('');
    const [isAlert, setIsAlert] = useState(false);
    const [alertTime, setAlertTime] = useState(0);

    const handleClick = (e) => {
      e.stopPropagation(); // Stop event propagation to prevent it from closing the menu
    };
    const fixEmptyVocabType = (dataPost) => {
      dataPost.bgCardUrl =  dataPost.bgCardUrl !== '' ? dataPost.bgCardUrl : 'https://blogassets.leverageedu.com/blog/wp-content/uploads/2020/07/29212014/Vocabulary-Test.jpg' 
      dataPost.instruction = dataPost.instruction !== '' ? dataPost.instruction : 'Try your best to understand every words by searching meaning and pronunciation from the dictionary. 🔍️'
      dataPost.description = dataPost.description !== '' ? dataPost.description : 'Try your best to understand every words by searching meaning and pronunciation from the dictionary. 🔍️'
      return dataPost;
    }

    function handleAddExercise() {
        // Send courseData to your backend to add the course
        const url = baseUrl + "api/exercise_session/" + sessionID;
        if(exerciseData.questions.length === 0 && (exerciseData.type !== "assignment" && exerciseData.type !== "reading/listening" )){
          setQuestionsEmpty(true);
          return;
        }
        let dataPost =  exerciseData;
        if (dataPost['type'] === 'assignment' || dataPost['type'] === 'reading/listening')
          {
            if(dataPost['questions'] == [] ) dataPost["questions"] = [{"0":"0"}];
            alert('question set to st else')
          }
        if (dataPost['type'] === 'vocabulary')
          {
            dataPost = fixEmptyVocabType(dataPost)
          }

        fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('access'),
          },
          body: JSON.stringify(dataPost),
        })
        .then(response => {
          console.log("status", response.status)
          if (!response.ok) {
            throw new Error('Failed to add exercise');
          }
          // Clear the form after adding the course
          setExerciseData({
            name: '',
            bgCardUrl: '',
            description: '',
            instruction : '',
            type: '',
            questions: [],
          });
          closeModal();
          return response.json();
        })
        .then((data) => {
            console.log(data, "data recieved");
            addOrUpdateExercise(data);
        })
        .catch(error => {
          console.error('Error adding exercise:', error);
          // Handle error appropriately (e.g., show error message to user)
        });
      }
      function handleUpdateExercise() {
        // Send courseData to your backend to add the course
        if(exerciseData.description.length > 200){
          setIsAlert(true);
          message.current = "Description field should be shorter (less than 200 characters)";
          setAlertTime((prev) => prev + 1);
        }
        const url = baseUrl + "api/exercise_session/" + exerciseID;
        fetch(url, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('access'),
          },
          body: JSON.stringify(exerciseData),
        })
        .then(response => {
          console.log("status", response.status)
          if (!response.ok) {
            throw new Error('Failed to update exercise');
          }
          
          // Clear the form after adding the course
          
          closeModal();
          return response.json();
        })
        .then((data) => {
            console.log(data, "from api exercise/id");
            addOrUpdateExercise(data);
        })
        .catch(error => {
          console.error('Error updating exercise:', error);
          // Handle error appropriately (e.g., show error message to user)
        });
      }
    
      function handleInputChange(event) {
        const { name, value } = event.target;
    
        // If the field being updated is "questions", parse the JSON string value
        const updatedValue = name === "questions" ? JSON.parse(value) : value;
    
        // Update the exerciseData state
        setExerciseData(prevExerciseData => ({
            ...prevExerciseData,
            [name]: updatedValue
        }));
    }

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true)
    }
    

  return (
    <>
      {isAlert && <Alert message={message.current} dataValue={4} alertTime={alertTime} setIsAlert={setIsAlert}/>}
              

      {exercise.name.length === 0 && 
        <div className=" flex items-center justify-center ">
          <button
            type="button"
            onClick={openModal} 
            className="rounded-lg border-1 border-black text-black px-3 py-2 font-bold"
          >
            Add  Exercise
          </button>
        </div>
      }

      {exercise.name.length !== 0 && 
        <button className="hover:bg-gray-200 bg-white bg-opacity-45 text-sm font-light p-1 rounded-md"
          type="button"
          onClick={openModal}
        >
        Update 
        </button>
      }
 
      <Transition appear show={isOpen} as={Fragment}  >
        <Dialog as="div" className="relative z-40" onClose={closeModal}>
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

          <div className="fixed inset-0 overflow-y-auto" onClick={handleClick}>
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
                <Dialog.Panel className="w-full max-w-2xl transform  rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    {
                    questionsEmpty && <div id="toast-default" className="flex bg-gray-300 flex-col gap-2 z-70 shadow-xl fixed bottom-20 right-3 items-center w-full max-w-xs p-4 text-gray-500  rounded-lg  dark:text-gray-400 dark:bg-gray-800" role="alert">
                    <div className="ms-3 text-sm  font-semibold text-black uppercase  ">Questions empty!</div>
                    
                    
                    <div className="text-gray-800 w-full border-solid border-gray-800 border-1"></div>
                    <button type="button" onClick={()=> { setQuestionsEmpty(false)}} className="ms-auto text-black -mx-1.5 -my-1.5 bg-yellow-300 duration-300 hover:bg-gray-300 hover:text-gray-700 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5  inline-flex items-center justify-center h-10 w-10" data-dismiss-target="#toast-default" aria-label="Close">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                    </button>


                    </div>   
                    }
                    <div className='fixed bottom-0 -right-80  rounded-lg z-40 bg-yellow-100 w-72 text-xs p-4 '>
                    Questions for "multiple choice" questions will be in the form of:
                    <br/>
                    [
                    questions objects : with "question","correct_answer" and "incorrect_answers"
                    ]
                    <br/>

                    <br/>
                    Questions for "vocabulary" questions will be in the form of:
                    <br/>
                    [
                    questions objects : with "word" and "meaning" 
                    ]
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    Example execution using Chatgpt (copy this text to Chatgpt):
                    <br/>
                    <br/>

                    
question1: "What is the largest ocean on Earth?"
correct_answer: "Pacific Ocean"
incorrect_answers: "Atlantic Ocean", "Indian Ocean", "Arctic Ocean"

question2: "Who wrote the famous novel '1984'?"
correct_answer: "George Orwell"
incorrect_answers: "F. Scott Fitzgerald", "Ernest Hemingway", "J.K. Rowling"

question3: "What is the chemical symbol for gold?"
correct_answer: "Au"
incorrect_answers: "Ag", "Fe", "Cu"

question4: "...."
correct_answer: "..."
incorrect_answers: "...", "...", "..."

<br/> Turn this questions data above to JSON in this formular [ questions objects : with "question","correct_answer" and "incorrect_answers" ] 

                    </div>

                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Fill out the Exercise details!
                  </Dialog.Title>
                  <div className="mt-2 flex flex-col gap-3" id='INFO'>
              
                <p className='font-thin text-xs'> Tip: type "\n" to break to new line! </p>
                <div class="relative w-full min-w-[200px] h-10">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={exerciseData.name}
                    onChange={handleInputChange}
                    className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                    placeholder=" " />
                    <label
                    htmlFor='name'
                    className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900   before:border-blue-gray-200  after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                      Name
                  </label>
                </div>
                <div class="relative w-full min-w-[200px] h-10">
                  <input
                    type="url"
                    name="bgCardUrl"
                    id="bgCardUrl"
                    value={exerciseData.bgCardUrl}
                    onChange={handleInputChange}
                    className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                    placeholder=" " />
                    <label
                    htmlFor='bgCardUrl'
                    className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900   before:border-blue-gray-200  after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                      URL for exercise image
                  </label>
                </div>
                {/* <div class="relative w-full min-w-[200px] h-10">
                  <input
                    type="text"
                    name="description"
                    id="description"
                    value={exerciseData.description}
                    onChange={handleInputChange}
                    className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                    placeholder=" " />
                    <label
                    htmlFor='description'
                    className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900   before:border-blue-gray-200  after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                      Description
                  </label>
                </div>
                <div class="relative w-full min-w-[200px] h-10">
                  <input
                    type="text"
                    name="instruction"
                    id="instruction"
                    value={exerciseData.instruction}
                    onChange={handleInputChange}
                    className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                    placeholder=" " />
                    <label
                    htmlFor='instruction'
                    className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900   before:border-blue-gray-200  after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                      Instruction
                  </label>
                </div> */}
                <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                    name="description"
                    id="description"
                    placeholder="short description not longer than 40 words"
                    value={exerciseData.description}
                    onChange={handleInputChange}
                    className="border-gray-300 border rounded-md p-2 w-full mb-1 resize-none text-xs"
                    rows={4} // Specify the number of rows
                />
                </div>

                <div>
                <label htmlFor="instruction" className="block text-sm font-medium text-gray-700">
                  {(exerciseData.type === 'gap_filling' || exerciseData.type === 'MCQ_DragAndDrop' ||  exerciseData.type === 'reading/listening'  ) ? 'Questions' :  'Instruction'}
                </label>
                <textarea
                    name="instruction"
                    id="instruction"
                    placeholder="instruction less than 100 characters!"
                    value={exerciseData.instruction}
                    onChange={handleInputChange}
                    className="border-gray-300 border rounded-md p-2 w-full mb-4 resize-none text-xs"
                    rows={18} // Specify the number of rows
                />
                </div>
                <div className="relative w-full min-w-[200px]">
                  <select
                    name="type"
                    id="type"
                    value={exerciseData.type}
                    onChange={handleInputChange}
                    className="block w-full h-10 px-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    defaultValue={'default'}
                  >
                    <option value="default" className='text-base'>Choose your Type of Execise</option>
                    <option value="multiple_choice" className='text-base'>Multiple Choice</option>
                    <option value="vocabulary" className='text-base'>Vocabulary</option>
                    <option value="assignment" className='text-base'>Assignment</option>
                    <option value="reading/listening" className='text-base'>Reading/Listening</option>
                    <option value="words_order" className='text-base'>Words Order</option>
                    <option value="gap_filling" className='text-base'>Gap Filling</option>
                    <option value="MCQ_DragAndDrop" className='text-base'>Multiple Choice 
                    Question (drag and drop) </option>
                  </select>
                  <label
                    htmlFor="type"
                    className="block mt-2 font-thin text-xs text-gray-400"
                  >
                    Tip: System currently supports types "multiple_choice" and "vocabulary"!
                  </label>
                </div>


                <div>
                <label htmlFor="questions" className="block text-sm font-medium text-gray-700">
                  {(exerciseData.type === 'reading/listening' || exerciseData.type === 'gap_filling' || exerciseData.type === 'MCQ_DragAndDrop') ? 'Answer (in JSON type)' :  '' }
                  { exerciseData.type === 'vocabulary' ? 'Vocabulary List (in JSON type)': ''} </label>
                <textarea
                    name="questions"
                    id="questions"
                    placeholder="questions in JSON form"
                    value={JSON.stringify(exerciseData.questions)}
                    onChange={handleInputChange}
                    className="border-gray-300 border rounded-md p-2 w-full mb-4 resize-none text-xs"
                    rows={10} // Specify the number of rows
                />
                </div>
    
                </div>
                  <div className="mt-4 flex gap-2 ">
                  {exerciseID === 1 && 
                    <button
                      type="button"
                      onClick={handleAddExercise}
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-400 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                    Add Your Exercise
                    </button>
                   }
                  {exerciseID !== 1 && 
                    <button
                      type="button"
                      onClick={handleUpdateExercise}
                      style={{background: 'white'}}
                    className="inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-sm  text-blue-900 font-medium hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2"
                    >
                    Update Your Exercise

                    </button>
                  }
                    <button
                      type="button"
                      className="inline-flex ml-2 justify-center rounded-md border border-transparent bg-gray-400 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
