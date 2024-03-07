
import { useEffect, useState } from "react";
import 'daisyui/dist/full.css';
import { baseUrl } from "../../Share";
import useFetch from "../hook/useFetch";
import QuizAppInternal from "../TestingFeatures/QuizzAppInternalData";
import Exercise from "../TestingFeatures/Exercise";
import VocabFlashCard from "../TestingFeatures/VocabFlashCard";
import NotificationModal from "./NotifcationModal";
import UpdateProfile from "./UpdateProfile";
import { useLocation, useNavigate } from "react-router-dom";


export default function ProfileCard({profileData}){
    const [badges, setBadges] = useState([{
                            name: 'Badge 1',
                            urlimg: 'https://hrcdn.net/fcore/assets/badges/problem-solving-ecaf59a612.svg',
                            info: 'Information about Badge 1',
                          },
                          {
                            name: 'Badge 2',
                            urlimg: 'https://hrcdn.net/fcore/assets/badges/problem-solving-ecaf59a612.svg',
                            info: 'Information about Badge 2',
                          }]);
    const challanges = [{
      title: "Target Audience Training",
      description: "Save time and make your business more effective by promoting...",
      percentage: 40,
      color: "blue"
    },
    {
      title: "The Complete Web Dev",
      description: "20 challanges for web Dev in 20 days",
      percentage: 80,
      color: "red"
    },
    {
      title: "Grow your analytic skills",
      description: "from easy to hard",
      percentage: 10,
      color: "purple"
    },
  ];

  
  let role = localStorage.getItem('role');
  let username= localStorage.getItem('username');
  
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  
    const today = new Date();
    const month = today.getMonth()  ;
    const year = today.getFullYear();
    const date = today.getDate();
    const currentDate = `${date} ${months[month]} ${year}`;
    const navigate = useNavigate();
    const location = useLocation();


    // const [data, setData] = useState();
    // useEffect(()=>{
      //   fetch(url,  {
        //     method:'GET', 
        //     headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.getItem('access'),}
        // }).then((response)=>{console.log(response)}).then((data)=> {
          //   console.log(data, "data from fetch");
          //   setData(data);}
          //   )
          // }, [])
    const url = baseUrl + 'api/exercises/';
    const { data , loading, error } =  useFetch(url, {
        method:'GET', 
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.getItem('access'),}
    });
    if(!Object.keys(localStorage).includes('access')){
      navigate("/login",{
        state:{ previousUrl : location.pathname,}
      });
    }
    console.log("Profile panel:", data);
    

    if (data) return (

      <div className="flex flex-col mx-3">
          <div className="flex flex-row justify-between mt-10">
            <div className="flex flex-col gap-1 mt-2 ml-2">
                <NotificationModal/>
                <UpdateProfile profile={profileData}/>
            </div>
            <div className="flex flex-row justify-center">
                <div className="flex flex-col mx-3">
                  <p className="font-bold text-gray-800 text-xl my-0 py-0"> {username}</p>
                  <p className="font-bold text-blue-600 text-sm ">{role} </p>
                </div>
                <img  className="w-14 h-14 rounded-lg" src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSx9yBvquZ3z_DsxhnCNx2PBb1AdzBOF5iyMOqtgZJWeIs6_k9m" alt="avatar"/>
            </div>

          </div>
          <div className="flex flex-col px-4 mt-4">
            <h5 className="text-gray-400 font-semibold mr-8 tracking-wide">Exercises</h5>
           

           {/* { challanges.map((challange) => {return(

            <div  key={challange.title} className="grid grid-cols-8 mt-4 shadow-md bg-gray-200 p-1 rounded-2xl py-3">
              <button className="p-2 bg-gray-200 rounded-2xl flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className= {`w-14 aspect-square col-span-1 text-${challange.color}-400` }>
                  <path fillRule="evenodd" d="M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm14.25 6a.75.75 0 0 1-.22.53l-2.25 2.25a.75.75 0 1 1-1.06-1.06L15.44 12l-1.72-1.72a.75.75 0 1 1 1.06-1.06l2.25 2.25c.141.14.22.331.22.53Zm-10.28-.53a.75.75 0 0 0 0 1.06l2.25 2.25a.75.75 0 1 0 1.06-1.06L8.56 12l1.72-1.72a.75.75 0 1 0-1.06-1.06l-2.25 2.25Z" clipRule="evenodd" />
                </svg>
              </button>
              <div className="flex flex-col col-span-5 ml-3">
                  <p className="text-base font-bold  my-0 py-0"> {challange.title} </p>
                  <p className="text-sm text-gray-700 my-0 py-0"> {challange.description} </p>
              </div>
              <div className={`radial-progress text-${challange.color}-400 ml-7`} style={{"--value":challange.percentage, "--size": "4rem"}} role="progressbar">{challange.percentage}%</div>
            </div>
           )}) }  */}

          </div>



          <div className="flex items-center justify-center py-3 px-4">

            <div className="max-w-sm w-full shadow-lg">
                <div className="md:p-3 p-2 dark:bg-gray-800 bg-white rounded-t">
                    <div className="px-4 flex items-center justify-between">
                        <span  tabIndex="0" className="focus:outline-none  text-base font-bold dark:text-gray-100 text-gray-800">{currentDate}</span>
                        <div className="flex items-center">
                            <button aria-label="calendar backward" className="focus:text-gray-400 hover:text-gray-400 text-gray-800 dark:text-gray-100">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-left" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <polyline points="15 6 9 12 15 18" />
                            </svg>
                        </button>
                        <button aria-label="calendar forward" className="focus:text-gray-400 hover:text-gray-400 ml-3 text-gray-800 dark:text-gray-100"> 
                              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler  icon-tabler-chevron-right" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <polyline points="9 6 15 12 9 18" />
                            </svg>
                        </button>

                        </div>
                    </div>
                    
                </div>
                <div className="md:py-8 py-2 md:px-16 px-5 dark:bg-gray-700 bg-gray-100 rounded-b">
                    <div className="px-4 bg-gray-300 rounded-lg">
                        {data?.map((exercise) => {
                          return(

                          <div className="border-b  py-4 border-gray-400 border-dashed ">
                              <div className="flex flex-row justify-between">

                                <p className="text-xs font-light leading-3 text-gray-500 dark:text-gray-300">{exercise.questions.length} Questions</p>
                                <p className="text-xs font-light leading-3 text-gray-500 dark:text-gray-300">{exercise.type}</p>
                              </div>
                              <a tabIndex="0" className="focus:outline-none text-lg font-medium leading-5 text-gray-800 dark:text-gray-100 mt-2">{exercise.name}</a>
                              <p className="text-sm pt-2 leading-4  text-gray-600 dark:text-gray-300">{exercise.description}</p>
                              
                              
                              {exercise.type === "multiple_choice"  && <Exercise questionsData={exercise.questions} instruction={exercise.instruction} exerciseID={exercise.id}   /> }
                               {exercise.type === "vocabulary" && <VocabFlashCard vocabList={exercise.questions} instruction={exercise.instruction}  /> }
                               
                          </div>
                          )

                        })}
                       
                        
                    </div>
                    {data.length === 0 && <div className="flex flex-col justify-center">
                      <img alt=" " className="w-full h-auto" src="https://img.freepik.com/free-vector/book-readers-concept_74855-6263.jpg?size=626&ext=jpg&ga=GA1.1.1395880969.1709424000&semt=sph"/>
                      <p className="text-base text-center text-blue-700 font-bold"> No Exercise to display yet !</p>
                      
                      
                      
                      </div>}
                </div>
            </div>
        </div>
      </div>
      
    )
}
//