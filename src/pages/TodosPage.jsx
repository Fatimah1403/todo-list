import { useEffect, useReducer } from 'react';
import { useSearchParams } from 'react-router';

import TodoList from '../features/Todos/TodoList/TodoList';
import TodoForm from '../features/Todos/TodoForm';
import SortBy from '../shared/SortBy';
import FilterInput from '../shared/FilterInput';
import StatusFilter from '../shared/StatusFilter';
import useDebounce from '../utils/useDebounce';
import { useAuth } from '../contexts/AuthContext';

import {
  todoReducer,
  initialTodoState,
  TODO_ACTIONS,
} from '../reducers/todoReducer';

const TodosPage = () => {
  const { token } = useAuth();
  const [searchParams] = useSearchParams();

  const [state, dispatch] = useReducer(
    todoReducer,
    initialTodoState
  );

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

  // Get the status from the URL, default to 'all'
  const statusFilter = searchParams.get('status') || 'all';

  const debouncedFilterTerm = useDebounce(filterTerm, 300);

  useEffect(() => {
    const fetchTodos = async () => {
      dispatch({ type: TODO_ACTIONS.FETCH_START });

      const paramsObject = {
        sortBy,
        sortDirection,
        limit: 50,
      };

      if (debouncedFilterTerm) {
        paramsObject.find = debouncedFilterTerm;
      }

      const params = new URLSearchParams(paramsObject);

      const options = {
        headers: {
          'X-CSRF-TOKEN': token,
        },
        credentials: 'include',
      };

      try {
        const response = await fetch(
          `/api/tasks?${params}`,
          options
        );

        if (response.status === 401) {
          throw new Error('unauthorized');
        }

        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }

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
    };

    fetchTodos();
  }, [token, sortBy, sortDirection, debouncedFilterTerm]);

  async function addTodo(todoTitle) {
    const tempTodo = {
      id: Date.now(),
      title: todoTitle,
      isCompleted: false,
    };

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
        body: JSON.stringify({
          title: tempTodo.title,
          isCompleted: tempTodo.isCompleted,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add todo');
      }

      const data = await response.json();
      const savedTodo = data.task ?? data;

      dispatch({
        type: TODO_ACTIONS.ADD_TODO_SUCCESS,
        payload: {
          tempId: tempTodo.id,
          savedTodo,
        },
      });
    } catch (error) {
      dispatch({
        type: TODO_ACTIONS.ADD_TODO_ERROR,
        payload: {
          tempId: tempTodo.id,
          message: error.message,
        },
      });
    }
  }

  const completeTodo = async (id) => {
    const originalTodo = todoList.find(
      (todo) => todo.id === id
    );

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
        body: JSON.stringify({
          isCompleted: true,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to complete todo');
      }

      dispatch({
        type: TODO_ACTIONS.COMPLETE_TODO_SUCCESS,
        payload: { id },
      });
    } catch (error) {
      dispatch({
        type: TODO_ACTIONS.COMPLETE_TODO_ERROR,
        payload: {
          id,
          originalTodo,

          // FIXED: Reducer expects payload.message
          message: error.message,
        },
      });
    }
  };

  const updateTodo = async (editedTodo) => {
    const originalTodo = todoList.find(
      (todo) => todo.id === editedTodo.id
    );

    dispatch({
      type: TODO_ACTIONS.UPDATE_TODO_START,
      payload: { editedTodo },
    });

    try {
      const response = await fetch(
        `/api/tasks/${editedTodo.id}`,
        {
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
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update todo');
      }

      dispatch({
        type: TODO_ACTIONS.UPDATE_TODO_SUCCESS,
        payload: { id: editedTodo.id },
      });
    } catch (error) {
      dispatch({
        type: TODO_ACTIONS.UPDATE_TODO_ERROR,
        payload: {
          id: editedTodo.id,
          originalTodo,

          // FIXED: Reducer expects payload.message
          message: error.message,
        },
      });
    }
  };

  const deleteTodo = async (id) => {
    const originalTodo = todoList.find(
      (todo) => todo.id === id
    );

    dispatch({
      type: TODO_ACTIONS.DELETE_TODO_START,
      payload: { id },
    });

    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'X-CSRF-TOKEN': token,
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }

      dispatch({
        type: TODO_ACTIONS.DELETE_TODO_SUCCESS,
        payload: { id },
      });
    } catch (error) {
      dispatch({
        type: TODO_ACTIONS.DELETE_TODO_ERROR,
        payload: {
          id,
          originalTodo,
          message: error.message,
        },
      });
    }
  };

  return (
    <main className="min-h-[calc(100vh-73px)] bg-slate-50 px-4 py-8 sm:px-6 lg:py-10">
      <div className="mx-auto max-w-5xl">

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900">
            My Todos
          </h2>

          <p className="mt-2 text-slate-500">
            Organize your tasks and keep track of your progress.
          </p>
        </div>

        {error && (
          <div
            className="mb-6 flex flex-col gap-3 rounded-lg border border-red-200 bg-red-50 p-4 sm:flex-row sm:items-center sm:justify-between"
            role="alert"
          >
            <p className="text-sm text-red-700">
              {error}
            </p>

            <button
              type="button"
              onClick={() =>
                dispatch({
                  type: TODO_ACTIONS.CLEAR_ERROR,
                })
              }
              className="self-start rounded-md border border-red-300 px-3 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-100 sm:self-auto"
            >
              Clear Error
            </button>
          </div>
        )}

        {filterError && (
          <div
            className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4"
            role="alert"
          >
            <p className="text-sm text-amber-800">
              {filterError}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() =>
                  dispatch({
                    type: TODO_ACTIONS.CLEAR_FILTER_ERROR,
                  })
                }
                className="rounded-md border border-amber-300 px-3 py-2 text-sm font-medium text-amber-800 transition-colors hover:bg-amber-100"
              >
                Clear Error
              </button>

              <button
                type="button"
                onClick={() =>
                  dispatch({
                    type: TODO_ACTIONS.RESET_FILTERS,
                  })
                }
                className="rounded-md bg-amber-700 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-800"
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}

        {isTodoListLoading && (
          <div
            className="mb-6 flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4"
            role="status"
          >
            <div
              className="h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-indigo-600"
              aria-hidden="true"
            />

            <p className="text-sm text-slate-500">
              Loading todos...
            </p>
          </div>
        )}

        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          
          <div className="border-b border-slate-200 pb-6">
            <h3 className="mb-4 text-lg font-semibold text-slate-900">
              Add a Task
            </h3>

            <TodoForm onAddTodo={addTodo} />
          </div>

          <div className="border-b border-slate-200 py-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-slate-900">
                Find Your Tasks
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Search, filter, or sort your todo list.
              </p>
            </div>

            <div className="space-y-4">
              <FilterInput
                filterTerm={filterTerm}
                onFilterChange={(newTerm) =>
                  dispatch({
                    type: TODO_ACTIONS.SET_FILTER,
                    payload: {
                      filterTerm: newTerm,
                    },
                  })
                }
              />

              <div className="grid gap-4 md:grid-cols-2">
                <StatusFilter />

                <SortBy
                  sortBy={sortBy}
                  sortDirection={sortDirection}
                  onSortByChange={(newSortBy) =>
                    dispatch({
                      type: TODO_ACTIONS.SET_SORT,
                      payload: {
                        sortBy: newSortBy,
                        sortDirection,
                      },
                    })
                  }
                  onSortDirectionChange={(newDirection) =>
                    dispatch({
                      type: TODO_ACTIONS.SET_SORT,
                      payload: {
                        sortBy,
                        sortDirection: newDirection,
                      },
                    })
                  }
                />
              </div>
            </div>
          </div>

          <div className="pt-6">
            <div className="mb-5">
              <h3 className="text-lg font-semibold text-slate-900">
                Tasks
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Select a task to edit it or mark it as complete.
              </p>
            </div>

            <TodoList
              todoList={todoList}
              onCompleteTodo={completeTodo}
              onUpdateTodo={updateTodo}
              onDeleteTodo={deleteTodo}
              dataVersion={dataVersion}
              statusFilter={statusFilter}
            />
          </div>
        </section>
      </div>
    </main>
  );
};

export default TodosPage;