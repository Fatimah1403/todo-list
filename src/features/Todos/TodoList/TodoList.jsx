import TodoListItem from './TodoListItem';
import { useMemo } from 'react';

const TodoList = ({
  todoList,
  onCompleteTodo,
  onUpdateTodo,
  dataVersion,
  statusFilter = 'all',
}) => {
  
  const validStatuses = ['active', 'completed', 'all'];

  const currentStatus = validStatuses.includes(statusFilter)
    ? statusFilter
    : 'all';

  const filteredTodoList = useMemo(() => {
    let filteredTodos;

    switch (currentStatus) {
      case 'completed':
        filteredTodos = todoList.filter((todo) => todo.isCompleted);
        break;

      case 'active':
        filteredTodos = todoList.filter((todo) => !todo.isCompleted);
        break;

      case 'all':
        filteredTodos = todoList;
        break;

      default:
        filteredTodos = todoList.filter((todo) => !todo.isCompleted);
    }

    return {
      version: dataVersion,
      todos: filteredTodos,
    };
  }, [todoList, dataVersion, currentStatus]);

  const getEmptyMessage = () => {
    switch (currentStatus) {
      case 'completed':
        return 'No completed todos yet. Complete some tasks to see them here.';

      case 'active':
        return 'No active todos. Add a todo above to get started.';

      case 'all':
        return 'Add todo above to get started.';

      default:
        return 'No active todos. Add a todo above to get started.';
    }
  };

  return filteredTodoList.todos.length === 0 ? (
    <p>{getEmptyMessage()}</p>
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
};

export default TodoList;