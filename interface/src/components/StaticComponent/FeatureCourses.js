import { Link, useNavigate, useLocation} from "react-router-dom";
import { useEffect, useState } from "react";

export default function FeatureCoures( props){
    //const navigate = useNavigate();
    const [courses, setCourses] =useState(props.courseCategories[2].courses);
    const courseCategories = props.courseCategories;
    console.log(props.courseCategories[2].courses, "courses");
    const [selectedCat,  setSelectedCat] = useState( props.courseCategories[0].category);
    const [selectedCourses, setSelectedCourses] = useState( props.courseCategories[0].courses);
    courseCategories.map((category) => {console.log(category.category, "name category");});

   
    return (
        
        <div>
            <div className="flex flex-row mx-10 m-4 px-7"> 
            {

                courseCategories.map((category) => {

                    if (category.category === selectedCat) return( 
                        <div
                            key={category.category} className="text-black font-bold border-2 mx-2 border-black text-lg rounded-3xl p-1">
                        {category.category}
                        </div>
                    );
                    

                    return( 
                    
                    <div key={category.category} className="text-gray-400 font-bold border-2 mx-2 border-gray-400 text-lg rounded-3xl p-1">
                        {category.category}
                    </div>)
                })

            }
            </div>
          <div className="grid grid-cols-8 ml-1 w-full px-14"> 
                        {courses.map((course, index) => {
                    return (
                    <div  className="col-span-2 flex flex-col mx-2 justify-between bg-white shadow-md  h-[60vh] my-2 rounded-lg  ">
                        <div className=" relative flex flex-row gap-1 h-3/4 overflow-hidden">
                            <img className="peer h-[40vh] w-full rounded-lg object-cover " src={"https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60?a=b"} />
                            <img className="peer peer-hover:right-0  hover:opacity-100 absolute top-0 -right-96  h-60 w-full object-fill rounded-lg transition-all delay-100 duration-1000 hover:right-0" src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="product image" />
                        <span className="absolute top-1 left-1 m-2 rounded-full bg-white/70 px-2 text-center text-xs font-medium text-gray-800">39% OFF</span>
                        </div>
                            <div className="flex flex-col px-2 pt-0 ">
                            <div className="flex flex-row"> 
                              <span className="  m-2 rounded-full bg-gray-400 px-1 py-0 text-center text-xs font-medium text-white">TOFLE</span>
                              <span className="  m-2 rounded-full bg-gray-400 px-1 py-0 text-center text-xs font-medium text-white">IELTS</span>


                            </div>
                            <p className="text-xs font-bold  text-color-secondary  m-0 p-0"> {course.serial}-{course.id}</p>
                            <Link to={"/workspace/courses/" + course.id} className="no-underline"> 
                                <div className="text-xs mb-3 text-center rounded-lg font-extrabold hover:bg-blue-300/10 text-color-secondary  uppercase">
                                    {course.name}</div>
                            </Link>

                        </div>
                     </div>
                        
                    );
                })}

          </div>
        
        </div>
      
      )
    
}