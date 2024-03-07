
import { NavLink } from "react-router-dom";
export default function RightSideBarLightDesign(){
    const categories = [
        {name: "Dashboard", href: "/workspace/dashboard"},
        {name: "", href: "/"},
        {name: "Performance", href :"/workspace/performance"},
        {name: "Resources", href :"/workspace/resources"},
        {name: "Calendar", href :"/workspace/calendar"},
        {name: "Assignment", href :"/workspace/assignment"},  
    ];

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
        </div>
    </div>



    )





}