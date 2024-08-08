import React from 'react';
import { useLocation } from 'react-router-dom';
import "./Info.css"
const Info = () => {
  const location = useLocation();
  const { name, description } = location.state || {};

  return (
    <div>
      <h1>Item Details</h1>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Description:</strong> {description}</p>
    </div>
  );
};

export default Info;
