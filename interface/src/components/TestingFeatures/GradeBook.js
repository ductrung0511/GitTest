export default function GradeBook(props){
    console.log(props.gradeBookUrl)
    return(
        <>
            <p className="text-sm mt-1 font-bold text-black text-left"> Grade Book</p>
            <div className="m-2 px-2 rounded-xl border-blue-200 border-2 bg-white/30 grid" >
            <iframe 
             src={props.gradeBookUrl}
            className="w-full h-[70vh] rounded-lg "></iframe>

            </div>
            <div class="relative w-64 h-64">
                <div class="absolute top-0 left-0 w-full h-full bg-blue-500 transition-transform duration-500 transform hover:translate-y-full">
                    <p class="text-white text-center">Hover Me</p>
                </div>
                
            </div>
        </> 
    )
}