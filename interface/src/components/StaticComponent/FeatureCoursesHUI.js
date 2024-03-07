import { useState } from 'react'
import { Tab } from '@headlessui/react'
import { Link, NavLink } from 'react-router-dom'
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function FeatureCoursesHUI(  props) {
    
  let [categoriesVVV] = useState({
    IELTS: [
        {
            "id": 4,
            "name": "IELTS Fundamentals: Explore & Upskill Your Grades",
            "serial": "IFEU",
            "bgCardUrl": "https://static.skillshare.com/uploads/video/thumbnails/a328f786d77c9b5a3607fdb61354486b/448-252",
            "address": "Đ. D9, Thới Hoà, Bến Cát, Bình Dương",
            "duration": 180,
            "description": "Unleash your unique sound through the language of music with Grammy Award-winning musician Jacob Collier! \r\n\r\nEver since Jacob Collier can remember, he’s expressed himself through music. Growing up with a classically trained violinist as a mother, many of Jacob’s musical milestones—from playing his first piano to producing award-winning albums—happened right in his family’s music room. His unique, curiosity-first exploration of music helped transform him into one of the most innovative musicians of his generation. Now with over 2.5 million fans across YouTube, Instagram, and Tiktok, Jacob shares behind-the-scenes glimpses of his music composition with dynamic duets, covers, and original works. \r\n\r\nIn this exclusive class, Jacob dives deep into all of the different components that make up sound. From how to form a story with melody to coloring it with harmony, Jacob will walk you through every step of creating a sound completely unique to you.\r\n\r\nWith hands-on lessons, you’ll learn to see the world through the lens of music by: \r\n\r\nDiscovering what you like in order to inspire your exploration \r\nLearning the building blocks of melody and harmony\r\nPlaying with rhythm to create a timeless sound\r\nExplore the process of writing song lyrics to express yourself\r\nPlus, Jacob creates an exclusive new sound that you can download, build on to, and make your own! \r\n\r\nPart invitation and part hands-on practice, Jacob’s approach will change your understanding of the music you make and the songs you love. By the end, you’ll understand how to tell your story using melody, rhythm, and harmony, and unlock all the tools you need to take the next step on your journey toward true creative expression.",
            "textBook": "_",
            "color": "green",
            "progress": 0,
            "bgCardUrlSecondary": "https://static.skillshare.com/cdn-cgi/image/width=448,quality=85,format=auto/uploads/video/thumbnails/f2037d7eed2ca9bdf2be981a21377105/original",
            "sale": 10,
            "category": [
                1,
                6,
                7
            ]
        }
      
    ],
    TOEIC: [
        {
            "id": 2,
            "name": "Mehr Streams auf Spotify: So generierst",
            "serial": "MSSS",
            "bgCardUrl": "https://static.skillshare.com/cdn-cgi/image/width=448,quality=85,format=auto/uploads/video/thumbnails/72c009ebeb919a60aa4f9bffc8a9d04d/original",
            "address": "Đ. D9, Thới Hoà, Bến Cát, Bình Dương",
            "duration": 300,
            "description": "Wenn du ein a bist, der in deinem Wachstum in den Streaming-Plattformen in den Streaming-Plattformen anfühlt oder nie Musik freigegeben hat, und eine Strategie bekommen kann, die deine Musik in die Augen eines breiten Publikum zu werden. dann ist dieser Kurs für dich.\r\n\r\nJoel hat sich in der Arbeit von vielen Jahren in der Musik von vielen erfolgreichen Künstler:innen und Produzenten ergibt. Du lernst einen Ansatz, der für ihn funktioniert hat, und Künstler:innen, mit denen er beim Entlassen von Musik gearbeitet hat, mit denen du die Entwicklung der Zuhörer machen kannst, um dir immer mehr Ströme und Zuhörer zu zu bekommen.\r\n\r\nIn diesem Kurs lernst du:\r\n\r\nDas aktuelle industry aus dem alten Modell\r\nDer Wert von Playlisten und of\r\nWie du Beziehungen und ein Netzwerk mit Influencer aufbaust\r\nWie du den playlist zu finden und den playlist einreichen kannst\r\nWie du Musik mit dem Ziel verteilen kannst, deine Ströme und Zuhörer immer zu wachsen\r\nDu wirst deine eigene Playliste kuratieren und sie in diesem Kurs behandelten Techniken zur Entwicklung deiner Ströme und Zuhörer Bitte füge beim Abschluss dieses Kurses einen Link zu deiner Playlist im course zur Teilnahme von Kursprojekt hinzu.\r\n\r\nSelbst wenn du noch nie Musik zu früh freigegeben oder erfolgreiche Freigaben zu haben, und einfach nur eine Perspektive haben musst, werden es sich lohnt ein Ansatz, um deine Musik-Veröffentlichungen zu verwenden.",
            "textBook": "IELTS PREPS PRO",
            "color": "yellow",
            "progress": 0,
            "bgCardUrlSecondary": "https://static.skillshare.com/cdn-cgi/image/quality=80,width=1000,format=auto/uploads/project/7441a09bb680cdc79c63aa996973dc0f/3d986454",
            "sale": 10,
            "category": [
                3,
                4,
                6
            ]
        }
    ],
    "Conversation English": [
        {
            "id": 3,
            "name": "English Theory Survival Guide",
            "serial": "ETSG",
            "bgCardUrl": "https://static.skillshare.com/cdn-cgi/image/width=448,quality=85,format=auto/uploads/video/thumbnails/0ee0f3ac73e1f8bb5cd67abcc336b863/original",
            "address": "Tp. Bảo Lộc",
            "duration": 200,
            "description": "f you are a music creator that feels stuck when trying to make melodies and chord progressions that sound good together, or if you are wanting to learn the basics of music theory in a quick yet concise method (without all the notation and extra steps), then this Music Theory Survival Guide Part 1 course is for you.\r\n\r\nI spent years at university earning a master's degree in music composition (Jazz Studies) and have been teaching theory and production at colleges for several years.  In addition, I am an avid songwriter and producer for many artists and my own musical projects. \r\n\r\nBeing that I am an avid music enthusiast myself and realize that studying and creating music is a lifelong endeavor, it brings me great pleasure passing on the gift of music to others.  I am confident this course will teach you the basics of music theory in a practical, effective, quick, and concise way.  Be sure to grab your instrument, download the attached ebook (in the resources section), and play along!\r\n\r\nIn this class you will learn:\r\n\r\nIntervals\r\nInterval Inversions\r\nMajor Scale\r\nTriads\r\nTriad Inversions\r\nDiatonic Triads\r\nSongwriting Template\r\nPractical Exercises with Each Topic \r\nDownloadable ebook\r\nCourse Project\r\n\r\nYou will be creating your own 8 bar (minimum) chord progression and melody that belong to a key.  Please attach a link to a YouTube video, SoundCloud upload (or any other media platform of your choice) and describe to me the key you chose and what techniques really helped you to complete the project effectively.\r\n\r\nEven if you have never written your own music before, you will be able to partake in the course project and complete an 8 bar chord progression with a melody that fits in a key.  I look forward to teaching you and hearing your music creations!.  Grab your instrument and jump right in.",
            "textBook": "Oxford Academic",
            "color": "pink",
            "progress": 2,
            "bgCardUrlSecondary": "https://static.skillshare.com/cdn-cgi/image/width=448,quality=85,format=auto/uploads/video/thumbnails/fb9e7ce391861e076b9c0899cf28020d/original",
            "sale": 10,
            "category": [
                4,
                6,
                8
            ]
        },
        {
            "id": 2,
            "name": "Mehr Streams auf Spotify: So generierst",
            "serial": "MSSS",
            "bgCardUrl": "https://static.skillshare.com/cdn-cgi/image/width=448,quality=85,format=auto/uploads/video/thumbnails/72c009ebeb919a60aa4f9bffc8a9d04d/original",
            "address": "Đ. D9, Thới Hoà, Bến Cát, Bình Dương",
            "duration": 300,
            "description": "Wenn du ein a bist, der in deinem Wachstum in den Streaming-Plattformen in den Streaming-Plattformen anfühlt oder nie Musik freigegeben hat, und eine Strategie bekommen kann, die deine Musik in die Augen eines breiten Publikum zu werden. dann ist dieser Kurs für dich.\r\n\r\nJoel hat sich in der Arbeit von vielen Jahren in der Musik von vielen erfolgreichen Künstler:innen und Produzenten ergibt. Du lernst einen Ansatz, der für ihn funktioniert hat, und Künstler:innen, mit denen er beim Entlassen von Musik gearbeitet hat, mit denen du die Entwicklung der Zuhörer machen kannst, um dir immer mehr Ströme und Zuhörer zu zu bekommen.\r\n\r\nIn diesem Kurs lernst du:\r\n\r\nDas aktuelle industry aus dem alten Modell\r\nDer Wert von Playlisten und of\r\nWie du Beziehungen und ein Netzwerk mit Influencer aufbaust\r\nWie du den playlist zu finden und den playlist einreichen kannst\r\nWie du Musik mit dem Ziel verteilen kannst, deine Ströme und Zuhörer immer zu wachsen\r\nDu wirst deine eigene Playliste kuratieren und sie in diesem Kurs behandelten Techniken zur Entwicklung deiner Ströme und Zuhörer Bitte füge beim Abschluss dieses Kurses einen Link zu deiner Playlist im course zur Teilnahme von Kursprojekt hinzu.\r\n\r\nSelbst wenn du noch nie Musik zu früh freigegeben oder erfolgreiche Freigaben zu haben, und einfach nur eine Perspektive haben musst, werden es sich lohnt ein Ansatz, um deine Musik-Veröffentlichungen zu verwenden.",
            "textBook": "IELTS PREPS PRO",
            "color": "yellow",
            "progress": 0,
            "bgCardUrlSecondary": "https://static.skillshare.com/cdn-cgi/image/quality=80,width=1000,format=auto/uploads/project/7441a09bb680cdc79c63aa996973dc0f/3d986454",
            "sale": 10,
            "category": [
                3,
                4,
                6
            ]
        }
    ],
  })
  const categories = props.courseCategories;
  console.log(categories);

  //categories.push(props.courseCategories);
  console.log( "data recieved", categories);

  return (
    <div className='bg-gray-900'>
        <div className='grid grid-cols-3 gap-4 justify-center items-center pt-24 px-10'>
            <div className="rounded-xl p-7  w-49 bg-gray-700 text-center shadow-lg"> 
                <p className="text-2xl p-0 m-0 font-bold text-green-400">1000+</p> Students
            </div>
            <div className="rounded-xl p-7 w-49 bg-gray-700 text-center shadow-lg">
                <p className="text-2xl font-bold p-0 m-0 text-green-400">28+</p> Classes</div>
            <div className="rounded-xl p-7 w-49 bg-gray-700 text-center shadow-lg">
                <p className="text-2xl font-bold p-0 m-0 text-green-400">7</p> Years of Experience</div>
            
        </div>
        <div className="w-8/9 mx-10  py-24 sm:px-0">
        <Tab.Group >
            <h1 className=' font-extrabold text-white my-10 mx-20 text-center'> Thousands of classes. Beginner to pro. </h1>
            <Tab.List className="flex w-3/4 space-x-1 rounded-3xl bg-blue-900/20  justify-center  ml-28 mb-10 ">
            {Object.keys(categories).map((category) => (
                <Tab
                key={category}
                className={({ selected }) =>
                    classNames(
                    'w-full rounded-3xl py-0.5 px-4 text-sm leading-5  font-bold  ',
                    ' ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 ',
                    selected
                        ? 'bg-white text-blue-800 font-extrabold  '
                        : 'text-blue-100 hover:bg-white/[0.12] border-2 border-gray-200 hover:text-white'
                    )
                }
                >
                {category}
                </Tab>
            ))}
            <Tab
                
                className={
                    classNames(
                    'w-full rounded-3xl py-0.5 text-sm font-medium leading-5 flex flex-row items-center ',
                    '  focus:outline-none focus:ring-2'
                    , 'text-blue-100 hover:bg-white/[0.12]  hover:text-white'
                    )
                }
                >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 ml-3 h-6">
                <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
                </svg>
                More
                </Tab>
            </Tab.List>
            <Tab.Panels className="mt-2">
            {Object.values(categories).map((courses, idx) => (
       
                <Tab.Panel
                key={idx}

                className={classNames(
                    'rounded-xl  p-3 ',
                    ' focus:outline-none '
                )}
                >
                    {console.log(courses, "courses..")}
                <div className='grid grid-cols-3 gap-1'>
                {courses.map((course) => {
                        return (
                            <NavLink to={'/workspace/' + course.name} className='no-underline'>
                                        <div key={course.name} className="col-span-1 shadow-md shadow-white flex flex-col mx-2  bg-white   h-[60vh] mt-2 mb-20 rounded-lg  ">
                                            <div className=" relative flex flex-row gap-1 h-3/4 overflow-hidden">
                                                <img className="peer h-[40vh] w-full rounded-lg object-cover " src={course.bgCardUrl} />
                                                {console.log(course.bgCardUrl)}
                                            <span className="absolute top-1 left-1 m-2 rounded-full bg-white/70 px-2 text-center text-xs font-medium text-gray-800">{course.sale}% OFF</span>
                                            </div>
                                                <div className="flex flex-col px-2 pt-0 ">
                                                    <div className="flex flex-row justify-between">
                                                    <p className="text-xs font-light  text-color-secondary  m-0 p-0"> {course.totalStudent} 288 students</p>
                                                    <p className="text-xs font-light  text-color-secondary  m-0 p-0"> {course.duration} 100m</p>
                                                    </div>
                                                    <div className="text-xs mb-3 text-center rounded-lg font-extrabold hover:bg-blue-300/10 text-color-secondary  capitalize">
                                                        {course.name}</div>
                                                    <div className="flex flex-row justify-between">
                                                        <p className="text-xs font-light  text-color-secondary  m-0 p-0"> {course.textBook} Oxford destination</p>
                                                        <button className="bg-white text-black font-light">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                    

                                                    
                                                <Link to={"/workspace/courses/" + course.id} className="no-underline"> 
                                                
                                                </Link>

                                                </div>
                                        </div>
                                    </NavLink>
                        
                            
                        )
                        {/*
                        <div key={course.name} className="col-span-1 shadow-md shadow-white flex flex-col mx-2  bg-white   h-[60vh] mt-2 mb-20 rounded-lg  ">
                            <div className=" relative flex flex-row gap-1 h-3/4 overflow-hidden">
                                <img className="peer h-[40vh] w-full rounded-lg object-cover " src={course.bgCardUrl} />
                                <img className="peer peer-hover:right-0  hover:opacity-100 absolute top-0 -right-96  h-[40vh] w-full object-cover rounded-lg transition-all delay-100 duration-1000 hover:right-0" 
                                src={course.bgCardUrlSecondary} alt="product image" />
                                {console.log(course.bgCardUrl)}
                            <span className="absolute top-1 left-1 m-2 rounded-full bg-white/70 px-2 text-center text-xs font-medium text-gray-800">{course.sale}% OFF</span>
                            </div>
                                <div className="flex flex-col px-2 pt-0 ">
                                <div className="flex flex-row"> 
                                    {course.category.map((category) => {return(

                                        <span key={category} className="  m-2 rounded-full bg-gray-400 px-1 py-0 text-center text-xs font-medium text-white"> {category}</span>
                                    )})}


                                </div>
                                <p className="text-xs font-bold  text-color-secondary  m-0 p-0"> {course.serial}-{course.id}</p>
                                <Link to={"/workspace/courses/" + course.id} className="no-underline"> 
                                    <div className="text-xs mb-3 text-center rounded-lg font-extrabold hover:bg-blue-300/10 text-color-secondary  uppercase">
                                        {course.name}</div>
                                </Link>

                            </div>
                        </div>
                        */}
                    })}
                </div>
                </Tab.Panel>
                
            ))}
            </Tab.Panels>
        </Tab.Group>
        </div>
    </div>
  )
}
