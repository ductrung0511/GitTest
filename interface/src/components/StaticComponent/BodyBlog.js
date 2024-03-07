import AlsoRead from "./AlsoRead";
import Contact from "./Contact";
import CourseCategories from "./CourseCategories";
import PopularPosts from "./PopularPost";

export default function BodyBlog()
{


    return(
        <div className="grid grid-cols-7" id="BASE">
            <div className=" col-span-5" id="BODY TEXT">
                <div id="OVERVIEW" className=" px-2 border-solid border-black border-2">
                    <p className="text-gray-100 font-sans items-center "> You can ace img elements must have an alt prop, either with meaningful text, or an empty string for decorative images </p>
                    <ul>
                        <li>'SavingMoney' is defined but never used</li>
                        <li>'HowItWork' is defined but never used</li>
                        <li>'Feedback' is defined but never used</li>
                        <li>'Teacher' is defined but never used</li>
                    </ul>
                </div>
                <div id="CONTENT TABLE" className=" text-gray-900 font-sans items-center border-solid border-gray-900 shadow-md mr-20">
                    <p className="">Table of Contents</p>
                    <ul>
                        <li>'SavingMoney' is defined but never used</li>
                        <li>'HowItWork' is defined but never used</li>
                        <li>'Feedback' is defined but never used</li>
                        <li>'Teacher' is defined but never used</li>
                    </ul>
                </div>

                <AlsoRead/>
                <Contact/>

            </div>
            <div className=" col-span-2 flex flex-col" id="LEFT BAR">
                <img src="Side bar blog demo.png" className=""/>
                <div id="POPULAR POST" className="px-4">
                    <h4 className="text-gray-600 font-bold capitalize"> popular posts</h4>
                    <PopularPosts/>      
                    
                </div>
                <div id="CATEGORIES" className="px-4">
                    <h4 className="text-gray-600 font-bold capitalize"> Categories</h4>    
                    <CourseCategories/>             
                </div>
                

            </div>
            
        </div>

    )
}
    
 