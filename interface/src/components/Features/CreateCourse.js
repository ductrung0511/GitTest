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
  let [error, setError] = useState('')

  function handleAddCourse(event) {
    event.preventDefault();
    // Send courseData to your backend to add the course
    if(courseData.bgCardUrl.length  > 200 || courseData.bgCardUrlSecondary.length > 200 )
      {setError('URL background must be shorter than 200 characters!')}
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
      console.log(data, "data");
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
          className="rounded-md bg-blue-700 my-4 px-4 py-2 text-sm font-medium border-1 border-black text-black hover:bg-black/30 duration-500 "
        >
          {course.name === '' ? 'Create Course' : 'Edit Course Information'}
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
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all backdrop-blur-[2px]">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Fill out the Details
                  </Dialog.Title>
                  <div className="mt-2" id='INPUT SECTION'>
                  
                    <label htmlFor='name' className='text-sm font-bold ' > Name </label>
                    <input
                        type="text"
                        name="name"
                        value={courseData.name}
                        onChange={handleInputChange}
                        placeholder="Name"
                        className="block w-full m-2 h-10 px-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        style={{ height: `${3 * 1.5}rem` }} 
                        
                        />

                    <label htmlFor='serial' className='text-sm font-semibold ' > Serial </label>

                    <input
                      type="text"
                      name="serial"
                      value={courseData.serial}
                      onChange={handleInputChange}
                      placeholder="Serial"
                      style={{ height: `${3 * 1.5}rem` }} 
                      className="block w-full m-2 h-10 px-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />

                    <label htmlFor='bgCardUrl' className='text-sm font-semibold ' > Background Image Url 
                      <span className='text-red-400 font-mono'> {error !== ''  ? '------': '' } { error } </span>
                    </label>
                    <input
                      type="text"
                      name="bgCardUrl"
                      value={courseData.bgCardUrl}
                      onChange={handleInputChange}
                      placeholder="Background Card URL"
                      style={{ height: `${2 * 1.5}rem` }} 
                      className="block w-full mt-2 m-2 h-10 px-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />



                    <label htmlFor='bgCardUrlSecondary' className='text-sm font-semibold ' >Secondary Background Image Url
                      <span className='text-red-400 font-mono'> {error !== ''  ? '------': '' } { error } </span>
                     </label>
                    <input
                      type="text"
                      name="bgCardUrlSecondary"
                      value={courseData.bgCardUrlSecondary}
                      onChange={handleInputChange}
                      placeholder="Second background Card URL "
                      style={{ height: `${2 * 1.5}rem` }} 
                      
                      className="block w-full mt-2 m-2 h-10 px-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />

                    <label htmlFor='address' className='text-sm font-semibold mt-1' >Address</label>
                    <input
                      type="text"
                      name="address"
                      value={courseData.address}
                      onChange={handleInputChange}
                      placeholder="Address"
                      className="block w-full m-2 h-10 px-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />

                    <label htmlFor="duration" className="block mt-4 text-sm font-medium text-gray-700">
                    Duration
                  </label>
                    <input
                      type="number"
                      name="duration"
                      value={courseData.duration}
                      onChange={handleInputChange}
                      placeholder="Duration"
                      className="block w-full  m-2 h-10 px-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />

                    <label htmlFor='description' className='text-sm font-bold mt-5' > Description </label>
                    <textarea
                      type="text"
                      name="description"
                      value={courseData.description}
                      onChange={handleInputChange}
                      placeholder="description"
                      className="block w-full m-2 h-10 px-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      style={{ height: `${7 * 1.5}rem` }} 


                    />

                    {/* conclusion : '',//
                    result: '',//
                    category: 1, //
                    courseKey: '', // */}
                    
                    <label htmlFor='result' className='text-sm font-bold mt-5' > Result </label>
                    <textarea
                      type="text"
                      name="result"
                      value={courseData.result}
                      onChange={handleInputChange}
                      placeholder="result"
                      className="block w-full m-2 h-10 px-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      style={{ height: `${17 * 1.5}rem` }} 
                    />

                    <label htmlFor='conclusion' className='text-sm font-bold mt-5' > Conclusion </label>
                    <textarea
                      type="text"
                      name="conclusion"
                      value={courseData.conclusion}
                      onChange={handleInputChange}
                      placeholder="conclusion"
                      className="block w-full m-2 h-10 px-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      style={{ height: `${7 * 1.5}rem` }} 


                    />
                    {/* <input
                      type="number"
                      name="category"
                      value={courseData.category}
                      onChange={handleInputChange}
                      placeholder="category"
                      className="block w-full m-2 h-10 px-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    <p className='text-xs text-gray-400'>Tips: Beta Version only support 1: IELTS & TOEIC, 8: Flyer, 9: Starter, 10: Mover</p>
                     */}
                    <label htmlFor="category" className="block mt-4 text-sm font-medium text-gray-700">
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={courseData.category}
                      onChange={handleInputChange}
                      className="block w-full m-2 h-10 px-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="">Select a category</option>
                      <option value="4">IELTS & TOEIC</option>
                      <option value="3">Flyer</option>
                      <option value="2">Starter</option>
                      <option value="1">Mover</option>
                    </select>
                    <p className="text-xs text-gray-400">
                      Tips: Beta Version only supports 4: IELTS & TOEIC, 3: Flyer, 2: Starter, 1: Mover
                    </p>

                    <label htmlFor='courseKey' className='text-sm font-semibold mt-1' >Course Key <span className='text-xs font-light'> (⚠️ Edit with care)</span></label>
                    <input
                      type="text"
                      name="courseKey"
                      value={courseData.courseKey}
                      onChange={handleInputChange}
                      placeholder="courseKey"
                      className="block w-full m-2 h-10 px-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    <p className='text-xs text-gray-400'>Tips: seperate keys by "/" to acquire more keys</p>

                    <label htmlFor='textBook' className='text-sm font-semibold mt-1' >Text Book / Material<span className='text-xs font-light'></span></label>
                    <input
                      type="text"
                      name="textBook"
                      value={courseData.textBook}
                      onChange={handleInputChange}
                      placeholder="Text Book"
                      className="block w-full m-2 h-10 px-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    {/* <input
                      type="text"
                      name="color"
                      value={courseData.color}
                      onChange={handleInputChange}
                      placeholder="White"
                      className="block w-full m-2 h-10 px-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    /> */}
                    <label htmlFor="color" className="block text-sm mt-4 font-medium text-gray-700">
                      Color
                    </label>
                    <select
                      id="color"
                      name="color"
                      value={courseData.color}
                      onChange={handleInputChange}
                      className="block w-full m-2 h-10 px-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="">Select a color</option>
                      <option value="white">White</option>
                      <option value="black">Black</option>
                      <option value="red">Red</option>
                      <option value="blue">Blue</option>
                      <option value="green">Green</option>
                      <option value="yellow">Yellow</option>
                      <option value="purple">Purple</option>
                      {/* Add more color options as needed */}
                    </select>

                    {/* <input
                      type="number"
                      name="sale"
                      value={courseData.sale}
                      onChange={handleInputChange}
                      placeholder="0"
                      className="block w-full m-2 h-10 px-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    /> */}
                    <label htmlFor="sale" className="block text-sm font-medium text-gray-700">
                      Sale
                    </label>
                    <select
                      id="sale"
                      name="sale"
                      value={courseData.sale}
                      onChange={handleInputChange}
                      className="block w-full m-2 h-10 px-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="">Select sale percentage</option>
                      <option value="0">No Sale</option>
                      <option value="10">10%</option>
                      <option value="20">20%</option>
                      <option value="30">30%</option>
                      {/* Add more sale percentage options as needed */}
                    </select>

                    <p className='font-thin text-xs'> Tip: type "/n" to make new paragraphs</p>
                  
                    
                  </div>

                  <div className="mt-4">

                    {course.name === '' && 
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 duration-500"
                      onClick={handleAddCourse}
                    >
                    Create Course
                    </button>
                    }
                    {course.name !== '' && 
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 duration-500 "
                      onClick={handleUpdateCourse}
                    >
                    Update Course
                    </button>}
                    <button
                      type="button"
                      className="inline-flex  ml-3  justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-yellow-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
