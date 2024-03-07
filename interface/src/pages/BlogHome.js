

import PopularPosts from "../components/StaticComponent/PopularPost";
import Contact from "../components/StaticComponent/Contact";
import HeaderStatic from "../components/Features/HeaderStatic";
import CourseCategories from "../components/StaticComponent/CourseCategories";
import Footer from "../components/StaticComponent/Footer";

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

]
export default function BlogHome()
{
    const backgroundImageUrl = 'https://scontent.fsgn2-3.fna.fbcdn.net/v/t39.30808-6/411221844_851531153643325_2960457597827201717_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=dd5e9f&_nc_eui2=AeEnLt_JgvBtyW0FFH9D73rWa9mutMT0WQBr2a60xPRZAIjCVRhjsC1GIeQtGelsB2o6-1XroA2tVQI8VtcLsOKM&_nc_ohc=B_27lZ9vRP8AX9fiKPP&_nc_ht=scontent.fsgn2-3.fna&oh=00_AfBPWK-vEWzocqYp2Ku3AIhG1T4aIGHpLzOafEpHoVujiA&oe=65C8D531';

    const containerStyle = {
        backgroundImage: `url('${backgroundImageUrl}')`,};

    return(
        <section className="">
            
                
            <HeaderStatic color="chill"/>
            <div className="w-screen h-[70vh] bg-no-repeat bg-cover bg-blue-400 rounded-b-lg relative"
                style={containerStyle}
                >
                <div className="  bg-color-vibrant bg-opacity-20 h-[7vh] p-2 border-solid shadow-md w-1/6 rounded-lg font-extrabold uppercase text-white absolute top-7 left-10"> 
                    Home {' >'}
                </div>
            </div>  
            

        <div className="grid grid-cols-7  bg-color-vibrant bg-opacity-20 pt-20" id="BASE">
            <div className="col-span-5 px-10" id="BODY TEXT">
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-2 px-6"> 
                        {blogs.map((blog) => {


                            return (
                                <div>
                                <div className="lg:h-[30vh] rounded-xl scale-100 overflow-hidden mb-2">
                                    <img  src={blog.img} alt="blog img"
                                    className="h-auto w-full hover:scale-125 transition ease-in duration-300"/>
                                </div>
                                <div className= "flex flex-col">
                                    <p className="font-bold text-gray-400 items-center">{blog.date}</p>                                
                                    <a href="#blog" className="no-underline">
                                        <span className="text-xl font-bold text-gray-900 no-underline "> {blog.title} </span>
                                    </a>             
                                </div>
                            </div>
                            )
                        })}
                </div>
                <Contact/>
            </div>
            <div className=" col-span-2 flex flex-col" id="LEFT BAR">
                <div id="POPULAR POST" className="px-4">
                    <h4 className="text-gray-600 font-bold capitalize"> popular posts</h4>
                    <PopularPosts/>
                    
                </div>
                <div id="CATEGORIES" className="px-4">
                    <h4 className="text-gray-600 font-bold capitalize"> Categories</h4>   
                    <CourseCategories/>              
                </div>
                

            </div>
            
        </div>

        <Footer/>
            



        </section>




    )
}