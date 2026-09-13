import TextInputWithLabel from '../../../shared/TextInputWithLabel';
import { isValidTodoTitle } from '../../../utils/todoValidation';
import { useEditableTitle } from '../../../hooks/useEditableTitle';

const TodoListItem = ({
  todo,
  onCompleteTodo,
  onUpdateTodo,
  onDeleteTodo,
}) => {
  const {
    isEditing,
    workingTitle,
    startEditing,
    cancelEdit,
    updateTitle,
    finishEdit,
  } = useEditableTitle(todo.title);

  const handleCancel = cancelEdit;

  const handleEdit = (event) => {
    updateTitle(event.target.value);
  };

  const handleUpdate = (event) => {
    if (!isEditing) return;

    event.preventDefault();

    const finalTitle = finishEdit();

    onUpdateTodo({
      ...todo,
      title: finalTitle,
    });
  };

  const handleDelete = () => {
    const shouldDelete = window.confirm(
      `Are you sure you want to delete "${todo.title}"?`
    );

    if (shouldDelete) {
      onDeleteTodo(todo.id);
    }
  };

  return (
    <li className="rounded-lg border border-slate-200 bg-white p-4 transition-shadow hover:shadow-sm">
      <form onSubmit={handleUpdate}>
        {isEditing ? (
          <div className="flex flex-col gap-3">
            <TextInputWithLabel
              elementId={`todoTitle-${todo.id}`}
              labelText="Todo"
              value={workingTitle}
              onChange={handleEdit}
              ref={null}
            />

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={handleCancel}
                className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-300"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleUpdate}
                disabled={!isValidTodoTitle(workingTitle)}
                className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
              >
                Update
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-4">
            
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <input
                type="checkbox"
                id={`checkbox${todo.id}`}
                checked={todo.isCompleted}
                onChange={() => onCompleteTodo(todo.id)}
                className="h-5 w-5 shrink-0 cursor-pointer rounded border-slate-300 accent-indigo-600"
              />

              <label
                htmlFor={`checkbox${todo.id}`}
                className="sr-only"
              >
                Mark {todo.title} as complete
              </label>

              <span
                onClick={startEditing}
                className={`min-w-0 flex-1 cursor-pointer break-words text-sm transition-colors ${
                  todo.isCompleted
                    ? 'text-slate-400 line-through'
                    : 'text-slate-800 hover:text-indigo-600'
                }`}
                title="Click to edit"
              >
                {todo.title}
              </span>
            </div>

            <button
              type="button"
              onClick={handleDelete}
              className="shrink-0 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:border-red-300 hover:bg-red-100 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-200"
            >
              Delete
            </button>
          </div>
        )}
      </form>
    </li>
  );
};

export default TodoListItem;