import { Link } from "react-router-dom"
import React, { useState } from "react";
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import CreateOrUpdateSession from "../Features/Create&UpdateSession";
import CreateOrUpdateSection from "../Features/CreateOrUpdateSection";
import { baseUrl } from "../../Share";
import QuizAppInternal from "./QuizzAppInternalData";
import Exercise from "./Exercise";
import VocabFlashCard from "./VocabFlashCard";
import CreateOrUpdateExercise from "../Features/CreateOrUpdateExercise";
export default function NewSessionLayout({sessionData, sectionsData, sessionID, exercisesData}){
    const [session, setSession] = useState(sessionData);
    const [sections, setSections] = useState(sectionsData);
    const [exercises, setExercises] = useState(exercisesData);
    
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
    const works = [
        {name: "Vocab review", bgCardUrl:"https://img.freepik.com/premium-photo/full-shot-girl-learning-math-school_23-2150470852.jpg?w=826" , role:"after", content:{}},
        {name: "Grammar Workshop", bgCardUrl:"https://img.freepik.com/free-photo/front-view-kids-cheating-school_23-2150256562.jpg?t=st=1708662637~exp=1708663237~hmac=97662325185a25662376590d356c1ba8631867e29dfb6e501d14b5d3e25044f9" , role:"after", content:{}},
        {name: "Listening Upskill", bgCardUrl:"https://img.freepik.com/free-photo/workplace-with-open-notebook_1101-349.jpg?t=st=1709636664~exp=1709640264~hmac=e0b68f45114336a69e6d5ed40f4f271a4c89bb40012373021542a842501ac5bb&w=826" , role:"in", content:{}},
    ];
    function textToParagraphs(text){
        return <React.Fragment>
            {text.split('\n').map((paragraph, index) => (

             <p key={index}>{paragraph}</p>
          ))}
          </React.Fragment>
    }
    function textToListItems(text){
        return <React.Fragment>
            {text.split('\n').map((paragraph, index) => (

             <li key={index} className="flex flex-row mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                </svg>

                {paragraph}
                </li>
          ))}
          </React.Fragment>
    }
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
              alert("Text copied to clipboard!");
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
    <>              <div className="grid grid-cols-4">
                        <div className="flex flex-col-reverse  gap-2 py-2">
                            <button onClick={() => scrollToPosition(800)}>
                                <div className=" bg-gray-800 rounded-lg w-full font-bold text-lg px-4 py-2 text-white">  Exercise</div>
                            </button>


                            <button onClick={() => scrollToPosition(700)}>
                            <div className=" bg-gray-800 rounded-lg w-full font-bold text-lg px-4 py-2 text-white">  Content</div>
                            </button>
                            <button onClick={() => scrollToPosition(500)}>
                            <div className=" bg-gray-800 rounded-lg w-full font-bold text-lg px-4 py-2 text-white">  Introduction</div>
                            </button>
                            
                            
                            
                        </div>

                        <div style={containerStyle} className={`m-2 col-span-3 relative rounded-lg bg-cover  pt-8 pb-2 bg-${session.color}-400 bg-green-200 grid grid-cols-3 overflow-hidden`} >
                            <div className="col-span-2 px-8 z-30">
                                <p className="text-3xl font-extrabold text-white pt-3">{session.overview}</p>
                                <div className="flex flex-row">
                                        <Link to={session.PPTFileUrl} className="no-underline"> <button className="ml-2 my-2 p-2 text-md font-semibold text-black no-underline bg-white  rounded-lg"> Guideline for Student (PPT) </button> </Link>
                                </div>
                                <div className="flex flex-row">
                                        <Link to={session.CPTUrl} className="no-underline"> <button className="ml-2 my-2 p-2 text-md text-black font-semibold no-underline bg-white  rounded-lg"> Text Book (CPT)</button> </Link>
                                </div>
                            </div>
                            <div className=" z-20 absolute inset-0 bg-black opacity-40"></div>
                        </div>
                    </div>
                    {localStorage.getItem('role') === "Administrator" &&  <CreateOrUpdateSession addOrUpdateSession={updateSession} sessionID={sessionID} session={session}/> }

                    
                    <div className={`m-2 px-4 rounded-lg   p-4 `} >
                        <div className={`mx-auto w-full  rounded-xl     `}>
                            {sections.map((section, index) => {
                                return(
                                
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
                                    <Disclosure.Panel className=" bg-white  rounded-md px-4 pb-2 pt-4 text-sm text-gray-500 transition-all ease-in-out duration-1000">
                                        
                                        <div className="flex flex-row justify-between">
                                            <div></div>
                                            <button onClick={ () => (handleCopyText(JSON.stringify(section.content))) }>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z" />
                                                </svg>
                                            </button>
                                        </div>
                                        {textToParagraphs(section.content)}
                                        <div className="flex flex-row gap-3"> 
                                        {localStorage.getItem('role') === "Administrator" &&  
                                        <button className="rounded-lg border-1 border-black text-black px-3 py-2 font-bold" onClick={() => deleteSection(section.id)}>Delete</button>
                                         }

                                        {localStorage.getItem('role') === "Administrator" &&  <CreateOrUpdateSection addOrUpdateSection={updateSection} sectionID={section.id} section={section} /> }
                                        
                                        </div>
                                    </Disclosure.Panel>
                                    </>
                                )}
                                </Disclosure>
                                

                            )})}
                            
                        </div>
                    </div>
                    {localStorage.getItem('role') === "Administrator" &&  <CreateOrUpdateSection sessionID={sessionID} addOrUpdateSection={addSection}  /> }

                    
                    <div className="grid grid-cols-2 gap-3 px-8 py-3 mx-7">
                        {exercises.map((exercise, index) => {
                        return <div key={exercise.name} className="rounded-lg h-70 shadow-lg bg-white flex flex-col overflow-hidden pb-2 relative">
                            <img className="h-4/5 w-full object-cover" src={exercise.bgCardUrl} alt="bg"/>
                            <div className="px-2 h-1/5 mt-1 flex justify-between items-center">
                                {/* <Exercise questionsData={exercises[0].questions}/> */}

                                <p className="font-base text-gray-700 text-sm pt-2"> {exercise.name}</p>

                                <p className="font-base text-gray-700 text-sm pt-2"> {exercise.type}</p>
                            </div>
                            
                            {exercise.type === "multiple_choice"  && <Exercise questionsData={exercise.questions} instruction={exercise.instruction} exerciseID={exercise.id}   /> }
                            {exercise.type === "vocabulary" && <VocabFlashCard vocabList={exercise.questions} instruction={exercise.instruction}  /> }
                            
                            <div className="px-2 h-1/5 mt-1 flex flex-col items-center">
                                {/* <Exercise questionsData={exercises[0].questions}/> */}

                                <p className="font-base text-gray-700 text-sm pt-2"> {exercise.questions.length} Questions</p>

                            </div>

                            {localStorage.getItem('role')=== "Administrator" && <CreateOrUpdateExercise addOrUpdateExercise={updateExecise} sessionID={sessionID} exerciseID={exercise.id} exercise={exercise} />}
                            {localStorage.getItem('role')=== "Administrator" &&
                                <button className="absolute top-2 left-2" onClick={()=>{deleteExercise(exercise.id)}} >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-yellow-300">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                </button>
                            }
                            
                        </div>


                        })}
                        



                    </div>
                    <div className="flex justify-center">

                        {localStorage.getItem('role')=== "Administrator" && <CreateOrUpdateExercise addOrUpdateExercise={addExercise} sessionID={sessionID} />}
                    </div>
                    <div className="mt-10" >
                        <h2 className="text-black font-bold text-3xl capitalize"> Explore Your Knowledge </h2>
                        <p  className=" text-sm pr-4"> Take the next step on your creative journey. With these Skillshare classes, you can explore a range of topics, tools, and techniques, from photography and graphic design, to drawing and animation. Whether you’re looking for art classes for beginners or you’re an experienced professional, you can take your skills to the next level with online classes in software like Photoshop, Procreate and After Effects, or learning handmade techniques in painting, hand lettering, and illustration. Make a film, give your home a makeover, start a freelance business. There’s so much inspiration to explore on Skillshare, and you’ll get hands-on experience by completing and sharing your own projects.</p>
                    </div>
    </>
)}