import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { baseUrl } from '../../Share';

export default function CreateCourse({addOrUpdateCourse , id = 1, course = {
  name: '',
  serial: '',
  bgCardUrl: '',
  bgCardUrlSecondary: '',
  address: '',
  duration: 0,
  description: '',

  conclusion : '',//
  result: '',//
  category: 1, //
  courseKey: '', //
  textBook: '',

  color: '',
  sale: 0,

}  }) {
  let [isOpen, setIsOpen] = useState(false);
  let [courseData, setCourseData] = useState(course);
  function handleInputChange(event) {
    const { name, value } = event.target;
    setCourseData({ ...courseData, [name]: value });
  }

  function handleAddCourse(event) {
    event.preventDefault();
    // Send courseData to your backend to add the course
    const url = baseUrl + "api/courses/";
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',  Authorization: 'Bearer ' + localStorage.getItem('access'),

      },
      body: JSON.stringify(courseData),
    })
    .then(response => {
      console.log("status", response.status)
      if (!response.ok) {
        throw new Error('Failed to add course');
      }
      // Clear the form after adding the course
      setCourseData({
        name: '',
        serial: '',
        bgCardUrl: '',
        bgCardUrlSecondary: '',
        address: '',
        duration: 0,
        description: '',

        conclusion : '',//
        result: '',//
        category: 1, //
        courseKey: '', //

        textBook: '',
        color: '',
        sale: 0,
        

      });
      closeModal();
      return response.json();
    })
    .then((data) => {     
      addOrUpdateCourse(data);
    })
    .catch(error => {
      alert('Error adding course:', error);
      // Handle error appropriately (e.g., show error message to user)
    });
  }
  function handleUpdateCourse(event) {
    event.preventDefault();
    const newCourseData = {...courseData, id: id};
    const url = baseUrl + `api/courses/`; // Assuming courseId is passed as a prop
    fetch(url, {
      method: 'PUT', // Or 'PATCH' depending on your API
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access'),
      },
      body: JSON.stringify(newCourseData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update course');
        }
        return response.json();
      })
      .then((data) => {
        // Handle success response from the backend
        console.log('Course updated successfully:', data);
        addOrUpdateCourse(data);
        closeModal();
      })
      .catch((error) => {
        // Handle error response from the backend
        console.error('Error updating course:', error);
      });
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
          className="rounded-md bg-blue-700 my-4 px-4 py-2 text-sm font-medium border-1 border-black text-black hover:bg-black/30 "
        >
          Add or Update Course
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all backdrop-blur-[2px]">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Fill out the Details
                  </Dialog.Title>
                  <div className="mt-2" id='INPUT SECTION'>
                    <input
                        type="text"
                        name="name"
                        value={courseData.name}
                        onChange={handleInputChange}
                        placeholder="Name"
                        className="block w-full m-2 h-10 px-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    <input
                      type="text"
                      name="serial"
                      value={courseData.serial}
                      onChange={handleInputChange}
                      placeholder="Serial"
                      className="block w-full m-2 h-10 px-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    <input
                      type="text"
                      name="bgCardUrl"
                      value={courseData.bgCardUrl}
                      onChange={handleInputChange}
                      placeholder="Background Card URL"
                      className="block w-full mt-2 m-2 h-10 px-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    <input
                      type="text"
                      name="bgCardUrlSecondary"
                      value={courseData.bgCardUrlSecondary}
                      onChange={handleInputChange}
                      placeholder="Background Card URL"
                      className="block w-full mt-2 m-2 h-10 px-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    <input
                      type="text"
                      name="address"
                      value={courseData.address}
                      onChange={handleInputChange}
                      placeholder="Address"
                      className="block w-full m-2 h-10 px-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    <input
                      type="number"
                      name="duration"
                      value={courseData.duration}
                      onChange={handleInputChange}
                      placeholder="Duration"
                      className="block w-full m-2 h-10 px-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    <input
                      type="text"
                      name="description"
                      value={courseData.description}
                      onChange={handleInputChange}
                      placeholder="description"
                      className="block w-full m-2 h-10 px-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    {/* conclusion : '',//
        result: '',//
        category: 1, //
        courseKey: '', // */}
                    <textarea
                      type="text"
                      name="conclusion"
                      value={courseData.conclusion}
                      onChange={handleInputChange}
                      placeholder="conclusion"
                      className="block w-full m-2 h-10 px-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      rows={4}
                    />
                    <textarea
                      type="text"
                      name="result"
                      value={courseData.result}
                      onChange={handleInputChange}
                      placeholder="result"
                      className="block w-full m-2 h-10 px-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      rows={4}
                    />
                    <input
                      type="number"
                      name="category"
                      value={courseData.category}
                      onChange={handleInputChange}
                      placeholder="category"
                      className="block w-full m-2 h-10 px-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    <p className='text-xs text-gray-400'>Tips: Beta Version only support 1: IELTS & TOEIC, 8: Flyer, 9: Starter, 10: Mover</p>
                    <input
                      type="text"
                      name="courseKey"
                      value={courseData.courseKey}
                      onChange={handleInputChange}
                      placeholder="courseKey"
                      className="block w-full m-2 h-10 px-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    <p className='text-xs text-gray-400'>Tips: seperate keys by "/" to acquire more keys</p>
                    <input
                      type="text"
                      name="textBook"
                      value={courseData.textBook}
                      onChange={handleInputChange}
                      placeholder="Text Book"
                      className="block w-full m-2 h-10 px-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    <input
                      type="text"
                      name="color"
                      value={courseData.color}
                      onChange={handleInputChange}
                      placeholder="White"
                      className="block w-full m-2 h-10 px-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    <input
                      type="number"
                      name="sale"
                      value={courseData.sale}
                      onChange={handleInputChange}
                      placeholder="0"
                      className="block w-full m-2 h-10 px-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    <p className='font-thin text-xs'> Tip: type "/n" to make new paragraphs</p>
                  
                    
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handleAddCourse}
                    >
                    Add Course
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handleUpdateCourse}
                    >
                    Update Course
                    </button>
                    <button
                      type="button"
                      className="inline-flex  ml-3  justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                    Cancle
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
