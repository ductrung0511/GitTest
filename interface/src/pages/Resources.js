import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { baseUrl } from "../Share";
import { useLocation } from "react-router-dom";
import useFetch from "../components/hook/useFetch";
import CreateOrUpdateResourses from "../components/Features/createOrUpdateResources";
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import DeleteCountDown from "../components/Features/DeleteCountDown";
import { Tooltip } from "react-tooltip";
export default function Resources(){

    const [notFound, setNotFound] = useState(false);   
    const [resources, setResources] =useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const role = localStorage.getItem('role');
    
    const url = baseUrl + 'api/profile/';
    const {  data  , loading, error } =  useFetch(url, {
        method:'GET', 
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.getItem('access'),}
    });

    const deleteResource=(resourceID) =>{

      async function deleteData() {
        const url = baseUrl + "api/resources/";
      try {
        const response = await fetch(url, {
          method: "DELETE",
          headers:{
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('access'),
          },
          body: JSON.stringify({id: resourceID}),
      });
        if(response.status === 404) setNotFound(true);
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
        else if(response.ok){
          let newResources  = [];
          for(let i of resources){
            if(i.id !== resourceID){
              newResources.push(i);
            }
          }
          setResources(newResources);

        }

      } catch (error) {
        console.error("Error DELETE data:", error);
      }
      }
  
      deleteData();

    }

    // const profile = useRef();
    // const loadingProfile = useRef(); 
    // const errorProfile = useRef(); 
    // const works = [
    //     {name: "IELTS Academic Writing E-Books - volumn 3", bgCardUrl:"https://img.freepik.com/free-photo/vibrant-portrait-person-bright-environment_23-2151078796.jpg?t=st=1709200466~exp=1709201066~hmac=4281526a3c9848a33e9e06221e4ed59286a702fb2d7346e3647c53db69544e342x.webp" , role:"Explorer", content:{}},
    //     {name: "IElTS Academic Reading E-Books - volumn 2/3", bgCardUrl:"https://img.freepik.com/free-photo/vibrant-portrait-person-bright-environment_23-2151078775.jpg" , role:"Starter", content:{}},
    //     {name: "Listening General E-Books - volumn 2", bgCardUrl:"https://mediablog.cdnpk.net/sites/9/2022/03/spring-pattern-collection.png?t=st=1709200466~exp=1709201066~hmac=f59cf8ee36d6b1a190966745b87d4991ad06faca819d734ec623a8a32db4bbb5" , role:"Flyer", content:{}},
    //     {name: "IELTS Academic Writing E-Books - volumn 3", bgCardUrl:"https://img.freepik.com/free-photo/vibrant-portrait-person-bright-environment_23-2151078796.jpg?t=st=1709200466~exp=1709201066~hmac=4281526a3c9848a33e9e06221e4ed59286a702fb2d7346e3647c53db69544e342x.webp" , role:"Explorer", content:{}},
    //     {name: "IElTS Academic Reading E-Books - volumn 2/3", bgCardUrl:"https://img.freepik.com/free-photo/vibrant-portrait-person-bright-environment_23-2151078775.jpg" , role:"Starter", content:{}},
    //     {name: "Listening General E-Books - volumn 2", bgCardUrl:"https://mediablog.cdnpk.net/sites/9/2022/03/spring-pattern-collection.png?t=st=1709200466~exp=1709201066~hmac=f59cf8ee36d6b1a190966745b87d4991ad06faca819d734ec623a8a32db4bbb5" , role:"Flyer", content:{}},

    // ];



    useEffect(() => {
        async function fetchData() {
            const url = baseUrl + "api/resources/";
          try {
            const response = await fetch(url, {
              headers:{
                  'Content-Type': 'application/json',
                  Authorization: 'Bearer ' + localStorage.getItem('access'),
          }
          });
            if(response.status === 404) setNotFound(true);
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
            const data = await response.json();  
            console.log(data ,"resources");
            setResources(data); 
    
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
      
        fetchData();
        
         // Call the fetchData function when the component mounts
      }, []); // Empty dependency array to ensure it runs only once
    function addResource(newResource){
        setResources([...resources, newResource])
    }
    function updateRecourse( newResource){
        let newResources = [];
        for(let i=0; i< resources.length; i++){
            if(resources[i].id === newResource.id){
                newResources.push(newResource);
            }
            else newResources.push(resources[i]);
        }
        setResources(newResources);

    }
    const handleCopyText = async (text)=>{
      try {
        navigator.clipboard.writeText(text)
      }
      catch(error){
        console.log("error copy data", error)
      }
    };
    function classNames(...classes) {
      return classes.filter(Boolean).join(' ')
    }
    
    if (notFound) {
        return <div>resources not found.</div>;
      }
    
    if (!data ) {
        return <div>Loading...</div>;
      }
    
    if(data.is_staff) return <div>

                    <div className="grid grid-cols-2 gap-3 px-8 py-3 mx-7 mt-20 bg-transparent">
                        {resources.map((resource, index) => {
                        return <div key={index} className="rounded-lg h-44 shadow-lg bg-white flex flex-col overflow-hidden relative">
                            
                            <img className="h-4/5 w-full object-cover" src={resource.bgCardUrl} alt="bg"/>
                            <Link to={resource.url} className="no-underline pt-2">
                                <div className="px-2 h-1/5 mt-1 flex justify-between items-center">

                                    <p className="font-base text-gray-700 text-sm pt-2"> {resource.name}</p>
                                <p className="font-base text-gray-700 text-sm pt-2">Serial: {resource.serial} </p>
                                </div>
                            </Link>
                            <div className="absolute top-2 left-2">
                                
                              {role ===  'Administrator' && <CreateOrUpdateResourses addOrUpdateResource={updateRecourse} resource={resource}/> }  
                            </div>
                            <div className="absolute top-12 left-2" >
                              {localStorage.getItem('role') === "Administrator" &&
                                // <button className="absolute top-2 left-2" onClick={()=>{deleteResource(resource.id)}} >
                                //     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-yellow-300">
                                //     <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                //     </svg>
                                // </button>
                                <DeleteCountDown  original={resources} setOriginal={setResources} ID={resource.id} url={  baseUrl + "api/resources/" }/>
                             }
                            </div>
                            <div className="absolute top-2 right-2">
          
                              <Menu as="div" className="relative inline-block text-left">
                              <div>
                                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-full hover:bg-white hover:bg-opacity-30 p-2 text-sm font-semibold text-gray-900 shadow-sm  ">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                                  </svg>
                                </Menu.Button>
                              </div>

                              <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                              >
                                <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md   bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                  <div className="py-1  flex flex-col justify-center rounded-full">
                                    <Menu.Item> 
                                      
                                      <button onClick={ () => (handleCopyText(baseUrl + location.pathname.substring(1)))} className=" hover:bg-gray-100 p-2 text-sm ">
                                        Copy
                                      </button>
                                      
                                    </Menu.Item>
                                    
                                  </div>
                                </Menu.Items>
                              </Transition>
                              </Menu>
                            </div>

                        </div>


                        })}
                        



                    </div>
                    { role ===  'Administrator' && <CreateOrUpdateResourses addOrUpdateResource={addResource} />  } 


    </div>;
    else if(localStorage.getItem('role') === "Student") return(<div className="flex flex-col">
      <Tooltip id="tooltip-intro"/>
      <div data-tooltip-content='Rất tiếc, Tài nguyên hiện hiện chỉ hỗ trợ Giáo Viên' data-tooltip-id="tooltip-intro" className="text-3xl font-bold text-red-400 my-10 mt-20">Sorry, Resource currently do not support Student</div>
      <img className="h-screen w-full object-cover" src="https://img.freepik.com/free-vector/high-school-concept-illustration_114360-8329.jpg?t=st=1709715929~exp=1709719529~hmac=d1a9b9b2b2e94dbfca4ec01698d06597af0c60f3f06fe325178b50092d941cc0&w=826" alt=""/>
      

      




    </div>)
    
    
}