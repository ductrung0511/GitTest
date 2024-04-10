import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { baseUrl } from "../../Share";

export default function Alert({ message, dataValue, setIsAlert, alertTime }){
    const isCancelled = useRef(false);
    const [isShow, setIsShow] = useState(true);
    const [value, setValue] = useState(dataValue);

    useEffect(()=>{
        setIsShow(true);
        const interval = setInterval(() => {
            setValue((prevValue) => prevValue > 0 ? prevValue - 1 : 0);
            }, 1000); // Update every second
            // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(interval);
    }, [alertTime])

    useEffect(() => {

        if(value === 0){
            setIsAlert(false);
            setIsShow(false);
        }
        // Start the countdown
    }, [value]);
      

    return( 
    <>
        {isShow && <div id="toast-default" className="flex flex-col gap-2  z-30 shadow-xl fixed bottom-3 right-3 items-center w-full max-w-xs p-4 text-gray-500 bg-green-100 rounded-lg  dark:text-gray-400 dark:bg-gray-800" role="alert">
                            <div className="ms-3 text-xs font-semibold text-black "> {message} </div>
                            <div className="flex flex-row shadow-lg  justify-between items-center px-6 hover:bg-gray-400  duration-700 w-full  text-black  rounded-lg dark:bg-blue-800 dark:text-blue-200">
                                <span className="countdown font-mono text-6xl">
                                    <span style={{"--value":value}}></span>
                                </span>
                                <svg className="w-4 h-4" aria-hidden="true" xmflns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.147 15.085a7.159 7.159 0 0 1-6.189 3.307A6.713 6.713 0 0 1 3.1 15.444c-2.679-4.513.287-8.737.888-9.548A4.373 4.373 0 0 0 5 1.608c1.287.953 6.445 3.218 5.537 10.5 1.5-1.122 2.706-3.01 2.853-6.14 1.433 1.049 3.993 5.395 1.757 9.117Z"/>
                                </svg>
                            </div>
                            <div className="text-gray-800 w-full border-solid border-gray-800 border-1"></div>
                            <div className="flex flex-row  py-1 mt-1  justify-between items-center px-6  duration-700 w-full h-10 text-black  rounded-lg dark:bg-blue-800 dark:text-blue-200">
                                <button type="button" onClick={()=> {setIsShow(false)}} className="ms-auto text-black -mx-1.5 -my-1.5 bg-yellow-300 duration-300 hover:bg-gray-300 hover:text-gray-700 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5  inline-flex items-center justify-center h-10 w-10" data-dismiss-target="#toast-default" aria-label="Close">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>
                                </button>
                            {/* <button type="button" onClick={() => { deleteResource(); setIsShow(false) }} className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-default" aria-label="Close">
                                Delete Now
                            </button> */}
                            </div>
                        </div>
            }
    
    

    </>
    )
}





