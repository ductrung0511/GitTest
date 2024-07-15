import React, { useState, useEffect, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { baseUrl } from '../../Share';
import { Fragment } from 'react'
import Alert from '../Features/Alert';
import { motion } from 'framer-motion';

function Assignment({ instruction,  description, name, sessionID, exerciseID, bgCardUrl }) {
    let [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [image, setImage] = useState();
    const [imageUrls, setImgageUrls] = useState([]);
    const [loadingImg, setLoadingImg] = useState(false);
    const handleInputChange = (event) => {
      setInputValue(event.target.value);
    };
    const [exerciseLog, setExerciseLog]  = useState( JSON.parse(localStorage.getItem("exerciseLog")));
    const [isAlert, setIsAlert] = useState(false);
    const message = useRef('');
    const [alertTime, setAlertTime] = useState(0);
    const [confirmSubmit, setConfirmSubmit] = useState(false);
   
    useEffect(() => {
      const beforeUnloadHandler = (event) => {
        event.preventDefault();
        // Chrome requires returnValue to be set
        event.returnValue = "";
        // Return a message (not necessary in modern browsers)
        return "";
      };
  
      
  
      if (inputValue !== "") {
        window.addEventListener("beforeunload", beforeUnloadHandler);
      } else {
        window.removeEventListener("beforeunload", beforeUnloadHandler);
      }
      // Cleanup function to remove event listener when component unmounts
      return () => {
        window.removeEventListener("beforeunload", beforeUnloadHandler);
      };
    }, [inputValue]);

    
    function closeModal() {
        setIsOpen(false)
    }


    function openModal() {
        setIsOpen(true)
    }
    function confirmSubmitting() {
      if (exerciseLog[exerciseID]){
        if(exerciseLog[exerciseID].length > 0 && confirmSubmit === false ) {
          setIsAlert(true);
          message.current = "Warning: You have already sumbmit the assignment!";
          setAlertTime((prev) => prev + 1);
        }
      }
      setConfirmSubmit(!confirmSubmit);

    }
    function TextToLinks(text){

      return <React.Fragment>
      {text.split('\n').map((paragraph, index) => {

          if (paragraph.trim().startsWith('https://') || paragraph.trim().startsWith('http://')) {
              // If the paragraph is a URL, return it as an anchor tag
              return (
                  <a key={index} href={paragraph.trim()} className="text-gray-700 " target="_blank" rel="noopener noreferrer">
                      NZEC Link
                  </a>
              );
          }
          else if (paragraph.trim().startsWith('<img/>')) {
              return (
                  <img src={paragraph.trim().slice(6)} className="h-70 w-auto rounded-md my-4" alt="img for assignment"/>
              );
          }
          else {
              return <p key={index} className="my-0 text-md py-0  font-semibold">{paragraph}</p>;
          }
      })}
  </React.Fragment> 
      
  }
    const handleSubmitImage= async () => {

      const url = "https://api.imgbb.com/1/upload?key=b71665dd7cb0b8b3b70af937933649f5";
      const data = new FormData();
      data.append("key", "b71665dd7cb0b8b3b70af937933649f5");
      data.append("image", image);
      setLoadingImg(true);
      if(!image && !["image/tiff", "image/webp", "image/svg+xml", "image/bmp", "image/jpeg", "image/png", "image/gif"].includes(image.type))
      {
        setLoadingImg()
        return;
      }

      try{
        const response = await fetch(url, {
          method: "POST",
          body: data,    
        })
        const jsonData = await response.json();
        if (!response.ok) {
          console.log(jsonData)
          throw new Error("Network response was not ok");
        }
        else if(response.ok && !imageUrls.includes(jsonData.data.display_url )){
          setImgageUrls( [...imageUrls, jsonData.data.display_url ]);
          setIsAlert(true);
          message.current = "Your image has been added successfully";
          setAlertTime((prev) => prev + 1);
        }

      }
      catch(error){
        console.log("error", error)

      }
      finally {
        setLoadingImg(false);
      }

      
      
  }
  const handleSubmitWork = () => {
    const url = baseUrl + "api/assignment/";

    
  
    let data = {
      name: name,
      bgCardUrl: bgCardUrl,
      question: instruction,
      description: description,
      answer: inputValue,
      images: imageUrls.join('|'),
      score: 0,
      comment: " ",
      session: sessionID,
    };
    if( data.answer.length === 0 && data.images.length === 0 ) {
      setIsAlert(true);
      message.current = "Remember not to submit empty answer or empty images of your work!";
      setAlertTime((prev) => prev + 1);
      return;
    }
    console.log(data);
  
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 401) {
          console.log(response);
        } else if (response.ok === false) {
          console.log(response);
        } else {
          let dataPut = exerciseLog;
          if (exerciseLog[exerciseID] === undefined) {
            dataPut[exerciseID] = [0];
          }
          const url = baseUrl + "api/profile/";
          fetch(url, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("access"),
            },
            body: JSON.stringify({ exerciseLog: dataPut }),
          })
            .then((response) => {
              if (response.status === 401) {
                console.log(response);
              } else if (response.ok === false) {
                console.log(response);
              }
            })
            .then(() => {
              setExerciseLog(dataPut);
              localStorage.setItem("exerciseLog", JSON.stringify(dataPut));
            });
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
        closeModal();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  
    return (
        <>
          {isAlert && <Alert message={message.current} dataValue={3} alertTime={alertTime} setIsAlert={setIsAlert}/>}
          
          <div className=" flex items-center z-70  justify-center">
            <button
              type="button"
              onClick={openModal}
              data-tooltip-content='Nhấp vào đây để rèn luyện từ vựng thôi!'
              data-tooltip-id="tooltip-vocab"
              className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
            >
              View Assignment
            </button>
            {/* <Tooltip id='tooltip-vocab' /> */}
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
                    enter="ease-out duration-700"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-400"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full mx-6 transform h-screen   overflow-hidden rounded-2xl bg-white px-7 text-left align-middle shadow-xl transition-all">
                    <div className='grid grid-cols-6 gap-1'>

                      <div className='col-span-4 frid grid-cols-1 pt-4  gap-2 overflow-y-scroll h-screen py-10 px-4'>
                          <div className='bg-white text-sm rounded-lg shadow-lg p-2 py-4'>  {TextToLinks(instruction)}</div>
                          <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mt-10">Your Answer</label>
                          <textarea
                              name="answer"
                              id="answer"
                              onChange={handleInputChange} type="text" value={inputValue}  placeholder='Your answer'
                              className="border-gray-300 border rounded-md p-2 w-full text-xs text-gray-800 mb-4 resize-none"
                              rows={30} // Specify the number of rows
                          />
                          {imageUrls.length !== 0 && 
                          <div className="grid grid-cols-4 gap-1">
                            {imageUrls.map((image)=> 
                            <div className='relative'>
                              <img src={image} alt="image" className='rounded-lg h-48 w-auto object-cover' />
                              <button className=' absolute top-3 left-3 rounded-full bg-white bg-opacity-20' onClick={()=>{setImgageUrls( imageUrls.filter((img) => img !== image) )}}>
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50" className='h-7 w-7'>
                                  <path d="M21.800781 10.099609C20.916781 10.099609 20.199219 10.815219 20.199219 11.699219L20.199219 12.099609L9.8007812 12.099609C9.5247813 12.099609 9.3007812 12.323609 9.3007812 12.599609C9.3007812 12.875609 9.5247813 13.099609 9.8007812 13.099609L11.740234 13.099609L13.857422 38.507812C14.017422 40.410812 15.636922 41.900391 17.544922 41.900391L32.455078 41.900391C34.363078 41.900391 35.982625 40.410812 36.140625 38.507812L38.257812 13.099609L40.199219 13.099609C40.476219 13.099609 40.699219 12.875609 40.699219 12.599609C40.699219 12.323609 40.475219 12.099609 40.199219 12.099609L29.800781 12.099609L29.800781 11.699219C29.800781 10.815219 29.083219 10.099609 28.199219 10.099609L21.800781 10.099609zM12.742188 13.099609L37.255859 13.099609L35.144531 38.423828C35.028531 39.812828 33.848078 40.900391 32.455078 40.900391L17.542969 40.900391C16.150969 40.900391 14.969516 39.811828 14.853516 38.423828L12.742188 13.099609z"></path>
                              </svg>
                              </button>
                            </div>
                            )}

                        
                          
                          </div>}
                            {loadingImg &&
                            <button type="button" className="py-2 px-4 flex justify-center items-center bg-yellow-50" >
                            <svg width="20" height="20" fill="currentColor" className="mr-2 animate-spin" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                              <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
                            </svg>
                            loading
                          </button>

 }   

   
                              <input type='file' placeholder='Select image *' name="image" className='p-3 mt-4 border-2 rounded-lg  ' onChange={(event)=>{
                                const file = event.target.files[0];
                                const supportedType = ["image/tiff", "image/webp", "image/svg+xml", "image/bmp", "image/jpeg", "image/png", "image/gif"];
                                if( !supportedType.includes(file.type)){
                                  alert('type format not supported');
                                }
                                else{
                                  const reader = new FileReader();
                                  reader.onload = () => {
                                    const base64String = reader.result.split(',')[1]; // Extract base64 string from data URL
                                    setImage(base64String);
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}/>
                            <button onClick={handleSubmitImage} className='p-3 m-2 bg-slate-400 text-sm rounded-lg'> upload </button>

                      </div>
          
                      <div className='col-span-2 mt-24 mx-3 overflow-y-scroll h-80  scroll-behavior-smooth scrollbar-thin scroll-hide'>
                          <p className='text-sm font-semibold  text-purple-800' > {description}
                          </p>

                          {exerciseLog[exerciseID]?
                          exerciseLog[exerciseID].map((item, index) =>{
                              return(

                                  <p key={index} className='text-sm font-semibold mx-3 text-purple-400' > Attempt {index + 1}: {item}</p>
                              )
                          }) : <div>No attempts yet</div>
                          }
                          <div className="border-1 border-gray-200 w-full my-4"> </div>


                          
                          
                          <button
                              type="button"
                              className="inline-flex my-1 ml-3 justify-center rounded-md  border border-transparent bg-blue-100 px-4 py-2 text-base  text-purple-900 hover:bg-green-300 hover:scale-105 duration-300   "
                              onClick={confirmSubmitting}
                              >
                              Submit Work
                          </button>
                          
                          {confirmSubmit && 
                          <motion.button
                              initial={
                                {
                                    opacity:0,
                                    x: '40vw',
                                }
                            }
                            animate={{opacity:0.9, x:0,}}
                            transition={{delay: 0, duration: 1.4}}
                              type="button"
                              className="inline-flex my-1 ml-3 justify-center rounded-md  border border-transparent bg-blue-100 px-4 py-2 text-base  text-purple-900 hover:bg-yellow-200 hover:scale-105 duration-300   "
                              onClick={handleSubmitWork}
                              >
                              Confirm Submit Work
                          </motion.button>
                          }
                          <div className="border-1 border-gray-200 w-full my-4"> </div>

                          <button
                              type="button"
                              className="inline-flex my-1 ml-3 justify-center rounded-md  border border-transparent bg-blue-100 px-4 py-2 text-base  text-purple-900 hover:bg-yellow-300 hover:scale-105 duration-300   "
                              onClick={closeModal}
                              >
                              Quit the assignment
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

export default Assignment;
