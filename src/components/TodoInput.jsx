import PropTypes from 'prop-types';

const TodoInput = ({ handleAddTodos, todoValue, setTodoValue }) => {
  const handleChange = (e) => {
    setTodoValue(e.target.value);
  };

  const handleClick = () => {
    if (todoValue.trim() !== '') {
      handleAddTodos(todoValue);
      setTodoValue('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && todoValue.trim() !== '') {
      handleAddTodos(todoValue);
      setTodoValue('');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter todo..."
        value={todoValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleClick}>Add</button>
    </div>
  );
};

TodoInput.propTypes = {
  handleAddTodos: PropTypes.func.isRequired,
  todoValue: PropTypes.string.isRequired,
  setTodoValue: PropTypes.func.isRequired,
};

export default TodoInput;