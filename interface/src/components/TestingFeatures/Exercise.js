import React, { useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { baseUrl } from '../../Share';
function Exercise( { questionsData, instruction,  exerciseID}) {
    const [exerciseLog, setExerciseLog]  = useState( JSON.parse(localStorage.getItem("exerciseLog")));
    console.log(exerciseLog, "ExerciseLog in Exercise");

    console.log("Exercise props Panel:",{ questionsData, instruction, exerciseLog, exerciseID});

    let [isOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const [question, setQuestion] = useState('');
    const [questions, setQuestions] = useState(questionsData);
    const [options, setOptions] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);
    const [correctScore, setCorrectScore] = useState(0);
    const [askedCount, setAskedCount] = useState(0);
    const totalQuestion = questionsData.length;
    


    

    

    

    const loadQuestion =  (id) => {  
        let questionData; 
        if (questions[id]) questionData = questions[id];
        else questionData = questions[0];
        //console.log( "control panel", correctScore, totalQuestion, questionData);
        setQuestion(questionData.question);
        setCorrectAnswer(questionData.correct_answer);
        const incorrectAnswers = questionData.incorrect_answers;
        const optionsList = [...incorrectAnswers, questionData.correct_answer].sort(() => Math.random() - 0.5);
        setOptions(optionsList);    
        setSelectedOption(null);    
    };

    const selectOption = (option) => {
        setSelectedOption(option);
    };

    const checkAnswer = () => {
        if (selectedOption === null) {
            alert('Please select an option!');
            return;
        }
        if (selectedOption === correctAnswer) {
            setCorrectScore(correctScore + 1);
            alert('Correct Answer!');
        } else {
            alert(`Incorrect Answer! Correct Answer: ${correctAnswer}`);
        }
        let realCount = askedCount + 1;
        setAskedCount(askedCount + 1);

        if(realCount < totalQuestion){
            loadQuestion(realCount);
        }
    };

    const restartQuiz = () => {
        setCorrectScore(0);
        setAskedCount(0);
        loadQuestion(0);
    };

    const handleSubmitExercise=() => {
        //console.log( setExerciseLog, questionsData, instruction, exerciseLog, exerciseID , "before submit EX log");
        let dataPut =  exerciseLog; 
        if( exerciseLog[exerciseID] === undefined) {
            dataPut[exerciseID] = [ Math.ceil( (correctScore/totalQuestion) * 100)];
        }
        else if (exerciseLog[exerciseID]){
            dataPut[exerciseID].push(Math.ceil((correctScore/totalQuestion) * 100));
        }
        const url = baseUrl + 'api/profile/';
        fetch(url, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.getItem('access'),},
            body: JSON.stringify({exerciseLog: dataPut}),    
        }).then((response) => {
            //console.log(response );
            if(response.status=== 401)
            {
                console.log(response)
            }
            else if(response.ok=== false )
            {
                console.log(response)
            }
        }).then((data) => {
            
           setExerciseLog(dataPut);
        })
        closeModal();
    }
    if(options.length === 0) {loadQuestion(0); return <div> loading</div>}
    else  return (
        <>
          <div className=" flex items-center justify-center">
            <button
              type="button"
              onClick={openModal}
              className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
            >
              View Question
            </button>



          </div>
    
          <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black/25" />
              </Transition.Child>

    
              <div className="fixed inset-0  overflow-scroll">
            <div className="flex items-center  justify-center px-4 py-2 text-center ">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full mx-6 transform   overflow-hidden rounded-2xl bg-white px-7 text-left align-middle shadow-xl transition-all">
                      
















                    <div className='grid grid-cols-6 gap-1'>



                    


                    {
                        (askedCount >= totalQuestion) &&
                            <div className='col-span-4'>
                                <div className="flex justify-center items-center min-h-screen">
                                <div className="bg-white p-6 rounded-lg shadow-lg">
                                    <button className='text-white px-4 py-1 bg-gray-300 rounded-lg flex flex-row items-center gap-2 mb-4'> 
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                                        </svg>
                                        Copy Exercise Link
                                    </button>
                                    <h1 className="text-2xl font-bold mb-4">Quiz Game</h1>
                                    <div className='p-2' >
                                        <span className="text-right font-semibold mb-2 bg-purple-300 rounded-lg p-2"> 
                                        Correct answer: {correctScore}/{totalQuestion}
                                        </span>
                                    </div>
                    
                                    <div className="mb-4" id="result"></div>
                                    <div className="flex justify-between">
                                        <button
                                            onClick={handleSubmitExercise}
                                            type="button"
                                            className="bg-purple-500 text-purple-950 duration-500 px-4 py-2 border  border-transparent rounded-lg mr-2 hover:bg-green-300 hover:text-gray-800"
                                        >
                                            Submit!
                                        </button>
                                        <button
                                            type="button"
                                            className="bg-purple-500 text-purple-900  duration-500 px-4 py-2  border border-transparent rounded-lg hover:bg-red-300 hover:text-gray-800"
                                            onClick={restartQuiz}
                                        >
                                            Play Again!
                                        </button>
                                    <button
                                    type="button"
                                    className="inline-flex  ml-1 justify-center rounded-md duration-500 border border-transparent bg-blue-100 px-4 py-2 text-base  text-purple-900 hover:bg-yellow-300   "
                                    onClick={closeModal}
                                    >
                                    Quit
                                    </button>
                                
                                    </div>
                                </div>
                            </div>
                            </div>
                    }





                    { (askedCount < totalQuestion) &&
                    
                    <div className="flex  col-span-4 justify-center h-[90vh] items-center my-2">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h1 className="text-2xl font-bold mb-4">Quiz Game <span style={{"--value":180}} className='text-black'> hello</span></h1>
                            
                            <div className='flex flex-row gap-2'>

                            <div className='p-2' >
                                <span className="text-right font-semibold mb-2 bg-purple-300 rounded-lg p-2"> 
                                Question number: {askedCount + 1} 
                                </span>
                            </div>
                            <div className='p-2' >
                                <span className="text-right font-semibold mb-2 bg-purple-300 rounded-lg p-2"> 
                                Correct answer: {correctScore}/{totalQuestion}
                                </span>
                            </div>
                            </div>
                            <h2 className="text-gray-900  text-base mb-4">{question}</h2>
                            <ul className="space-y-2 mb-4">
                                {options.map((option, index) => (
                                    <li
                                        key={index}
                                        className={`py-2 px-4 rounded-lg border ${
                                            selectedOption === option
                                                ? 'bg-gray-300 border-gray-300'
                                                : 'bg-purple-500 text-white border-purple-500 hover:bg-gray-300 hover:border-gray-300 hover:text-gray-800'
                                        }`}
                                        onClick={() => selectOption(option)}
                                    >
                                        {index + 1}. {option}
                                    </li>
                                ))}
                            </ul>
                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    className="bg-purple-500 border border-transparent text-purple-900 px-4 py-2 rounded-lg mr-2 hover:bg-gray-300 hover:text-gray-800"
                                    onClick={checkAnswer}
                                >
                                    Check Answer
                                </button>
                                <button
                                    type="button"
                                    className="bg-purple-500 border border-transparent text-purple-900 px-4 py-2 rounded-lg hover:bg-gray-300 hover:text-gray-800"
                                    onClick={restartQuiz}
                                >
                                    Play Again!
                                </button>
                                <div className=" ml-1">
                                    <button
                                    type="button"
                                    className="inline-flex h-full justify-center items-center rounded-md border border-transparent bg-blue-100 px-4  text-base  text-purple-900 hover:bg-blue-200 "

                                    onClick={closeModal}
                                    >
                                    Cancel Work
                                    </button>
                                </div>
                            </div>
                        </div>
                                </div>

                    }
                    <div className='col-span-2 mt-24 mx-3 overflow-y-scroll h-80  scroll-behavior-smooth scrollbar-thin scroll-hide'>
                        <p className='text-base font-semibold text-purple-800'> Intruction for your Work</p>
                        <p className='text-sm font-semibold  text-purple-800' > {instruction}
                        </p>
                        <div className="border-1 border-gray-200 w-full my-4"> </div>
                        <p className='text-base font-semibold text-purple-800'> Your attempts</p>
                        

                        {exerciseLog[exerciseID]?
                        exerciseLog[exerciseID].map((item, index) =>{
                            return(

                                <p key={index} className='text-sm font-semibold mx-3 text-purple-400' > Attempt {index + 1}: {item}</p>
                            )
                        }) : <div>No attempts yet</div>
                        }
                        <button
                                    type="button"
                                    className="inline-flex  ml-1 justify-center rounded-md duration-500 border border-transparent bg-blue-100 px-4 py-2 text-base  text-purple-900 hover:bg-yellow-300   "
                                    onClick={closeModal}
                                    >
                                    Quit the game
                                    </button>





                    </div>
                    

                    </div>
















                                
    
                      
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </>
      )
   
}

export default Exercise;
