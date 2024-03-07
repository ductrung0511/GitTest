import Main from "../components/StaticComponent/Main";
import Features from "../components/StaticComponent/Features";
import { useEffect, useState } from "react";
import HomeBlog from "../components/StaticComponent/HomeBlog";
import Contact from "../components/StaticComponent/Contact";
import FirstView from "../components/StaticComponent/FirstView";
import Footer from "../components/StaticComponent/Footer";
import FrequentlyAsked from "../components/StaticComponent/FrequentlyAsked";
import FeatureCoures from "../components/StaticComponent/FeatureCourses";
import FeatureCoursesHUI from "../components/StaticComponent/FeatureCoursesHUI";
import SavingMoney from "../components/StaticComponent/SavingMoney";
import NewCoursesDisplay from "../components/StaticComponent/NewCoursesDisplay";
import { baseUrl } from "../Share";
// const courses = [
//     {
//       title: 'Course 1',
//       description: 'Description for Course 1',
//       imageUrl: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
//     },
//     {
//       title: 'Course 2',
//       description: 'Description for Course 2',
//       imageUrl: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
//     },
//     {
//         title: 'Course 2',
//         description: 'Description for Course 2',
//         imageUrl: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
//       },
//     {
//         title: 'Course 2',
//         description: 'Description for Course 2',
//         imageUrl: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
//       },
//     // Add more courses as needed
//   ];


export default function Home()
{
  const [notFound, setNotFound] = useState(false);
  const [blogs, setBlogs] =useState([]);
  const [courseCategories, setCourseCategories] = useState({});

  

  useEffect(() => {
    console.log("initiating the fetch");
    async function fetchData() {
      const url =  baseUrl + "api/index/";
      try {
        const response = await fetch(url);
        if(response.status === 404) setNotFound(true);
        else if (!response.ok) {
          console.error("Something went wrong");
          return;
        }
        const data = await response.json();
        setBlogs(data.blogs);
        setCourseCategories(data.courseCategories);
        
        console.log("Fetch panel", data.blogs, data.courseCategories);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  
    fetchData();
     // Call the fetchData function when the component mounts
  }, []); // Empty dependency array to ensure it runs only once
  

 return (

    <div className="bg-white w-full h-300vh text-white tracking-wider">
      
      <FirstView/>
      <Main/>
      {Object.keys(courseCategories).length !== 0 && <NewCoursesDisplay courseCategories={courseCategories}/> }
      {blogs.length !== 0 && <HomeBlog blogs={blogs} /> }
      {/*
      {courseCategories != {} && <FeatureCoursesHUI courseCategories={courseCategories}/> }
      {courseCategories.length > 0 && <FeatureCoures  courseCategories={courseCategories} /> }
      <SavingMoney/>
      

      */} 
      <Features/>
      <FrequentlyAsked/>
      <Contact/>
      <Footer/>
    </div>
    
    
 )

}