import { useState, useEffect, useContext, useRef } from "react";
import { baseUrl } from "../Share";
import { useLocation, useNavigate } from "react-router-dom";
import { loginContext } from "../App";
import Alert from "../components/Features/Alert";
export default function Login(){
    const [loggedIn, setLoggedIn] = useContext(loginContext);
    const [isWrongPassword, setIsWrongPassword] = useState(false);
    const[username , setUsername] = useState('');
    const [password, setPassword] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const [isAlert, setIsAlert] = useState(false);
    const message = useRef('');
    const [alertTime, setAlertTime] = useState(0);

    // useEffect(()=> { console.log(location.state) });
    function login(e){
        e.preventDefault();
        const url = baseUrl + 'api/token/';
        fetch(url, {
            method :'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                username: username, 
                password: password,
            })
            }).then((response)=> {
            if(response.status === 401) 
            setLoggedIn(false);
            return response.json();
        }).then((data) => {
            if(data.access && data.refresh){
                localStorage.clear()
                console.log('login panel' , data);
                localStorage.setItem('access', data.access);
                localStorage.setItem('refresh', data.refresh);
                if(data.access){
                    const url = baseUrl + 'api/profile/';
                    fetch(url, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + localStorage.getItem('access')
                        }
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log(data, "profile/api");
                        localStorage.setItem('username', data.username);
                        localStorage.setItem('profile_image', data.profile_image);
                        localStorage.setItem('courseKey', data.courseKey);
                        localStorage.setItem('courseSave', data.courseSave);
                        localStorage.setItem('courseAuth', data.courseAuth );
                        localStorage.setItem('blogSave', data.blogSave);
                        localStorage.setItem('exerciseLog', JSON.stringify(data.exerciseLog) );

                        localStorage.setItem('bio', data.bio );
                        localStorage.setItem('school', data.school );


                        let role = "Administrator";
                        if (!data.is_staff && !data.is_superuser) {
                            role = "Student";
                        } else if (data.is_staff && !data.is_superuser) {
                            role = "Staff";
                        }
                        localStorage.setItem('role', role);
                    })
                    .catch(error => {
                        console.error('There was a problem with the fetch operation:', error);
                    });
                navigate(location?.state?.previousUrl? location.state.previousUrl : "/" );


                }

            }
            else if(data['detail'] === "No active account found with the given credentials"){
                setIsWrongPassword(true);
                // alert("No active account found with the given credentials, Username or Password not found");
                setIsAlert(true);
                message.current = "Tên đăng nhập hoặc mật khẩu không đúng, vui lòng kiểm tra lại";
                setAlertTime((prev) => prev + 1);
            }
            
        });

    }
return(
    
    <section className="bg-gray-50 dark:bg-gray-900 bg-cover"
    style={{backgroundImage: `url('https://image.slidesdocs.com/responsive-images/background/green-flat-style-environmental-agency-simple-powerpoint-background_1f596db9e5__960_540.jpg')`}} 
    >
        {isAlert && <Alert message={message.current} dataValue={4} alertTime={alertTime}   setIsAlert={setIsAlert}/>}
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" className="flex gap-4  items-center justify-center mb-6 no-underline ">
            <div className="text-2xl font-extrabold text-black dark:text-white "> New Zealand English Center</div>
            <img className="w-44 h-auto mr-2 rounded-lg" src="/logo.jpg" alt="logo"/>
      </a>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Đăng nhập vào hệ thống
              </h1> 
              <form className="space-y-4 md:space-y-6" action="#" onSubmit={login}>
                  <div>
                      <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên đăng nhập</label>
                      <input type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                      placeholder="user101" required="" onChange={(e) => {setUsername(e.target.value)}}/>
                  </div>
                  <div>
                        {!isWrongPassword? 
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật Khẩu</label>
                      :  <label htmlFor="password" className="block mb-2 text-sm font-medium text-red-800 dark:text-white"> Mật khẩu hoặc tên đăng nhập không đúng!</label>
                        }
                      <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                      required="" onChange={(e) => {setPassword(e.target.value)}}/>
                  </div>
                  <div className="flex items-center justify-between">
                      <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Nhớ tôi</label>
                          </div>
                      </div>
                  </div>
                  

                  <button type="submit" className="w-full text-white bg-black  font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                    Đăng nhập</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Chưa có Tài Khoản? <a href="#/register/" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Tạo Tài Khoản ngay</a>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>

)
}