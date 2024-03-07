
const Categories = [{name: "IELTS", href : ""},
                    {name: "TOEIC", href : ""},
                    {name: "TOFEL", href : ""},
                    {name: "GERMAN", href : ""},
                    {name: "FRENCH", href : ""},
                    {name: "JAPANESE", href : ""},]
export default function CourseCategories()
{
    return(
    <div className="grid grid-cols-6 w-full rounded-sm px-2 py-3 gap-1  bg-blue-100 "> 
            {Categories.map((category, index) => {
                if(index===0 || index===1 ) return(
                    <div className="col-span-3  rounded-lg border-1 h-[7vh] w-full border-gray-300 bg-gray-300 text-center justify-center pt-1">
                           
                           <span className=" font-bold uppercase text-sm "> {category.name} </span> 
                    </div>
                );
                else if(index===2) return(
                    <div className="col-span-6 rounded-lg border-1 h-[7vh] w-full bg-slate-500 border-blue-300 text-center justify-center pt-1">
                            <span className=" font-bold uppercase text-sm "> {category.name} </span> 
                    </div>
                );
                else if(index===3) return(
                <>
                    <div className="col-span-2"></div>
                    <div className=" col-span-4 rounded-lg  border-1 h-[7vh] w-full border-gray-300 bg-blue-500 text-center justify-center pt-1">
                        <span className="font-bold uppercase text-sm "> {category.name} </span>        
                    </div>
                </>);
                else if(index===4) return(
                    <>
                        <div className=" col-span-4   rounded-lg border-1 h-[7vh] w-full border-gray-300 bg-green-100 text-center justify-center pt-1">
                            <span className="font-bold uppercase text-sm "> {category.name} </span>        
                        </div>
                        <div className="col-span-2"></div>
                    </>);
                else return(
                    <>
                        <div className="col-span-1"></div>
                        <div className=" col-span-4  rounded-lg  border-1 h-[7vh] w-full bg-green-300
                        text-center justify-center pt-1 border-gray-300">
                            <span className="text-center font-bold uppercase text-sm justify-center"> {category.name} </span>        
                        </div>
                    </>

                );



                
            })}
    </div>
    )
}