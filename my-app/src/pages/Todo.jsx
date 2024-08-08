import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchTodos,deleteTodo,addToBasket,addToFavorites,removeFromFavorites } from '../redux/todoSlicer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaInfoCircle, FaEdit, FaRegHeart } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { SlBasket } from 'react-icons/sl';
import { FaHeart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import "./Todo.css"

const Todo = () => {
  const dispatch = useDispatch();
  const { data: users, favorites,loading: isLoading, error } = useSelector((state) => state.users);

  console.log(users);


  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);
  
  const handleDelete = (id) => {
    dispatch(deleteTodo(id ));
  };

  const handleAddToBasket = (id) => {
    dispatch(addToBasket(id));
  };

  const handleToggleFavorite = (user) => {
    if (favorites.find(item => item.id === user.id)) {
      dispatch(removeFromFavorites(user.id));
    } else {
      dispatch(addToFavorites(user));
    }
  };

  return (
    <div>
      <h1>Categories List</h1>
      {isLoading && (
        <div className="text-center">
          <h2>Loading...</h2>
        </div>
      )}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      {!isLoading && !error && (
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Details</th>
              <th>Delete</th>
              <th>Edit</th>
              <th>Basket</th>
              <th>Favorite</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.description}</td>
                  <td><Link   to='/info' state={{ name: user.name, description: user.description }}><FaInfoCircle /></Link></td>
                  <td onClick={() => handleDelete(user.id)}><MdDelete /></td>
                  <td><Link to={`/edit/${user.id}`}><FaEdit /></Link></td>
                  <td onClick={() => handleAddToBasket(user)}><SlBasket /> </td>
                  <td onClick={() => handleToggleFavorite(user)}>{favorites.find(item => item.id === user.id) ? <FaHeart /> : <FaRegHeart />}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Todo;
