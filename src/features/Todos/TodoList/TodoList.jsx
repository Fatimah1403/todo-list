import TodoListItem from "./TodoListItem";
import { useMemo } from 'react';
const TodoList = ({todoList, onCompleteTodo, onUpdateTodo, dataVersion}) => {
    const filteredTodoList = useMemo(() => {
      console.log(`Recalculating filtered todos (v${dataVersion})`);
      return {
        version: dataVersion,
        todos: todoList.filter((todo) => !todo.isCompleted),
      };
  }, [todoList, dataVersion]);
  return (
    <div>
      <p style={{ fontSize: '12px', color: '#888' }}>
        List version: {filteredTodoList.version}
      </p>
     {filteredTodoList.todos.length === 0 ? (
      <p>Add todo above to get started</p>
     ) : (
      <ul>
        {filteredTodoList.todos.map(todo => (
          <TodoListItem 
          key={todo.id} 
          todo={todo} 
          onCompleteTodo={onCompleteTodo}
          onUpdateTodo={onUpdateTodo}
        />
      ))}
      </ul>
     )}
    </div>
  )
}

export default TodoList
