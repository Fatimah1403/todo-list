
export const TODO_ACTIONS = {
  // Fetch todos from API
  FETCH_START: 'FETCH_START',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_ERROR: 'FETCH_ERROR',

  // Add a new todo
  ADD_TODO_START: 'ADD_TODO_START',
  ADD_TODO_SUCCESS: 'ADD_TODO_SUCCESS',
  ADD_TODO_ERROR: 'ADD_TODO_ERROR',

  // Complete a todo
  COMPLETE_TODO_START: 'COMPLETE_TODO_START',
  COMPLETE_TODO_SUCCESS: 'COMPLETE_TODO_SUCCESS',
  COMPLETE_TODO_ERROR: 'COMPLETE_TODO_ERROR',

  // Update a todo title
  UPDATE_TODO_START: 'UPDATE_TODO_START',
  UPDATE_TODO_SUCCESS: 'UPDATE_TODO_SUCCESS',
  UPDATE_TODO_ERROR: 'UPDATE_TODO_ERROR',

  // UI controls
  SET_SORT: 'SET_SORT',
  SET_FILTER: 'SET_FILTER',
  CLEAR_ERROR: 'CLEAR_ERROR',
  CLEAR_FILTER_ERROR: 'CLEAR_FILTER_ERROR',
  RESET_FILTERS: 'RESET_FILTERS',
};

export const initialTodoState = {
  todoList: [],
  error: '',
  filterError: '',
  isTodoListLoading: true,
  sortBy: 'createdAt',
  sortDirection: 'asc',
  filterTerm: '',
  dataVersion: 0,
  originalTodo: null,
};

export function todoReducer(state, action) {
  switch (action.type) {

    // ─── FETCH TODOS ───────────────────────────────────────────
    case TODO_ACTIONS.FETCH_START:
      return {
        ...state,
        isTodoListLoading: true,
        error: '',
        filterError: '',
      };

    case TODO_ACTIONS.FETCH_SUCCESS:
      return {
        ...state,
        isTodoListLoading: false,
        todoList: action.payload.todos,
        error: '',
        filterError: '',
      };

    case TODO_ACTIONS.FETCH_ERROR:
      return {
        ...state,
        isTodoListLoading: false,
        error: action.payload.isFilterError ? '' : action.payload.message,
        filterError: action.payload.isFilterError ? action.payload.message : '',
      };

    // ─── ADD TODO ──────────────────────────────────────────────
    case TODO_ACTIONS.ADD_TODO_START:
      
      return {
        ...state,
        error: '',
        todoList: [action.payload.tempTodo, ...state.todoList],
      };

    case TODO_ACTIONS.ADD_TODO_SUCCESS:
      
      return {
        ...state,
        dataVersion: state.dataVersion + 1,
        todoList: state.todoList.map(todo =>
          todo.id === action.payload.tempId
            ? action.payload.savedTodo
            : todo
        ),
      };

    case TODO_ACTIONS.ADD_TODO_ERROR:
      
      return {
        ...state,
        error: action.payload.message,
        todoList: state.todoList.filter(
          todo => todo.id !== action.payload.tempId
        ),
      };

    // ─── COMPLETE TODO ─────────────────────────────────────────
    case TODO_ACTIONS.COMPLETE_TODO_START:
    
      return {
        ...state,
        error: '',
        originalTodo: state.todoList.find(todo => todo.id === action.payload.id) || null,
        todoList: state.todoList.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, isCompleted: true }
            : todo
        ),
      };

    case TODO_ACTIONS.COMPLETE_TODO_SUCCESS:
      return {
        ...state,
        dataVersion: state.dataVersion + 1,
        originalTodo: null,
      };

    case TODO_ACTIONS.COMPLETE_TODO_ERROR:
      return {
        ...state,
        error: action.payload.message,
        originalTodo: null,
        todoList: state.todoList.map(todo =>
          todo.id === action.payload.originalTodo.id
            ? action.payload.originalTodo
            : todo
        ),
      };

    // ─── UPDATE TODO ───────────────────────────────────────────
    case TODO_ACTIONS.UPDATE_TODO_START:
      
      return {
        ...state,
        error: '',
        originalTodo: state.todoList.find(
            todo => todo.id === action.payload.editedTodo.id
            ) || null,
        todoList: state.todoList.map(todo =>
          todo.id === action.payload.editedTodo.id
            ? { ...todo, ...action.payload.editedTodo }
            : todo
        ),
      };

    case TODO_ACTIONS.UPDATE_TODO_SUCCESS:
      return {
        ...state,
        dataVersion: state.dataVersion + 1,
        originalTodo: null,
      };

    case TODO_ACTIONS.UPDATE_TODO_ERROR:
      return {
        ...state,
        originalTodo: null,
        error: action.payload.message,
        todoList: state.todoList.map(todo =>
          todo.id === action.payload.originalTodo.id
            ? action.payload.originalTodo
            : todo
        ),
      };
    // ─── UI OPERATIONS ─────────────────────────────────────────
    case TODO_ACTIONS.SET_SORT:
      return {
        ...state,
        sortBy: action.payload.sortBy,
        sortDirection: action.payload.sortDirection,
      };

    case TODO_ACTIONS.SET_FILTER:
      return {
        ...state,
        filterTerm: action.payload.filterTerm,
      };

    case TODO_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: '',
      };

    case TODO_ACTIONS.CLEAR_FILTER_ERROR:
      return {
        ...state,
        filterError: '',
      };

    case TODO_ACTIONS.RESET_FILTERS:
      return {
        ...state,
        filterTerm: '',
        sortBy: 'createdAt',
        sortDirection: 'asc',
        filterError: '',
      };

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}