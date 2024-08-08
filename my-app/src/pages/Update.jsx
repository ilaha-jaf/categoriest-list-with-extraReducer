import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editTodo } from "../redux/todoSlicer";
import "./Update.css"

const Update = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: users = [] } = useSelector((state) => state.users);
  const existingUser = users.find(f => f.id === parseInt(id)); 

  if (!existingUser) {
    return <div>User not found</div>;
  }

  const { name, description } = existingUser;

  const [uname, setName] = useState(name);
  const [udescription, setDescription] = useState(description);

  const handleUpdate = (event) => {
    event.preventDefault();
    dispatch(editTodo({
      id,
      updatedData: {
        name: uname,
        description: udescription
      }
    }))
    .then(() => navigate('/'))
    .catch(error => console.error("Update failed:", error));
  };

  return (
    <div className="add-container">
      <h3>Edit User</h3>
      <form className='customers' onSubmit={handleUpdate}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={uname}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={udescription}
            onChange={e => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Update;
