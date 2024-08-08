import './App.css';
import Navbar from './components/navbar';
import Todo from './pages/Todo';
import AddCategories from './pages/AddCategories';
import Favorites from './pages/Favorites';
import Basket from './pages/Basket';
import { Route, Routes } from 'react-router-dom';
import Update from './pages/Update';
import Info from './pages/Info'


const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Todo />} />
        <Route path="/info" element={<Info />} />
        <Route path="/addCategory" element={<AddCategories />} />
        <Route path="/edit/:id" element={<Update />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/basket" element={<Basket />} />
      </Routes>
    </div>
  );
}

export default App;
