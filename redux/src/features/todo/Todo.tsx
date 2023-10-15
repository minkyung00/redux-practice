import { useDispatch, useSelector } from "react-redux";
import { addTodo, selectTodo, toggleTodo } from "./todoSlice";
import { ChangeEvent, FormEvent, useState } from "react";
import { Todo as TodoType } from "./type";

export const Todo = () => {
  const todoList = useSelector(selectTodo);
  const dispatch = useDispatch();
  const [todoText, setTodoText] = useState<TodoType["text"]>();

  const handleChangeTodoText = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTodoText(value);
  };

  const handleChangeTodoCompleted = (id: TodoType["id"]) => () => {
    dispatch(toggleTodo(id));
  };

  const handleSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const latestId = Math.max(...todoList.map(({ id }) => id), 0);

    const newTodo = {
      id: latestId + 1,
      text: todoText,
      boolean: false,
    };

    dispatch(addTodo(newTodo));
  };

  return (
    <>
      <form onSubmit={handleSubmitForm}>
        <input type="text" value={todoText} onChange={handleChangeTodoText} />
        <button>Add Todo</button>
      </form>
      <ul>
        {todoList.map(({ id, text, done }) => (
          <li key={id}>
            <input
              type="checkbox"
              defaultChecked={done}
              onChange={handleChangeTodoCompleted(id)}
            />
            <span>{text}</span>
          </li>
        ))}
      </ul>
    </>
  );
};
