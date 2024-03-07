const blogs = [{ 
    img: "https://truongcaodangnauan.edu.vn/test_disk/photos/shares/H%E1%BB%A7%20Ti%E1%BA%BFu%20Nam%20Vang/maxresdefault-(3).jpg",
    date: 'August 12, 2023',
    title: 'IELTS Reading - Tips and Practice for Success',
    description: "On the second edition of Serious B editor Jim Ledbetter and Fusion seSalmon debate...",
    url: '#blog',

    },
    { 
        img: "https://nethue.com.vn/uploaded/tin-tuc-biquyet-1.jpg",
        date: 'August 12, 2023',
        title: 'IELTS Listening - Tips and Practice for Success',
        description: "Bún bò Huế or bún bò is a Vietnamese rice noodle dish with sliced beef, chả lụa, and sometimes pork knuckles...",
        url: '#blog',
    
        },
    { 
        img: "https://statics.vinwonders.com/pho-ga-ha-noi-4_1688009468.jpg",
        date: 'August 12, 2022',
        title: 'IELTS Speaking - Tips and Practice for Success',
        description: "Bà Lâm nổi tiếng ở khu phố cổ với quán phở gà thơm ngon. Mỗi sáng, bà chỉn chu chuẩn bị một khay thịt gà được phân loại thành: thịt đùi, thịt ...",
        url: '#blog',
    
        },

]
export default function AlsoRead()
{
    return(
        <div className="flex flex-col">
            <div className="flex justify-center items-center mt-3">
                <h3 className="text-gray-950 font-bold capitalize"> Also Read</h3>
            </div>

            <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3 px-6"> 
                    {blogs.map((blog) => {


                        return (
                            <div>
                            <div className="lg:h-[30vh] rounded-xl scale-100 overflow-hidden mb-2">
                                <img  src={blog.img}
                                 className="lg:h-full w-full hover:scale-125 transition ease-in duration-300"/>
                            </div>
                            <div className="flex flex-col">
                                <p className="font-bold text-gray-400 items-center">{blog.date}</p>                                
                                <a href="#blog" className="no-underline">
                                    <span className="text-xl font-bold text-gray-900 no-underline "> {blog.title} </span>
                                </a>             
                            </div>
                        </div>
                        )
                    })}
                        




            </div>
        </div>
    )
}