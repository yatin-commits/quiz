import { useState, useEffect } from 'react';
import './App.css';
import { data } from './data';
import { click } from '@testing-library/user-event/dist/click';

function App() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const[howManyRight,setHowManyRight]=useState(0);
  const[howManyWrong,setHowManyWrong]=useState(0);

  
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Load question and shuffle options
  const loadQuestion = (index) => {
    const question = data[index];
    const options = [...question.incorrect, question.correct];
    const shuffled = shuffleArray(options);
    setShuffledOptions(shuffled);
  };

  // Handle next question
  const handleNextQuestion = () => {
    const nextIndex = questionIndex + 1;
    if (nextIndex < data.length) {
      setQuestionIndex(nextIndex);
      loadQuestion(nextIndex);
    } else {
      setQuizFinished(true);
    }
  };


  const score=(id,clicked)=>
  {
    // let sahi=0;
    // let galat=0;
    const right=(data[questionIndex].correct);
    if(right===clicked)
    {
      setHowManyRight(howManyRight+1);
      handleNextQuestion();
    }
    else{
      setHowManyWrong(howManyWrong+1);
      handleNextQuestion();
    }
    
    

  }



  // Load the initial question
  useEffect(() => {
    loadQuestion(questionIndex);
  }, []);

  return (
    <>
      <div className='h-[100vh] bg-slate-800'>
        <h1 className='text-white text-[30px] font-mono font-bold text-center m-auto'>Quiz App</h1>
        <div className='flex justify-center my-auto'>
          <div className='p-4 text-white border-2 border-solid w-96 rounded-md'>
            {!quizFinished ? (
              <>
                <h1 className='p-1 m-2 w-full uppercase font-mono'>
                  <span>{data[questionIndex].question}</span>
                </h1>
                {shuffledOptions.map((option, index) => (
                  <div onClick={()=>score(index,option)} key={index} className='p-1 cursor-pointer m-2 rounded-md w-full border-2 font-mono hover:bg-blue-600'>
                    <span>{index + 1}. </span>{option}
                  </div>
                ))}
                <button type='submit' onClick={handleNextQuestion} className='bg-blue-600 rounded-md col m-2 px-2 py-1 font-mono text-[20px]'>Next</button>
                <p className='text-center text-[15px]'>{questionIndex + 1} / {data.length}</p>
              </>
            ) : (
              <>
              <h1 className='p-1 m-2 w-full uppercase font-mono text-center'>Quiz Finished!</h1>
              <h2 className='p-1 m-2 w-full uppercase font-mono text-center'>Score: {howManyRight}/{data.length}</h2>
              </>
              
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
