import { useEffect, useState } from "react";

export default function Todo() {
    const [task, setTask] = useState('');
    const [todo, setTodo] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]); // Array to track completed tasks

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('todoTasks') || '[]');
        setTodo(storedTasks);
        setSearchResults(storedTasks);
        setCompletedTasks(new Array(storedTasks.length).fill(false));
    }, []);


    const Task = (e) => {
        setTask(e.target.value);
    }
    const addHandler = () => {
        if (task.trim() !== "") {
            console.log(task, task.trim());

            setTodo((prevTodo) => {
                const updatedTodo = [...prevTodo, task];
                setSearchResults(updatedTodo); // Update search results as well
                return updatedTodo;
            });
            localStorage.setItem('todoTasks', JSON.stringify([...todo, task]));
            setTask('');
        }
    }
    const deleteTask = (index) => {
        const updatedTodo = todo.filter((item, i) => i !== index);
        const updatedCompletedTasks = completedTasks.filter((_, i) => i !== index); // Remove completion status
        setTodo(updatedTodo);
        setSearchResults(updatedTodo); // Update search results as well
        setCompletedTasks(updatedCompletedTasks); // Update completed tasks
        localStorage.setItem('todoTasks', JSON.stringify(updatedTodo)); // Save to local storage
    }

    const DeleteAll = () => {
        setTodo([]);
        setSearchResults([]);
        setCompletedTasks([]); // Clear completed tasks
        localStorage.removeItem('todoTasks'); // Clear local storage
    }
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        const filteredData = todo.filter((item) => {
            return item.toLowerCase().includes(query);
        });
        setSearchResults(filteredData);

    }
    const isCompleted = (e, index) => {
        const updatedCompletedTasks = [...completedTasks];
        updatedCompletedTasks[index] = e.target.checked; // Update completion status for the specific task
        setCompletedTasks(updatedCompletedTasks);
    }
    return (
        <>
        <div className="todoContainer">
            <h1>Todo</h1>
            <input className="inputAdd" type="text" name="inputTask" onChange={(e) => { Task(e) }} value={task !== undefined ? task : ''} placeholder="Add a new todo" />
            <button className="btnAdd" onClick={addHandler}>Add</button>
            {searchResults.length !== 0 && <button onClick={DeleteAll} className="btnDel">Delete Tasks</button>}

            {searchResults.length !== 0 && <input type="search" name="taskSearch" className="searchInput" onChange={(e) => { handleSearch(e) }} placeholder="Search a task" />}
        </div>
         <ul>
         {searchResults.map((item, index) => {
             return (
                 <li key={index} className={completedTasks[index] ? 'completed' : 'todo'}>
                     <input type="checkbox" onChange={(e) => { isCompleted(e, index) }} checked={completedTasks[index]} />
                     {item}
                     <button onClick={() => { deleteTask(index) }}>x</button>
                 </li>
             );
         })}
     </ul>
     </>
    );
           
       
}