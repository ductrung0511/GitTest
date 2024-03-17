import HeaderSpace from "../components/Features/HeaderSpace";
import Footer from "../components/StaticComponent/Footer";
import RightSideBarLightDesign from "../components/Features/RightSideBarLightDesign";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
export default function StudentSpace(props)
{
    const backgroundImageUrl = "";    
    const containerStyle = {
        backgroundImage: `url('${backgroundImageUrl}')`,
    };
    const navigate = useNavigate();

    

    

 return (
    <>
        <div style={containerStyle}>
            <HeaderSpace/>
            
            <section className="grid grid-cols-12 bg-color-vibrant/30  " id="BODY PAGE" >
                <div className="col-span-2"> 
                    <nav className="flex px-5 pb-2 pt-4 mt-3 text-gray-700  w-3/4 h-12 items-center  rounded-lg" >
                        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                            <Tooltip id="my-tooltip"/>
                            <li
                            data-tooltip-content='Trang chủ'
                            data-tooltip-id="my-tooltip"
                             className="inline-flex items-center">
                            <button  onClick={()=>{navigate('/')}} className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-400 dark:text-gray-400 dark:hover:text-white">
                                <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                                </svg>
                                Home
                            </button>
                            </li>
                            <li
                            data-tooltip-content='Trang Học Tập'
                            data-tooltip-id="my-tooltip"
                            >
                            <div className="flex items-center">
                                <svg className="rtl:rotate-180 block w-3 h-3 mx-1 text-gray-400 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                                </svg>
                                <button onClick={()=>{navigate('/workspace/dashboard/')}} className="ms-1 text-sm font-medium text-gray-700 hover:text-gray-400 md:ms-2 dark:text-gray-400 dark:hover:text-white">Workspace</button>
                            </div>
                            </li>
                            <li aria-current="page">
                            <div className="flex items-center">
                                <svg className="rtl:rotate-180  w-3 h-3 mx-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                                </svg>
                            </div>
                            </li>
                        </ol>
                    </nav>
                    <RightSideBarLightDesign/>
                </div>
                <div id="MAIN BODY " className="col-span-10 m-2 px-2 rounded-xl ">
                    
                    {/* 
                    <Header threshold ={10} />
                    
<RightSideBar/>

                    <Course/>
                    <CourseComponentSpace/>
                    <SessionComponent session={sessions[0]}/>
                    <AttendanceHistory attendanceExcelUrl= {session.attendanceExcelUrl} />
                    <GradeBook gradeBookUrl={session.gradeBookUrl}/>
                    */}
                    
                    {props.children}
                </div>
                <div className="col-span-12">
                    <Footer/>

                </div>
            </section>
            

            
            
        </div>
    </>
 )

}