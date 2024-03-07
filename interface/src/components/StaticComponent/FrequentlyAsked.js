import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'

const list= [
  {question:"Làm thế nào để đăng ký các khóa học của trung tâm?", answer:"Bạn chỉ cần để lại thông tin trong mục bên dưới hoặc liên hệ trực tiếp hotline của trung tâm để được hỗ trợ tư vấn miễn phí."},
  {question:"Lịch học của trung tâm như thế nào?", answer:"Trung tâm có lịch học các lớp linh hoạt, học viên sẽ được kiểm tra xếp lớp phù hợp với trình độ và thời gian cá nhân."},
  {question:"Trung tâm có cấp chứng chỉ không?", answer:"Tại NZEC, học viên được đào tạo phát triển 4 kỹ năng từ căn bản đến nâng cao để đủ khả năng thi và đạt các Chứng chỉ Tiếng anh quốc tế được cấp bởi các tổ chức uy tín."},
]
const bgImg= "https://st4.depositphotos.com/3206865/21452/i/450/depositphotos_214528520-stock-photo-triangle-blue-pink-light-green.jpg";


export default function FrequentlyAsked() {


  return (
    <div className="w-full px-4 pt-16 pb-20 h-screen" style={{backgroundImage: `url(${bgImg})`}}>

        <h2 className='font-extrabold text-gray-700 mb-7 text-center '> Các câu hỏi thường gặp của Trung Tâm</h2>
        <div className="mx-auto w-full max-w-4xl rounded-xl bg-transparent  p-2  backdrop-blur-sm">
        

        {list.map((item, index)=>{
          return(
            <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full my-2 justify-between rounded-lg bg-purple-100 px-20 py-2 text-left font-bold text-xl text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                  <span>{item.question}</span>  
                  <ChevronUpIcon
                    className={`${
                      open ? 'rotate-90 transform transition-all duration-700' : ''
                    } h-5 w-5 text-purple-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-20 pb-2 pt-4 text-xl text-gray-500 font-semibold">
                  {item.answer}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          )



        })}



        
      </div>
    </div>
  )
}
