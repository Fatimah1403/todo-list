import { useRef, useState } from 'react';
import TextInputWithLabel from '../../shared/TextInputWithLabel';
import { isValidTodoTitle } from '../../utils/todoValidation';

const TodoForm = ({ onAddTodo }) => {
  const [workingTodoTitle, setWorkingTodoTitle] = useState('');
  const inputRef = useRef();

  const handleAddTodo = (event) => {
    event.preventDefault();

    onAddTodo(workingTodoTitle);
    setWorkingTodoTitle('');
    inputRef.current.focus();
  };

  const handleTitleChange = (event) => {
    setWorkingTodoTitle(event.target.value);
  };

  return (
    <form
      onSubmit={handleAddTodo}
      className="flex flex-col gap-3 sm:flex-row sm:items-end"
    >
      <div className="flex-1">
        <TextInputWithLabel
          elementId="todoTitle"
          labelText="Todo"
          value={workingTodoTitle}
          onChange={handleTitleChange}
          ref={inputRef}
        />
      </div>

      <button
        type="submit"
        disabled={!isValidTodoTitle(workingTodoTitle)}
        className="rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
      >
        Add Todo
      </button>
    </form>
  );
};

export default TodoForm;