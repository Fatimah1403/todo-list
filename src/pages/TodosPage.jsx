import { useEffect,  useReducer } from 'react';
import TodoList from '../features/Todos/TodoList/TodoList';
import TodoForm from '../features/Todos/TodoForm';
import SortBy from '../shared/SortBy';
import FilterInput from '../shared/FilterInput';
import useDebounce from '../utils/useDebounce';
import { useAuth } from '../contexts/AuthContext';
import { useSearchParams } from 'react-router';
import StatusFilter from '../shared/StatusFilter';

import {
  todoReducer,
  initialTodoState,
  TODO_ACTIONS,
} from '../reducers/todoReducer';

const TodosPage = () => {
  const { token } = useAuth();
  const [searchParams] = useSearchParams();
  
  const [state, dispatch] = useReducer(todoReducer, initialTodoState);
  const statusFilter = searchParams.get('status') || 'active';

  
  const {
    todoList,
    error,
    filterError,
    isTodoListLoading,
    sortBy,
    sortDirection,
    filterTerm,
    dataVersion,
  } = state;

  
  const debouncedFilterTerm = useDebounce(filterTerm, 300);

  useEffect(() => {

    if (!token) return;

    const fetchTodos = async () => {
      dispatch({ type: TODO_ACTIONS.FETCH_START });

      try {
        const paramsObject = { sortBy, sortDirection };
        if (debouncedFilterTerm) {
          paramsObject.find = debouncedFilterTerm;
        }
        paramsObject.limit = 100;

        const params = new URLSearchParams(paramsObject);
        const response = await fetch(`/api/tasks?${params}`, {
          headers: { 'X-CSRF-TOKEN': token },
          credentials: 'include',
        });

        if (response.status === 401) throw new Error('unauthorized');
        if (!response.ok) throw new Error('Failed to fetch todos');

        const data = await response.json();

        dispatch({
          type: TODO_ACTIONS.FETCH_SUCCESS,
          payload: { todos: data.tasks },
        });

      } catch (error) {
        const isFilterError = !!(
          debouncedFilterTerm ||
          sortBy !== 'createdAt' ||
          sortDirection !== 'desc'
        );

        dispatch({
          type: TODO_ACTIONS.FETCH_ERROR,
          payload: {
            message: isFilterError
              ? `Error filtering/sorting todos: ${error.message}`
              : `Error fetching todos: ${error.message}`,
            isFilterError,
          },
        });
      }
    }

    fetchTodos();
  }, [token, sortBy, sortDirection, debouncedFilterTerm, statusFilter]);

  async function addTodo(todoTitle) {
    const tempTodo = { id: Date.now(), title: todoTitle, isCompleted: false };

    dispatch({
      type: TODO_ACTIONS.ADD_TODO_START,
      payload: { tempTodo },
    });

    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token,
        },
        credentials: 'include',
        body: JSON.stringify({ title: todoTitle, isCompleted: false }),
      });
      if (!response.ok) throw new Error('Failed to add todo');

      const data = await response.json();
      const savedTodo = data.task ?? data;

      dispatch({
        type: TODO_ACTIONS.ADD_TODO_SUCCESS,
        payload: { tempId: tempTodo.id, savedTodo },
      });

    } catch (error) {
      // Remove temp todo, show error
      dispatch({
        type: TODO_ACTIONS.ADD_TODO_ERROR,
        payload: { tempId: tempTodo.id, message: error.message },
      });
    }
  }

  async function completeTodo(id) {

    dispatch({
      type: TODO_ACTIONS.COMPLETE_TODO_START,
      payload: { id },
    });

    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token,
        },
        credentials: 'include',
        body: JSON.stringify({ isCompleted: true }),
      });
      if (!response.ok) throw new Error('Failed to complete todo');

      dispatch({ type: TODO_ACTIONS.COMPLETE_TODO_SUCCESS });

    } catch (error) {
      dispatch({
        type: TODO_ACTIONS.COMPLETE_TODO_ERROR,
        payload: { message: error.message },
      });
    }
  }

  async function updateTodo(editedTodo) {

    dispatch({
      type: TODO_ACTIONS.UPDATE_TODO_START,
      payload: { editedTodo },
    });

    try {
      const response = await fetch(`/api/tasks/${editedTodo.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token,
        },
        credentials: 'include',
        body: JSON.stringify({
          title: editedTodo.title,
          isCompleted: editedTodo.isCompleted,
        }),
      });
      if (!response.ok) throw new Error('Failed to update todo');

      dispatch({ type: TODO_ACTIONS.UPDATE_TODO_SUCCESS });

    } catch (error) {
      dispatch({
        type: TODO_ACTIONS.UPDATE_TODO_ERROR,
        payload: { message: error.message },
      });
    }
  }

  return (
    <div>
      {error && (
        <div>
          <p style={{ color: 'red' }}>{error}</p>
          <button onClick={() => dispatch({ type: TODO_ACTIONS.CLEAR_ERROR })}>
            Clear Error
          </button>
        </div>
      )}

      {/* Filter/sort errors */}
      {filterError && (
        <div>
          <p style={{ color: 'red' }}>{filterError}</p>
          <button onClick={() => dispatch({ type: TODO_ACTIONS.CLEAR_FILTER_ERROR })}>
            Clear Filter Error
          </button>
          <button onClick={() => dispatch({ type: TODO_ACTIONS.RESET_FILTERS })}>
            Reset Filters
          </button>
        </div>
      )}

      {isTodoListLoading && <p>Loading todos...</p>}

      <SortBy
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSortByChange={(newSortBy) =>
          dispatch({
            type: TODO_ACTIONS.SET_SORT,
            payload: { sortBy: newSortBy, sortDirection },
          })
        }
        onSortDirectionChange={(newDirection) =>
          dispatch({
            type: TODO_ACTIONS.SET_SORT,
            payload: { sortBy, sortDirection: newDirection },
          })
        }
      />
      <StatusFilter />

      <FilterInput
        filterTerm={filterTerm}
        onFilterChange={(newTerm) =>
          dispatch({
            type: TODO_ACTIONS.SET_FILTER,
            payload: { filterTerm: newTerm },
          })
        }
      />

      <TodoForm onAddTodo={addTodo} />

      <TodoList
        todoList={todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
        dataVersion={dataVersion}
        statusFilter={statusFilter}
      />
    </div>
  );
};

export default TodosPage;