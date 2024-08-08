import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, removeFromFavorites } from '../redux/todoSlicer';
import "./Favorites.css"
const Favorites = () => {
    const dispatch = useDispatch();
    const { favorites, isLoading, error } = useSelector((state) => state.users);
  
    if (isLoading === 'loading') return <div>Loading...</div>;
    if (isLoading === 'failed') return <div>{error}</div>;
  
    return (
      <div className='add-container'>
        <h2>Favorites</h2>
        <ul>
          {favorites.length > 0 ? (
            favorites.map(item => (
              <li key={item.id}>
                {item.name} - {item.description}
                <button onClick={() => dispatch(removeFromFavorites(item.id))}>Remove</button>
              </li>
            ))
          ) : (
            <li>No items in the Favorites</li>
          )}
        </ul>
      </div>
    );
  };
  
  
  export default Favorites;
  