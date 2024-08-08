import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTodos = createAsyncThunk("users/fetchTodos", async () => {
  const response = await axios.get(`https://northwind.vercel.app/api/categories`);
  return response.data; 
});

export const addTodo = createAsyncThunk("addTodo", async (category) => {
  const response = await axios.post('https://northwind.vercel.app/api/categories', category);
  return response.data; 
});

export const editTodo = createAsyncThunk("editTodo", async ({ id, updatedData }) => {
  const response = await axios.put(`https://northwind.vercel.app/api/categories/${id}`, updatedData);
  return response.data; 
});

export const deleteTodo = createAsyncThunk("deleteTodo", async (id) => {
  const response = await axios.delete(`https://northwind.vercel.app/api/categories/${id}`);
  return id; 
});


const todoSlice = createSlice({
  name: 'users',
  initialState: {
    data: [], 
    basket: [],
    favorites:[], 
    isLoading: false, 
    error: null,
  },
  reducers: {

    addToBasket: (state, action) => {
        state.basket.push( action.payload);
   
    },
    removeFromBasket: (state, action) => {
      state.basket = state.basket.filter(item => item.id !== action.payload);
    },

    addToFavorites: (state, action) => {
      const existingItem = state.favorites.find(item => item.id === action.payload.id);
      if (!existingItem) {
        state.favorites.push(action.payload);
      }
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(item => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.isLoading = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.isLoading = "failed";
        state.error = action.error.message;
      })
      .addCase(addTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.isLoading = "succeeded";
        console.log('Added Todo:', action.payload); 
        state.data.push(action.payload);
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.isLoading = "failed";
        state.error = action.error.message;
      })

      .addCase(editTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editTodo.fulfilled, (state, action) => {
        state.isLoading = "succeeded";
        const updatedTodo = action.payload;
        state.data = state.data.map(todo =>
          todo.id === updatedTodo.id ? updatedTodo : todo
        );
      })
      .addCase(editTodo.rejected, (state, action) => {
        state.isLoading = "failed";
        state.error = action.error.message;
      })

      .addCase(deleteTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.isLoading = "succeeded";
        console.log('Added Todo:', action.payload); 
        state.data = state.data.filter(todo => todo.id !== action.payload);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.isLoading = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addToBasket,removeFromBasket,addToFavorites,removeFromFavorites } = todoSlice.actions;
export default todoSlice.reducer;
