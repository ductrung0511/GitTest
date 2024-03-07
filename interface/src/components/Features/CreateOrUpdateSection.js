import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect} from 'react'
import { baseUrl } from '../../Share';
import { useNavigate, useLocation } from 'react-router-dom';


export default function CreateOrUpdateSection({addOrUpdateSection ,sessionID = 1 , sectionID = 1, section = {
  name: '',
  content: '',
  

}  }) { 
    let [isOpen, setIsOpen] = useState(false);
    const [sectionData, setSectionData] = useState(section);
    const navigate = useNavigate();
    const location = useLocation();

    function handleAddSection() {
        // Send courseData to your backend to add the course
        const postSectionData = {...sectionData, "sessionID": sessionID}
        const url = baseUrl + "api/section/" + 3;
        // fetch(url, {
        //   method: 'POST',
        //   headers: {
        //       'Content-Type': 'application/json',
        //       Authorization: 'Bearer ' + localStorage.getItem('access'),
        //   },
        //   body: JSON.stringify(postSectionData),
        // })
        // .then(response => {
        //   console.log("status", response.status)
        //   if (!response.ok) {
        //     throw new Error('Failed to add section');
        //   }
        //   // Clear the form after adding the course
        //   setSectionData({
        //     name: '',
        //     content: '',
        //   });
        //   closeModal();
        //   return response.json();
        // })
        // .then((data) => {
        //     console.log(data, "data recieved");
        //     addOrUpdateSection(data);
        // })
        // .catch(error => {
        //   console.error('Error adding section:', error);
        //   // Handle error appropriately (e.g., show error message to user)
        // });
        
        async function addData() {
          
          const url = baseUrl + "api/section/" + 3;
          console.log(url,"url");
          try {
            const response = await fetch(url, {
              method: 'POST',
              headers:{
                  'Content-Type': 'application/json',
                  Authorization: 'Bearer ' + localStorage.getItem('access'),
              },
              body: JSON.stringify(postSectionData),
          });
            if(response.status === 404) console.log("Not found");
            if(response.status === 401) 
            {
              navigate("/login",{
              state:{ previousUrl : location.pathname,}
            });
            
          }
            else if (!response.ok) {
              console.error("Something went wrong");
              return;
            }
            setSectionData({
              name: '',
              content: '',
            });
            closeModal();
            const data = await response.json();   
            console.log("Fetch panel", response.status,  data);
            addOrUpdateSection(data);

          } catch (error) {
            console.error("Error adding data:", error);
          }
          console.log("Fetch Add Panel", url );

        }
    
        addData();





      }
      function handleUpdateSection() {
        // Send courseData to your backend to add the course
        const url = baseUrl + "api/section/" + sectionID;
        fetch(url, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('access'),
          },
          body: JSON.stringify(sectionData),
        })
        .then(response => {
          console.log("status", response.status)
          if (!response.ok) {
            throw new Error('Failed to update section');
          }
          
          // Clear the form after adding the course
          
          closeModal();
          return response.json();
        })
        .then((data) => {
            console.log(data, "from api section/id");
            addOrUpdateSection(data);
        })
        .catch(error => {
          console.error('Error updating section:', error);
          // Handle error appropriately (e.g., show error message to user)
        });
      }
    
    function handleInputChange(event) {
        const { name, value } = event.target;
        setSectionData({ ...sectionData, [name]: value });
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
          Add or Update Section !
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
                    Fill out Section details!
                  </Dialog.Title>
                  <div className="mt-2" id='INFO'>
                
                <p className='font-thin text-xs'> Tip: type "\n" to break to new line! </p>
                <div class="relative w-full min-w-[200px] h-10">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={sectionData.name}
                    onChange={handleInputChange}
                    className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                    placeholder=" " />
                    <label
                    htmlFor='name'
                    className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900   before:border-blue-gray-200  after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                      Username
                  </label>
                </div>
                <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
                <textarea
                    name="content"
                    id="content"
                    placeholder="Content"
                    value={sectionData.content}
                    onChange={handleInputChange}
                    className="border-gray-300 border rounded-md p-2 w-full mb-4 resize-none"
                    rows={10} // Specify the number of rows
                />
                
                </div>
    
    
                </div>


                  <div className="mt-4 flex gap-2 ">
                  <button
                      type="button"
                      onClick={handleAddSection}
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-400 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                    Add Your Section
                    </button>
                    <button
                      type="button"
                      onClick={handleUpdateSection}
                      style={{background: 'white'}}
                    className="inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-sm  text-blue-900 font-medium hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2"
                    >
                    Update Your Section

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
