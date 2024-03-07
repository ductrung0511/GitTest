import { baseUrl } from "../../Share";
import { useState } from "react";

export default function Contact()
{

    const [info, setInfo] = useState({
        name:"",
        message:"",
        email:"",
        phone:"",
        school:"",

    })
    const [confirm, setConfirm] = useState(false);
    const handleSubmitContact= () =>{
        setConfirm(true);
        async function addData() {
            const url = baseUrl + "api/index/";
            try {
              const response = await fetch(url, {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                    // Authorization: 'Bearer ' + localStorage.getItem('access'),
                },
                body: JSON.stringify(info),
            });
              if(response.status === 404) console.log("Not found");
              
              else if (!response.ok) {
                console.error("Something went wrong");
                return;
              }
              setInfo({
                name:"",
                message:"",
                email:"",
                phone:"",
                school:"",
              });
  
            } catch (error) {
              console.error("Error adding data:", error);
            }
            console.log("Fetch Add Panel", url );
          }
          addData();
    }
    function handleInputChange(event) {
        const { name, value } = event.target;
        setInfo({ ...info, [name]: value });
    }


return(
    <section>
        <div className="grid grid-cols-4">
            <div className="flex flex-col py-5 bg-blue-300 mx-24 rounded-lg my-10 col-span-4">
                <div className="text-center m-auto mb-10 p-3 ">
                    <h4 className="text-color-secondary-dark text-3xl capitalize font-extrabold">Bạn có câu hỏi gì về Trung Tâm ?</h4>
                    <p className="text-white text-3xl capitalize font-bold ">Hãy liên hệ với giáo viên chúng tôi nhé!</p>
                </div>
                
                <form className=" mx-auto flex flex-col justify-center" onSubmit={handleSubmitContact}> {/* navigate('/') */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="mb-0">
                        <label for="text" className="block mb-2 text-sm font-medium text-gray-900
                        dark:text-white">Name</label>
                        <input type="text" id="text" name="name"
                        value={info.name}
                        onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Name" required />
                    </div>
                    <div className="mb-0">
                            <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Your email</label>
                            <input type="email" id="email"
                            name="email"
                            value={info.email}
                            onChange={handleInputChange} 
                         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
                    </div>
                    <div className="mb-7">
                        <label for="phone" className="block mb-2 text-sm font-medium text-gray-900
                        dark:text-white">Phone</label>
                        <input type="text" id="phone"
                        name="phone"
                        value={info.phone}
                        onChange={handleInputChange} 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Phone" required />
                    </div>
                    <div className="mb-7">
                        <label for="text" className="block mb-2 text-sm font-medium text-gray-900
                        dark:text-white">School</label>
                        <input type="text" id="text" 
                         name="school"
                         value={info.school}
                         onChange={handleInputChange} 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="School" required />
                    </div>    
                </div>    
                <div className="">
                        
                        <textarea type="text" id="text"
                        name="message"
                        value={info.message}
                        onChange={handleInputChange} 
                        
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Message" required row={4} />
                </div>  
                <button type="submit" className="text-white mb-4 mt-5 bg-black hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 ">Submit</button>
                </form>
            </div>
           
        </div>
    </section>
)

}