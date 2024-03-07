import { NavLink } from "react-router-dom";

export default function RightSideBar(){
    const navigation = [
    {name: "Dashboard", href :"/workspace/dashboard/"},
    //{name: "Make up Class", href :"#"},
    {name: "Resources", href :"/workspace/resources/"},
    {name: "Calendar", href :"/workspace/calendar"},
    {name: "Assignment", href :"/workspace/assignment"},    
    //{name: "Gradebook", href :"#"},
]

    return (
        <div className="p-1">
            <div className=" w-full h-full flex flex-col items-center  max-w-7xl px-2 rounded-xl  border-0  bg-colorprimary/30 back-drop-blur pt-10">
                    {navigation.map((item) => (
                            <NavLink
                            key={item.name}
                            to={item.href}

                            className={({ isActive }) => {
                                return 'no-underline px-4 py-2 w-3/4 mb-2 h-10 rounded-md text-sm font-semibold ' + ( (!isActive ) ?
                                'flex drop-shadow-sm shadow-lg  bg-white font-semibold  items-center  text-color-secondary' : ' bg-blue-300 text-color-secondary')
                            }}
                            >
                            {item.name}
                            </NavLink>
                        ))}
                        {/*
                        
                        */}
                        
            </div>
        </div>
    )
}


{/*<div class="space-y-4 my-2 items-center ">
                    {items.map((item, index) => {
                        return( 
                            <a href={item.href} class="flex drop-shadow-sm shadow-lg bg-color-secondary/40 font-semibold text-sm items-center px-4 py-2 no-underline rounded-md text-color-secondary ">
                            {item.name}
                            </a>
                        )

                    })}
                    
                    
                    
                </div>*/}