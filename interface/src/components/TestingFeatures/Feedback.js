import { useState } from 'react'
import { Tab } from '@headlessui/react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Feedback() {
  let [categories] = useState({
    Nam_Tran: [

        
      
      {
        id: '1',
        name: 'Nam',
        age: '19',
        job: 'CHUYÊN VIÊN THIẾT KẾ ĐỒ HỌA',
        graduation_date : '1/2/2023',
        description: 'Tôi là một nhà Thiết kế Đồ họa làm việ tại Hà Nội. Chuyên môn của tôi bao gồm xây dựng thương hiệu số và thiết kế',
        img: 'https://scontent.fsgn2-11.fna.fbcdn.net/v/t39.30808-6/421599414_789531033209626_4359026435284313067_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=3635dc&_nc_ohc=CwHalu-JdCsAX8tv1M8&_nc_ht=scontent.fsgn2-11.fna&oh=00_AfB6t2PkbT9m2rjjVFWIeMPv8R8amajma5jhQFDIrPv3iA&oe=65BA3CE7',
        courses_learnt: [
            {
                id: 123,
                name: 'A1',
                time: 30,

            },
            {
                id: 124,
                name: 'A1',
                time: 20,

            },
            {
                id: 122,
                name: 'A1',
                time: 20

            }


        ]
      }

      
    ],
    Phuong_Tran: [
        {
          id: '1',
          name: 'Nam',
          age: '19',
          job: 'CHUYÊN VIÊN THIẾT KẾ ĐỒ HỌA',
          graduation_date: '1/2/2023',
          description:
            'Tôi là một nhà Thiết kế Đồ họa làm việc tại Hà Nội. Chuyên môn của tôi bao gồm xây dựng thương hiệu số và thiết kế',
          img:
            'https://scontent.fsgn2-11.fna.fbcdn.net/v/t39.30808-6/421599414_789531033209626_4359026435284313067_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=3635dc&_nc_ohc=CwHalu-JdCsAX8tv1M8&_nc_ht=scontent.fsgn2-11.fna&oh=00_AfB6t2PkbT9m2rjjVFWIeMPv8R8amajma5jhQFDIrPv3iA&oe=65BA3CE7',
          courses_learnt: [
            {
              id: 123,
              name: 'A1',
              time: 30,
            },
            {
              id: 124,
              name: 'A2',
              time: 20,
            },
            {
              id: 122,
              name: 'A3',
              time: 20,
            },
          ],
        },
      ],
    
      User_2: [
        {
          id: '2',
          name: 'John Doe',
          age: '25',
          job: 'SOFTWARE ENGINEER',
          graduation_date: '5/15/2022',
          description: 'Passionate about building innovative software solutions.',
          img: 'https://via.placeholder.com/150',
          courses_learnt: [
            {
              id: 125,
              name: 'React.js',
              time: 40,
            },
            {
              id: 126,
              name: 'Node.js',
              time: 30,
            },
            {
              id: 127,
              name: 'MongoDB',
              time: 25,
            },
          ],
        },
      ],
    
      User_3: [
        {
          id: '3',
          name: 'Alice Johnson',
          age: '22',
          job: 'MARKETING SPECIALIST',
          graduation_date: '8/20/2023',
          description: 'Experienced in digital marketing and brand promotion.',
          img: 'https://via.placeholder.com/150',
          courses_learnt: [
            {
              id: 128,
              name: 'Social Media Marketing',
              time: 35,
            },
            {
              id: 129,
              name: 'SEO Basics',
              time: 20,
            },
            {
              id: 130,
              name: 'Content Creation',
              time: 25,
            },
          ],
        },
      ],
    
      User_4: [
        {
          id: '4',
          name: 'Alex Smith',
          age: '30',
          job: 'DATA SCIENTIST',
          graduation_date: '3/10/2022',
          description: 'Analyzing data to extract valuable insights.',
          img: 'https://via.placeholder.com/150',
          courses_learnt: [
            {
              id: 131,
              name: 'Machine Learning',
              time: 45,
            },
            {
              id: 132,
              name: 'Data Visualization',
              time: 30,
            },
            {
              id: 133,
              name: 'Statistical Analysis',
              time: 25,
            },
          ],
        },
      ],
    
      User_5: [
        {
          id: '5',
          name: 'Emily Williams',
          age: '28',
          job: 'LANGUAGE TEACHER',
          graduation_date: '6/5/2023',
          description: 'Teaching English and Spanish with enthusiasm.',
          img: 'https://via.placeholder.com/150',
          courses_learnt: [
            {
              id: 134,
              name: 'English Grammar',
              time: 35,
            },
            {
              id: 135,
              name: 'Spanish Conversation',
              time: 30,
            },
            {
              id: 136,
              name: 'Teaching Techniques',
              time: 25,
            },
          ],
        },
      ],
    
  })

  return (
    <section className='bg-color-primary'> 
    <div className="w-full px-2 py-10 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white text-blue-700 shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {Object.values(categories).map((posts, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white/60 ring-offset-2 '
              )}
            >
              <ul>
                {posts.map((student) => (

                    

                <div className='flex flex-row justify-between'>
                        <img src={student.img} className='w-1/3 h-1/3 rounded-lg'/>
                  <li
                    key={student.id}
                    className="relative rounded-md p-3"
                  >
                    <h1 className="text-l text-color-primary-dark font-bold">
                      {student.name}
                    </h1>
                    <h3 className="text-sm text-color-primary font-medium">
                      {student.job}
                    </h3>
                    <h3 className="text-sm text-color-primary font-medium">
                      {student.description}
                    </h3>
                    <h4 className=" mt-1 text-sm text-gray-500 font-normal">
                      Date graduated: {student.graduation_date}
                    </h4>

                    
                    <div className='flex flex-col gap-4 py-4 border-2 border-color-chill rounded-lg m-2'>
                        {student.courses_learnt.map((course) => (
                            <a
                                href="#"
                                className="text-center font-bold px-4 mx-4 py-2 rounded-md border border-black-300 text-black no-underline hover:bg-gray-700 hover:text-gray-300"
                            >
                                Khóa {course.name} - id: {course.id} -{course.time} Giờ  
                            </a>
                            ))}
                    </div>
                    <a
                      href="#course_type"
                      className={classNames(
                        'absolute inset-0 rounded-md','ring-blue-400 focus:z-10 focus:outline-none focus:ring-2'
                      )}
                    >


                    </a>
                  </li>
                </div>
                ))}
              </ul>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
    </section>
  )
}
