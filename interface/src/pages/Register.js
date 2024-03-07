import { useState, useEffect, useContext } from "react";
import { baseUrl } from "../Share";
import { useLocation, useNavigate } from "react-router-dom";
import { loginContext } from "../App";
import useFetch from "../components/hook/useFetch";
export default function Register(){
    const [loggedIn, setLoggedIn] = useContext(loginContext);
    const[username , setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [email, setEmail] = useState('');

    const location = useLocation();
    const navigate = useNavigate();

    async function register(e){
        e.preventDefault();
        function fetchRegister(){

            const url = baseUrl + 'api/register/';
            fetch(url, {
                method :'POST',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({
                    username: username, 
                    password: password,
                    email : email,
                })
                }).then((response)=> {
                if(response.status === 401) setLoggedIn(false);
                
                if(!response.ok)  console.log('register panel/ not OK' , response);
                return response.json();
            }).then((data) => {
                console.log('data returned from register', data)
                
                if(data.access && data.refresh){
                    localStorage.clear()
                    console.log('register panel' , data);
                    localStorage.setItem('access', data.access);
                    localStorage.setItem('refresh', data.refresh);
                    navigate(location?.state?.previousUrl? location.state.previousUrl : "/" );
                    
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
                            localStorage.setItem('blogSave', data.blogSave);
                            localStorage.setItem('exerciseLog', JSON.stringify(data.exerciseLog) );


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

                    }

                }
                else if(data.username[0] === "A user with that username already exists." )
                {
                    alert('A user with that username already exists.');
                }
                
            });
        }
        if(rePassword!== password){
            alert("Password does not match!");
            console.log(rePassword, password);
            return;
        }
        else if(rePassword.length < 9 ){
            alert("Password not long enough, it supposed to be more than 8 characters");
            return;
        }
        else if(password === rePassword && password.length > 8) {
            fetchRegister();
        }
        console.log(username, password, email, rePassword);

        

    }
return(
    
    <section className="bg-gray-50 dark:bg-gray-900 " 
    style={{backgroundImage: `url('https://image.slidesdocs.com/responsive-images/background/green-flat-style-environmental-agency-simple-powerpoint-background_1f596db9e5__960_540.jpg')`}} 
    >
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
          NZEC    
      </a>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Register your account
              </h1> 
              <form className="space-y-4 md:space-y-6" action="#" onSubmit={register}>
                  <div>
                      <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
                      <input type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                      placeholder="username" required="" onChange={(e) => {setUsername(e.target.value)}}/>
                  </div>
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="text" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                      placeholder="name@company.com" required="" onChange={(e) => {setEmail(e.target.value)}}/>
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                      required="" onChange={(e) => {setPassword(e.target.value)}}/>
                  </div>
                  <div>
                      <label htmlFor="reenterPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter your password again</label>
                      <input type="password" name="rePassword" id="rePassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                      required="" onChange={(e)=> {setRePassword(e.target.value)}} />
                  </div>
                  <div className="flex items-center justify-between">
                      <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                          </div>
                      </div>
                      <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                  </div>
                  

                  <button type="submit" onSubmit={register} className="w-full text-black bg-green-900 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    Register</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Already have an account ? <button onClick={()=>{navigate('/login/')}} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in</button>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>

)
}