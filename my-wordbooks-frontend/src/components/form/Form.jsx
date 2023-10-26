import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { AuthContext } from '../../state/AuthContext';


const Form = () => {
  const [word, setWord] = useState('');
  const [meaning, setMeaning] = useState('');

  const [words, setWords] = useState([]);

  const { user } = useContext(AuthContext);
  const userId = user._id;
  const baseUrl = "https://my-wordbooks.onrender.com/api";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = { userId, word, meaning };

    try {
      const response = await axios.post(`${baseUrl}/words `, formData);
      console.log('YOU CAN SAVE THE DATA:', response.data);

      setWord('');
      setMeaning('');

      alert("YOU CAN SAVE THE DATA");

    } catch (err) {
      if (err.name === "ValidationError") {
        console.log(err.message);
        alert("YOU CAN'T SAVE THE DATA");
      } else {
        console.log(err.message);
        alert("YOU CAN'T SAVE THE DATA");
      }
    }
  };

  // startボタンを表示させるか否かを保存した単語の数によって判定
  useEffect(() => {
    const fetchWords = async () => {
      const response = await axios.get(`${baseUrl}/words/${userId}`);
      setWords(response.data);
    };
    fetchWords();
  }, []);

  return (
    <div id="form">
      <main>
        <div className="mx-3 my-3 px-4 py-4 text-center">
          <div className="formDesc">
            <p className="fs-5 px-5">分からない単語と意味を入力してね！</p>
            <p className="fs-5 px-5">entering words and meanings you don't understand!</p>
          </div>
          <form className="formMain">
            <div className="mb-3 col-6 mx-auto">
              <label htmlFor="exampleInputForm1" className="form-label">Word</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="ex) English" 
                id="inputWord1" 
                required 
                value={word} 
                onChange={(e) => setWord(e.target.value)}  
              />
            </div>
            <div className="mb-3 col-6 mx-auto">
              <label htmlFor="exampleInputForm2" className="form-label">Meaning</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="ex) 英語" 
                id="inputWord2" 
                required 
                value={meaning} 
                onChange={(e) => setMeaning(e.target.value)}
              />
            </div>
            <div className="d-grid justify-content-center text-center">
              <button type="save" className="formSaveButton btn btn-warning my-3 col-1.8" onClick={handleSubmit}>save</button>
              {words.length > 0 && (
                <Link to="/main/quiz">
                  <button type="start" className="StartButton btn btn-danger my-3 col-1.8">start</button>
                </Link>
              )}
            </div>
          </form>
        </div>
      </main>
    </div>
  )
};

export default Form;