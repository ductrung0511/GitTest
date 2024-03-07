import React, { useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
function QuizAppInternal( {questionsData}) {
    let [isOpen, setIsOpen] = useState(false)

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

    

    useEffect(() => {
        
    }, []);

    

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
        console.log("loadedQuestion: ", questionData)
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
    if(askedCount >= totalQuestion){
        return(<div>
            <div className="flex justify-center items-center min-h-screen">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4">Quiz Game</h1>
                <div className='p-2' >
                    <span className="text-right font-semibold mb-2 bg-purple-300 rounded-lg p-2"> 
                    Correct answer: {correctScore}/{totalQuestion}
                    </span>
                </div>

                <div className="mb-4" id="result"></div>
                <div className="flex justify-between">
                    <button
                        type="button"
                        className="bg-purple-500 text-purple-950 px-4 py-2 rounded-lg mr-2 hover:bg-gray-300 hover:text-gray-800"
                    >
                        Check Answer
                    </button>
                    <button
                        type="button"
                        className="bg-purple-500 text-purple-900 px-4 py-2 rounded-lg hover:bg-gray-300 hover:text-gray-800"
                        onClick={restartQuiz}
                    >
                        Play Again!
                    </button>
                </div>
            </div>
        </div>
        </div>)
    }
    if(options.length === 0) {loadQuestion(0); return <div> loading</div>}
    else  return (
        <>
          <div className="flex items-center justify-center">
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
    
              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Payment successful
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Your payment has been successfully submitted. We’ve sent
                          you an email with all of the details of your order.
                        </p>
                      </div>
    
                      <div className="mt-4">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={closeModal}
                        >
                          Got it, thanks!
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </>
      )
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4">Quiz Game</h1>
                <div className='p-2' >
                    <span className="text-right font-semibold mb-2 bg-purple-300 rounded-lg p-2"> 
                    Question number: {askedCount + 1} 
                    {console.log(options, "options")}
                    </span>
                </div>
                <div className='p-2' >
                    <span className="text-right font-semibold mb-2 bg-purple-300 rounded-lg p-2"> 
                    Correct answer: {correctScore}/{totalQuestion}
                    </span>
                </div>
                <h2 className="text-lg mb-4">{question}</h2>
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
                <div className="mb-4" id="result"></div>
                <div className="flex justify-between">
                    <button
                        type="button"
                        className="bg-purple-500 text-purple-900 px-4 py-2 rounded-lg mr-2 hover:bg-gray-300 hover:text-gray-800"
                        onClick={checkAnswer}
                    >
                        Check Answer
                    </button>
                    <button
                        type="button"
                        className="bg-purple-500 text-purple-900 px-4 py-2 rounded-lg hover:bg-gray-300 hover:text-gray-800"
                        onClick={restartQuiz}
                    >
                        Play Again!
                    </button>
                </div>
            </div>
        </div>
    );
}

export default QuizAppInternal;
