import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Profile.css";
import { AuthContext } from "../../state/AuthContext";
import axios from 'axios';


export default function Profile () {
  const navigate = useNavigate();
  const { user, setUser, dispatch } = useContext(AuthContext);
  const [editedUser, setEditedUser] = useState(user);
  const [isEditing, setIsEditing] = useState(false);
  const baseUrl = "https://my-wordbooks.onrender.com/api";


  const someAsyncUpdateOperation = async (userData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("Update successful");
      }, 5000);
    });
  };

  useEffect(() => {
    const updateUser = async () => {
      try {
        await someAsyncUpdateOperation(editedUser);
        setUser(editedUser);
      } catch (error) {
        console.error("Failed to update user", error);
      }
    };
  
    if (editedUser !== user) {
      updateUser();
    }
  }, [editedUser, user, setUser]);

  

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`${baseUrl}/users/${editedUser._id}`, editedUser);
      console.log("update user info", response.data);
      setUser(editedUser);  // ユーザー情報の更新
      setIsEditing(false);  // 編集モードの解除
    } catch (err) {
      console.log("fail to update data", err);
    }
  };
  

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Do you really want to delete user information?");
    if (confirmDelete) {
      // ユーザーが登録した単語の取得
      const words = await axios.get(`${baseUrl}/words/${editedUser._id}`);

      // まずユーザーが登録している単語の削除
      const deleteWordPromises = words.data.map(async (word) => {
        try {
          // 各単語を削除するリクエストを送る
          await axios.delete(`${baseUrl}/words/${word._id}`, word);
        } catch (error) {
          console.error('Failed to delete word', error);
        }
      });

      // deleteWordPromisesを実行
      try {
        await Promise.all(deleteWordPromises);
        console.log('All words deleted successfully');
      } catch (error) {
        console.error('Failed to delete some or all words', error);
      }

      // delete user info
      await axios.delete(`${baseUrl}/users/${editedUser._id}`)
        .then(response => {
          console.log("delete user info");
          localStorage.removeItem('user');
          dispatch({ type: 'DELETE_USER_INFO' });
          navigate("/");
        })
        .catch(error => {
          console.log("error: ", error);
        });
    }
  }
  

  return (
    <div>
      <div className="container mt-5">
        <div className="profileTop text-center">
          <h2 className="profileTitle display-5 fw-bold mb-7">Profile</h2>
        </div>

        {isEditing ? (
          <form className="profileBox">
            <div className="mb-3 col-10 mx-auto">
              <label htmlFor="exampleInputUsername" className="form-label text-left">UserName</label>
              <input 
                type="username" 
                className="form-control" 
                id="editInputUsername"
                aria-describedby="usernameHelp"
                required
                value={editedUser.username}
                onChange={(e) => setEditedUser({ ...editedUser, username: e.target.value })}
              />
            </div>
            <div className="mb-3 col-10 mx-auto">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input 
                type="email" 
                className="form-control" 
                id="editInputEmail" 
                aria-describedby="emailHelp"
                required
                value={editedUser.email}
                onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
              />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3 col-10 mx-auto">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input 
                type="password" 
                className="form-control" 
                id="editInputPassword"
                required
                minLength="6"
                value={editedUser.password}
                onChange={(e) => setEditedUser({ ...editedUser, password: e.target.value })}
              />
            </div>
            <div className="d-grid justify-content-center text-center">
              <button 
                type="button" 
                className="profileUpdateButton btn btn-danger my-3 col-1.8 mx-auto" 
                onClick={handleUpdate}
              >Update</button>
            </div>
          </form>
        ) : (
          <form className="profileBox" >
            <div className="mb-4 col-10 mx-auto">
              <label htmlFor="exampleInputUsername" className="form-label text-left">UserName</label>
              <p className="display-6">{ user.username }</p>
            </div>
            <div className="mb-4 col-10 mx-auto">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <p className="display-6">{ user.email }</p>
            </div>
            <div className="d-grid justify-content-center text-center">
              <button 
                type="button" 
                className="profileRegisterButton btn btn-success my-3 col-1.8 mx-auto" 
                onClick={handleEdit}
              >Edit</button>
            </div>
            <div className="d-grid justify-content-center text-center">
              <button 
                type="button" 
                className="profileRegisterButton btn btn-danger my-3 col-1.8 mx-auto" 
                onClick={handleDelete}
              >Delete</button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}