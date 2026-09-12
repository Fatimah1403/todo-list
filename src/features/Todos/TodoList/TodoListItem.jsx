import TextInputWithLabel from '../../../shared/TextInputWithLabel';
import { isValidTodoTitle } from '../../../utils/todoValidation';
import { useEditableTitle } from '../../../hooks/useEditableTitle';

const TodoListItem = ({ todo, onCompleteTodo, onUpdateTodo, onDeleteTodo }) => {
  const {
    isEditing,
    workingTitle,
    startEditing,
    cancelEdit,
    updateTitle,
    finishEdit
  } = useEditableTitle(todo.title);

  const handleCancel = cancelEdit;
  const handleEdit = (event) => updateTitle(event.target.value);
  

  const handleUpdate = (event) => {
    if (!isEditing) return;
    event.preventDefault();

    const finalTitle = finishEdit();

    onUpdateTodo({ ...todo, title: finalTitle });
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
    <li>
      <form onSubmit={handleUpdate}>
        {isEditing ? (
          <>
            <TextInputWithLabel
              elementId="todoTitle"
              labelText="Todo"
              value={workingTitle}
              onChange={handleEdit}
              ref={null}
            />
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
            <button
              type="button"
              onClick={handleUpdate}
              disabled={!isValidTodoTitle(workingTitle)}
            >
              Update
            </button>
          </>
        ) : (
          <>
            <label>
              <input
                type="checkbox"
                id={`checkbox${todo.id}`}
                checked={todo.isCompleted}
                onChange={() => onCompleteTodo(todo.id)}
              />
            </label>
            <span onClick={startEditing}>{todo.title}</span>
            <button
              type="button"
              onClick={handleDelete}
              style={{
                marginLeft: "10px",
                color: "white",
                backgroundColor: "red",
                border: "none",
                padding: "3px 8px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </>
        )}
      </form>
    </li>
  );
}

export default TodoListItem;