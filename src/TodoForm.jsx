import { useRef, useState } from 'react';


const TodoForm = ({ onAddTodo } ) => {
  const [workingTodoTitle, setWorkingTodoTitle] = useState("");
  const inputRef = useRef();

  const handleAddTodo = (event) => {
    event.preventDefault();
    onAddTodo(workingTodoTitle);
    setWorkingTodoTitle("");
    inputRef.current.focus();
  }

 
  
  return (
   <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Todo</label>
      <input 
        ref={inputRef}
        value={workingTodoTitle }
        type="text" id="todoTitle"
        onChange={(e) => setWorkingTodoTitle(e.target.value)}
        name="todoTitle"
        placeholder={'Todo text'}
      />
      <button type="submit" disabled={!workingTodoTitle.trim()} >Add Todo</button>
    </form>
  )
}

export default TodoForm
