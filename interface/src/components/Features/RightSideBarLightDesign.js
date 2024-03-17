
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Tooltip } from "react-tooltip";
export default function RightSideBarLightDesign(){
    const categories = [
        {name: "Dashboard", href: "/workspace/dashboard", tip:'📈 Theo dõi hiệu suất, khóa học, phiên và bài tập của bạn. '},
        {name: "", href: "/workspace/dashboard/#", tip: 'Đừng chạm vào tôi!'},
        {name: "Courses", href :"/workspace/performance", tip:'🔍🗝️ Tìm kiếm khóa học của bạn theo Code từ giáo viên của bạn tại đây.' },
        {name: "Resources", href :"/workspace/resources" , tip:'📋Theo dõi tài nguyên của bạn ở đây.'},
        {name: "Calendar", href :"/workspace/calendar", tip:'📅 Theo dõi các tiết học và bài tập của bạn tại đây.'},
        {name: "Assignment", href :"/workspace/assignment", tip:'🎯Theo dõi kết quả và câu trả lời của các bài kiểm tra và bài tập'},  
    ];
    const [isFixed, setIsFixed] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
   
    
    useEffect(() => {
        const handleScroll = () => {
          const scrollPosition = window.scrollY;
          const scrollable = document.documentElement.scrollHeight - window.innerHeight;
          const threshold = 580; // Adjust as needed
    
          setIsFixed( scrollPosition > threshold);
          setIsHidden( scrollPosition >  scrollable - 130);
          console.log(scrollPosition, 'scroll');
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);

    return(
    <div id="LEFT SIDE BAR/ CATEGORIES" className="px-3 pt-28">
        <div className=" w-full h-full flex flex-col items-center  max-w-7xl px-2 rounded-xl  border-0  pt-2">
            <Tooltip id="my-tooltip" className="absolute z-40"/>
            
            {categories.map((item, index) => (
                    
                    
                    <NavLink
                    key={item.name}
                    to={item.href}
                    {...((localStorage.getItem('courseAuth')?.split('/').length < 5 || !localStorage.getItem('courseAuth')  )
                                ? {
                                    'data-tooltip-id': 'my-tooltip',
                                    'data-tooltip-content':item.tip,
                                      
                                    'data-tooltip-place': 'top'
                                  }
                                : {})} 
                    className={({ isActive }) => {
                        if( item.name  === "Dashboard" & isActive )
                        return 'no-underline px-4 py-2 w-4/5 mb-2 h-10 rounded-md text-sm font-bold capitalize bg-black text-white hover:bg-gray-700 duration-700'
                        else if( item.name  === "All Courses" & !isActive )
                        return 'no-underline px-4 py-2 w-4/5 mb-2 h-10 rounded-md text-sm font-bold capitalize' + "text-color-secondary";
                        else if(item.name === "") return 'border-1 border-black w-full my-4'


                        else return 'no-underline px-4 py-2 w-4/5 mb-2 h-10 rounded-md text-sm font-bold capitalize' + (!isActive ?
                        ' font-semibold  text-color-secondary hover:bg-gray-400 duration-700' : ' bg-color-secondary/90 text-white ')
                    }}
                    >
                    {item.name}
                    </NavLink>

                ))}
            
            <div className=" h-24 w-full">

            </div>
            {/* <div className={`bg-gray-800 overflow-hidden rounded-xl z-10 h-96 ${isFixed? 'fixed top-4 left-2 w-48': 'w-48'} ${isHidden? 'hidden': ''}`}>
                <img className="object-cover " alt=" " src="https://img.freepik.com/free-psd/business-promotion-corporate-instagram-story-template_120329-1228.jpg"/>
            </div> */}
        </div>
    </div>



    )





}