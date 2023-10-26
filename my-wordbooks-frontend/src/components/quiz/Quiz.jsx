import React, { useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { AuthContext } from '../../state/AuthContext';
import { Link } from "react-router-dom";
import "./Quiz.css";
import ProgressBar from 'react-bootstrap/ProgressBar';

const Quiz = () => {
  const [questions, setQuestions] = useState([0]);   // データベースから取得してきたwordとmeaningを格納
  const [randomQuestions, setRandomQuestions] = useState([0]);  // ランダムに並び替えたquestionsを格納
  const [userAnswer, setUserAnswer] = useState("");    // ユーザーが入力したmeaning（answer）を格納
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);   // 現在の問題のindex
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);  // 編集モード
  const [answerMessage, setAnswerMessage] = useState('');  // 正解のメッセージを記述
  const [answeredCorrectly, setAnsweredCorrectly] = useState([]);  // 問題に答えられたか

  const { user } = useContext(AuthContext);
  const userId = user._id;
  const baseUrl = "https://my-wordbooks.onrender.com/api";



  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await axios.get(`${baseUrl}/words/${userId}`);
      setQuestions(response.data);
    };
    fetchQuestions();
  }, []);

  const getRandomQuestions = () => {
    const copyQuestions = [...questions];
    for (let i = copyQuestions.length - 1; i > 0; i-- ) {
      const j = Math.floor(Math.random() * (i + 1));
      [copyQuestions[i], copyQuestions[j]] = [copyQuestions[j], copyQuestions[i]];
    }
    return copyQuestions;
  };

  useEffect(() => {
    const random = getRandomQuestions();
    setRandomQuestions(random);
  }, [questions]);


  const handleCheckAnswer = () => {
    const correctAnswer = randomQuestions[currentQuestionIndex].meaning;
    const isCorrect = userAnswer === correctAnswer;

    const updatedQuestions = randomQuestions.map((question, index) => {
      if (index === currentQuestionIndex) {
        return {
          ...question,
          userAnswer: userAnswer,
          isCorrect: isCorrect,
        };
      }
      return question;
    });

    setRandomQuestions(updatedQuestions);
    setAnsweredCorrectly((prev) => [...prev, isCorrect]);
    setAnswerMessage(isCorrect ? "Correct!" : "Incorrect!");
    setIsAnswerChecked(true);
  }

  const handleNextQuestion = (e) => { 
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setUserAnswer("");
    setAnswerMessage("");
    setIsAnswerChecked(false);
    updateDatabaseWithUserResponses();
  };

  const updateDatabaseWithUserResponses = async () => {
    try {
      const response = await axios.put(`${baseUrl}/words/${randomQuestions[currentQuestionIndex]._id}`, randomQuestions[currentQuestionIndex]);
      console.log("You can save the data into database", response.data);
    } catch (err) {
      console.error("You can't save the data into database", err);
    }
  }

  const calculateProgress = () => {
    return ((currentQuestionIndex + 1) / randomQuestions.length) * 100;
  };

  useEffect(() => {
    const progress = calculateProgress();
  }, [currentQuestionIndex, randomQuestions]);

  
  return (
    <div>
      <div className="container mt-5">
        {(currentQuestionIndex < randomQuestions.length) ? (
          <div className="quizContainer">
            <div className="quizTop text-center">
              <h2 className="quizTitle display-5 fw-bold mb-7">quiz</h2>
            </div>
            <div className="quizContent text-center">
              <div className="quizProgressBar pt-5 pb-4 d-flex justify-content-center">
                <ProgressBar style={{ width: '40%'  }} animated variant="danger" now={`${calculateProgress()}`} />
              </div>
              <div className="quizProgressBarText text-center">
                <p>{currentQuestionIndex+1} / {randomQuestions.length} </p>
              </div>
              <div className="quizText fs-4 my-3">
                {randomQuestions[currentQuestionIndex].word}
              </div>
              <div className="quizForm d-flex justify-content-center">
                <input 
                  type="text"
                  className="form-control mx-sm-3 mb-2"
                  style={{ width: '200px' }}
                  placeholder="input your answer"
                  value={userAnswer}
                  required
                  onChange={(e) => setUserAnswer(e.target.value)}
                  disabled={isAnswerChecked}
                />
                <button className="btn btn-outline-dark mb-2" onClick={() => handleCheckAnswer()}>Check</button>
              </div>
              <div className="my-4">
                {answerMessage && (
                  <div>
                    <p className={`quizAnswerMessage ${isAnswerChecked && answerMessage === "Correct!" ? 'w-25 mx-auto alert alert-success' : isAnswerChecked && answerMessage ? 'w-25 mx-auto alert alert-danger' : ''}`}>{answerMessage}</p>
                    <p>Answer : {randomQuestions[currentQuestionIndex].meaning}</p>
                    <button className="btn btn-outline-dark" onClick={(e) => handleNextQuestion(e)}>Next</button>
                  </div>
                )}
              </div>
            </div>
          </div>
          
        ) : (
          <div className="quizResultMessage">
            <div className="quizTop text-center">
              <h2 className="quizTitle display-5 fw-bold mb-7">Your Result</h2>
              <div className="display-5 fs-1 fw-normal my-3">{answeredCorrectly.filter((ans) => ans).length} / {randomQuestions.length}</div>
            </div>
            <div className="quizResultContent text-center my-3">
              <table className="table table-striped w-75 mx-auto">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Question</th>
                    <th scope="col">Answer</th>
                    <th scope="col">User Answer</th>
                    <th scope="col">Result</th>
                  </tr>
                </thead>
                <tbody>
                  {randomQuestions.map((randomQuestion, index) => (
                    <tr key={randomQuestion.id}>
                      <th scope="row"> {index+1}</th>
                      <td> {randomQuestion.word} </td>
                      <td> {randomQuestion.meaning} </td>
                      <td> {randomQuestion.userAnswer} </td>
                      <td> {randomQuestion.isCorrect ? "○" : "×"} </td>
                    </tr> 
                  ))}
                </tbody>
              </table>
              
              <Link to="/main">
                <button className="btn btn-outline-dark">back to Top page</button>
              </Link>
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;