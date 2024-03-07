export default function Pagination({total, itemsPerPage, setCurrentPage, currentPage}){
    
    let pages = [];
    for(let i=1; i< Math.ceil(total/itemsPerPage); i++ ){
        pages.push(i);
    }

    return(<div className="w-full"> 

        {pages.map((page)=>{
            if(page !== currentPage) return(
            <button key={page} className="rounded-full w-3 h-3 bg-white" onClick={ ()=> setCurrentPage(page)}> </button>
            )
            else return (
            <button key={page} className="rounded-full w-3 h-3 bg-blue-700" onClick={ ()=> setCurrentPage(page)}> </button>

            )
        })}
    </div>)



}