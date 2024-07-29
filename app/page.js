"use client"

import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const page = () => {

 const[title,settitle] = useState("")
 const [desc,setdesc] = useState("")
  const[main,setMain] = useState([])

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


 const submitHandler = (e) =>{
   e.preventDefault();
  
   if (!title || !desc) {
    toast.error('Title and description are required');
    return;
  }

  const newTask= [...main,{title,desc}]; 
   setMain(newTask);
   settitle("")
   setdesc("")
   saveTasksToLocalStorage(newTask);
   toast.success('Task added successfully');
};

 const deleteHandler =(i)=>{
     let copytask =[...main];
     copytask.splice(i,1);
     setMain(copytask)
     toast.success('Task deleted successfully');
     // it is used to delete task
 }

 let renderTask = <h2> No Tasks Available</h2>;

 if(main.length>0){
  renderTask =main.map((t,i)=>{
  return (

 <li  key={i} className='flex items-center justify-between mb-5'>
  <div className='flex  items-center justify-between mb-5 w-2/3'> 
  <h5 className='text-2xl font-semibold'>{t.title}</h5>
  <h6 className='text-lg font-medium'>{t.desc}</h6>
 </div>
 <button 
 onClick={()=>{
  deleteHandler(i)
 }}
  className='hover:bg-red-400 bg-red-800
 px-4 py-2 text-white  font-bold rounded'>Delete</button>
 </li>
  );
})
}

  return (
    <>
<ToastContainer/>

     <h1 className='bg-black text-center
      text-white p-5 text-xl'> Todo List</h1> 
    <form onSubmit={submitHandler}>
  <input type='text' 
  placeholder='Please enter task here...' 
  className='hover:border-zinc-800 border-zinc-500 border-2  m-5 py-2 px-4'
    value={title}
    onChange={(e)=>{  
    settitle(e.target.value)
    }}
  />
    
  <input type='text' 
  placeholder='Enter your description here...' 
  className=' hover:border-zinc-800  border-zinc-500  border-2 m-5 py-2 px-4 '
    value={desc}
  onChange={(e) =>{
    setdesc(e.target.value)
  }}
  />
  <button
   className='bg-black hover:bg-green-400 text-white px-4 py-2 text-xl font-bold rounded-xl m-5'> Add Task</button>
    </form>
    <hr/>
    <div className='p-8 mx-4 bg-slate-200'>
      <ul>
       {renderTask}
      </ul>
    </div>

    </>
  );
};

export default page
