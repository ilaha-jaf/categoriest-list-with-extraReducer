import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, removeFromBasket } from '../redux/todoSlicer';
import "./Basket.css"
const Basket = () => {
    const dispatch = useDispatch();
    const { basket, isLoading, error } = useSelector((state) => state.users);
  
    if (isLoading === 'loading') return <div>Loading...</div>;
    if (isLoading === 'failed') return <div>{error}</div>;
  
    return (
      <div className='add-container'>
        <h2>Basket</h2>
        <ul>
          {basket.length > 0 ? (
            basket.map(item => (
              <li key={item.id}>
                {item.name} - {item.description}
                <button onClick={() => dispatch(removeFromBasket(item.id))}>Remove</button>
              </li>
            ))
          ) : (
            <li>No items in the basket</li>
          )}
        </ul>
      </div>
    );
  };
  
  
  export default Basket;
  