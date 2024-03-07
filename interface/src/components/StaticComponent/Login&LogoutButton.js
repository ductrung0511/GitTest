
import { useLocation, useNavigate } from 'react-router-dom';
// import { loginContext } from '../../App';
export default function Login() {
  const location  = useLocation();
  const navigate= useNavigate();
  // const [loggedIn, setLoggedIn] = useContext(loginContext);
  function logout() {
    localStorage.clear();
    // setLoggedIn(false);
    navigate('/login',
    {state: {previousUrl: location.pathname}}
    );
    
  }

  return (
    <div className="flex text-right m-1">
      <div className="relative inline-block text-left">
        <div>
          <button onClick={() => {localStorage.getItem('access') ? logout() : navigate('/login')}} className="inline-flex w-full justify-center rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
            {localStorage.getItem('access') ? "Logout" : 'log in'}   
          </button>
        </div>
      </div>
    </div>
  )
}


