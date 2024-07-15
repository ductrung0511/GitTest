import React, { useState, useEffect, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { baseUrl } from '../../Share';
import { Tooltip } from 'react-tooltip';
import Alert from '../Features/Alert';
function Exercise( { questionsData, instruction,  exerciseID, description}) {
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
    const wrongAnswer = useRef([])

    const [isAlert, setIsAlert] = useState(false);
    const message = useRef('');
    const [alertTime, setAlertTime] = useState(0);
    


    

    

    

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
            
            setIsAlert(true);
            message.current = "Please select an option!";
            setAlertTime((prev) => prev + 1);
            return;
        }
        if (selectedOption === correctAnswer) {
            setCorrectScore(correctScore + 1);

            setIsAlert(true);
            message.current = "Correct Answer! " + question + " ==> "  + correctAnswer ;
            setAlertTime((prev) => prev + 1);
            
        } else {
            // alert(`Incorrect Answer! Correct Answer: ${correctAnswer}`);
            setIsAlert(true);
            message.current = "Incorrect Answer!" + question + " ==> Correct Answer: " + correctAnswer ;
            setAlertTime((prev) => prev + 1);
            wrongAnswer.current = [...wrongAnswer.current, questionsData[ askedCount ] ];
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
           localStorage.setItem('exerciseLog',JSON.stringify(dataPut));
        })
        closeModal();
    }
    if(options.length === 0) {loadQuestion(0); return <div> loading</div>}
    else  return (
        <>
            {isAlert && <Alert message={message.current} dataValue={4} alertTime={alertTime}   setIsAlert={setIsAlert}/>}
            <div className=" flex items-center justify-center">
            <button
                type="button"
                onClick={openModal}
                data-tooltip-content='Nhấp vào để làm bài trắc nghiệm !'
                data-tooltip-id="tooltip-exercise"
              className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-white hover:text-black  duration-500  hover:scale-95  "
            >
              View Question
            </button>
            <Tooltip id='tooltip-exercise' />
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
                                <div className="flex flex-col justify-center items-center overflow-scroll overflow-y-auto min-h-screen">
                                <div className="bg-white p-6 rounded-lg  mt-32 shadow-lg">
                                    
                                        {console.log(wrongAnswer.current)}
                                    <h1 className="text-2xl font-bold mb-4">End of Multiple Choice Questions! </h1>
                                    <div className='p-2' >
                                        <span className="text-right font-semibold mb-2 bg-black text-white rounded-lg p-2"> 
                                        Your Score: {correctScore}/{totalQuestion}
                                        </span>
                                    </div>
                                    <div className="my-4" id="result"> 
                                        <p className='text-sm'>- Click the black button to proceed to the "Word testing environment!"
                                        <br/>- But remember to notedown and understand everywords in the previous part before proceeding!
                                        <br/>- Click on "Play again" if you are not sure of the Vocabulary! 
                                        </p>
                                    </div>
                    
                                    <div className="mb-4" id="result"></div>
                                    <div className="flex justify-between">
                                        <button
                                            onClick={handleSubmitExercise}
                                            type="button"
                                            className=" hover:scale-95 text-purple-950 duration-500 px-4 py-2 border  border-transparent rounded-lg mr-2 hover:bg-green-400 hover:text-gray-800"
                                        >
                                            Submit!
                                        </button>
                                        <button
                                            type="button"
                                            className=" text-purple-900 hover:scale-95  duration-500 px-4 py-2  border border-transparent rounded-lg hover:bg-red-300 hover:text-gray-800"
                                            onClick={restartQuiz}
                                        >
                                            Play Again!
                                        </button>
                                    <button
                                    type="button"
                                    className="  hover:scale-95  ml-1 justify-center rounded-md duration-500 border border-transparent bg-blue-100 px-4 py-2 text-base  text-purple-900 hover:bg-yellow-300   "
                                    onClick={closeModal}
                                    >
                                    Quit
                                    </button>
                                
                                    </div>
                                </div>

                                <div className='rounded-lg p-2   shadow-lg m-4 mt-10 '>
                                    <div className='p-4 text-sm font-light text-gray-600 bg-gray-200'>

                                        {wrongAnswer.current.length > 4 && <p> Oh no! You need to improve your vocabulary more. Below is the list of words you might need to learn again. Try hard to improve it next time!</p>}
                                        {(wrongAnswer.current.length <= 4 && wrongAnswer.current.length > 0  ) && <p> Good job! Your vocabulary skill seem good today! But there might be some minor mistake. Check out the list of words you might need to learn again. Good luck!</p>}
                                        {(wrongAnswer.current.length ===0 ) && <p>  Exellent!  You make no mistake in the test! </p>}
                                    </div>
                                    {wrongAnswer.current.map((item) => {return(

                                        <div className='rounded-lg p-1 ml-7'>
                                            <p>-{item.question}: <br/> {item.correct_answer}</p>
                                        </div>
                                    )})}


                                </div>
                            </div>
                            </div>
                    }





                    { (askedCount < totalQuestion) &&
                    
                    <div className="flex  col-span-4 justify-center h-[90vh] items-center my-2 overflow-y-auto">
                        <div className="bg-white min-w-full p-6 rounded-lg shadow-lg ">
                            <div className="text-sm font-light mb-4 flex flex-row gap-1"> 
                                <img className='w-3 h-3 mt-1' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAd0lEQVR4nO3WMQoAIQwFUe9/6dluC0F2q5B850EKy0EiriVJE/Fz2iMt5MSQamw38vfcZfJDdu5INdKeX6aHSLpk2UkLOTGk+43QbF7XhrRFWggpzy/TQyRdsuykhZwYUo3Dp/Dr3GXyQ3buSDXSnl+mh0jSGuEBS8aecNn4VVgAAAAASUVORK5CYII="/>
                                <span>
                                    Multiple Choice Questions  
                                </span>
                            </div>
                            
                            <div className='flex flex-row gap-2'>

                                <div className='p-2' >
                                    <span className="text-right font-semibold mb-2 bg-black text-white rounded-lg p-2"> 
                                    Question {askedCount + 1}: 
                                    </span>
                                </div>
                                {/* <div className='p-2' >
                                    <span className="text-right font-semibold mb-2 bg-purple-300 rounded-lg p-2"> 
                                    Correct answer: {correctScore}/{totalQuestion}
                                    </span>
                                </div> */}
                            </div>
                            <h2 className="text-gray-900 ml-20  text-base my-4">{question}</h2>
                            <ul className="space-y-2 mb-4">
                                {options.map((option, index) => (
                                    <li
                                        key={index}
                                        className={`py-2 px-4 rounded-lg border ${
                                            selectedOption === option
                                                ? 'bg-gray-300 border-gray-300 '
                                                : 'bg-white text-black border-purple-500 hover:bg-gray-300 hover:border-gray-300 hover:text-gray-800'
                                        }`}
                                        onClick={() => selectOption(option)}
                                    >
                                        {index + 1}. {option}
                                    </li>
                                ))}
                            </ul>
                            <div className="flex justify-between ml-10">
                                <button
                                    type="button"
                                    className="border border-transparent bg-gray-200 text-purple-900 px-4 py-2 rounded-lg mr-2 hover:bg-gray-300 hover:text-gray-800"
                                    onClick={checkAnswer}
                                >
                                    Check Answer
                                </button>
                            </div>

                        </div>
                                </div>

                    }
                    <div className='col-span-2 mt-24 mx-3 overflow-y-scroll h-80  scroll-behavior-smooth scrollbar-thin scroll-hide'>
                    <p className='text-base font-semibold '> Description:</p>
                        <p className='text-sm font-semibold ' > {description}
                        </p>
                        <div className="border-1 border-gray-200 w-1/2 my-4"> </div>

                        <p className='text-base font-semibold '> Intruction:</p>
                        <p className='text-sm font-semibold ' > {instruction}
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
