import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

vi.mock('../components/TodoInput', () => ({
    default: ({ todoValue, setTodoValue, handleAddTodos }) => (
        <div data-testid="todo-input">
            <input
                value={todoValue}
                onChange={(e) => setTodoValue(e.target.value)}
                data-testid="todo-input-field"
            />
            <button onClick={() => handleAddTodos(todoValue)} data-testid="add-todo-button">
                Add Todo
            </button>
        </div>
    ),
}));

vi.mock('../components/TodoList', () => ({
    default: ({ todos, handleEditTodo, handleDeleteTodo }) => (
        <ul data-testid="todo-list">
            {todos.map((todo, index) => (
                <li key={todo.id}>
                    {todo.text}
                    <button onClick={() => handleEditTodo(index)} data-testid={`edit-todo-${index}`}>
                        Edit
                    </button>
                    <button onClick={() => handleDeleteTodo(index)} data-testid={`delete-todo-${index}`}>
                        Delete
                    </button>
                </li>
            ))}
        </ul>
    ),
}));

describe('App Component', () => {
    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
    });

    it('renders TodoInput and TodoList components', () => {
        render(<App />);
        expect(screen.getByTestId('todo-input')).toBeDefined();
        expect(screen.getByTestId('todo-list')).toBeDefined();
    });

    it('adds a new todo', () => {
        render(<App />);
        const input = screen.getByTestId('todo-input-field');
        const addButton = screen.getByTestId('add-todo-button');

        fireEvent.change(input, { target: { value: 'New Todo' } });
        fireEvent.click(addButton);

        expect(screen.getByText('New Todo')).toBeDefined();
    });

    it('deletes a todo', () => {
        render(<App />);
        const input = screen.getByTestId('todo-input-field');
        const addButton = screen.getByTestId('add-todo-button');

        fireEvent.change(input, { target: { value: 'New Todo' } });
        fireEvent.click(addButton);

        const deleteButton = screen.getByTestId('delete-todo-0');
        fireEvent.click(deleteButton);

        expect(screen.queryByText('New Todo')).toBeNull();
    });

    it('edits a todo', () => {
        render(<App />);
        const input = screen.getByTestId('todo-input-field');
        const addButton = screen.getByTestId('add-todo-button');

        fireEvent.change(input, { target: { value: 'New Todo' } });
        fireEvent.click(addButton);

        const editButton = screen.getByTestId('edit-todo-0');
        fireEvent.click(editButton);

        expect(input.value).toBe('New Todo');
    });

    it('loads todos from localStorage', () => {
        localStorage.setItem('todos', JSON.stringify({ todos: [{ id: 1, text: 'Stored Todo' }] }));
        render(<App />);
        expect(screen.getByText('Stored Todo')).toBeDefined();
    });

    it('loads todos from localStorage on initial render', async () => {
        localStorage.setItem('todos', JSON.stringify({ todos: [{ id: 1, text: 'Loaded Todo' }] }));

        render(<App />);
        expect(screen.getByTestId('todo-list')).toHaveTextContent('Loaded Todo');
    });
});