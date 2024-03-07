import { useParams,Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { baseUrl } from "../Share";
import { useLocation } from "react-router-dom";
import CourseComponentSpace from "../components/Features/CourseComponentSpace";
export default function Course(){
    const {id} = useParams();
    const [notFound, setNotFound] = useState(false);   
    const [course, setCourse] =useState();
    const [sessions, setSessions] =useState([]);
    
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        async function fetchData() {
            
            const url = baseUrl + "api/courses/" + id;
          try {
            const response = await fetch(url, {
              headers:{
                  'Content-Type': 'application/json',
                  Authorization: 'Bearer ' + localStorage.getItem('access'),
            }
            });
            console.log('response:', response.status);
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

            console.log(response.status);
            const data = await response.json();   
            console.log(data,"data");
            setCourse(data.course);
            setSessions(data.sessions);
            
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
      
        fetchData();
        
         // Call the fetchData function when the component mounts
      }, [id]); // Empty dependency array to ensure it runs only once
      const addSession = (newSession) => {
        setSessions([...sessions, newSession]);
      };
    
    if (notFound) {
        return <div>Course not found.</div>;
      }
    
    if (!course || !sessions) {
        return <div>Loading...</div>;
      }
    
    return <CourseComponentSpace course={course} sessions={sessions} id={id} categoryID={course.category} />;
    
    
}