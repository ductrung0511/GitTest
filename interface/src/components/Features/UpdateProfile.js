import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect} from 'react'
import { baseUrl } from '../../Share';



export default function UpdateProfile({ profile  }) { 
    let [isOpen, setIsOpen] = useState(false);
    const [profileData, setProfileData] = useState({
        bio: profile.bio,
        school: profile.school,
      } );
    

    
    function handleUpdateProfile() {
        // Send courseData to your backend to add the course
        const url = baseUrl + "api/profile/" ;
        fetch(url, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('access'),
          },
          body: JSON.stringify(profileData),
        })
        .then(response => {
          console.log("status", response.status)
          if (!response.ok) {
            throw new Error('Failed to update profile');
          }
          
          // Clear the form after adding the course
          
          closeModal();
          return response.json();
        })
        .then((data) => {
            console.log(data, "from api ");
        })
        .catch(error => {
          console.error('Error updating section:', error);
          // Handle error appropriately (e.g., show error message to user)
        });
      }
    
    function handleInputChange(event) {
        const { name, value } = event.target;
        setProfileData({ ...profileData, [name]: value });
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
          className="rounded-lg border-1 bg-black text-white px-3 py-2 font-light text-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
        </svg>

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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Your details
                  </Dialog.Title>
                  <div className="mt-2" id='INFO'>
                
                <p className='font-thin text-xs'> Tip: your information will not be shown to anyone else</p>
                {/*
                <div class="relative w-full min-w-[200px] h-10">
                  <input
                    type="text"
                    name="first_name"
                    id="first_name"
                    value={profileData.first_name}
                    onChange={handleInputChange}
                    className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                    placeholder="first_name" />
                    <label
                    htmlFor='first_name'
                    className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900   before:border-blue-gray-200  after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                  </label>
                </div>
                <div class="relative w-full min-w-[200px] h-10">
                  <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    value={profileData.last-name}
                    onChange={handleInputChange}
                    className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                    placeholder="last_name" />
                    <label
                    htmlFor='last_name'
                    className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900   before:border-blue-gray-200  after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                  </label>
                </div>
                */}
                <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
                <textarea
                    name="bio"
                    id="bio"
                    placeholder="Your Bio"
                    value={profileData.bio}
                    onChange={handleInputChange}
                    className="border-gray-300 border rounded-md p-2 w-full mb-4 resize-none"
                    rows={4} // Specify the number of rows
                />
                
                </div>
                <div>
                <label htmlFor="school" className="block text-sm font-medium text-gray-700">School</label>
                <textarea
                    name="school"
                    id="school"
                    placeholder="Your school"
                    value={profileData.school}
                    onChange={handleInputChange}
                    className="border-gray-300 border rounded-md p-2 w-full mb-4 resize-none"
                    rows={2} // Specify the number of rows
                />
                </div>
    
    
                </div>


                  <div className="mt-4 flex gap-2 ">
                  
                    <button
                      type="button"
                      onClick={handleUpdateProfile}
                      style={{background: 'white'}}
                    className="inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-sm  text-blue-900 font-medium hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2"
                    >
                    Update Your Profile
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
