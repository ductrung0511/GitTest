import { useState } from "react";
import { baseUrl } from "../../Share";
import { useLocation, useNavigate } from "react-router-dom";

const blogs = [{ 
    img: "https://blog.e2language.com/wp-content/uploads/2024/01/New-Trial-Questions-for-PTE-Academic-2024.png",
    date: 'August 12, 2023',
    title: 'IELTS Reading - Tips and Practice for Success',
    description: "On the second edition of Serious B editor Jim Ledbetter and Fusion seSalmon debate...",
    url: '#blog',

    },
    { 
        img: "https://blog.e2language.com/wp-content/uploads/2019/02/PTE-Reorder-prargraphs.png",
        date: 'August 12, 2023',
        title: 'IELTS Listening - Tips and Practice for Success',
        description: "Bún bò Huế or bún bò is a Vietnamese rice noodle dish with sliced beef, chả lụa, and sometimes pork knuckles...",
        url: '#blog',
    
        },
    { 
        img: "https://blog.e2language.com/wp-content/uploads/2023/10/IELTS-Reading-tips-and-practice-for-success-.png",
        date: 'August 12, 2022',
        title: 'IELTS Speaking - Tips and Practice for Success',
        description: "Bà Lâm nổi tiếng ở khu phố cổ với quán phở gà thơm ngon. Mỗi sáng, bà chỉn chu chuẩn bị một khay thịt gà được phân loại thành: thịt đùi, thịt ...",
        url: '#blog',
    
        },

];
export default function HomeBlog(props)
{

    const location = useLocation();
    const navigate= useNavigate();
    const blogs = props.blogs;
    // FUNCTION TO RETRIEVE THE 3 MOST RECENT BLOG
    const [blogSaveList, setBlogSaveList] = useState( localStorage.getItem('blogSave') ? localStorage.getItem('blogSave').split('/'): '');
    console.log('Console panel HomeBlog');
    const handleSaveBlog =(blogID) =>{
        if( !Object.keys(localStorage).includes('blogSave') ){
            navigate("/login",{
                state:{ previousUrl : location.pathname,}
              });
        }
        const putData = {blogSave:  localStorage.getItem("blogSave")  + blogID    + '/' }  ;
        const url = baseUrl + "api/profile/";
        async function updateBlogSave() {
            try {
              const response = await fetch(url, {
                method: 'PUT',
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('access'),
                },
                body: JSON.stringify(putData),
            });
              if(response.status === 404) console.log("Not found");
              if(response.status === 401) 
              {
                navigate("/login",{
                state:{ previousUrl : location.pathname,}
              });
              
            }
              else if (!response.ok) {
                console.error("Something went wrong");
                return;
              }
                const data = await response.json();   
                localStorage.setItem('blogSave',  data.blogSave );
                setBlogSaveList(localStorage.getItem('blogSave').split('/'))
                console.log("Fetch Put Panel ",url , putData  , response.status, data , "blogSave:" , localStorage.getItem('blogSave' ), "added:", blogID  );
                
            } catch (error) {
                console.error("Error adding data:", error);
            }
            
        }
      
         updateBlogSave();




    }


    const handleUnSaveBlog =(blogID) =>{
        
        let newList = '/';
        for(let item of blogSaveList){
            if(item != blogID && item != ''){
                newList += item;
                newList += '/';
            }
        }

        const putData = {blogSave: newList }  ;
        const url = baseUrl + "api/profile/";

        async function updateBlogSave() {
            try {
              const response = await fetch(url, {
                method: 'PUT',
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('access'),
                },
                body: JSON.stringify(putData),
            });
              if(response.status === 404) console.log("Not found");
              if(response.status === 401) 
              {
                navigate("/login",{
                state:{ previousUrl : location.pathname,}
              });
            }
              else if (!response.ok) {
                console.error("Something went wrong");
                return;
              }
                const data = await response.json();   
                localStorage.setItem('blogSave',  data.blogSave );
                setBlogSaveList(localStorage.getItem('blogSave').split('/'))
                console.log("Fetch Put (unSave) Panel ", url , putData  , response.status, data , "blogSave:" , localStorage.getItem('blogSave'), 'deleted:', blogID  );
                
            } catch (error) {
                console.error("Error adding data:", error);
            }
            
        }
      
        updateBlogSave();




    }
    return(


        <section 
        className="bg-cover bg-no-repeat"
        style={{backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkgJhvADg1j3niiOS3b4-NO_VaBxqknSTepg&usqp=CAU')`}}

        >
        <div className="container  pb-3 relative " 
        >
            <div className="flex flex-col items-center pb-10 backdrop-blur-sm">

                <div className="container items-center py-10">
                    <div className="text-center m-auto mb-20 p-10 ">
                        <h4 className="text-color-vibrant text-3xl"> NZEC Blog</h4>
                        <p className="text-color-secondary text-2xl">English article and News</p>
                    </div>
                    
                    <div className=" gap-3 flex flex-col"> 
                    {blogs.map((blog, index) => {
                        


                        return (
                            <div key={blog.title} className="w-full flex  flex-row justify-center gap-3">
                            {index%2 === 0 && 
                            <div className="lg:h-[40vh] w-auto rounded-xl scale-100 overflow-hidden mb-2">
                                <img  src={blog.img}
                                 className="lg:h-full w-full hover:scale-105 transition ease-in duration-300"/>
                            </div>
                            }
                            <div className="flex flex-col">
                                <p className="font-bold text-gray-400 items-center py-0 my-0 ">{blog.created.substring(0, 10)}</p>

                                
                                <a href="#blog" className="text-lg no-underline font-bold text-gray-800 hover:text-white hover:no-underline ">
                                {blog.title}
                                </a>
                                
                                <div className="text-lg px-3 incline-block transition-all duration-200 ease-in-out no-underline  flex flex-row justify-between hover:text-white hover:no-underline">
                                    
                                    <span className="font-bold capitalize hover:no-underline text-gray-700">Read more</span>
                                    {blogSaveList.includes('' + blog.id) ?
                                        <button className=" text-black font-light  rounded-lg" onClick={()=>{handleUnSaveBlog(blog.id)}}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                            <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM20.25 5.507v11.561L5.853 2.671c.15-.043.306-.075.467-.094a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93ZM3.75 21V6.932l14.063 14.063L12 18.088l-7.165 3.583A.75.75 0 0 1 3.75 21Z" />
                                            </svg>

                                        </button>:
                                        <button className=" text-black font-light  rounded-lg" onClick={()=>{handleSaveBlog(blog.id)}}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6  `}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                                            </svg>
                                        </button>
                                    }
                                </div>
                            </div>
                            {index%2 !== 0 && 
                            <div className="lg:h-[40vh] w-auto rounded-xl scale-100 overflow-hidden mb-2">
                                <img  src={blog.img}
                                 className="lg:h-full w-full hover:scale-105 transition ease-in duration-300"/>
                            </div>
                            }
                        </div>
                        )
                    })}
                        




                    </div>
                </div>
                

            </div>
            <div className="blob"> </div>
            <div className="blob1"> </div>


        </div>  
        </section>


    )
}