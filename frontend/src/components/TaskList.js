import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTasks, reset } from '../features/tasks/taskSlice';
import TaskItem from './TaskItem';
import Spinner from './Spinner';

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks, isLoading, isError, message } = useSelector((state) => state.tasks);

  useEffect(() => {
    if (isError) {
      console.error(message);
    }
    dispatch(getTasks());

    return () => {
      dispatch(reset());
    };
  }, [isError, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="content">
      {isError && <div className="error-message">{message}</div>}
      {tasks.length > 0 ? (
        <div className="tasks">
          {tasks.map((task) => (
            <TaskItem key={task._id} task={task} />
          ))}
        </div>
      ) : (
        <p>No tasks found.</p>
      )}
    </section>
  );
};

export default TaskList;
