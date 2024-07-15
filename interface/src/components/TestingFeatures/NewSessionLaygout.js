import { Link } from "react-router-dom"
import React, { useEffect, useState } from "react";
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import CreateOrUpdateSession from "../Features/Create&UpdateSession";
import CreateOrUpdateSection from "../Features/CreateOrUpdateSection";
import { baseUrl } from "../../Share";
import Exercise from "./Exercise";
import VocabFlashCard from "./VocabFlashCard";
import CreateOrUpdateExercise from "../Features/CreateOrUpdateExercise";
import { Tooltip } from "react-tooltip";
import { Menu, Transition } from '@headlessui/react'
import DeleteCountDownUniversal from "../Features/DeleteCountDownUniversal";
import { Fragment } from "react";
import { useLocation } from "react-router-dom";
import Assignment from "./Assignment";
import Reading from "./Reading";
import WordsOrder from "./WordsOrder";
import GapFilling from "./GapFilling";
import PassageFill from "./GapFilling2";


export default function NewSessionLayout({sessionData, sectionsData, sessionID, exercisesData}){
    const [session, setSession] = useState(sessionData);
    const [sections, setSections] = useState(sectionsData);
    const [exercises, setExercises] = useState(exercisesData);
    const location = useLocation();
    useEffect(()=>{

        scrollToPosition(0);

    },[])
    
    function updateSession (newSession){
        setSession(newSession);
    }
    function addSection (newSection){
        setSections([ ...sections, newSection]);
    }
    const [deleting, setDeleting] = useState(false);
    function deleteSection(sectionID){
        if (deleting) return;
        console.log("Deleting");
        setDeleting(true);
        const url = baseUrl + 'api/section/' + sectionID;
        fetch(url, {
        method:'DELETE', 
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.getItem('access'),}
        }).then((response) => {
            console.log(response);
            setDeleting(false);
            if (response.ok){
                let newSections = [];

                for(let i=0; i< sections.length; i++)
                {
                    if(sections[i].id !== sectionID){
                        newSections.push(sections[i]);
                    }
                
                }
                setSections(newSections);
            }
        }).catch((error) => {
            console.error("Error deleting section:", error);
            setDeleting(false); // Reset deleting state on error
        });

    }
    function deleteExercise(exerciseID){
        if (deleting) return; // why deleting
        console.log("Deleting");
        setDeleting(true);
        const url = baseUrl + 'api/exercise_session/' + exerciseID;
        fetch(url, {
        method:'DELETE', 
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.getItem('access'),}
        }).then((response) => {
            console.log(response);
            setDeleting(false);
            if (response.ok){
                let newExercises = [];

                for(let i=0; i< exercises.length; i++)
                {
                    if(exercises[i].id !== exerciseID){
                        newExercises.push(exercises[i]);
                    }
                }
                setExercises(newExercises);
            }
        }).catch((error) => {
            console.error("Error deleting exercise:", error);
            setDeleting(false); // Reset deleting state on error
        });

    }
    function updateSection( newSection){
        let newSections = [];

        for(let i=0; i< sections.length; i++){
            if(sections[i].id === newSection.id){
                newSections.push(newSection);
            }
            else newSections.push(sections[i]);
        }
        setSections(newSections);

    }
    //sections = props.sections;
    // const works = [
    //     {name: "Vocab review", bgCardUrl:"https://img.freepik.com/premium-photo/full-shot-girl-learning-math-school_23-2150470852.jpg?w=826" , role:"after", content:{}},
    //     {name: "Grammar Workshop", bgCardUrl:"https://img.freepik.com/free-photo/front-view-kids-cheating-school_23-2150256562.jpg?t=st=1708662637~exp=1708663237~hmac=97662325185a25662376590d356c1ba8631867e29dfb6e501d14b5d3e25044f9" , role:"after", content:{}},
    //     {name: "Listening Upskill", bgCardUrl:"https://img.freepik.com/free-photo/workplace-with-open-notebook_1101-349.jpg?t=st=1709636664~exp=1709640264~hmac=e0b68f45114336a69e6d5ed40f4f271a4c89bb40012373021542a842501ac5bb&w=826" , role:"in", content:{}},
    // ];
    function textToParagraphs(text){
        return <React.Fragment>
            {text.split('\n').map((paragraph, index) => (
             <p key={index} className="my-0 py-0">{paragraph}</p>
            ))}
          </React.Fragment> 
    }
    function TextToLinks(text){

        return <React.Fragment>
        {text.split('\n').map((paragraph, index) => {

            if (paragraph.trim().startsWith('https://') || paragraph.trim().startsWith('http://')) {
                // If the paragraph is a URL, return it as an anchor tag
                return (
                    <a key={index} href={paragraph.trim()} className="text-gray-700" target="_blank" rel="noopener noreferrer">
                        NZEC Link
                    </a>
                );
            }
            else if (paragraph.trim().startsWith('<img/>')) {
                return (
                    <img src={paragraph.trim().slice(6)} className="h-[70vh] border-2 border-light w-auto" alt="img for assignment"/>
                );

            }
            else if ( paragraph.trim().startsWith('<video/>')) {
                return (
                    // <img src={paragraph.trim().slice(6)}  alt="img for assignment"/>
                <iframe  src={paragraph.trim().slice(8)} className=" my-3 h-[84vh] aspect-video rounded-lg shadow-lg border-3  border-gray-700  "   allowFullScreen></iframe>
                );

            }
            else if ( paragraph.trim().startsWith('<audio/>')) {
                return (
                    <>
                        <iframe className="mt-3" width="100%" height="166"  frameborder="no" allow="autoplay" src={paragraph.trim().slice(8)}></iframe>
                    </>
                   );

            }
            else {
                return <p key={index} className="my-0 py-0">{paragraph}</p>;
            }
        })}
    </React.Fragment> 
    }

    // function textToListItems(text){
    //     return <React.Fragment>
    //         {text.split('\n').map((paragraph, index) => (

    //          <li key={index} className="flex flex-row mb-1">
    //             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
    //             <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
    //             </svg>

    //             {paragraph}
    //             </li>
    //       ))}
    //       </React.Fragment>
    // }
    const backgroundImageUrl = session.bgCardUrl; 

    const containerStyle = {
        backgroundImage: `url('${backgroundImageUrl}')`,};
    const scrollToPosition = (position) => {
            window.scrollTo({
              top: position,
              behavior: 'smooth' // This gives a smooth scrolling effect
            });
          };
    const handleCopyText = async (text) => {
            try {
              await navigator.clipboard.writeText(text);
            } catch (err) {
              console.error('Failed to copy text: ', err);
            }
          };
    function addExercise(newExercise){
        setExercises([...exercises, newExercise])

    }
    function updateExecise(newExercise){
        let newExercises = [];

        for(let i=0; i< exercises.length; i++){
            if(exercises[i].id === newExercise.id){
                newExercises.push(newExercise);
            }
            else newExercises.push(exercises[i]);
        }
        setExercises(newExercises);
    }
    
    

