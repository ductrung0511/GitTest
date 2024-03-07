export default function AttendanceHistory(props){
    console.log(props.attendanceExcelUrl)
    return(
        <>
            <p className="text-sm mt-1 font-bold text-black text-left"> Attendance History</p>
            <div className="m-2 px-2 rounded-xl border-blue-200 border-2 bg-white/30 grid" >
            <iframe 
             src={props.attendanceExcelUrl}
            className="w-full h-auto rounded-lg "></iframe>

            </div>
        </> 
    )
}