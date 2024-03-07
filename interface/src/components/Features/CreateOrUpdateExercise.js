import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect} from 'react'
import { baseUrl } from '../../Share';



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

    function handleAddExercise() {
        // Send courseData to your backend to add the course
        const url = baseUrl + "api/exercise_session/" + sessionID;
        fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('access'),
          },
          body: JSON.stringify(exerciseData),
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
      <div className=" flex items-center justify-center ">
        <button
          type="button"
          onClick={openModal}
          className="rounded-lg border-1 border-black text-black px-3 py-2 font-bold"
        >
          Add or Update Exercise !
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
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
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
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
                <label htmlFor="instruction" className="block text-sm font-medium text-gray-700">Instruction</label>
                <textarea
                    name="instruction"
                    id="instruction"
                    placeholder="instruction less than 100 characters!"
                    value={exerciseData.instruction}
                    onChange={handleInputChange}
                    className="border-gray-300 border rounded-md p-2 w-full mb-4 resize-none text-xs"
                    rows={7} // Specify the number of rows
                />
                </div>
                <div class="relative w-full min-w-[200px] h-10">
                  <input
                    type="text"
                    name="type"
                    id="type"
                    value={exerciseData.type}
                    onChange={handleInputChange}
                    className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                    placeholder=" " />
                    <label
                    htmlFor='type'
                    className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900   before:border-blue-gray-200  after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                      Type
                  </label>
                </div>
                <p className='font-thin text-xs'> Tip: System current support type  multiple_choice and vocabulary ! </p>

{/* 
                <div class="relative w-full min-w-[200px] h-10">
                  <textarea
                    type="text"
                    name="questions"
                    id="questions"
                    value={exerciseData.questions}
                    onChange={handleInputChange}
                    className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                    placeholder=" "
                    rows={8}
                     />
                    <label
                    htmlFor='questions'
                    className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900   before:border-blue-gray-200  after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                      Questions
                  </label>
                </div> */}
                
                <div>
                <label htmlFor="questions" className="block text-sm font-medium text-gray-700">Questions</label>
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
                  <button
                      type="button"
                      onClick={handleAddExercise}
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-400 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                    Add Your Exercise
                    </button>
                    <button
                      type="button"
                      onClick={handleUpdateExercise}
                      style={{background: 'white'}}
                    className="inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-sm  text-blue-900 font-medium hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2"
                    >
                    Update Your Exercise

                    </button>
                    
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
