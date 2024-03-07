import { NavLink } from 'react-router-dom';
import Login from '../StaticComponent/Login&LogoutButton';
import LoginLanguage from '../StaticComponent/LanguageOption';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Course', href: '/course' },
  { name: 'Blog', href: '/blog' },
  { name: 'Workspace', href: '/workspace/dashboard/' },
];

export default function HeaderSpace() {
    let username= localStorage.getItem('username');
    let role = localStorage.getItem('role');
    


    return (
      
    
            <div className="p-1">
        <div className=" max-w-7xl px-2 sm:px-6 lg:px-8   bg-color-vibrant/30 back-drop-blur ">
                <div className="relative flex h-20 items-center justify-between">
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                    <div className="flex">
                        <img
                        className="h-14 w-auto rounded"
                        src="/logo.jpg"
                        alt="Your Company"
                        />
                    </div>
                    <div className="hidden sm:ml-6 sm:block">
                        <div className="flex space-x-4 pt-2">
                        {navigation.map((item) => (
                            <NavLink
                            key={item.name}
                            to={item.href}
                            className={({ isActive }) => {
                                return 'no-underline px-3 py-2 rounded-md text-sm font-medium ' + (!isActive ?
                                'text-color-secondary bg-gray-300 hover:bg-gray-700 hover:text-white' : 'bg-gray-700 text-white')
                            }}
                            >
                            {item.name}
                            </NavLink>
                        ))}
                        </div>
                    </div>
                    </div>

                    
                    <div className=' flex flex-row bg-transparent items-center'>
                        <div className="flex flex-row justify-center items-center">
                            <div className="flex flex-col mx-3 mt-1">
                                <p className="text-gray-800 text-lg my-0 py-0"> {username}</p>
                                <p className="font-light text-blue-600 text-sm  text-right">{role} </p>
                            </div>
                            <img  className="w-14 h-14 rounded-lg" src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSx9yBvquZ3z_DsxhnCNx2PBb1AdzBOF5iyMOqtgZJWeIs6_k9m" alt="avatar"/>
                        </div>

                        <Login/>

                    </div>
                </div>
                </div>
            </div>
)
}





