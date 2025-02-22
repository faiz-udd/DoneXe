import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { getTasks } from './taskSlice';
import taskService from './taskService';

const mockStore = configureMockStore([thunk]);
const mock = new MockAdapter(axios);

describe('taskSlice', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      task: {
        tasks: [],
        isError: false,
        isSuccess: false,
        isLoading: false,
        message: '',
      },
      auth: {
        user: { token: 'mock_token' },
      },
    });
  });

  afterEach(() => {
    mock.reset();
    store.clearActions();
  });

  test('calls the taskService to fetch tasks', async () => {
    const token = 'mock_token';
    const tasks = [
      {
        _id: '649e4e271947362dc297436a',
        text: 'Learn Tailwind',
        user: '649023b41935f5557f8e7ca4',
        createdAt: '2023-06-30T03:38:15.287Z',
        updatedAt: '2023-06-30T03:38:15.287Z',
        __v: 0,
      },
    ];

    // Mock the response of taskService.getTasks
    const getTasksSpy = jest.spyOn(taskService, 'getTasks').mockResolvedValue(tasks);

    // Dispatch the async action
    await store.dispatch(getTasks());

    // Expect the spy to have been called with the token
    expect(getTasksSpy).toHaveBeenCalledWith(token);

    // Optionally check the actions dispatched by the store
    const actions = store.getActions();
    expect(actions[0].type).toBe('tasks/getAll/pending'); // Check if 'pending' action is dispatched
    expect(actions[1].type).toBe('tasks/getAll/fulfilled'); // Check if 'fulfilled' action is dispatched
    expect(actions[1].payload).toEqual(tasks); // Check if the payload matches the mocked tasks
  });
});
