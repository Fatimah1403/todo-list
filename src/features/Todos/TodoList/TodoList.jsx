import TodoListItem from "./TodoListItem";
import { useMemo } from 'react';
const TodoList = ({
  todoList, 
  onCompleteTodo, 
  onUpdateTodo, 
  dataVersion
}) => {
    const filteredTodoList = useMemo(() => {
      const filteredTodos = todoList.filter(
        (todo) => !todo.isCompleted);
      return {
        version: dataVersion,
        todos: filteredTodos,
      };
  }, [todoList, dataVersion]);
  
  return filteredTodoList.todos.length === 0 ? (
    <p>Add todo above to get started.</p>
  ) : (
    <ul>
      {filteredTodoList.todos.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onCompleteTodo={onCompleteTodo}
          onUpdateTodo={onUpdateTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList
