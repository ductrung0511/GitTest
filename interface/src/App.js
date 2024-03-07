import './index.css';
import { createContext, useState, useEffect } from 'react';
import { BrowserRouter, HashRouter, Route, Routes} from 'react-router-dom';
import Header from './components/StaticComponent/Header';
import Home from './pages/Index';
import BlogHome from './pages/BlogHome';
import StudentSpace from './pages/StudentSpace';
import CourseHome from './pages/CourseHome';
import Blog from './pages/Blog';
import Course from './pages/Course';
import QuizApp from './components/TestingFeatures/MultiQuestionTesting';
import Session from './pages/Session';
import HomeSpace from './pages/HomeSpace';
import Login from './pages/Login';
import Example from './components/Features/BeforeInAfterSectionBeta';
import FrequentlyAsked from './components/StaticComponent/FrequentlyAsked';
import ThemeSelecting from './components/Features/ThemeSelecting';
import { baseUrl } from './Share';
import Register from './pages/Register';
import PopularPosts from './components/StaticComponent/PopularPost';
import NewSessionLayout from './components/TestingFeatures/NewSessionLaygout';
import Resources from './pages/Resources';
import InDevelopment from './pages/InDevelopment';
import useFetch from './components/hook/useFetch';
import Performance from './pages/Performance';


export const loginContext = createContext();
function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  useEffect(()=>{
    const minute = 1000 * 60;
    function refreshToken() {
      if(localStorage.refresh){

        const url= baseUrl + 'api/token/refresh/';
        fetch(url, {
          method:'POST',
          headers: {
            'Content-Type' : 'application/json'
          },
          body:JSON.stringify( {
            refresh: localStorage.refresh,
          })
        }).then((request)=>{
          return request.json()
        }).then((data) => {
          localStorage.access = data.access;
          localStorage.refresh = data.refresh;

        
        })
    }}
    refreshToken();
    setInterval(refreshToken, minute * 4);
  }, []);

  const url = baseUrl + 'api/profile/';
  const { data , loading, error } =  useFetch(url, {
      method:'GET', 
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.getItem('access'),}
  });
  if(data && Object.keys(localStorage).includes('access')) {

    console.log(data, loading, error, "profile/api");

    localStorage.setItem('username', data.username);
    localStorage.setItem('profile_image', data.profile_image);
    localStorage.setItem('courseKey', data.courseKey );
    localStorage.setItem('courseSave', data.courseSave );
    localStorage.setItem('blogSave', data.blogSave );
    localStorage.setItem('exerciseLog', JSON.stringify(data.exerciseLog) );

    let role = "Administrator";
    if(!data.is_staff && !data.is_superuser) role = "Student";
    else if(data.is_staff && !data.is_superuser)     role = "Staff";
    localStorage.setItem('role', role );


  }
  return (

    <loginContext.Provider value={[loggedIn,setLoggedIn]}>
    <HashRouter>
      <Routes>       
        <Route path="/workspace/dashboard/" element={<StudentSpace><HomeSpace/></StudentSpace>}/>    
        <Route path="/workspace/courses/:id" element={<StudentSpace><Course/></StudentSpace>} />  
        <Route path="/workspace/session/:id" element = {<StudentSpace><Session/></StudentSpace> }/>    
        <Route path="/workspace/resources/" element = {<StudentSpace><Resources/></StudentSpace> }/>    
        <Route path="/workspace/calendar/" element = {<StudentSpace><InDevelopment/></StudentSpace> }/>    
        <Route path="/workspace/assignment/" element = {<StudentSpace><InDevelopment/></StudentSpace> }/> 
        <Route path="/workspace/performance/" element = {<StudentSpace> <Performance/> </StudentSpace> }/>    

        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
      
        <Route path="/course" element = {<Header className="bg-blue-300 text-white tracking-wider" threshold={0}><CourseHome/> </Header> }/>          
        <Route path="/blog" element = { <Header className="bg-blue-300 text-white tracking-wider"> <BlogHome/> </Header>}/>
        <Route path="/" element = { <Header className="bg-white text-white tracking-wider" threshold={10}>     <Home/> </Header>}/>
        <Route path="/blog/:id" element = { <Header className="bg-blue-300 text-white tracking-wider " threshold={0}> <Blog/>  </Header>}/>
        <Route path="/testing" element = {  <StudentSpace><NewSessionLayout/></StudentSpace>  }/> 

      </Routes>

      

      
    </HashRouter>
    </loginContext.Provider>
    
      
  )
}

export default App;
// <QuizApp/>  <Example/>  <FrequentlyAsked/>  <ThemeSelecting/> 