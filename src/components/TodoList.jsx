import PropTypes from 'prop-types'
import TodoCard from './TodoCard'

export default function TodoList({ todos, handleEditTodo, handleDeleteTodo, index }) {
  return (
    <TodoCard
      handleEditTodo={handleEditTodo}
      handleDeleteTodo={handleDeleteTodo}
      index={index}
    >
      <p>{todos[index].text}</p>
    </TodoCard>
  )
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleEditTodo: PropTypes.func.isRequired,
  handleDeleteTodo: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
}