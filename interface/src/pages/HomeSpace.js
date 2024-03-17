import CourseActivity from "../components/Features/CourseActivity";
import ProfileCard from "../components/Features/ProfileCard";
import { useState } from "react";
import { baseUrl } from "../Share";
import useFetch from "../components/hook/useFetch";
import { Disclosure } from "@headlessui/react";

export default function HomeSpace(){
    

    const url = baseUrl + 'api/profile/';
    const { data , loading, error } =  useFetch(url, {
        method:'GET', 
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.getItem('access'),}
    });
    
    
        
    const [profile, setProfile] = useState(data);
    console.log(data, "data from profile", error, loading);
    const scrollToPosition = (position) => {
        window.scrollTo({
          top: position,
          behavior: 'smooth' // This gives a smooth scrolling effect
        });
      };


    

    return(
        <div className="grid grid-cols-7">
            {localStorage.getItem('exerciseLog') === '{}' &&
                             <div className=" fixed top-20 right-2 bg-yellow-200  rounded-lg w-72 z-40    ">
                                <Disclosure>
                                {({ open }) => (
                                    <>
                                    <Disclosure.Button className="flex  w-full justify-between bg-yellow-200 shadow-lg rounded-t-lg  px-4 py-2 text-left text-sm font-medium ">
                                        <div className=" text-xs font-medium">
                                            Xem phần hướng dẫn cho trang "Tìm Kiếm Khóa Học" nha bạn mới ơi📋!
                                        </div>
                                        
                                    </Disclosure.Button>
                                    <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500  rounded-b-lg bg-yellow-100">
                                        <p className="text-light text-xs text-black">
                                            ⌨️ Hãy nhập mã Code mà giáo viên đưa cho bạn và ô tìm kiếm màu xanh, hệ thống sẽ tự động thêm khóa học vào hồ sơ của bạn <br/>
                                            Hệ Thống sẽ thống kê các khóa học mà bạn đã đăng kí <br/>
                                            ✈️ Kéo xuống dưới hoặc nhấn vào nút bên dưới bạn sẽ thấy khóa học hiện tại của mình và tổng số tiết trong khóa học nhé
                                                <button onClick={ ()=>{scrollToPosition(490)}} className="bg-white rounded-lg  p-2 my-1" > Xem khóa học bạn đã đăng kí nào! </button> <br/>
                                            ⚔️ Các bài tập của ngày hôm nay  sẽ được hiện ra phía dưới nhé


                                           <br/> ⚠️☢️☣️ Các phần hướng dẫn chức năng sẽ hiện lên khi bạn rê chuột lên các phần mô tả nên đừng ngần ngại khám phá nha!💭💭<br/> Phần hướng dẫn này sẽ biến mất sau khi bạn thực hiện một bài tập nào đó trong hệ thống!                        
                                        </p>
                                    </Disclosure.Panel>
                                    </>
                                )}
                                </Disclosure>
                                    {/* <input type="checkbox" /> 
                                    

                                    <div className="collapse-content"> 
                                        
                                    </div> */}
                            </div>
                        } 





            <div className="col-span-4 mb-48" id="COURSE ACTIVITY">
                {!loading && <CourseActivity profileData={data} /> }
            </div>
            <div className="col-span-3 mt-16">
                {!loading && <ProfileCard profileData={data} /> } 
            </div>

        </div>
        //<CourseDisplay/>

    )
}