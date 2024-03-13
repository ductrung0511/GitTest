import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode'
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/swiper-bundle.css';
import SwiperCore, { FreeMode, Pagination } from 'swiper/modules';
import {RxArrowTopRight} from 'react-icons/rx'
import {v4 as uuidv4} from 'uuid'
import {
    RxCrop,
    RxDesktop,
    RxPencil2,
    RxReader,
    RxRocket,
    RxAccessibility,
  } from "react-icons/rx";
  


export default function Main()

{
    const ServiceData = [
        {
          icon: RxCrop,
          title: "Development",
          content: "Lorem ipsum dolor sit /amet, consectetur adipiscing elit.",
          backgroundImage: "/2.jpg",
        },
        {
          icon: RxPencil2,
          title: "Branding",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          backgroundImage: "/3.jpg",
        },
        {
          icon: RxDesktop,
          title: "Design",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          backgroundImage: "/4.jpg",
        },
        {
          icon: RxReader,
          title: "Seo",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          backgroundImage: "/7.jpg",
        },
        {
          icon: RxAccessibility,
          title: "Management",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          backgroundImage: "/8.jpg",
        },
        {
          icon: RxRocket,
          title: "Production",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          backgroundImage: "/9.jpg",
        },
        {
            icon: RxRocket,
            title: "Production2",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            backgroundImage: "/10.jpg",
          },
      ];
    const category = [
        {name: 'Mẫu Giáo', color: 'orange'},
        {name: 'Thiếu Nhi', color: 'yellow' },
        {name: 'Thiếu Niên', color: 'blue'},
        {name: 'IELTS & TOEIC', color: 'green'},

        ]
    const scrollToPosition = (position) => {
        window.scrollTo({
          top: position,
          behavior: 'smooth' // This gives a smooth scrolling effect
        });
      };
    return (

    <section id="home" style={{backgroundImage: `url('')`}}>
        <div className="flex flex-col gap-0 pt-14 mb-1 relative backdrop-blur-sm " >
            {/*
                <div className="text-center m-auto mb-4 ">
                    <h4 className="text-color-secondary-dark">_________________</h4>
                    <div className="flex flex-col gap-0">
                        <p className="text-white text-2xl px-6 font-extrabold ">________
                        </p>    
                        <p className = " mt-1 text-color-secondary-light">
                        
                        </p>
                    </div>
                    
                </div>
            */}
            <div className="p-4  mb-1  rounded-lg flex flex-col gap-2 items-center space-x-8 z-20">
                        <div className="text-3xl font-extrabold text-yellow-200 text-left  ml-0 pl-0">Lộ trình học tập <br/> <span className='text-green-300 ml-20'> được thiết kế bởi các chuyên gia</span> </div>
                        <div className='  px-20 flex flex-row text-white mt-2 ml-10 capitalize font-bold gap-3 z-30'>
                            {category.map((item) => {
                                return(
                                    <button key={uuidv4()} onClick={()=>{scrollToPosition(1870)}} className={`rounded-lg text-gray-500 cursor-pointer  bg-${item.color}-200 shadow-lg  px-3 w-64 py-2  text-2xl h-28 flex justify-center items-center`}>
                                    {item.name}
                                    </button>
                                )
                            })}
                            
                        </div>
            </div>


            <div className="flex flex-row items-center gap-1  mx-3  ">
 
            
                <div className="text-center w-1/2 col-span-2 font-bold  ">
                    
                    <div className="flex flex-col w-full gap-3 mr-10">
                        <div className="p-4 bg-white rounded-lg flex flex-col items-center justify-between space-x-8 z-20">
                            <div className=" w-full rounded  text-yellow-400  text-xl mb-4"> New Zealand English Center (NZEC) </div>

                            <div className=" w-full rounded text-2xl text-blue-900 mb-4">  Trung tâm Anh ngữ New Zealand </div>
                        
                            <div className=" w-full text-left rounded font-light text-black">Trung tâm Anh ngữ New Zealand
Chào mừng bạn đến với Trung tâm Anh ngữ  New Zealand (NZEC) tại Bình Dương, địa điểm đào tạo ngôn ngữ đáp ứng cho mọi lứa tuổi. Được thành lập tại Bến Cát từ năm 2017, NZEC đã không ngừng phát triển, tạo nên môi trường học tiếng Anh chất lượng trẻ em và người lớn với các chương trình đào tạo từ căn bản đến nâng cao cùng các khóa luyện thi chứng chỉ quốc tế. Đội ngũ giáo viên tận tâm, nhiệt huyết và luôn sử dụng các phương pháp giảng dạy sáng tạo khác nhau với từng đối tượng học sinh. Hãy tham gia vào các khóa học và cùng NZEC kiến tạo tương lai của bạn</div>
                        </div>
                          
                        
                        


                    </div>
                </div>

                <div className="w-1/2"> 

                <img className=" w-full rounded-lg h-[70vh]  shadow-2xl  " src="/NHQ08011.jpg" alt=""/>
                </div>

            </div>
            {/* <div className="w-80 h-80 bg-gradient-to-tr from-yellow-500 to-blue-300 blur-xl rounded-full opacity-30  absolute top-1 right-0"> </div>
            <div className="w-80 h-80 bg-gradient-to-tr from-red-500 to-blue-300 blur-xl rounded-full opacity-30  absolute top-40 left-0"> </div> */}
            

        </div>
        <div className='mt-8 backdrop-blur-sm'>
            
            <Swiper
            breakpoints={{
                340: {
                    slidesPerView: 2,
                    spaceBetween: 14,
                },
                700: {
                    slidesPerView: 4,
                    spaceBetween: 17,
                }
            }}
            freeMode={true }
            pagination={{clickable:true}}
            modules={[FreeMode, Pagination]}
            className='max-w-[90%]'
            
            >
                {ServiceData.map( (item) => (
                    <SwiperSlide key={uuidv4()}>
                        <div className=' shadow-lg bg-gray-800 mb-10 text-white rounded-xl px-7 py-8 h-[200px] w-[280px] bg-cover' style={{backgroundImage : `url(${item.backgroundImage})`}}>   

                        </div>

                    </SwiperSlide>
                ))}

            </Swiper>










        </div>
        {/* <ul className="timeline text-black my-7  mx-20">
            <li>
                <div className="timeline-start">1984</div>
                <div className="timeline-middle">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                </div>
                <div className="timeline-end timeline-box">First Macintosh computer</div>
                <hr/>
            </li>
            <li>
                <hr/>
                <div className="timeline-start">1998</div>
                <div className="timeline-middle">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                </div>
                <div className="timeline-end timeline-box">iMac</div>
                <hr/>
            </li>
            <li>
                <hr/>
                <div className="timeline-start">2001</div>
                <div className="timeline-middle">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                </div>
                <div className="timeline-end timeline-box">iPod</div>
                <hr/>
            </li>
            <li>
                <hr/>
                <div className="timeline-start">2007</div>
                <div className="timeline-middle">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                </div>
                <div className="timeline-end timeline-box">iPhone</div>
                <hr/>
            </li>
            <li>
                <hr/>
                <div className="timeline-start">2015</div>
                <div className="timeline-middle">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                </div>
                <div className="timeline-end timeline-box">Apple Watch</div>
            </li>
        </ul> */}
        <div className='w-full mb-11 h-10'></div>

    </section>



)
}