import { formatDistanceToNow } from 'date-fns';
import Footer from '../footer/footer';
import Header from '../header';
import TaskList from '../task-list';

function App() {
  const tasks = [
    {
      id: 1,
      description: 'Completed task',
      timeCreated: formatDistanceToNow(new Date(2022, 4, 31, 12, 28, 15), {
        includeSeconds: true,
      }),
      completed: true,
      editing: false,
    },
    {
      id: 2,
      description: 'Editing task',
      timeCreated: formatDistanceToNow(new Date(2022, 4, 25, 12, 25, 15), {
        includeSeconds: true,
      }),
      completed: false,
      editing: true,
    },
    {
      id: 3,
      description: 'Active task',
      timeCreated: formatDistanceToNow(new Date(2022, 4, 31, 9, 25, 15), {
        includeSeconds: true,
      }),
      completed: false,
      editing: false,
    },
  ];

  return (
    <>
      <Header />

      <section className='main'>
        <TaskList tasks={tasks} />

        <Footer />
      </section>

    </>
  );
}

export default App;
