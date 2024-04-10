import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { baseUrl } from "../../Share";

export default function NewCoursesDisplay({courseCategories}){
    const totalCourse = 4; 
    const courses = [{},{},];
    const Starter = courseCategories['Starter'];
    const Mover = courseCategories['Mover'];
    const Flyer = courseCategories['Flyer'];
    const IELTS_TOEIC = courseCategories['IELTS & TOEIC'];
    const location = useLocation();
    const navigate= useNavigate();
    const [courseSaveList, setCourseSaveList] = useState(localStorage.getItem('courseSave')? localStorage.getItem('courseSave').split('/'): '')
    const [selectedValue, setSelectedValue] = useState('');
    const [toast, setToast] = useState(false);



    console.log('Console panel NewCourseDisPlay', courseCategories, courseSaveList);
    const handleSaveCourse =(courseID) =>{
        if( !Object.keys(localStorage).includes('courseSave') ){
            navigate("/login",{
                state:{ previousUrl : location.pathname,}
              });
        }
        const putData = {courseSave:  localStorage.getItem("courseSave")  + courseID    + '/' }  ;
        const url = baseUrl + "api/profile/";
        async function updateCourseSave() {
            try {
              const response = await fetch(url, {
                method: 'PUT',
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('access'),
                },
                body: JSON.stringify(putData),
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
                const data = await response.json();   
                localStorage.setItem('courseSave',  data.courseSave );
                setCourseSaveList(localStorage.getItem('courseSave').split('/'))
                console.log("Fetch Put Panel ",url , putData  , response.status, data , "courseSave:" , localStorage.getItem('courseSave' ), "added:", courseID  );
                
            } catch (error) {
                console.error("Error adding data:", error);
            }
            
        }
      
         updateCourseSave();
         setToast(true);

         // Set a timeout to hide the toast after 4 seconds
         setTimeout(() => {
           setToast(false);
         }, 4000);




    }


    const handleUnSaveCourse =(courseID) =>{
        
        let newList = '/';
        for(let item of courseSaveList){
            if(item != courseID && item != ''){
                newList += item;
                newList += '/';
            }
        }

        const putData = {courseSave: newList }  ;
        const url = baseUrl + "api/profile/";

        async function updateCourseSave() {
            try {
              const response = await fetch(url, {
                method: 'PUT',
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('access'),
                },
                body: JSON.stringify(putData),
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
                const data = await response.json();   
                localStorage.setItem('courseSave',  data.courseSave );
                setCourseSaveList(localStorage.getItem('courseSave').split('/'))
                console.log("Fetch Put (unSave) Panel ", url , putData  , response.status, data , "courseSave:" , localStorage.getItem('courseSave'), 'deleted:', courseID  );
                
            } catch (error) {
                console.error("Error adding data:", error);
            }
            
        }
      
        updateCourseSave();




    }
    const scrollToPosition = (position) => {
        window.scrollTo({
          top: position,
          behavior: 'smooth' // This gives a smooth scrolling effect
        });
      };


    return(
        <>

        {/* <div className="bg-gray-900">
            <h2 className="text-black">Select your favorite fruit:</h2>    
            <select className="text-black" value={selectedValue} onChange={(event)=>{setSelectedValue(event.target.value)}} >
                <option value=''>Select option</option>
                <option value='apple'>Apple</option>
                <option value='banana'>Banana</option>
                {IELTS_TOEIC.map((courses, index) =>{
                    return <option value={index}> {index} </option>
                })}
            </select>
            {selectedValue && <p>You selected: {selectedValue}</p>}
        </div> */}
        {toast && <div id="toast-default" className="flex flex-col gap-2 z-30 shadow-xl fixed bottom-3 right-3 items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg  dark:text-gray-400 dark:bg-gray-800" role="alert">
                            <div className="ms-3 text-sm  font-semibold text-black uppercase "> Course has been saved to </div>
                            <div className="flex flex-row shadow-lg  justify-between items-center px-6 hover:bg-gray-400  duration-700 w-full h-10 text-black bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-blue-200">
                                <div className="ms-3 text-sm  font-light text-black  "> My Classes  </div>
                                <svg className="w-4 h-4" aria-hidden="true" xmflns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.147 15.085a7.159 7.159 0 0 1-6.189 3.307A6.713 6.713 0 0 1 3.1 15.444c-2.679-4.513.287-8.737.888-9.548A4.373 4.373 0 0 0 5 1.608c1.287.953 6.445 3.218 5.537 10.5 1.5-1.122 2.706-3.01 2.853-6.14 1.433 1.049 3.993 5.395 1.757 9.117Z"/>
                                </svg>
                            </div>
                            <div className="text-gray-800 w-full border-solid border-gray-800 border-1"></div>
                            <button type="button" onClick={() => {setToast(false)}} className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-default" aria-label="Close">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                            </button>
                        </div>
            }
        <div className="p-4 mx-10 bg-white rounded-lg flex flex-col gap-2 items-center justify-between space-x-8 z-20 mt-20">
            <div className="h-14 w-3/4 rounded text-4xl text-center font-extrabold  text-blue-700"> Giới thiệu về các khóa học của trung tâm  </div>
        </div>
        <div className='grid grid-cols-3 gap-4 justify-center items-center pt-10 px-10'>

            <div className=" rounded-xl p-7  w-49 bg-white text-yellow-400 2xl:py-10  text-center shadow-lg"> 
                <p className="text-2xl p-0 m-0 font-bold text-blue-800">1000+</p> Học Sinh
            </div>

            <div className={`rounded-xl p-7 w-49 bg-white text-yellow-400 2xl:py-10 text-center  shadow-lg hover:bg-black ease-in duration-700`}>
                <p className="text-2xl font-bold p-0 m-0 text-blue-800 ">28+</p>Lớp Học</div>
            <div className="rounded-xl p-7 w-49 bg-white  text-yellow-400 2xl:py-10 text-center shadow-lg">
                <p className="text-2xl font-bold p-0 m-0 text-blue-800">6</p> Năm Kinh Nghiệm</div>
            
        </div>
        <div className="grid grid-cols-8 gap-3 px-10 mt-10 ">
            <div className=" mb-5 col-span-5 grid grid-cols-5 border border-transparent rounded-lg duration-700 bg-orange-200 hover:shadow-lg hover:bg-orange-300 w-full 2xl:h-56 h-48 ">
                <div className="flex flex-col col-span-2 justify-center items-center">
                    <p className="font-extrabold text-lg text-blue-800 text-center">
                    <img src="https://img.freepik.com/free-vector/back-school-background-with-elements_23-2147855886.jpg?t=st=1709708704~exp=1709712304~hmac=fc92de1a612a4280d75bd5b1390df241e8ee9755af8c2c4971fefe4eed72167a&w=740" className="w-24  h-auto ml-10 rounded-lg"/>
                         Anh Văn Mẫu giáo <br/> <span className="font-semibold">  Super Stars</span>  </p>
                </div>
                <button onClick={()=>{scrollToPosition(2680)}}  className=" col-span-3 bg-white shadow-md hover:bg-yellow-200 rounded-lg w-4/5 h-full my-4 px-4 py-2">
                    <h3 className="text-semibold text-xl text-blue-700">Khơi mở niềm đam mê</h3>
                    <p className="text-light text-xs text-black">
                        4-6 tuổi là độ tuổi vàng để giúp trẻ làm quen với ngôn ngữ và phát triển nền tảng tư duy. Phương pháp học trực quan, kích thích sự sáng tạo giúp trẻ xây dựng niềm đam mê học tập với Tiếng Anh ngày từ những bước đầu
                         </p>
                </button>
            </div>
            <div className=" pr-2 mb-30 col-span-3  grid grid-cols-7 border border-transparent rounded-lg duration-700 bg-yellow-200 hover:shadow-lg hover:bg-yellow-400 w-full h-48 2xl:h-56">
                <div className="flex flex-col col-span-3  items-center justify-center mt-3">
                    <img src="https://img.freepik.com/premium-vector/travel-around-world_51194-27.jpg?w=740" className="w-24 h-auto ml-7 rounded-lg"/>
                    <p className="font-extrabold text-lg text-blue-700 text-center"> Anh Văn Thiếu nhi <br/> <span className="font-semibold">Explorers</span> </p>
                </div>
                <button onClick={()=>{scrollToPosition(3300)}} className=" col-span-3 bg-white hover:bg-yellow-200 rounded-lg  shadow-lg  h-full  my-1 mt-4 w-72 px-4 py-1 ">
                    <h3 className="text-semibold text-xl text-blue-700"> Khám phá thế giới</h3>
                    <p className="text-light text-xs text-black">
                    Chương trình Anh văn thiếu nhi giúp trẻ làm quen và phát triển lượng từ vựng với các chủ đề thân thuộc trong cuộc sống hàng ngày thông qua các hoạt động học tập tại lớp. Trẻ được trang bị kiến thức sẵn sàng cho các kỳ thi Chứng chỉ quốc tế Cambridge Starters, Movers, Flyers.
                         
                         </p>
                </button>
            </div>
            <div className=" col-span-4 grid grid-cols-5 border border-transparent rounded-lg duration-700 bg-blue-200 hover:shadow-lg hover:bg-blue-300 w-full h-48 2xl:h-56">
                <div className="flex flex-col col-span-2 justify-center items-center">
                    <p className="font-extrabold text-lg text-blue-700 text-center pb-0">
                    <img src="https://img.freepik.com/free-vector/illustration-kids-concept_53876-26954.jpg?t=st=1709708803~exp=1709712403~hmac=f5a6c2cafca5a783230f5f79e77bdfe325b7858f033c72d7c0c708eabcea3139&w=900" className="w-24  h-auto ml-10 rounded-lg"/>
                         Anh Văn Thiếu Niên <br/> <span className="font-semibold">Leaders</span> </p>
                </div>
                <button onClick={()=>{scrollToPosition(4000)}}  className=" col-span-3 bg-white shadow-lg hover:bg-yellow-200 rounded-lg w-4/5 h-full  my-4 px-4 py-1">
                    <h3 className="text-semibold text-xl text-blue-700"> Làm chủ tương lai  </h3>
                    <p className="text-light text-xs text-black"> 
                    Chương trình Anh văn thiếu niên giúp học sinh phát triển sự tự tin, kích thích niềm say mê học hỏi thông qua các chủ đề mang tính thời sự và mang tính định hướng nghề nghiệp cho tương lai. Học sinh được trang bị kiến thức sẵn sàng cho các kỳ thi Chứng chỉ Cambridge KET, PET, FCE.
                    </p>
                </button>
            </div>
            <div className=" col-span-4 grid grid-cols-5 border border-transparent rounded-lg duration-700 bg-green-200 hover:shadow-lg hover:bg-green-300 w-full h-48 2xl:h-56">
                <div className="flex flex-col col-span-2  justify-center items-center">
                    <p className="font-extrabold text-lg text-blue-700 text-center">
                    <img src="https://img.freepik.com/free-vector/hand-drawn-back-school-background_23-2149031981.jpg?t=st=1709708654~exp=1709712254~hmac=46bb39064aa2f53209eeab2ed987d6c93385e932d4853f2b1336fe72c3ede620&w=826" className="w-24  h-auto ml-4 rounded-lg"/>
                    Luyện Thi IELTS <br/><span className="font-semibold"> Fly to the world </span></p>
                </div>
                <button onClick={()=>{scrollToPosition(4670)}}  className=" col-span-3 bg-white shadow-lg hover:bg-yellow-200 rounded-lg w-4/5 h-full my-4 px-4 py-1">
                    <h3 className="text-semibold text-xl text-blue-700"> Công dân toàn cầu</h3>
                    <p className="text-light text-xs text-black"> 
                    Chương trình IELTS cung cấp kiến thức học thuật tổng quát 4 kỹ năng. Giúp học sinh trau dồi và áp dụng hiệu quả vào bài thi IELTS. Ngoài ra, thông qua các buổi học, học sinh được khuyến khích phát triển khả năng tự học, tư nghiên cứu nhằm tự lập hơn khi bước vào môi trường học tập mang tính quốc tế khi vào đại học và đi làm.
                    </p>
                </button>
            </div>
            
        </div>
        <div className="h-48 w-full"></div>
        
        
            <div id="STARTER" className="grid grid-cols-6 px-7 gap-1 mt-32 relative">
                <div className="col-span-1 row-span-3  my-2 ml-2 w-full rounded-lg bg-gray-800">
                    <img className="object-cover w-full h-screen rounded-lg" src="https://images.pexels.com/photos/6678582/pexels-photo-6678582.jpeg"/>
                </div>
                <div className=" grid grid-cols-4 col-span-5">

                {
                    Starter?.map((course)=>{              
                        return (
                            <div className="col-span-2 relative" key={course.name}> 

                            
                                <NavLink to={'/workspace/courses/' + course.id} className='no-underline '>
                                            <div className=" relative overflow-hidden px-8  shadow-white flex flex-col mx-2  bg-white   h-[48vh] mt-2 mb-2 rounded-lg ">
                                                <img className="peer h-[40vh] w-full rounded-lg object-cover shadow-md " src={course.bgCardUrlSecondary} />
                                                {/* <span className="absolute top-1 left-12 m-2 rounded-full bg-white/70 px-2 text-center text-xs font-medium text-gray-800">{course.sale}% OFF</span> */}
                                            </div>
                                </NavLink>
                                        <div className={`flex flex-col p-3 gap-3 w-72 bg-${course.color}-200 rounded-lg absolute bottom-3 right-3 hover:bg-green-400 duration-700 ease-in-out `} >
                                            <div className="flex flex-row justify-between " >
                                                <p className="text-xs font-light  text-color-secondary  m-0 p-0">serial: {course.serial}</p>
                                                <p className="text-xs font-light  text-color-secondary  m-0 p-0"> {course.duration} sessions </p>
                                            </div>
                                            
                                            <div className="text-xs  text-center rounded-lg font-extrabold hover:bg-blue-300/10 text-color-secondary  capitalize">
                                            {course.name}
                                            </div>
                                                
                                            <div className="flex flex-row justify-between ">
                                                <p className="text-xs font-light  text-color-secondary  m-0 p-0"> {course.textBook}</p>
                                                {courseSaveList.includes('' + course.id) ?
                                                        
                                                        <button className=" text-black font-light  rounded-lg" onClick={()=>{handleUnSaveCourse(course.id)}}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                            <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM20.25 5.507v11.561L5.853 2.671c.15-.043.306-.075.467-.094a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93ZM3.75 21V6.932l14.063 14.063L12 18.088l-7.165 3.583A.75.75 0 0 1 3.75 21Z" />
                                                            </svg>

                                                        </button>:
                                                        <button className=" text-black font-light  rounded-lg" onClick={()=>{handleSaveCourse(course.id)}}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6  `}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                                                            </svg>
                                                        </button>
                                                        }
                                            </div>
                                        </div>
                            </div>

                        
                        
                        )


                        

                        
                        
                        
                    })
                    
                
                }
                </div>

            </div>

            <div id="MOVER" className="grid grid-cols-6 px-7 gap-1 mt-7 relative">

                            
                    <div className=" grid grid-cols-4 col-span-5">
                        {
                            Mover?.map((course)=>{              
                                return (
                                    <div className="col-span-2 relative" key={course.name}> 

                                    
                                        <NavLink to={'/workspace/courses/' + course.id} className='no-underline '>
                                                    <div className=" relative overflow-hidden px-8  shadow-white flex flex-col mx-2  bg-white   h-[48vh] mt-2 mb-2 rounded-lg ">
                                                        <img className="peer h-[40vh] w-full rounded-lg object-cover shadow-md  " src={course.bgCardUrlSecondary} />
                                                        {/* <span className="absolute top-1 left-12 m-2 rounded-full bg-white/70 px-2 text-center text-xs font-medium text-gray-800">{course.sale}% OFF</span> */}
                                                    </div>
                                        </NavLink>
                                                <div className={`flex flex-col p-3 gap-3 w-72 bg-${course.color}-200 rounded-lg absolute bottom-3 right-3 hover:bg-green-400  duration-700 ease-in-out`} >
                                                    <div className="flex flex-row justify-between " >
                                                        <p className="text-xs font-light  text-color-secondary  m-0 p-0">serial: {course.serial}</p>
                                                        <p className="text-xs font-light  text-color-secondary  m-0 p-0"> {course.duration} sessions </p>
                                                    </div>
                                                    
                                                    <div className="text-xs  text-center rounded-lg font-extrabold hover:bg-blue-300/10 text-color-secondary  capitalize">
                                                    {course.name}
                                                    </div>
                                                        
                                                    <div className="flex flex-row justify-between ">
                                                        <p className="text-xs font-light  text-color-secondary  m-0 p-0"> {course.textBook}</p>
                                                        {courseSaveList.includes('' + course.id) ?
                                                        
                                                        <button className=" text-black font-light  rounded-lg" onClick={()=>{handleUnSaveCourse(course.id)}}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                            <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM20.25 5.507v11.561L5.853 2.671c.15-.043.306-.075.467-.094a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93ZM3.75 21V6.932l14.063 14.063L12 18.088l-7.165 3.583A.75.75 0 0 1 3.75 21Z" />
                                                            </svg>

                                                        </button>:
                                                        <button className=" text-black font-light  rounded-lg" onClick={()=>{handleSaveCourse(course.id)}}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6  `}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                                                            </svg>
                                                        </button>
                                                        }
                                                    </div>
                                                </div>
                                    </div>

                                
                                
                                )


                                

                                
                                
                                
                            })
                        }
                    </div>

                    <div className="col-span-1 row-span-3  my-2 ml-2 w-full rounded-lg bg-gray-800">
                        <img className="object-cover w-full rounded-lg h-screen" src="https://images.pexels.com/photos/6847702/pexels-photo-6847702.jpeg"/>
                    </div>

            </div>
            <div id="Flyer" className="grid grid-cols-6 px-7 gap-1 mt-32 relative">
                <div className="col-span-1 row-span-3  my-2 ml-2 w-full rounded-lg bg-gray-800">
                    <img className="object-cover w-full rounded-lg h-screen" src="https://images.pexels.com/photos/7168967/pexels-photo-7168967.jpeg"/>
                </div>

                <div className=" grid grid-cols-4 col-span-5">

                {
                    Flyer?.map((course)=>{              
                        return (
                            <div className="col-span-2 relative" key={course.name}> 

                            
                                <NavLink to={'/workspace/courses/' + course.id} className='no-underline '>
                                            <div className=" relative overflow-hidden px-8  shadow-white flex flex-col mx-2  bg-white   h-[48vh] mt-2 mb-2 rounded-lg ">
                                                <img className="peer h-[40vh] w-full rounded-lg object-cover shadow-md " src={course.bgCardUrlSecondary} />
                                                {/* <span className="absolute top-1 left-12 m-2 rounded-full bg-white/70 px-2 text-center text-xs font-medium text-gray-800">{course.sale}% OFF</span> */}
                                            </div>
                                </NavLink>
                                        <div className={`flex flex-col p-3 gap-3 w-72 bg-${course.color}-200 rounded-lg absolute bottom-3 right-3 hover:bg-green-400  duration-700 ease-in-out`} >
                                            <div className="flex flex-row justify-between " >
                                                <p className="text-xs font-light  text-color-secondary  m-0 p-0">serial: {course.serial}</p>
                                                <p className="text-xs font-light  text-color-secondary  m-0 p-0"> {course.duration} sessions </p>
                                            </div>
                                            
                                            <div className="text-xs  text-center rounded-lg font-extrabold hover:bg-blue-300/10 text-color-secondary  capitalize">
                                            {course.name}
                                            </div>
                                                
                                            <div className="flex flex-row justify-between ">
                                                <p className="text-xs font-light  text-color-secondary  m-0 p-0"> {course.textBook}</p>
                                                {courseSaveList.includes('' + course.id) ?
                                                        
                                                        <button className=" text-black font-light  rounded-lg" onClick={()=>{handleUnSaveCourse(course.id)}}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                            <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM20.25 5.507v11.561L5.853 2.671c.15-.043.306-.075.467-.094a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93ZM3.75 21V6.932l14.063 14.063L12 18.088l-7.165 3.583A.75.75 0 0 1 3.75 21Z" />
                                                            </svg>

                                                        </button>:
                                                        <button className=" text-black font-light  rounded-lg" onClick={()=>{handleSaveCourse(course.id)}}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6  `}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                                                            </svg>
                                                        </button>
                                                        }
                                            </div>
                                        </div>
                            </div>

                        
                        
                        )


                        

                        
                        
                        
                    })
                    
                
                }
                </div>

            </div>
            <div id="IELTS_TOEIC" className="grid grid-cols-6 px-7 gap-1 mt-7 relative">
                            
                    <div className=" grid grid-cols-4 col-span-5">
                        {
                            IELTS_TOEIC?.map((course)=>{              
                                return (
                                    <div className="col-span-2 relative" key={course.name}> 

                                    
                                        <NavLink to={'/workspace/courses/' + course.id} className='no-underline '>
                                                    <div className=" relative overflow-hidden px-8   flex flex-col mx-2  bg-white   h-[48vh] mt-2 mb-2 rounded-lg ">
                                                        <img className="peer h-[40vh] w-full rounded-lg shadow-md object-cover " src={course.bgCardUrlSecondary} />
                                                        {/* <span className="absolute top-1 left-12 m-2 rounded-full bg-white/70 px-2 text-center text-xs font-medium text-gray-800">{course.sale}% OFF</span> */}
                                                    </div>
                                        </NavLink>
                                                <div className={`flex flex-col p-3 gap-3 w-72 bg-${course.color}-200 rounded-lg absolute bottom-3 right-3 hover:bg-green-400  duration-700 ease-in-out `} >
                                                    <div className="flex flex-row justify-between " >
                                                        <p className="text-xs font-light  text-color-secondary  m-0 p-0">serial: {course.serial}</p>
                                                        <p className="text-xs font-light  text-color-secondary  m-0 p-0"> {course.duration} sessions </p>
                                                    </div>
                                                    
                                                    <div className="text-xs  text-center rounded-lg font-extrabold hover:bg-blue-300/10 text-color-secondary  capitalize">
                                                    {course.name}
                                                    </div>
                                                        
                                                    <div className="flex flex-row justify-between ">
                                                        <p className="text-xs font-light  text-color-secondary  m-0 p-0"> {course.textBook}</p>
                                                        {courseSaveList.includes('' + course.id) ?
                                                        
                                                        <button className=" text-black font-light  rounded-lg" onClick={()=>{handleUnSaveCourse(course.id)}}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                            <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM20.25 5.507v11.561L5.853 2.671c.15-.043.306-.075.467-.094a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93ZM3.75 21V6.932l14.063 14.063L12 18.088l-7.165 3.583A.75.75 0 0 1 3.75 21Z" />
                                                            </svg>

                                                        </button>:
                                                        <button className=" text-black font-light  rounded-lg" onClick={()=>{handleSaveCourse(course.id)}}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6  `}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                                                            </svg>
                                                        </button>
                                                        }
                                                    </div>
                                                </div>
                                    </div>

                                
                                
                                )


                                

                                
                                
                                
                            })
                        }
                    </div>

                    <div className="col-span-1 row-span-3  my-2 ml-2 w-full rounded-lg ">
                        <img className="object-cover rounded-lg w-full h-screen" src="https://images.pexels.com/photos/6482881/pexels-photo-6482881.jpeg"/>
                    </div>

            </div>

        </>
    )
}
