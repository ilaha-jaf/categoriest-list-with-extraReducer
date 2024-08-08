import React, { useState,useEffect } from "react";
import { addTodo } from "../redux/todoSlicer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./AddCategories.css"
const AddCategories = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const { data: users} = useSelector((state) => state.users);
  const navigate = useNavigate();
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addTodo());
  }, [dispatch]);


  const handleSubmit = (event) => {
    event.preventDefault();


    console.log('Adding user with ID:');
    console.log('Name:', name);
    console.log('Description:', description);

    dispatch(addTodo({ name, description }));
    console.log(name, description);
    

    navigate('/');
  };

  return (
    <div className="add-container">
      <form className='customers' onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddCategories;
