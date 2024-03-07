
import BodyBlog from "../components/StaticComponent/BodyBlog";
import HeaderStatic from "../components/Features/HeaderStatic";


export default function Blog()
{
    return(
        <section>
        <HeaderStatic color={"chill"} />
        
        <div className="flex flex-col bg-color-chill ">
            <div className=" px-10 text-gray font-bold capitalize mt-2" id="breadcum"> <p className="text-gray-500 font-semibold px-1">Home {'>'} IELTS & IELTS Writing Task 2 Tips, Topics and Sample Answers</p></div>
            <div className="grid grid-cols-5 pb-20">
                <div id="TITLE AND DATE" className="flex flex-col p-2 col-span-2 items-left justify-center">
                    <div id="DATE" className="p-1"> <h7 className=" px-20 text-gray-200 font-semibold ">August 12, 2023</h7></div>
                    <div id="TITLE" className="p-2"> <h1 className="px-20 text-white font-extrabold object-right">IELTS Writing Tasks 2, Topics and Sample Answers</h1></div>
                
                </div>
                <div id="ARTICLE PICTURE" className="p-2 col-span-3">
                        <img src="/IeltsThumbnails.png" alt="IeltsThumbnails" className="rounded h-[70vh] w-auto"/>
                </div>
            </div>

        </div>
        <BodyBlog/>


        
        </section>




    )
}