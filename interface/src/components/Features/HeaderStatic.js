import Login from "../StaticComponent/Login&LogoutButton";
import LoginLanguage from "../StaticComponent/LanguageOption";
import { NavLink } from "react-router-dom";
import { Tooltip } from "react-tooltip";
export default function HeaderStatic(props)
{
    const color= props.color;
    console.log(color);
    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'Course', href: '/course', tip:'📖 Tham quan các khóa học của Trung tâm!' },
        // { name: 'Blog', href: '/blog' },
        { name: 'Workspace', href: '/space', tip:'📁Theo dõi các Khóa học đã đăng kí tại đây' },
        
      ];
    return(
        <div className={`flex flex-row justify-between  h-20  px-3 py-3 bg-color-${color}`}>
            <Tooltip id="tooltip-header"/>

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
                                    data-tooltip-content={item.tip}
                                    data-tooltip-id='tooltip-header'
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