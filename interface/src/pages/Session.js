import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { baseUrl } from "../Share";
import { useNavigate } from "react-router-dom";
import NewSessionLayout from "../components/TestingFeatures/NewSessionLaygout";
export default function Session(){
    const { id } = useParams();
    const [notFound, setNotFound] = useState(false);   
    const [session, setSession] =useState();
    const [sections, setSections] = useState([]);
    const [exercises, setExercises] = useState([]);

   // const [exercise, setExercise] = useState([]);
    const navigate = useNavigate();



    useEffect(() => {
      async function fetchData() {
            const url = baseUrl + "api/session/" + id;
          try {
            const response = await fetch(url , {
              headers:{
                  'Content-Type': 'application/json',
                  Authorization: 'Bearer ' + localStorage.getItem('access'),
              }
              });
            if(response.status === 404) setNotFound(true);
            else if(response.status === 401) navigate("/login");
            else if (!response.ok) {
              console.error("Something went wrong");
              return;
            }
            const data = await response.json();   
            setSession(data.session);
            setSections(data.sections); 
            setExercises(data.exercises);
            console.log(data, "from the mother Session");
    
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
      
        fetchData();
        
         // Call the fetchData function when the component mounts
      }, [id]); // Empty dependency array to ensure it runs only once
      
    
      // const addSection = (newSection) => {
      //   setSections([...sections, newSection]);
      // };
    
    if (notFound) {
        return <div>Session not found!
          <img  className="bg-white" src="https://png.pngtree.com/png-vector/20201123/ourmid/pngtree-404-not-found-or-page-error-flat-line-concept-png-image_2468879.jpg" alt=""/>
        </div>;
      }  
    else if (!sections || !session) {
        console.log(sections, session);
        return <div>Loading...</div>;
      }
    else return <NewSessionLayout sessionData={session} sectionsData={sections} sessionID ={id} exercisesData={exercises} /> ;//<CourseComponentSpace course={course} sessions={sessions} />;
    
    // <SessionComponent session={session} sections={sections} sessionID ={id}/>
}