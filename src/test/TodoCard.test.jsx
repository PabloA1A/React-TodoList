import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import TodoCard from '../components/TodoCard';

describe('TodoCard', () => {
  const defaultProps = {
    children: <p>Test Todo</p>,
    handleDeleteTodo: vi.fn(),
    index: 0,
    handleEditTodo: vi.fn(),
  };

  it('renders correctly', () => {
    const { getByText } = render(<TodoCard {...defaultProps} />);
    expect(getByText('Test Todo')).toBeDefined();
  });

  it('renders edit and delete buttons', () => {
    const { container } = render(<TodoCard {...defaultProps} />);
    const editButton = container.querySelector('.fa-pen-to-square');
    const deleteButton = container.querySelector('.fa-trash-can');
    expect(editButton).toBeDefined();
    expect(deleteButton).toBeDefined();
  });

  it('calls handleEditTodo with correct index when edit button is clicked', () => {
    const handleEditTodo = vi.fn();
    const { container } = render(
      <TodoCard {...defaultProps} handleEditTodo={handleEditTodo} />
    );
    const editButton = container.querySelector('.fa-pen-to-square');
    fireEvent.click(editButton);
    expect(handleEditTodo).toHaveBeenCalledWith(defaultProps.index);
  });

  it('calls handleDeleteTodo with correct index when delete button is clicked', () => {
    const handleDeleteTodo = vi.fn();
    const { container } = render(
      <TodoCard {...defaultProps} handleDeleteTodo={handleDeleteTodo} />
    );
    const deleteButton = container.querySelector('.fa-trash-can');
    fireEvent.click(deleteButton);
    expect(handleDeleteTodo).toHaveBeenCalledWith(defaultProps.index);
  });
});