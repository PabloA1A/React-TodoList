import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import TodoInput from '../components/TodoInput';

describe('TodoInput', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(
      <TodoInput
        handleAddTodos={vi.fn()}
        todoValue=""
        setTodoValue={vi.fn()}
      />
    );

    expect(getByPlaceholderText('Enter todo...')).toBeDefined();
    expect(getByText('Add')).toBeDefined();
  });

  it('calls setTodoValue when input changes', () => {
    const setTodoValue = vi.fn();
    const { getByPlaceholderText } = render(
      <TodoInput
        handleAddTodos={vi.fn()}
        todoValue=""
        setTodoValue={setTodoValue}
      />
    );

    const input = getByPlaceholderText('Enter todo...');
    fireEvent.change(input, { target: { value: 'New Todo' } });

    expect(setTodoValue).toHaveBeenCalledWith('New Todo');
  });

  it('calls handleAddTodos and resets input when Add button is clicked', () => {
    const handleAddTodos = vi.fn();
    const setTodoValue = vi.fn();
    const { getByText } = render(
      <TodoInput
        handleAddTodos={handleAddTodos}
        todoValue="Test Todo"
        setTodoValue={setTodoValue}
      />
    );

    const addButton = getByText('Add');
    fireEvent.click(addButton);

    expect(handleAddTodos).toHaveBeenCalledWith('Test Todo');
    expect(setTodoValue).toHaveBeenCalledWith('');
  });

  it('calls handleAddTodos and resets input when Enter key is pressed', () => {
    const handleAddTodos = vi.fn();
    const setTodoValue = vi.fn();
    const { getByPlaceholderText } = render(
      <TodoInput
        handleAddTodos={handleAddTodos}
        todoValue="Test Todo"
        setTodoValue={setTodoValue}
      />
    );

    const input = getByPlaceholderText('Enter todo...');
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(handleAddTodos).toHaveBeenCalledWith('Test Todo');
    expect(setTodoValue).toHaveBeenCalledWith('');
  });

  it('does not call handleAddTodos when input is empty', () => {
    const handleAddTodos = vi.fn();
    const setTodoValue = vi.fn();
    const { getByText } = render(
      <TodoInput
        handleAddTodos={handleAddTodos}
        todoValue=""
        setTodoValue={setTodoValue}
      />
    );

    const addButton = getByText('Add');
    fireEvent.click(addButton);

    expect(handleAddTodos).not.toHaveBeenCalled();
    expect(setTodoValue).not.toHaveBeenCalled();
  });
});