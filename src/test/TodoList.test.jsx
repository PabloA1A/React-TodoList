import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import TodoList from '../components/TodoList';

describe('TodoList', () => {
  const mockTodos = [
    { id: '1', text: 'Test Todo 1' },
    { id: '2', text: 'Test Todo 2' },
    { id: '3', text: 'Test Todo 3' },
  ];

  const mockProps = {
    todos: mockTodos,
    handleEditTodo: vi.fn(),
    handleDeleteTodo: vi.fn(),
  };

  it('renders correctly with todos', () => {
    render(<TodoList {...mockProps} />);
    
    expect(screen.getByRole('list')).toHaveClass('main');
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  it('renders correct number of todo items', () => {
    render(<TodoList {...mockProps} />);
    
    const todoItems = screen.getAllByRole('listitem');
    expect(todoItems).toHaveLength(mockTodos.length);
  });

  it('displays correct text for each todo', () => {
    render(<TodoList {...mockProps} />);
    
    mockTodos.forEach((todo) => {
      expect(screen.getByText(todo.text)).toBeInTheDocument();
    });
  });

  it('renders edit and delete buttons for each todo', () => {
    const { container } = render(<TodoList {...mockProps} />);
    
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(mockTodos.length * 2);
    
    const editIcons = container.querySelectorAll('.fa-pen-to-square');
    const deleteIcons = container.querySelectorAll('.fa-trash-can');
  
    expect(editIcons).toHaveLength(mockTodos.length);
    expect(deleteIcons).toHaveLength(mockTodos.length);
  });

  it('renders empty list when no todos are provided', () => {
    render(<TodoList {...mockProps} todos={[]} />);
    
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });

  it('handles todos with different id types correctly', () => {
    const mixedTodos = [
      { id: '1', text: 'String ID' },
      { id: 2, text: 'Number ID' },
    ];
    
    render(<TodoList {...mockProps} todos={mixedTodos} />);
    
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getByText('String ID')).toBeInTheDocument();
    expect(screen.getByText('Number ID')).toBeInTheDocument();
  });
});