

const blogs = [{ 
    img: "https://blog.e2language.com/wp-content/uploads/2023/09/OET-Speaking-Tips-and-Practice-for-Success.png",
    date: 'August 12, 2023',
    title: 'IELTS Reading - Tips and Practice for Success',
    description: "On the second edition of Serious B editor Jim Ledbetter and Fusion seSalmon debate...",
    url: '#blog',

    },
    { 
        img: "https://blog.e2language.com/wp-content/uploads/2023/10/IELTS-Reading-tips-and-practice-for-success-.png",
        date: 'August 12, 2023',
        title: 'IELTS Listening - Tips and Practice for Success',
        description: "Bún bò Huế or bún bò is a Vietnamese rice noodle dish with sliced beef, chả lụa, and sometimes pork knuckles...",
        url: '#blog',
    
        },
    { 
        img: "https://blog.e2language.com/wp-content/uploads/2023/10/Use-Synonyms-and-Other-Writing-Techniques-1.png",
        date: 'August 12, 2022',
        title: 'IELTS Speaking - Tips and Practice for Success',
        description: "Bà Lâm nổi tiếng ở khu phố cổ với quán phở gà thơm ngon. Mỗi sáng, bà chỉn chu chuẩn bị một khay thịt gà được phân loại thành: thịt đùi, thịt ...",
        url: '#blog',
    
        },

]
export default function PopularPosts()
{
    return(
        <div className="grid grid-cols-1 gap-4 bg-blue-100 mt-2 py-2"> 
                    {blogs.map((blog) => {


                        return (
                            <div className="grid grid-cols-4 ">
                                <div className=" col-span-2 h-auto px-2  w-full rounded-3xl scale-100 overflow-hidden">
                                    <img  src={blog.img}
                                    alt="img"
                                    className="lg:h-full w-full hover:scale-110 transition ease-in duration-300"/>
                                </div>
                                
                                <a href="#blog" className=" px-2 col-span-2 no-underline">
                                    <span className=" font-bold text-gray-500 no-underline "> {blog.title} </span>
                                </a>             
                                
                            </div>
                        )
                    })}
                        




            </div>
    )
}