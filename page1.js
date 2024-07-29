import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Page = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [main, setMain] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Load tasks from local storage when the component mounts
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setMain(storedTasks);
    }
  }, []);

  // Save tasks to local storage
  const saveTasksToLocalStorage = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!title || !desc) {
      toast.error('Title and description are required');
      return;
    }

    if (isEditing) {
      const updatedTasks = main.map((task, index) =>
        index === currentTaskIndex ? { ...task, title, desc } : task
      );
      setMain(updatedTasks);
      saveTasksToLocalStorage(updatedTasks);
      setIsEditing(false);
      setCurrentTaskIndex(null);
      toast.success('Task updated successfully');
    } else {
      const newTasks = [...main, { title, desc, done: false }];
      setMain(newTasks);
      saveTasksToLocalStorage(newTasks);
      toast.success('Task added successfully');
    }

    setTitle('');
    setDesc('');
  };

  const deleteHandler = (i) => {
    const newTasks = [...main];
    newTasks.splice(i, 1);
    setMain(newTasks);
    saveTasksToLocalStorage(newTasks);
    toast.success('Task deleted successfully');
  };

  const editHandler = (i) => {
    setTitle(main[i].title);
    setDesc(main[i].desc);
    setIsEditing(true);
    setCurrentTaskIndex(i);
  };

  const toggleDoneHandler = (i) => {
    const updatedTasks = main.map((task, index) =>
      index === i ? { ...task, done: !task.done } : task
    );
    setMain(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
    toast.success('Task status updated');
  };

  const filteredTasks = main.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  let renderTask = <h2>No Tasks Available</h2>;

  if (filteredTasks.length > 0) {
    renderTask = filteredTasks.map((t, i) => (
      <li
        key={i}
        className={`flex items-center justify-between mb-5 ${t.done ? 'line-through' : ''}`}
      >
        <div className='flex items-center justify-between mb-5 w-2/3'>
          <h5 className='text-2xl font-semibold'>{t.title}</h5>
          <h6 className='text-lg font-medium'>{t.desc}</h6>
        </div>
        <div>
          <button
            onClick={() => toggleDoneHandler(i)}
            className={`hover:bg-green-400 ${t.done ? 'bg-gray-600' : 'bg-green-800'} px-4 py-2 text-white font-bold rounded mr-2`}
          >
            {t.done ? 'Undone' : 'Done'}
          </button>
          <button
            onClick={() => editHandler(i)}
            className='hover:bg-blue-400 bg-blue-800 px-4 py-2 text-white font-bold rounded mr-2'
          >
            Edit
          </button>
          <button
            onClick={() => deleteHandler(i)}
            className='hover:bg-red-400 bg-red-800 px-4 py-2 text-white font-bold rounded'
          >
            Delete
          </button>
        </div>
      </li>
    ));
  }

  return (
    <>
      <ToastContainer />
      <h1 className='bg-black text-center text-white p-5 text-xl'>Todo List</h1>
      <form onSubmit={submitHandler}>
        <input
          type='text'
          placeholder='Please enter task here...'
          className='hover:border-zinc-800 border-zinc-500 border-2 m-5 py-2 px-4'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type='text'
          placeholder='Enter your description here...'
          className='hover:border-zinc-800 border-zinc-500 border-2 m-5 py-2 px-4'
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button className='bg-black hover:bg-green-400 text-white px-4 py-2 text-xl font-bold rounded-xl m-5'>
          {isEditing ? 'Update Task' : 'Add Task'}
        </button>
      </form>
      <input
        type='text'
        placeholder='Search tasks...'
        className='hover:border-zinc-800 border-zinc-500 border-2 m-5 py-2 px-4'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <hr />
      <div className='p-8 mx-4 bg-slate-200'>
        <ul>{renderTask}</ul>
      </div>
    </>
  );
};

export default Page;
