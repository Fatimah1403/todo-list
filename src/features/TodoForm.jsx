import { useRef, useState } from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel';
import { isValidTodoTitle } from '../utils/todoValidation';



const TodoForm = ({ onAddTodo } ) => {
  const [workingTodoTitle, setWorkingTodoTitle] = useState("");
  const inputRef = useRef();

  const handleAddTodo = (event) => {
    event.preventDefault();
    onAddTodo(workingTodoTitle);
    setWorkingTodoTitle("");
    inputRef.current.focus();
  }

  const handleTitleChange = (event) => {
  setWorkingTodoTitle(event.target.value);
};
 
  
  return (
   <form onSubmit={handleAddTodo}>
    <TextInputWithLabel
      elementId="todoTitle"
      labelText="Todo"
      value={workingTodoTitle}
      onChange={handleTitleChange}
      ref={inputRef}
    />
  
    <button disabled={!isValidTodoTitle(workingTodoTitle)}>Add Todo</button>    </form>
  )
}

export default TodoForm
