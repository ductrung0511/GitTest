import HeaderSpace from "../components/Features/HeaderSpace";
import Footer from "../components/StaticComponent/Footer";
import RightSideBarLightDesign from "../components/Features/RightSideBarLightDesign";
export default function StudentSpace(props)
{
    const backgroundImageUrl = "";    
    const containerStyle = {
        backgroundImage: `url('${backgroundImageUrl}')`,
    };

    

    

 return (
    <>
        <div style={containerStyle}>
            <HeaderSpace/>
            
            <section className="grid grid-cols-12 bg-color-vibrant/30  " id="BODY PAGE" >
                <div className="col-span-2"> 
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