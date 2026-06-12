import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('renders the app with title and form', () => {
    global.fetch.mockResolvedValueOnce({
      json: async () => []
    });

    render(<App />);

    expect(screen.getByText('ToDo Liste')).toBeInTheDocument();
    expect(screen.getByLabelText('Neues Todo anlegen:')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Absenden' })).toBeInTheDocument();
  });

  test('fetches and displays tasks on mount', async () => {
    const mockTasks = [
      { id: 1, taskdescription: 'Task 1' },
      { id: 2, taskdescription: 'Task 2' }
    ];

    global.fetch.mockResolvedValueOnce({
      json: async () => mockTasks
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Task 1: Task 1')).toBeInTheDocument();
      expect(screen.getByText('Task 2: Task 2')).toBeInTheDocument();
    });

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:8080/api/tasks');
  });

  test('displays empty list when no tasks are returned', async () => {
    global.fetch.mockResolvedValueOnce({
      json: async () => []
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.queryByRole('list')).toBeInTheDocument();
      expect(screen.queryByRole('list')).toBeEmptyDOMElement();
    });
  });

  test('input field updates on change', async () => {
    global.fetch.mockResolvedValueOnce({
      json: async () => []
    });

    render(<App />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'New Task' } });

    expect(input).toHaveValue('New Task');
  });

  test('sends POST request when form is submitted', async () => {
    global.fetch
      .mockResolvedValueOnce({
        json: async () => []
      })
      .mockResolvedValueOnce({
        json: async () => ({})
      });

    const originalLocation = window.location;
    delete window.location;
    window.location = { href: '' };

    render(<App />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Test Task' } });

    const form = screen.getByRole('form');
    fireEvent.submit(form);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:8080/api/tasks',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ taskdescription: 'Test Task' })
        })
      );
    });

    window.location = originalLocation;
  });

  test('sends DELETE request when done button is clicked', async () => {
    const mockTasks = [
      { id: 1, taskdescription: 'Task to Delete' }
    ];

    global.fetch
      .mockResolvedValueOnce({
        json: async () => mockTasks
      })
      .mockResolvedValueOnce({
        json: async () => ({})
      });

    const originalLocation = window.location;
    delete window.location;
    window.location = { href: '' };

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Task 1: Task to Delete')).toBeInTheDocument();
    });

    const doneButton = screen.getByRole('del-button', { name: '' });
    fireEvent.click(doneButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:8080/api/tasks/1',
        expect.objectContaining({
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' }
        })
      );
    });

    window.location = originalLocation;
  });
});
