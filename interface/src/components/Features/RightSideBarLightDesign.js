
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
export default function RightSideBarLightDesign(){
    const categories = [
        {name: "Dashboard", href: "/workspace/dashboard"},
        {name: "", href: "/"},
        {name: "Courses", href :"/workspace/performance"},
        {name: "Resources", href :"/workspace/resources"},
        {name: "Calendar", href :"/workspace/calendar"},
        {name: "Assignment", href :"/workspace/assignment"},  
    ];
    const [isFixed, setIsFixed] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
   
    
    useEffect(() => {
        const handleScroll = () => {
          const scrollPosition = window.scrollY;
          const scrollable = document.documentElement.scrollHeight - window.innerHeight;
          const threshold = 580; // Adjust as needed
    
          setIsFixed( scrollPosition > threshold);
          setIsHidden( scrollPosition >  scrollable - 130);
          console.log(scrollPosition, 'scroll');
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);

    return(
    <div id="LEFT SIDE BAR/ CATEGORIES" className="px-3 pt-28">
        <div className=" w-full h-full flex flex-col items-center  max-w-7xl px-2 rounded-xl  border-0  pt-2">
            
            
            {categories.map((item, index) => (
                    
                    
                    <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) => {
                        if( item.name  === "Dashboard" & isActive )
                        return 'no-underline px-4 py-2 w-4/5 mb-2 h-10 rounded-md text-sm font-bold capitalize bg-black text-white hover:bg-gray-700 duration-700'
                        else if( item.name  === "All Courses" & !isActive )
                        return 'no-underline px-4 py-2 w-4/5 mb-2 h-10 rounded-md text-sm font-bold capitalize' + "text-color-secondary";
                        else if(item.name === "") return 'border-1 border-black w-full my-4'


                        else return 'no-underline px-4 py-2 w-4/5 mb-2 h-10 rounded-md text-sm font-bold capitalize' + (!isActive ?
                        ' font-semibold  text-color-secondary hover:bg-gray-400 duration-700' : ' bg-color-secondary/90 text-white ')
                    }}
                    >
                    {item.name}
                    </NavLink>

                ))}
            
            <div className=" h-24 w-full">

            </div>
            {/* <div className={`bg-gray-800 overflow-hidden rounded-xl z-10 h-96 ${isFixed? 'fixed top-4 left-2 w-48': 'w-48'} ${isHidden? 'hidden': ''}`}>
                <img className="object-cover " alt=" " src="https://img.freepik.com/free-psd/business-promotion-corporate-instagram-story-template_120329-1228.jpg"/>
            </div> */}
        </div>
    </div>



    )





}