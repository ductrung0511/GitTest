import React, { useState, useEffect } from 'react';
import { baseUrl } from '../../Share';

function QuizApp( props) {
    const qIDList = props.qIDList;
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState([]);
    const [data, setData] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);
    const [correctScore, setCorrectScore] = useState(0);
    const [askedCount, setAskedCount] = useState(0);
    const [totalQuestion, setTotalQuestion] = useState(0);
    const [loading, setLoading] = useState(true)

    

    useEffect(() => {
        const loadData = async () => {
            try{
                const APIUrl = baseUrl + 'api/questions/';
                const result = await fetch(APIUrl);
                const mock = await result.json();
                setData(mock);
                console.log(data, "data in fetch");
                if (mock && mock.length > 0) 
                {
                    setTotalQuestion(mock.length); ///////
                    console.log("loaded data:", mock );
                    loadQuestion(mock);
                }
                setLoading(false);
            }
            catch(error){
                console.log("Error", error);
                setLoading(false)
    
            }      
        };
        loadData();
    }, []);

    

    const loadQuestion =  (mock) => {  
        let questionData;
        if (data && data.length === 0) 
                {
                     questionData = mock[askedCount];
                     console.log("using mock data")
                }  
        else questionData = data[askedCount];
        console.log( "control panel", correctScore, totalQuestion, questionData);
        setQuestion(questionData.question);
        setCorrectAnswer(questionData.correct_answer);
        const incorrectAnswers = questionData.incorrect_answers;
        const optionsList = [...incorrectAnswers, questionData.correct_answer].sort(() => Math.random() - 0.5);
        setOptions(optionsList);    
        setSelectedOption(null);
        console.log("loadedQuestion", questionData)

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
        setAskedCount(askedCount + 1);
        if(askedCount <= totalQuestion){
            loadQuestion(data);
        }
    };

    const restartQuiz = () => {
        setCorrectScore(0);
        setAskedCount(0);
        loadQuestion(data);
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
                        className="bg-purple-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-gray-300 hover:text-gray-800"
                    >
                        Check Answer
                    </button>
                    <button
                        type="button"
                        className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-gray-300 hover:text-gray-800"
                        onClick={restartQuiz}
                    >
                        Play Again!
                    </button>
                </div>
            </div>
        </div>
        </div>)
    }

    
    return (

        
        <div className="flex justify-center items-center min-h-screen">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4">Quiz Game</h1>
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
                        className="bg-purple-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-gray-300 hover:text-gray-800"
                        onClick={checkAnswer}
                    >
                        Check Answer
                    </button>
                    <button
                        type="button"
                        className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-gray-300 hover:text-gray-800"
                        onClick={restartQuiz}
                    >
                        Play Again!
                    </button>
                </div>
            </div>
        </div>
    );
}

export default QuizApp;
