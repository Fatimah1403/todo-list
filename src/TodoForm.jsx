import { useRef } from 'react';


const TodoForm = ({ onAddTodo }) => {
  const inputRef = useRef();

  const handledAddTodo = (event) => {
    event.preventDefault();
    
  const todoTitle = event.target.todoTitle.value.trim();
  if (todoTitle && todoTitle !== "") {
    onAddTodo(todoTitle);
    event.target.reset();
    inputRef.current.focus();
  }

 
  }
  return (
   <form onSubmit={handledAddTodo}>
      <label htmlFor="todoTitle">Todo</label>
      <input 
        ref={inputRef}
        type="text" id="todoTitle"
        name="todoTitle"
        placeholder={'Todo text'}
        required
      />
      <button type="submit" >Add Todo</button>
    </form>
  )
}

export default TodoForm
