import Login from "../StaticComponent/Login&LogoutButton";
import LoginLanguage from "../StaticComponent/LanguageOption";
import { NavLink } from "react-router-dom";
export default function HeaderStatic(props)
{
    const color= props.color;
    console.log(color);
    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'Course', href: '/course' },
        { name: 'Blog', href: '/blog' },
        { name: 'Workspace', href: '/space' },
        
      ];
    return(
        <div className={`flex flex-row justify-between  h-20  px-3 py-3 bg-color-${color}`}>

            <div className="flex">
                <img
                className="h-[18] w-auto rounded"
                src="/logo.jpg"
                alt="Your Company"
                />
                <div className="hidden sm:ml-6 sm:block   ">
                                <div className="flex space-x-4 pt-3 ">
                                {navigation.map((item) => (
                                    <NavLink
                                    key={item.name}
                                    to={item.href}
                                    className={({ isActive }) => {
                                        return ' no-underline px-3 py-2 rounded-md text-sm font-medium ' + (!isActive ?
                                        'text-gray-100 hover:bg-gray-700 hover:text-white' : 'bg-gray-900 text-white')
                                    }}
                                    >
                                    {item.name}
                                    </NavLink>
                                ))}
                                </div>
                </div>
            </div>
            <div className=' flex flex-row bg-transparent'>
                
                <Login/>
                <LoginLanguage/>
            </div>
        </div>
    )
}