import PropTypes from 'prop-types'
import TodoCard from './TodoCard'

export default function TodoList(props) {
    const { todos } = props

    return (
        <ul className='main'>
            {todos.map((todo, todoIndex) => {
                return (
                    <TodoCard {...props} key={todoIndex} index={todoIndex}>
                        <p>{todo.text}</p>
                    </TodoCard>
                )
            })}
        </ul>
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
}