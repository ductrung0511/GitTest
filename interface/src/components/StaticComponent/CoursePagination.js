
import { Link } from "react-router-dom";
export default function CoursePagination({courses}){


    
        return(
            <div className='grid grid-cols-2 gap-3 px-48'>
                {courses.map((course) => {
                        return (
                        <div key={course.name} className="col-span-1 shadow-md shadow-white flex flex-col mx-2 justify-between bg-white   h-[60vh] mt-2 mb-20 rounded-lg  ">
                            <div className=" relative flex flex-row gap-1 h-3/4 overflow-hidden">
                                <img className="peer h-[40vh] w-full rounded-lg object-cover " src={course.bgCardUrl} />
                                <img className="peer peer-hover:right-0  hover:opacity-100 absolute top-0 -right-96  h-[40vh] w-full object-fill rounded-lg transition-all delay-100 duration-1000 hover:right-0" 
                                src={course.bgCardUrlSecondary} alt="product image" />
                                {console.log(course.bgCardUrl)}
                            <span className="absolute top-1 left-1 m-2 rounded-full bg-white/70 px-2 text-center text-xs font-medium text-gray-800">{course.sale}% OFF</span>
                            </div>
                                <div className="flex flex-col px-2 pt-0 ">
                                <div className="flex flex-row"> 
                                    {course.category.map((category) => {return(

                                        <span key={category} className="  m-2 rounded-full bg-gray-400 px-1 py-0 text-center text-xs font-medium text-white"> {category}</span>
                                    )})}


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
        )


            

    


    
}