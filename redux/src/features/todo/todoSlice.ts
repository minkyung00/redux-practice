import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Todo } from "./type";

const initialState: Todo[] = [
  {
    id: 1,
    text: "todo",
    done: false,
  },
];

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => [...state, action.payload],
    toggleTodo: (state, action) =>
      state.map((todo) =>
        todo.id === action.payload ? { ...todo, done: !todo.done } : todo
      ),
  },
});

export const { addTodo, toggleTodo } = todoSlice.actions;

export const selectTodo = (state: RootState) => state.todo;

export default todoSlice.reducer;
