import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../state/AuthContext';
import { Link } from 'react-router-dom';
import "./Wordlist.css";

const Wordlist = () => {
  const [userWords, setUserWords] = useState([0]);

  const { user } = useContext(AuthContext);
  const userId = user._id;
  const baseUrl = "https://my-wordbooks.onrender.com/api";

  useEffect(() => {
    const fetchUserWords = async () => {
      const response = await axios.get(`${baseUrl}/words/${userId}`);
      setUserWords(response.data);
    };
    fetchUserWords();
  }, []);


  const handleDelete = async (id) => {
    try {
      // APIにDELETEリクエストを送信してデータを削除
      await axios.delete(`${baseUrl}/words/${id}`);

      // サーバーサイドからデータを持ってきてすぐに更新
      const response = await axios.get(`${baseUrl}/words/${userId}`);
      setUserWords(response.data);

    } catch (error) {
      console.error("Error deleting word:", error);
      // 必要に応じてエラーメッセージを表示するなどの処理を追加
    }

  };

  return (
    <div className="container mt-5">
      <div className="wordListTop text-center">
        <h2 className="wordListTitle display-5 fw-bold mb-7">{`${user.username}'s Word List`}</h2>
      </div>
      <div className="wordListContent text-center my-3">
        <table className="table table-striped w-75 mx-auto">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Question</th>
              <th scope="col">Answer</th>
              <th scope="col">Result</th>
            </tr>
          </thead>
          <tbody>
            {userWords.map((userWord, index) => (
              <tr key={userWord.id}>
                <th scope="row"> {index+1}</th>
                <td> {userWord.word} </td>
                <td> {userWord.meaning} </td>
                <td> {userWord.isCorrect ? "○" : "×"} </td>
                <td>
                  {userWord.isCorrect && (
                    <button 
                      className="btn btn-danger" 
                      onClick={() => handleDelete(userWord._id)}
                    >
                      Delete
                    </button>
                  )}
                </td>

              </tr> 
            ))}
          </tbody>
        </table>
        
        <Link to="/main">
          <button className="btn btn-outline-dark">back to Top page</button>
        </Link>
      </div>
      
    </div>
  )
}

export default Wordlist;