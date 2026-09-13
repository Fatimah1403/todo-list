import { useMemo } from 'react';
import TodoListItem from './TodoListItem';

const TodoList = ({ todoList, onCompleteTodo, onUpdateTodo, onDeleteTodo, dataVersion, statusFilter }) => {
  const filteredTodoList = useMemo(() => {
    let filtered = todoList;
    if (statusFilter === 'active') filtered = todoList.filter(t => !t.isCompleted);
    else if (statusFilter === 'completed') filtered = todoList.filter(t => t.isCompleted);
    return { version: dataVersion, todos: filtered };
  }, [todoList, dataVersion, statusFilter]);

  if (filteredTodoList.todos.length === 0) {
    return (
      <div className="bg-slate-800 rounded-2xl border border-slate-700 p-8 text-center">
        <p className="text-slate-400">
          {statusFilter === 'completed' ? 'No completed todos yet.' :
           statusFilter === 'active' ? 'No active todos. Add one above!' :
           'No todos yet. Add one above!'}
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-2 list-none p-0">
      {filteredTodoList.todos.map(todo => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onCompleteTodo={onCompleteTodo}
          onUpdateTodo={onUpdateTodo}
          onDeleteTodo={onDeleteTodo}
        />
      ))}
    </ul>
  );
};

export default TodoList;