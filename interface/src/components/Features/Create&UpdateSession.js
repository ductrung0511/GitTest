import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState} from 'react'
import { baseUrl } from '../../Share';


export default function CreateOrUpdateSession({addOrUpdateSession ,courseID = 1 , sessionID = 1, session = {
  overview: '',
  PPTFileUrl: '',
  CPTUrl: '',
  bgCardUrl: '',
  color: '',
  //section: [1],
  topics: '',
  level: '',
}  }) { 
    let [isOpen, setIsOpen] = useState(false);
    const [sessionData, setSessionData] = useState(session);
    const [error, setError ] = useState('')
    

    function handleAddSession() {
        // Send courseData to your backend to add the course
        

        const postSessionData = {...sessionData, "course": courseID}
        if(postSessionData.bgCardUrl.length === 0) {
          postSessionData.bgCardUrl = "https://img.freepik.com/free-vector/flat-pattern-design-back-school-season_23-2150590728.jpg";
        }
        if(postSessionData.color.length === 0) {
          postSessionData.color = 'red'
        }
        if(postSessionData.level.length === 0) {
          postSessionData.level = 'Entry'
        }
        if( postSessionData.topics.length > 100) {
          setError("Topics must not be shorter than 100 characters!")
          return;
        }

        const url = baseUrl + "api/session/" + courseID;
        fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('access'),
          },
          body: JSON.stringify(postSessionData),
        })
        .then(response => {
          console.log("status", response.status)
          if (!response.ok) {
            console.log(response.error);
            throw new Error('Failed to add course');
          }
          
          // Clear the form after adding the course
          setSessionData({
            overview: '',
            PPTFileUrl: '',
            CPTUrl: '',
            bgCardUrl: '',
            color: '',
            //section: [1],
            topics: '',
            level: '',
          });
          setError('')
          closeModal();
          return response.json();
        })
        .then((data) => {
            console.log(data);
            addOrUpdateSession(data);
        })
        .catch(error => {
          console.error('Error adding course:', error);
          // Handle error appropriately (e.g., show error message to user)
        });
      }
      function handleUpdateSession() {
        // Send courseData to your backend to add the course
        const url = baseUrl + "api/session/" + sessionID;
        fetch(url, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('access'),
          },
          body: JSON.stringify(sessionData),
        })
        .then(response => {
          console.log("status", response.status)
          if (!response.ok) {
            throw new Error('Failed to add course');
          }
          
          // Clear the form after adding the course
          
          closeModal();
          return response.json();
        })
        .then((data) => {
            console.log(data);
            addOrUpdateSession(data);
        })
        .catch(error => {
          console.error('Error UPdating course:', error);
          // Handle error appropriately (e.g., show error message to user)
        });
      }
    
    function handleInputChange(event) {
        const { name, value } = event.target;
        setSessionData({ ...sessionData, [name]: value });
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
          className="rounded-lg border-1 border-black text-black px-3 py-2 font-bold duration-500 hover:bg-gray-400 "
        >
          {session.overview === '' ? "Add Session" :  "Update Session"}
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
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Fill out Session details!
                  </Dialog.Title>
                  <div className="mt-2" id='INFO'>
                <div>
                    <label htmlFor="overview" className="block text-sm font-medium text-gray-700">Overview</label>
                    <input
                        type="text"
                        name="overview"
                        id="overview"
                        placeholder="Overview"
                        value={sessionData.overview}
                        onChange={handleInputChange}
                        className="border-gray-300 border rounded-md p-2 w-full mb-4"
                    />
                    <p className='font-thin text-xs'> Overview: no more than 10 words!</p>
                </div>
                <div>
        <label htmlFor="PPTFileUrl" className="block text-sm font-medium text-gray-700">PPT File URL</label>
        <input
            type="text"
            name="PPTFileUrl"
            id="PPTFileUrl"
            placeholder="PPT File URL"
            value={sessionData.PPTFileUrl}
            onChange={handleInputChange}
            className="border-gray-300 border rounded-md p-2 w-full mb-4"
        />
        <p className='font-thin text-xs'> Tip: max length for Links : 200 characters </p>

    </div>
    <div>
        <label htmlFor="CPTUrl" className="block text-sm font-medium text-gray-700">Additional Resource Link</label>
        <input
            type="text"
            name="CPTUrl"
            id="CPTUrl"
            placeholder="CPT URL"
            value={sessionData.CPTUrl}
            onChange={handleInputChange}
            className="border-gray-300 border rounded-md p-2 w-full mb-4"
        />
    </div>
    <div>
        <label htmlFor="bgCardUrl" className="block text-sm font-medium text-gray-700">Background Image URL</label>
        <input
            type="text"
            name="bgCardUrl"
            id="bgCardUrl"
            placeholder="Background Image URL"
            value={sessionData.bgCardUrl}
            onChange={handleInputChange}
            className="border-gray-300 border rounded-md p-2 w-full mb-4"
        />
    </div>
    <div>
        {/* <label htmlFor="color" className="block text-sm font-medium text-gray-700">Color</label>
        <input
            type="text"
            name="color"
            id="color"
            placeholder="Color"
            value={sessionData.color}
            onChange={handleInputChange}
            className="border-gray-300 border rounded-md p-2 w-full mb-4"
        /> */}
        <label htmlFor="color" className="block text-sm mt-4 font-medium text-gray-700">
          Color
        </label>
        <select
          id="color"
          name="color"
          value={sessionData.color}
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
        
    </div>
    <div>
        <label htmlFor="level" className="block text-sm font-medium text-gray-700">Level</label>
        <input
            type="text"
            name="level"
            id="level"
            placeholder="Level"
            value={sessionData.level}
            onChange={handleInputChange}
            className="border-gray-300 border rounded-md p-2 w-full mb-4"
        />
    </div>
    <div>
        <label htmlFor="topics" className="block text-sm font-medium text-gray-700">Topics
          <span className='text-red-400 font-mono'> {error !== ''  ? '------': '' } { error } </span>
        </label>
        <input
            type="text"
            name="topics"
            id="topics"
            placeholder="Topics"
            value={sessionData.topics}
            onChange={handleInputChange}
            className="border-gray-300 border rounded-md p-2 w-full mb-4"
        />
        <p className='font-thin text-xs'> Tip: type "/" between each Topic </p>
    </div>
</div>


                  <div className="mt-4">
                    {session.overview === '' && 
                    <button
                      type="button"
                      onClick={handleAddSession}
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                    Add Your Session
                    </button>
                    }
                    {session.overview !== '' && 
                    <button
                      type="button"
                      onClick={handleUpdateSession}
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                    Update Your Session
                    </button>
                    }

                    <button
                      type="button"
                      className="inline-flex ml-2 justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-yellow-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