return(
    <>
    {localStorage.getItem('exerciseLog') === '{}' &&
            <div className=" fixed top-20 right-2 bg-yellow-200  rounded-lg w-72 z-40    ">
            <Disclosure>
            {({ open }) => (
                <>
                <Disclosure.Button className="flex  w-full justify-between bg-yellow-200 shadow-lg rounded-t-lg  px-4 py-2 text-left text-sm font-medium ">
                    <div className=" text-xs font-medium">
                        Xem hướng dẫn đọc làm bài tập nào bạn ơi📋!
                    </div>
                    
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500  rounded-b-lg bg-yellow-100">
                    <p className="text-light text-xs text-black">
                        💡Kéo xuống dưới hoặc nhấn vào nút bên dưới bạn sẽ thấy các bài tập về nhà mà mình  cần làm!
                           <br/>     <button onClick={ ()=>{scrollToPosition(400)}} className="bg-white rounded-lg  p-2 my-1" > Nhấn vào đây để làm bài nào! </button> <br/>

                        ⚔️Và cuối cùng là thống kê điểm số của các bài tập sẽ được lưu lại trong hệ thống  <br/>

                    Các phần hướng dẫn chức năng sẽ hiện lên khi bạn rê chuột lên các phần mô tả nên đừng ngần ngại khám phá nha!💭💭<br/> Phần hướng dẫn này sẽ biến mất sau khi bạn thực hiện một bài tập nào đó trong hệ thống!                        
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
                  <div className="grid grid-cols-4">
                        <Tooltip id='tooltip-session' className="absolute z-30"/>
                        <div
                            data-tooltip-content='Bài tập về nhà của buổi học' data-tooltip-id="tooltip-session" data-tooltip-place="bottom"
                         className="flex flex-col-reverse  gap-2 py-2">
                            <button onClick={() => scrollToPosition(800)}>
                                <div className=" bg-gray-800 rounded-lg w-full font-bold text-lg px-4 py-2 text-white">  Exercise</div>
                            </button>
                            <button onClick={() => scrollToPosition(700)}>
                            <div 
                            data-tooltip-content='Nội dung của buổi học' data-tooltip-id="tooltip-session"
                             className=" bg-gray-800 rounded-lg w-full font-bold text-lg px-4 py-2 text-white">  Content</div>
                            </button> 
                        </div>

                        <div style={containerStyle} className={`m-2 col-span-3 relative rounded-lg bg-cover  pt-8 pb-2 bg-${session.color}-400 bg-green-200 grid grid-cols-3 overflow-hidden`} >
                            <div className="col-span-2 px-8 z-30">
                                <p className="text-3xl font-extrabold text-white pt-3">{session.overview}</p>
                                {(localStorage.getItem('role') === 'Administrator' || localStorage.getItem('role') === "Staff") && 
                                <div className="flex flex-row">
                                        <Link to={session.PPTFileUrl} className="no-underline"> <button className="ml-2 my-2 p-2 text-md font-semibold text-black no-underline bg-white  rounded-lg"> Guideline for Student (PPT)
                                        {session.PPTFileUrl &&  <span> <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className="h-7 w-7 absolute -top-3 -right-3" viewBox="0 0 48 48">
                                        <path fill="#c8e6c9" d="M36,42H12c-3.314,0-6-2.686-6-6V12c0-3.314,2.686-6,6-6h24c3.314,0,6,2.686,6,6v24C42,39.314,39.314,42,36,42z"></path><path fill="#4caf50" d="M34.585 14.586L21.014 28.172 15.413 22.584 12.587 25.416 21.019 33.828 37.415 17.414z"></path>
                                        </svg>  </span> }
                                         </button> </Link>
                                </div>
                                }
                                <div className="flex flex-row">
                                        <Link to={session.CPTUrl} className="no-underline"> <button className="ml-2 my-2 p-2 text-md text-black font-semibold no-underline bg-white  rounded-lg relative"> Additional Resource 
                                         {session.CPTUrl &&  <span> <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className="h-7 w-7 absolute -top-3 -right-3" viewBox="0 0 48 48">
                                        <path fill="#c8e6c9" d="M36,42H12c-3.314,0-6-2.686-6-6V12c0-3.314,2.686-6,6-6h24c3.314,0,6,2.686,6,6v24C42,39.314,39.314,42,36,42z"></path><path fill="#4caf50" d="M34.585 14.586L21.014 28.172 15.413 22.584 12.587 25.416 21.019 33.828 37.415 17.414z"></path>
                                        </svg>  </span> }
                                        </button> </Link>
                                </div>
                            </div>
                            <div className=" z-20 absolute inset-0 bg-black opacity-40"></div>
                        </div>
                    </div>
                    {localStorage.getItem('role') === "Administrator" &&  <CreateOrUpdateSession addOrUpdateSession={updateSession} sessionID={sessionID} session={session}/> }

                    
                    <div
                            data-tooltip-content='Nội dung bài học' data-tooltip-id="tooltip-session"
                     className={`m-2 px-4 rounded-lg   p-4 `} >
                        <div className={`mx-auto w-full  rounded-xl     `}>
                            {sections.map((section, index) => {
                                
                                if (index<3) return(
                                
                                <Disclosure key={section.index} className=" ">
                                {({ open }) => (
                                    <>
                                    <Disclosure.Button  className="flex w-full px-5 my-1  bg-white shadow-lg justify-between rounded-lg   py-3 text-left text-md font-medium text-purple-900 hover:bg-yellow-100">
                                        
                                        <span >{section.name}</span>  
                                        <ChevronUpIcon
                                        className={`${
                                            open ? 'rotate-90 transform transition-all duration-700' : ''
                                        } h-5 w-5 text-purple-500`}
                                        />
                                    </Disclosure.Button>
                                    <Disclosure.Panel className=" bg-white  rounded-md px-4 pb-2 pt-4 text-sm text-black transition-all ease-in-out duration-1000">
                                        
                                        <div className="flex flex-row justify-between">
                                            <div></div>
                                            <Menu as="div" className="relative inline-block  text-left">
                                                    <div>
                                                        <Menu.Button className="inline-flex w-full  justify-center gap-x-1.5 rounded-full bg-white bg-opacity-50 hover:bg-white hover:bg-opacity-30 p-2 text-sm font-semibold text-gray-900 shadow-sm">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                                                        </svg>
                                                        </Menu.Button>
                                                    </div>

                                                    <Transition
                                                        as={Fragment}
                                                        enter="transition ease-out duration-100"
                                                        enterFrom="transform opacity-0 scale-95"
                                                        enterTo="transform opacity-100 scale-100"
                                                        leave="transition ease-in duration-75"
                                                        leaveFrom="transform opacity-100 scale-100"
                                                        leaveTo="transform opacity-0 scale-95"
                                                    >
                                                        <Menu.Items className="absolute  right-0 z-10 p-2 mt-2 w-32 grid grid-cols-1 gap-1 justify-center origin-top-right rounded-md hover:rounded-md   bg-white shadow-lg">
                                                            <Menu.Item> 
                                                                <button onClick={ () => (handleCopyText(baseUrl + location.pathname.substring(1)))} className=" hover:bg-gray-100 p-1 text-sm ">
                                                                    Copy Link
                                                                </button>
                                                            </Menu.Item>

                                                            <Menu.Item>
                                                                <button onClick={ () => (handleCopyText(JSON.stringify(section.content))) } className=" hover:bg-gray-100 p-1 text-sm ">
                                                                    Copy section content
                                                                </button>
                                                            </Menu.Item>



                                                            {
                                                                localStorage.getItem('role')=== "Administrator" &&
                                                                <>
                                                                <Menu.Item className="items-center">
                                                                    <DeleteCountDownUniversal original={sections} setOriginal={setSections} ID={section.id} url={  baseUrl + 'api/section/' }/>
                                                                </Menu.Item>
                                                                </>
                                                            }

                                                        </Menu.Items>
                                                    </Transition>
                                                </Menu>
                                        </div>
                                        {TextToLinks(section.content)}
                                        <div className="flex flex-row gap-3 mt-3 justify-between"> 
                                            <div></div>

                                            {localStorage.getItem('role') === "Administrator" &&  <CreateOrUpdateSection addOrUpdateSection={updateSection} sectionID={section.id} section={section} /> }
                                        
                                        </div>
                                    </Disclosure.Panel>
                                    </>
                                )}
                                </Disclosure> 
                                )

                                
                                if (index >= 3 &&  (localStorage.getItem('role') === 'Administrator'  || localStorage.getItem('role') === 'Staff')) return(

                                    <Disclosure
                                    data-tooltip-content='Nội dung tiết học dành cho giáo viên' data-tooltip-id="tooltip-session"
                                    key={section.index} className=" ">
                                    {({ open }) => (
                                        <>
                                        <Disclosure.Button  className="flex w-full px-5 my-1   shadow-lg justify-between rounded-lg   py-3 text-left text-md font-medium text-purple-900 hover:bg-yellow-100">
                                            
                                            <span >{section.name}</span>  
                                            <ChevronUpIcon
                                            className={`${
                                                open ? 'rotate-90 transform transition-all duration-700' : ''
                                            } h-5 w-5 text-purple-500`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className=" bg-white  rounded-md px-4 pb-2 pt-4 text-sm text-gray-500 transition-all ease-in-out duration-1000">
                                            
                                            <div className="flex flex-row justify-between">
                                                <div></div>
                                                
                                                
                                                <Menu as="div" className="relative inline-block  text-left">
                                                    <div>
                                                        <Menu.Button className="inline-flex w-full  justify-center gap-x-1.5 rounded-full bg-white bg-opacity-50 hover:bg-white hover:bg-opacity-30 p-2 text-sm font-semibold text-gray-900 shadow-sm">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                                                        </svg>
                                                        </Menu.Button>
                                                    </div>

                                                    <Transition
                                                        as={Fragment}
                                                        enter="transition ease-out duration-100"
                                                        enterFrom="transform opacity-0 scale-95"
                                                        enterTo="transform opacity-100 scale-100"
                                                        leave="transition ease-in duration-75"
                                                        leaveFrom="transform opacity-100 scale-100"
                                                        leaveTo="transform opacity-0 scale-95"
                                                    >
                                                        <Menu.Items className="absolute  right-0 z-10 p-2 mt-2 w-32 grid grid-cols-1 gap-1 justify-center origin-top-right rounded-md hover:rounded-md   bg-white shadow-lg">
                                                            <Menu.Item> 
                                                                <button onClick={ () => (handleCopyText(baseUrl + location.pathname.substring(1)))} className=" hover:bg-gray-100 p-1 text-sm ">
                                                                    Copy Link
                                                                </button>
                                                            </Menu.Item>

                                                            <Menu.Item>
                                                                <button onClick={ () => (handleCopyText(JSON.stringify(section.content))) } className=" hover:bg-gray-100 p-1 text-sm ">
                                                                    Copy section content
                                                                </button>
                                                            </Menu.Item>



                                                            {
                                                                localStorage.getItem('role')=== "Administrator" &&
                                                                <>
                                                                <Menu.Item className="items-center">
                                                                    <DeleteCountDownUniversal original={sections} setOriginal={setSections} ID={section.id} url={  baseUrl + 'api/section/' }/>
                                                                </Menu.Item>
                                                                </>
                                                            }

                                                        </Menu.Items>
                                                    </Transition>
                                                </Menu>
                                                
                                                
                                                
                                            </div>

                                            <div>
                                                {textToParagraphs(section.content)}
                                            </div>
                                            <div className="flex flex-row gap-3 justify-between "> 
                                                <div></div>
                                            
    
                                                {localStorage.getItem('role') === "Administrator" &&  <CreateOrUpdateSection addOrUpdateSection={updateSection} sectionID={section.id} section={section} /> }
                                            </div>
                                            
                                        </Disclosure.Panel>
                                        </>
                                    )}
                                    </Disclosure> 

                                )
                            })}
                            
                        </div>
                    </div>
                    {localStorage.getItem('role') === "Administrator" &&  <CreateOrUpdateSection sessionID={sessionID} addOrUpdateSection={addSection}  /> }

                    
                    <div 
                    data-tooltip-content='Bài tập về nhà' data-tooltip-id="tooltip-session"
                    className="grid grid-cols-2 gap-3 px-8 py-3 mx-7">
                        {exercises.map((exercise) => {
                        return <div  key={exercise.name} className="rounded-lg  shadow-lg bg-white flex flex-col overflow-hidden pb-2 relative">
                            <img className=" w-full  object-cover h-72" src={exercise.bgCardUrl} alt="bg"/>
                            <div className="px-2 flex-row my-2 flex justify-between items-center">
                                {/* <Exercise questionsData={exercises[0].questions}/> */}
                                <p className="font-base text-gray-700 my-0 py-0 text-sm pt-2"> {exercise.name}</p>
                                <p className="font-base text-gray-700 my-0 py-0 text-sm pt-2 capitalize"> {exercise.type}</p>
                            </div>

                            {exercise.type === "multiple_choice"  && <Exercise questionsData={exercise.questions} instruction={exercise.instruction} exerciseID={exercise.id}  /> }
                            {exercise.type === "vocabulary" && <VocabFlashCard vocabList={exercise.questions} instruction={exercise.instruction} exerciseID={exercise.id} description={exercise.description}  /> }
                            {exercise.type === "assignment" && <Assignment description={exercise.description} instruction={exercise.instruction} name={exercise.name} exerciseID={exercise.id} sessionID={sessionID} bgCardUrl={exercise.bgCardUrl}  /> }
                            {exercise.type === "reading/listening" && <Reading answer={exercise.questions} description={exercise.description} instruction={exercise.instruction} name={exercise.name} exerciseID={exercise.id} sessionID={sessionID} bgCardUrl={exercise.bgCardUrl}  /> }
                            {exercise.type === "words_order" && <WordsOrder answer={exercise.questions}  description={exercise.description} instruction={exercise.instruction} name={exercise.name} exerciseID={exercise.id} sessionID={sessionID} bgCardUrl={exercise.bgCardUrl}  /> }
                            {exercise.type === "gap_filling" && <GapFilling answer={exercise.questions}  description={exercise.description} question={exercise.instruction} name={exercise.name} exerciseID={exercise.id} sessionID={sessionID} bgCardUrl={exercise.bgCardUrl}  /> }
                            {exercise.type === "MCQ_DragAndDrop" && <PassageFill answer={exercise.questions}  description={exercise.description} question={exercise.instruction} name={exercise.name} exerciseID={exercise.id} sessionID={sessionID} bgCardUrl={exercise.bgCardUrl}  /> }
                            
                            <div className="px-2 h-1/5 mt-1 flex flex-col items-center">
                                {/* <Exercise questionsData={exercises[0].questions}/> */}

                                <p className="font-base text-gray-700 text-sm pt-2"> {exercise.questions.length} Questions</p>

                            </div>

                            
                            <div className="absolute top-2 right-2 flex flex-col  ">
                                <Menu as="div" className="relative inline-block  text-left mb-1">
                                <div>
                                    <Menu.Button className="inline-flex w-full  justify-center gap-x-1.5 rounded-full  bg-white  hover:bg-white hover:bg-opacity-30 p-2 text-sm font-semibold text-gray-900 shadow-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                                    </svg>
                                    </Menu.Button>
                                </div>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute  right-0 z-10 p-2 mt-2 w-32 grid grid-cols-1 gap-1 justify-center origin-top-right rounded-md hover:rounded-md   bg-white shadow-lg">
                                        <Menu.Item> 
                                            <button onClick={ () => (handleCopyText(baseUrl + location.pathname.substring(1)))} className=" hover:bg-gray-100 p-1 text-sm ">
                                                Copy Link
                                            </button>
                                        </Menu.Item>

                                        {
                                            localStorage.getItem('role')=== "Administrator" &&
                                            <>
                                            
                                            <Menu.Item className="items-center">
                                                <DeleteCountDownUniversal original={exercises} setOriginal={setExercises} ID={exercise.id} url={ baseUrl + 'api/exercise_session/'}/>
                                            </Menu.Item>
                                            
                                                                            
                                            </>
                                            
                                        }

                                    </Menu.Items>

                                </Transition>
                                </Menu>
                                <CreateOrUpdateExercise addOrUpdateExercise={updateExecise} sessionID={sessionID} exerciseID={exercise.id} exercise={exercise} />

                            </div>
                            
                        </div>


                        })}
                        



                    </div>
                    <div className="flex justify-center">
                        {localStorage.getItem('role')=== "Administrator" && <CreateOrUpdateExercise addOrUpdateExercise={addExercise} sessionID={sessionID} />}
                    </div>
                    <div className="mt-10">
                        <h2 className="text-black font-bold text-3xl capitalize"> Explore Your Knowledge </h2>
                        <p  className=" text-sm pr-4">
                        Take the next step on your creative journey with the NZEC Language Center. With our diverse range of classes, you can delve into various language topics, tools, and techniques. Whether you're interested in improving your language proficiency, mastering communication skills, or exploring cultural nuances, we offer classes tailored to your needs. Whether you're a beginner or an experienced learner, you can enhance your skills with courses in grammar, vocabulary expansion, conversation practice, and more. Immerse yourself in our virtual classrooms, where you can learn from experienced instructors and interact with fellow language enthusiasts. From mastering new language software to honing your speaking and writing abilities, the NZEC Language Center is your gateway to linguistic excellence. Start your language journey today and unlock a world of opportunities!
                             </p>
                    </div>
    </>
)}